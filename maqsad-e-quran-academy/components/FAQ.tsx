"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles, MessageCircle, ArrowRight } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const FAQS_LIST: FAQItem[] = [
  {
    category: "Trial & Admissions",
    q: "How does the 3-Day Free Trial work? Is any credit card required?",
    a: "No credit card or payment information is ever required for the trial. Simply fill in the 60-second trial request form. Our academic coordinator will contact your WhatsApp within 2-4 hours to assign a certified male or female scholar based on your chosen schedule. You attend 3 full 1-on-1 live classes before deciding whether to enroll.",
  },
  {
    category: "Faculty & Safety",
    q: "Can sisters and young daughters request certified female teachers exclusively?",
    a: "Yes, absolutely. We have over 20+ dedicated, qualified female scholars (Alimahs and Hafizahs) who teach sisters and children in a 100% private, comfortable 1-on-1 online environment.",
  },
  {
    category: "Child Engagement",
    q: "How do you keep young children (ages 4-7) engaged during online classes?",
    a: "Our certified teachers specialize in early-childhood Islamic pedagogy. We utilize interactive digital Noorani Qaida whiteboards, visual Makharij flashcards, gentle positive reinforcement, and engaging 30-minute sessions that hold young children's attention without fatigue.",
  },
  {
    category: "Class Logistics",
    q: "What software is used for live classes, and what devices are supported?",
    a: "Classes are held live 1-on-1 via Zoom or Google Meet. You can join effortlessly from any iPad/tablet, laptop, desktop computer, or smartphone with a stable internet connection and microphone.",
  },
  {
    category: "Scheduling & Flexibility",
    q: "What if we miss a class or need to change our schedule due to exams or travel?",
    a: "We offer 100% flexible rescheduling. You can notify your tutor or the academy coordinator via WhatsApp to reschedule makeup sessions or temporarily freeze your subscription during school exams or holidays at no penalty.",
  },
  {
    category: "Tuition & Currencies",
    q: "Which international payment methods and currencies do you support?",
    a: "We support USD ($), GBP (£), CAD (C$), AUD (A$), EUR (€), AED (د.إ), and PKR (₨). Tuition can be paid securely via Credit/Debit Cards, PayPal, Stripe, Bank Wire, EasyPaisa, or JazzCash with automated monthly receipts.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-900 border border-emerald-300">
            <HelpCircle size={14} className="text-emerald-700" />
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-black text-emerald-950 sm:text-4xl lg:text-5xl mt-3 tracking-tight">
            Everything You Need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
              Know Before Enrolling
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Got questions? We have answers. Reach out to our 24/7 WhatsApp admissions desk anytime.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS_LIST.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-emerald-600 bg-emerald-50/50 shadow-md ring-1 ring-emerald-600/20"
                    : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50/60"
                }`}
              >
                <button
                  type="button"
                  id={`faq-question-${idx}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  onClick={() => toggleFAQ(idx)}
                  className="flex w-full items-center justify-between p-5 text-left font-bold text-emerald-950 sm:text-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                >
                  <span className="pr-4 font-black">{faq.q}</span>
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                      isOpen
                        ? "bg-emerald-950 text-amber-400 rotate-180"
                        : "bg-emerald-100 text-emerald-900"
                    }`}
                  >
                    <ChevronDown size={18} />
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
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-sm sm:text-base leading-relaxed text-slate-700 border-t border-emerald-200/60 mt-1 font-normal">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom WhatsApp Help Card */}
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 px-6 py-8 text-center text-white shadow-xl sm:px-10 sm:py-10">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />

          <h3 className="text-2xl font-black text-white sm:text-3xl">
            Have a Specific Question About Your Child?
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-emerald-100/90 font-medium">
            Our admissions team is available 24/7 on WhatsApp for immediate guidance.
          </p>

          <a
            href="https://wa.me/923301676985?text=Assalamualaikum%2C%20I%20have%20a%20question%20about%20your%20online%20Quran%20classes."
            target="_blank"
            rel="noreferrer noopener"
            className="group mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 px-8 py-3.5 font-black text-emerald-950 shadow-gold-glow hover:scale-105 transition-transform"
          >
            <MessageCircle size={18} className="text-emerald-950" />
            <span>Chat Live on WhatsApp</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}