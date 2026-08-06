"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type LanguageCode = "en" | "ur" | "ar" | "fa";

interface TranslationMap {
  [key: string]: string | TranslationMap;
}
type TranslationValue = string | TranslationMap;

const translations: Record<
  LanguageCode,
  TranslationMap
> = {
  en: {
    languageName: "English",
    topBar: {
      message: "Inspiring Hearts Through the Light of the Noble Quran",
    },
    nav: {
      home: "Home",
      about: "About Us",
      courses: "Courses",
      tuition: "Tuition Fees",
      teachers: "Our Tutors",
      admissions: "Admissions",
      reviews: "Reviews",
      contact: "Contact Us",
      blog: "Blog",
      trial: "Book Free Trial",
    },
    hero: {
      welcome: "Welcome to Maqsad-e-Quran Academy",
      titleFirst: "Learn the Holy Quran Online",
      titleSecond: "With Authentic Tajweed & Excellence",
      description:
        "1-on-1 Live Online Quran & Islamic Studies classes for kids, sisters, and adults worldwide. Guided by certified male & female tutors at your flexible schedule.",
      trial: "Book 3-Day Free Trial",
      courses: "Explore Programs",
      badge1: "✓ Male & Female Tutors",
      badge2: "✓ 1-on-1 Personalized Classes",
      badge3: "✓ Flexible Timings 24/7",
      trustText: "Trusted by 5,000+ students globally across 35+ countries",
    },
    stats: {
      students: "Enrolled Students",
      courses: "Specialized Courses",
      countries: "Countries Reached",
      experience: "Years Experience",
    },
    form: {
      badge: "Book In 60 Seconds",
      title: "Book Your 3-Day Free Trial",
      subtitle: "Get 3 Days Free Trial — No Credit Card Required",
      student: "Student Name",
      parent: "Parent / Guardian Name",
      email: "Email Address (Optional)",
      whatsapp: "WhatsApp Number (With Country Code)",
      selectCourse: "Select Course",
      submit: "Schedule Free Trial Now",
      submitting: "Submitting Request...",
      guarantee1: "100% Free Trial",
      guarantee2: "Quick 24h Setup",
      guarantee3: "Privacy Guaranteed",
    },
    courses: {
      title: "Our Programs",
      heading: "Explore Our Sacred Courses",
      description:
        "We provide authentic Quranic and Islamic education through certified male and female scholars with flexible schedules for students worldwide.",
      learnMore: "View Syllabus & Outline",
      list: {
        qaida: {
          title: "Noorani Qaida",
          desc: "Learn Arabic letters, phonetics, and correct Makharij from the absolute foundation.",
        },
        reading: {
          title: "Quran Reading (Nazra)",
          desc: "Recite the Holy Quran fluently with proper rhythm, guidance, and confidence.",
        },
        tajweed: {
          title: "Tajweed-ul-Quran",
          desc: "Master the rules of Tajweed, Makharij, and Sifaat with certified Qaris.",
        },
        hifz: {
          title: "Hifz-ul-Quran",
          desc: "Memorize the Holy Quran through structured daily lessons and systematic revision.",
        },
        tafseer: {
          title: "Translation & Tafseer",
          desc: "Understand the profound meanings, context, and spiritual message of the Holy Quran.",
        },
        arabic: {
          title: "Quranic & Classical Arabic",
          desc: "Learn Quranic Arabic vocabulary and grammar to directly comprehend divine revelation.",
        },
        islamicStudies: {
          title: "Islamic Studies & Duas",
          desc: "Essential Fiqh, daily Masnoon Duas, Islamic etiquette, and Seerah of the Prophet (ﷺ).",
        },
      },
    },
    learningProcess: {
      subtitle: "Simple Admission Process",
      titleFirst: "Start Quran Classes",
      titleSecond: "in 4 Easy Steps",
      description:
        "Our admission process is simple, fast, and designed for families living in different countries and time zones.",
      cta: "Start 3-Day Free Trial",
      steps: {
        step1: {
          title: "Send Your Details",
          desc: "Complete the free trial form or message our admission team on WhatsApp.",
        },
        step2: {
          title: "Choose Your Tutor",
          desc: "Select a qualified male or female Quran teacher according to your preference.",
        },
        step3: {
          title: "Attend Free Trial",
          desc: "Experience 3 days of interactive 1-on-1 trial classes with zero obligation.",
        },
        step4: {
          title: "Begin Learning",
          desc: "Choose a suitable weekly schedule and begin your regular online Quran classes.",
        },
      },
    },
    about: {
      subtitle: "About Our Academy",
      title: "Welcome to",
      highlight: "Maqsad-e-Quran Academy",
      desc1:
        "Maqsad-e-Quran Academy is a premier international online institute dedicated to spreading authentic Quranic education to kids and adults worldwide.",
      desc2:
        "We offer Noorani Qaida, Nazra Quran, Tajweed rules, Hifz, Tafseer, Quranic Arabic, and Islamic Studies taught by certified male and female scholars.",
      teachersStat: "50+",
      teachersLabel: "Qualified Tutors",
      studentsStat: "5000+",
      studentsLabel: "Global Students",
      missionTitle: "Our Mission",
      missionHeading: "Spreading the Light of the Quran",
      missionDesc:
        "Our sacred mission is to make authentic Quranic learning accessible to every Muslim household worldwide through modern technology and dedicated 1-on-1 tutoring.",
    },
    whyChoose: {
      subtitle: "Why Choose Us",
      title: "Why Families Trust",
      highlight: "Maqsad-e-Quran Academy",
    },
    teachers: {
      subtitle: "Our Teaching Faculty",
      title: "Learn with Over",
      highlight: "50 Qualified Quran Tutors",
      description:
        "Our certified male and female scholars provide individual attention, correct pronunciation, Tajweed mastery, and warm spiritual mentorship.",
    },
    reviews: {
      subtitle: "Parents & Students Reviews",
      title: "What Families Say About",
      highlight: "Maqsad-e-Quran Academy",
      description:
        "Families across the UK, USA, Canada, Australia, and worldwide trust our certified scholars for structured and inspiring Quran education.",
    },
    faq: {
      subtitle: "Frequently Asked Questions",
      title: "Everything You Need to Know",
      highlight: "Before Starting Classes",
      description:
        "Find clear answers to common questions about our 1-on-1 classes, male and female tutors, schedules, and free trial.",
    },
    contact: {
      subtitle: "Contact & Admissions",
      title: "Start Your Quran",
      highlight: "Learning Journey Today",
      description:
        "Submit your details for a 3-day free trial. Our admissions team will reach out via WhatsApp immediately.",
    },
    footer: {
      aboutDesc:
        "Authentic 1-on-1 online Quran and Islamic Studies classes for kids and adults worldwide with certified male and female tutors.",
      quickLinks: "Quick Links",
      ourCourses: "Our Courses",
      contactInfo: "Contact & Support",
      rights: "© 2026 Maqsad-e-Quran Academy. All rights reserved.",
      dedicated: "Dedicated to spreading authentic Quranic knowledge",
    },
  },

  ur: {
    languageName: "اردو",
    topBar: {
      message: "قرآنِ کریم کے مقدس نور سے اپنے قلوب و اذہان کو منور کیجیے",
    },
    nav: {
      home: "صفحۂ اول",
      about: "ہمارے بارے میں",
      courses: "کورسز",
      tuition: "ٹیوشن فیس",
      teachers: "اساتذۂ کرام",
      admissions: "داخلہ",
      reviews: "تاثرات",
      contact: "رابطہ کریں",
      blog: "اسلامی بلاگ",
      trial: "مفت آزمائشی کلاس",
    },
    hero: {
      welcome: "مقصدِ قرآن اکیڈمی میں خوش آمدید",
      titleFirst: "قرآنِ کریم آن لائن سیکھیں",
      titleSecond: "صحیح تجوید اور کامل ترتیل کے ساتھ",
      description:
        "دنیا بھر کے بچوں، خواتین اور بڑوں کے لیے ۱-آن-۱ لائیو قرآنی کلاسز۔ مستند قراء اور فاضل معلمات کی زیرِ نگرانی اپنی سہولت کے مطابق تعلیم حاصل کریں۔",
      trial: "مفت ۳ روزہ آزمائشی کلاس لیں",
      courses: "کورسز کی تفصیلات دیکھیں",
      badge1: "✓ مستند قراء و فاضل معلمات",
      badge2: "✓ انفرادی (1-on-1) تدریس",
      badge3: "✓ ۲۴ گھنٹے لچکدار اوقات",
      trustText: "دنیا کے ۳۵ سے زائد ممالک میں ۵۰۰۰+ طلبہ کا اعتماد",
    },
    stats: {
      students: "زیرِ تعلیم طلبہ",
      courses: "جامع کورسز",
      countries: "مختلف ممالک",
      experience: "سالہ تدریسی تجربہ",
    },
    form: {
      badge: "صرف ۶۰ سیکنڈ میں فارم پُر کریں",
      title: "مفت آزمائشی کلاس بُک کیجیے",
      subtitle: "۳ دن کی بلا معاوضہ آزمائشی کلاسز — بغیر کسی پیشگی رجسٹریشن فیس کے",
      student: "طالب علم کا مکمل نام",
      parent: "والد / سرپرست کا نام",
      email: "ای میل ایڈریس (اختیاری)",
      whatsapp: "واٹس ایپ نمبر (کنٹری کوڈ کے ساتھ)",
      selectCourse: "کورس منتخب کیجیے",
      submit: "آزمائشی کلاس کا وقت مقرر کریں",
      submitting: "درخواست ارسال کی جا رہی ہے...",
      guarantee1: "۱۰۰٪ مفت ٹرائل",
      guarantee2: "فوری ۲۴ گھنٹے میں کلاس",
      guarantee3: "مکمل راز داری کی ضمانت",
    },
    courses: {
      title: "ہمارے پروگرام",
      heading: "ہمارے جامع قرآنی کورسز",
      description:
        "سند یافتہ قراء اور فاضل معلمات کی زیرِ نگرانی تمام عمر کے طلبہ کے لیے لچکدار اوقات کے ساتھ مستند تعلیمی کورسز۔",
      learnMore: "نصاب اور تفصیلات دیکھیں",
      list: {
        qaida: {
          title: "نورانی قاعدہ",
          desc: "ابتدائی طلبہ کے لیے عربی حروف کی پہچان اور صحیح مخارج کی بنیادی تعلیم۔",
        },
        reading: {
          title: "ناظرہ قرآن کریم",
          desc: "مکمل صحت و روانی اور خوبصورت ترتیل کے ساتھ قرآن مجید پڑھنا سیکھیں۔",
        },
        tajweed: {
          title: "تجوید و مخارج",
          desc: "تجوید کے قواعد (نون ساکن، مد، مخارج) کی مستند اساتذہ سے مشق۔",
        },
        hifz: {
          title: "حفظِ قرآن کریم",
          desc: "روزانہ کے سبق، سبقی اور منزل کی باقاعدہ دہرائی کے ساتھ مکمل حفظ۔",
        },
        tafseer: {
          title: "ترجمہ و تفسیرِ قرآن",
          desc: "قرآن مجید کے معانی، مفاہیم اور شانِ نزول کو گہرائی سے سمجھیں۔",
        },
        arabic: {
          title: "قرآنی و کلاسیکی عربی",
          desc: "فہمِ قرآن کے لیے عربی گرامر، قواعد اور ذخیرۂ الفاظ پر عبور۔",
        },
        islamicStudies: {
          title: "اسلامی تعلیمات و مسنون دعائیں",
          desc: "بنیادی مسائلِ فقہ، مسنون دعائیں، اخلاقیات اور سیرتِ طیبہ (ﷺ) کی تعلیم۔",
        },
      },
    },
    learningProcess: {
      subtitle: "داخلے کا آسان طریقہ کار",
      titleFirst: "اپنا قرآنی سفر شروع کریں",
      titleSecond: "صرف ۴ آسان مراحل میں",
      description:
        "بیرونِ ملک مقیم خاندانوں کے لیے دنیا کے کسی بھی ٹائم زون کے مطابق آسان اور شفاف طریقۂ کار۔",
      cta: "مفت ۳ روزہ ٹرائل شروع کریں",
      steps: {
        step1: {
          title: "تفصیلات بھیجیں",
          desc: "آزمائشی کلاس کا فارم پُر کریں یا واٹس ایپ کے ذریعے رابطہ کریں۔",
        },
        step2: {
          title: "استاد کا انتخاب",
          desc: "اپنی سہولت کے مطابق فاضل قاری یا معلمہ کا انتخاب کریں۔",
        },
        step3: {
          title: "آزمائشی کلاس لیں",
          desc: "۳ دن بلا معاوضہ انفرادی لائیو کلاس میں شرکت کر کے اطمینان کریں۔",
        },
        step4: {
          title: "باقاعدہ تعلیم کا آغاز",
          desc: "مناسب ترین اوقات کا تعین کر کے اپنا باقاعدہ تعلیمی سفر شروع کریں۔",
        },
      },
    },
    about: {
      subtitle: "ہمارے اکیڈمی کے بارے میں",
      title: "خوش آمدید",
      highlight: "مقصدِ قرآن اکیڈمی",
      desc1:
        "مقصدِ قرآن اکیڈمی ایک بین الاقوامی آن لائن تعلیمی ادارہ ہے جو دنیا بھر کے بچوں اور بڑوں کو مستند قرآنی تعلیم فراہم کرتا ہے۔",
      desc2:
        "ہم نورانی قاعدہ، ناظرہ، تجوید، حفظ، تفسیر، قرآنی عربی اور اسلامی تعلیمات سند یافتہ اساتذہ و معلمات کے ذریعے پڑھاتے ہیں۔",
      teachersStat: "۵۰+",
      teachersLabel: "مستند اساتذۂ کرام",
      studentsStat: "۵۰۰۰+",
      studentsLabel: "عالمی طلبہ",
      missionTitle: "ہمارا مقصد",
      missionHeading: "قرآنِ مجید کی روشنی عام کرنا",
      missionDesc:
        "ہمارا مقصد ہر مسلم گھرانے تک جدید تکنیک اور انفرادی کلاسز کے ذریعے قرآنِ کریم کی مستند تعلیم پہنچانا ہے۔",
    },
    whyChoose: {
      subtitle: "ہمیں کیوں منتخب کریں",
      title: "طلبہ و والدین کا اعتماد",
      highlight: "مقصدِ قرآن اکیڈمی",
    },
    teachers: {
      subtitle: "ہمارا تعلیمی عملہ",
      title: "تعلیم حاصل کریں",
      highlight: "۵۰ سے زائد مستند اساتذہ کے ساتھ",
      description:
        "ہمارے تجربہ کار قراء اور معلمات انفرادی توجہ اور صحیح تلفظ کے ساتھ قرآنی تعلیم فراہم کرتے ہیں۔",
    },
    reviews: {
      subtitle: "والدین و طلبہ کے تاثرات",
      title: "ہمارے بارے میں",
      highlight: "خاندانوں کی رائے",
      description:
        "برطانیہ، امریکہ، کینیڈا، آسٹریلیا اور دنیا بھر کے خاندان ہماری معیاری تدریس پر اعتماد کرتے ہیں۔",
    },
    faq: {
      subtitle: "عام طور پر پوچھے جانے والے سوالات",
      title: "داخلہ لینے سے پہلے",
      highlight: "اہم معلومات",
      description:
        "ہماری لائیو کلاسز، اساتذہ اور مفت ٹرائل سے متعلق اپنے تمام سوالات کے جوابات حاصل کریں۔",
    },
    contact: {
      subtitle: "رابطہ و داخلہ",
      title: "اپنا قرآنی سفر",
      highlight: "آج ہی شروع کیجیے",
      description:
        "مفت ۳ روزہ آزمائشی کلاس کے لیے اپنی تفصیلات ارسال کریں۔ ہماری ٹیم واٹس ایپ پر رابطہ کرے گی۔",
    },
    footer: {
      aboutDesc:
        "دنیا بھر کے بچوں اور بڑوں کے لیے ۱-آن-۱ آن لائن قرآن اور اسلامی تعلیمات کی لائیو کلاسز۔",
      quickLinks: "ہماری نیویگیشن",
      ourCourses: "ہمارے کورسز",
      contactInfo: "رابطہ و معاونت",
      rights: "© ۲۰۲۶ مقصدِ قرآن اکیڈمی۔ جملہ حقوق محفوظ ہیں۔",
      dedicated: "مستند قرآنی علوم کے فروغ کے لیے کوشاں",
    },
  },

  ar: {
    languageName: "العربية",
    topBar: {
      message: "أنيروا قلوبكم بنور القرآن الكريم وآياته المباركة",
    },
    nav: {
      home: "الرئيسية",
      about: "عن الأكاديمية",
      courses: "الدورات",
      tuition: "الرسوم",
      teachers: "المعلمون",
      admissions: "التسجيل",
      reviews: "الآراء",
      contact: "اتصل بنا",
      blog: "المدونة",
      trial: "حصة تجريبية مجانية",
    },
    hero: {
      welcome: "مرحباً بكم في أكاديمية مقصد القرآن",
      titleFirst: "تعلم القرآن الكريم عبر الإنترنت",
      titleSecond: "بإتقان وتجويد وأعلى درجات التميز",
      description:
        "دروس قرآنية فردية (1-on-1) مباشرة للأطفال والكبار حول العالم، تحت إشراف نخبة من المعلمين والمعلمات المجازين بأوقات مرنة.",
      trial: "احجز ۳ أيام تجريبية مجاناً",
      courses: "استكشف البرامج",
      badge1: "✓ معلمون ومعلمات مجازون",
      badge2: "✓ دروس فردية متخصصة",
      badge3: "✓ مواعيد مرنة على مدار الساعة",
      trustText: "محل ثقة أكثر من ٥٠٠٠ طالب في أكثر من ٣٥ دولة",
    },
    stats: {
      students: "طالب وطالبة",
      courses: "برامج قرآنية",
      countries: "دولة حول العالم",
      experience: "سنوات من الخبرة",
    },
    form: {
      badge: "سجل خلال ٦٠ ثانية",
      title: "احجز حصتك التجريبية المجانية",
      subtitle: "احصل على ۳ أيام تجريبية مجاناً — دون أي التزام مالي",
      student: "اسم الطالب الكامل",
      parent: "اسم ولي الأمر",
      email: "البريد الإلكتروني (اختياري)",
      whatsapp: "رقم الواتساب (مع رمز الدولة)",
      selectCourse: "اختر الدورة المناسبة",
      submit: "تأكيد حجز الحصة المجانية",
      submitting: "جاري إرسال الطلب...",
      guarantee1: "حصة مجانية ۱۰۰٪",
      guarantee2: "تنسيق سريع خلال ۲٤ ساعة",
      guarantee3: "خصوصية تامة ومضمونة",
    },
    courses: {
      title: "برامجنا القرآنية",
      heading: "استكشف دوراتنا التعليمية",
      description:
        "نقدم تعليماً إسلامياً أصيلاً وشاملاً على يد معلمين ومعلمات مجازين لجميع الأعمار بأوقات مرنة.",
      learnMore: "عرض المنهج والتفاصيل",
      list: {
        qaida: {
          title: "القاعدة النورانية",
          desc: "تأسيس الطلاب في نطق الحروف العربية والمخارج الصحيحة خطوة بخطوة.",
        },
        reading: {
          title: "تلاوة القرآن وترتيله",
          desc: "قراءة القرآن الكريم بطلاقة وإتقان مع تطبيق الترتيل والنطق السليم.",
        },
        tajweed: {
          title: "أحكام التجويد والإتقان",
          desc: "دراسة أحكام النون الساكنة والتنوين والمدود والمخارج على يد علماء متخصصين.",
        },
        hifz: {
          title: "حفظ القرآن الكريم",
          desc: "برنامج حفظ منهجي ومكثف مع المراجعة اليومية والمتابعة الفردية.",
        },
        tafseer: {
          title: "التفسير وترجمة المعاني",
          desc: "تدبر آيات كتاب الله وفهم معانيها وأسباب نزولها ودلالاتها الإيمانية.",
        },
        arabic: {
          title: "اللغة العربية والقرآنية",
          desc: "تعلم القواعد والنحو العربي لتدبر القرآن الكريم مباشرة وفهم آياته.",
        },
        islamicStudies: {
          title: "الدراسات الإسلامية والأذكار",
          desc: "تعليم الفقه الأساسي، الأذكار اليومية، الأخلاق الإسلامية، والسيرة النبوية العطرة.",
        },
      },
    },
    learningProcess: {
      subtitle: "خطوات التسجيل البسيطة",
      titleFirst: "ابدأ رحلتك مع كتاب الله",
      titleSecond: "في ٤ خطوات سهلة",
      description:
        "صُممت عملية التسجيل لتكون سلسة وسريعة للعائلات في مختلف الدول والمناطق الزمنية.",
      cta: "ابدأ التجربة المجانية",
      steps: {
        step1: {
          title: "أرسل البيانات",
          desc: "قم بتعبئة نموذج الحصة المجانية أو التواصل المباشر عبر الواتساب.",
        },
        step2: {
          title: "اختر المعلم المناسب",
          desc: "اختر معلماً أو معلمة مجازين وفقاً لتفضيلاتك وأوقاتك المناسبة.",
        },
        step3: {
          title: "احضر التجربة المجانية",
          desc: "شارك في حصص تجريبية فردية لمدة ۳ أيام واكتشف أسلوبنا التعليمي المميز.",
        },
        step4: {
          title: "انطلق في التعلم",
          desc: "حدد جدولك الأسبوعي المفضل وابدأ دراستك المنتظمة بكل يسر.",
        },
      },
    },
    about: {
      subtitle: "عن الأكاديمية",
      title: "أهلاً بكم في",
      highlight: "أكاديمية مقصد القرآن",
      desc1:
        "أكاديمية مقصد القرآن هي أكاديمية عالمية متخصصة في تقديم تعليم قرآني أصيل وعالي الجودة للأطفال والكبار حول العالم.",
      desc2:
        "نقدم القاعدة النورانية، تلاوة القرآن، التجويد، الحفظ، التفسير، واللغة العربية بإشراف نخبة من الكوادر التعليمية المجازة.",
      teachersStat: "٥٠+",
      teachersLabel: "معلم ومعلمة مجازون",
      studentsStat: "٥۰۰۰+",
      studentsLabel: "طالب حول العالم",
      missionTitle: "رسالتنا",
      missionHeading: "نشر نور القرآن الكريم",
      missionDesc:
        "رسالتنا السامية هي تيسير تعليم القرآن الكريم لكل بيت مسلم باستخدام أحدث التقنيات والتعليم الفردي المباشر.",
    },
    whyChoose: {
      subtitle: "لماذا تختارنا",
      title: "لماذا تختار العائلات",
      highlight: "أكاديمية مقصد القرآن",
    },
    teachers: {
      subtitle: "الكادر التعليمي",
      title: "تعلم مع أكثر من",
      highlight: "٥٠ معلماً ومعلمة مجازين",
      description:
        "يقدم معلمونا المتميزون اهتماماً فردياً وتوجيهاً دقيقاً لأحكام التجويد والمخارج مع بيئة تعليمية مشجعة.",
    },
    reviews: {
      subtitle: "آراء أولياء الأمور والطلاب",
      title: "ماذا يقول أولياء الأمور عن",
      highlight: "أكاديمية مقصد القرآن",
      description:
        "تثق العائلات في بريطانيا وأمريكا وكندا وأستراليا ومختلف الدول في معلمينا لتقديم تعليم قرآني منهجي ومتميز.",
    },
    faq: {
      subtitle: "الأسئلة الشائعة",
      title: "كل ما تحتاج معرفته",
      highlight: "قبل البدء في الدروس",
      description:
        "احصل على إجابات وافية حول الدروس الفردية، المعلمين والمعلمات، المواعيد، والحصة التجريبية.",
    },
    contact: {
      subtitle: "التواصل والقبول",
      title: "ابدأ رحلتك القرآنية",
      highlight: "اليوم معنا",
      description:
        "أرسل بياناتك للحصول على حصة تجريبية مجانية، وسيتواصل معك فريق التسجيل عبر الواتساب فوراً.",
    },
    footer: {
      aboutDesc:
        "دروس قرآنية وإسلامية فردية مباشرة عبر الإنترنت للأطفال والكبار مع معلمين ومعلمات مجازين.",
      quickLinks: "روابط سريعة",
      ourCourses: "دوراتنا المميزة",
      contactInfo: "التواصل والدعم",
      rights: "© ۲۰۲۶ أكاديمية مقصد القرآن. جميع الحقوق محفوظة.",
      dedicated: "مكرس لنشر العلوم القرآنية الأصيلة",
    },
  },

  fa: {
    languageName: "فارسی",
    topBar: {
      message: "منور ساختن دل‌ها با نور پرفروغ و معنوی قرآن کریم",
    },
    nav: {
      home: "صفحه اصلی",
      about: "درباره ما",
      courses: "دوره‌ها",
      tuition: "شهریه",
      teachers: "اساتید",
      admissions: "ثبت‌نام",
      reviews: "نظرات",
      contact: "تماس",
      blog: "وبلاگ",
      trial: "کلاس آزمایشی رایگان",
    },
    hero: {
      welcome: "به آکادمی مقصد قرآن خوش آمدید",
      titleFirst: "آموزش آنلاین قرآن کریم",
      titleSecond: "با کیفیت عالی، تجوید اصیل و دقت بالا",
      description:
        "کلاس‌های زنده و اختصاصی (1-on-1) آموزش قرآن و معارف اسلامی برای کودکان و بزرگسالان در سراسر جهان با اساتید باتجربه آقا و خانم.",
      trial: "رزرو ۳ روز کلاس آزمایشی رایگان",
      courses: "مشاهده دوره‌ها",
      badge1: "✓ اساتید و قاریان مجرب آقا و خانم",
      badge2: "✓ کلاس‌های کاملاً اختصاصی (انفرادی)",
      badge3: "✓ زمان‌بندی ۲۴ ساعته و انعطاف‌پذیر",
      trustText: "مورد اعتماد بیش از ۵۰۰۰ قرآن‌آموز در ۳۵ کشور جهان",
    },
    stats: {
      students: "قرآن‌آموز فعال",
      courses: "دوره آموزشی",
      countries: "کشور جهان",
      experience: "سال تجربه درخشان",
    },
    form: {
      badge: "ثبت‌نام سریع در ۶۰ ثانیه",
      title: "رزرو ۳ روز کلاس آزمایشی رایگان",
      subtitle: "۳ روز کلاس آزمایشی رایگان — بدون نیاز به پرداخت پیش‌پرداخت",
      student: "نام و نام خانوادگی قرآن‌آموز",
      parent: "نام والد / سرپرست",
      email: "آدرس ایمیل (اختیاری)",
      whatsapp: "شماره واتساپ (همراه با کد کشور)",
      selectCourse: "انتخاب دوره مورد نظر",
      submit: "ثبت درخواست کلاس آزمایشی",
      submitting: "در حال ارسال اطلاعات...",
      guarantee1: "۱۰۰٪ رایگان و بدون تعهد",
      guarantee2: "هماهنگی سریع در ۲۴ ساعت",
      guarantee3: "حفظ کامل حریم خصوصی",
    },
    courses: {
      title: "برنامه‌های آموزشی ما",
      heading: "دوره‌های جامع قرآنی و اسلامی",
      description:
        "ارائه آموزش‌های اصیل اسلامی توسط اساتید و قاریان مجرب با برنامه‌ریزی منعطف برای تمام رده‌های سنی در سراسر جهان.",
      learnMore: "مشاهده سرفصل‌ها و جزئیات",
      list: {
        qaida: {
          title: "قاعده نورانی",
          desc: "یادگیری گام به گام الفبا، حروف عربی و تلفظ صحیح مخارج از پایه.",
        },
        reading: {
          title: "روخوانی و روانی تلاوت",
          desc: "تلاوت روان و با کیفیت قرآن کریم همراه با رعايت لحن و قواعد اولیه.",
        },
        tajweed: {
          title: "تجوید تخصصی و مخارج",
          desc: "تسلط کامل بر قواعد تجوید (صفات و مخارج حروف، مدود و احکام) زیر نظر اساتید برجسته.",
        },
        hifz: {
          title: "حفظ قرآن کریم",
          desc: "برنامه ساختاریافته حفظ قرآن همراه با مرور روزانه و تثبیت آنلاین.",
        },
        tafseer: {
          title: "ترجمه و تفسیر قرآن",
          desc: "درک معانی، شأن نزول و مفاهیم عمیق معنوی و هدایتی آیات الهی.",
        },
        arabic: {
          title: "زبان عربی و قرآنی",
          desc: "آموزش قواعد و صرف و نحو عربی جهت درک مستقیم آیات کلام‌الله.",
        },
        islamicStudies: {
          title: "معارف اسلامی و ادعیه",
          desc: "آموزش احکام کاربردی، ادعیه روزمره، اخلاق اسلامی و سیره پیامبر (ص).",
        },
      },
    },
    learningProcess: {
      subtitle: "مراحل ساده پذیرش",
      titleFirst: "آغاز مسیر نورانی قرآن",
      titleSecond: "در ۴ گام آسان",
      description:
        "فرآیندی بسیار ساده، سریع و هماهنگ با مناطق زمانی مختلف در سراسر جهان.",
      cta: "شروع کلاس آزمایشی رایگان",
      steps: {
        step1: {
          title: "ارسال اطلاعات",
          desc: "فرم درخواست را تکمیل کنید یا از طریق واتساپ مستقیماً پیام دهید.",
        },
        step2: {
          title: "انتخاب استاد",
          desc: "استاد مجرب آقا یا خانم را با توجه به زمان‌بندی و نیاز خود انتخاب کنید.",
        },
        step3: {
          title: "شرکت در جلسه آزمایشی",
          desc: "در کلاس انفرادی ۳ روزه رایگان شرکت کرده و کیفیت آموزش را ارزیابی کنید.",
        },
        step4: {
          title: "شروع کلاس‌های منظم",
          desc: "برنامه هفتگی خود را نهایی کرده و یادگیری قرآن کریم را آغاز نمایید.",
        },
      },
    },
    about: {
      subtitle: "درباره آکادمی ما",
      title: "به آکادمی",
      highlight: "مقصد قرآن خوش آمدید",
      desc1:
        "آکادمی مقصد قرآن یک موسسه بین‌المللی آنلاین است که آموزش‌های اصیل قرآن کریم را به کودکان و بزرگسالان در سراسر جهان ارائه می‌دهد.",
      desc2:
        "ما دوره‌های قاعده نورانی، روخوانی، تجوید، حفظ، تفسیر و زبان عربی را توسط اساتید آقا و خانم آموزش می‌دهیم.",
      teachersStat: "۵۰+",
      teachersLabel: "استاد برجسته",
      studentsStat: "۵۰۰۰+",
      studentsLabel: "قرآن‌آموز جهانی",
      missionTitle: "رسالت ما",
      missionHeading: "گسترش نور پرفروغ قرآن کریم",
      missionDesc:
        "رسالت مقدس ما دسترسی آسان هر خانواده مسلمان به آموزش‌های اصیل قرآن کریم از طریق تکنولوژی روز و کلاس‌های اختصاصی است.",
    },
    whyChoose: {
      subtitle: "چرا ما را انتخاب کنید",
      title: "چرا خانواده‌ها به",
      highlight: "آکادمی مقصد قرآن اعتماد می‌کنند",
    },
    teachers: {
      subtitle: "کادر آموزشی ما",
      title: "یادگیری با بیش از",
      highlight: "۵۰ استاد مجرب و متخصص",
      description:
        "اساتید باتجربه آقا و خانم ما توجه انفرادی، تلفظ صحیح مخارج، و هدایت تجویدی عالی را برای تمام رده‌های سنی ارائه می‌دهند.",
    },
    reviews: {
      subtitle: "نظرات والدین و قرآن‌آموزان",
      title: "آنچه خانواده‌ها درباره",
      highlight: "آکادمی مقصد قرآن می‌گویند",
      description:
        "خانواده‌هایی از انگلیس، آمریکا، کانادا، استرالیا و سراسر جهان به اساتید ما برای آموزش ساختاریافته قرآن اعتماد دارند.",
    },
    faq: {
      subtitle: "سوالات متداول",
      title: "همه آنچه باید بدانید",
      highlight: "قبل از شروع کلاس‌ها",
      description:
        "پاسخ سوالات رایج درباره کلاس‌های انفرادی، اساتید آقا و خانم، زمان‌بندی و جلسه آزمایشی رایگان را بیابید.",
    },
    contact: {
      subtitle: "ارتباط و پذیرش",
      title: "مسیر نورانی یادگیری قرآن را",
      highlight: "از امروز آغاز کنید",
      description:
        "اطلاعات خود را برای کلاس آزمایشی ۳ روزه رایگان ارسال کنید. تیم پذیرش ما از طریق واتساپ با شما تماس خواهد گرفت.",
    },
    footer: {
      aboutDesc:
        "کلاس‌های زنده و انفرادی آنلاین قرآن کریم و معارف اسلامی برای کودکان و بزرگسالان در سراسر جهان با اساتید مجرب آقا و خانم.",
      quickLinks: "دسترسی سریع",
      ourCourses: "دوره‌های اصلی",
      contactInfo: "ارتباط و پشتیبانی",
      rights: "© ۲۰۲۶ آکادمی مقصد قرآن. تمامی حقوق محفوظ است.",
      dedicated: "متعهد به گسترش معارف اصیل قرآنی",
    },
  },
};

type LanguageContextType = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  direction: "ltr" | "rtl";
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>("en");

  const direction = language === "en" ? "ltr" : "rtl";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: TranslationValue = translations[language];

    for (const currentKey of keys) {
      if (
        typeof value === "object" &&
        value !== null &&
        currentKey in value
      ) {
        value = value[currentKey];
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, direction, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}