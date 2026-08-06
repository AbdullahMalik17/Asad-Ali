"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, ArrowRight, HelpCircle } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const defaultFaqs = [
  {
    q: "How do online Quran classes work?",
    a: "Classes are conducted live through Zoom, Google Meet or another suitable platform. Each student receives one-to-one attention from a qualified teacher.",
  },
  {
    q: "Do you provide male and female Quran teachers?",
    a: "Yes. We have more than 50 qualified male and female teachers. Students may select a teacher according to their preference.",
  },
  {
    q: "Is a free trial class available?",
    a: "Yes. Every new student can book a free trial class before completing admission.",
  },
  {
    q: "Which courses are available?",
    a: "We offer Noorani Qaida, Quran Reading, Tajweed, Hifz-ul-Quran, Translation, Tafseer, Arabic Language, Islamic Studies and special programs for children.",
  },
  {
    q: "Can students choose flexible class timings?",
    a: "Yes. We provide flexible morning, evening and weekend timings according to the student's country and time zone.",
  },
  {
    q: "Are classes available for adults?",
    a: "Yes. Our courses are available for children, adults, beginners and advanced learners.",
  },
];

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const faqItems = useMemo(() => defaultFaqs, []);

  return (
    <section className="py-12 sm:py-16 bg-white overflow-hidden" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-800 border border-emerald-200">
            <HelpCircle size={14} className="text-emerald-700" aria-hidden="true" />
            {t("faq.title")}
          </span>
          <h2 className="text-3xl font-black text-emerald-950 sm:text-4xl lg:text-5xl mt-2 tracking-tight">
            {t("faq.heading")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            {t("faq.description")}
          </p>
        </motion.div>

        <div className="space-y-3.5">
          {faqItems.map((faq: { q: string; a: string }, idx: number) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-emerald-500 bg-emerald-50/40 shadow-md"
                    : "border-gray-200 bg-white hover:border-emerald-300 hover:bg-gray-50/50"
                }`}
              >
                <button
                  type="button"
                  id={`faq-question-${idx}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  onClick={() => toggleFAQ(idx)}
                  className="flex w-full items-center justify-between p-5 text-left font-bold text-emerald-950 sm:text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 rounded-2xl"
                >
                  <span className="pr-4">{faq.q}</span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen
                        ? "bg-emerald-800 text-white rotate-180"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    <ChevronDown size={18} aria-hidden="true" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`faq-question-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-sm leading-relaxed text-gray-600 sm:text-base border-t border-emerald-100/60 mt-1">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mt-12 overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 px-6 py-10 text-center text-white shadow-2xl backdrop-blur-xl sm:px-10 sm:py-12"
        >
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />

          <h3 className="text-2xl font-black text-white sm:text-3xl">
            Still Have a Question?
          </h3>

          <p className="mt-2.5 text-xs sm:text-sm text-emerald-100/90 font-medium">
            Contact our admission team on WhatsApp for guidance.
          </p>

          <a
            href="https://wa.me/923301676985?text=Assalamualaikum%2C%20I%20have%20a%20question%20about%20your%20online%20Quran%20classes."
            target="_blank"
            rel="noreferrer"
            className="group mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 px-8 py-3.5 font-black text-emerald-950 shadow-[0_10px_25px_-5px_rgba(251,191,36,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_35px_-5px_rgba(251,191,36,0.6)]"
          >
            <span>Ask on WhatsApp</span>
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}