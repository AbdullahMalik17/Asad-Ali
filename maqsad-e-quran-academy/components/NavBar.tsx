"use client";

import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
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

  const menuItems = useMemo(
    () => [
      { label: t("nav.home") || "Home", href: "/#home" },
      { label: t("nav.about") || "About", href: "/#about" },
      { label: t("nav.courses") || "Courses", href: "/#courses" },
      { label: "Tuition Fees", href: "/#pricing" },
      { label: t("nav.teachers") || "Teachers", href: "/#teachers" },
      { label: t("nav.admissions") || "Admissions", href: "/#admissions" },
      { label: t("nav.reviews") || "Reviews", href: "/#reviews" },
      { label: t("nav.contact") || "Contact", href: "/#contact" },
      { label: "Blog", href: "/blog" },
    ],
    [t]
  );

  const currentLanguage =
    languages.find((item) => item.code === language)?.label ??
    "English";

  const changeLanguage = useCallback(
    (code: LanguageCode) => {
      setLanguage(code);
      setLanguageOpen(false);
    },
    [setLanguage]
  );

  return (
    <nav aria-label="Main Navigation" className="sticky top-0 z-50 border-b border-emerald-900/10 bg-white/90 shadow-sm backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a
          href="/#home"
          aria-label="Maqsad-e-Quran Academy Home"
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 rounded-xl"
        >
          <div className="relative h-14 w-16 shrink-0 transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-20">
            <Image
              src="/logo.png"
              alt="Maqsad-e-Quran Academy Logo"
              fill
              priority
              className="object-contain"
            />
          </div>

          <div>
            <h2 className="text-lg font-extrabold tracking-tight text-emerald-950 sm:text-2xl">
              Maqsad-e-Quran
            </h2>

            <p className="text-[11px] font-bold tracking-wider text-amber-600 uppercase sm:text-xs">
              Online Quran Academy
            </p>
          </div>
        </a>

        {/* Desktop Menu - visible on lg screens and up */}
        <ul className="hidden items-center gap-5 font-semibold text-gray-700 lg:flex lg:gap-6">
          {menuItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative py-2 text-sm font-semibold text-gray-700 transition-colors hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 rounded-md group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Language selector & CTA button */}
        <div className="hidden items-center gap-3 lg:flex">
          <div className="relative">
            <button
              type="button"
              aria-label={`Select language, currently ${currentLanguage}`}
              aria-expanded={languageOpen}
              aria-haspopup="true"
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex min-w-28 items-center justify-between gap-2 rounded-xl border border-emerald-200/80 bg-emerald-50/50 px-3.5 py-2 text-xs font-semibold text-emerald-900 transition hover:border-emerald-500 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true">🌐</span> {currentLanguage}
              </span>

              <ChevronDown
                size={14}
                aria-hidden="true"
                className={`transition-transform duration-200 ${
                  languageOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {languageOpen && (
              <div role="menu" className="absolute right-0 top-12 z-50 w-44 overflow-hidden rounded-2xl border border-emerald-100 bg-white py-2 shadow-2xl animate-in fade-in slide-in-from-top-2">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    role="menuitem"
                    aria-label={`Switch language to ${item.label}`}
                    onClick={() => changeLanguage(item.code)}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  >
                    <span>{item.label}</span>
                    {language === item.code && (
                      <span className="text-emerald-600 font-bold" aria-hidden="true">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="/login"
            aria-label="Student and Teacher Portal Login"
            className="flex items-center gap-1.5 rounded-xl border border-emerald-800/20 bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-900 transition hover:border-emerald-700 hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            <span>Portal Login</span>
          </a>

          <a
            href="#admissions"
            aria-label="Book a free trial Quran class"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-900 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:from-emerald-700 hover:to-emerald-900 hover:shadow-lg hover:shadow-emerald-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>{t("nav.trial")}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-900 shadow-sm ring-1 ring-emerald-200/50 transition hover:bg-emerald-100 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="border-t border-emerald-100 bg-white/98 px-5 py-6 shadow-2xl backdrop-blur-xl lg:hidden animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-1.5">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 font-semibold text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-800 active:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="mt-5 border-t border-gray-100 pt-4">
            <label htmlFor="mobile-lang-select" className="mb-2 block text-xs font-semibold text-gray-500 uppercase">
              Language / زبان
            </label>
            <select
              id="mobile-lang-select"
              aria-label="Select language"
              value={language}
              onChange={(event) =>
                setLanguage(event.target.value as LanguageCode)
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
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
              aria-label="Book a free trial class"
              className="mt-4 block w-full rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-950 px-5 py-3.5 text-center font-bold text-white shadow-md transition hover:from-emerald-700 hover:to-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              {t("nav.trial")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}