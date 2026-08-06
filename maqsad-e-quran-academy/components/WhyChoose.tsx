"use client";

import { motion } from "framer-motion";
import {
  Award,
  Clock,
  Gift,
  Globe2,
  Headset,
  Sparkles,
  UserCheck,
} from "lucide-react";import { useLanguage } from "./LanguageProvider";

const features = [
  {
    title: "Certified Teachers",
    description: "Qualified male & female Quran teachers with years of experience.",
    icon: Award,
  },
  {
    title: "One-to-One Classes",
    description: "Personal attention for every student with flexible scheduling.",
    icon: UserCheck,
  },
  {
    title: "Worldwide Availability",
    description: "Join from Pakistan, UK, USA, Canada, Australia and anywhere.",
    icon: Globe2,
  },
  {
    title: "24/7 Support",
    description: "Friendly support team available to help students and parents.",
    icon: Headset,
  },
  {
    title: "Flexible Timings",
    description: "Morning, evening and weekend classes available.",
    icon: Clock,
  },
  {
    title: "Free Trial Class",
    description: "Start with a free class before enrolling.",
    icon: Gift,
  },
];

export default function WhyChoose() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/20 to-white py-16 sm:py-24">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-100/70 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-emerald-800 backdrop-blur-md shadow-sm">
            <Sparkles size={14} className="text-amber-500" />
            {t("whyChoose.subtitle")}
          </span>

          <h2 className="text-3xl font-black mt-3 text-emerald-950 sm:text-4xl lg:text-5xl">
            {t("whyChoose.title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
              {t("whyChoose.highlight")}
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-emerald-100/90 bg-white/80 p-7 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-amber-400 hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.2)]"
              >
                {/* Top border accent */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100/80 text-emerald-800 transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-amber-500 group-hover:text-emerald-950 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] mb-5">
                  <Icon size={28} strokeWidth={2} />
                </div>

                <h3 className="text-xl font-bold text-emerald-950 group-hover:text-emerald-900 transition-colors">
                  {item.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}