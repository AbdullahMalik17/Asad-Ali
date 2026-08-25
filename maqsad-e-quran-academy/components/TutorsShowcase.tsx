"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  HeartHandshake,
} from "lucide-react";

type FacultyFilter = "all" | "male" | "female";

interface TutorProfile {
  id: string;
  name: string;
  gender: "male" | "female";
  role: string;
  degrees: string[];
  experienceYears: string;
  languages: string[];
  specialty: string;
  rating: string;
  reviewsCount: number;
  studentsTaught: string;
  badge: string;
}

const TUTORS_DATA: TutorProfile[] = [
  {
    id: "qari-muhammad",
    name: "Qari Hafiz Muhammad",
    gender: "male",
    role: "Senior Tajweed & Qira'at Specialist",
    degrees: ["Wifaq-ul-Madaris Certified (Shahadat-ul-Alimiyyah)", "Hafiz-ul-Quran (Ijazah in Hafs 'an Asim)"],
    experienceYears: "12+ Years Experience",
    languages: ["English", "Urdu", "Arabic"],
    specialty: "Advanced Tajweed, Makharij Correction & Fluency",
    rating: "5.0",
    reviewsCount: 240,
    studentsTaught: "450+ Students",
    badge: "Ijazah Holder",
  },
  {
    id: "alimah-fatima",
    name: "Alimah Fatima Az-Zahra",
    gender: "female",
    role: "Senior Sisters & Children Faculty Lead",
    degrees: ["Dars-e-Nizami (Alimah Degree - 8 Years)", "Hafizah-ul-Quran & Tajweed Sanad"],
    experienceYears: "9+ Years Experience",
    languages: ["English", "Urdu", "Arabic"],
    specialty: "Noorani Qaida for Kids, Sisters Tajweed & Tafseer",
    rating: "5.0",
    reviewsCount: 310,
    studentsTaught: "520+ Students",
    badge: "Certified Alimah",
  },
  {
    id: "hafiz-tariq",
    name: "Hafiz Tariq Mahmood",
    gender: "male",
    role: "Hifz-ul-Quran Program Director",
    degrees: ["Master in Islamic Studies", "Certified Hafiz & Qari (10 Qira'at)"],
    experienceYears: "15+ Years Experience",
    languages: ["English", "Urdu", "Arabic"],
    specialty: "Structured Hifz Retention & Daily Sabaqi Manzil",
    rating: "4.9",
    reviewsCount: 195,
    studentsTaught: "380+ Students",
    badge: "Hifz Master",
  },
  {
    id: "alimah-maryam",
    name: "Alimah Maryam Siddiqua",
    gender: "female",
    role: "Quranic Arabic & Tafseer Instructor",
    degrees: ["Al-Azhar University Diploma in Arabic", "Wifaq Alimiyah Degree"],
    experienceYears: "8+ Years Experience",
    languages: ["English", "Arabic", "Urdu"],
    specialty: "Quranic Grammar, Tafseer & Daily Islamic Duas",
    rating: "5.0",
    reviewsCount: 180,
    studentsTaught: "290+ Students",
    badge: "Arabic Expert",
  },
  {
    id: "qari-abdul-rehman",
    name: "Qari Abdul Rehman",
    gender: "male",
    role: "Kids Foundation & Nazra Specialist",
    degrees: ["Noorani Qaida Certification", "Hafiz-ul-Quran with Sanad"],
    experienceYears: "7+ Years Experience",
    languages: ["English", "Urdu"],
    specialty: "Engaging Children Pacing, Makharij & Daily Sunnahs",
    rating: "4.9",
    reviewsCount: 220,
    studentsTaught: "410+ Students",
    badge: "Kids Specialist",
  },
  {
    id: "alimah-zainab",
    name: "Alimah Zainab Noor",
    gender: "female",
    role: "Nazra & Islamic Character Mentorship",
    degrees: ["Alimah Degree & Teacher Training Certification", "Hafizah-ul-Quran"],
    experienceYears: "6+ Years Experience",
    languages: ["English", "Urdu"],
    specialty: "Sisters Private Classes, Salah Meanings & Seerah",
    rating: "5.0",
    reviewsCount: 165,
    studentsTaught: "270+ Students",
    badge: "Female Scholar",
  },
];

