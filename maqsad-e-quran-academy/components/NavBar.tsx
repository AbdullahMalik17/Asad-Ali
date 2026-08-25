"use client";

import Image from "next/image";
import { ChevronDown, Menu, X, Globe, User, ArrowRight, Sparkles } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import { LanguageCode, useLanguage } from "./LanguageProvider";

const languages: {
  code: LanguageCode;
  label: string;
  native: string;
}[] = [
  { code: "en", label: "English", native: "English" },
  { code: "ur", label: "Urdu", native: "اردو" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "fa", label: "Persian", native: "فارسی" },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const { language, setLanguage, t } = useLanguage();

  const menuItems = useMemo(
    () => [
      { label: "Programs", href: "/#programs" },
      { label: "Tuition", href: "/#pricing" },
      { label: "Tutors", href: "/#teachers" },
      { label: "Admissions", href: "/#admissions" },
      { label: "Why Us", href: "/#why-choose" },
      { label: "Reviews", href: "/#reviews" },
      { label: "FAQ", href: "/#faq" },
      { label: "Blog", href: "/blog" },
    ],
    []
  );

  const currentLangObj =
    languages.find((item) => item.code === language) || languages[0];

  const changeLanguage = useCallback(
    (code: LanguageCode) => {
      setLanguage(code);
      setLanguageOpen(false);
    },
    [setLanguage]
  );

  return (
    <nav
      aria-label="Main Navigation"
      className="sticky top-0 z-50 border-b border-emerald-900/10 bg-white/95 backdrop-blur-xl shadow-xs transition-all duration-300"
    >
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Academy Crest Logo & Title */}
        <a
          href="/#home"
          aria-label="Maqsad-e-Quran Academy Official Website"
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-xl"
        >
          <div className="relative h-14 w-16 shrink-0 transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-20">
            <Image
              src="/logo.png"
              alt="Maqsad-e-Quran Academy Official Logo"
              fill
              priority
              className="object-contain"
            />
          </div>

          <div>
            <h2 className="text-lg font-black tracking-tight text-emerald-950 sm:text-2xl flex items-center gap-1.5">
              <span>Maqsad-e-Quran</span>
            </h2>
            <p className="text-[11px] font-black tracking-wider text-amber-700 uppercase sm:text-xs">
              Global Online Quran Academy
            </p>
          </div>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-5 font-bold text-slate-700 lg:flex xl:gap-7">
          {menuItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative py-2 text-xs sm:text-sm font-bold text-slate-700 transition-colors hover:text-emerald-900 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-amber-500 to-emerald-700 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Right Action Cluster: Language Switcher, Portal, Trial Button */}
        <div className="hidden items-center gap-2.5 lg:flex">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              aria-label={`Select language, currently ${currentLangObj.label}`}
              aria-expanded={languageOpen}
              aria-haspopup="true"
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-800 transition hover:border-emerald-500 hover:bg-emerald-50/50 cursor-pointer"
            >
              <Globe size={14} className="text-emerald-700" />
              <span>{currentLangObj.native}</span>
              <ChevronDown
                size={13}
                className={`text-slate-500 transition-transform duration-200 ${
                  languageOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {languageOpen && (
              <div
                role="menu"
                className="absolute right-0 top-11 z-50 w-40 overflow-hidden rounded-2xl border border-slate-200 bg-white py-1.5 shadow-2xl animate-in fade-in slide-in-from-top-2"
              >
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    role="menuitem"
                    onClick={() => changeLanguage(item.code)}
                    className="flex w-full items-center justify-between px-3.5 py-2 text-left text-xs font-bold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-900 cursor-pointer"
                  >
                    <span>{item.native} ({item.label})</span>
                    {language === item.code && (
                      <span className="text-emerald-600 font-black">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Portal Login */}
          <a
            href="/login"
            aria-label="Student and Teacher Portal Login"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-black text-emerald-950 transition hover:border-emerald-600 hover:bg-emerald-50/60"
          >
            <User size={14} className="text-emerald-800" />
            <span>Portal Login</span>
          </a>

          {/* High-Conversion Book Trial CTA */}
          <a
            href="#admissions"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-5 py-2.5 text-xs sm:text-sm font-black text-emerald-950 shadow-md transition-all duration-300 hover:shadow-gold-glow hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>Book 3-Day Free Trial</span>
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-950 shadow-xs ring-1 ring-emerald-200/60 transition hover:bg-emerald-100 lg:hidden cursor-pointer"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white/98 px-5 py-6 shadow-2xl backdrop-blur-2xl lg:hidden animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-1.5">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-bold text-slate-800 transition hover:bg-emerald-50 hover:text-emerald-950"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="mt-5 border-t border-slate-100 pt-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <a
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 py-3 text-xs font-black text-slate-900"
              >
                <User size={14} className="text-emerald-700" />
                <span>Portal Login</span>
              </a>

              <select
                aria-label="Select language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs font-bold text-slate-900"
              >
                {languages.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.native} ({item.label})
                  </option>
                ))}
              </select>
            </div>

            <a
              href="#admissions"
              onClick={() => setMobileOpen(false)}
              className="block w-full rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 py-3.5 text-center text-sm font-black text-emerald-950 shadow-gold-glow"
            >
              Book 3-Day Free Trial
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}