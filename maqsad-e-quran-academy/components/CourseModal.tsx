"use client";

import React from "react";
import { X, CheckCircle2, Clock, Users, Award, BookOpen, ArrowRight } from "lucide-react";

export interface CourseDetail {
  id: string;
  title: string;
  level: string;
  description: string;
  fullOverview: string;
  duration: string;
  recommendedAge: string;
  prerequisites: string;
  syllabus: string[];
  outcomes: string[];
}

export const COURSE_DETAILS: Record<string, CourseDetail> = {
  qaida: {
    id: "qaida",
    title: "Noorani Qaida Course",
    level: "Beginner",
    description: "Learn Arabic letters and correct pronunciation (Makharij) from the absolute foundation.",
    fullOverview:
      "Designed specifically for beginners, kids, and adults starting their Quranic journey. Learn single & compound letter shapes, vowel marks (Harakat, Tanween), Madd rules, and basic Tajweed phonetics.",
    duration: "3 - 5 Months (Customizable pace)",
    recommendedAge: "Kids (4+) & Adults",
    prerequisites: "None (Beginner Friendly)",
    syllabus: [
      "Arabic Alphabet & Correct Makharij (Articulations)",
      "Single Letters & Joint Letter Recognition",
      "Short Vowels (Fatha, Kasra, Damma) & Tanween",
      "Sukoon, Tashdeed & Madd Rules",
      "Rules of Noon Sakin & Tanween",
      "Joining letters to form Quranic words smoothly"
    ],
    outcomes: [
      "Fluently recognize all Arabic letters in any Quranic script",
      "Pronounce every letter from its authentic origin point",
      "Read short Quranic words and verses independently"
    ]
  },
  reading: {
    id: "reading",
    title: "Quran Reading (Nazra) Course",
    level: "Intermediate",
    description: "Read the Holy Quran smoothly with proper rhythm, continuous practice, and individual guidance.",
    fullOverview:
      "For students who have completed Noorani Qaida and want to read the entire Holy Quran with speed, confidence, and natural flow under expert supervision.",
    duration: "6 - 12 Months",
    recommendedAge: "All Ages",
    prerequisites: "Basic Noorani Qaida knowledge",
    syllabus: [
      "Fluent Recitation of Juz Amma (30th Para)",
      "Systematic progression through all 30 Paras",
      "Correcting common reading mistakes & hesitation",
      "Punctuation (Waqf) rules and pausing signs",
      "Daily recitation speed & stamina building"
    ],
    outcomes: [
      "Recite the Holy Quran fluently without pauses",
      "Recognize stops, pauses, and continuous recitation marks",
      "Develop strong love and daily habit of Quran recitation"
    ]
  },
  tajweed: {
    id: "tajweed",
    title: "Tajweed-ul-Quran Mastery",
    level: "All Levels",
    description: "Master the rules of Tajweed with certified Qaris to recite Quran in the melodious, authentic tradition.",
    fullOverview:
      "Learn the art and science of Tajweed. Study Makharij, Sifaat (characteristics of letters), Izhar, Igham, Iqlab, Ikhfa, and rules of Heavy/Light letters.",
    duration: "4 - 8 Months",
    recommendedAge: "Kids (7+) & Adults",
    prerequisites: "Ability to read Quran text",
    syllabus: [
      "Makharij-ul-Huroof (Detailed Articulation Points)",
      "Rules of Noon Sakin, Tanween & Meem Sakin",
      "Types of Madd (Prolongation) & Duration",
      "Heavy and Light Letters (Tafkheem & Tarqeeq)",
      "Qalqalah & Ghunna rules with live teacher feedback"
    ],
    outcomes: [
      "Recite Quran with proper Tajweed precision",
      "Avoid minor and major recitation errors (Lahn Jali & Khafi)",
      "Beautify your voice according to Sunnah guidelines"
    ]
  },
  hifz: {
    id: "hifz",
    title: "Hifz-ul-Quran (Memorization)",
    level: "Advanced",
    description: "Memorize the Holy Quran through structured daily lessons, revision techniques, and memory retention strategies.",
    fullOverview:
      "A disciplined program with daily Sabak (new lesson), Sabki (recent revision), and Manzil (old revision) to help students memorize Surahs or the complete Quran.",
    duration: "1.5 - 3 Years (Flexible goals)",
    recommendedAge: "Kids (6+) & Dedicated Adults",
    prerequisites: "Strong Tajweed & fluent Quran reading",
    syllabus: [
      "Daily Sabak (New Lesson assignment)",
      "Sabki (Revision of last 5-10 lessons)",
      "Manzil (Systematic revision of old Juz)",
      "Memory retention techniques & active recall",
      "Preparation for formal Hifz certification"
    ],
    outcomes: [
      "Complete or partial Hifz of the Holy Quran",
      "Retain memorized Surahs with long-term retention",
      "Perform Taraweeh and lead prayers with confidence"
    ]
  },
  tafseer: {
    id: "tafseer",
    title: "Quran Translation & Tafseer",
    level: "Intermediate",
    description: "Understand the word-by-word meaning, context of revelation (Asbab al-Nuzul), and practical guidance of the Quran.",
    fullOverview:
      "Go beyond reading to comprehend the divine message. Study word-by-word translation, grammatical insights, historical context, and spiritual reflections.",
    duration: "6 - 12 Months",
    recommendedAge: "Teens & Adults",
    prerequisites: "Basic Quran reading capability",
    syllabus: [
      "Word-for-Word translation of key Surahs & Paras",
      "Context of Revelation (Asbab-al-Nuzul)",
      "Classical and contemporary Tafseer commentaries",
      "Core Islamic themes: Monotheism, Ethics, Law, History",
      "Applying Quranic moral principles to daily modern life"
    ],
    outcomes: [
      "Understand the message of the Quran while reading",
      "Deepen your personal connection during Daily Salah",
      "Gain authentic knowledge of Islamic creed and ethics"
    ]
  },
  arabic: {
    id: "arabic",
    title: "Quranic & Classical Arabic Language",
    level: "All Levels",
    description: "Learn Modern & Classical Arabic vocabulary, grammar (Nahw & Sarf), and conversational skills.",
    fullOverview:
      "Master Quranic Arabic grammar and vocabulary to directly understand Quranic verses without relying on translations.",
    duration: "4 - 8 Months",
    recommendedAge: "Teens & Adults",
    prerequisites: "Basic Arabic script reading",
    syllabus: [
      "Essential Quranic Vocabulary (80% of Quranic words)",
      "Fundamental Grammar (Ilm-un-Nahw)",
      "Word Structure & Roots (Ilm-us-Sarf)",
      "Sentence Construction & Comprehension exercises",
      "Daily Conversational Arabic basics"
    ],
    outcomes: [
      "Directly understand 70%+ of Quranic verses",
      "Analyze sentence structure and word root meanings",
      "Formulate simple Arabic sentences with correct syntax"
    ]
  }
};

