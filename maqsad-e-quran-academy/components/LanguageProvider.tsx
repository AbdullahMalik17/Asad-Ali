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
      message: "Inspiring Hearts Through the Light of the Quran",
    },
    nav: {
      home: "Home",
      about: "About",
      courses: "Courses",
      teachers: "Teachers",
      admissions: "Admissions",
      reviews: "Reviews",
      contact: "Contact",
      trial: "Book Free Trial",
    },
    hero: {
      welcome: "Welcome to Maqsad-e-Quran Academy",
      titleFirst: "Learn Quran Online",
      titleSecond: "With Excellence",
      description:
        "One-to-One Live Quran Classes for Kids & Adults Worldwide.",
      trial: "Book Free Trial",
      courses: "Explore Courses",
    },
    stats: {
      students: "Students",
      courses: "Courses",
      countries: "Countries",
      experience: "Years Experience",
    },
    form: {
      title: "Book Your Free Trial",
      student: "Student Name",
      parent: "Parent Name",
      email: "Email Address",
      whatsapp: "WhatsApp Number",
      selectCourse: "Select Course",
      submit: "Schedule Free Trial",
    },
    courses: {
      title: "Our Programs",
      heading: "Explore Our Courses",
      description: "We provide authentic Islamic education through qualified male and female teachers with flexible timings for students worldwide.",
      learnMore: "Learn More",
      list: {
        qaida: { title: "Noorani Qaida", desc: "Learn Arabic letters and correct pronunciation from the beginning." },
        reading: { title: "Quran Reading", desc: "Read the Holy Quran fluently with proper guidance." },
        tajweed: { title: "Tajweed", desc: "Master the rules of Tajweed with experienced teachers." },
        hifz: { title: "Hifz-ul-Quran", desc: "Memorize the Holy Quran through structured daily lessons." },
        tafseer: { title: "Translation & Tafseer", desc: "Understand the meanings and message of the Holy Quran." },
        arabic: { title: "Arabic Language", desc: "Learn Modern & Classical Arabic for Quran understanding." }
      }
    },
    learningProcess: {
      subtitle: "Simple Admission Process",
      titleFirst: "Start Quran Classes",
      titleSecond: "in Four Easy Steps",
      description: "Our admission process is simple, quick and designed for families living in different countries and time zones.",
      cta: "Start with a Free Trial",
      steps: {
        step1: { title: "Send Your Details", desc: "Complete the free trial form or contact our admission team through WhatsApp." },
        step2: { title: "Choose Your Teacher", desc: "Select a qualified male or female Quran teacher according to your preference." },
        step3: { title: "Attend Free Trial", desc: "Join a one-to-one trial class and experience our teaching method before admission." },
        step4: { title: "Start Learning", desc: "Choose a suitable schedule and begin your regular online Quran classes." }
      }
    }
  },

  ur: {
    languageName: "اردو",
    topBar: {
      message: "قرآن کی روشنی سے دلوں کو منور کرنا",
    },
    nav: {
      home: "صفحۂ اول",
      about: "ہمارے بارے میں",
      courses: "کورسز",
      teachers: "اساتذہ",
      admissions: "داخلہ",
      reviews: "تاثرات",
      contact: "رابطہ",
      trial: "مفت آزمائشی کلاس",
    },
    hero: {
      welcome: "مقصدِ قرآن اکیڈمی میں خوش آمدید",
      titleFirst: "قرآن آن لائن سیکھیں",
      titleSecond: "اعلیٰ معیار کے ساتھ",
      description:
        "دنیا بھر کے بچوں اور بڑوں کے لیے براہِ راست انفرادی قرآن کلاسز۔",
      trial: "مفت آزمائشی کلاس",
      courses: "کورسز دیکھیں",
    },
    stats: {
      students: "طلبہ",
      courses: "کورسز",
      countries: "ممالک",
      experience: "سالہ تجربہ",
    },
    form: {
      title: "مفت آزمائشی کلاس بُک کریں",
      student: "طالب علم کا نام",
      parent: "والد یا والدہ کا نام",
      email: "ای میل ایڈریس",
      whatsapp: "واٹس ایپ نمبر",
      selectCourse: "کورس منتخب کریں",
      submit: "آزمائشی کلاس مقرر کریں",
    },
    courses: {
      title: "ہمارے پروگرام",
      heading: "ہمارے کورسز دیکھیں",
      description: "ہم دنیا بھر کے طلباء کے لیے لچکدار اوقات کے ساتھ مستند اسلامی تعلیم فراہم کرتے ہیں۔",
      learnMore: "مزید جانیے",
      list: {
        qaida: { title: "نورانی قاعدہ", desc: "عربی حروف اور صحیح تلفظ شروع سے سیکھیں۔" },
        reading: { title: "ناظرہ قرآن", desc: "مناسب رہنمائی کے ساتھ روانی سے قرآن مجید پڑھیں۔" },
        tajweed: { title: "تجوید", desc: "تجربہ کار اساتذہ کے ساتھ تجوید کے اصول سیکھیں۔" },
        hifz: { title: "حفظ قرآن", desc: "روزانہ کے اسباق کے ذریعے قرآن مجید حفظ کریں۔" },
        tafseer: { title: "ترجمہ و تفسیر", desc: "قرآن مجید کے معانی اور پیغام کو سمجھیں۔" },
        arabic: { title: "عربی زبان", desc: "قرآن فہمی کے لیے جدید اور کلاسیکی عربی سیکھیں۔" }
      }
    },
    learningProcess: {
      subtitle: "داخلے کا آسان طریقہ",
      titleFirst: "قرآن کلاسز شروع کریں",
      titleSecond: "چار آسان مراحل میں",
      description: "ہمارا داخلے کا طریقہ کار بہت آسان ہے، خاص طور پر مختلف ممالک میں رہنے والے خاندانوں کے لیے۔",
      cta: "مفت آزمائشی کلاس سے شروع کریں",
      steps: {
        step1: { title: "تفصیلات بھیجیں", desc: "فارم پُر کریں یا واٹس ایپ کے ذریعے ہماری ٹیم سے رابطہ کریں۔" },
        step2: { title: "استاد کا انتخاب", desc: "اپنی ترجیح کے مطابق مرد یا خاتون استاد کا انتخاب کریں۔" },
        step3: { title: "آزمائشی کلاس", desc: "داخلے سے پہلے ایک آزمائشی کلاس میں شرکت کریں۔" },
        step4: { title: "سیکھنا شروع کریں", desc: "مناسب وقت کا انتخاب کریں اور باقاعدہ کلاسز شروع کریں۔" }
      }
    }
  },

  ar: {
    languageName: "العربية",
    topBar: {
      message: "إضاءة القلوب بنور القرآن",
    },
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      courses: "الدورات",
      teachers: "المعلمون",
      admissions: "التسجيل",
      reviews: "الآراء",
      contact: "اتصل بنا",
      trial: "حصة تجريبية مجانية",
    },
    hero: {
      welcome: "مرحباً بكم في أكاديمية مقصد القرآن",
      titleFirst: "تعلم القرآن عبر الإنترنت",
      titleSecond: "بتميز وإتقان",
      description:
        "دروس قرآن فردية مباشرة للأطفال والكبار في جميع أنحاء العالم.",
      trial: "احجز حصة مجانية",
      courses: "استكشف الدورات",
    },
    stats: {
      students: "الطلاب",
      courses: "الدورات",
      countries: "الدول",
      experience: "سنوات الخبرة",
    },
    form: {
      title: "احجز حصتك التجريبية",
      student: "اسم الطالب",
      parent: "اسم ولي الأمر",
      email: "البريد الإلكتروني",
      whatsapp: "رقم واتساب",
      selectCourse: "اختر الدورة",
      submit: "احجز الحصة المجانية",
    },
    courses: {
      title: "برامجنا",
      heading: "استكشف دوراتنا",
      description: "نقدم تعليماً إسلامياً أصيلاً من خلال معلمين ومعلمات مؤهلين بأوقات مرنة للطلاب حول العالم.",
      learnMore: "اعرف المزيد",
      list: {
        qaida: { title: "القاعدة النورانية", desc: "تعلم الحروف العربية والنطق الصحيح من البداية." },
        reading: { title: "تلاوة القرآن", desc: "اقرأ القرآن الكريم بطلاقة مع التوجيه الصحيح." },
        tajweed: { title: "التجويد", desc: "أتقن أحكام التجويد مع معلمين ذوي خبرة." },
        hifz: { title: "حفظ القرآن", desc: "احفظ القرآن الكريم من خلال دروس يومية منظمة." },
        tafseer: { title: "الترجمة والتفسير", desc: "افهم معاني ورسالة القرآن الكريم." },
        arabic: { title: "اللغة العربية", desc: "تعلم العربية الحديثة والكلاسيكية لفهم القرآن." }
      }
    },
    learningProcess: {
      subtitle: "عملية تسجيل بسيطة",
      titleFirst: "ابدأ دروس القرآن",
      titleSecond: "في أربع خطوات سهلة",
      description: "عملية القبول لدينا بسيطة وسريعة ومصممة للعائلات التي تعيش في بلدان ومناطق زمنية مختلفة.",
      cta: "ابدأ بحصة تجريبية مجانية",
      steps: {
        step1: { title: "أرسل بياناتك", desc: "أكمل نموذج الحصة المجانية أو تواصل مع فريقنا عبر الواتساب." },
        step2: { title: "اختر معلمك", desc: "اختر معلماً أو معلمة قرآن مؤهلين حسب تفضيلك." },
        step3: { title: "احضر الحصة التجريبية", desc: "انضم إلى حصة تجريبية فردية وجرب طريقة تدريسنا." },
        step4: { title: "ابدأ التعلم", desc: "اختر جدولاً مناسباً وابدأ فصولك المنتظمة." }
      }
    }
  },

  fa: {
    languageName: "فارسی",
    topBar: {
      message: "روشن ساختن دل‌ها با نور قرآن",
    },
    nav: {
      home: "خانه",
      about: "درباره ما",
      courses: "دوره‌ها",
      teachers: "اساتید",
      admissions: "ثبت‌نام",
      reviews: "نظرات",
      contact: "تماس",
      trial: "کلاس آزمایشی رایگان",
    },
    hero: {
      welcome: "به آکادمی مقصد قرآن خوش آمدید",
      titleFirst: "قرآن را آنلاین بیاموزید",
      titleSecond: "با کیفیت و برتری",
      description:
        "کلاس‌های خصوصی و زنده قرآن برای کودکان و بزرگسالان در سراسر جهان.",
      trial: "رزرو کلاس رایگان",
      courses: "مشاهده دوره‌ها",
    },
    stats: {
      students: "دانش‌آموزان",
      courses: "دوره‌ها",
      countries: "کشورها",
      experience: "سال تجربه",
    },
    form: {
      title: "کلاس آزمایشی رایگان رزرو کنید",
      student: "نام دانش‌آموز",
      parent: "نام والدین",
      email: "آدرس ایمیل",
      whatsapp: "شماره واتساپ",
      selectCourse: "انتخاب دوره",
      submit: "رزرو کلاس آزمایشی",
    },
    courses: {
      title: "برنامه‌های ما",
      heading: "دوره‌های ما را کاوش کنید",
      description: "ما آموزش معتبر اسلامی را توسط اساتید مجرب آقا و خانم با زمان‌بندی منعطف برای دانش‌آموزان سراسر جهان ارائه می‌دهیم.",
      learnMore: "اطلاعات بیشتر",
      list: {
        qaida: { title: "قاعده نورانی", desc: "حروف عربی و تلفظ صحیح را از پایه بیاموزید." },
        reading: { title: "روخوانی قرآن", desc: "قرآن کریم را روان و با راهنمایی صحیح بخوانید." },
        tajweed: { title: "تجوید", desc: "قواعد تجوید را با اساتید باتجربه مسلط شوید." },
        hifz: { title: "حفظ قرآن", desc: "قرآن کریم را از طریق دروس روزانه ساختاریافته حفظ کنید." },
        tafseer: { title: "ترجمه و تفسیر", desc: "معانی و پیام قرآن کریم را درک کنید." },
        arabic: { title: "زبان عربی", desc: "عربی مدرن و کلاسیک را برای درک قرآن بیاموزید." }
      }
    },
    learningProcess: {
      subtitle: "فرآیند ثبت‌نام ساده",
      titleFirst: "کلاس‌های قرآن را شروع کنید",
      titleSecond: "در چهار مرحله آسان",
      description: "فرآیند پذیرش ما ساده، سریع و طراحی شده برای خانواده‌هایی است که در کشورها و مناطق زمانی مختلف زندگی می‌کنند.",
      cta: "شروع با یک کلاس آزمایشی",
      steps: {
        step1: { title: "جزئیات خود را ارسال کنید", desc: "فرم کلاس آزمایشی را تکمیل کنید یا از طریق واتساپ با ما تماس بگیرید." },
        step2: { title: "استاد خود را انتخاب کنید", desc: "یک استاد مجرب آقا یا خانم را با توجه به ترجیح خود انتخاب کنید." },
        step3: { title: "شرکت در کلاس آزمایشی", desc: "در یک کلاس خصوصی آزمایشی شرکت کنید تا با روش تدریس ما آشنا شوید." },
        step4: { title: "شروع یادگیری", desc: "یک زمان‌بندی مناسب انتخاب کنید و کلاس‌های منظم خود را شروع کنید." }
      }
    }
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