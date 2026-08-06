"use client";

import { motion } from "framer-motion";
import {
  CalendarClock,
  MonitorPlay,
  UserRoundCheck,
  UsersRound,
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
    <section className="relative overflow-hidden bg-[#fbf8f0] py-12 sm:py-16">
      {/* Decorative background */}
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full border border-amber-300/30 pointer-events-none" />

      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full border border-emerald-800/10 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-extrabold uppercase tracking-[0.25em] text-amber-600 text-xs sm:text-sm">
            Academy Highlights
          </p>

          <h2 className="mt-2 text-3xl font-black leading-tight text-emerald-950 sm:text-4xl lg:text-5xl">
            Professional Quran Education{" "}
            <span className="block text-amber-600">
              Designed Around Your Family
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            Learn through personal online classes with qualified tutors,
            flexible schedules and a structured learning plan.
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.12,
                }}
                className="group rounded-3xl border border-amber-200/80 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-amber-400 hover:shadow-xl"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 transition duration-300 group-hover:bg-emerald-800 group-hover:text-white">
                  <Icon size={26} strokeWidth={1.8} />
                </div>

                <p className="mt-4 text-2xl sm:text-3xl font-bold text-amber-600">
                  {item.value}
                </p>

                <h3 className="mt-1.5 text-lg font-bold text-emerald-950">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 px-6 py-8 text-center text-white shadow-xl sm:px-8 sm:py-10"
        >
          <h3 className="text-2xl font-bold sm:text-3xl">
            Begin with a Free Trial Class
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-emerald-100">
            Meet your teacher, discuss your learning goals and experience our
            one-to-one teaching method before admission.
          </p>

          <a
            href="#admissions"
            className="mt-6 inline-flex rounded-xl bg-amber-400 px-8 py-3.5 font-bold text-emerald-950 transition hover:bg-amber-300 hover:scale-105"
          >
            Book Free Trial
          </a>
        </motion.div>
      </div>
    </section>
  );
}