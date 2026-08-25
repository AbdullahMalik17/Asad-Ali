"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  Check,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  CreditCard,
  Percent,
  Clock,
  Calendar,
  Zap,
} from "lucide-react";
import PaymentGatewayModal from "./PaymentGatewayModal";

interface CurrencyOption {
  code: string;
  symbol: string;
  label: string;
  flag: string;
  base30MinPerDay: number; // monthly rate per day/week for 30m class
  multiplier45Min: number;
}

const CURRENCIES: Record<string, CurrencyOption> = {
  USD: { code: "USD", symbol: "$", label: "USD ($)", flag: "🇺🇸", base30MinPerDay: 12, multiplier45Min: 1.4 },
  GBP: { code: "GBP", symbol: "£", label: "GBP (£)", flag: "🇬🇧", base30MinPerDay: 10, multiplier45Min: 1.4 },
  CAD: { code: "CAD", symbol: "C$", label: "CAD (C$)", flag: "🇨🇦", base30MinPerDay: 16, multiplier45Min: 1.4 },
  AUD: { code: "AUD", symbol: "A$", label: "AUD (A$)", flag: "🇦🇺", base30MinPerDay: 18, multiplier45Min: 1.4 },
  EUR: { code: "EUR", symbol: "€", label: "EUR (€)", flag: "🇪🇺", base30MinPerDay: 11, multiplier45Min: 1.4 },
  AED: { code: "AED", symbol: "AED", label: "AED (د.إ)", flag: "🇦🇪", base30MinPerDay: 45, multiplier45Min: 1.4 },
  PKR: { code: "PKR", symbol: "Rs.", label: "PKR (Rs.)", flag: "🇵🇰", base30MinPerDay: 1800, multiplier45Min: 1.4 },
};

const FREQUENCIES = [
  { days: 2, label: "2 Days / Week", classesPerMonth: 8, popular: false, desc: "Light pace for beginners & toddlers" },
  { days: 3, label: "3 Days / Week", classesPerMonth: 12, popular: true, desc: "Recommended for steady Tajweed progress" },
  { days: 4, label: "4 Days / Week", classesPerMonth: 16, popular: false, desc: "Ideal for active Quran Reading (Nazra)" },
  { days: 5, label: "5 Days / Week", classesPerMonth: 20, popular: false, desc: "Intensive Hifz & daily memorization" },
];

