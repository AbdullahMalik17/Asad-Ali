"use client";

import { motion } from "framer-motion";
import {
  Baby,
  BookHeart,
  BookOpen,
  BookOpenCheck,
  Languages,
  Mic2,
  MoonStar,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const programs = [
  {
    title: "Noorani Qaida",
    description: "Arabic letters, pronunciation and basic Quran reading.",
    icon: BookOpenCheck,
  },
  {
    title: "Quran Reading",
    description: "Fluent Quran recitation with correct pronunciation.",
    icon: BookOpen,
  },
  {
    title: "Tajweed Course",
    description: "Learn Makharij and the essential rules of Tajweed.",
    icon: Mic2,
  },
  {
    title: "Hifz-ul-Quran",
    description: "Structured Quran memorisation with daily revision.",
    icon: ShieldCheck,
  },
  {
    title: "Translation & Tafseer",
    description: "Understand the meanings and guidance of the Quran.",
    icon: BookHeart,
  },
  {
    title: "Arabic Language",
    description: "Learn Quranic and conversational Arabic online.",
    icon: Languages,
  },
  {
    title: "Islamic Studies",
    description: "Aqeedah, Seerah, Salah, Duas and Islamic manners.",
    icon: MoonStar,
  },
  {
    title: "Kids Islamic Program",
    description: "Interactive Islamic learning specially designed for children.",
    icon: Baby,
  },
];

export default function Programs() {
  return (
    <section
      id="programs"
      className="relative overflow-hidden bg-gradient-to-b from-[#fbf8f0] via-[#f4efe0] to-[#fbf8f0] py-16 sm:py-24"
    >
      {/* Decorative background light circles */}
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-100/80 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-amber-700 backdrop-blur-md shadow-sm">
            <Sparkles size={14} className="text-amber-600" />
            Our Academic Programs
          </span>

          <h2 className="mt-3 text-3xl font-black text-emerald-950 sm:text-4xl lg:text-5xl">
            Learn the Quran with{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
              Knowledge and Excellence
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            Select a course according to your age, learning level and personal
            goals. All programs are available through one-to-one online classes.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, idx) => {
            const Icon = program.icon;

            return (
              <motion.article
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-amber-200/70 bg-white/80 p-6 text-center shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-amber-400 hover:shadow-[0_20px_40px_-15px_rgba(251,191,36,0.25)] flex flex-col justify-between"
              >
                {/* Subtle gold line on top */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100/80 text-emerald-800 transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-emerald-800 group-hover:to-emerald-950 group-hover:text-amber-300 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    <Icon size={30} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-emerald-950 group-hover:text-emerald-900 transition-colors">
                    {program.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-gray-600">
                    {program.description}
                  </p>
                </div>

                <a
                  href="https://wa.me/923301676985?text=Assalamualaikum%2C%20I%20want%20information%20about%20your%20Quran%20courses."
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-1 font-extrabold text-amber-600 text-xs sm:text-sm transition-all duration-300 group-hover:text-emerald-800"
                >
                  <span>Course Details</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </motion.article>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <a
            href="#admissions"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 border border-amber-400/40 px-8 py-3.5 font-black text-amber-300 shadow-xl transition-all duration-300 hover:border-amber-400 hover:bg-emerald-950 hover:shadow-[0_10px_30px_-5px_rgba(16,185,129,0.4)] hover:scale-105"
          >
            <span>Book Your Free Trial Class</span>
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 text-amber-400" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}