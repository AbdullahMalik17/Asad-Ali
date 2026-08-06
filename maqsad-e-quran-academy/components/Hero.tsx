"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, Star, ArrowRight } from "lucide-react";
import Stats from "./Stats";
import TrialForm from "./TrialForm";
import { useLanguage } from "./LanguageProvider";

export default function Hero() {
  const { t } = useLanguage();

  const badges = [
    t("hero.badge1") || "Male & Female Tutors",
    t("hero.badge2") || "1-on-1 Personalized Classes",
    t("hero.badge3") || "Flexible Timings 24/7",
  ];

  return (
    <section className="relative overflow-hidden bg-emerald-950 text-white">
      {/* Multi-layered Glowing Mesh Orbs & Decorative Lighting */}
      <div className="absolute top-0 -left-40 w-[42rem] h-[42rem] bg-emerald-600/35 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-[42rem] h-[42rem] bg-amber-500/25 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55rem] h-[55rem] bg-teal-400/10 rounded-full blur-[160px] pointer-events-none" />
      
      {/* Decorative Radial Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.06)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Glowing Pill Badge */}
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 px-4 py-1.5 text-xs sm:text-sm font-black text-emerald-950 shadow-[0_0_25px_rgba(251,191,36,0.45)] ring-2 ring-amber-300/80 hover:scale-105 transition-transform duration-300"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-950 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-950"></span>
            </span>
            <Sparkles size={14} className="text-emerald-950" />
            {t("hero.welcome")}
          </motion.span>

          {/* Heading with Metallic Gold Gradient */}
          <h1 className="mt-4 text-3xl font-black tracking-tight leading-tight text-white sm:text-5xl lg:text-6xl">
            {t("hero.titleFirst")}{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 drop-shadow-[0_4px_12px_rgba(251,191,36,0.3)]">
              {t("hero.titleSecond")}
            </span>
          </h1>

          <p className="mt-4 text-base leading-relaxed text-emerald-100/90 font-medium sm:text-lg">
            {t("hero.description")}
          </p>

          {/* Quick Features List */}
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-xl border border-emerald-500/30 bg-emerald-900/50 px-3 py-1 text-xs font-semibold text-emerald-200 backdrop-blur-md">
              {t("hero.badge1")}
            </span>
            <span className="rounded-xl border border-emerald-500/30 bg-emerald-900/50 px-3 py-1 text-xs font-semibold text-emerald-200 backdrop-blur-md">
              {t("hero.badge2")}
            </span>
            <span className="rounded-xl border border-emerald-500/30 bg-emerald-900/50 px-3 py-1 text-xs font-semibold text-emerald-200 backdrop-blur-md">
              {t("hero.badge3")}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#admissions"
              aria-label="Book a free 3-day trial Quran class"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-7 py-3.5 font-extrabold text-emerald-950 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(251,191,36,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>{t("hero.trial")}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              </span>
            </a>

            <a
              href="#courses"
              aria-label="Explore our online Quran courses"
              className="rounded-2xl border border-emerald-400/40 bg-emerald-900/40 backdrop-blur-md px-7 py-3.5 font-bold text-white transition-all duration-300 hover:border-amber-400/70 hover:bg-emerald-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
            >
              {t("hero.courses")}
            </a>
          </div>

          <div className="mt-8">
            <Stats />
          </div>

          {/* Trust Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 flex items-center gap-3 text-emerald-50/90 text-xs sm:text-sm font-medium bg-emerald-900/40 p-2.5 pr-5 rounded-2xl w-fit backdrop-blur-md border border-emerald-500/20"
          >
            <div className="flex -space-x-2.5">
              <div className="w-8 h-8 rounded-full border-2 border-emerald-950 bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center font-bold text-[10px] text-white shadow-lg">US</div>
              <div className="w-8 h-8 rounded-full border-2 border-emerald-950 bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-bold text-[10px] text-white shadow-lg">UK</div>
              <div className="w-8 h-8 rounded-full border-2 border-emerald-950 bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center font-bold text-[10px] text-white shadow-lg">CA</div>
            </div>
            <div>
              <div className="flex text-amber-400 text-sm drop-shadow-sm" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <p className="text-xs sm:text-sm font-medium">{t("hero.trustText")}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Dynamic Form Card with Glassmorphism Elevation */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/40 p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all duration-500 hover:shadow-[0_30px_70px_-15px_rgba(16,185,129,0.3)] hover:border-amber-400/40"
        >
          {/* Top Gold Shimmer Border Highlight */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />
          
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="mb-4 flex justify-center drop-shadow-xl"
          >
            <Image
              src="/logo.png"
              alt="Maqsad-e-Quran Academy Official Crest Logo"
              width={200}
              height={110}
              priority
              className="h-auto w-auto object-contain filter drop-shadow-md"
            />
          </motion.div>

          <TrialForm />
        </motion.div>
      </div>
    </section>
  );
}