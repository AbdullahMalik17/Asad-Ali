"use client";

import { motion } from "framer-motion";
import { Quote, Star, Sparkles, ArrowRight } from "lucide-react";

import { useLanguage } from "./LanguageProvider";

const reviews = [
  {
    name: "Sarah Khan",
    country: "Canada",
    review:
      "My children are learning Quran with Tajweed and their confidence has improved greatly. The teachers are patient, punctual and highly professional.",
  },
  {
    name: "Muhammad Ahmed",
    country: "United Kingdom",
    review:
      "The one-to-one classes are very effective. Flexible timings make it easy for our family to manage Quran lessons alongside school and work.",
  },
  {
    name: "Ayesha Rahman",
    country: "Australia",
    review:
      "I am very satisfied with the female Quran teacher. She teaches my daughter with kindness, clear pronunciation and regular revision.",
  },
];

export default function Reviews() {
  const { t } = useLanguage();

  return (
    <section id="reviews" className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/20 to-white py-16 sm:py-24">
      {/* Decorative background light Orbs */}
      <div className="absolute top-1/3 -left-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-20 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-100/80 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-amber-700 backdrop-blur-md shadow-sm">
            <Sparkles size={14} className="text-amber-600" />
            {t("reviews.subtitle")}
          </span>

          <h2 className="mt-3 text-3xl font-black text-emerald-950 sm:text-4xl lg:text-5xl">
            {t("reviews.title")}{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
              {t("reviews.highlight")}
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            {t("reviews.description")}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((item, idx) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl border border-emerald-100/90 bg-white/80 p-7 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-amber-400 hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.25)] flex flex-col justify-between"
            >
              {/* Shimmer line accent on top */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <Quote
                  size={42}
                  className="absolute right-6 top-6 text-amber-300/60 group-hover:text-amber-400 transition-colors"
                />

                <div className="flex gap-1 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={18} fill="currentColor" />
                  ))}
                </div>

                <p className="mt-6 text-sm sm:text-base leading-relaxed text-gray-700 font-medium italic">
                  “{item.review}”
                </p>
              </div>

              <div className="mt-8 border-t border-emerald-100/80 pt-5 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-emerald-950">
                    {item.name}
                  </h3>

                  <p className="text-xs font-extrabold text-amber-600">
                    {item.country}
                  </p>
                </div>

                <span className="rounded-full border border-emerald-300/40 bg-emerald-100/80 px-3 py-1 text-[11px] font-extrabold text-emerald-900 shadow-sm">
                  ✓ Verified Student
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="https://wa.me/923301676985?text=Assalamualaikum%2C%20I%20want%20to%20book%20a%20free%20trial%20Quran%20class."
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Book a free trial class on WhatsApp"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 border border-amber-400/40 px-8 py-3.5 font-black text-amber-300 shadow-xl transition-all duration-300 hover:border-amber-400 hover:bg-emerald-950 hover:shadow-[0_10px_30px_-5px_rgba(16,185,129,0.4)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
          >
            <span>Join Our Global Quran Community</span>
            <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 text-amber-400" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}