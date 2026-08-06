"use client";

import { motion } from "framer-motion";
import {
  CalendarClock,
  MonitorPlay,
  UserRoundCheck,
  UsersRound,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const highlights = [
  {
    value: "50+",
    title: "Qualified Teachers",
    description:
      "Experienced Quran tutors for children, adults and families worldwide.",
    icon: UsersRound,
  },
  {
    value: "1-to-1",
    title: "Personal Classes",
    description:
      "Individual online lessons designed according to every student’s level.",
    icon: MonitorPlay,
  },
  {
    value: "Male & Female",
    title: "Teacher Choice",
    description:
      "Students may choose a male or female teacher according to preference.",
    icon: UserRoundCheck,
  },
  {
    value: "Flexible",
    title: "Class Timings",
    description:
      "Morning, evening and weekend schedules for different international zones.",
    icon: CalendarClock,
  },
];

export default function AcademyHighlights() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fbf8f0] via-[#f5efe0] to-[#fbf8f0] py-16 sm:py-24">
      {/* Decorative background light Orbs */}
      <div className="absolute -left-28 top-10 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
      <div className="absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-100/80 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-amber-700 backdrop-blur-md shadow-sm">
            <Sparkles size={14} className="text-amber-600" />
            Academy Highlights
          </span>

          <h2 className="mt-3 text-3xl font-black leading-tight text-emerald-950 sm:text-4xl lg:text-5xl">
            Professional Quran Education{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
              Designed Around Your Family
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            Learn through personal online classes with qualified tutors,
            flexible schedules and a structured learning plan.
          </p>
        </motion.div>

        {/* Highlight Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.12,
                }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-amber-200/70 bg-white/80 p-6 text-center shadow-lg backdrop-blur-xl transition-all duration-500 hover:border-amber-400 hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.25)] flex flex-col justify-between"
              >
                {/* Top edge gold light line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100/90 text-emerald-800 transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-emerald-800 group-hover:to-emerald-950 group-hover:text-amber-300 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    <Icon size={28} strokeWidth={2} />
                  </div>

                  <p className="mt-4 text-3xl font-black text-amber-600 drop-shadow-sm group-hover:text-amber-500 transition-colors">
                    {item.value}
                  </p>

                  <h3 className="mt-1.5 text-lg font-bold text-emerald-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom Glassmorphic CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mt-12 overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 px-6 py-10 text-center text-white shadow-2xl backdrop-blur-xl sm:px-10 sm:py-12"
        >
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
          
          <h3 className="text-2xl font-black sm:text-3xl lg:text-4xl text-white">
            Begin with a Free Trial Class
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-emerald-100/90 font-medium">
            Meet your teacher, discuss your learning goals and experience our
            one-to-one teaching method before admission.
          </p>

          <a
            href="#admissions"
            className="group mt-7 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 px-8 py-3.5 font-black text-emerald-950 shadow-[0_10px_25px_-5px_rgba(251,191,36,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_35px_-5px_rgba(251,191,36,0.6)]"
          >
            <span>Book Free Trial</span>
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}