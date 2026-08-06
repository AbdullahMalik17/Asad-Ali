"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { BookOpen, BookText, Mic, Brain, Languages, PenTool, ArrowRight } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import CourseModal from "./CourseModal";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] } },
};

export default function Courses() {
  const { t } = useLanguage();
  const [activeCourseModal, setActiveCourseModal] = useState<string | null>(null);

  const handleBookTrialFromModal = (_courseTitle: string) => {
    const admissionsSection = document.getElementById("admissions");
    if (admissionsSection) {
      admissionsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const courses = [
    {
      id: "qaida",
      title: t("courses.list.qaida.title"),
      level: "Beginner",
      description: t("courses.list.qaida.desc"),
      icon: BookOpen,
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
    {
      id: "reading",
      title: t("courses.list.reading.title"),
      level: "Intermediate",
      description: t("courses.list.reading.desc"),
      icon: BookText,
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    },
    {
      id: "tajweed",
      title: t("courses.list.tajweed.title"),
      level: "All Levels",
      description: t("courses.list.tajweed.desc"),
      icon: Mic,
      badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
    },
    {
      id: "hifz",
      title: t("courses.list.hifz.title"),
      level: "Advanced",
      description: t("courses.list.hifz.desc"),
      icon: Brain,
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    },
    {
      id: "tafseer",
      title: t("courses.list.tafseer.title"),
      level: "Intermediate",
      description: t("courses.list.tafseer.desc"),
      icon: Languages,
      badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    },
    {
      id: "arabic",
      title: t("courses.list.arabic.title"),
      level: "All Levels",
      description: t("courses.list.arabic.desc"),
      icon: PenTool,
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
    },
  ];

  return (
    <>
      <section className="relative py-12 sm:py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden" id="courses">
        {/* Soft background accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
          >
            <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-800 border border-emerald-200/60 shadow-sm">
              {t("courses.title")}
            </span>
            <h2 className="text-3xl font-black tracking-tight text-emerald-950 sm:text-4xl lg:text-5xl mt-2">
              {t("courses.heading")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
              {t("courses.description")}
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {courses.map((course) => {
              const Icon = course.icon;
              return (
                <motion.div
                  variants={itemVariants}
                  key={course.id}
                  className="group relative flex flex-col justify-between rounded-3xl border border-gray-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-900/10"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/80 text-emerald-800 shadow-inner group-hover:bg-emerald-800 group-hover:text-white transition-colors duration-300">
                        <Icon size={28} strokeWidth={2} />
                      </div>

                      <span className={`rounded-full border px-3 py-1 text-xs font-bold ${course.badgeColor}`}>
                        {course.level}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-emerald-950 group-hover:text-emerald-800 transition-colors">
                      {course.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      {course.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4">
                    <button
                      onClick={() => setActiveCourseModal(course.id)}
                      className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-900 transition-all duration-300 group-hover:bg-emerald-800 group-hover:text-white shadow-sm cursor-pointer"
                    >
                      <span>View Syllabus & Outline</span>
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <CourseModal
        courseId={activeCourseModal}
        onClose={() => setActiveCourseModal(null)}
        onBookTrial={handleBookTrialFromModal}
      />
    </>
  );
}