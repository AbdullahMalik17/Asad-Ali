"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type LanguageCode = "en" | "ur" | "ar" | "fa";

type TranslationValue = string | Record<string, TranslationValue>;

const translations: Record<
  LanguageCode,
  Record<string, TranslationValue>
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