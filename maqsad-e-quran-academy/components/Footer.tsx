import Image from "next/image";
import { Mail, MessageCircle, Phone, ArrowUpRight, Heart } from "lucide-react";

export default function Footer() {
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

            <p className="text-sm leading-relaxed text-emerald-100/90 pt-2">
              Authentic 1-on-1 online Quran classes for kids and adults worldwide with qualified male and female certified tutors.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-amber-300 font-semibold">
              <span>✦ Certified Teachers</span>
              <span>•</span>
              <span>24/7 Classes</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-400 border-b border-white/10 pb-2">
              Quick Navigation
            </h3>

            <ul className="mt-4 space-y-2.5 text-sm text-emerald-100/90">
              <li>
                <a href="#home" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>Courses</span>
                </a>
              </li>
              <li>
                <a href="#teachers" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>Faculty Tutors</span>
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>Student Reviews</span>
                </a>
              </li>
              <li>
                <a href="#admissions" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>Free Trial Class</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Featured Courses */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-400 border-b border-white/10 pb-2">
              Our Key Programs
            </h3>

            <ul className="mt-4 space-y-2.5 text-sm text-emerald-100/90">
              <li>
                <a href="#courses" className="hover:text-amber-300 transition-colors">
                  Noorani Qaida for Kids
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-amber-300 transition-colors">
                  Quran Reading (Nazra)
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-amber-300 transition-colors">
                  Tajweed Rules Course
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-amber-300 transition-colors">
                  Hifz-ul-Quran (Memorization)
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-amber-300 transition-colors">
                  Translation & Tafseer
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-amber-300 transition-colors">
                  Arabic Language Course
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-400 border-b border-white/10 pb-2">
              Contact & Support
            </h3>

            <div className="mt-4 space-y-3.5 text-sm text-emerald-100/90">
              <a
                href="tel:+923301676985"
                className="flex items-center gap-3 p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber-400/40 transition"
              >
                <Phone size={18} className="text-amber-400 shrink-0" />
                <span>+92 330 1676985</span>
              </a>

              <a
                href="mailto:maqsadquran@gmail.com"
                className="flex items-center gap-3 p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber-400/40 transition"
              >
                <Mail size={18} className="text-amber-400 shrink-0" />
                <span className="truncate">maqsadquran@gmail.com</span>
              </a>

              <a
                href="https://wa.me/923301676985"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-900 border border-emerald-500/30 hover:border-amber-400 text-white font-bold transition shadow-md group"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle size={18} className="text-amber-400" />
                  <span>WhatsApp 24/7</span>
                </div>
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200">
          <p>© 2026 Maqsad-e-Quran Academy. All rights reserved.</p>
          
          <p className="flex items-center gap-1">
            <span>Dedicated to spreading authentic Quranic knowledge</span>
            <Heart size={12} className="text-amber-400 fill-amber-400 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}