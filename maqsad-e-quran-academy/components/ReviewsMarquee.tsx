"use client";

import React from "react";
import { Star, Quote, Sparkles, CheckCircle2, Heart, ArrowRight } from "lucide-react";

interface ReviewItem {
  id: string;
  parentName: string;
  studentInfo: string;
  progression: string;
  cityCountry: string;
  flag: string;
  rating: number;
  course: string;
  quote: string;
}

const REVIEWS_ROW_1: ReviewItem[] = [
  {
    id: "rev-1",
    parentName: "Dr. Tariq & Sarah Khan",
    studentInfo: "Parent of Rayyan (Age 7)",
    progression: "Started Qaida 8 mos ago → Now reciting Juz 2 with Tajweed",
    cityCountry: "Dallas, Texas, USA",
    flag: "🇺🇸",
    rating: 5,
    course: "Noorani Qaida & Tajweed",
    quote:
      "SubhanAllah, finding a qualified female Alimah in the US with such patience was impossible locally. Maqsad-e-Quran's 1-on-1 classes fit our hectic schedule perfectly, and Rayyan loves his teacher!",
  },
  {
    id: "rev-2",
    parentName: "Imran & Ayesha Ahmed",
    studentInfo: "Parents of Zayd & Maryam (Ages 6 & 9)",
    progression: "Both completed Nazra → Sibling Hifz program underway",
    cityCountry: "London, United Kingdom",
    flag: "🇬🇧",
    rating: 5,
    course: "Quran Reading & Hifz",
    quote:
      "The teachers are punctual, professional, and genuinely caring. The sibling discount was very helpful, and the weekly progress reports keep us informed of their Tajweed milestones.",
  },
  {
    id: "rev-3",
    parentName: "Farhan Siddiqui",
    studentInfo: "Adult Learner",
    progression: "Zero Arabic background → Now reading Quran fluently with Makharij",
    cityCountry: "Toronto, Ontario, Canada",
    flag: "🇨🇦",
    rating: 5,
    course: "Adult Quran & Tajweed",
    quote:
      "As an adult in my 30s, I was shy about learning Tajweed from scratch. My teacher made me feel completely comfortable and broke down the Makharij step-by-step. Highly recommended!",
  },
  {
    id: "rev-4",
    parentName: "Sister Yasmin Al-Sayed",
    studentInfo: "Mother of Hania (Age 11)",
    progression: "Completed Surah Al-Kahf & Juz Amma with meaning",
    cityCountry: "Sydney, Australia",
    flag: "🇦🇺",
    rating: 5,
    course: "Sisters & Girls Tajweed",
    quote:
      "The female teacher (Alimah Fatima) is an incredible role model for my daughter. Not only did her recitation improve, but she also learned proper Salah and daily Sunnah Duas.",
  },
];