export default function PricingCalculator() {
  const [currency, setCurrency] = useState<string>("USD");
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
  const [durationMinutes, setDurationMinutes] = useState<number>(30);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  // Calculate standard monthly price
  const baseMonthlyPrice = useMemo(() => {
    let price = curr.base30MinPerDay * daysPerWeek;
    if (durationMinutes === 45) {
      price = Math.round(price * curr.multiplier45Min);
    }
    return price;
  }, [curr, daysPerWeek, durationMinutes]);

  // Sibling discount price (15% off)
  const siblingMonthlyPrice = useMemo(() => {
    return Math.round(baseMonthlyPrice * 0.85);
  }, [baseMonthlyPrice]);

  const selectedFreq = FREQUENCIES.find((f) => f.days === daysPerWeek) || FREQUENCIES[1];

  return (
    <section
      className="relative py-16 sm:py-24 bg-islamic-pattern text-white overflow-hidden"
      id="pricing"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/3 w-[35rem] h-[35rem] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[35rem] h-[35rem] bg-emerald-600/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-amber-300 backdrop-blur-md shadow-sm">
            <Calculator size={14} className="text-amber-400" />
            Transparent & Affordable Tuition
          </span>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl tracking-tight">
            Estimate Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
              Custom Learning Plan
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
            No registration fees, no hidden costs. Change or cancel anytime with
            our 100% money-back satisfaction guarantee.
          </p>
        </div>

        {/* 21st Dynamic Pricing Console Card */}
        <div className="mx-auto max-w-4xl rounded-3xl bg-white text-slate-900 p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-white/20 relative overflow-hidden">
          {/* Top Gold Foil Stripe */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />

          {/* Region / Currency Switcher */}
          <div className="pb-8 border-b border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Step 1: Select Your Country Currency
                </span>
                <p className="text-sm font-extrabold text-emerald-950">
                  Current Region: {curr.label}
                </p>
              </div>
            </div>

            {/* Currency Badges */}
            <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
              {Object.values(CURRENCIES).map((c) => {
                const isSelected = c.code === currency;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setCurrency(c.code)}
                    className={`py-2.5 px-3 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-emerald-800 bg-emerald-950 text-white shadow-md font-black"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-500 hover:bg-emerald-50 font-bold"
                    }`}
                  >
                    <span className="text-base block">{c.flag}</span>
                    <span className="text-xs mt-0.5 block">{c.code}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Class Frequency & Duration Controls */}
          <div className="py-8 border-b border-slate-200 grid lg:grid-cols-12 gap-6">
            {/* Days per week */}
            <div className="lg:col-span-8">
              <span className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
                Step 2: Choose Weekly Schedule Frequency
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {FREQUENCIES.map((freq) => {
                  const isSelected = daysPerWeek === freq.days;
                  return (
                    <button
                      key={freq.days}
                      type="button"
                      onClick={() => setDaysPerWeek(freq.days)}
                      className={`relative p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "border-emerald-700 bg-emerald-950 text-white shadow-lg ring-2 ring-emerald-600/30"
                          : "border-slate-200 bg-slate-50 text-slate-800 hover:border-emerald-400 hover:bg-emerald-50/50"
                      }`}
                    >
                      {freq.popular && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 text-emerald-950 px-2 py-0.5 text-[9px] font-black tracking-wide uppercase shadow-sm">
                          Most Popular
                        </span>
                      )}
                      <p className="text-sm font-black">{freq.label}</p>
                      <p
                        className={`text-[11px] mt-0.5 font-bold ${
                          isSelected ? "text-amber-300" : "text-emerald-800"
                        }`}
                      >
                        {freq.classesPerMonth} Classes/mo
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Session duration */}
            <div className="lg:col-span-4">
              <span className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
                Step 3: Session Duration
              </span>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDurationMinutes(30)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    durationMinutes === 30
                      ? "border-emerald-700 bg-emerald-950 text-white shadow-md font-black"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-bold"
                  }`}
                >
                  <Clock size={16} className="mx-auto mb-1 text-amber-400" />
                  <span className="text-xs block font-extrabold">30 Mins</span>
                  <span className="text-[10px] opacity-80 block">Standard</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDurationMinutes(45)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    durationMinutes === 45
                      ? "border-emerald-700 bg-emerald-950 text-white shadow-md font-black"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-bold"
                  }`}
                >
                  <Clock size={16} className="mx-auto mb-1 text-amber-400" />
                  <span className="text-xs block font-extrabold">45 Mins</span>
                  <span className="text-[10px] opacity-80 block">Extended</span>
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Output & Instant Actions */}
          <div className="pt-8 grid md:grid-cols-12 gap-8 items-center">
            {/* Price Output */}
            <div className="md:col-span-6 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-900 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300">
                <Sparkles size={14} className="text-amber-600" />
                <span>15% Sibling Discount Automatically Available</span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                  {curr.symbol} {baseMonthlyPrice}
                </span>
                <span className="text-sm font-bold text-slate-500">
                  / Month (1st Student)
                </span>
              </div>

              <div className="text-xs text-slate-600 font-medium space-y-1">
                <p className="flex items-center gap-1.5 text-emerald-900 font-bold">
                  <Percent size={14} className="text-amber-600" />
                  <span>
                    Second child rate: {curr.symbol} {siblingMonthlyPrice} / Month
                  </span>
                </p>
                <p className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-700" />
                  <span>Includes 1-on-1 Certified Teacher + Free Rescheduling</span>
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="md:col-span-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setIsPaymentModalOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-emerald-950 hover:bg-emerald-900 px-6 py-4 text-sm font-black text-white shadow-xl transition-all hover:scale-105 cursor-pointer"
              >
                <CreditCard size={18} className="text-amber-400" />
                <span>Pay Tuition Online</span>
              </button>

              <a
                href="#admissions"
                className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-6 py-4 text-sm font-black text-emerald-950 shadow-gold-glow transition-all hover:scale-105"
              >
                <span>Book 3-Day Free Trial</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Confidence Under Pricing */}
        <div className="mt-10 grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto text-center">
          <div className="p-5 rounded-3xl bg-emerald-900/40 border border-emerald-500/20 backdrop-blur-md">
            <ShieldCheck size={24} className="mx-auto text-amber-400 mb-2" />
            <h4 className="font-bold text-white text-sm">
              100% Risk-Free Guarantee
            </h4>
            <p className="text-xs text-emerald-100/80 mt-1">
              Attend 3 live 1-on-1 trial classes completely free. If not satisfied, no obligation.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-emerald-900/40 border border-emerald-500/20 backdrop-blur-md">
            <Zap size={24} className="mx-auto text-amber-400 mb-2" />
            <h4 className="font-bold text-white text-sm">
              Flexible Rescheduling
            </h4>
            <p className="text-xs text-emerald-100/80 mt-1">
              Easily adjust class times or pause lessons during family exams and travels.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-emerald-900/40 border border-emerald-500/20 backdrop-blur-md">
            <Sparkles size={24} className="mx-auto text-amber-400 mb-2" />
            <h4 className="font-bold text-white text-sm">
              Male & Female Scholars
            </h4>
            <p className="text-xs text-emerald-100/80 mt-1">
              Dedicated certified female scholars (Alimahs) available for sisters & daughters.
            </p>
          </div>
        </div>
      </div>

      {/* Integrated Multi-Gateway Payment Modal */}
      <PaymentGatewayModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        packageDetails={{
          name: `Standard Plan (${daysPerWeek} Days/wk - ${durationMinutes} mins)`,
          amount: baseMonthlyPrice,
          currency: currency,
          classesPerWeek: daysPerWeek,
          durationMinutes: durationMinutes,
        }}
      />
    </section>
  );
}
