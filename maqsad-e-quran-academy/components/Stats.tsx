"use client";

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
    <div className="mt-10 grid grid-cols-2 gap-5">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl bg-white p-5 text-center shadow-lg transition duration-300 hover:scale-105"
          >
            <Icon
              size={29}
              className="mx-auto text-emerald-700"
            />

            <h3 className="mt-3 text-2xl font-bold text-emerald-800">
              {item.number}
            </h3>

            <p className="mt-1 text-sm font-medium text-gray-600">
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}