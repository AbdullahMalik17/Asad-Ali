"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Stats from "./Stats";
import TrialForm from "./TrialForm";
import { useLanguage } from "./LanguageProvider";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-emerald-950">
      {/* Premium Mesh Gradient Orbs */}
      <div className="absolute top-0 -left-40 w-[40rem] h-[40rem] bg-emerald-600/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-[40rem] h-[40rem] bg-amber-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-green-400/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" /> {/* Optional noise texture if image exists, degrades gracefully if not */}

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-1.5 text-xs sm:text-sm font-extrabold text-emerald-950 shadow-[0_0_25px_rgba(251,191,36,0.35)] ring-2 ring-amber-300/60"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-950 animate-ping"></span>
            {t("hero.welcome")}
          </motion.span>

          <h1 className="mt-4 text-3xl font-black tracking-tight leading-tight text-white sm:text-5xl lg:text-6xl">
            {t("hero.titleFirst")}{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 drop-shadow-md">
              {t("hero.titleSecond")}
            </span>
          </h1>

          <p className="mt-4 text-base leading-relaxed text-emerald-100/90 font-medium sm:text-lg">
            {t("hero.description")}
          </p>

          {/* Quick Features List */}
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-xl border border-emerald-500/30 bg-emerald-900/50 px-3 py-1 text-xs font-semibold text-emerald-200 backdrop-blur-md">
              ✓ Male & Female Tutors
            </span>
            <span className="rounded-xl border border-emerald-500/30 bg-emerald-900/50 px-3 py-1 text-xs font-semibold text-emerald-200 backdrop-blur-md">
              ✓ 1-on-1 Personalized Classes
            </span>
            <span className="rounded-xl border border-emerald-500/30 bg-emerald-900/50 px-3 py-1 text-xs font-semibold text-emerald-200 backdrop-blur-md">
              ✓ Flexible Timings 24/7
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#admissions"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-7 py-3.5 font-extrabold text-emerald-950 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(251,191,36,0.45)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>{t("hero.trial")}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </a>

            <a
              href="#courses"
              className="rounded-2xl border border-emerald-400/40 bg-emerald-900/40 backdrop-blur-md px-7 py-3.5 font-bold text-white transition-all duration-300 hover:border-amber-400/70 hover:bg-emerald-800/60"
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
              <div className="flex text-amber-400 text-sm drop-shadow-sm">
                ★★★★★
              </div>
              <p>Trusted by <span className="text-white font-bold">500+</span> students globally</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle reflection on the form card */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="mb-4 flex justify-center drop-shadow-lg"
          >
            <Image
              src="/logo.png"
              alt="Maqsad-e-Quran Academy"
              width={200}
              height={110}
              priority
              className="h-auto w-auto object-contain"
            />
          </motion.div>

          <TrialForm />
        </motion.div>
      </div>
    </section>
  );
}