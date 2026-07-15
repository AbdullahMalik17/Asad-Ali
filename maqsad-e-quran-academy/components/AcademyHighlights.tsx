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
    <section className="relative overflow-hidden bg-[#fbf8f0] py-24">
      {/* Decorative background */}
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full border border-amber-300/30" />

      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full border border-emerald-800/10" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold uppercase tracking-[0.28em] text-amber-600">
            Academy Highlights
          </p>

          <h2 className="mt-4 text-4xl font-bold leading-tight text-emerald-950 sm:text-5xl">
            Professional Quran Education
            <span className="block text-amber-600">
              Designed Around Your Family
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Learn through personal online classes with qualified tutors,
            flexible schedules and a structured learning plan.
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
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
                className="group rounded-3xl border border-amber-200 bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-xl"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 transition duration-300 group-hover:bg-emerald-800 group-hover:text-white">
                  <Icon size={31} strokeWidth={1.8} />
                </div>

                <p className="mt-6 text-3xl font-bold text-amber-600">
                  {item.value}
                </p>

                <h3 className="mt-2 text-xl font-bold text-emerald-950">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-600">
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
          className="mt-14 rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 px-8 py-10 text-center text-white shadow-2xl"
        >
          <h3 className="text-2xl font-bold sm:text-3xl">
            Begin with a Free Trial Class
          </h3>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-emerald-100">
            Meet your teacher, discuss your learning goals and experience our
            one-to-one teaching method before admission.
          </p>

          <a
            href="#admissions"
            className="mt-7 inline-flex rounded-xl bg-amber-400 px-9 py-4 font-bold text-emerald-950 transition hover:bg-amber-300"
          >
            Book Free Trial
          </a>
        </motion.div>
      </div>
    </section>
  );
}