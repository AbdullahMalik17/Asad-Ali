"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  BookOpenCheck,
  Mic2,
  ShieldCheck,
  BookHeart,
  Languages,
  Sparkles,
  Baby,
  GraduationCap,
  Clock,
  Users,
  ArrowRight,
  CheckCircle2,
  Layers,
  HeartHandshake,
} from "lucide-react";
import CourseModal from "./CourseModal";

type CategoryTab =
  | "all"
  | "kids"
  | "tajweed"
  | "hifz"
  | "sisters"
  | "adults";

interface ProgramItem {
  id: string;
  category: ("kids" | "tajweed" | "hifz" | "sisters" | "adults")[];
  title: string;
  arabicTitle: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  ageGroup: string;
  duration: string;
  description: string;
  syllabusHighlights: string[];
  icon: React.ElementType;
  featured?: boolean;
  tagColor: string;
}

const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: "qaida",
    category: ["kids"],
    title: "Noorani Qaida for Kids & Beginners",
    arabicTitle: "القَاعِدَة النُّورَانِيَّة",
    level: "Beginner",
    ageGroup: "Ages 4+",
    duration: "3-6 Months",
    description:
      "The foundational course teaching Arabic phonetics, correct Makharij (throat & tongue points), Harakaat, and compound word connection from zero.",
    syllabusHighlights: [
      "29 Arabic Letters & Individual Makharij",
      "Fatha, Kasra, Dammah & Tanween",
      "Sukoon, Shaddah, and Madd basics",
    ],
    icon: BookOpenCheck,
    featured: true,
    tagColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
  },
  {
    id: "reading",
    category: ["kids", "tajweed"],
    title: "Quran Reading (Nazra with Fluency)",
    arabicTitle: "نَاظِرَة القُرْآن الكَرِيم",
    level: "Intermediate",
    ageGroup: "All Ages",
    duration: "6-12 Months",
    description:
      "Structured reading of the Holy Quran from Surah Al-Fatiha to Surah An-Nas with smooth eye-to-voice coordination and rhythmic fluency.",
    syllabusHighlights: [
      "Fluent reading from Mus'haf directly",
      "Breath control and punctuation signs (Waqf)",
      "Daily practice with 1-on-1 teacher correction",
    ],
    icon: BookOpen,
    tagColor: "bg-amber-100 text-amber-900 border-amber-300",
  },
  {
    id: "tajweed",
    category: ["tajweed", "sisters", "adults"],
    title: "Tajweed-ul-Quran (Theoretical & Practical)",
    arabicTitle: "تَجْوِيد القُرْآن الكَرِيم",
    level: "All Levels",
    ageGroup: "Kids & Adults",
    duration: "4-8 Months",
    description:
      "Master the classical rules of Tajweed including Noon Sakinah, Meem Sakinah, Qalqalah, Ghunna, and Sifaat-ul-Huroof with certified Qaris.",
    syllabusHighlights: [
      "17 Makharij & Letter Characteristics (Sifaat)",
      "Rules of Noon Sakinah & Tanween (Idgham, Ikhfa, Izhar, Iqlab)",
      "6 Types of Madd (Lengthening) Precision",
    ],
    icon: Mic2,
    featured: true,
    tagColor: "bg-teal-100 text-teal-900 border-teal-300",
  },
  {
    id: "hifz",
    category: ["hifz"],
    title: "Hifz-ul-Quran (Full & Partial Memorization)",
    arabicTitle: "حِفْظ القُرْآن الكَرِيم",
    level: "Advanced",
    ageGroup: "Ages 6+",
    duration: "2-3 Years",
    description:
      "Systematic, time-tested 3-pillar memorization system: Sabaq (new lesson), Sabaqi (recent revision), and Manzil (cumulative retention).",
    syllabusHighlights: [
      "Daily 1-on-1 Sabaq testing with Hafiz Scholar",
      "Structured revision cycles preventing forgetting",
      "Tajweed retention and annual testing certificates",
    ],
    icon: ShieldCheck,
    featured: true,
    tagColor: "bg-purple-100 text-purple-900 border-purple-300",
  },
  {
    id: "sisters",
    category: ["sisters"],
    title: "Sisters Exclusive Quran & Tajweed Program",
    arabicTitle: "دَوْرَة التَّجْوِيد لِلأَخَوَات",
    level: "All Levels",
    ageGroup: "Females Only",
    duration: "Flexible",
    description:
      "100% private 1-on-1 classes conducted exclusively by certified female scholars (Alimahs and Hafizahs) in an empowering, comfortable environment.",
    syllabusHighlights: [
      "Dedicated Female Alimah certified by Wifaq",
      "Flexible daytime & evening slots for mothers & students",
      "Tajweed, Tafseer, and Daily Islamic Guidance",
    ],
    icon: HeartHandshake,
    featured: true,
    tagColor: "bg-rose-100 text-rose-900 border-rose-300",
  },
  {
    id: "tafseer",
    category: ["adults", "sisters"],
    title: "Translation & Tafseer-ul-Quran",
    arabicTitle: "تَرْجَمَة وَتَفْسِير القُرْآن",
    level: "Intermediate",
    ageGroup: "Teens & Adults",
    duration: "12-24 Months",
    description:
      "Connect deeply with the Divine message through word-by-word translation, historical revelation contexts (Asbab-an-Nuzul), and life application.",
    syllabusHighlights: [
      "Word-by-word Arabic root breakdown",
      "Classical Tafseer insights (Ibn Kathir, Jalalayn)",
      "Modern application and spiritual lessons",
    ],
    icon: BookHeart,
    tagColor: "bg-blue-100 text-blue-900 border-blue-300",
  },
  {
    id: "arabic",
    category: ["adults", "kids"],
    title: "Quranic & Conversational Arabic",
    arabicTitle: "اللُّغَة العَرَبِيَّة",
    level: "All Levels",
    ageGroup: "All Ages",
    duration: "6-12 Months",
    description:
      "Understand Quranic grammar (Nahw & Sarf) and speak conversational Arabic with native-style fluency using modern audio-visual lessons.",
    syllabusHighlights: [
      "80% of Quranic vocabulary frequency",
      "Essential Nahw (Syntax) and Sarf (Morphology)",
      "Daily dialogue and conversational phrases",
    ],
    icon: Languages,
    tagColor: "bg-indigo-100 text-indigo-900 border-indigo-300",
  },
  {
    id: "kids-islamic",
    category: ["kids"],
    title: "Kids Islamic Studies & Sunnah Manners",
    arabicTitle: "الدِّرَاسَات الإِسْلَامِيَّة لِلأَطْفَال",
    level: "Beginner",
    ageGroup: "Ages 4-14",
    duration: "Ongoing",
    description:
      "Engaging lessons on Salah, Daily Masnoon Duas, 40 Hadith for Children, Stories of the Prophets, and building Islamic character.",
    syllabusHighlights: [
      "Step-by-step Wudu and Salah with meanings",
      "Daily Duas (sleeping, eating, entering home, etc.)",
      "Inspiring Stories from Seerah of Prophet Muhammad ﷺ",
    ],
    icon: Baby,
    tagColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
  },
];

