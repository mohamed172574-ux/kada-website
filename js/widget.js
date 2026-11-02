/* Floating KADA Assistant — collapsed launcher on every page (except assistant.html).
   Self-contained: own markup, own typing engine, own EN/AR strings. Loaded by chrome.js.
   The opening dialogue is chosen from the page the visitor is on. */
(function () {
  "use strict";
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (page === "assistant.html") return;
  const root = document.documentElement;
  const body = document.body;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Strings ---------- */
  const UI = {
    en: { name: "KADA Assistant", status: "Online · Arabic / English", ph: "Type your question…", full: "Open full page", close: "Close", open: "Ask KADA", disc: "Advisory only — answers cite agency documents.",
          reply: "Thanks — this is a design preview. In the live system I answer from KADA's approved documents and cite the source." },
    ar: { name: "مساعد كادا", status: "متصل · عربي / إنجليزي", ph: "اكتب سؤالك…", full: "فتح في صفحة كاملة", close: "إغلاق", open: "اسأل كادا", disc: "للاسترشاد فقط — تستند الإجابات إلى وثائق الوكالة مع ذكر المصدر.",
          reply: "شكراً — هذه معاينة تصميم. في النظام الفعلي أجيب من وثائق كادا المعتمدة مع ذكر المصدر." }
  };

  /* ---------- Page-aware opening dialogues ---------- */
  const TOPIC = {
    "tenders.html": "procurement", "tender.html": "procurement", "supplier.html": "procurement",
    "speakup.html": "speakup",
    "training.html": "training", "course.html": "training", "events.html": "training", "event.html": "training", "education.html": "training",
    "prohibited.html": "medicine", "tue.html": "medicine",
    "sanctions.html": "registry", "sanction.html": "registry",
    "data-request.html": "data"
  };
  const DLG = {
    general: {
      en: [
        { role: "ai", text: "Hi — I'm the KADA Assistant. I can find a service, explain a rule or check a medicine. What do you need?" },
        { role: "user", text: "Where do I check if my allergy medicine is allowed?" },
        { role: "ai", text: "Use the Medicine Checker — type the brand or active ingredient and you get its 2027 Prohibited List status instantly. If it is prohibited, I can walk you through the TUE application.", sources: ["Prohibited List 2027", "TUE guide"] }
      ],
      ar: [
        { role: "ai", text: "مرحباً — أنا مساعد كادا. يمكنني إرشادك إلى خدمة، أو شرح قاعدة، أو التحقق من دواء. كيف أساعدك؟" },
        { role: "user", text: "أين أتحقق مما إذا كان دواء الحساسية الذي أتناوله مسموحاً؟" },
        { role: "ai", text: "استخدم فاحص الأدوية — اكتب الاسم التجاري أو المادة الفعالة لتعرف فوراً حالته في قائمة المحظورات 2027. وإن كان محظوراً أرشدتك إلى طلب الإعفاء للاستعمال العلاجي.", sources: ["قائمة المحظورات 2027", "دليل الإعفاء للاستعمال العلاجي"] }
      ]
    },
    procurement: {
      en: [
        { role: "ai", text: "You're in Tenders & Procurement. Want help buying tender documents or registering as a supplier?" },
        { role: "user", text: "How do I buy the documents for tender KADA/T/2026/014?" },
        { role: "ai", text: "Three steps: register your company once, open the tender, and pay the document fee via K-Net. The files unlock immediately and a receipt is saved to your account.", sources: ["Supplier registration", "K-Net payment guide"] }
      ],
      ar: [
        { role: "ai", text: "أنت في بوابة المناقصات والمشتريات. هل تريد مساعدة في شراء وثائق مناقصة أو في تسجيل شركتك مورّداً؟" },
        { role: "user", text: "كيف أشتري وثائق المناقصة KADA/T/2026/014؟" },
        { role: "ai", text: "ثلاث خطوات: سجّل شركتك مرة واحدة، ثم افتح المناقصة، وادفع رسوم الوثائق عبر كي-نت. تُتاح الملفات فوراً ويُحفظ الإيصال في حسابك.", sources: ["تسجيل الموردين", "دليل الدفع عبر كي-نت"] }
      ]
    },
    speakup: {
      en: [
        { role: "ai", text: "Everything you report here is anonymous — no account, no e-mail, no IP address stored. Shall I explain how it works?" },
        { role: "user", text: "Will anyone be able to find out it was me?" },
        { role: "ai", text: "No. You receive a tracking code to follow the case and answer investigators' questions without revealing who you are. Only the Intelligence & Investigations unit sees the report.", sources: ["Speak Up policy §3", "Whistleblower protection"] }
      ],
      ar: [
        { role: "ai", text: "كل ما تبلّغ عنه هنا يبقى مجهول المصدر — لا حساب ولا بريد إلكتروني، ولا يُحفظ عنوان IP. هل أشرح لك آلية العمل؟" },
        { role: "user", text: "هل يمكن لأحد أن يعرف أنني من قدّم البلاغ؟" },
        { role: "ai", text: "لا. تحصل على رمز تتبع لمتابعة البلاغ والرد على أسئلة المحققين دون الكشف عن هويتك. ولا يطّلع على البلاغ إلا وحدة الاستخبارات والتحقيقات.", sources: ["سياسة Speak Up §3", "حماية المبلّغين"] }
      ]
    },
    training: {
      en: [
        { role: "ai", text: "Looking for a course or event? I can check seats, dates and education certificates." },
        { role: "user", text: "Is there a free course for athletes, and do I get a certificate?" },
        { role: "ai", text: "Yes — Anti-Doping Essentials is free: 3 hours in person at KADA HQ on 18 Nov 2026, with 11 seats left. Your certificate is issued to your account after QR attendance check-in. If you prefer to learn online, WADA's ADEL is free and self-paced, and KADA recognises its certificate once you upload it.", sources: ["Training portal", "Education programme"] }
      ],
      ar: [
        { role: "ai", text: "تبحث عن دورة أو فعالية؟ يمكنني التحقق من المقاعد المتاحة والمواعيد وشهادات التثقيف." },
        { role: "user", text: "هل توجد دورة مجانية للرياضيين، وهل أحصل على شهادة؟" },
        { role: "ai", text: "نعم — دورة «أساسيات مكافحة المنشطات» مجانية: 3 ساعات حضورياً في مقر الوكالة يوم 18 نوفمبر 2026، وتبقّى فيها 11 مقعداً. وتصدر شهادتك إلى حسابك بعد تسجيل حضورك برمز QR. وإن فضّلت التعلّم عبر الإنترنت، فبرنامج ADEL من وادا مجاني وذاتي الوتيرة، وتعتمد الوكالة شهادته بعد رفعها إلى حسابك.", sources: ["بوابة التدريب", "برنامج التثقيف"] }
      ]
    },
    medicine: {
      en: [
        { role: "ai", text: "Type a medicine name below and I'll check it against the 2027 Prohibited List." },
        { role: "user", text: "Is a salbutamol inhaler allowed?" },
        { role: "ai", text: "Inhaled salbutamol is permitted up to 1600 µg per 24 hours (max 600 µg per 8 hours). Above that you need a TUE. Always declare it on the doping control form.", sources: ["Prohibited List S3", "TUE guide"] }
      ],
      ar: [
        { role: "ai", text: "اكتب اسم الدواء أدناه وسأتحقق منه وفق قائمة المحظورات 2027." },
        { role: "user", text: "هل بخاخ السالبوتامول مسموح؟" },
        { role: "ai", text: "السالبوتامول المستنشق مسموح حتى 1600 ميكروغرام خلال 24 ساعة (وبحد أقصى 600 ميكروغرام كل 8 ساعات)، وما يتجاوز ذلك يتطلب إعفاءً للاستعمال العلاجي. صرّح به دائماً في نموذج مراقبة المنشطات.", sources: ["قائمة المحظورات S3", "دليل الإعفاء للاستعمال العلاجي"] }
      ]
    },
    registry: {
      en: [
        { role: "ai", text: "This registry lists athletes and support personnel currently serving a sanction. Want help searching?" },
        { role: "user", text: "Can I search by sport instead of name?" },
        { role: "ai", text: "Yes — use the sport filter above the table, or combine sport and status. Each record shows the violation, substance, sanction length and end date, as published under Code Article 14.3. Expired sanctions move to the archive automatically.", sources: ["Code Art. 14.3", "Registry help"] }
      ],
      ar: [
        { role: "ai", text: "يعرض هذا السجل الرياضيين وأفراد الدعم الذين يقضون عقوبة حالياً. هل تريد مساعدة في البحث؟" },
        { role: "user", text: "هل أستطيع البحث حسب الرياضة بدلاً من الاسم؟" },
        { role: "ai", text: "نعم — استخدم عامل تصفية الرياضة فوق الجدول، أو اجمع بين الرياضة والحالة. ويعرض كل سجل الانتهاك والمادة ومدة العقوبة وتاريخ انتهائها وفق المادة 14.3 من المدونة. وتنتقل العقوبات المنتهية إلى الأرشيف تلقائياً.", sources: ["المدونة م. 14.3", "مساعدة السجل"] }
      ]
    },
    data: {
      en: [
        { role: "ai", text: "This is the Data Access Request service. I can tell you what you need and how long it takes." },
        { role: "user", text: "What do I need to submit, and how long does it take?" },
        { role: "ai", text: "Only identity verification — sign in with Kuwait Mobile ID or upload a copy of your Civil ID. No fee. KADA responds within 30 days with a copy of your personal data, or a reasoned refusal, delivered to your account.", sources: ["Privacy policy", "DAR procedure"] }
      ],
      ar: [
        { role: "ai", text: "هذه خدمة طلب الوصول إلى البيانات. يمكنني إخبارك بما تحتاج إليه والمدة المتوقعة." },
        { role: "user", text: "ماذا أحتاج لتقديم الطلب، وكم يستغرق؟" },
        { role: "ai", text: "يكفي التحقق من هويتك — بتسجيل الدخول عبر «هويتي» أو برفع نسخة من بطاقتك المدنية، ودون رسوم. وترد الوكالة خلال 30 يوماً بنسخة من بياناتك الشخصية أو برفض مسبَّب، ويصلك الرد في حسابك.", sources: ["سياسة الخصوصية", "إجراء طلب البيانات"] }
      ]
    }
  };
  const topic = TOPIC[page] || "general";

  /* ---------- Markup ---------- */
  const SPARK = '<svg viewBox="0 0 24 24" class="ico"><path d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4z"/><path d="M5 17l.9 2.1L8 20l-2.1.9L5 23l-.9-2.1L2 20l2.1-.9z"/></svg>';
  const wrap = document.createElement("div");
  wrap.className = "kw";
  wrap.innerHTML = `
    <div class="kw-panel" role="dialog" aria-modal="false" aria-label="KADA Assistant">
      <div class="chat">
        <div class="chat-head">
          <span class="ai">${SPARK}</span>
          <div><b data-kw="name">KADA Assistant</b><small data-kw="status">Online · Arabic / English</small></div>
          <div class="kw-acts">
            <a href="assistant.html" class="search-btn" data-kw-title="full" aria-label="Open full page"><svg viewBox="0 0 24 24" class="ico"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg></a>
            <button type="button" class="search-btn" data-kw-close data-kw-title="close" aria-label="Close"><svg viewBox="0 0 24 24" class="ico"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
          </div>
        </div>
        <div class="chat-log"></div>
        <form class="chat-input" data-kw-form>
          <input type="text" data-kw-ph="ph" placeholder="Type your question…" aria-label="Message" autocomplete="off">
          <button class="btn btn-primary" type="submit" aria-label="Send"><svg viewBox="0 0 24 24" class="ico"><path d="M4 12 20 4l-4 16-4-7z"/></svg></button>
        </form>
        <div class="chat-disclaimer" data-kw="disc">Advisory only — answers cite agency documents.</div>
      </div>
    </div>
    <button type="button" class="kw-fab" data-kw-toggle aria-expanded="false" aria-label="Ask KADA">
      <span class="kw-spark">${SPARK}</span>
      <span class="kw-x"><svg viewBox="0 0 24 24" class="ico"><path d="M6 6l12 12M18 6 6 18"/></svg></span>
      <i></i>
      <span class="kw-label" data-kw="open">Ask KADA</span>
    </button>`;
  body.append(wrap);

  const log = wrap.querySelector(".chat-log");
  const fab = wrap.querySelector("[data-kw-toggle]");
  const form = wrap.querySelector("[data-kw-form]");
  const input = form.querySelector("input");

  /* ---------- i18n (independent of app.js so load order doesn't matter) ---------- */
  function lang() { return root.lang === "ar" ? "ar" : "en"; }
  function applyStrings() {
    const s = UI[lang()];
    wrap.querySelectorAll("[data-kw]").forEach((el) => { el.textContent = s[el.dataset.kw]; });
    wrap.querySelectorAll("[data-kw-title]").forEach((el) => { el.title = s[el.dataset.kwTitle]; el.setAttribute("aria-label", s[el.dataset.kwTitle]); });
    input.placeholder = s.ph;
    fab.setAttribute("aria-label", s.open);
  }

  /* ---------- Typing engine ---------- */
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  let token = 0, played = false;
  function bubble(m) {
    const el = document.createElement("div");
    el.className = "msg " + m.role;
    log.append(el);
    return el;
  }
  function sources(el, list) {
    if (!list) return;
    const s = document.createElement("div"); s.className = "sources";
    list.forEach((x) => { const c = document.createElement("span"); c.textContent = x; s.append(c); });
    el.append(s);
  }
  async function type(el, text, my) {
    el.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>';
    await wait(900);
    if (my !== token) return false;
    el.innerHTML = "";
    if (!reduced) for (let i = 0; i <= text.length; i += 2) { if (my !== token) return false; el.textContent = text.slice(0, i); log.scrollTop = log.scrollHeight; await wait(14); }
    el.textContent = text;
    log.scrollTop = log.scrollHeight;
    return true;
  }
  async function play() {
    const my = ++token;
    const script = DLG[topic][lang()];
    log.innerHTML = "";
    for (const m of script) {
      if (my !== token) return;
      const el = bubble(m);
      if (m.role === "user") { el.textContent = m.text; await wait(700); }
      else { if (!(await type(el, m.text, my))) return; sources(el, m.sources); await wait(600); }
      log.scrollTop = log.scrollHeight;
    }
    played = true;
  }

  /* ---------- Open / close ---------- */
  function open() {
    wrap.classList.add("is-open");
    fab.setAttribute("aria-expanded", "true");
    if (!played) play();
    setTimeout(() => input.focus({ preventScroll: true }), 350);
  }
  function close() {
    wrap.classList.remove("is-open");
    fab.setAttribute("aria-expanded", "false");
    fab.focus({ preventScroll: true });
  }
  fab.addEventListener("click", () => (wrap.classList.contains("is-open") ? close() : open()));
  wrap.querySelector("[data-kw-close]").addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && wrap.classList.contains("is-open")) close(); });

  /* ---------- Free typing: echo + preview reply ---------- */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    input.value = "";
    const my = ++token;
    bubble({ role: "user" }).textContent = q;
    log.scrollTop = log.scrollHeight;
    await wait(500);
    if (my !== token) return;
    await type(bubble({ role: "ai" }), UI[lang()].reply, my);
  });

  /* ---------- Language changes ---------- */
  applyStrings();
  document.addEventListener("kada:lang", () => { applyStrings(); if (played || wrap.classList.contains("is-open")) { played = false; if (wrap.classList.contains("is-open")) play(); } });
})();
