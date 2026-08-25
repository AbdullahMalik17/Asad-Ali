"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  Users,
  BookOpen,
  Globe2,
  Award,
  ArrowRight,
  ShieldCheck,
  Star,
} from "lucide-react";
import TrialBookingForm from "./TrialBookingForm";
import { useLanguage } from "./LanguageProvider";

export default function HeroSection() {
  const { t } = useLanguage();

  const statItems = [
    {
      value: "5,000+",
      label: "Students Guided",
      sublabel: "Across 35+ Countries",
      icon: Users,
    },
    {
      value: "10+",
      label: "Specialized Programs",
      sublabel: "Qaida to Ijazah",
      icon: BookOpen,
    },
    {
      value: "50+",
      label: "Certified Scholars",
      sublabel: "Male & Female Faculty",
      icon: Award,
    },
    {
      value: "15+",
      label: "Years of Trust",
      sublabel: "Al-Azhar & Wifaq",
      icon: Globe2,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-islamic-pattern text-white py-12 lg:py-20" id="home">
      {/* Multi-layered Glowing Sacred Orbs */}
      <div className="absolute top-0 -left-40 w-[45rem] h-[45rem] bg-emerald-600/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-[45rem] h-[45rem] bg-amber-500/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-teal-500/10 rounded-full blur-[170px] pointer-events-none" />

      {/* Decorative Radial Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.07)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          
          {/* Left Column: Faith, Heritage & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Trust Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 px-4 py-1.5 text-xs sm:text-sm font-black text-emerald-950 shadow-gold-glow ring-2 ring-amber-300/80"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-950 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-950"></span>
              </span>
              <Sparkles size={14} className="text-emerald-950" />
              <span>5,000+ Students Guided Worldwide across 35+ Countries</span>
            </motion.div>

            {/* Arabic Quranic Ayah Banner */}
            <div className="border-l-2 border-amber-400/80 pl-4 py-1">
              <p className="font-arabic text-xl sm:text-2xl text-amber-300 font-bold tracking-wide">
                وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا
              </p>
              <p className="text-[11px] sm:text-xs text-emerald-200/90 font-medium italic mt-0.5">
                &ldquo;And recite the Quran with measured, beautiful recitation.&rdquo; (Surah Al-Muzzammil: 4)
              </p>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.12]">
              Learn the Holy Quran Online with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 drop-shadow-[0_4px_16px_rgba(251,191,36,0.35)]">
                Authentic Tajweed & Certified Scholars
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-emerald-100/90 font-normal leading-relaxed max-w-2xl">
              1-on-1 personalized Quran & Islamic studies classes for children, sisters, and adults globally. Guided by verified male & female scholars from Al-Azhar and Wifaq-ul-Madaris at your flexible time.
            </p>

            {/* Key Value Badges */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <div className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-900/60 px-3.5 py-1.5 text-xs font-semibold text-emerald-200 backdrop-blur-md">
                <CheckCircle2 size={14} className="text-amber-400" />
                <span>Dedicated Male & Female Tutors</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-900/60 px-3.5 py-1.5 text-xs font-semibold text-emerald-200 backdrop-blur-md">
                <CheckCircle2 size={14} className="text-amber-400" />
                <span>1-on-1 Live Interactive Sessions</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-900/60 px-3.5 py-1.5 text-xs font-semibold text-emerald-200 backdrop-blur-md">
                <CheckCircle2 size={14} className="text-amber-400" />
                <span>24/7 Flexible Global Timezones</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#admissions"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-8 py-4 font-black text-emerald-950 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-gold-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <span className="relative z-10 flex items-center gap-2 text-base">
                  <span>Book 3-Day Free Trial</span>
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>

              <a
                href="#programs"
                className="rounded-2xl border border-emerald-400/50 bg-emerald-900/40 backdrop-blur-md px-7 py-4 font-bold text-white transition-all duration-300 hover:border-amber-400 hover:bg-emerald-800/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                Explore Programs
              </a>
            </div>

            {/* Trust Reviews Badge */}
            <div className="flex items-center gap-4 pt-3 text-emerald-50/90 text-xs sm:text-sm font-medium bg-emerald-900/50 p-3 rounded-2xl w-fit backdrop-blur-md border border-emerald-500/20">
              <div className="flex -space-x-2">
                <span className="w-8 h-8 rounded-full border-2 border-emerald-950 bg-slate-800 flex items-center justify-center text-xs font-bold text-white shadow-md">🇺🇸</span>
                <span className="w-8 h-8 rounded-full border-2 border-emerald-950 bg-slate-800 flex items-center justify-center text-xs font-bold text-white shadow-md">🇬🇧</span>
                <span className="w-8 h-8 rounded-full border-2 border-emerald-950 bg-slate-800 flex items-center justify-center text-xs font-bold text-white shadow-md">🇨🇦</span>
                <span className="w-8 h-8 rounded-full border-2 border-emerald-950 bg-slate-800 flex items-center justify-center text-xs font-bold text-white shadow-md">🇦🇺</span>
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400 text-sm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                  <span className="ml-1 text-xs font-black text-white">5.0 / 5.0 Rating</span>
                </div>
                <p className="text-[11px] sm:text-xs text-emerald-200/90 font-normal">
                  Over 1,200+ Verified Parent & Student Reviews Worldwide
                </p>
              </div>
            </div>

            {/* Glowing Metric Counter Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {statItems.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                    className="rounded-2xl border border-emerald-500/25 bg-emerald-900/40 p-3.5 text-left backdrop-blur-md transition-all duration-300 hover:border-amber-400/60 hover:bg-emerald-900/60"
                  >
                    <div className="flex items-center justify-between text-amber-400 mb-1">
                      <span className="text-xl sm:text-2xl font-black text-white">{stat.value}</span>
                      <Icon size={18} className="text-amber-400/80" />
                    </div>
                    <p className="text-xs font-bold text-emerald-100">{stat.label}</p>
                    <p className="text-[10px] text-emerald-300/80">{stat.sublabel}</p>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>

          {/* Right Column: 21st High-Converting Lead Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-5"
            id="admissions"
          >
            <div className="relative rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/40 p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 hover:border-amber-400/50 hover:shadow-emerald-glow">
              {/* Gold Shimmer Top Bar */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />
              
              {/* Academy Crest Logo */}
              <div className="mb-4 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Maqsad-e-Quran Academy Official Seal"
                  width={190}
                  height={90}
                  priority
                  className="h-auto w-auto max-h-16 object-contain filter drop-shadow-md"
                />
              </div>

              {/* Lead Capture Form */}
              <TrialBookingForm />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
