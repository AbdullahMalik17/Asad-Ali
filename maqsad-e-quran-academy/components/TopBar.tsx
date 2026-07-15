"use client";

import { Mail, Phone } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function TopBar() {
  const { t } = useLanguage();

  return (
    <div className="bg-emerald-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-2 text-sm">
        <p className="font-medium text-emerald-50">
          ✦ {t("topBar.message")}
        </p>

        <div className="flex flex-wrap items-center gap-5">
          <a
            href="mailto:maqsadquran@gmail.com"
            className="flex items-center gap-2 hover:text-amber-300"
          >
            <Mail size={16} />
            maqsadquran@gmail.com
          </a>

          <a
            href="tel:+923301676985"
            className="flex items-center gap-2 hover:text-amber-300"
          >
            <Phone size={16} />
            +92 330 1676985
          </a>
        </div>
      </div>
    </div>
  );
}