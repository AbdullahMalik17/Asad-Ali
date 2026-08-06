"use client";

import { motion } from "framer-motion";
import { Globe2, MapPin, Sparkles } from "lucide-react";

const countries = [
  "Pakistan",
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Saudi Arabia",
  "United Arab Emirates",
  "Qatar",
  "Germany",
  "France",
  "Turkey",
  "Malaysia",
];

export default function Countries() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fbf8f0] via-[#f4efe0] to-[#fbf8f0] py-16 sm:py-24">
      {/* Ambient background glows */}
      <div className="absolute top-10 -left-20 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-amber-300 shadow-[0_0_20px_rgba(16,185,129,0.35)] ring-2 ring-amber-400/40">
            <Globe2 size={32} strokeWidth={2} />
          </div>

          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-100/80 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-amber-700 backdrop-blur-md shadow-sm">
            <Sparkles size={14} className="text-amber-600" />
            Global Quran Community
          </span>

          <h2 className="mt-3 text-3xl font-black text-emerald-950 sm:text-4xl lg:text-5xl">
            Serving Students{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
              Across the World
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            Our online Quran classes are available worldwide with flexible
            timings for different countries and time zones.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {countries.map((country, idx) => (
            <motion.div
              key={country}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group flex items-center gap-3.5 rounded-2xl border border-amber-200/80 bg-white/80 p-4 shadow-md backdrop-blur-xl transition-all duration-300 hover:border-amber-400 hover:shadow-[0_10px_25px_-5px_rgba(16,185,129,0.2)]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100/80 text-emerald-800 transition-colors group-hover:bg-amber-400 group-hover:text-emerald-950">
                <MapPin size={20} strokeWidth={2} />
              </div>

              <p className="font-bold text-emerald-950 text-sm group-hover:text-emerald-900 transition-colors">
                {country}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mt-12 grid gap-6 rounded-3xl border border-amber-400/30 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 p-7 text-center text-white shadow-2xl backdrop-blur-xl sm:grid-cols-3 sm:p-10"
        >
          <div className="space-y-1">
            <p className="text-4xl sm:text-5xl font-black text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]">35+</p>
            <p className="text-xs sm:text-sm font-bold text-emerald-100/90 uppercase tracking-wider">
              Countries Served
            </p>
          </div>

          <div className="border-white/10 sm:border-x py-4 sm:py-0 space-y-1">
            <p className="text-4xl sm:text-5xl font-black text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]">5000+</p>
            <p className="text-xs sm:text-sm font-bold text-emerald-100/90 uppercase tracking-wider">
              Students Worldwide
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-4xl sm:text-5xl font-black text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]">24/7</p>
            <p className="text-xs sm:text-sm font-bold text-emerald-100/90 uppercase tracking-wider">
              Flexible Timings
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}