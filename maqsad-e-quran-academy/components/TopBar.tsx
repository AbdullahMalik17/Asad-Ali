"use client";

import { Mail, Phone, Sparkles } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function TopBar() {
  const { t } = useLanguage();

  return (
    <div className="border-b border-amber-500/20 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white shadow-inner">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 text-xs font-medium sm:px-6 sm:text-sm">
        <div className="flex items-center gap-2 text-emerald-100">
          <Sparkles size={14} className="animate-pulse text-amber-400" aria-hidden="true" />
          <span>{t("topBar.message")}</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <a
            href="mailto:maqsadquran@gmail.com"
            aria-label="Email Maqsad-e-Quran Academy at maqsadquran@gmail.com"
            className="flex items-center gap-1.5 text-emerald-100 transition-colors hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950 rounded-sm"
          >
            <Mail size={15} className="text-amber-400" aria-hidden="true" />
            <span>maqsadquran@gmail.com</span>
          </a>

          <a
            href="tel:+923301676985"
            aria-label="Call Maqsad-e-Quran Academy at +92 330 1676985"
            className="flex items-center gap-1.5 text-emerald-100 transition-colors hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950 rounded-sm"
          >
            <Phone size={15} className="text-amber-400" aria-hidden="true" />
            <span>+92 330 1676985</span>
          </a>
        </div>
      </div>
    </div>
  );
}