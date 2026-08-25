"use client";

import { Mail, Phone, Sparkles, MessageCircle } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function TopBar() {
  const { t } = useLanguage();

  return (
    <div className="border-b border-amber-500/20 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white shadow-inner">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 text-xs font-medium sm:px-6">
        {/* Quranic Ayah Inspiration */}
        <div className="flex items-center gap-2 text-emerald-100">
          <Sparkles size={13} className="animate-pulse text-amber-400 shrink-0" aria-hidden="true" />
          <span className="font-arabic text-amber-300 font-bold hidden md:inline">
            وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا
          </span>
          <span className="hidden md:inline text-emerald-400">•</span>
          <span className="truncate">{t("topBar.message") || "Inspiring Hearts Through the Light of the Noble Quran"}</span>
        </div>

        {/* Contact Links */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 ml-auto">
          <a
            href="mailto:maqsadquran@gmail.com"
            aria-label="Email Maqsad-e-Quran Academy"
            className="flex items-center gap-1.5 text-emerald-100 transition-colors hover:text-amber-300"
          >
            <Mail size={14} className="text-amber-400" aria-hidden="true" />
            <span className="hidden sm:inline">maqsadquran@gmail.com</span>
          </a>

          <a
            href="https://wa.me/923301676985"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="WhatsApp Maqsad-e-Quran Academy"
            className="flex items-center gap-1.5 text-emerald-100 transition-colors hover:text-amber-300 font-semibold"
          >
            <MessageCircle size={14} className="text-amber-400" aria-hidden="true" />
            <span>+92 330 1676985</span>
          </a>
        </div>
      </div>
    </div>
  );
}