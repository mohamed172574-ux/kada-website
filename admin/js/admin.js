/* =====================================================================
   KADA — Staff admin application engine (static presentation build)
   - Guard: requires a staff demo account (sessionStorage "kada4-auth", see ../js/boot.js)
   - Injects the shell (sidebar, topbar, popovers, icon sprite)
   - Bilingual AR/EN with the same data-i18n contract as the public site
   - Module permissions, hash views, tabs, filters, drawers, toasts, charts
   ===================================================================== */
(function () {
  "use strict";
  const root = document.documentElement, body = document.body;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const ACCOUNTS = window.KADA_ACCOUNTS || {};
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Session ---------- */
  function authGet() {
    try { const s = JSON.parse(sessionStorage.getItem("kada4-auth") || "null"); return s && ACCOUNTS[s.account] ? s.account : null; } catch (e) { return null; }
  }
  const acctId = authGet();
  const acct = acctId ? ACCOUNTS[acctId] : null;
  if (!acct || acct.type !== "staff") { location.replace("../index.html#signin"); return; }
  const perms = acct.perms || [];
  const L = () => (root.lang === "ar" ? "ar" : "en");
  const P = (f) => (acct[L()] && acct[L()][f]) || acct[f] || "";

  /* ---------- Icons ---------- */
  const ICONS = {
    home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    tasks: '<path d="M9 11l2 2 4-4"/><rect x="4" y="4" width="16" height="16" rx="3"/>',
    doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
    cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5M22 9v6"/>',
    cart: '<path d="M3 5h2l2 11h11l2-8H6"/><circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    med: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 12h8"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 15a5 5 0 0 1 5.5 5"/>',
    list: '<path d="M4 6h16M4 12h16M4 18h10"/>',
    cog: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21a2 2 0 0 0 4 0"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    out: '<path d="M10 17l5-5-5-5M15 12H3M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7"/>',
    switch: '<path d="M7 7h12l-3-3M17 17H5l3 3"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    down: '<path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"/>',
    check: '<path d="M5 12l5 5L20 7"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    edit: '<path d="M4 20h4l10-10-4-4L4 16z"/><path d="M12 8l4 4"/>',
    send: '<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>',
    filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
    upload: '<path d="M12 16V4m0 0L8 8m4-4l4 4M4 20h16"/>',
    pin: '<path d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    chev: '<path d="M9 6l6 6-6 6"/>',
    chevd: '<path d="M6 9l6 6 6-6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
    warn: '<path d="M12 3l10 18H2z"/><path d="M12 10v4M12 17.5v.5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
    print: '<path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="7"/>',
    link: '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.5-4.5L3 9M4 13a8 8 0 0 0 14.5 4.5L21 15"/><path d="M3 4v5h5M21 20v-5h-5"/>',
    back: '<path d="M15 18l-6-6 6-6"/>',
    db: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>'
  };
  const sprite = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  sprite.setAttribute("style", "display:none");
  sprite.innerHTML = Object.entries(ICONS).map(([k, d]) => `<symbol id="i-${k}" viewBox="0 0 24 24">${d}</symbol>`).join("");
  body.prepend(sprite);
  const ico = (k, cls) => `<svg class="ico${cls ? " " + cls : ""}" aria-hidden="true"><use href="#i-${k}"/></svg>`;
  window.KADA_ICO = ico;

  /* ---------- Navigation model ---------- */
  const NAV = [
    { grp: "nav.g1", items: [
      { key: "home", href: "index.html", icon: "home", en: "Dashboard" },
      { key: "tasks", href: "index.html#tasks", icon: "tasks", en: "My tasks", cnt: 6 }
    ] },
    { grp: "nav.g2", items: [
      { key: "content", href: "content.html", icon: "globe", en: "Website pages" },
      { key: "approvals", href: "content.html#approvals", icon: "check", en: "Approval queue", cnt: 4 },
      { key: "media", href: "media.html", icon: "upload", en: "Media library" },
      { key: "training", href: "training.html", icon: "cap", en: "Courses & training" },
      { key: "tevents", perm: "training", href: "training.html#events", icon: "cal", en: "Events" }
    ] },
    { grp: "nav.g6", items: [
      { key: "news", perm: "content", href: "content.html#news", icon: "doc", en: "News" },
      { key: "pubs", perm: "content", href: "content.html#pubs", icon: "file", en: "Research & publications" },
      { key: "gallery", perm: "content", href: "content.html#gallery", icon: "image", en: "Media centre" }
    ] },
    { grp: "nav.g3", items: [
      { key: "procurement", href: "procurement.html", icon: "cart", en: "Tenders", cnt: 4 },
      { key: "suppliers", perm: "procurement", href: "procurement.html#suppliers", icon: "users", en: "Suppliers", cnt: 3 },
      { key: "speakup", href: "speakup.html", icon: "shield", en: "Speak Up cases", cnt: 2 },
      { key: "tue", href: "tue.html", icon: "med", en: "TUE applications", cnt: 2 },
      { key: "data", href: "data.html", icon: "lock", en: "Data requests", cnt: 1 },
      { key: "consent", perm: "data", href: "data.html#consent", icon: "check", en: "Consent & privacy notices" },
      { key: "retention", perm: "data", href: "data.html#retention", icon: "clock", en: "Retention schedule" }
    ] },
    { grp: "nav.g4", items: [
      { key: "executive", href: "executive.html", icon: "chart", en: "Executive dashboard" },
      { key: "audit", href: "audit.html", icon: "list", en: "Audit log" },
      { key: "users", href: "users.html", icon: "users", en: "Users & roles" },
      { key: "settings", href: "settings.html", icon: "cog", en: "Settings & integrations" }
    ] }
  ];

  const NAV_GRP_EN = { "nav.g1": "Workspace", "nav.g2": "Website", "nav.g6": "Content modules", "nav.g3": "Operations", "nav.g4": "Governance" };

  /* ---------- Shell strings (AR) ---------- */
  const SHELL_AR = {
    "nav.g1": "مساحة العمل", "nav.g2": "الموقع الإلكتروني", "nav.g6": "وحدات المحتوى", "nav.g3": "العمليات", "nav.g4": "الحوكمة",
    "nav.home": "لوحة المعلومات", "nav.tasks": "مهامي", "nav.content": "صفحات الموقع", "nav.approvals": "قائمة الاعتماد", "nav.media": "مكتبة الوسائط", "nav.training": "الدورات والتدريب", "nav.tevents": "الفعاليات",
    "nav.news": "الأخبار", "nav.pubs": "الأبحاث والمنشورات", "nav.gallery": "المركز الإعلامي",
    "nav.procurement": "المناقصات", "nav.suppliers": "المورّدون", "nav.speakup": "بلاغات Speak Up", "nav.tue": "طلبات الإعفاء العلاجي", "nav.data": "طلبات البيانات", "nav.consent": "الموافقات وإشعارات الخصوصية", "nav.retention": "جدول الاحتفاظ بالبيانات", "nav.executive": "اللوحة التنفيذية",
    "nav.audit": "سجل التدقيق", "nav.users": "المستخدمون والأدوار", "nav.settings": "الإعدادات والتكاملات",
    "sh.brand": "تطبيق الإدارة", "sh.env": "بيئة الإنتاج · جميع الخدمات تعمل", "sh.ver": "الإصدار 4.0 · نموذج العرض",
    "sh.search": "ابحث في الصفحات والبلاغات والمناقصات والمستخدمين…", "sh.notif": "الإشعارات", "sh.all": "عرض جميع الإشعارات", "sh.markread": "تعليم الكل مقروءاً",
    "sh.acct": "حساب العرض الحالي", "sh.switch": "تبديل حساب العرض (موظفون)", "sh.site": "العودة إلى الموقع العام", "sh.profile": "ملفي وجلساتي", "sh.out": "تسجيل الخروج",
    "sh.noaccess": "لا تملك صلاحية هذه الوحدة", "sh.noaccessd": "دورك الحالي لا يشمل هذه الوحدة. اطلب الصلاحية من مدير النظام أو بدّل حساب العرض من أعلى الشاشة.", "sh.gohome": "الانتقال إلى لوحة المعلومات",
    "sh.demo": "نموذج توضيحي — البيانات افتراضية لأغراض العرض", "sh.crumb": "إدارة كادا",
    "sh.n1": "اعتماد مطلوب: «اختتام تدقيق وادا للامتثال 2026 دون ملاحظات حرجة» (عربي + إنجليزي)", "sh.n1d": "قدّمته دانة الكندري · قبل 14 دقيقة",
    "sh.n2": "بلاغ Speak Up جديد SU-2026-0191", "sh.n2d": "التصنيف: اتجار · يجب فرزه خلال 48 ساعة",
    "sh.n3": "طلب البيانات DAR-2026-0402 يقترب من موعده النهائي", "sh.n3d": "تبقّت 4 أيام من مهلة الثلاثين يوماً",
    "sh.n4": "نُشر الملحق رقم 2 للمناقصة KADA/T/2026/014", "sh.n4d": "أُخطر 9 مورّدين ممن اشتروا كراسة الشروط",
    "sh.toast.search": "البحث الموحّد — معاينة تصميم", "sh.toast.done": "تم — معاينة تصميم (لا يُرسَل أي شيء)",
    "sh.greet.m": "صباح الخير،", "sh.greet.a": "مساء الخير،", "sh.greet.e": "مساء الخير،",
    "sh.staff": "موظفو كادا", "sh.wiptag": "قيد التصميم"
  };
  const AR = Object.assign({}, SHELL_AR, window.KADA_AR_PAGE || {});

  /* ---------- Shell ---------- */
  const module = body.dataset.module || "home";
  const navHTML = NAV.map((g) => {
    const items = g.items.filter((i) => perms.includes(i.perm || i.key));
    if (!items.length) return "";
    return `<h6 data-i18n="${g.grp}">${NAV_GRP_EN[g.grp]}</h6>` + items.map((i) =>
      `<a href="${i.href}" data-nav="${i.key}">${ico(i.icon)}<span data-i18n="nav.${i.key}">${i.en}</span>${i.cnt ? `<span class="cnt num">${i.cnt}</span>` : ""}</a>`).join("");
  }).join("");
  const staffList = Object.entries(ACCOUNTS).filter(([, p]) => p.type === "staff" && !p.hidden).map(([id, p]) =>
    `<button type="button" class="acct${id === acctId ? " is-on" : ""}${p.wip ? " is-wip" : ""}" ${p.wip ? "data-wip" : "data-switch"}="${id}"><span class="ava">${p.ava}</span><span><b><span data-acct-name="${id}"></span>${p.wip ? ` <em class="wip-tag" data-i18n="sh.wiptag">In design</em>` : ""}</b><small data-acct-role="${id}"></small></span></button>`).join("");

  const app = document.createElement("div");
  app.className = "ad-app";
  app.innerHTML = `
    <aside class="sb" aria-label="Admin navigation">
      <div class="sb-brand"><img src="../assets/logo.png" alt="KADA"><span data-i18n="sh.brand">Admin<br>application</span></div>
      <div class="sb-user"><span class="ava" data-user-ava></span><div><b data-user-text="name"></b><small data-user-text="role"></small><small data-user-text="org"></small></div></div>
      <nav class="sb-nav">${navHTML}</nav>
      <div class="sb-foot"><span class="sb-env" data-i18n="sh.env">Production · all services healthy</span><b data-i18n="sh.ver">v4.0 · presentation build</b></div>
    </aside>
    <div class="main">
      <header class="tb">
        <button class="tb-menu" type="button" data-sb-toggle aria-label="Menu">${ico("menu")}</button>
        <div class="tb-crumb"><span data-i18n="sh.crumb">KADA Admin</span>${ico("chev")}<b data-crumb></b></div>
        <label class="tb-search">${ico("search")}<input type="search" data-search placeholder="Search pages, cases, tenders, users…" data-i18n-ph="sh.search"><kbd>/</kbd></label>
        <div class="tb-right">
          <div class="has-pop">
            <button class="tb-btn" type="button" data-pop="notif" aria-label="Notifications">${ico("bell")}<span class="ndot"></span></button>
            <div class="pop" data-pop-panel="notif" hidden>
              <h5 data-i18n="sh.notif">Notifications</h5>
              <a href="content.html#approvals" class="notif"><i class="warn"></i><span><b data-i18n="sh.n1">Approval needed: "WADA 2026 compliance audit closes with no critical findings" (AR + EN)</b><small data-i18n="sh.n1d">Submitted by Dana Al-Kandari · 14 min ago</small></span></a>
              <a href="speakup.html#case" class="notif"><i class="red"></i><span><b data-i18n="sh.n2">New Speak Up report SU-2026-0191</b><small data-i18n="sh.n2d">Category: trafficking · triage due within 48 h</small></span></a>
              <a href="data.html#request" class="notif"><i class="warn"></i><span><b data-i18n="sh.n3">DAR-2026-0402 approaching deadline</b><small data-i18n="sh.n3d">4 days left of the 30-day window</small></span></a>
              <a href="procurement.html#tender" class="notif"><i></i><span><b data-i18n="sh.n4">Addendum 2 published for KADA/T/2026/014</b><small data-i18n="sh.n4d">9 suppliers who purchased documents were notified</small></span></a>
              <hr><button type="button" data-toast="All notifications marked as read" data-toast-ar="تم تعليم كل الإشعارات كمقروءة">${ico("check")}<span data-i18n="sh.markread">Mark all as read</span></button>
            </div>
          </div>
          <button class="tb-lang" type="button" data-lang-toggle>EN</button>
          <div class="has-pop">
            <button class="tb-user" type="button" data-pop="user" aria-haspopup="true"><span class="ava" data-user-ava></span><span data-user-text="short"></span>${ico("chevd")}</button>
            <div class="pop" data-pop-panel="user" hidden>
              <h5 data-i18n="sh.acct">Current demo account</h5>
              <div class="acct is-on" style="cursor:default"><span class="ava" data-user-ava></span><span><b data-user-text="name"></b><small data-user-text="email"></small></span></div>
              <hr>
              <h5 data-i18n="sh.switch">Switch demo account (staff)</h5>
              ${staffList}
              <hr>
              <a href="index.html#profile">${ico("users")}<span data-i18n="sh.profile">My profile & sessions</span></a>
              <a href="../index.html">${ico("globe")}<span data-i18n="sh.site">Back to public website</span></a>
              <button type="button" class="danger" data-signout>${ico("out")}<span data-i18n="sh.out">Sign out</span></button>
            </div>
          </div>
        </div>
      </header>
      <main class="content" data-content></main>
    </div>
    <div class="scrim" data-sb-close></div>
    <div class="toast" data-toast-box role="status">${ico("check")}<span></span></div>
    <div class="demo-tag" data-i18n="sh.demo">Presentation mock-up — data is fictitious</div>`;

  const page = $("[data-page]");
  const content = $("[data-content]", app);
  const approvalsOnly = module === "content" && !perms.includes("content") && perms.includes("approvals");
  if ((perms.includes(module) || approvalsOnly) && page) {
    while (page.firstChild) content.appendChild(page.firstChild);
    page.remove();
  } else {
    if (page) page.remove();
    content.innerHTML = `<div class="noaccess">${ico("lock")}<h2 data-i18n="sh.noaccess">You don't have access to this module</h2><p class="muted" data-i18n="sh.noaccessd">Your current role does not include this module. Ask the system administrator for access, or switch the demo account from the top bar.</p><a class="btn btn-primary sm" href="index.html" data-i18n="sh.gohome">Go to dashboard</a></div>`;
  }
  body.classList.add("admin");
  body.prepend(app);

  /* ---------- i18n ---------- */
  function captureEnglish() {
    $$("[data-i18n]").forEach((el) => { if (el.dataset.en === undefined) el.dataset.en = el.innerHTML; });
    $$("[data-i18n-ph]").forEach((el) => { if (el.dataset.en === undefined) el.dataset.en = el.getAttribute("placeholder") || ""; });
    const t = $("title[data-i18n-title]"); if (t && t.dataset.en === undefined) t.dataset.en = t.textContent;
  }
  function applyLang(lang, persist) {
    const ar = lang === "ar";
    root.lang = lang; root.dir = ar ? "rtl" : "ltr";
    $$("[data-i18n]").forEach((el) => { const k = el.dataset.i18n; el.innerHTML = ar && AR[k] !== undefined ? AR[k] : el.dataset.en; });
    $$("[data-i18n-ph]").forEach((el) => { const k = el.dataset.i18nPh; el.setAttribute("placeholder", ar && AR[k] !== undefined ? AR[k] : el.dataset.en); });
    const t = $("title[data-i18n-title]"); if (t) t.textContent = ar && AR[t.dataset.i18nTitle] ? AR[t.dataset.i18nTitle] : t.dataset.en;
    $$("[data-st-en]:not([data-set-status])").forEach((el) => { el.textContent = ar ? el.dataset.stAr : el.dataset.stEn; });
    $$("[data-lang-toggle]").forEach((b) => (b.textContent = ar ? "EN" : "عربي"));
    if (persist) { try { localStorage.setItem("kada4-lang", lang); } catch (e) {} }
    renderUser(); renderCharts(); setCrumb();
    document.dispatchEvent(new CustomEvent("kada:lang", { detail: { lang } }));
  }
  $$("[data-lang-toggle]").forEach((b) => b.addEventListener("click", () => applyLang(root.lang === "ar" ? "en" : "ar", true)));

  function renderUser() {
    $$("[data-user-text]").forEach((el) => (el.textContent = P(el.dataset.userText)));
    $$("[data-user-ava]").forEach((el) => (el.textContent = acct.ava));
    Object.entries(ACCOUNTS).forEach(([id, p]) => {
      const l = L();
      $$(`[data-acct-name="${id}"]`).forEach((el) => (el.textContent = p[l].name));
      $$(`[data-acct-role="${id}"]`).forEach((el) => (el.textContent = p[l].role + " · " + p[l].org));
    });
    const h = new Date().getHours();
    const g = h < 12 ? "m" : h < 17 ? "a" : "e";
    $$("[data-greet]").forEach((el) => { el.textContent = L() === "ar" ? SHELL_AR["sh.greet." + g] : ({ m: "Good morning,", a: "Good afternoon,", e: "Good evening," })[g]; });
    $$("[data-perm]").forEach((el) => { el.hidden = !perms.includes(el.dataset.perm) || (el.dataset.noPerm && perms.includes(el.dataset.noPerm)); });
    $$("[data-acct]").forEach((el) => { el.hidden = !el.dataset.acct.split(",").map((x) => x.trim()).includes(acctId); });
    $$("[data-not-acct]").forEach((el) => { el.hidden = el.dataset.notAcct.split(",").map((x) => x.trim()).includes(acctId); });
  }
  function setCrumb() {
    const c = $("[data-crumb]"); if (!c) return;
    const key = currentNavKey();
    const item = NAV.flatMap((g) => g.items).find((i) => i.key === key);
    c.textContent = item ? (L() === "ar" ? AR["nav." + key] : item.en) : "";
  }

  /* ---------- Views (hash) ---------- */
  const views = $$("[data-view]");
  function currentView() {
    if (approvalsOnly) return "approvals";
    const h = (location.hash || "").slice(1).split("?")[0];
    return views.some((v) => v.dataset.view === h) ? h : (views[0] ? views[0].dataset.view : "");
  }
  function currentNavKey() {
    const v = currentView();
    if (module === "home" && v === "tasks") return "tasks";
    if (module === "content") return ({ approvals: "approvals", news: "news", edit: "news", pubs: "pubs", gallery: "gallery" })[v] || "content";
    if (module === "training") return v === "events" ? "tevents" : "training";
    if (module === "procurement") return v === "suppliers" ? "suppliers" : "procurement";
    if (module === "data") return ({ consent: "consent", retention: "retention" })[v] || "data";
    return module;
  }
  function showView() {
    const v = currentView();
    views.forEach((s) => s.classList.toggle("is-on", s.dataset.view === v));
    $$(".tabs a[href^='#']").forEach((a) => a.classList.toggle("is-on", a.getAttribute("href") === "#" + v));
    $$("[data-nav]").forEach((a) => a.classList.toggle("is-on", a.dataset.nav === currentNavKey()));
    setCrumb();
    window.scrollTo({ top: 0, behavior: "auto" });
  }
  window.addEventListener("hashchange", showView);
  $$("[data-go]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); location.hash = b.dataset.go; }));

  /* ---------- Tabs ---------- */
  $$("[data-tabs]").forEach((box) => {
    const g = box.dataset.tabs;
    const panes = $$(`[data-pane-group="${g}"]`);
    const btns = $$("[data-tab]", box);
    function go(k) {
      btns.forEach((b) => b.classList.toggle("is-on", b.dataset.tab === k));
      panes.forEach((p) => { p.hidden = p.dataset.pane !== k; });
    }
    btns.forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); go(b.dataset.tab); }));
    const first = btns.find((b) => b.classList.contains("is-on")) || btns[0];
    if (first) go(first.dataset.tab);
  });

  /* ---------- Filters ---------- */
  $$("[data-filter-group]").forEach((box) => {
    const g = box.dataset.filterGroup;
    const chips = $$("[data-filter]", box);
    const rows = () => $$(`[data-filter-rows="${g}"] [data-f]`);
    chips.forEach((c) => {
      const f = c.dataset.filter;
      const n = f === "all" ? rows().length : rows().filter((r) => r.dataset.f.split(" ").includes(f)).length;
      const cnt = $(".cnt", c); if (cnt) cnt.textContent = n;
      c.addEventListener("click", () => {
        chips.forEach((x) => x.classList.toggle("is-on", x === c));
        rows().forEach((r) => { r.hidden = !(f === "all" || r.dataset.f.split(" ").includes(f)); });
      });
    });
  });

  /* ---------- Popovers, drawers, toasts, switches ---------- */
  function closePops() { $$("[data-pop-panel]").forEach((p) => (p.hidden = true)); }
  $$("[data-pop]").forEach((b) => b.addEventListener("click", (e) => {
    e.stopPropagation();
    const p = $(`[data-pop-panel="${b.dataset.pop}"]`); const open = p.hidden; closePops(); p.hidden = !open;
  }));
  document.addEventListener("click", (e) => { if (!e.target.closest(".has-pop")) closePops(); });
  $$("[data-drawer]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); const d = document.getElementById(b.dataset.drawer); if (d) { d.classList.add("is-open"); body.style.overflow = "hidden"; } }));
  $$(".drawer").forEach((d) => {
    const close = () => { d.classList.remove("is-open"); body.style.overflow = ""; };
    $$("[data-close], .bg", d).forEach((x) => x.addEventListener("click", close));
  });
  const hashDrawer = new URLSearchParams((location.hash.split("?")[1]) || "").get("drawer");
  if (hashDrawer && document.getElementById(hashDrawer)) { document.getElementById(hashDrawer).classList.add("is-open"); body.style.overflow = "hidden"; }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closePops(); $$(".drawer.is-open").forEach((d) => { d.classList.remove("is-open"); body.style.overflow = ""; }); body.classList.remove("sb-open"); }
    if (e.key === "/" && !/input|textarea/i.test(document.activeElement.tagName)) { const s = $("[data-search]"); if (s) { e.preventDefault(); s.focus(); } }
  });
  let toastT;
  function toast(en, ar) {
    const box = $("[data-toast-box]"); if (!box) return;
    $("span", box).textContent = L() === "ar" ? (ar || en) : en;
    box.classList.add("is-on"); clearTimeout(toastT); toastT = setTimeout(() => box.classList.remove("is-on"), 2600);
  }
  window.KADA_TOAST = toast;
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-toast]"); if (!b) return;
    if (b.tagName === "A") e.preventDefault();
    toast(b.dataset.toast, b.dataset.toastAr);
    if (b.dataset.setStatus) {
      const [sel, cls, en, ar] = [b.dataset.setStatus, b.dataset.stClass ?? "ok", b.dataset.stEn || "", b.dataset.stAr || ""];
      $$(sel).forEach((t) => { t.className = "st " + cls; t.removeAttribute("data-i18n"); t.dataset.stEn = en; t.dataset.stAr = ar; t.textContent = L() === "ar" ? ar : en; });
    }
    if (b.dataset.hideAfter !== undefined) { if (b.dataset.hideAfter) $$(b.dataset.hideAfter).forEach((x) => (x.hidden = true)); else b.hidden = true; }
    if (b.dataset.showAfter) $$(b.dataset.showAfter).forEach((x) => (x.hidden = false));
  });
  $$(".switch").forEach((s) => s.addEventListener("click", () => s.classList.toggle("on")));
  $$("[data-sb-toggle]").forEach((b) => b.addEventListener("click", () => body.classList.toggle("sb-open")));
  $$("[data-sb-close]").forEach((b) => b.addEventListener("click", () => body.classList.remove("sb-open")));
  $$(".sb-nav a").forEach((a) => a.addEventListener("click", () => body.classList.remove("sb-open")));
  const search = $("[data-search]");
  if (search) search.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); toast("Unified search — design preview", SHELL_AR["sh.toast.search"]); } });
  $$("[data-switch]").forEach((b) => b.addEventListener("click", () => { sessionStorage.setItem("kada4-auth", JSON.stringify({ account: b.dataset.switch })); location.href = "index.html"; }));
  $$("[data-wip]").forEach((b) => b.addEventListener("click", () => {
    const p = ACCOUNTS[b.dataset.wip];
    toast(`${p.en.name}'s dashboard is still being designed and will be available soon.`, `لوحة ${p.ar.name} قيد التصميم حالياً، وستتوفر قريباً.`);
  }));
  $$("[data-signout]").forEach((b) => b.addEventListener("click", () => { sessionStorage.removeItem("kada4-auth"); location.href = "../index.html"; }));
  $$("tr[data-sel]").forEach((tr) => tr.addEventListener("click", (e) => { if (e.target.closest("a,button,input")) return; $$("tr[data-sel]", tr.closest("table")).forEach((x) => x.classList.toggle("is-sel", x === tr)); }));

  /* ---------- KPI count-up ---------- */
  function countUp() {
    if (reduced) return;
    $$(".kpi b[data-count]").forEach((el) => {
      const target = parseFloat(el.dataset.count), dec = (el.dataset.count.split(".")[1] || "").length, suffix = el.dataset.suffix || "";
      const t0 = performance.now(), dur = 900;
      const step = (t) => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.firstChild.nodeValue = (target * e).toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix; if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }

  /* ---------- Charts (SVG) ---------- */
  const PALETTE = { navy: "#07251c", green: "#0f7a4a", lime: "#4ee39a", red: "#d9203c", amber: "#e59a00", blue: "#1f62bd", grey: "#cfd8d3", mint: "#9fe7c4" };
  const col = (c) => PALETTE[c] || c;
  function renderCharts() {
    $$("svg[data-chart]").forEach((svg) => {
      const type = svg.dataset.chart;
      const series = (svg.dataset.values || "").split("|").map((s) => s.split(",").map(Number));
      const labels = ((L() === "ar" && svg.dataset.labelsAr) ? svg.dataset.labelsAr : svg.dataset.labels || "").split(",").filter(Boolean);
      const colors = (svg.dataset.colors || "green,navy,lime,amber,red,blue").split(",").map(col);
      const W = 400, H = type === "spark" ? 40 : +svg.dataset.h || 180;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.setAttribute("preserveAspectRatio", "none");
      let out = "";
      if (type === "spark") {
        const v = series[0], max = Math.max(...v), min = Math.min(...v);
        const pts = v.map((y, i) => [i * (W / (v.length - 1)), H - 4 - ((y - min) / ((max - min) || 1)) * (H - 8)]);
        const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
        out = `<path d="${d} L${W} ${H} L0 ${H}Z" fill="${colors[0]}" opacity=".12"/><path d="${d}" fill="none" stroke="${colors[0]}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`;
        svg.setAttribute("preserveAspectRatio", "none");
      } else if (type === "bars" || type === "stacked") {
        const padL = 30, padB = 22, padT = 8, n = series[0].length;
        const totals = type === "stacked" ? series[0].map((_, i) => series.reduce((a, s) => a + s[i], 0)) : series.flat();
        const max = Math.max(...totals) * 1.1 || 1;
        const gw = (W - padL - 6) / n, bw = type === "stacked" ? gw * 0.58 : (gw * 0.7) / series.length;
        for (let g = 0; g <= 4; g++) { const y = padT + (H - padT - padB) * (g / 4); out += `<line x1="${padL}" x2="${W}" y1="${y}" y2="${y}" stroke="rgba(15,23,19,.07)"/><text x="${padL - 6}" y="${y + 4}" text-anchor="end">${Math.round(max * (1 - g / 4))}</text>`; }
        for (let i = 0; i < n; i++) {
          let acc = 0;
          series.forEach((s, si) => {
            const h = (s[i] / max) * (H - padT - padB);
            const x = type === "stacked" ? padL + i * gw + (gw - bw) / 2 : padL + i * gw + gw * 0.15 + si * bw;
            const y = type === "stacked" ? H - padB - acc - h : H - padB - h;
            out += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(type === "stacked" ? bw : bw - 2).toFixed(1)}" height="${h.toFixed(1)}" rx="${type === "stacked" ? 0 : 3}" fill="${colors[si % colors.length]}"><title>${labels[i] || ""}: ${s[i]}</title></rect>`;
            acc += h;
          });
          if (labels[i]) out += `<text x="${padL + i * gw + gw / 2}" y="${H - 6}" text-anchor="middle">${labels[i]}</text>`;
        }
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      } else if (type === "line" || type === "area") {
        const padL = 30, padB = 22, padT = 8;
        const max = Math.max(...series.flat()) * 1.1 || 1;
        for (let g = 0; g <= 4; g++) { const y = padT + (H - padT - padB) * (g / 4); out += `<line x1="${padL}" x2="${W}" y1="${y}" y2="${y}" stroke="rgba(15,23,19,.07)"/><text x="${padL - 6}" y="${y + 4}" text-anchor="end">${Math.round(max * (1 - g / 4))}</text>`; }
        series.forEach((s, si) => {
          const pts = s.map((v, i) => [padL + i * ((W - padL - 8) / (s.length - 1)), H - padB - (v / max) * (H - padT - padB)]);
          const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
          if (type === "area" || si === 0) out += `<path d="${d} L${pts[pts.length - 1][0]} ${H - padB} L${padL} ${H - padB}Z" fill="${colors[si]}" opacity=".10"/>`;
          out += `<path d="${d}" fill="none" stroke="${colors[si]}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
          pts.forEach((p, i) => { out += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.2" fill="#fff" stroke="${colors[si]}" stroke-width="2"><title>${labels[i] || ""}: ${s[i]}</title></circle>`; });
        });
        labels.forEach((l, i) => { out += `<text x="${padL + i * ((W - padL - 8) / (labels.length - 1))}" y="${H - 6}" text-anchor="middle">${l}</text>`; });
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      } else if (type === "donut") {
        const v = series[0], tot = v.reduce((a, b) => a + b, 0) || 1, R = 70, r = 48, cx = 100, cy = 100;
        svg.setAttribute("viewBox", "0 0 200 200"); svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        let a0 = -Math.PI / 2;
        v.forEach((x, i) => {
          const a1 = a0 + (x / tot) * Math.PI * 2, big = a1 - a0 > Math.PI ? 1 : 0;
          const p = (a, rad) => [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
          const [x0, y0] = p(a0, R), [x1, y1] = p(a1, R), [x2, y2] = p(a1, r), [x3, y3] = p(a0, r);
          out += `<path d="M${x0} ${y0} A${R} ${R} 0 ${big} 1 ${x1} ${y1} L${x2} ${y2} A${r} ${r} 0 ${big} 0 ${x3} ${y3}Z" fill="${colors[i % colors.length]}" stroke="#fff" stroke-width="2"><title>${labels[i] || ""}: ${x}</title></path>`;
          a0 = a1;
        });
        const center = svg.dataset.center || tot;
        out += `<text x="${cx}" y="${cy - 2}" text-anchor="middle" style="font-size:26px;font-weight:800;fill:#07251c">${center}</text><text x="${cx}" y="${cy + 18}" text-anchor="middle" style="font-size:11px">${(L() === "ar" && svg.dataset.centerLabelAr) ? svg.dataset.centerLabelAr : svg.dataset.centerLabel || ""}</text>`;
      }
      svg.innerHTML = out;
    });
  }

  /* ---------- Init ---------- */
  captureEnglish();
  applyLang(root.lang, false);
  showView();
  countUp();
  root.classList.remove("pre");
  window.KADA_ADMIN = { account: acctId, profile: acct, perms, toast, ico, applyLang };
})();
