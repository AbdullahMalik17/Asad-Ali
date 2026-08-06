"use client";

import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Clock3,
  Globe2,
  GraduationCap,
  Languages,
  Star,
  UserRound,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const teacherGroups = [
  {
    name: "Qualified Male Tutors",
    role: "Quran, Tajweed, Hifz & Tafseer Teachers",
    experience: "Experienced and certified faculty",
    languages: "English, Urdu, Arabic and more",
    total: "30+ Male Teachers",
    icon: UserRound,
  },
  {
    name: "Qualified Female Tutors",
    role: "Specialist Teachers for Sisters and Children",
    experience: "Experienced and certified faculty",
    languages: "English, Urdu, Arabic and more",
    total: "20+ Female Teachers",
    icon: GraduationCap,
  },
  {
    name: "Tajweed & Hifz Specialists",
    role: "Makharij, Tajweed and Memorisation Experts",
    experience: "Individual correction and lesson plans",
    languages: "Arabic, English and Urdu",
    total: "Specialist Tutors",
    icon: BookOpen,
  },
];

const facultyStats = [
  {
    icon: Users,
    value: "50+",
    label: "Qualified Teachers",
  },
  {
    icon: Globe2,
    value: "Worldwide",
    label: "Online Availability",
  },
  {
    icon: Clock3,
    value: "24/7",
    label: "Flexible Scheduling",
  },
  {
    icon: Award,
    value: "1-to-1",
    label: "Personal Classes",
  },
];

import { useLanguage } from "./LanguageProvider";

export default function Teachers() {
  const { t } = useLanguage();

  return (
    <section
      id="teachers"
      className="relative overflow-hidden bg-emerald-950 py-16 sm:py-24 text-white"
    >
      {/* Decorative background lights */}
      <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-amber-400/15 blur-[130px] pointer-events-none" />
      <div className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-emerald-400/15 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.05)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-amber-300 backdrop-blur-md shadow-sm">
            <Sparkles size={14} className="text-amber-400" />
            {t("teachers.subtitle")}
          </span>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl">
            {t("teachers.title")}{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 drop-shadow-[0_4px_12px_rgba(251,191,36,0.3)]">
              {t("teachers.highlight")}
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-emerald-100/90 font-medium sm:text-lg">
            {t("teachers.description")}
          </p>
        </motion.div>

        {/* Teacher Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teacherGroups.map((teacher, idx) => {
            const Icon = teacher.icon;

            return (
              <motion.article
                key={teacher.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-amber-400/70 hover:bg-white/15 hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.35)] flex flex-col justify-between"
              >
                {/* Top border accent line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 text-emerald-950 shadow-[0_0_20px_rgba(251,191,36,0.45)] transition-transform duration-300 group-hover:scale-110">
                    <Icon size={32} strokeWidth={2} />
                  </div>

                  <h3 className="mt-5 text-xl font-black text-white group-hover:text-amber-300 transition-colors">{teacher.name}</h3>

                  <p className="mt-1 text-xs font-bold text-amber-300 sm:text-sm">
                    {teacher.role}
                  </p>

                  <div className="mt-6 space-y-3 text-xs sm:text-sm text-emerald-50">
                    <div className="flex items-start gap-2.5 rounded-xl bg-white/5 p-2 px-3 border border-white/5">
                      <Award
                        size={18}
                        className="mt-0.5 shrink-0 text-amber-400"
                      />
                      <span className="font-medium text-emerald-100/90">{teacher.experience}</span>
                    </div>

                    <div className="flex items-start gap-2.5 rounded-xl bg-white/5 p-2 px-3 border border-white/5">
                      <Languages
                        size={18}
                        className="mt-0.5 shrink-0 text-amber-400"
                      />
                      <span className="font-medium text-emerald-100/90">{teacher.languages}</span>
                    </div>

                    <div className="flex items-start gap-2.5 rounded-xl bg-white/5 p-2 px-3 border border-white/5">
                      <Star
                        size={18}
                        className="mt-0.5 shrink-0 text-amber-400 fill-amber-400"
                      />
                      <span className="font-bold text-amber-300">{teacher.total}</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/923301676985?text=Assalamualaikum%2C%20I%20want%20to%20book%20a%20free%20trial%20class."
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Book a free trial class with ${teacher.name}`}
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 px-5 py-3.5 font-black text-emerald-950 text-sm shadow-[0_8px_20px_-5px_rgba(251,191,36,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_25px_-5px_rgba(251,191,36,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
                >
                  <span>Book a Free Trial</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </motion.article>
            );
          })}
        </div>

        {/* Statistics Glass Cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facultyStats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="group rounded-3xl border border-amber-400/30 bg-white/10 p-5 text-center backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-amber-400 hover:bg-white/15"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-emerald-950 shadow-[0_0_15px_rgba(251,191,36,0.4)] group-hover:scale-110 transition-transform">
                  <Icon size={24} strokeWidth={2.2} aria-hidden="true" />
                </div>

                <p className="mt-3 text-3xl font-black text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs sm:text-sm font-bold text-emerald-100">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom statement */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-10 max-w-4xl rounded-3xl border border-amber-400/20 bg-white/5 p-6 text-center backdrop-blur-md"
        >
          <p className="text-sm leading-relaxed text-emerald-100/90 font-medium sm:text-base">
            Students can choose male or female tutors according to their
            preference. Classes are available for children, adults, beginners
            and advanced learners with flexible timings in different time
            zones.
          </p>
        </motion.div>
      </div>
    </section>
  );
}