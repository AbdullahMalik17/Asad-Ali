"use client";

import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import {
  LanguageCode,
  useLanguage,
} from "./LanguageProvider";

const languages: {
  code: LanguageCode;
  label: string;
}[] = [
  { code: "en", label: "English" },
  { code: "ur", label: "اردو" },
  { code: "ar", label: "العربية" },
  { code: "fa", label: "فارسی" },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const { language, setLanguage, t } = useLanguage();

  const menuItems = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.courses"), href: "#courses" },
    { label: t("nav.teachers"), href: "#teachers" },
    { label: t("nav.admissions"), href: "#admissions" },
    { label: t("nav.reviews"), href: "#reviews" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  const currentLanguage =
    languages.find((item) => item.code === language)?.label ??
    "English";

  const changeLanguage = (code: LanguageCode) => {
    setLanguage(code);
    setLanguageOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-emerald-100 bg-white/95 shadow-md backdrop-blur-md">
      <div className="mx-auto flex min-h-24 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="flex items-center gap-3">
          <div className="relative h-16 w-20 shrink-0">
            <Image
              src="/logo.png"
              alt="Maqsad-e-Quran Academy"
              fill
              priority
              className="object-contain"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold text-emerald-950 sm:text-2xl">
              Maqsad-e-Quran
            </h2>

            <p className="text-xs font-semibold tracking-wide text-amber-600 sm:text-sm">
              Online Quran Academy
            </p>
          </div>
        </a>

        <ul className="hidden items-center gap-6 font-semibold text-gray-700 xl:flex">
          {menuItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="transition hover:text-emerald-700"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex min-w-28 items-center justify-between gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:border-emerald-600"
            >
              {currentLanguage}

              <ChevronDown
                size={16}
                className={`transition ${
                  languageOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {languageOpen && (
              <div className="absolute right-0 top-12 z-50 w-44 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-2xl">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => changeLanguage(item.code)}
                    className="block w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="#admissions"
            className="rounded-xl bg-emerald-800 px-5 py-3 font-bold text-white shadow-md transition hover:bg-emerald-950"
          >
            {t("nav.trial")}
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-900 lg:hidden"
        >
          {mobileOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-emerald-100 bg-white px-5 py-6 shadow-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"
              >
                {item.label}
              </a>
            ))}
          </div>

          <select
            value={language}
            onChange={(event) =>
              setLanguage(event.target.value as LanguageCode)
            }
            className="mt-5 w-full rounded-lg border border-gray-200 bg-white px-4 py-3"
          >
            {languages.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>

          <a
            href="#admissions"
            onClick={() => setMobileOpen(false)}
            className="mt-5 block rounded-xl bg-emerald-800 px-5 py-3 text-center font-bold text-white"
          >
            {t("nav.trial")}
          </a>
        </div>
      )}
    </nav>
  );
}