/* Default language for the site: "ar" or "en". Change this one line to switch the default. */
window.KADA_DEFAULT_LANG = "ar";

(function () {
  var lang = window.KADA_DEFAULT_LANG;
  try {
    var saved = localStorage.getItem("kada4-lang");
    if (saved === "ar" || saved === "en") lang = saved;
  } catch (e) {}
  var root = document.documentElement;
  root.lang = lang;
  root.dir = lang === "ar" ? "rtl" : "ltr";
  root.classList.add("pre");
})();

/* ---------- Demo identities (static presentation) ----------
   Shared by the public website (js/app.js) and the staff admin application (admin/).
   Three sign-in types from the proposal: Public (Mobile ID / Sahel), Supplier (Mobile ID of the
   authorised signatory) and Staff (agency SSO + MFA → admin application).
   Staff "perms" are admin-application modules:
   home tasks content media training procurement speakup tue data users audit settings executive
   plus "approvals" (see the approval queue) and "publish" (decide in it). */
window.KADA_ADMIN_MODULES = ["home", "tasks", "content", "media", "training", "procurement", "speakup", "tue", "data", "users", "audit", "settings", "executive"];
window.KADA_ACCOUNTS = {
  athlete:  { type: "public", home: "account.html", ava: "Y", civil: "•••• 2194", email: "yousef.r@example.com", phone: "+965 9900 2194",
              en: { name: "Yousef Al-Rashidi", short: "Yousef", role: "Registered athlete · Athletics", org: "Kuwait Athletics Federation" },
              ar: { name: "يوسف الرشيدي", short: "يوسف", role: "رياضي مسجّل · ألعاب القوى", org: "الاتحاد الكويتي لألعاب القوى" } },
  citizen:  { type: "public", home: "account.html", ava: "M", civil: "•••• 7730", email: "maryam.f@example.com", phone: "+965 6600 7730",
              en: { name: "Maryam Al-Fadhli", short: "Maryam", role: "Coach · course participant", org: "Al-Qadsia Sporting Club" },
              ar: { name: "مريم الفضلي", short: "مريم", role: "مدربة · مشاركة في الدورات", org: "نادي القادسية الرياضي" } },
  supplier: { type: "supplier", home: "supplier-dashboard.html", ava: "N", civil: "•••• 8831", email: "tenders@alsaqr-med.com", phone: "+965 2242 8831",
              en: { name: "Nasser Al-Saqr", short: "Al-Saqr", role: "Authorised signatory", org: "Al-Saqr Medical Supplies W.L.L." },
              ar: { name: "ناصر الصقر", short: "الصقر", role: "المفوض بالتوقيع", org: "شركة الصقر للمستلزمات الطبية ذ.م.م." } },

  sysadmin: { type: "staff", hidden: true, home: "admin/index.html", ava: "A", email: "a.almutairi@kada.gov.kw", perms: window.KADA_ADMIN_MODULES.concat("approvals", "publish"),
              en: { name: "Abdullah Al-Mutairi", short: "Abdullah", role: "System administrator", org: "IT & Digital Services" },
              ar: { name: "عبدالله المطيري", short: "عبدالله", role: "مدير النظام", org: "تقنية المعلومات والخدمات الرقمية" } },
  exec:     { type: "staff", hidden: true, home: "admin/index.html", ava: "M", email: "m.alajmi@kada.gov.kw", perms: ["home", "tasks", "executive", "audit"],
              en: { name: "Dr. Mona Al-Ajmi", short: "Dr. Mona", role: "Deputy Director General", org: "Executive Office" },
              ar: { name: "د. منى العجمي", short: "د. منى", role: "نائبة المدير العام", org: "المكتب التنفيذي" } },
  dg:       { type: "staff", wip: true, home: "admin/index.html", ava: "H", email: "h.alfailakawi@kada.gov.kw", perms: ["home", "tasks", "executive", "audit"],
              en: { name: "Hessa Al-Failakawi", short: "Hessa", role: "Director General", org: "Executive Office" },
              ar: { name: "حصة الفيلكاوي", short: "حصة", role: "المدير العام", org: "المكتب التنفيذي" } },
  editor:   { type: "staff", home: "admin/index.html", ava: "D", email: "d.alkandari@kada.gov.kw", perms: ["home", "tasks", "content", "approvals", "media"],
              en: { name: "Dana Al-Kandari", short: "Dana", role: "Content editor", org: "Media & Communications" },
              ar: { name: "دانة الكندري", short: "دانة", role: "محررة محتوى", org: "الإعلام والاتصال" } },
  approver: { type: "staff", home: "admin/index.html", ava: "S", email: "s.aldosari@kada.gov.kw", perms: ["home", "tasks", "approvals", "publish"],
              en: { name: "Salem Al-Dosari", short: "Salem", role: "Content approver · Head of Communications", org: "Media & Communications" },
              ar: { name: "سالم الدوسري", short: "سالم", role: "معتمد المحتوى · رئيس قسم الاتصال", org: "الإعلام والاتصال" } },
  training: { type: "staff", home: "admin/index.html", ava: "F", email: "f.alanzi@kada.gov.kw", perms: ["home", "tasks", "training", "media"],
              en: { name: "Faisal Al-Anzi", short: "Faisal", role: "Training coordinator", org: "Education & Awareness" },
              ar: { name: "فيصل العنزي", short: "فيصل", role: "منسّق التدريب", org: "التعليم والتوعية" } },
  procure:  { type: "staff", wip: true, home: "admin/index.html", ava: "H", email: "h.alotaibi@kada.gov.kw", perms: ["home", "tasks", "procurement"],
              en: { name: "Huda Al-Otaibi", short: "Huda", role: "Procurement officer", org: "Finance & Procurement" },
              ar: { name: "هدى العتيبي", short: "هدى", role: "مسؤولة المشتريات", org: "المالية والمشتريات" } },
  invest:   { type: "staff", wip: true, home: "admin/index.html", ava: "K", email: "k.alshammari@kada.gov.kw", perms: ["home", "tasks", "speakup"],
              en: { name: "Khalid Al-Shammari", short: "Khalid", role: "Investigations officer", org: "Intelligence & Investigations" },
              ar: { name: "خالد الشمري", short: "خالد", role: "مسؤول التحقيقات", org: "الاستخبارات والتحقيقات" } },
  tuesec:   { type: "staff", wip: true, home: "admin/index.html", ava: "R", email: "r.alsaleh@kada.gov.kw", perms: ["home", "tasks", "tue"],
              en: { name: "Dr. Reem Al-Saleh", short: "Dr. Reem", role: "TUE Committee secretary", org: "Results Management" },
              ar: { name: "د. ريم الصالح", short: "د. ريم", role: "أمينة سر لجنة الإعفاء للاستعمال العلاجي", org: "إدارة النتائج" } },
  dpo:      { type: "staff", wip: true, home: "admin/index.html", ava: "N", email: "n.alhajri@kada.gov.kw", perms: ["home", "tasks", "data", "audit"],
              en: { name: "Noura Al-Hajri", short: "Noura", role: "Data protection officer", org: "Legal & Compliance" },
              ar: { name: "نورة الهاجري", short: "نورة", role: "مسؤولة حماية البيانات", org: "الشؤون القانونية والامتثال" } }
};
