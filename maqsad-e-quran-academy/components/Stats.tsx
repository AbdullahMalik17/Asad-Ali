"use client";

import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Globe,
  Users,
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function Stats() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Users,
      number: "5000+",
      title: t("stats.students"),
    },
    {
      icon: BookOpen,
      number: "10+",
      title: t("stats.courses"),
    },
    {
      icon: Globe,
      number: "35+",
      title: t("stats.countries"),
    },
    {
      icon: Award,
      number: "15+",
      title: t("stats.experience"),
    },
  ];

  return (
    <div className="mt-8 grid grid-cols-2 gap-3.5 sm:gap-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl bg-emerald-900/40 p-4 text-center backdrop-blur-md border border-emerald-500/25 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:border-amber-400/60 hover:bg-emerald-900/60 hover:shadow-[0_10px_25px_-5px_rgba(251,191,36,0.25)]"
          >
            {/* Subtle inner top glare */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-emerald-950 group-hover:shadow-[0_0_15px_rgba(251,191,36,0.5)]">
              <Icon size={20} strokeWidth={2} />
            </div>

            <h3 className="mt-2.5 text-2xl font-black text-amber-400 tracking-tight drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]">
              {item.number}
            </h3>

            <p className="mt-0.5 text-xs font-semibold text-emerald-100/80 group-hover:text-white transition-colors">
              {item.title}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}