const TABS: { id: CategoryTab; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "All Programs", icon: Layers },
  { id: "kids", label: "Kids & Beginners", icon: Baby },
  { id: "tajweed", label: "Tajweed & Nazra", icon: Mic2 },
  { id: "hifz", label: "Hifz-ul-Quran", icon: ShieldCheck },
  { id: "sisters", label: "Sisters Only", icon: GraduationCap },
  { id: "adults", label: "Adults & Islamic Studies", icon: BookHeart },
];

export default function ProgramsBento() {
  const [activeTab, setActiveTab] = useState<CategoryTab>("all");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const filteredPrograms = useMemo(() => {
    if (activeTab === "all") return PROGRAMS_DATA;
    return PROGRAMS_DATA.filter((p) => p.category.includes(activeTab));
  }, [activeTab]);

  return (
    <section
      className="relative py-16 sm:py-24 bg-gradient-to-b from-[#fbf9f4] via-white to-[#fbf9f4] overflow-hidden"
      id="programs"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-100/80 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-emerald-900 shadow-sm">
            <Sparkles size={14} className="text-emerald-700" />
            Curriculum & Programs
          </span>

          <h2 className="mt-3 text-3xl font-black text-emerald-950 sm:text-4xl lg:text-5xl tracking-tight">
            Comprehensive Online{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
              Quranic Education
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Tailored 1-on-1 courses taught by verified male and female scholars
            with customized pacing for students across the globe.
          </p>
        </div>

        {/* 21st-Style Segmented Category Tabs with Framer Motion layoutId */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-emerald-950/5 rounded-2xl max-w-4xl mx-auto mb-12 border border-emerald-950/10">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "text-emerald-950 font-black"
                    : "text-slate-600 hover:text-emerald-900"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProgramTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-md border border-emerald-200"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon size={16} className={isActive ? "text-amber-600" : "text-slate-500"} />
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Bento Grid Architecture */}
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredPrograms.map((program) => {
              const Icon = program.icon;

              return (
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  key={program.id}
                  className={`group relative flex flex-col justify-between rounded-3xl border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-950/10 ${
                    program.featured
                      ? "border-amber-300/80 ring-1 ring-amber-400/30"
                      : "border-slate-200/90 hover:border-emerald-400"
                  }`}
                >
                  {/* Top Gilded Border on Hover */}
                  <div className="absolute top-0 inset-x-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Top Badges & Icon */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/90 text-emerald-900 shadow-inner group-hover:bg-emerald-950 group-hover:text-amber-300 transition-all duration-300 group-hover:scale-105">
                        <Icon size={28} strokeWidth={2} />
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-black ${program.tagColor}`}>
                          {program.level}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                          <span className="flex items-center gap-0.5">
                            <Users size={11} className="text-emerald-700" />
                            {program.ageGroup}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5">
                            <Clock size={11} className="text-amber-600" />
                            {program.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Title & Arabic Script */}
                    <h3 className="text-xl font-black text-emerald-950 group-hover:text-emerald-900 transition-colors">
                      {program.title}
                    </h3>
                    <p className="font-arabic text-lg text-amber-700 font-bold mt-0.5">
                      {program.arabicTitle}
                    </p>

                    {/* Description */}
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {program.description}
                    </p>

                    {/* Syllabus Highlights Bullets */}
                    <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                      {program.syllabusHighlights.map((point, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCourseId(program.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-50 text-emerald-950 text-xs font-bold transition-all duration-200 hover:bg-emerald-950 hover:text-white cursor-pointer"
                    >
                      <span>View Syllabus</span>
                      <ArrowRight size={14} />
                    </button>

                    <a
                      href="#admissions"
                      className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 text-xs font-black shadow-sm hover:scale-105 transition-transform"
                    >
                      Book Trial
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA Strip */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 pr-6 rounded-3xl bg-emerald-950 text-white shadow-xl border border-amber-400/30">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-emerald-950 font-black text-lg">
                3
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white">Not sure which program fits your child best?</p>
                <p className="text-xs text-emerald-200/90">Take our free 1-on-1 live evaluation with a certified teacher.</p>
              </div>
            </div>
            <a
              href="#admissions"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3 text-xs sm:text-sm font-black text-emerald-950 shadow-gold-glow hover:scale-105 transition-transform shrink-0"
            >
              <span>Book Free Live Evaluation</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Course Details Modal */}
      <CourseModal
        courseId={selectedCourseId}
        onClose={() => setSelectedCourseId(null)}
        onBookTrial={() => {
          setSelectedCourseId(null);
          const el = document.getElementById("admissions");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </section>
  );
}