interface CourseModalProps {
  courseId: string | null;
  onClose: () => void;
  onBookTrial: (courseTitle: string) => void;
}

export default function CourseModal({ courseId, onClose, onBookTrial }: CourseModalProps) {
  if (!courseId) return null;
  const course = COURSE_DETAILS[courseId] || COURSE_DETAILS.qaida;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-emerald-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
          
          <span className="inline-block rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/30 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2">
            {course.level} Level
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-amber-400 shrink-0" />
            <span>{course.title}</span>
          </h2>
          <p className="mt-2 text-sm text-emerald-100/90 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Modal Content Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6 text-slate-700">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
              <div>
                <p className="text-[11px] text-gray-500 font-semibold uppercase">Duration</p>
                <p className="font-bold text-emerald-950">{course.duration}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-700 shrink-0" />
              <div>
                <p className="text-[11px] text-gray-500 font-semibold uppercase">Students</p>
                <p className="font-bold text-emerald-950">{course.recommendedAge}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-700 shrink-0" />
              <div>
                <p className="text-[11px] text-gray-500 font-semibold uppercase">Prerequisite</p>
                <p className="font-bold text-emerald-950 truncate">{course.prerequisites}</p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-base font-bold text-emerald-950 mb-2">Course Overview</h3>
            <p className="text-sm leading-relaxed text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {course.fullOverview}
            </p>
          </div>

          {/* Syllabus Topics */}
          <div>
            <h3 className="text-base font-bold text-emerald-950 mb-3">Syllabus & Topics Covered</h3>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {course.syllabus.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Learning Outcomes */}
          <div>
            <h3 className="text-base font-bold text-emerald-950 mb-3">Key Learning Outcomes</h3>
            <ul className="space-y-2">
              {course.outcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-emerald-900 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400 text-[10px] font-extrabold text-emerald-950">✓</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl border border-slate-300 font-bold text-xs sm:text-sm text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
          
          <button
            onClick={() => {
              onBookTrial(course.title);
              onClose();
            }}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-6 py-3 font-extrabold text-xs sm:text-sm text-emerald-950 shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            <span>Book Free Trial for This Course</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
