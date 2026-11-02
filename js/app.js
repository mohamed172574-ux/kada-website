(function () {
  "use strict";
  const root = document.documentElement;
  const body = document.body;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ---------- i18n ---------- */
  const AR = Object.assign({}, window.KADA_AR || {}, window.KADA_AR_PAGE || {});
  function captureEnglish() {
    $$("[data-i18n]").forEach((el) => { if (el.dataset.en === undefined) el.dataset.en = el.innerHTML; });
    $$("[data-i18n-ph]").forEach((el) => { if (el.dataset.en === undefined) el.dataset.en = el.getAttribute("placeholder") || ""; });
    $$("[data-i18n-title]").forEach((el) => { if (el.dataset.en === undefined) el.dataset.en = el.textContent; });
    $$("[data-i18n-tip]").forEach((el) => { if (el.dataset.tipEn === undefined) el.dataset.tipEn = el.getAttribute("data-tip") || ""; });
  }
  function applyLang(lang, persist) {
    const ar = lang === "ar";
    root.lang = lang;
    root.dir = ar ? "rtl" : "ltr";
    $$("[data-i18n]").forEach((el) => {
      const k = el.dataset.i18n;
      el.innerHTML = ar && AR[k] !== undefined ? AR[k] : el.dataset.en;
    });
    $$("[data-i18n-ph]").forEach((el) => {
      const k = el.dataset.i18nPh;
      el.setAttribute("placeholder", ar && AR[k] !== undefined ? AR[k] : el.dataset.en);
    });
    $$("[data-i18n-tip]").forEach((el) => {
      const k = el.dataset.i18nTip;
      el.setAttribute("data-tip", ar && AR[k] !== undefined ? AR[k] : el.dataset.tipEn);
    });
    const t = $("title[data-i18n-title]");
    if (t) t.textContent = ar && AR[t.dataset.i18nTitle] ? AR[t.dataset.i18nTitle] : t.dataset.en;
    $$("[data-lang-toggle]").forEach((b) => (b.textContent = ar ? "EN" : "عربي"));
    if (persist) { try { localStorage.setItem("kada4-lang", lang); } catch (e) {} }
    renderRole(currentRole);
    document.dispatchEvent(new CustomEvent("kada:lang", { detail: { lang } }));
  }
  $$("[data-lang-toggle]").forEach((b) =>
    b.addEventListener("click", () => applyLang(root.lang === "ar" ? "en" : "ar", true))
  );

  /* ---------- Loader ---------- */
  function ready() { body.classList.add("ready"); }
  const heroImg = $("[data-slider] img, .page-hero img");
  if (heroImg && !heroImg.complete) {
    heroImg.addEventListener("load", () => setTimeout(ready, 200));
    heroImg.addEventListener("error", ready);
    setTimeout(ready, 2200);
  } else { setTimeout(ready, 250); }

  /* ---------- Hero slider (home only) ---------- */
  const hero = $("[data-slider]");
  if (hero) {
    const slides = $$("[data-slide]", hero);
    const dots = $$("[data-dot]", hero);
    const DUR = 7000;
    let cur = 0, timer = null, paused = false, left = DUR, since = 0;
    hero.style.setProperty("--dur", DUR + "ms");
    const go = (i) => {
      cur = (i + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-on", k === cur));
      dots.forEach((d, k) => { d.classList.remove("is-on"); if (k === cur) { void d.offsetWidth; d.classList.add("is-on"); } });
      left = DUR;
      restart();
    };
    const restart = () => { clearTimeout(timer); if (!paused && !reduced) { since = Date.now(); timer = setTimeout(() => go(cur + 1), left); } };
    const pauseBtn = $("[data-pause]", hero);
    const setPaused = (p) => {
      if (p === paused) return;
      if (p) { clearTimeout(timer); left = Math.max(0, left - (Date.now() - since)); }
      paused = p;
      hero.classList.toggle("paused", p);
      pauseBtn.setAttribute("aria-pressed", String(p));
      pauseBtn.setAttribute("aria-label", p ? "Play" : "Pause");
      restart();
    };
    dots.forEach((d, k) => d.addEventListener("click", () => go(k)));
    $("[data-prev]", hero).addEventListener("click", () => go(cur - 1));
    $("[data-next]", hero).addEventListener("click", () => go(cur + 1));
    pauseBtn.addEventListener("click", () => setPaused(!paused));
    document.addEventListener("visibilitychange", () => { if (document.hidden) { if (!paused) { clearTimeout(timer); left = Math.max(0, left - (Date.now() - since)); } } else restart(); });
    window.addEventListener("load", () => setTimeout(() => go(0), 300));
  }

  /* ---------- Nav / dropdowns / mobile / search ---------- */
  const nav = $(".nav");
  const burger = $(".burger");
  if (burger) burger.addEventListener("click", () => body.classList.toggle("menu-open"));
  $$(".mobile-menu a").forEach((a, i) => { a.style.setProperty("--i", i); a.addEventListener("click", () => body.classList.remove("menu-open")); });
  // keyboard / touch support for dropdowns
  $$(".links .dd > a").forEach((a) => {
    a.addEventListener("click", (e) => {
      if (window.matchMedia("(hover: none)").matches && !a.parentElement.classList.contains("open")) {
        e.preventDefault(); $$(".links .dd.open").forEach((d) => d.classList.remove("open")); a.parentElement.classList.add("open");
      }
    });
  });
  document.addEventListener("click", (e) => { if (!e.target.closest(".dd")) $$(".links .dd.open").forEach((d) => d.classList.remove("open")); });
  const searchOv = $("[data-search]");
  if (searchOv) {
    const open = () => { body.classList.add("search-open"); setTimeout(() => $("input", searchOv).focus(), 50); };
    const close = () => body.classList.remove("search-open");
    $$("[data-search-open]").forEach((b) => b.addEventListener("click", open));
    $$("[data-search-close]").forEach((b) => b.addEventListener("click", close));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { close(); body.classList.remove("menu-open"); } });
    searchOv.addEventListener("click", (e) => { if (e.target === searchOv) close(); });
  }

  /* ---------- Skip link + keyboard shortcuts (see accessibility.html) ---------- */
  const mainEl = $("main") || $$("section").find((s) => !s.closest(".nav, [data-search], .mobile-menu, [data-auth]"));
  if (mainEl) {
    if (!mainEl.id) mainEl.id = "main";
    if (!mainEl.hasAttribute("tabindex")) mainEl.setAttribute("tabindex", "-1");
    $$(".skip-link").forEach((a) => {
      a.setAttribute("href", "#" + mainEl.id);
      a.addEventListener("click", (e) => { e.preventDefault(); mainEl.focus(); });
    });
  }
  const isTyping = (el) => !!el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      $$(".links .dd.open").forEach((d) => d.classList.remove("open"));
      const ae = document.activeElement;
      if (ae && ae.closest(".links .dd")) ae.blur();
      const am = $("[data-account-menu]");
      if (am && !am.hidden) {
        am.hidden = true;
        const t = $("[data-account-toggle]");
        if (t) { t.setAttribute("aria-expanded", "false"); t.focus(); }
      }
      return;
    }
    if (e.altKey && !e.ctrlKey && !e.metaKey && e.code === "KeyL") {
      const tog = $("[data-lang-toggle]");
      if (tog) { e.preventDefault(); tog.click(); }
      return;
    }
    if ((e.key === "/" || (e.code === "Slash" && !e.shiftKey)) && !e.altKey && !e.ctrlKey && !e.metaKey && !isTyping(e.target)) {
      if (body.classList.contains("auth-open")) return;
      const btn = $("[data-search-open]");
      if (btn) { e.preventDefault(); btn.click(); }
    }
  });

  /* ---------- Scroll ---------- */
  const paras = $$("[data-parallax]");
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 10);
      if (!reduced) paras.forEach((para) => {
        const r = para.parentElement.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) {
          const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
          para.style.transform = "translateY(" + p * -60 + "px)";
        }
      });
      const prog = $("[data-progress]");
      if (prog) { const h = document.documentElement; prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%"; }
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Reveal + counters ---------- */
  function count(el) {
    const target = +el.dataset.count, dec = +(el.dataset.dec || 0), start = performance.now(), dur = 1600;
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * e).toFixed(dec);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      $$(".count", en.target).forEach((c) => { if (!c.dataset.done) { c.dataset.done = 1; count(c); } });
      $$(".bar[data-w]", en.target).forEach((b) => { b.style.width = b.dataset.w; });
      io.unobserve(en.target);
    });
  }, { threshold: 0.15 });
  $$(".reveal, .stagger").forEach((el) => io.observe(el));

  /* ---------- Roles / phone ---------- */
  const phone = $(".phone");
  const roleBtns = $$(".role");
  let currentRole = (roleBtns.find((b) => b.classList.contains("is-on")) || roleBtns[0] || {}).dataset?.role || "athlete";
  /* Designed app screens (home page): block templates fed by window.KADA_APP_SCREENS */
  const PS_ICONS = {
    home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    drop: '<path d="M12 3s6 7 6 11.5a6 6 0 0 1-12 0C6 10 12 3 12 3z"/>',
    pill: '<rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="M9 9l6 6"/>',
    med: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 12h8"/>',
    doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    down: '<path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"/>',
    up: '<path d="M12 16V4m0 0L8 8m4-4l4 4M4 20h16"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    check: '<path d="M5 12l5 5L20 7"/>',
    bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21a2 2 0 0 0 4 0"/>',
    chev: '<path d="M9 6l6 6-6 6"/>'
  };
  const psIco = (k) => `<svg viewBox="0 0 24 24" class="ps-ico" aria-hidden="true">${PS_ICONS[k] || ""}</svg>`;
  const psEsc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const PS_BLOCKS = {
    hero: (b) => `<div class="ps-hero${b.tone ? " " + b.tone : ""}"><div class="ps-hero-top"><small>${psEsc(b.kicker)}</small>${b.chip ? `<span class="ps-chip">${psEsc(b.chip)}</span>` : ""}</div><b>${psEsc(b.title)}</b></div>`,
    grid: (b) => `<div class="ps-grid">${b.items.map(([i, l]) => `<div><i>${psIco(i)}</i><span>${psEsc(l)}</span></div>`).join("")}</div>`,
    list: (b) => `<div class="ps-rows">${b.items.map((r) => `<div class="ps-row"><span class="ps-lead${r.ext ? " ext" : ""}">${r.ext ? psEsc(r.ext) : psIco(r.icon)}</span><div><b>${psEsc(r.t)}</b><small>${psEsc(r.d)}</small></div>${r.badge ? `<em class="ps-badge ${r.tone || ""}">${psEsc(r.badge)}</em>` : r.ext ? `<span class="ps-act">${psIco(r.icon || "down")}</span>` : `<span class="ps-act">${psIco("chev")}</span>`}</div>`).join("")}</div>`,
    stats: (b) => `<div class="ps-stats">${b.items.map(([v, l]) => `<div><b class="num">${psEsc(v)}</b><small>${psEsc(l)}</small></div>`).join("")}</div>`,
    search: (b) => `<div class="ps-search">${psIco("search")}<span>${psEsc(b.value)}</span><i></i></div>`,
    result: (b) => `<div class="ps-result ${b.tone || ""}"><em>${psEsc(b.label)}</em><b>${psEsc(b.title)}</b><small>${psEsc(b.sub)}</small></div>`,
    steps: (b) => `<div class="ps-steps">${b.items.map((s) => `<div class="${s.s}"><i>${s.s === "done" ? psIco("check") : ""}</i><div><b>${psEsc(s.t)}</b><small>${psEsc(s.d)}</small></div></div>`).join("")}</div>`,
    progress: (b) => `<div class="ps-rows">${b.items.map((p) => `<div class="ps-prog"><div><b>${psEsc(p.t)}</b><em class="num">${p.pct}%</em></div><span><i style="width:${p.pct}%"></i></span><small>${psEsc(p.d)}</small></div>`).join("")}</div>`,
    chips: (b) => `<div class="ps-chips">${b.items.map((c, i) => `<span${i === 0 ? ' class="on"' : ""}>${psEsc(c)}</span>`).join("")}</div>`,
    conv: (b) => `<div class="ps-rows">${b.items.map((c) => `<div class="ps-conv${c.unread ? " unread" : ""}"><span class="ps-ava">${psEsc(c.ava)}</span><div><b>${psEsc(c.who)}<small class="num">${psEsc(c.when)}</small></b><small>${psEsc(c.msg)}</small></div></div>`).join("")}</div>`,
    button: (b) => `<div class="ps-btn">${psIco(b.icon || "chev")}<span>${psEsc(b.text)}</span></div>`,
    note: (b) => `<div class="ps-note">${psIco(b.icon || "lock")}<span>${psEsc(b.text)}</span></div>`,
    label: (b) => `<div class="ps-label">${psEsc(b.text)}</div>`
  };
  function renderRole(key) {
    if (!phone || !window.KADA_ROLES) return;
    const lang = window.KADA_ROLES[root.lang] ? root.lang : "en";
    const data = window.KADA_ROLES[lang][key];
    if (!data) return;
    const name = $("[data-role-name]"); if (name) name.textContent = data.name;
    const body = $("[data-role-body]");
    const screen = window.KADA_APP_SCREENS && window.KADA_APP_SCREENS[lang] && window.KADA_APP_SCREENS[lang][key];
    if (body && screen) {
      body.innerHTML = screen.blocks.map((b) => (PS_BLOCKS[b.type] ? PS_BLOCKS[b.type](b) : "")).join("");
      const nav = $("[data-role-nav]");
      if (nav && window.KADA_APP_TABS) {
        const icons = ["home", "drop", "pill", "cap", "chat"];
        nav.innerHTML = (window.KADA_APP_TABS[lang] || window.KADA_APP_TABS.en).map((l, i) => `<span${i === screen.tab ? ' class="on"' : ""}>${psIco(icons[i])}<small>${psEsc(l)}</small></span>`).join("");
      }
      return;
    }
    const kicker = $("[data-role-kicker]"), title = $("[data-role-title]"), list = $("[data-role-list]");
    if (kicker) kicker.textContent = data.kicker;
    if (title) title.textContent = data.title;
    if (!list) return;
    list.innerHTML = "";
    (data.items || []).forEach(([t, d]) => {
      const li = document.createElement("li");
      const b = document.createElement("b"); b.textContent = t;
      const s = document.createElement("small"); s.textContent = d;
      li.append(b, s); list.append(li);
    });
  }
  roleBtns.forEach((btn) => btn.addEventListener("click", () => {
    if (btn.dataset.role === currentRole) return;
    roleBtns.forEach((b) => b.classList.toggle("is-on", b === btn));
    currentRole = btn.dataset.role;
    phone.classList.add("swap");
    setTimeout(() => { renderRole(currentRole); phone.classList.remove("swap"); }, 220);
  }));
  if (phone && roleBtns.length && !reduced) {
    const auto = setInterval(() => {
      const r = phone.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const i = roleBtns.findIndex((b) => b.dataset.role === currentRole);
      roleBtns[(i + 1) % roleBtns.length].click();
    }, 4500);
    roleBtns.forEach((b) => b.addEventListener("pointerdown", () => clearInterval(auto), { once: true }));
  }

  /* ---------- Generic widgets ---------- */
  // Tabs: [data-tabs] > [data-tab="x"] buttons, [data-panel="x"] panels
  $$("[data-tabs]").forEach((wrap) => {
    const btns = $$("[data-tab]", wrap);
    const scope = wrap.dataset.tabs ? $(wrap.dataset.tabs) : wrap.parentElement;
    btns.forEach((b) => b.addEventListener("click", () => {
      btns.forEach((x) => x.classList.toggle("is-on", x === b));
      $$("[data-panel]", scope).forEach((p) => p.classList.toggle("is-on", p.dataset.panel === b.dataset.tab));
    }));
  });
  // Accordion
  $$(".acc-item > button").forEach((b) => b.addEventListener("click", () => {
    const item = b.parentElement, open = item.classList.contains("open");
    $$(".acc-item.open", item.parentElement).forEach((i) => i.classList.remove("open"));
    if (!open) item.classList.add("open");
  }));
  // List timing filters (prohibited.html)
  $$("[data-list-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.closest(".list-filters") || btn.parentElement;
      const wasOn = btn.classList.contains("is-on");
      $$("[data-list-filter]", group).forEach((x) => {
        x.classList.remove("is-on");
        x.setAttribute("aria-pressed", "false");
      });
      const key = wasOn ? "" : btn.dataset.listFilter;
      if (key) {
        btn.classList.add("is-on");
        btn.setAttribute("aria-pressed", "true");
      }
      const acc = (btn.closest(".wrap") && btn.closest(".wrap").querySelector(".acc")) || $(".acc");
      if (!acc) return;
      $$(".acc-item", acc).forEach((item) => {
        const hide = key && item.dataset.when !== key;
        item.classList.toggle("is-hidden", hide);
        if (hide) item.classList.remove("open");
      });
      if (key) {
        const first = $$(".acc-item", acc).find((i) => i.dataset.when === key);
        if (first) first.classList.add("open");
      }
    });
  });
  // Chip filters (visual only)
  $$(".chips").forEach((g) => $$(".chip", g).forEach((c) => c.addEventListener("click", () => { $$(".chip", g).forEach((x) => x.classList.remove("is-on")); c.classList.add("is-on"); })));
  // Steppers (multi-step forms): [data-stepper] with .step-nav li and [data-step] panels
  // A panel with [data-step-gate="signed"] blocks "Next" and the step-nav until the visitor is signed in.
  $$("[data-stepper]").forEach((st) => {
    const panels = $$("[data-step]", st), navs = $$(".step-nav li", st);
    let i = 0;
    const gateAt = panels.findIndex((p) => p.dataset.stepGate === "signed");
    const locked = (k) => gateAt >= 0 && k > gateAt && !body.classList.contains("is-signed");
    const show = () => {
      panels.forEach((p, k) => p.classList.toggle("is-on", k === i));
      navs.forEach((n, k) => { n.classList.toggle("is-on", k === i); n.classList.toggle("done", k < i); });
      st.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    };
    const applyGate = () => {
      if (gateAt < 0) return;
      const gated = locked(gateAt + 1);
      $$("[data-step-next]", panels[gateAt]).forEach((b) => { b.disabled = gated; });
      $$("[data-step-gate-hint]", panels[gateAt]).forEach((h) => { h.hidden = !gated; });
      navs.forEach((n, k) => n.classList.toggle("is-locked", locked(k)));
      if (locked(i)) { i = gateAt; show(); }
    };
    $$("[data-step-next]", st).forEach((b) => b.addEventListener("click", () => { if (i < panels.length - 1 && !locked(i + 1)) { i++; show(); } }));
    $$("[data-step-prev]", st).forEach((b) => b.addEventListener("click", () => { if (i > 0) { i--; show(); } }));
    navs.forEach((n, k) => n.addEventListener("click", () => { if (!locked(k)) { i = k; show(); } }));
    if (gateAt >= 0) { applyGate(); document.addEventListener("kada:auth", applyGate); }
  });
  // Demo forms → success panel
  $$("form[data-demo]").forEach((f) => f.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = $(f.dataset.demo);
    if (ok) { f.classList.add("hidden"); ok.classList.add("is-on"); ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
  }));
  // Lookup demo: [data-lookup] button reveals [data-lookup-result]
  $$("[data-lookup]").forEach((b) => b.addEventListener("click", () => {
    const r = $(b.dataset.lookup); if (!r) return;
    b.classList.add("busy");
    setTimeout(() => { b.classList.remove("busy"); r.classList.add("is-on"); r.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, 700);
  }));
  // Conditional blocks: [data-when="name=value"] shown while that radio is checked
  const whens = $$("[data-when]");
  if (whens.length) {
    const applyWhen = () => whens.forEach((el) => {
      const [name, val] = el.dataset.when.split("=");
      const on = $(`input[name="${name}"][value="${val}"]`, el.closest("form") || document);
      el.hidden = !(on && on.checked);
    });
    document.addEventListener("change", (e) => { if (e.target.matches("input[type=radio]")) applyWhen(); });
    applyWhen();
  }
  // Copy to clipboard: [data-copy="selector"] copies target text, swaps label briefly
  $$("[data-copy]").forEach((b) => b.addEventListener("click", () => {
    const t = $(b.dataset.copy, b.closest(".success") || document); if (!t) return;
    const done = () => {
      const [lbl, ok] = b.querySelectorAll("span"); if (!ok) return;
      lbl.hidden = true; ok.hidden = false;
      setTimeout(() => { lbl.hidden = false; ok.hidden = true; }, 1600);
    };
    (navigator.clipboard ? navigator.clipboard.writeText(t.textContent.trim()) : Promise.resolve()).then(done, done);
  }));
  // Prefill from the signed-in profile (client-side only): [data-prefill] fills sibling [data-field="name|phone|role"]
  $$("[data-prefill]").forEach((b) => b.addEventListener("click", (e) => {
    e.preventDefault();
    const p = AUTH_ACCOUNTS[authGet()]; if (!p) return;
    const box = b.closest("[data-when]") || b.closest("form") || document;
    const f = (k) => $(`[data-field="${k}"]`, box);
    if (f("name")) f("name").value = profileField(p, "name");
    if (f("phone")) f("phone").value = p.phone || "";
    const role = f("role"), r = profileField(p, "role");
    if (role) role.selectedIndex = /athlete|رياضي/i.test(r) ? 1 : /coach|مدرب/i.test(r) ? 2 : role.options.length - 1;
  }));
  // Range / seat toggles etc. handled with CSS :checked

  /* ---------- AI chat demo (typing) ---------- */
  const chat = $("[data-chat]");
  if (chat && window.KADA_CHAT) {
    const log = $(".chat-log", chat);
    let playing = false, token = 0;
    // KADA_CHAT[lang] may be a plain array (single dialogue) or an object of named scenarios.
    let scenario = (window.KADA_CHAT_DEFAULT || null);
    function pick() {
      const l = window.KADA_CHAT[root.lang] || window.KADA_CHAT.en;
      if (Array.isArray(l)) return l;
      return l[scenario] || l[Object.keys(l)[0]] || [];
    }
    function esc(s) { return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])); }
    async function play() {
      const my = ++token;
      const script = pick();
      log.innerHTML = "";
      for (const m of script) {
        if (my !== token) return;
        const el = document.createElement("div");
        el.className = "msg " + m.role;
        log.append(el);
        if (m.role === "user") {
          el.innerHTML = esc(m.text);
          await wait(650);
        } else {
          el.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>';
          await wait(900);
          el.innerHTML = "";
          if (reduced) el.innerHTML = esc(m.text);
          else for (let i = 0; i <= m.text.length; i += 2) { if (my !== token) return; el.textContent = m.text.slice(0, i); log.scrollTop = log.scrollHeight; await wait(14); }
          el.textContent = m.text;
          if (m.sources) { const s = document.createElement("div"); s.className = "sources"; m.sources.forEach((x) => { const c = document.createElement("span"); c.textContent = x; s.append(c); }); el.append(s); }
          await wait(700);
        }
        log.scrollTop = log.scrollHeight;
      }
      await wait(3500);
      if (my === token) play();
    }
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const cio = new IntersectionObserver((en) => { if (en[0].isIntersecting && !playing) { playing = true; play(); } }, { threshold: 0.3 });
    cio.observe(chat);
    // Scenario switchers: [data-scenario="key"] anywhere on the page.
    // Chips (.chip[data-scenario]) show the active state; the chat header [data-chat-role] mirrors the active chip's label.
    const scBtns = $$("[data-scenario]");
    const roleLbl = $("[data-chat-role]", chat);
    function refreshLabel() {
      if (!roleLbl) return;
      const chip = scBtns.find((b) => b.classList.contains("chip") && b.dataset.scenario === scenario);
      if (chip) roleLbl.textContent = chip.textContent.trim();
    }
    function setScenario(key, scroll) {
      scenario = key;
      scBtns.forEach((b) => { if (b.classList.contains("chip")) b.classList.toggle("is-on", b.dataset.scenario === key); });
      refreshLabel();
      if (scroll) chat.scrollIntoView({ behavior: "smooth", block: "center" });
      playing = true; play();
    }
    scBtns.forEach((b) => b.addEventListener("click", (e) => { if (b.tagName === "A") e.preventDefault(); setScenario(b.dataset.scenario, b.tagName === "A"); }));
    if (!scenario && scBtns.length) scenario = (scBtns.find((b) => b.classList.contains("is-on")) || scBtns[0]).dataset.scenario;
    refreshLabel();
    document.addEventListener("kada:lang", () => { refreshLabel(); if (playing) play(); });
  }

  /* ---------- Client-side pagination ----------
     <div id="x" data-paginate="8"> …items… </div>  → items chunked 8 per page
     <div id="x" data-paginate> <div data-page>…</div> <div data-page>…</div> </div> → each child is a page
     <div class="pager" data-pager-for="x"></div>   → pager is rendered here
     Optional: [data-page-range] (e.g. "1–8") and [data-page-total] are updated. */
  $$("[data-paginate]").forEach((box) => {
    const pager = $(`.pager[data-pager-for="${box.id}"]`);
    if (!pager) return;
    const size = parseInt(box.dataset.paginate, 10) || 0;
    const wholePages = $$(":scope > [data-page]", box);
    const items = wholePages.length ? [] : Array.from(box.children);
    const pages = wholePages.length ? wholePages.length : Math.max(1, Math.ceil(items.length / size));
    const total = wholePages.length ? wholePages.reduce((n, p) => n + p.children.length, 0) : items.length;
    const range = $("[data-page-range]", box.closest(".wrap") || document);
    const totalEl = $("[data-page-total]", box.closest(".wrap") || document);
    if (totalEl) totalEl.textContent = total;
    let cur = 0;
    const chev = (d) => `<svg viewBox="0 0 24 24" class="ico"><path d="${d ? "M9 6l6 6-6 6" : "M15 18l-6-6 6-6"}"/></svg>`;
    function render() {
      pager.innerHTML = "";
      const mk = (html, cls, go, label) => {
        const el = document.createElement(go === null ? "span" : "a");
        el.innerHTML = html; if (cls) el.className = cls;
        if (go !== null) { el.href = "#"; el.addEventListener("click", (e) => { e.preventDefault(); show(go); }); }
        if (label) el.setAttribute("aria-label", label);
        return el;
      };
      pager.append(mk(chev(0), cur === 0 ? "is-off" : "", cur === 0 ? null : cur - 1, "Previous"));
      for (let i = 0; i < pages; i++) pager.append(mk(String(i + 1), i === cur ? "is-on" : "", i === cur ? null : i));
      pager.append(mk(chev(1), cur === pages - 1 ? "is-off" : "", cur === pages - 1 ? null : cur + 1, "Next"));
    }
    function show(i, scroll = true) {
      cur = Math.max(0, Math.min(pages - 1, i));
      if (wholePages.length) wholePages.forEach((p, k) => { p.hidden = k !== cur; });
      else items.forEach((el, k) => { el.hidden = !(k >= cur * size && k < (cur + 1) * size); });
      if (range) {
        const from = wholePages.length ? wholePages.slice(0, cur).reduce((n, p) => n + p.children.length, 0) + 1 : cur * size + 1;
        const to = wholePages.length ? from + wholePages[cur].children.length - 1 : Math.min(total, (cur + 1) * size);
        range.textContent = `${from}–${to}`;
      }
      render();
      if (scroll) {
        box.classList.remove("page-in"); void box.offsetWidth; box.classList.add("page-in");
        const top = (box.closest(".table-wrap") || box).getBoundingClientRect().top + window.scrollY - 140;
        window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
      }
    }
    // Deep link: if the URL hash points inside this box, open the page that contains it
    const target = location.hash.length > 1 ? $(location.hash) : null;
    if (target && box.contains(target)) {
      const idx = wholePages.length ? wholePages.findIndex((p) => p.contains(target)) : Math.floor(items.findIndex((el) => el.contains(target)) / size);
      show(idx, false);
      requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
    } else show(0, false);
  });

  /* ---------- Active nav (home: by section) ---------- */
  if (hero) {
    const navLinks = $$(".links a[href^='#']");
    const sections = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
    const nio = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id)); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach((s) => nio.observe(s));
  }

  /* ---------- Sign-in: demo identities (static presentation) ----------
     Three sign-in types from the proposal: Public (Mobile ID / Sahel), Supplier (Mobile ID of the
     authorised signatory) and Staff (agency SSO + MFA → admin application, see admin/). Accounts live in js/boot.js.
     Page hooks:
       body[data-require="public|supplier|staff"]   page needs a signed-in account of that type
       [data-signed-only="type|account,…"]           shown only when signed in (optionally for given types/accounts)
       [data-guest-only]                             hidden when signed in
       [data-signed-text="name|short|role|org|civil|email|phone"]  text from the active profile
       [data-signed-value="…"]                       input value from the active profile
       [data-perm="section"]                         staff: shown only if the account has that CMS permission */
  const AUTH_KEY = "kada4-auth";
  const AUTH_ACCOUNTS = window.KADA_ACCOUNTS || {};
  const authBox = $("[data-auth]");
  let authType = "public", authAcct = null, authStay = false, authRequired = false;
  const L = () => (root.lang === "ar" ? "ar" : "en");
  function authGet() {
    try { const s = JSON.parse(sessionStorage.getItem(AUTH_KEY) || "null"); return s && AUTH_ACCOUNTS[s.account] ? s.account : null; } catch (e) { return null; }
  }
  function authSet(acct) { if (!acct) sessionStorage.removeItem(AUTH_KEY); else sessionStorage.setItem(AUTH_KEY, JSON.stringify({ account: acct })); }
  function profileField(p, f) { const l = L(); return (p[l] && p[l][f]) || p[f] || ""; }
  function authStep(name) { if (authBox) $$("[data-auth-step]", authBox).forEach((s) => s.classList.toggle("is-on", s.dataset.authStep === name)); }
  const listMatch = (attr, type, acct) => !attr || attr.split(",").map((x) => x.trim()).some((x) => x === type || x === acct);

  function buildLists() {
    if (!authBox) return;
    const l = L();
    const wipTag = l === "ar" ? "قيد التصميم" : "In design";
    const mk = (id, p, extra) => `<button type="button" data-auth-acct="${id}" class="${authAcct === id ? "is-on" : ""}${p.wip ? " is-wip" : ""}"><span class="signin-ava">${p.ava}</span><span><b>${p[l].name}${p.wip ? ` <em class="wip-tag">${wipTag}</em>` : ""}</b><small>${p[l].role}${extra ? " · " + extra : ""}</small></span></button>`;
    const who = $("[data-auth-who-list]", authBox);
    if (who) who.innerHTML = Object.entries(AUTH_ACCOUNTS).filter(([, p]) => p.type === authType && p.type !== "staff").map(([id, p]) => mk(id, p, p[l].org)).join("");
    const sso = $("[data-auth-sso-list]", authBox);
    if (sso) sso.innerHTML = Object.entries(AUTH_ACCOUNTS).filter(([, p]) => p.type === "staff" && !p.hidden).map(([id, p]) => mk(id, p, p[l].org)).join("");
    const wipMsg = $("[data-auth-wip]", authBox);
    if (wipMsg) wipMsg.hidden = true;
    $$("[data-auth-acct]", authBox).forEach((b) => b.addEventListener("click", () => {
      const p = AUTH_ACCOUNTS[b.dataset.authAcct];
      if (p && p.wip) {
        if (wipMsg) {
          wipMsg.textContent = l === "ar" ? `لوحة ${p.ar.name} قيد التصميم حالياً، وستتوفر قريباً.` : `${p.en.name}'s dashboard is still being designed and will be available soon.`;
          wipMsg.hidden = false;
        }
        return;
      }
      pickAccount(b.dataset.authAcct);
    }));
  }
  function fillMid(acct) {
    const p = AUTH_ACCOUNTS[acct];
    if (!p || !authBox) return;
    const l = L();
    $$("[data-auth-mid-name]", authBox).forEach((n) => (n.textContent = p[l].name));
    $$("[data-auth-mid-id]", authBox).forEach((n) => (n.textContent = (l === "ar" ? "الرقم المدني · " : "Civil ID · ") + (p.civil || "")));
    $$("[data-auth-mid-role]", authBox).forEach((n) => (n.textContent = p[l].role + " · " + p[l].org));
    $$("[data-auth-mid-mail]", authBox).forEach((n) => (n.textContent = p.email || ""));
    $$("[data-auth-ava]", authBox).forEach((n) => (n.textContent = p.ava));
  }
  function pickAccount(acct) {
    const p = AUTH_ACCOUNTS[acct];
    if (!p) return;
    authAcct = acct; authType = p.type;
    fillMid(acct);
    buildLists();
    authStep(p.type === "staff" ? "mfa" : "mid");
  }
  function homeLabel(type) {
    const l = L();
    return { public: l === "ar" ? "حسابي" : "My account", supplier: l === "ar" ? "لوحة المورد" : "Supplier dashboard", staff: l === "ar" ? "تطبيق الإدارة" : "Admin application" }[type] || "";
  }
  function renderAuth() {
    const acct = authGet();
    const p = acct ? AUTH_ACCOUNTS[acct] : null;
    const type = p ? p.type : "";
    body.classList.toggle("is-signed", !!p);
    body.dataset.authType = type;
    body.dataset.authAccount = acct || "";
    $$("[data-signin-open]").forEach((b) => { if (!b.closest("[data-signin-keep]") && !b.dataset.signinRole) b.hidden = !!p; });
    const accBox = $("[data-signin-account]");
    if (accBox) accBox.hidden = !p;
    if (p) {
      const who = $("[data-signin-who]"), full = $("[data-signin-full]"), role = $("[data-signin-role]"), ava = $("[data-signin-ava]"), home = $("[data-auth-home]");
      if (who) who.textContent = profileField(p, "short");
      if (full) full.textContent = profileField(p, "name");
      if (role) role.textContent = profileField(p, "role") + " · " + profileField(p, "org");
      if (ava) ava.textContent = p.ava;
      if (home) { home.href = p.home; home.textContent = homeLabel(type); }
      $$("[data-auth-link]").forEach((a) => { a.hidden = !listMatch(a.dataset.authLink, type, acct); });
      // Highlight the menu entry for the page the visitor is actually on
      const here = location.pathname.split("/").pop().toLowerCase() || "index.html";
      $$("[data-account-menu] a").forEach((a) => { a.classList.toggle("is-current", a.getAttribute("href").split("#")[0].toLowerCase() === here); });
    }
    // Page hooks
    $$("[data-signed-only]").forEach((el) => { el.hidden = !(p && listMatch(el.dataset.signedOnly, type, acct)); });
    $$("[data-guest-only]").forEach((el) => { el.hidden = !!(p && listMatch(el.dataset.guestOnly, type, acct)); });
    if (p) {
      $$("[data-signed-text]").forEach((el) => { el.textContent = profileField(p, el.dataset.signedText); });
      $$("[data-signed-value]").forEach((el) => { el.value = profileField(p, el.dataset.signedValue); });
      $$("[data-signed-ava]").forEach((el) => { el.textContent = p.ava; });
      const perms = p.perms || [];
      $$("[data-perm]").forEach((el) => { el.hidden = !perms.includes(el.dataset.perm); });
    }
    const menu = $("[data-account-menu]"), tog = $("[data-account-toggle]");
    if (menu) menu.hidden = true;
    if (tog) tog.setAttribute("aria-expanded", "false");
    document.dispatchEvent(new CustomEvent("kada:auth", { detail: { account: acct, type } }));
  }
  function openAuth(type, stay) {
    if (!authBox) return;
    body.classList.remove("menu-open");
    body.classList.add("auth-open");
    authBox.hidden = false;
    authStay = !!stay;
    authAcct = null;
    if (type === "staff") { authType = "staff"; buildLists(); authStep("sso"); }
    else if (type === "public" || type === "supplier") { authType = type; buildLists(); authStep("who"); }
    else { authType = "public"; authStep("choose"); }
  }
  function closeAuth() {
    if (!authBox) return;
    authBox.hidden = true;
    body.classList.remove("auth-open");
    authStep("choose");
    if (authRequired && !authGet()) location.href = "index.html";
  }
  function finishAuth() {
    if (!authAcct) return;
    authSet(authAcct);
    const p = AUTH_ACCOUNTS[authAcct];
    authRequired = false;
    authBox.hidden = true;
    body.classList.remove("auth-open");
    authStep("choose");
    renderAuth();
    if (!authStay && p.home && !location.pathname.toLowerCase().endsWith("/" + p.home)) location.href = p.home;
  }
  $$("[data-signin-open]").forEach((b) => b.addEventListener("click", () => openAuth(b.dataset.signinRole || "", !!b.dataset.signinRole)));
  $$("[data-auth-close]").forEach((b) => b.addEventListener("click", closeAuth));
  if (authBox) authBox.addEventListener("click", (e) => { if (e.target === authBox) closeAuth(); });
  $$("[data-auth-pick]").forEach((b) => b.addEventListener("click", () => { authType = b.dataset.authPick; authAcct = null; buildLists(); authStep(authType === "staff" ? "sso" : "who"); }));
  $$("[data-auth-back]").forEach((b) => b.addEventListener("click", () => authStep(b.dataset.authBack || "choose")));
  $$("[data-auth-approve]").forEach((b) => b.addEventListener("click", finishAuth));
  $$("[data-signin-out]").forEach((b) => b.addEventListener("click", () => {
    const p = AUTH_ACCOUNTS[authGet()];
    authSet(null); renderAuth();
    if (body.dataset.require) location.href = "index.html";
    else if (p && p.type === "staff" && /admin/.test(location.pathname.toLowerCase())) location.href = "index.html";
  }));
  $$("[data-auth-switch]").forEach((b) => b.addEventListener("click", () => { const p = AUTH_ACCOUNTS[authGet()]; openAuth(p ? p.type : "", true); }));
  const accTog = $("[data-account-toggle]"), accMenu = $("[data-account-menu]");
  if (accTog && accMenu) {
    accTog.addEventListener("click", () => { const open = accMenu.hidden; accMenu.hidden = !open; accTog.setAttribute("aria-expanded", open ? "true" : "false"); });
    document.addEventListener("click", (e) => { if (!e.target.closest("[data-signin-account]")) { accMenu.hidden = true; accTog.setAttribute("aria-expanded", "false"); } });
  }
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && authBox && !authBox.hidden) closeAuth(); });
  document.addEventListener("kada:lang", () => { buildLists(); if (authAcct) fillMid(authAcct); renderAuth(); });
  renderAuth();
  // Page guard
  if (body.dataset.require) {
    const need = body.dataset.require.split(",");
    const cur = AUTH_ACCOUNTS[authGet()];
    if (!cur || !need.includes(cur.type)) { authRequired = true; setTimeout(() => openAuth(need[0], true), 400); }
  }
  if (location.hash === "#signin") openAuth("", false);
  window.KADA_AUTH = { accounts: AUTH_ACCOUNTS, get: authGet, open: openAuth };

  /* ---------- Init ---------- */
  captureEnglish();
  applyLang(root.lang, false);
  root.classList.remove("pre");
  onScroll();
})();