const REVIEWS_ROW_2: ReviewItem[] = [
  {
    id: "rev-5",
    parentName: "Bilal & Zainab Malik",
    studentInfo: "Parents of Hamza (Age 8)",
    progression: "Memorized 15 Surahs with correct Ghunna & Qalqalah",
    cityCountry: "Manchester, United Kingdom",
    flag: "🇬🇧",
    rating: 5,
    course: "Hifz & Tajweed",
    quote:
      "The 3-day free trial convinced us immediately. The interactive Zoom whiteboard and audio clarity are exceptional. Hamza looks forward to his 1-on-1 sessions every week.",
  },
  {
    id: "rev-6",
    parentName: "Khurram Qureshi",
    studentInfo: "Parent of Ibrahim & Eshaal",
    progression: "Learned 80% Quranic vocabulary in 6 months",
    cityCountry: "Chicago, Illinois, USA",
    flag: "🇺🇸",
    rating: 5,
    course: "Translation & Tafseer",
    quote:
      "Understanding the Holy Quran while reading it has transformed my children's faith. The teacher explains the historical revelation context in simple, beautiful English.",
  },
  {
    id: "rev-7",
    parentName: "Rashid Mehmood",
    studentInfo: "Parent of Abdullah (Age 10)",
    progression: "Overcame pronunciation hesitation in 3 weeks",
    cityCountry: "Melbourne, Australia",
    flag: "🇦🇺",
    rating: 5,
    course: "Quran Reading (Nazra)",
    quote:
      "Our teacher in Pakistan adjusts to our Australian Eastern Timezone effortlessly. Excellent communication from the academy administration via WhatsApp at all times.",
  },
  {
    id: "rev-8",
    parentName: "Nadia Usman",
    studentInfo: "Mother of Ayaan (Age 5)",
    progression: "Finished Noorani Qaida in 4 months with full vowels",
    cityCountry: "Calgary, Alberta, Canada",
    flag: "🇨🇦",
    rating: 5,
    course: "Kids Noorani Qaida",
    quote:
      "The visual slides and kind encouragement keep my 5-year-old completely engaged for the full 30 minutes without getting distracted. May Allah bless this academy!",
  },
];

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div className="w-[360px] sm:w-[420px] shrink-0 rounded-3xl border border-emerald-900/10 bg-white p-6 shadow-md transition-all duration-300 hover:border-amber-400 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">
      <div>
        {/* Top Header: Country, Flag & Stars */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="text-xl">{review.flag}</span>
            <span className="text-xs font-bold text-slate-700">{review.cityCountry}</span>
          </div>

          <div className="flex items-center gap-1 text-amber-400">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
          </div>
        </div>

        {/* Progression Chip */}
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-900 border border-emerald-200/80">
          <Sparkles size={12} className="text-amber-600 shrink-0" />
          <span className="truncate">{review.progression}</span>
        </div>

        {/* Quote */}
        <p className="mt-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium italic">
          &ldquo;{review.quote}&rdquo;
        </p>
      </div>

      {/* Author Footer */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-black text-emerald-950">{review.parentName}</h4>
          <p className="text-[11px] text-slate-500 font-medium">{review.studentInfo}</p>
        </div>

        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/80 px-2.5 py-0.5 text-[10px] font-black uppercase text-amber-900 border border-amber-300">
          <CheckCircle2 size={11} className="text-amber-700" />
          Verified
        </span>
      </div>
    </div>
  );
}

export default function ReviewsMarquee() {
  return (
    <section
      className="relative py-16 sm:py-24 bg-islamic-pattern-light overflow-hidden"
      id="reviews"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 mb-12">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-100/80 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-amber-900 shadow-sm">
            <Heart size={14} className="text-amber-700 fill-amber-700" />
            Global Parent Testimonials
          </span>

          <h2 className="mt-3 text-3xl font-black text-emerald-950 sm:text-4xl lg:text-5xl tracking-tight">
            Trusted by Muslim Families in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
              35+ Countries
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Real stories of transformation, confidence, and Tajweed excellence
            from parents in USA, UK, Canada, and Australia.
          </p>
        </div>
      </div>

      {/* 21st Infinite Marquee Dual Rails with Edge Gradient Masks */}
      <div className="relative w-full overflow-hidden space-y-6">
        {/* Left & Right Gradient Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-32 bg-gradient-to-r from-[#fbf9f4] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-32 bg-gradient-to-l from-[#fbf9f4] to-transparent" />

        {/* Rail 1 - Moves Left */}
        <div className="flex animate-marquee-left gap-6">
          {REVIEWS_ROW_1.concat(REVIEWS_ROW_1).map((review, idx) => (
            <ReviewCard key={`${review.id}-${idx}`} review={review} />
          ))}
        </div>

        {/* Rail 2 - Moves Right */}
        <div className="flex animate-marquee-right gap-6">
          {REVIEWS_ROW_2.concat(REVIEWS_ROW_2).map((review, idx) => (
            <ReviewCard key={`${review.id}-${idx}`} review={review} />
          ))}
        </div>
      </div>

      {/* Bottom Community CTA */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 mt-14 text-center">
        <a
          href="#admissions"
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border border-amber-400/40 px-8 py-4 font-black text-amber-300 shadow-xl transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:shadow-gold-glow"
        >
          <span>Start Your Child&apos;s Journey Today (3 Days Free)</span>
          <ArrowRight size={18} className="text-amber-400" />
        </a>
      </div>
    </section>
  );
}
