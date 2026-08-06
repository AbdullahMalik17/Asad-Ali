"use client";

import { motion } from "framer-motion";
import {
  BookOpenCheck,
  Clock3,
  Globe2,
  GraduationCap,
  Sparkles,
  Users,
  Award,
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function About() {
  const { t } = useLanguage();

  const features = [
    {
      icon: BookOpenCheck,
      text: t("hero.badge2"),
    },
    {
      icon: Users,
      text: t("hero.badge1"),
    },
    {
      icon: Clock3,
      text: t("hero.badge3"),
    },
    {
      icon: Globe2,
      text: t("about.studentsLabel"),
    },
    {
      icon: GraduationCap,
      text: t("form.guarantee1"),
    },
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/20 to-white py-16 sm:py-24">
      {/* Decorative Light Orbs */}
      <div className="absolute top-10 -left-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-100/70 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-emerald-800 backdrop-blur-md shadow-sm">
              <Sparkles size={14} className="text-amber-500" />
              {t("about.subtitle")}
            </span>

            <h2 className="mt-3 text-3xl font-black leading-tight text-emerald-950 sm:text-4xl lg:text-5xl">
              {t("about.title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-700 to-amber-600">
                {t("about.highlight")}
              </span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
              {t("about.desc1")}
            </p>

            <p className="mt-3 text-base leading-relaxed text-gray-600">
              {t("about.desc2")}
            </p>

            {/* Elevated Stats Cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <motion.div 
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-white/80 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-amber-400 hover:shadow-xl hover:shadow-emerald-950/5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-black text-emerald-800 group-hover:text-amber-600 transition-colors">
                    {t("about.teachersStat")}
                  </p>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100/80 text-emerald-800 group-hover:bg-amber-400 group-hover:text-emerald-950 transition-all duration-300">
                    <Award size={20} />
                  </div>
                </div>
                <p className="mt-2 text-xs sm:text-sm font-bold text-gray-700">
                  {t("about.teachersLabel")}
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-white/80 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-amber-400 hover:shadow-xl hover:shadow-emerald-950/5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-black text-emerald-800 group-hover:text-amber-600 transition-colors">
                    {t("about.studentsStat")}
                  </p>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100/80 text-emerald-800 group-hover:bg-amber-400 group-hover:text-emerald-950 transition-all duration-300">
                    <Globe2 size={20} />
                  </div>
                </div>
                <p className="mt-2 text-xs sm:text-sm font-bold text-gray-700">
                  {t("about.studentsLabel")}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side Glassmorphic Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="group relative overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 p-7 text-white shadow-[0_20px_50px_-10px_rgba(16,185,129,0.3)] backdrop-blur-xl sm:p-10 transition-all duration-500 hover:border-amber-400/60 hover:shadow-[0_25px_60px_-10px_rgba(251,191,36,0.25)]"
          >
            {/* Ambient inner card glow */}
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-400/15 blur-2xl pointer-events-none" />

            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-1 text-xs font-black uppercase tracking-[0.2em] text-amber-300">
              {t("about.missionTitle")}
            </span>

            <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl">
              {t("about.missionHeading")}
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-emerald-100/90 sm:text-base">
              {t("about.missionDesc")}
            </p>

            <div className="mt-6 space-y-3">
              {features.map((feature, idx) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center gap-3.5 rounded-xl border border-white/5 bg-white/5 p-2.5 px-3.5 transition-all duration-300 hover:bg-white/10 hover:border-amber-400/30"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-emerald-950 shadow-[0_0_12px_rgba(251,191,36,0.4)]">
                      <Icon size={18} strokeWidth={2.2} />
                    </div>

                    <p className="text-sm font-bold text-emerald-50 sm:text-base">
                      {feature.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}