import Image from "next/image";
import { Mail, MessageCircle, Phone, ArrowUpRight, Heart, Sparkles, ChevronRight } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  const navItems = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.courses"), href: "#courses" },
    { name: t("nav.teachers"), href: "#teachers" },
    { name: t("nav.reviews"), href: "#reviews" },
    { name: t("nav.trial"), href: "#admissions" },
  ];

  const courseList = [
    t("courses.list.qaida.title"),
    t("courses.list.reading.title"),
    t("courses.list.tajweed.title"),
    t("courses.list.hifz.title"),
    t("courses.list.tafseer.title"),
    t("courses.list.arabic.title"),
  ];

  return (
    <footer className="relative bg-emerald-950 text-white overflow-hidden">
      {/* Decorative top gold gradient border */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 shadow-md" />

      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-14 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Maqsad-e-Quran Academy"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl font-black text-amber-400">
                  Maqsad-e-Quran
                </h2>
                <p className="text-xs font-bold tracking-wider text-emerald-200 uppercase">
                  Online Quran Academy
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-emerald-100/90 font-medium pt-1">
              {t("footer.aboutDesc")}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-amber-300 font-bold">
              <span className="flex items-center gap-1"><Sparkles size={12} className="text-amber-400" /> {t("hero.badge1")}</span>
              <span>•</span>
              <span>{t("hero.badge3")}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-amber-400 border-b border-white/10 pb-2.5">
              {t("footer.quickLinks")}
            </h3>

            <ul className="mt-4 space-y-2.5 text-sm text-emerald-100/90 font-medium">
              {navItems.map((item) => (
                <li key={item.href + item.name}>
                  <a href={item.href} className="group flex items-center gap-1.5 hover:text-amber-300 transition-all duration-300 hover:translate-x-1">
                    <ChevronRight size={14} className="text-amber-400/60 group-hover:text-amber-300 transition-colors" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Courses */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-amber-400 border-b border-white/10 pb-2.5">
              Our Key Programs
            </h3>

            <ul className="mt-4 space-y-2.5 text-sm text-emerald-100/90 font-medium">
              {[
                "Noorani Qaida for Kids",
                "Quran Reading (Nazra)",
                "Tajweed Rules Course",
                "Hifz-ul-Quran (Memorization)",
                "Translation & Tafseer",
                "Arabic Language Course",
              ].map((course) => (
                <li key={course}>
                  <a
                    href="#courses"
                    aria-label={`Explore course ${course}`}
                    className="group flex items-center gap-1.5 hover:text-amber-300 transition-all duration-300 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950 rounded-sm"
                  >
                    <ChevronRight size={14} className="text-amber-400/60 group-hover:text-amber-300 transition-colors" aria-hidden="true" />
                    <span>{course}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-amber-400 border-b border-white/10 pb-2.5">
              Contact & Support
            </h3>

            <div className="mt-4 space-y-3 text-sm text-emerald-100/90 font-medium">
              <a
                href="tel:+923301676985"
                aria-label="Call Maqsad-e-Quran Academy"
                className="flex items-center gap-3 p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-amber-400/50 hover:shadow-[0_0_20px_rgba(251,191,36,0.15)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
              >
                <Phone size={18} className="text-amber-400 shrink-0" aria-hidden="true" />
                <span>+92 330 1676985</span>
              </a>

              <a
                href="mailto:maqsadquran@gmail.com"
                aria-label="Email Maqsad-e-Quran Academy"
                className="flex items-center gap-3 p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-amber-400/50 hover:shadow-[0_0_20px_rgba(251,191,36,0.15)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
              >
                <Mail size={18} className="text-amber-400 shrink-0" aria-hidden="true" />
                <span className="truncate">maqsadquran@gmail.com</span>
              </a>

              <a
                href="https://wa.me/923301676985"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Chat with Maqsad-e-Quran Academy on WhatsApp 24/7"
                className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-900 to-emerald-950 border border-amber-400/40 hover:border-amber-400 text-white font-bold transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:scale-[1.02] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle size={18} className="text-amber-400" aria-hidden="true" />
                  <span>WhatsApp 24/7</span>
                </div>
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-amber-400" aria-hidden="true" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200 font-medium">
          <p>© 2026 Maqsad-e-Quran Academy. All rights reserved.</p>
          
          <p className="flex items-center gap-1.5">
            <span>Dedicated to spreading authentic Quranic knowledge</span>
            <Heart size={12} className="text-amber-400 fill-amber-400 inline" aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  );
}