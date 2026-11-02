/* Demo course catalogue — applied on course.html via ?id= */
(function () {
  "use strict";

  var COURSES = {
    essentials: {
      img: "assets/img/news-3.jpg",
      time: "17:00 – 20:00",
      when: "18 · 11 · 2026 · 17:00 – 20:00",
      seats: "29 / 40",
      bar: "72%",
      feePaid: false,
      waitlist: false,
      en: {
        "meta.title": "Anti-Doping Essentials — Course registration — KADA",
        "p.date": "18 Nov 2026",
        "p.crumb": "Anti-Doping Essentials",
        "p.feev": "Free",
        "p.cert": "Certified · 3 CPD hours",
        "p.aud": "Athletes",
        "p.title": "Anti-Doping Essentials for athletes",
        "p.lede": "Everything a national-level athlete must know before the season: the Prohibited List, the testing procedure, TUEs, your rights and responsibilities.",
        "p.venuev": "KADA HQ, Hall A",
        "p.langv": "Arabic (EN slides)",
        "p.ab.p": "Anti-Doping Essentials is KADA's foundation course, mandatory for athletes entering a national team. It is delivered by certified KADA educators with real doping-control equipment and interactive case studies.",
        "p.ab.1": "The 11 anti-doping rule violations and strict liability",
        "p.ab.2": "How to read the Prohibited List and use the medicine checker",
        "p.ab.3": "Step by step through a doping control — your rights and duties",
        "p.ab.4": "Your rights in results management: B-sample analysis and a fair hearing",
        "p.ab.5": "Therapeutic Use Exemptions: when and how to apply",
        "p.ab.6": "Supplement risks and the Speak Up channel",
        "p.ab.id": "Dr. Dalal Al-Sabah — Head of Education, certified WADA educator, former national volleyball player.",
        "p.r.t": "Register for this course",
        "p.r.feed": "no payment required",
        "p.r.confirm": "Confirm registration",
        "p.ok.t": "You're registered.",
        "p.ok.d": "A confirmation has been sent by email and SMS. Show this QR code at the door for attendance check-in.",
        "p.sb.left": "11 seats left",
        "p.sb.d2": "Pre-reading: Athlete guide",
        "p.cta": "Register"
      },
      ar: {
        "meta.title": "أساسيات مكافحة المنشطات — التسجيل في الدورة — كادا",
        "p.date": "18 نوفمبر 2026",
        "p.crumb": "أساسيات مكافحة المنشطات",
        "p.feev": "مجاني",
        "p.cert": "معتمد · 3 ساعات تطوير مهني",
        "p.aud": "الرياضيون",
        "p.title": "أساسيات مكافحة المنشطات للرياضيين",
        "p.lede": "كل ما يجب أن يعرفه الرياضي على المستوى الوطني قبل الموسم: قائمة المحظورات، وإجراءات الفحص، والإعفاء للاستعمال العلاجي، وحقوقك ومسؤولياتك.",
        "p.venuev": "مقر الوكالة، القاعة A",
        "p.langv": "العربية (عرض تقديمي بالإنجليزية)",
        "p.ab.p": "أساسيات مكافحة المنشطات هي الدورة التأسيسية في الوكالة، وهي إلزامية للرياضيين المنضمين إلى المنتخبات الوطنية. يقدّمها محاضرون معتمدون من الوكالة باستخدام معدات حقيقية لمراقبة المنشطات ودراسات حالة تفاعلية.",
        "p.ab.1": "انتهاكات قواعد مكافحة المنشطات الأحد عشر ومبدأ المسؤولية المطلقة",
        "p.ab.2": "كيفية قراءة قائمة المحظورات واستخدام فاحص الأدوية",
        "p.ab.3": "إجراءات مراقبة المنشطات خطوة بخطوة — حقوقك وواجباتك",
        "p.ab.4": "حقوقك في إدارة النتائج: تحليل العينة B وجلسة الاستماع العادلة",
        "p.ab.5": "الإعفاء للاستعمال العلاجي: متى تتقدّم بالطلب وكيف",
        "p.ab.6": "مخاطر المكملات الغذائية وقناة Speak Up للبلاغات السرية",
        "p.ab.id": "د. دلال الصباح — رئيسة إدارة التوعية، محاضِرة معتمدة من وادا، ولاعبة سابقة في منتخب الكرة الطائرة.",
        "p.r.t": "سجّل في هذه الدورة",
        "p.r.feed": "لا يلزم الدفع",
        "p.r.confirm": "تأكيد التسجيل",
        "p.ok.t": "تم تسجيلك.",
        "p.ok.d": "أُرسل إليك تأكيد عبر البريد الإلكتروني والرسائل النصية. اعرض رمز QR هذا عند المدخل لتسجيل الحضور.",
        "p.sb.left": "بقي 11 مقعداً",
        "p.sb.d2": "قراءة مسبقة: دليل الرياضي",
        "p.cta": "تسجيل"
      }
    },
    coaches: {
      img: "assets/img/svc-training.jpg",
      time: "09:00 – 16:00",
      when: "25 · 11 · 2026 · 09:00 – 16:00",
      seats: "12 / 30",
      bar: "40%",
      feePaid: true,
      waitlist: false,
      en: {
        "meta.title": "Coaching Clean — Course registration — KADA",
        "p.date": "25 Nov 2026",
        "p.crumb": "Coaching Clean",
        "p.feev": "25 KWD",
        "p.cert": "Certified · 6 CPD hours",
        "p.aud": "Coaches",
        "p.title": "Coaching Clean — Support personnel responsibilities",
        "p.lede": "What coaches and athlete-support personnel must know: complicity, administration of substances, supplement risk, and how to guide athletes without crossing the Code.",
        "p.venuev": "KADA HQ, Hall B",
        "p.langv": "Arabic (EN slides)",
        "p.ab.p": "A one-day workshop for coaches, physios and other support personnel. Built around real case studies from Kuwaiti sport, with a practical session on how to talk to athletes about medicines and supplements.",
        "p.ab.1": "Your duties under the Code as athlete support personnel",
        "p.ab.2": "Complicity, administration and possession — where coaches get caught",
        "p.ab.3": "Supplement contamination and how to reduce the risk",
        "p.ab.4": "How to use the KADA medicine checker with your athletes",
        "p.ab.5": "When a TUE is needed and when it is not",
        "p.ab.6": "How to report a concern through Speak Up",
        "p.ab.id": "Khaled Al-Mutairi — Education officer and former national coach.",
        "p.r.t": "Register for this course",
        "p.r.feed": "payable by K-Net at confirmation",
        "p.r.confirm": "Confirm and pay 25 KWD",
        "p.ok.t": "You're registered.",
        "p.ok.d": "Payment is confirmed. A ticket has been sent by email and SMS. Show the QR code at the door.",
        "p.sb.left": "18 seats left",
        "p.sb.d2": "Pre-reading: Coach handbook",
        "p.cta": "Register"
      },
      ar: {
        "meta.title": "التدريب النظيف — التسجيل في الدورة — كادا",
        "p.date": "25 نوفمبر 2026",
        "p.crumb": "التدريب النظيف",
        "p.feev": "25 د.ك",
        "p.cert": "معتمد · 6 ساعات تطوير مهني",
        "p.aud": "المدربون",
        "p.title": "التدريب النظيف — مسؤوليات أفراد الدعم",
        "p.lede": "ما يجب أن يعرفه المدربون وأفراد دعم الرياضيين: التواطؤ، وإعطاء المواد، ومخاطر المكملات، وكيفية توجيه الرياضيين دون مخالفة المدونة.",
        "p.venuev": "مقر الوكالة، القاعة B",
        "p.langv": "العربية (عرض تقديمي بالإنجليزية)",
        "p.ab.p": "ورشة ليوم واحد للمدربين وأخصائيي العلاج الطبيعي وغيرهم من أفراد الدعم، مبنية على حالات حقيقية من الرياضة الكويتية، مع جلسة عملية حول كيفية التحدث مع الرياضيين عن الأدوية والمكملات.",
        "p.ab.1": "واجباتك بموجب المدونة بصفتك من أفراد دعم الرياضيين",
        "p.ab.2": "التواطؤ والإعطاء والحيازة — حيث يقع المدربون في المخالفة",
        "p.ab.3": "تلوّث المكملات وكيفية الحد من مخاطره",
        "p.ab.4": "كيفية استخدام فاحص الأدوية مع الرياضيين",
        "p.ab.5": "متى يلزم الإعفاء للاستعمال العلاجي ومتى لا يلزم",
        "p.ab.6": "كيفية الإبلاغ عن أي شبهة عبر Speak Up",
        "p.ab.id": "خالد المطيري — مسؤول توعية ومدرب سابق للمنتخب الوطني.",
        "p.r.t": "سجّل في هذه الدورة",
        "p.r.feed": "الدفع عبر كي-نت عند التأكيد",
        "p.r.confirm": "التأكيد ودفع 25 د.ك",
        "p.ok.t": "تم تسجيلك.",
        "p.ok.d": "تم تأكيد الدفع، وأُرسلت التذكرة عبر البريد الإلكتروني والرسائل النصية. اعرض رمز QR عند المدخل.",
        "p.sb.left": "بقي 18 مقعداً",
        "p.sb.d2": "قراءة مسبقة: دليل المدرب",
        "p.cta": "تسجيل"
      }
    },
    tue: {
      img: "assets/img/hero-3.jpg",
      time: "16:00 – 20:00",
      when: "02 · 12 · 2026 · 16:00 – 20:00",
      seats: "57 / 60",
      bar: "95%",
      feePaid: true,
      waitlist: false,
      en: {
        "meta.title": "TUE & Prescribing — Course registration — KADA",
        "p.date": "02 Dec 2026",
        "p.crumb": "TUE & Prescribing",
        "p.feev": "40 KWD",
        "p.cert": "Certified · 4 CPD hours",
        "p.aud": "Medical staff",
        "p.title": "TUE & Prescribing for Athletes — for physicians",
        "p.lede": "Therapeutic Use Exemptions, the ISTUE, common pitfalls in sports medicine, and how to use the KADA medicine checker before you prescribe.",
        "p.venuev": "Online — live webinar",
        "p.langv": "English (AR interpretation)",
        "p.ab.p": "A four-hour live session for team doctors and sports-medicine physicians. Walks through the TUE process, the substances most often mishandled, and how KADA reviews applications.",
        "p.ab.1": "When a TUE is required and the emergency pathway",
        "p.ab.2": "The ISTUE criteria and the medical file KADA expects",
        "p.ab.3": "Glucocorticoids, beta-2 agonists and other frequent pitfalls",
        "p.ab.4": "Using the KADA medicine checker and Global DRO in clinic",
        "p.ab.5": "How to talk to an athlete who needs a prohibited medicine",
        "p.ab.6": "What happens after you submit — timelines and appeals",
        "p.ab.id": "Dr. Dalal Al-Sabah with a TUE Committee physician.",
        "p.r.t": "Register for this course",
        "p.r.feed": "payable by K-Net at confirmation",
        "p.r.confirm": "Confirm and pay 40 KWD",
        "p.ok.t": "You're registered.",
        "p.ok.d": "The webinar link will be emailed 24 hours before the session. A certificate is issued after attendance is recorded.",
        "p.sb.left": "3 seats left",
        "p.sb.d2": "Pre-reading: ISTUE summary",
        "p.cta": "Register"
      },
      ar: {
        "meta.title": "الإعفاء للاستعمال العلاجي ووصف الأدوية — التسجيل — كادا",
        "p.date": "02 ديسمبر 2026",
        "p.crumb": "الإعفاء للاستعمال العلاجي",
        "p.feev": "40 د.ك",
        "p.cert": "معتمد · 4 ساعات تطوير مهني",
        "p.aud": "الكوادر الطبية",
        "p.title": "الإعفاء للاستعمال العلاجي ووصف الأدوية للرياضيين — للأطباء",
        "p.lede": "الإعفاء للاستعمال العلاجي، والمعيار الدولي ISTUE، والأخطاء الشائعة في الطب الرياضي، وكيفية استخدام فاحص الأدوية قبل وصف العلاج.",
        "p.venuev": "عبر الإنترنت — بث مباشر",
        "p.langv": "الإنجليزية (مع ترجمة فورية إلى العربية)",
        "p.ab.p": "جلسة مباشرة مدتها أربع ساعات لأطباء الفرق وأطباء الطب الرياضي، تستعرض مسار الإعفاء للاستعمال العلاجي، والمواد الأكثر عرضة للأخطاء في الوصف، وكيفية مراجعة الوكالة للطلبات.",
        "p.ab.1": "متى يلزم الإعفاء للاستعمال العلاجي، ومسار الحالات الطارئة",
        "p.ab.2": "معايير ISTUE والملف الطبي الذي تطلبه الوكالة",
        "p.ab.3": "الجلوكوكورتيكويدات وناهضات بيتا-2 وأخطاء شائعة أخرى",
        "p.ab.4": "استخدام فاحص الأدوية ومرجع Global DRO في العيادة",
        "p.ab.5": "كيف تتحدث مع رياضي يحتاج إلى دواء محظور",
        "p.ab.6": "ما الذي يحدث بعد التقديم — المهل الزمنية وحق الاستئناف",
        "p.ab.id": "د. دلال الصباح مع طبيب من لجنة الإعفاء للاستعمال العلاجي.",
        "p.r.t": "سجّل في هذه الدورة",
        "p.r.feed": "الدفع عبر كي-نت عند التأكيد",
        "p.r.confirm": "تأكيد والدفع 40 د.ك",
        "p.ok.t": "تم تسجيلك.",
        "p.ok.d": "سيُرسل رابط البث إلى بريدك الإلكتروني قبل الجلسة بـ24 ساعة، وتصدر الشهادة بعد تسجيل الحضور.",
        "p.sb.left": "بقيت 3 مقاعد",
        "p.sb.d2": "قراءة مسبقة: ملخص ISTUE",
        "p.cta": "تسجيل"
      }
    },
    schools: {
      img: "assets/img/news-2.jpg",
      time: "09:00 – 13:00",
      when: "09 · 12 · 2026 · 09:00 – 13:00",
      seats: "8 / 40",
      bar: "20%",
      feePaid: false,
      waitlist: false,
      en: {
        "meta.title": "Clean Sport Day — Course registration — KADA",
        "p.date": "09 Dec 2026",
        "p.crumb": "Clean Sport Day",
        "p.feev": "Free",
        "p.cert": "Outreach · half day",
        "p.aud": "Schools",
        "p.title": "Clean Sport Day — School outreach programme",
        "p.lede": "Interactive sessions for PE teachers and student athletes aged 12–18, with the programme mascot and a quiz. Designed for schools that want a first clean-sport day.",
        "p.venuev": "KADA HQ, education hall",
        "p.langv": "Arabic",
        "p.ab.p": "A half-day programme for PE teachers and student athletes. Games, a short play with the programme mascot, and a teachers' briefing on how to continue the conversation at school.",
        "p.ab.1": "What doping is — in language that 12–18 year-olds understand",
        "p.ab.2": "Why clean sport matters for health, not only medals",
        "p.ab.3": "How to say no to a pill, a drink or a 'shortcut'",
        "p.ab.4": "A classroom activity pack teachers can reuse",
        "p.ab.5": "When to call KADA Education for a follow-up visit",
        "p.ab.6": "How students can use Speak Up if they see something wrong",
        "p.ab.id": "KADA Education team with the programme mascot.",
        "p.r.t": "Register your school group",
        "p.r.feed": "no payment required",
        "p.r.confirm": "Confirm registration",
        "p.ok.t": "Your group is registered.",
        "p.ok.d": "We will email the teacher pack and arrival notes. Bring the QR code for the group check-in.",
        "p.sb.left": "32 seats left",
        "p.sb.d2": "Pre-reading: Teacher pack",
        "p.cta": "Register"
      },
      ar: {
        "meta.title": "يوم الرياضة النظيفة — التسجيل — كادا",
        "p.date": "09 ديسمبر 2026",
        "p.crumb": "يوم الرياضة النظيفة",
        "p.feev": "مجاني",
        "p.cert": "توعية · نصف يوم",
        "p.aud": "المدارس",
        "p.title": "يوم الرياضة النظيفة — برنامج التوعية المدرسية",
        "p.lede": "جلسات تفاعلية لمعلمي التربية البدنية والطلاب الرياضيين من 12 إلى 18 عاماً، مع الشخصية التوعوية للبرنامج ومسابقة، مصمّمة للمدارس التي تنظّم يومها الأول للرياضة النظيفة.",
        "p.venuev": "مقر الوكالة، قاعة التوعية",
        "p.langv": "العربية",
        "p.ab.p": "برنامج لمدة نصف يوم لمعلمي التربية البدنية والطلاب الرياضيين: ألعاب وعرض قصير مع الشخصية التوعوية للبرنامج، وإحاطة للمعلمين حول مواصلة التوعية داخل المدرسة.",
        "p.ab.1": "ما المنشطات؟ — بلغة يفهمها الطلاب من 12 إلى 18 عاماً",
        "p.ab.2": "لماذا تهمّ الرياضة النظيفة من أجل الصحة لا الميداليات فقط",
        "p.ab.3": "كيف ترفض حبة أو شراباً أو «طريقاً مختصراً»",
        "p.ab.4": "حزمة أنشطة صفية يمكن للمعلمين إعادة استخدامها",
        "p.ab.5": "متى تتواصل مع إدارة التوعية لترتيب زيارة لاحقة",
        "p.ab.6": "كيف يستخدم الطلاب Speak Up إن لاحظوا أمراً مريباً",
        "p.ab.id": "فريق التوعية في الوكالة مع الشخصية التوعوية للبرنامج.",
        "p.r.t": "سجّل مجموعة مدرستك",
        "p.r.feed": "لا يلزم الدفع",
        "p.r.confirm": "تأكيد التسجيل",
        "p.ok.t": "تم تسجيل مجموعتك.",
        "p.ok.d": "سنرسل حزمة المعلم وإرشادات الوصول عبر البريد الإلكتروني. أحضر رمز QR لتسجيل حضور المجموعة.",
        "p.sb.left": "بقي 32 مقعداً",
        "p.sb.d2": "قراءة مسبقة: حزمة المعلم",
        "p.cta": "تسجيل"
      }
    },
    dco: {
      img: "assets/img/ops.jpg",
      time: "08:00 – 16:00",
      when: "11–15 · 01 · 2027 · 08:00 – 16:00",
      seats: "20 / 20",
      bar: "100%",
      feePaid: true,
      waitlist: true,
      en: {
        "meta.title": "DCO accreditation — Waiting list — KADA",
        "p.date": "11–15 Jan 2027",
        "p.crumb": "DCO accreditation",
        "p.feev": "120 KWD",
        "p.cert": "Certified · 5 days",
        "p.aud": "KADA DCO candidates",
        "p.title": "Doping Control Officer — accreditation course",
        "p.lede": "For candidate DCOs shortlisted by KADA's Operations department. Five-day programme with practical assessment: notification, chaperoning, sample collection, the doping-control form and chain of custody. This intake is full — join the waiting list.",
        "p.venuev": "KADA HQ, training hall",
        "p.langv": "Arabic (EN materials)",
        "p.ab.p": "KADA's accreditation pathway for doping-control officers. Classroom modules plus observed practicals. A pass is required before you can be rostered on a mission.",
        "p.ab.1": "Notification and athlete rights at the point of testing",
        "p.ab.2": "Chaperoning and reporting immediately to the doping control station",
        "p.ab.3": "Urine and blood collection to the International Standard",
        "p.ab.4": "Completing the doping-control form without errors",
        "p.ab.5": "Chain of custody, sealing and transport to the lab",
        "p.ab.6": "Practical assessment and the conditions of your accreditation",
        "p.ab.id": "Operations department lead trainers, with a WADA-aligned assessor.",
        "p.r.t": "Join the waiting list",
        "p.r.feed": "charged only if a seat is offered",
        "p.r.confirm": "Join waiting list",
        "p.ok.t": "You're on the waiting list.",
        "p.ok.d": "If a seat opens we will contact you by SMS and email, in the order you joined. Keep your reference number.",
        "p.sb.left": "Full — waiting list",
        "p.sb.d2": "Pre-reading: Sample-collection manual",
        "p.cta": "Waiting list"
      },
      ar: {
        "meta.title": "اعتماد مسؤولي مراقبة المنشطات — قائمة الانتظار — كادا",
        "p.date": "11–15 يناير 2027",
        "p.crumb": "اعتماد مسؤولي المراقبة",
        "p.feev": "120 د.ك",
        "p.cert": "معتمد · 5 أيام",
        "p.aud": "مرشّحو الوكالة لمهام مسؤول مراقبة المنشطات",
        "p.title": "مسؤول مراقبة المنشطات — دورة الاعتماد",
        "p.lede": "مخصّصة للمرشحين لمهام مسؤول مراقبة المنشطات ممن ترشّحهم إدارة العمليات في الوكالة. برنامج مدته خمسة أيام مع تقييم عملي: الإخطار والمرافقة وجمع العينات ونموذج مراقبة المنشطات وسلسلة العهدة. هذه الدفعة مكتملة — انضم إلى قائمة الانتظار.",
        "p.venuev": "مقر الوكالة، قاعة التدريب",
        "p.langv": "العربية (مواد باللغة الإنجليزية)",
        "p.ab.p": "مسار الوكالة لاعتماد مسؤولي مراقبة المنشطات: وحدات صفية وتطبيقات عملية تحت الإشراف. ويُشترط اجتياز الدورة قبل تكليفك بأي مهمة.",
        "p.ab.1": "الإخطار وحقوق الرياضي عند الفحص",
        "p.ab.2": "المرافقة والتوجّه الفوري إلى محطة مراقبة المنشطات",
        "p.ab.3": "جمع عينات البول والدم وفق المعيار الدولي",
        "p.ab.4": "تعبئة نموذج مراقبة المنشطات دون أخطاء",
        "p.ab.5": "سلسلة العهدة والختم والنقل إلى المختبر",
        "p.ab.6": "التقييم العملي وشروط اعتمادك",
        "p.ab.id": "مدربون رئيسيون من إدارة العمليات، مع مقيّم وفق معايير وادا.",
        "p.r.t": "انضم إلى قائمة الانتظار",
        "p.r.feed": "يُحصَّل الرسم فقط عند توفر مقعد لك",
        "p.r.confirm": "الانضمام إلى قائمة الانتظار",
        "p.ok.t": "تمت إضافتك إلى قائمة الانتظار.",
        "p.ok.d": "إذا شغر مقعد فسنتواصل معك عبر الرسائل النصية والبريد الإلكتروني حسب ترتيب التسجيل. احتفظ برقمك المرجعي.",
        "p.sb.left": "مكتملة — قائمة الانتظار",
        "p.sb.d2": "قراءة مسبقة: دليل جمع العينات",
        "p.cta": "قائمة الانتظار"
      }
    }
  };

  window.KADA_COURSES = COURSES;

  if (!document.querySelector("[data-course-page]")) return;

  var id = (new URLSearchParams(location.search).get("id") || "essentials").toLowerCase();
  var course = COURSES[id] || COURSES.essentials;
  document.body.setAttribute("data-course-id", id);

  window.KADA_AR_PAGE = Object.assign({}, window.KADA_AR_PAGE || {}, course.ar);

  Object.keys(course.en).forEach(function (key) {
    document.querySelectorAll('[data-i18n="' + key + '"]').forEach(function (el) {
      el.innerHTML = course.en[key];
    });
    document.querySelectorAll('[data-i18n-title="' + key + '"]').forEach(function (el) {
      el.textContent = course.en[key];
    });
  });

  var hero = document.querySelector("[data-course='hero']");
  if (hero) hero.setAttribute("src", course.img);

  var timeEl = document.querySelector("[data-course='time']");
  if (timeEl) timeEl.textContent = course.time;
  var whenEl = document.querySelector("[data-course='when']");
  if (whenEl) whenEl.textContent = course.when;
  var seatsEl = document.querySelector("[data-course='seats']");
  if (seatsEl) seatsEl.textContent = course.seats;

  var bar = document.querySelector("[data-course='bar']");
  if (bar) bar.setAttribute("data-w", course.bar);

  document.querySelectorAll("[data-course='fee']").forEach(function (el) {
    el.className = course.feePaid ? "badge info plain num" : "badge ok";
  });

  if (course.waitlist) {
    document.querySelectorAll("[data-course='cta-btn']").forEach(function (el) {
      el.classList.remove("btn-primary");
      el.classList.add("btn-ghost");
    });
  }
})();
