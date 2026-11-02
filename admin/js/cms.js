/* =====================================================================
   KADA admin — Website content (static presentation build)
   - Site pages list: chip filter + search, grouped rows
   - Page editor: structured, section-by-section editor for the home page
     (content comes from js/cms-home.js); other pages show a placeholder
   - Modules (news, publications, media centre):
     row editors open a drawer pre-filled with the item
   Nothing is saved — this is a design preview.
   ===================================================================== */
(function () {
  "use strict";
  const A = window.KADA_ADMIN;
  if (!A) return;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const root = document.documentElement, body = document.body;
  const L = () => (root.lang === "ar" ? "ar" : "en");
  const ico = A.ico;
  const H = window.KADA_HOME || {};
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const toast = (en, ar) => A.toast(en, ar);

  const S = {
    en: {
      kicker: "Small heading", eyebrow: "Line above the heading", title: "Heading", lede: "Intro text", text: "Text", desc: "Description", tag: "Label on the image",
      btn: "Button", btn1: "Main button", btn2: "Second button", cardlink: "Card link text", opens: "Opens", url: "Web address",
      img: "Image", bg: "Background image", alt: "Alt text (for screen readers)", altph_ar: "وصف الصورة بالعربية", altph_en: "Describe the image in English", replace: "Replace", dims: "JPG · 1920 × 1080",
      points: "Bullet points", addpoint: "Add a point", badge: "Badge under the number", year: "Number", value: "Number", label: "Text under the number",
      name: "Name", word: "Highlighted word", tab: "Tab name", tip: "Description shown to visitors", store: "Store link", storeph: "Added when the app is published in the store",
      chat: "Assistant demo window", chname: "Assistant name", chstat: "Status line", chph: "Placeholder in the question box", chdisc: "Disclaimer under the window", track: "Tracking button",
      g_text: "Texts", g_btns: "Buttons", g_media: "Image", g_set: "Settings",
      r_slides: "Slides", r_quick: "Links", r_cards: "Service cards", r_more: "Extra service links", r_res: "Resource cards", r_steps: "Steps", r_screens: "App screens shown on the page",
      r_stats: "Figures", r_logos: "Logos", r_tiles: "Tiles", r_feed: "Shown on the page now",
      add_slide: "Add a slide", add_item: "Add an item", it_new: "New item — fill it in Arabic and English",
      up: "Move up", down: "Move down", del: "Remove", more: "Edit", less: "Close",
      set_auto: "Change slides automatically", set_autod: "Pauses when the visitor hovers or uses the arrows", set_int: "Time per slide", sec7: "7 seconds", sec10: "10 seconds", sec5: "5 seconds",
      feed_n: "Number of items", feed_src: "Taken from", m_news: "News", m_events: "Events", m_courses: "Courses", feed_note: "This section fills itself with the latest published items. To change an item, edit it in its module.",
      feed_go: "Manage news", pin: "Pin", pinned: "Pinned",
      s_hero: "Main slides", s_quick: "Quick links bar", s_about: "About the agency", s_services: "E-services", s_wada: "International resources", s_ops: "The journey of a sample",
      s_app: "Mobile application", s_ai: "KADA AI", s_stats: "The website in numbers", s_partners: "Partners & integrations", s_kafah: "Awareness programme", s_news: "News & events", s_speak: "Speak Up — confidential reporting",
      sum_hero: "{n} slides · change every 7 s", sum_quick: "{n} links under the slides", sum_about: "Image · text · 4 points · 2 buttons", sum_services: "{n} cards · {m} extra links", sum_wada: "{n} cards with external links",
      sum_ops: "{n} steps · background image", sum_app: "{n} screens · 4 features", sum_ai: "3 assistants · demo window", sum_stats: "{n} figures", sum_partners: "{n} logos", sum_kafah: "{n} tiles · 1 button",
      sum_news: "Automatic · latest {n} items", sum_speak: "Text · button · tracking box", sum_new: "New section · draft",
      view: "View on the website", vis: "Show on the page", hidden: "Hidden", isnew: "New", delsec: "Remove section",
      secs: "Page sections", secsd: "{n} sections · drag to reorder", header: "Header & main menu", footer: "Footer", shared: "Shared on every page · edited in Menus & settings",
      dirty0: "No unsaved changes", dirty: "{n} unsaved changes", undo: "Undo all",
      st_draft: "Draft v12", st_saved: "Draft v12 · saved", st_sub: "Awaiting approval", st_pub: "Published",
      t_save: ["Draft saved — design preview, nothing is stored", "حُفظت المسودة — معاينة تصميم، لا يُخزَّن شيء"],
      t_submit: ["Sent for approval to Salem Al-Dosari — design preview", "أُرسلت للاعتماد إلى سالم الدوسري — معاينة تصميم"],
      t_pub: ["Published in Arabic and English — design preview", "نُشرت بالعربية والإنجليزية — معاينة تصميم"],
      t_undo: ["All changes undone", "تم التراجع عن كل التعديلات"],
      t_img: ["Image replaced in the draft", "استُبدلت الصورة في المسودة"],
      t_add: ["Section added to the end of the page — fill it in both languages", "أُضيف القسم في آخر الصفحة — املأه باللغتين"],
      t_del: ["Item removed from the draft", "حُذف العنصر من المسودة"],
      t_pin: ["Pinned items stay on the home page until you unpin them", "تبقى العناصر المثبّتة في الصفحة الرئيسية حتى تُلغى"],
      nb_text: "Text & image", nb_cards: "Cards", nb_stats: "Key figures", nb_cta: "Call to action", nb_faq: "Questions & answers", nb_steps: "Steps", nb_docs: "Documents", nb_news: "Latest news or events", nb_notice: "Notice",
      q: "Question", a: "Answer", doc: "Document title", date: "Date",
      p_index: "Home page", p_about: "About KADA", p_platform: "The KADA platform", p_services: "E-services", p_sanctions: "Sanctions registry", p_speakup: "Speak Up", p_training: "Training & events portal",
      p_tenders: "Tenders & procurement", p_prohibited: "Prohibited List & medicine checker", p_tue: "Therapeutic use exemption", p_assistant: "KADA AI assistant", p_education: "Education programme",
      p_faq: "FAQs", p_news: "News", p_events: "Events", p_datareq: "Data access request", p_supplier: "Supplier registration", p_wada: "WADA compliance", p_contact: "Contact us", p_pubs: "Research & publications", p_course: "Course page", p_event: "Event page", p_article: "News article",
      it_edit: "Edit", it_new_h: "New"
    },
    ar: {
      kicker: "العنوان الصغير", eyebrow: "السطر فوق العنوان", title: "العنوان", lede: "النص التمهيدي", text: "النص", desc: "الوصف", tag: "الوسم على الصورة",
      btn: "الزر", btn1: "الزر الرئيسي", btn2: "الزر الثاني", cardlink: "نص رابط البطاقة", opens: "يفتح", url: "عنوان الرابط",
      img: "الصورة", bg: "صورة الخلفية", alt: "النص البديل (لقارئات الشاشة)", altph_ar: "وصف الصورة بالعربية", altph_en: "Describe the image in English", replace: "استبدال", dims: "JPG · 1920 × 1080",
      points: "النقاط", addpoint: "إضافة نقطة", badge: "الوصف تحت الرقم", year: "الرقم", value: "الرقم", label: "النص تحت الرقم",
      name: "الاسم", word: "الكلمة المميّزة", tab: "اسم التبويب", tip: "الوصف الذي يظهر للزائر", store: "رابط المتجر", storeph: "يُضاف عند نشر التطبيق في المتجر",
      chat: "نافذة المساعد التجريبية", chname: "اسم المساعد", chstat: "سطر الحالة", chph: "النص داخل خانة السؤال", chdisc: "التنبيه أسفل النافذة", track: "زر التتبّع",
      g_text: "النصوص", g_btns: "الأزرار", g_media: "الصورة", g_set: "الإعدادات",
      r_slides: "الشرائح", r_quick: "الروابط", r_cards: "بطاقات الخدمات", r_more: "روابط خدمات إضافية", r_res: "بطاقات المصادر", r_steps: "الخطوات", r_screens: "شاشات التطبيق المعروضة في الصفحة",
      r_stats: "الأرقام", r_logos: "الشعارات", r_tiles: "البطاقات", r_feed: "المعروض في الصفحة الآن",
      add_slide: "إضافة شريحة", add_item: "إضافة عنصر", it_new: "عنصر جديد — املأه بالعربية والإنجليزية",
      up: "نقل لأعلى", down: "نقل لأسفل", del: "حذف", more: "تعديل", less: "إغلاق",
      set_auto: "تبديل الشرائح تلقائياً", set_autod: "يتوقف عند مرور الزائر عليها أو استخدامه الأسهم", set_int: "مدة كل شريحة", sec7: "7 ثوانٍ", sec10: "10 ثوانٍ", sec5: "5 ثوانٍ",
      feed_n: "عدد العناصر", feed_src: "المصدر", m_news: "الأخبار", m_events: "الفعاليات", m_courses: "الدورات", feed_note: "يمتلئ هذا القسم تلقائياً بأحدث العناصر المنشورة. لتعديل أي عنصر، عدّله من الوحدة الخاصة به.",
      feed_go: "إدارة الأخبار", pin: "تثبيت", pinned: "مثبّت",
      s_hero: "الشرائح الرئيسية", s_quick: "شريط الروابط السريعة", s_about: "عن الوكالة", s_services: "الخدمات الإلكترونية", s_wada: "مصادر دولية", s_ops: "رحلة العينة",
      s_app: "تطبيق الجوال", s_ai: "كادا الذكي", s_stats: "الموقع بالأرقام", s_partners: "الشركاء والتكاملات", s_kafah: "برنامج التوعية", s_news: "الأخبار والفعاليات", s_speak: "بلاغ سري — Speak Up",
      sum_hero: "{n} شرائح · تتبدّل كل 7 ثوانٍ", sum_quick: "{n} روابط أسفل الشرائح", sum_about: "صورة · نص · 4 نقاط · زرّان", sum_services: "{n} بطاقات · {m} روابط إضافية", sum_wada: "{n} بطاقات بروابط خارجية",
      sum_ops: "{n} خطوات · صورة خلفية", sum_app: "{n} شاشات · 4 مزايا", sum_ai: "3 مساعدين · نافذة تجريبية", sum_stats: "{n} أرقام", sum_partners: "{n} شعارات", sum_kafah: "{n} بطاقات · زر واحد",
      sum_news: "تلقائي · أحدث {n} عناصر", sum_speak: "نص · زر · خانة التتبّع", sum_new: "قسم جديد · مسودة",
      view: "عرض في الموقع", vis: "إظهار في الصفحة", hidden: "مخفي", isnew: "جديد", delsec: "حذف القسم",
      secs: "أقسام الصفحة", secsd: "{n} قسماً · اسحب لتغيير الترتيب", header: "رأس الصفحة والقائمة الرئيسية", footer: "التذييل", shared: "مشترك في كل الصفحات · يُعدَّل من القوائم والإعدادات",
      dirty0: "لا توجد تعديلات غير محفوظة", dirty: "{n} تعديلات غير محفوظة", undo: "تراجع عن الكل",
      st_draft: "مسودة الإصدار 12", st_saved: "مسودة الإصدار 12 · محفوظة", st_sub: "بانتظار الاعتماد", st_pub: "منشورة",
      nb_text: "نص وصورة", nb_cards: "بطاقات", nb_stats: "أرقام رئيسية", nb_cta: "دعوة إلى إجراء", nb_faq: "أسئلة وأجوبة", nb_steps: "خطوات", nb_docs: "وثائق", nb_news: "أحدث الأخبار أو الفعاليات", nb_notice: "تنبيه",
      q: "السؤال", a: "الإجابة", doc: "عنوان الوثيقة", date: "التاريخ",
      p_index: "الصفحة الرئيسية", p_about: "عن كادا", p_platform: "منصة كادا", p_services: "الخدمات الإلكترونية", p_sanctions: "سجل العقوبات", p_speakup: "بلاغ سري", p_training: "بوابة التدريب والفعاليات",
      p_tenders: "المناقصات والمشتريات", p_prohibited: "قائمة المحظورات وفاحص الأدوية", p_tue: "الإعفاء للاستعمال العلاجي", p_assistant: "مساعد كادا الذكي", p_education: "برنامج التثقيف",
      p_faq: "الأسئلة الشائعة", p_news: "الأخبار", p_events: "الفعاليات", p_datareq: "طلب الوصول إلى البيانات", p_supplier: "تسجيل الموردين", p_wada: "الامتثال لمتطلبات وادا", p_contact: "تواصل معنا", p_pubs: "الأبحاث والمنشورات", p_course: "صفحة الدورة", p_event: "صفحة الفعالية", p_article: "صفحة الخبر",
      it_edit: "تعديل", it_new_h: "جديد"
    }
  };
  const t = (k, vars) => {
    let s = S[L()][k] !== undefined ? S[L()][k] : S.en[k] !== undefined ? S.en[k] : k;
    if (Array.isArray(s)) s = s[L() === "ar" ? 1 : 0];
    if (vars) Object.keys(vars).forEach((v) => { s = s.replace("{" + v + "}", vars[v]); });
    return s;
  };
  const say = (k) => { const v = S.en[k]; toast(v[0], v[1]); };

  /* ---------- Site pages list ---------- */
  const pgRows = $('[data-filter-rows="pg"]');
  const pgSearch = $("[data-pg-search]");
  function applyPages() {
    if (!pgRows) return;
    const q = ((pgSearch && pgSearch.value) || "").trim().toLowerCase();
    const chip = $('[data-filter-group="pg"] .chip.is-on');
    const f = chip ? chip.dataset.filter : "all";
    $$("tr[data-f]", pgRows).forEach((r) => {
      const okF = f === "all" || r.dataset.f.split(" ").includes(f);
      const okQ = !q || r.textContent.toLowerCase().includes(q) || (r.dataset.pg || "").includes(q);
      r.hidden = !(okF && okQ);
    });
    let grp = null, any = false;
    const flush = () => { if (grp) grp.hidden = !any; };
    $$("tbody tr", pgRows).forEach((r) => { if (r.classList.contains("grp")) { flush(); grp = r; any = false; } else if (!r.hidden) any = true; });
    flush();
  }
  if (pgSearch) pgSearch.addEventListener("input", applyPages);
  $$('[data-filter-group="pg"] .chip').forEach((c) => c.addEventListener("click", () => setTimeout(applyPages)));
  if (pgRows) pgRows.addEventListener("click", (e) => {
    if (e.target.closest("a,button")) return;
    const r = e.target.closest("tr[data-pg]");
    const a = r && r.querySelector('a[href^="#page"]');
    if (a) location.hash = a.getAttribute("href");
  });

  /* ---------- Tabs: keep the parent tab lit for sub-views ---------- */
  const PARENT = { page: "pages", edit: "news" };
  function litTab() {
    const v = (location.hash || "").slice(1).split("?")[0];
    if (PARENT[v]) { const a = $(`.tabs a[href="#${PARENT[v]}"]`); if (a) a.classList.add("is-on"); }
  }

  /* ---------- Module item drawers (publications, media centre) ---------- */
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-it]");
    if (!b) return;
    e.preventDefault();
    const d = document.getElementById(b.dataset.it);
    if (!d) return;
    const isNew = b.hasAttribute("data-new");
    $$("[data-fill]", d).forEach((f) => {
      const v = isNew ? "" : (b.dataset[f.dataset.fill] || f.dataset.def || "");
      if (f.tagName === "IMG") { f.src = v || f.dataset.def; } else if (f.tagName === "SELECT") { if (v) f.value = v; } else f.value = v;
    });
    $$("[data-mode]", d).forEach((m) => { m.hidden = m.dataset.mode !== (isNew ? "new" : "edit"); });
    d.classList.add("is-open"); body.style.overflow = "hidden";
  });

  /* ---------- Approval queue: review drawer, approve / reject ---------- */
  const rv = document.getElementById("d-review");
  if (rv) {
    const AR = window.KADA_AR_PAGE || {};
    const tx = (k, en) => `<span data-i18n="${k}" data-en="${esc(en)}">${L() === "ar" && AR[k] ? AR[k] : en}</span>`;
    const TODAY = "02 · 11 · 2026";
    let row = null;
    const count = () => {
      const rows = $$('[data-filter-rows="ap"] tr[data-f]');
      const n = (f) => rows.filter((r) => r.dataset.f === f).length;
      ["wait", "ok", "no"].forEach((f) => $$(`[data-ap-n="${f}"]`).forEach((el) => (el.textContent = n(f))));
      $$('[data-filter-group="ap"] [data-filter]').forEach((c) => { const el = $(".cnt", c); if (el) el.textContent = c.dataset.filter === "all" ? rows.length : n(c.dataset.filter); });
      $$('[data-nav="approvals"] .cnt').forEach((el) => { el.textContent = n("wait"); el.style.display = n("wait") ? "" : "none"; });
    };
    const closeRv = () => { rv.classList.remove("is-open"); body.style.overflow = ""; };
    const decide = (ok) => {
      if (!row) return;
      const st = $("[data-ap-st]", row), dec = $("[data-ap-dec]", row), act = $("[data-ap-act]", row);
      const who = `<span class="nw"><b data-acct-name="${A.account}">${esc(A.profile[L()].name)}</b> · <span class="num">${TODAY}</span></span>`;
      row.dataset.f = ok ? "ok" : "no";
      st.className = "st " + (ok ? "ok" : "red"); st.dataset.i18n = ok ? "ap.s.ok" : "ap.s.no"; st.dataset.en = ok ? "Approved" : "Rejected";
      st.textContent = L() === "ar" ? AR[st.dataset.i18n] : st.dataset.en;
      if (ok) {
        dec.innerHTML = who + `<span class="sub">${tx("ap.d.pub", "Published on the website")}</span>`;
        act.innerHTML = `<a class="mini" href="${esc(rv.dataset.href || "../index.html")}" target="_blank" rel="noopener">${ico("eye")}</a>`;
      } else {
        const o = $("[data-ap-reason]", rv).selectedOptions[0], note = $("[data-ap-note]", rv).value.trim();
        dec.innerHTML = who + `<div class="ap-why"><b>${tx("ap.why", "Reason:")}</b> ${tx(o.dataset.i18n, o.dataset.en)}${note ? `<q>${esc(note)}</q>` : ""}</div>`;
        act.innerHTML = "";
      }
      const chip = $('[data-filter-group="ap"] .chip.is-on');
      if (chip && chip.dataset.filter !== "all") row.hidden = chip.dataset.filter !== row.dataset.f;
      count(); closeRv();
      if (ok) toast("Approved and published in Arabic and English — design preview", "اعتُمد ونُشر بالعربية والإنجليزية — معاينة تصميم");
      else toast("Rejected and returned to the author with the reason — design preview", "رُفض وأُعيد إلى صاحبه مع السبب — معاينة تصميم");
    };
    document.addEventListener("click", (e) => {
      const x = e.target;
      const open = x.closest("[data-review]");
      if (open) {
        row = open.closest("tr");
        const cells = row.children;
        $('[data-rv="type"]', rv).textContent = $(".pg .sub", row).textContent;
        $('[data-rv="title"]', rv).textContent = $(".pg b", row).textContent;
        $('[data-rv="by"]', rv).textContent = cells[1].firstElementChild.textContent;
        $('[data-rv="date"]', rv).textContent = $(".sub", cells[1]).textContent;
        $('[data-rv="chg"]', rv).textContent = L() === "ar" ? open.dataset.chgAr : open.dataset.chgEn;
        $('[data-rv="href"]', rv).setAttribute("href", open.dataset.href);
        rv.dataset.href = open.dataset.href;
        $("[data-rv-acts]", rv).hidden = false; $("[data-rv-no]", rv).hidden = true; $("[data-ap-note]", rv).value = "";
        rv.classList.add("is-open"); body.style.overflow = "hidden";
        return;
      }
      if (x.closest("[data-ap-reject]")) { $("[data-rv-acts]", rv).hidden = true; $("[data-rv-no]", rv).hidden = false; $("[data-ap-reason]", rv).focus(); return; }
      if (x.closest("[data-ap-back]")) { $("[data-rv-acts]", rv).hidden = false; $("[data-rv-no]", rv).hidden = true; return; }
      if (x.closest("[data-ap-ok]")) { decide(true); return; }
      if (x.closest("[data-ap-no]")) { decide(false); return; }
      const go = x.closest("[data-ap-go]");
      if (go) { const c = $(`[data-filter-group="ap"] [data-filter="${go.dataset.apGo}"]`); if (c) c.click(); }
      const chip = x.closest('[data-filter-group="ap"] [data-filter]');
      if (chip || go) { const f = (go && go.dataset.apGo) || chip.dataset.filter; $$("[data-ap-go]").forEach((b) => b.classList.toggle("is-on", b.dataset.apGo === f)); }
    });
    count();
  }

  /* =====================================================================
     Page editor
     ===================================================================== */
  const view = $('[data-view="page"]');
  if (!view) { window.addEventListener("hashchange", litTab); litTab(); return; }
  const editor = $("[data-pe-editor]", view), soon = $("[data-pe-soon]", view);
  const list = $("[data-pe-list]", view), main = $("[data-pe-main]", view);
  const stEl = $("[data-pe-status]", view), dirtyEl = $("[data-pe-dirty]", view);

  const LINKS = [
    ["index.html", "p_index"], ["about.html", "p_about"], ["platform.html", "p_platform"], ["services.html", "p_services"], ["sanctions.html", "p_sanctions"], ["speakup.html", "p_speakup"],
    ["training.html", "p_training"], ["tenders.html", "p_tenders"], ["prohibited.html", "p_prohibited"], ["tue.html", "p_tue"], ["assistant.html", "p_assistant"], ["education.html", "p_education"],
    ["faq.html", "p_faq"], ["news.html", "p_news"], ["events.html", "p_events"], ["publications.html", "p_pubs"], ["data-request.html", "p_datareq"], ["supplier.html", "p_supplier"], ["wada.html", "p_wada"], ["contact.html", "p_contact"]
  ];

  /* field constructors */
  const T = (k, lab, o) => Object.assign({ t: "text", k, lab }, o);
  const TA = (k, lab, o) => Object.assign({ t: "area", k, lab }, o);
  const RT = (k, lab) => ({ t: "rich", k, lab });
  const B = (k, lab, href) => ({ t: "btn", k, lab, href });
  const U = (lab, href, o) => Object.assign({ t: "url", lab, href }, o);
  const IMG = (src, lab) => ({ t: "img", src, lab: lab || "img" });
  const N = (v, lab) => ({ t: "num", v, lab });
  const LI = (keys) => ({ t: "list", keys });
  const MONO = (v, lab) => ({ t: "mono", v, lab });
  const G = (lab, fields) => ({ t: "group", lab, fields });
  const R = (lab, items, o) => Object.assign({ t: "rep", lab, items }, o);

  const range = (n) => Array.from({ length: n }, (_, i) => i + 1);
  const SVC_IMG = ["svc-register", "svc-speak", "svc-training", "svc-tenders", "svc-prohibited", "svc-ai"];
  const SVC_HREF = ["sanctions.html", "speakup.html", "training.html", "tenders.html", "prohibited.html", "assistant.html"];

  const SCHEMA = [
    { id: "hero", icon: "image", anchor: "", sum: (s) => t("sum_hero", { n: s.reps[0].items.length }), body: [
      R("r_slides", [
        { img: "hero-1.jpg", f: [T("h1.eyebrow", "eyebrow"), TA("h1.title", "title", { rows: 2 }), TA("h1.lede", "lede", { rows: 3 }), B("h1.c1", "btn1", "services.html"), B("h1.c2", "btn2", "speakup.html")] },
        { img: "hero-2.jpg", f: [T("h2.eyebrow", "eyebrow"), TA("h2.title", "title", { rows: 2 }), TA("h2.lede", "lede", { rows: 3 }), B("h2.c1", "btn1", "education.html"), B("h2.c2", "btn2", "prohibited.html")] },
        { img: "hero-3.jpg", f: [T("h3.eyebrow", "eyebrow"), TA("h3.title", "title", { rows: 2 }), TA("h3.lede", "lede", { rows: 3 }), B("h3.c1", "btn1", "platform.html"), B("h3.c2", "btn2", "platform.html#app")] }
      ], { add: "add_slide", tpl: [T("", "eyebrow"), TA("", "title", { rows: 2 }), TA("", "lede", { rows: 3 }), B("", "btn1", "services.html")], img: true }),
      { t: "set", rows: [["set_auto", "set_autod", true], ["set_int", null, "sel"]] }
    ] },
    { id: "quick", icon: "link", anchor: "", sum: (s) => t("sum_quick", { n: s.reps[0].items.length }), body: [
      R("r_quick", range(4).map((i) => ({ f: [T(`q.${i}t`, "title"), T(`q.${i}d`, "desc"), U("opens", ["sanctions.html", "speakup.html", "training.html", "tenders.html"][i - 1], { sel: true })] })), { add: "add_item", tpl: [T("", "title"), T("", "desc"), U("opens", "services.html", { sel: true })] })
    ] },
    { id: "about", icon: "doc", anchor: "about", sum: () => t("sum_about"), body: [
      G("g_media", [IMG("about.jpg"), N("2018", "year"), T("ab.badge", "badge")]),
      G("g_text", [T("ab.kicker", "kicker"), TA("ab.title", "title", { rows: 2 }), RT("ab.lede", "lede"), LI(["ab.c1", "ab.c2", "ab.c3", "ab.c4"])]),
      G("g_btns", [B("ab.cta", "btn1", "about.html"), B("ab.cta2", "btn2", "platform.html")])
    ] },
    { id: "services", icon: "grid", anchor: "services", sum: (s) => t("sum_services", { n: s.reps[0].items.length, m: s.reps[1].items.length }), body: [
      G("g_text", [T("sv.kicker", "kicker"), TA("sv.title", "title", { rows: 2 }), TA("sv.lede", "lede", { rows: 2 }), B("sv.all", "btn", "services.html"), T("sv.more", "cardlink")]),
      R("r_cards", range(6).map((i) => ({ img: SVC_IMG[i - 1] + ".jpg", f: [T(`sv.${i}.t`, "title"), TA(`sv.${i}.d`, "desc", { rows: 3 }), T(`sv.${i}.tag`, "tag"), U("opens", SVC_HREF[i - 1], { sel: true })] })), { add: "add_item", img: true, tpl: [T("", "title"), TA("", "desc", { rows: 3 }), T("", "tag"), U("opens", "services.html", { sel: true })] }),
      R("r_more", range(4).map((i) => ({ f: [T(`sv.x${i}`, "title"), T(`sv.x${i}d`, "desc"), U("opens", ["data-request.html", "supplier.html", "publications.html", "tue.html"][i - 1], { sel: true })] })), { add: "add_item", tpl: [T("", "title"), T("", "desc"), U("opens", "services.html", { sel: true })] })
    ] },
    { id: "wada", icon: "globe", anchor: "", sum: (s) => t("sum_wada", { n: s.reps[0].items.length }), body: [
      G("g_text", [T("wd.kicker", "kicker"), TA("wd.title", "title", { rows: 2 }), B("wd.all", "btn", "wada.html")]),
      R("r_res", range(3).map((i) => ({ f: [T(`wd.${i}t`, "title"), TA(`wd.${i}d`, "desc", { rows: 2 }), U("url", ["https://www.wada-ama.org", "https://adel.wada-ama.org", "https://www.globaldro.com"][i - 1])] })), { add: "add_item", tpl: [T("", "title"), TA("", "desc", { rows: 2 }), U("url", "https://")] })
    ] },
    { id: "ops", icon: "check", anchor: "ops", sum: (s) => t("sum_ops", { n: s.reps[0].items.length }), body: [
      G("g_media", [IMG("ops.jpg", "bg")]),
      G("g_text", [T("op.kicker", "kicker"), TA("op.title", "title", { rows: 2 }), TA("op.lede", "lede", { rows: 3 })]),
      R("r_steps", range(6).map((i) => ({ f: [T(`op.${i}t`, "title"), TA(`op.${i}d`, "desc", { rows: 2 })] })), { add: "add_item", num: true, tpl: [T("", "title"), TA("", "desc", { rows: 2 })] }),
      G("g_btns", [B("op.cta", "btn", "faq.html#testing")])
    ] },
    { id: "app", icon: "phone", anchor: "app", sum: (s) => t("sum_app", { n: s.reps[0].items.length }), body: [
      G("g_text", [T("ap.kicker", "kicker"), TA("ap.title", "title", { rows: 2 }), TA("ap.lede", "lede", { rows: 3 }), LI(["ap.f1", "ap.f2", "ap.f3", "ap.f4"])]),
      R("r_screens", [1, 2, 3, 7, 4, 5, 6].map((i) => ({ f: [T(`ap.r${i}`, "tab"), TA(`ap.t${i}`, "tip", { rows: 2 })] })), { tpl: null }),
      G("g_btns", [B("ap.ios", "btn1", ""), U("store", "", { ph: "storeph" }), B("ap.android", "btn2", ""), U("store", "", { ph: "storeph" }), B("ap.cta", "btn", "platform.html#app")])
    ] },
    { id: "ai", icon: "spark", anchor: "ai", sum: () => t("sum_ai"), body: [
      G("g_text", [T("ai.kicker", "kicker"), TA("ai.title", "title", { rows: 2 }), TA("ai.lede", "lede", { rows: 3 }), LI(["ai.c1", "ai.c3", "ai.c5"])]),
      G("g_btns", [B("ai.cta", "btn", "assistant.html")]),
      G("chat", [T("ai.name", "chname"), T("ai.status", "chstat"), T("ai.ph", "chph"), TA("ai.disc", "chdisc", { rows: 2 })])
    ] },
    { id: "stats", icon: "chart", anchor: "", sum: (s) => t("sum_stats", { n: s.reps[0].items.length }), body: [
      G("g_text", [T("st.kicker", "kicker"), TA("st.title", "title", { rows: 2 })]),
      R("r_stats", range(4).map((i) => ({ f: [N(["9", "3", "2", "1"][i - 1], "value"), TA(`st.${i}`, "label", { rows: 2 })] })), { add: "add_item", tpl: [N("", "value"), TA("", "label", { rows: 2 })] })
    ] },
    { id: "partners", icon: "link", anchor: "", sum: (s) => t("sum_partners", { n: s.reps[0].items.length }), body: [
      G("g_text", [TA("pt.label", "text", { rows: 2 })]),
      R("r_logos", range(5).map((i) => ({ f: [MONO(["WADA", "Mobile ID", "Sahel", "K-Net", "DocuSign"][i - 1], "name"), T(`pt.${i}`, "desc")] })), { add: "add_item", tpl: [MONO("", "name"), T("", "desc")] })
    ] },
    { id: "kafah", icon: "cap", anchor: "kafah", sum: (s) => t("sum_kafah", { n: s.reps[0].items.length }), body: [
      G("g_text", [T("kf.kicker", "kicker"), T("kf.word", "word"), T("kf.title", "title"), TA("kf.lede", "lede", { rows: 2 }), B("kf.cta", "btn", "education.html")]),
      R("r_tiles", range(3).map((i) => ({ f: [T(`kf.${i}t`, "title"), TA(`kf.${i}d`, "desc", { rows: 2 })] })), { add: "add_item", num: true, tpl: [T("", "title"), TA("", "desc", { rows: 2 })] })
    ] },
    { id: "news", icon: "cal", anchor: "news", sum: () => t("sum_news", { n: 3 }), body: [
      G("g_text", [T("nw.kicker", "kicker"), T("nw.title", "title"), B("nw.all", "btn", "news.html")]),
      { t: "feed" }
    ] },
    { id: "speak", icon: "lock", anchor: "speak", sum: () => t("sum_speak"), body: [
      G("g_text", [T("sp.kicker", "kicker"), TA("sp.title", "title", { rows: 2 }), TA("sp.lede", "lede", { rows: 2 })]),
      G("g_btns", [B("sp.cta", "btn", "speakup.html"), T("sp.track", "track")])
    ] }
  ];

  /* ---------- State ---------- */
  let uid = 0;
  const V = {};            // key -> { en, ar } — edited values
  const orig = (k, l) => (H[k] ? H[k][l === "en" ? 0 : 1] : "");
  const val = (k, l) => (V[k] && V[k][l] !== undefined ? V[k][l] : orig(k, l));
  const dirty = new Set();
  let secs = [], openSec = new Set(["hero"]), openItem = new Set(), status = "draft";

  function build() {
    uid = 0;
    const mk = (f) => {
      const c = Object.assign({}, f);
      c.id = "f" + (++uid);
      if (c.t === "group") c.fields = c.fields.map(mk);
      if (c.t === "btn" || c.t === "url") c.cur = c.href;
      if (c.t === "num" || c.t === "mono") c.cur = c.v;
      if (c.t === "img") c.cur = c.src;
      if (c.t === "list") c.items = c.keys.map((k) => ({ k }));
      if (c.t === "rep") c.items = c.items.map((it) => ({ id: "i" + (++uid), img: it.img, f: it.f.map(mk) }));
      return c;
    };
    secs = SCHEMA.map((s) => {
      const body = s.body.map(mk);
      return { id: s.id, icon: s.icon, anchor: s.anchor, sumFn: s.sum, name: "s_" + s.id, body, on: true, reps: body.filter((b) => b.t === "rep") };
    });
  }

  /* ---------- Rendering ---------- */
  const lng = (l) => `<span class="lng">${l === "ar" ? "ع" : "EN"}</span>`;
  function biInput(k, area, rows, ph) {
    return ["ar", "en"].map((l) => {
      const v = k ? val(k, l) : "";
      const attrs = `class="inp" dir="${l === "ar" ? "rtl" : "ltr"}" lang="${l}" data-k="${esc(k)}" data-l="${l}"${ph ? ` placeholder="${esc(ph)}"` : ""}`;
      const miss = k && !String(v).trim() ? " miss" : "";
      return `<div class="pe-in${miss}" dir="${l === "ar" ? "rtl" : "ltr"}">${lng(l)}${area ? `<textarea ${attrs} rows="${rows || 2}">${esc(v)}</textarea>` : `<input ${attrs} value="${esc(v)}">`}</div>`;
    }).join("");
  }
  function linkSel(f) {
    const cur = f.cur || "";
    const base = cur.split("#")[0];
    let opts = LINKS.map(([v, k]) => `<option value="${v}"${v === cur ? " selected" : ""}>${esc(t(k))}</option>`).join("");
    if (cur && !LINKS.some(([v]) => v === cur)) {
      const p = LINKS.find(([v]) => v === base);
      opts = `<option value="${esc(cur)}" selected>${esc(p ? t(p[1]) + " › #" + cur.split("#")[1] : cur)}</option>` + opts;
    }
    return `<label class="pe-link">${ico("link")}<span>${t("opens")}</span><select class="inp" data-fid="${f.id}">${opts}</select></label>`;
  }
  function fieldHTML(f) {
    const k = f.k || "";
    const head = (lab) => `<div class="pe-fh"><label>${esc(t(lab))}</label></div>`;
    switch (f.t) {
      case "text": return `<div class="pe-f">${head(f.lab)}<div class="pe-bi">${biInput(k, false)}</div></div>`;
      case "area": return `<div class="pe-f">${head(f.lab)}<div class="pe-bi">${biInput(k, true, f.rows)}</div></div>`;
      case "rich": return `<div class="pe-f">${head(f.lab)}<div class="pe-bi">${["ar", "en"].map((l) => `<div class="editor pe-rich"><div class="ed-bar"><span class="lng">${l === "ar" ? "ع" : "EN"}</span><button type="button" data-cmd="bold"><b>B</b></button><button type="button" data-cmd="italic"><i>I</i></button><button type="button" data-cmd="insertUnorderedList">• —</button><button type="button" data-cmd="createLink">${ico("link")}</button></div><div class="ed-body" contenteditable="true" dir="${l === "ar" ? "rtl" : "ltr"}" lang="${l}" data-k="${esc(k)}" data-l="${l}">${esc(val(k, l))}</div></div>`).join("")}</div></div>`;
      case "btn": return `<div class="pe-f">${head(f.lab)}<div class="pe-bi">${biInput(k, false)}</div>${f.href !== "" ? linkSel(f) : ""}</div>`;
      case "url":
        if (f.sel) return `<div class="pe-f pe-f-link">${linkSel(f)}</div>`;
        return `<div class="pe-f">${head(f.lab)}<label class="pe-link url">${ico("link")}<input class="inp" dir="ltr" data-fid="${f.id}" value="${esc(f.cur)}"${f.ph ? ` placeholder="${esc(t(f.ph))}"` : ""}></label></div>`;
      case "num": return `<div class="pe-f pe-f-num">${head(f.lab)}<input class="inp num" dir="ltr" data-fid="${f.id}" value="${esc(f.cur)}"></div>`;
      case "mono": return `<div class="pe-f">${head(f.lab)}<input class="inp" dir="ltr" data-fid="${f.id}" value="${esc(f.cur)}"></div>`;
      case "img": return `<div class="pe-f">${head(f.lab)}<div class="pe-img"><img src="../assets/img/${esc(f.cur)}" alt=""><div><b>${esc(f.cur)}</b><small>${t("dims")}</small><button class="btn btn-ghost xs" type="button" data-img="${f.id}">${ico("image")}<span>${t("replace")}</span></button></div></div>
        <div class="pe-fh sub"><label>${t("alt")}</label></div><div class="pe-bi"><div class="pe-in" dir="rtl">${lng("ar")}<input class="inp" dir="rtl" placeholder="${esc(t("altph_ar"))}"></div><div class="pe-in" dir="ltr">${lng("en")}<input class="inp" dir="ltr" placeholder="${esc(t("altph_en"))}"></div></div></div>`;
      case "list": return `<div class="pe-f">${head("points")}<div class="pe-pts">${f.items.map((p, i) => `<div class="pe-pt"><span class="num">${i + 1}</span><div class="pe-bi">${biInput(p.k, false)}</div><button class="pe-ib" type="button" data-del-pt="${f.id}:${i}" title="${esc(t("del"))}">${ico("x")}</button></div>`).join("")}</div><button class="pe-add sm" type="button" data-add-pt="${f.id}">${ico("plus")}<span>${t("addpoint")}</span></button></div>`;
      case "group": return groupHTML(f.lab, f.fields.map(fieldHTML).join(""));
      default: return "";
    }
  }
  const groupHTML = (lab, inner) => `<div class="pe-g"><h5>${esc(t(lab))}</h5><div class="pe-gb">${inner}</div></div>`;
  function itemTitle(it) {
    const f = it.f.find((x) => x.lab === "title" || x.lab === "tab" || x.lab === "name" || x.lab === "value") || it.f[0];
    if (f.t === "num" || f.t === "mono") { const lab = it.f.find((x) => x.t === "area" || x.t === "text"); return (f.cur || "—") + (lab && lab.k ? " · " + val(lab.k, L()) : ""); }
    return (f.k && val(f.k, L())) || t("it_new");
  }
  function itemSub(it) {
    if (it.f.some((x) => x.t === "num")) return "";
    const f = it.f.find((x) => (x.t === "text" || x.t === "area") && x.lab !== "title" && x.lab !== "tab" && x.k);
    return f ? val(f.k, L()) : "";
  }
  function repHTML(r, sec) {
    const n = r.items.length;
    const items = r.items.map((it, i) => {
      const open = openItem.has(it.id);
      const thumb = it.img ? `<img src="../assets/img/${esc(it.img)}" alt="">` : `<span class="ph num">${String(i + 1).padStart(2, "0")}</span>`;
      const imgF = it.img ? `<div class="pe-f">${`<div class="pe-fh"><label>${t("img")}</label></div>`}<div class="pe-img"><img src="../assets/img/${esc(it.img)}" alt=""><div><b>${esc(it.img)}</b><small>${t("dims")}</small><button class="btn btn-ghost xs" type="button" data-img="${it.id}">${ico("image")}<span>${t("replace")}</span></button></div></div></div>` : "";
      return `<div class="pe-it${open ? " is-open" : ""}" data-it-id="${it.id}">
        <div class="pe-ih" data-toggle-it="${it.id}">${thumb}<div><b>${esc(itemTitle(it))}</b><small>${esc(itemSub(it))}</small></div>
          <span class="pe-iacts"><button class="pe-ib" type="button" data-mv="${sec.id}:${r.id}:${i}:-1" title="${esc(t("up"))}"${i === 0 ? " disabled" : ""}>${ico("chevd", "up")}</button><button class="pe-ib" type="button" data-mv="${sec.id}:${r.id}:${i}:1" title="${esc(t("down"))}"${i === n - 1 ? " disabled" : ""}>${ico("chevd")}</button>${r.add || r.tpl ? `<button class="pe-ib" type="button" data-rm="${sec.id}:${r.id}:${i}" title="${esc(t("del"))}">${ico("x")}</button>` : ""}</span>
          <span class="pe-chev">${ico("chevd")}</span></div>
        <div class="pe-ib-body">${imgF}${it.f.map(fieldHTML).join("")}</div></div>`;
    }).join("");
    return `<div class="pe-g"><h5>${esc(t(r.lab))} <span class="pill-num">${n}</span></h5><div class="pe-items">${items}</div>${r.add ? `<button class="pe-add" type="button" data-add-it="${sec.id}:${r.id}">${ico("plus")}<span>${t(r.add)}</span></button>` : ""}</div>`;
  }
  function setHTML(b) {
    return `<div class="pe-g"><h5>${t("g_set")}</h5><div class="switches">${b.rows.map(([k, d, v]) => v === "sel"
      ? `<div><div><b>${t(k)}</b></div><select class="inp sm"><option>${t("sec7")}</option><option>${t("sec10")}</option><option>${t("sec5")}</option></select></div>`
      : `<div><div><b>${t(k)}</b>${d ? `<small>${t(d)}</small>` : ""}</div><span class="switch${v ? " on" : ""}" data-sw></span></div>`).join("")}</div></div>`;
  }
  const FEED = [["news-1.jpg", "nw.1c", "nw.1t", "01 · 10 · 2026"], ["news-2.jpg", "nw.2c", "nw.2t", "04 · 11 · 2026"], ["news-3.jpg", "nw.3c", "nw.3t", "18 · 11 · 2026"]];
  const pins = new Set();
  function feedHTML() {
    return `<div class="pe-g"><h5>${t("g_set")}</h5><div class="notice">${ico("refresh")}<span>${t("feed_note")}</span></div>
      <div class="pe-feedset"><label class="pe-fh"><span>${t("feed_n")}</span><select class="inp sm"><option>3</option><option>6</option></select></label>
      <div class="pe-fh"><span>${t("feed_src")}</span><div class="chks"><label><input type="checkbox" checked> ${t("m_news")}</label><label><input type="checkbox" checked> ${t("m_events")}</label><label><input type="checkbox" checked> ${t("m_courses")}</label></div></div></div></div>
      <div class="pe-g"><h5>${t("r_feed")}</h5><div class="pe-items">${FEED.map(([img, c, k, d], i) => `<div class="pe-it static"><div class="pe-ih"><img src="../assets/img/${img}" alt=""><div><b>${esc(val(k, L()))}</b><small><span>${esc(val(c, L()))}</span> · <span class="num">${d}</span></small></div><button class="btn btn-ghost xs${pins.has(i) ? " is-on" : ""}" type="button" data-pin="${i}">${ico("pin")}<span>${t(pins.has(i) ? "pinned" : "pin")}</span></button></div></div>`).join("")}</div>
      <a class="lnk mt-1" href="#news">${t("feed_go")} →</a></div>`;
  }
  function secHTML(s, idx) {
    const open = openSec.has(s.id);
    const inner = s.body.map((b) => b.t === "rep" ? repHTML(b, s) : b.t === "set" ? setHTML(b) : b.t === "feed" ? feedHTML() : b.t === "group" ? fieldHTML(b) : fieldHTML(b)).join("");
    const viewHref = "../index.html" + (s.anchor ? "#" + s.anchor : "");
    return `<article class="pe-sec${open ? " is-open" : ""}${s.on ? "" : " off"}${s.isNew ? " new" : ""}" id="pe-${s.id}" data-sec="${s.id}">
      <header class="pe-sh" data-toggle-sec="${s.id}"><span class="pe-num num">${String(idx + 1).padStart(2, "0")}</span><span class="si">${ico(s.icon)}</span>
        <div class="pe-st"><b>${esc(s.title || t(s.name))}${s.isNew ? ` <span class="st info plain">${t("isnew")}</span>` : ""}${s.on ? "" : ` <span class="st plain">${t("hidden")}</span>`}</b><small>${esc(s.isNew ? t("sum_new") : s.sumFn(s))}</small></div>
        <span class="pe-hacts">${s.isNew ? `<button class="pe-ib" type="button" data-rm-sec="${s.id}" title="${esc(t("delsec"))}">${ico("x")}</button>` : `<a class="pe-ib" href="${viewHref}" target="_blank" rel="noopener" title="${esc(t("view"))}">${ico("ext")}</a>`}
        <span class="switch${s.on ? " on" : ""}" data-vis="${s.id}" role="switch" aria-checked="${s.on}" title="${esc(t("vis"))}"></span></span>
        <span class="pe-chev">${ico("chevd")}</span></header>
      <div class="pe-sb">${inner}</div></article>`;
  }
  function listHTML() {
    return secs.map((s, i) => `<li draggable="true" data-li="${s.id}" class="${openSec.has(s.id) ? "is-on" : ""}${s.on ? "" : " off"}"><span class="grip"></span><span class="num">${String(i + 1).padStart(2, "0")}</span><span class="nm">${esc(s.title || t(s.name))}</span>${s.on ? "" : ico("eye", "eye-off")}${s.isNew ? `<span class="dot-new"></span>` : ""}</li>`).join("");
  }
  function render() {
    list.innerHTML = listHTML();
    main.innerHTML = secs.map(secHTML).join("");
    $$("[data-pe-count]", view).forEach((el) => (el.textContent = t("secsd", { n: secs.length })));
    $$("[data-pe-l]", view).forEach((el) => (el.textContent = t(el.dataset.peL)));
    renderStatus();
  }
  function renderStatus() {
    const n = dirty.size;
    if (dirtyEl) { dirtyEl.textContent = n ? t("dirty", { n }) : t("dirty0"); dirtyEl.classList.toggle("on", !!n); }
    $$("[data-pe-undo]", view).forEach((b) => (b.hidden = !n));
    if (stEl) {
      const m = { draft: ["info", "st_draft"], saved: ["info", "st_saved"], sub: ["warn", "st_sub"], pub: ["ok", "st_pub"] }[status];
      stEl.className = "st " + m[0]; stEl.textContent = t(m[1]);
    }
  }
  const newKey = (f) => (["text", "area", "rich", "btn"].includes(f.t) ? "new." + (++uid) : "");
  const mark = (key) => { dirty.add(key); if (status !== "draft") status = "draft"; renderStatus(); };
  const findSec = (id) => secs.find((s) => s.id === id);
  const findRep = (s, rid) => s.body.find((b) => b.id === rid);
  const findField = (id) => {
    let hit = null;
    const walk = (f) => { if (hit) return; if (f.id === id) { hit = f; return; } (f.fields || []).forEach(walk); (f.items || []).forEach((it) => { if (it.id === id) hit = it; (it.f || []).forEach(walk); }); };
    secs.forEach((s) => s.body.forEach(walk));
    return hit;
  };
  function scrollToSec(id) {
    const el = document.getElementById("pe-" + id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(root).getPropertyValue("--tb")) || 64) - 16;
    window.scrollTo({ top, behavior: "smooth" });
  }

  /* ---------- Events ---------- */
  main.addEventListener("input", (e) => {
    const f = e.target;
    if (f.dataset.k !== undefined && f.dataset.l) {
      const k = f.dataset.k, l = f.dataset.l, v = f.isContentEditable ? f.textContent : f.value;
      if (k) { V[k] = V[k] || {}; V[k][l] = v; }
      const w = f.closest(".pe-in"); if (w) w.classList.toggle("miss", !v.trim());
      mark((k || f.closest("[data-it-id]")?.dataset.itId || "new") + ":" + l);
      const it = f.closest(".pe-it");
      if (it && it.dataset.itId) {
        const s = findSec(f.closest("[data-sec]").dataset.sec), item = s && s.reps.flatMap((r) => r.items).find((x) => x.id === it.dataset.itId);
        if (item) { $(".pe-ih b", it).textContent = itemTitle(item); $(".pe-ih small", it).textContent = itemSub(item); }
      }
      return;
    }
    if (f.dataset.fid) { const fd = findField(f.dataset.fid); if (fd) fd.cur = f.value; mark(f.dataset.fid); }
  });
  main.addEventListener("change", (e) => { if (e.target.matches("select[data-fid]")) { const fd = findField(e.target.dataset.fid); if (fd) fd.cur = e.target.value; mark(e.target.dataset.fid); } });
  main.addEventListener("click", (e) => {
    const x = e.target;
    const cmd = x.closest("[data-cmd]");
    if (cmd) { e.preventDefault(); const c = cmd.dataset.cmd; if (c === "createLink") toast("Insert link — design preview", "إدراج رابط — معاينة تصميم"); else document.execCommand(c); return; }
    const vis = x.closest("[data-vis]");
    if (vis) { e.stopPropagation(); const s = findSec(vis.dataset.vis); s.on = !s.on; mark("vis:" + s.id); render(); return; }
    if (x.closest(".pe-hacts a")) { e.stopPropagation(); return; }
    const rs = x.closest("[data-rm-sec]");
    if (rs) { e.stopPropagation(); secs = secs.filter((s) => s.id !== rs.dataset.rmSec); mark("rm:" + rs.dataset.rmSec); render(); return; }
    const mv = x.closest("[data-mv]");
    if (mv) {
      e.stopPropagation();
      const [sid, rid, i, d] = mv.dataset.mv.split(":"), r = findRep(findSec(sid), rid), a = +i, b = a + +d;
      if (b < 0 || b >= r.items.length) return;
      [r.items[a], r.items[b]] = [r.items[b], r.items[a]]; mark("mv:" + rid); render(); return;
    }
    const rm = x.closest("[data-rm]");
    if (rm) { e.stopPropagation(); const [sid, rid, i] = rm.dataset.rm.split(":"); findRep(findSec(sid), rid).items.splice(+i, 1); mark("rm:" + rid + i); render(); say("t_del"); return; }
    const add = x.closest("[data-add-it]");
    if (add) {
      const [sid, rid] = add.dataset.addIt.split(":"), r = findRep(findSec(sid), rid);
      const it = { id: "i" + (++uid), img: r.img ? "library.jpg" : null, f: (r.tpl || []).map((f) => Object.assign({}, f, { id: "f" + (++uid), k: newKey(f), cur: f.href || f.v || "" })) };
      r.items.push(it); openItem.add(it.id); mark("add:" + it.id); render();
      const el = $(`[data-it-id="${it.id}"] input, [data-it-id="${it.id}"] textarea`, main); if (el) el.focus();
      return;
    }
    const tit = x.closest("[data-toggle-it]");
    if (tit && !x.closest("button")) { const id = tit.dataset.toggleIt; openItem.has(id) ? openItem.delete(id) : openItem.add(id); tit.parentElement.classList.toggle("is-open"); return; }
    const ts = x.closest("[data-toggle-sec]");
    if (ts && !x.closest("button,a,.switch")) { const id = ts.dataset.toggleSec; openSec.has(id) ? openSec.delete(id) : openSec.add(id); ts.parentElement.classList.toggle("is-open"); list.innerHTML = listHTML(); return; }
    const ap = x.closest("[data-add-pt]");
    if (ap) { const f = findField(ap.dataset.addPt); f.items.push({ k: "new." + (++uid) }); mark("pt:" + f.id); render(); return; }
    const dp = x.closest("[data-del-pt]");
    if (dp) { const [fid, i] = dp.dataset.delPt.split(":"); findField(fid).items.splice(+i, 1); mark("pt:" + fid + i); render(); return; }
    const im = x.closest("[data-img]");
    if (im) { pendingImg = im.dataset.img; const d = document.getElementById("d-media"); if (d) { d.classList.add("is-open"); body.style.overflow = "hidden"; } return; }
    const pn = x.closest("[data-pin]");
    if (pn) { const i = +pn.dataset.pin; pins.has(i) ? pins.delete(i) : pins.add(i); mark("pin:" + i); render(); if (pins.has(i)) say("t_pin"); return; }
    const sw = x.closest("[data-sw]");
    if (sw) { sw.classList.toggle("on"); mark("sw:" + uid++); }
  });

  /* section list: jump + drag to reorder */
  let dragId = null;
  list.addEventListener("click", (e) => {
    const li = e.target.closest("[data-li]"); if (!li) return;
    openSec.add(li.dataset.li); render(); scrollToSec(li.dataset.li);
  });
  list.addEventListener("dragstart", (e) => { const li = e.target.closest("[data-li]"); if (!li) return; dragId = li.dataset.li; li.classList.add("drag"); e.dataTransfer.effectAllowed = "move"; try { e.dataTransfer.setData("text/plain", dragId); } catch (er) {} });
  list.addEventListener("dragend", () => { dragId = null; $$("li", list).forEach((l) => l.classList.remove("drag", "drop")); });
  list.addEventListener("dragover", (e) => { if (!dragId) return; e.preventDefault(); const li = e.target.closest("[data-li]"); $$("li", list).forEach((l) => l.classList.toggle("drop", l === li && li.dataset.li !== dragId)); });
  list.addEventListener("drop", (e) => {
    e.preventDefault();
    const li = e.target.closest("[data-li]"); if (!li || !dragId || li.dataset.li === dragId) return;
    const from = secs.findIndex((s) => s.id === dragId), [m] = secs.splice(from, 1), to = secs.findIndex((s) => s.id === li.dataset.li);
    secs.splice(to, 0, m); mark("order"); render();
  });

  /* image picker */
  let pendingImg = null;
  const media = document.getElementById("d-media");
  if (media) {
    media.addEventListener("click", (e) => { const f = e.target.closest("figure"); if (f) $$("figure", media).forEach((x) => x.classList.toggle("is-sel", x === f)); });
    const ins = $(".row .btn-primary", media);
    if (ins) ins.addEventListener("click", () => {
      const f = $("figure.is-sel img", media);
      if (pendingImg && f) {
        const name = f.getAttribute("src").split("/").pop(), fd = findField(pendingImg);
        if (fd) { if (fd.t === "img") fd.cur = name; else fd.img = name; mark("img:" + pendingImg); render(); say("t_img"); }
      }
      pendingImg = null;
    });
  }

  /* add a section from the block library */
  const BLOCKS = {
    text: ["doc", [G("g_text", [T("", "kicker"), TA("", "title", { rows: 2 }), RT("", "text")]), G("g_media", [IMG("library.jpg")]), G("g_btns", [B("", "btn", "services.html")])]],
    cards: ["grid", [G("g_text", [T("", "kicker"), TA("", "title", { rows: 2 })]), R("r_cards", [1, 2, 3].map(() => ({ f: [T("", "title"), TA("", "desc", { rows: 2 }), U("opens", "services.html", { sel: true })] })), { add: "add_item", tpl: [T("", "title"), TA("", "desc", { rows: 2 }), U("opens", "services.html", { sel: true })] })]],
    stats: ["chart", [G("g_text", [T("", "kicker"), TA("", "title", { rows: 2 })]), R("r_stats", [1, 2, 3].map(() => ({ f: [N("", "value"), TA("", "label", { rows: 2 })] })), { add: "add_item", tpl: [N("", "value"), TA("", "label", { rows: 2 })] })]],
    cta: ["send", [G("g_text", [TA("", "title", { rows: 2 }), TA("", "text", { rows: 2 })]), G("g_btns", [B("", "btn1", "services.html"), B("", "btn2", "contact.html")])]],
    faq: ["list", [G("g_text", [T("", "title")]), R("r_cards", [1, 2, 3].map(() => ({ f: [T("", "q"), TA("", "a", { rows: 3 })] })), { add: "add_item", tpl: [T("", "q"), TA("", "a", { rows: 3 })] })]],
    steps: ["check", [G("g_text", [T("", "kicker"), TA("", "title", { rows: 2 })]), R("r_steps", [1, 2, 3, 4].map(() => ({ f: [T("", "title"), TA("", "desc", { rows: 2 })] })), { add: "add_item", tpl: [T("", "title"), TA("", "desc", { rows: 2 })] })]],
    docs: ["file", [G("g_text", [T("", "title")]), R("r_cards", [1, 2].map(() => ({ f: [T("", "doc"), U("url", "publications.html", { sel: true })] })), { add: "add_item", tpl: [T("", "doc"), U("url", "publications.html", { sel: true })] })]],
    news: ["cal", [G("g_text", [T("", "kicker"), T("", "title")]), { t: "feed" }]],
    notice: ["warn", [G("g_text", [TA("", "text", { rows: 2 })]), G("g_btns", [B("", "btn", "news.html")])]]
  };
  let nNew = 0;
  $$("[data-block]").forEach((b) => b.addEventListener("click", () => {
    const def = BLOCKS[b.dataset.block]; if (!def) return;
    const mk = (f) => { const c = Object.assign({}, f, { id: "f" + (++uid), k: newKey(f) }); if (c.t === "group") c.fields = c.fields.map(mk); if (c.t === "btn" || c.t === "url") c.cur = c.href; if (c.t === "num") c.cur = ""; if (c.t === "img") c.cur = c.src; if (c.t === "rep") c.items = c.items.map((it) => ({ id: "i" + (++uid), f: it.f.map(mk) })); return c; };
    const bodyF = def[1].map(mk);
    const s = { id: "new" + (++nNew), icon: def[0], anchor: "", name: "", title: t("nb_" + b.dataset.block), isNew: true, body: bodyF, on: true, reps: bodyF.filter((x) => x.t === "rep"), sumFn: () => t("sum_new") };
    secs.push(s); openSec.add(s.id); mark("add:" + s.id); render(); say("t_add");
    setTimeout(() => scrollToSec(s.id), 50);
  }));

  /* top bar actions */
  $$("[data-pe-save]", view).forEach((b) => b.addEventListener("click", () => { dirty.clear(); status = "saved"; renderStatus(); say("t_save"); }));
  $$("[data-pe-submit]", view).forEach((b) => b.addEventListener("click", () => { dirty.clear(); status = "sub"; renderStatus(); say("t_submit"); }));
  $$("[data-pe-publish]", view).forEach((b) => b.addEventListener("click", () => { dirty.clear(); status = "pub"; renderStatus(); say("t_pub"); }));
  $$("[data-pe-undo]", view).forEach((b) => b.addEventListener("click", () => { Object.keys(V).forEach((k) => delete V[k]); dirty.clear(); pins.clear(); build(); status = "draft"; render(); say("t_undo"); }));
  $$("[data-pe-expand]", view).forEach((b) => b.addEventListener("click", () => { const all = openSec.size < secs.length; openSec = new Set(all ? secs.map((s) => s.id) : []); render(); }));

  /* ---------- Which page ---------- */
  function want() {
    const h = location.hash || "";
    if (!h.startsWith("#page")) return;
    const m = h.match(/[?&]id=([\w.-]+)/), id = m ? m[1] : "index.html";
    const isHome = id === "index.html";
    editor.hidden = !isHome; soon.hidden = isHome;
    if (!isHome) {
      const row = $(`tr[data-pg="${CSS.escape(id)}"]`);
      const nm = row ? $("b", row).textContent : id;
      $$("[data-soon-name]", view).forEach((el) => (el.textContent = nm));
      $$("[data-soon-view]", view).forEach((a) => { a.setAttribute("href", "../" + id); a.hidden = !/\.html$/.test(id); });
    }
    litTab();
  }
  build(); render();
  window.addEventListener("hashchange", () => { want(); litTab(); });
  document.addEventListener("kada:lang", () => { render(); want(); });
  want(); litTab();
})();