export default function TutorsShowcase() {
  const [filter, setFilter] = useState<FacultyFilter>("all");

  const filteredTutors = useMemo(() => {
    if (filter === "all") return TUTORS_DATA;
    return TUTORS_DATA.filter((t) => t.gender === filter);
  }, [filter]);

  return (
    <section
      className="relative py-16 sm:py-24 bg-islamic-pattern text-white overflow-hidden"
      id="teachers"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-amber-300 backdrop-blur-md shadow-sm">
            <GraduationCap size={14} className="text-amber-400" />
            Certified Academic Faculty
          </span>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl tracking-tight">
            Learn from Verified{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
              Scholars & Alimahs
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
            Every tutor undergoes rigorous vetting, background checks, and
            possesses formal certification from renowned Islamic universities.
          </p>
        </div>

        {/* 21st-Style Segmented Filter Tabs */}
        <div className="flex items-center justify-center gap-2 p-1.5 bg-white/10 rounded-2xl max-w-md mx-auto mb-12 backdrop-blur-xl border border-white/10">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              filter === "all"
                ? "bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 shadow-gold-glow"
                : "text-emerald-100 hover:text-white"
            }`}
          >
            All Faculty (50+)
          </button>

          <button
            type="button"
            onClick={() => setFilter("female")}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              filter === "female"
                ? "bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 shadow-gold-glow"
                : "text-emerald-100 hover:text-white"
            }`}
          >
            Female Alimahs (20+)
          </button>

          <button
            type="button"
            onClick={() => setFilter("male")}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              filter === "male"
                ? "bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 shadow-gold-glow"
                : "text-emerald-100 hover:text-white"
            }`}
          >
            Male Scholars (30+)
          </button>
        </div>

        {/* Tutors Grid */}
        <motion.div
          layout
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredTutors.map((tutor) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={tutor.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-amber-400/80 hover:bg-white/15 hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.35)]"
              >
                {/* Top gold line */}
                <div className="absolute top-0 inset-x-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top Avatar & Badges */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 text-emerald-950 font-black shadow-gold-glow group-hover:scale-105 transition-transform">
                      {tutor.gender === "female" ? (
                        <GraduationCap size={32} strokeWidth={2} />
                      ) : (
                        <UserRound size={32} strokeWidth={2} />
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-amber-300 border border-amber-300/40">
                        <ShieldCheck size={12} className="text-amber-400" />
                        {tutor.badge}
                      </span>

                      <div className="flex items-center gap-1 text-amber-400 text-xs font-black">
                        <Star size={13} fill="currentColor" />
                        <span>{tutor.rating}</span>
                        <span className="text-emerald-300/80 text-[10px]">
                          ({tutor.reviewsCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Name & Role */}
                  <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors">
                    {tutor.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-amber-300 mt-0.5">
                    {tutor.role}
                  </p>

                  {/* Degrees & Credentials */}
                  <div className="mt-5 space-y-2.5 text-xs text-emerald-100/90 font-medium">
                    {tutor.degrees.map((deg, i) => (
                      <div key={i} className="flex items-start gap-2 bg-white/5 p-2 px-3 rounded-xl border border-white/5">
                        <Award size={15} className="text-amber-400 mt-0.5 shrink-0" />
                        <span>{deg}</span>
                      </div>
                    ))}

                    <div className="flex items-center justify-between gap-2 bg-white/5 p-2 px-3 rounded-xl border border-white/5 text-[11px]">
                      <span className="flex items-center gap-1 text-emerald-200">
                        <Languages size={13} className="text-amber-400" />
                        {tutor.languages.join(", ")}
                      </span>
                      <span className="font-bold text-amber-300">
                        {tutor.experienceYears}
                      </span>
                    </div>
                  </div>

                  {/* Specialty Quote */}
                  <div className="mt-4 p-3 rounded-xl bg-emerald-950/70 border border-emerald-700/40 text-[11px] text-emerald-200">
                    <span className="font-bold text-amber-300">Specialty Focus: </span>
                    {tutor.specialty}
                  </div>
                </div>

                {/* Trial CTA Button */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <a
                    href="#admissions"
                    className="flex items-center justify-center gap-2 w-full rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 py-3 px-4 font-black text-emerald-950 text-xs sm:text-sm shadow-md hover:scale-[1.02] transition-transform"
                  >
                    <span>Request Trial with {tutor.gender === "female" ? "Female Scholar" : "Male Scholar"}</span>
                    <ArrowRight size={15} />
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Credibility Strip */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-2xl sm:text-3xl font-black text-amber-400">50+</p>
            <p className="text-xs font-bold text-emerald-100 mt-0.5">Certified Faculty</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-2xl sm:text-3xl font-black text-amber-400">100%</p>
            <p className="text-xs font-bold text-emerald-100 mt-0.5">Verified Credentials</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-2xl sm:text-3xl font-black text-amber-400">24/7</p>
            <p className="text-xs font-bold text-emerald-100 mt-0.5">Timezone Flexibility</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-2xl sm:text-3xl font-black text-amber-400">1-on-1</p>
            <p className="text-xs font-bold text-emerald-100 mt-0.5">Personal Attention</p>
          </div>
        </div>
      </div>
    </section>
  );
}
