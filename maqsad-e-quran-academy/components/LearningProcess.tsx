"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  GraduationCap,
  MessageSquareText,
  UserCheck,
  Sparkles,
  ArrowRight,
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
    <section className="relative overflow-hidden bg-emerald-950 py-16 sm:py-24 text-white">
      {/* Ambient background glows */}
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-amber-400/15 blur-[120px] pointer-events-none" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.05)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-amber-300 backdrop-blur-md shadow-sm">
            <Sparkles size={14} className="text-amber-400" />
            {t("learningProcess.subtitle")}
          </span>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl">
            {t("learningProcess.titleFirst")}{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 drop-shadow-[0_4px_12px_rgba(251,191,36,0.3)]">
              {t("learningProcess.titleSecond")}
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-emerald-100/90 font-medium sm:text-lg">
            {t("learningProcess.description")}
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.01 }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.article
                variants={itemVariants}
                key={step.number}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/70 hover:bg-white/20 hover:shadow-[0_15px_35px_-5px_rgba(251,191,36,0.3)] flex flex-col justify-between"
              >
                {/* Shimmer line accent on top */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 text-emerald-950 shadow-[0_0_20px_rgba(251,191,36,0.45)] transition-transform duration-300 group-hover:scale-110">
                      <Icon size={26} strokeWidth={2} />
                    </div>

                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-300/40 via-amber-400/20 to-white/10 group-hover:from-amber-400 group-hover:to-amber-200 transition-all">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-emerald-100/90 font-medium">
                    {step.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <a
            href="#admissions"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 px-8 py-3.5 font-black text-emerald-950 shadow-[0_10px_30px_-5px_rgba(251,191,36,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_40px_-5px_rgba(251,191,36,0.6)]"
          >
            <span>{t("learningProcess.cta")}</span>
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}