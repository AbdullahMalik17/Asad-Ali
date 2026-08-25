"use client";

import { motion } from "framer-motion";
import {
  FileText,
  UserCheck,
  Video,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
} from "lucide-react";

const ADMISSION_STEPS = [
  {
    stepNumber: "01",
    timeTag: "60 Seconds",
    title: "Submit Free Trial Form",
    description:
      "Fill in basic student details, WhatsApp number, course interest, and preferred tutor gender. No credit card or registration fee required.",
    icon: FileText,
  },
  {
    stepNumber: "02",
    timeTag: "2 - 4 Hours",
    title: "Schedule & Tutor Matching",
    description:
      "Our academic coordinator contacts you via WhatsApp to match your exact timezone, preferred days/time, and assigns a certified male or female scholar.",
    icon: UserCheck,
  },
  {
    stepNumber: "03",
    timeTag: "3 Full Days",
    title: "Attend 3-Day Free Live Classes",
    description:
      "Join interactive 1-on-1 live classes on Zoom. Experience teaching quality, patient Makharij correction, and child engagement firsthand.",
    icon: Video,
  },
  {
    stepNumber: "04",
    timeTag: "Lifelong Growth",
    title: "Confirm Enrollment & Progress",
    description:
      "If 100% satisfied, select your monthly frequency. Receive weekly student progress reports, parent portal access, and graduation certificates.",
    icon: GraduationCap,
  },
];

export default function AdmissionsRoadmap() {
  return (
    <section className="relative py-16 sm:py-24 bg-islamic-pattern text-white overflow-hidden" id="process">
      {/* Ambient background glows */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-amber-300 backdrop-blur-md shadow-sm">
            <Sparkles size={14} className="text-amber-400" />
            Simple 4-Step Process
          </span>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl tracking-tight">
            How Admission &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
              Free Trial Works
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
            Getting started takes less than 60 seconds with our zero-risk trial guarantee.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ADMISSION_STEPS.map((step, idx) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.stepNumber}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/80 hover:bg-white/15 hover:shadow-[0_20px_40px_-10px_rgba(251,191,36,0.25)]"
              >
                {/* Step number badge & icon */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 text-emerald-950 shadow-gold-glow group-hover:scale-110 transition-transform">
                      <Icon size={26} strokeWidth={2} />
                    </div>

                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-300/40 to-white/10 group-hover:from-amber-400 group-hover:to-amber-200 transition-all">
                      {step.stepNumber}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20 mb-3">
                    <Clock size={11} />
                    <span>{step.timeTag}</span>
                  </div>

                  <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-emerald-200 font-bold">
                  <span>Step {step.stepNumber} of 04</span>
                  <ShieldCheck size={14} className="text-amber-400" />
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-14 text-center">
          <a
            href="#admissions"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 px-8 py-4 font-black text-emerald-950 shadow-gold-glow hover:scale-105 transition-transform"
          >
            <span>Book 3-Day Free Trial (60 Sec)</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
