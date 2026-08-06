"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  GraduationCap,
  MessageSquareText,
  UserCheck,
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function LearningProcess() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      id: "step1",
      title: t("learningProcess.steps.step1.title"),
      description: t("learningProcess.steps.step1.desc"),
      icon: MessageSquareText,
    },
    {
      number: "02",
      id: "step2",
      title: t("learningProcess.steps.step2.title"),
      description: t("learningProcess.steps.step2.desc"),
      icon: UserCheck,
    },
    {
      number: "03",
      id: "step3",
      title: t("learningProcess.steps.step3.title"),
      description: t("learningProcess.steps.step3.desc"),
      icon: CalendarCheck,
    },
    {
      number: "04",
      id: "step4",
      title: t("learningProcess.steps.step4.title"),
      description: t("learningProcess.steps.step4.desc"),
      icon: GraduationCap,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-emerald-950 py-12 sm:py-16 text-white">
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-extrabold uppercase tracking-[0.25em] text-amber-400 text-xs sm:text-sm">
            Simple Admission Process
          </p>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl lg:text-5xl">
            Start Quran Classes{" "}
            <span className="block text-amber-400">
              in Four Easy Steps
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-emerald-100 sm:text-lg">
            Our admission process is simple, quick and designed for families
            living in different countries and time zones.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.article
                variants={itemVariants}
                key={step.number}
                className="relative rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:border-amber-400/50 hover:bg-white/15"
              >
                <span className="absolute right-5 top-4 text-4xl font-black text-white/10">
                  {step.number}
                </span>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-emerald-950 shadow-lg">
                  <Icon size={26} />
                </div>
                <h3 className="mt-5 text-xl font-bold">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-emerald-100">
                  {step.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <a
            href="#admissions"
            className="inline-flex rounded-xl bg-amber-400 px-8 py-3.5 font-bold text-emerald-950 shadow-lg transition hover:bg-amber-300 hover:scale-105"
          >
            Start with a Free Trial
          </a>
        </motion.div>
      </div>
    </section>
  );
}