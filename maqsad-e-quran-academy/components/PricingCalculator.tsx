"use client";

import React, { useState } from "react";
import { Calculator, Check, Sparkles, ShieldCheck, ArrowRight, CreditCard } from "lucide-react";
import PaymentGatewayModal from "./PaymentGatewayModal";

interface CurrencyOption {
  code: string;
  symbol: string;
  label: string;
  base30MinPerDay: number; // monthly rate per day/week for 30m class
  multiplier45Min: number;
}

const CURRENCIES: Record<string, CurrencyOption> = {
  USD: { code: "USD", symbol: "$", label: "USD ($)", base30MinPerDay: 12, multiplier45Min: 1.4 },
  GBP: { code: "GBP", symbol: "£", label: "GBP (£)", base30MinPerDay: 10, multiplier45Min: 1.4 },
  EUR: { code: "EUR", symbol: "€", label: "EUR (€)", base30MinPerDay: 11, multiplier45Min: 1.4 },
  CAD: { code: "CAD", symbol: "C$", label: "CAD (C$)", base30MinPerDay: 16, multiplier45Min: 1.4 },
  AUD: { code: "AUD", symbol: "A$", label: "AUD (A$)", base30MinPerDay: 18, multiplier45Min: 1.4 },
  AED: { code: "AED", symbol: "AED", label: "AED (د.إ)", base30MinPerDay: 45, multiplier45Min: 1.4 },
  PKR: { code: "PKR", symbol: "Rs.", label: "PKR (Rs.)", base30MinPerDay: 1800, multiplier45Min: 1.4 },
};

const FREQUENCIES = [
  { days: 2, label: "2 Days / Week", classesPerMonth: 8, popular: false },
  { days: 3, label: "3 Days / Week", classesPerMonth: 12, popular: true },
  { days: 4, label: "4 Days / Week", classesPerMonth: 16, popular: false },
  { days: 5, label: "5 Days / Week", classesPerMonth: 20, popular: false },
];

export default function PricingCalculator() {
  const [currency, setCurrency] = useState<string>("USD");
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
  const [durationMinutes, setDurationMinutes] = useState<number>(30);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const curr = CURRENCIES[currency] || CURRENCIES.USD;
  
  // Calculate price
  let monthlyPrice = curr.base30MinPerDay * daysPerWeek;
  if (durationMinutes === 45) {
    monthlyPrice = Math.round(monthlyPrice * curr.multiplier45Min);
  }

  const selectedFreq = FREQUENCIES.find((f) => f.days === daysPerWeek) || FREQUENCIES[1];

  return (
    <section className="relative py-16 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white overflow-hidden" id="pricing">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-300 border border-amber-300/30">
            <Calculator className="w-3.5 h-3.5" />
            Transparent & Affordable
          </span>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl mt-3">
            Estimate Your <span className="text-amber-400">Class Plan & Tuition</span>
          </h2>
          <p className="mt-3 text-base text-emerald-100/90 leading-relaxed sm:text-lg">
            Choose your preferred country currency, schedule frequency, and lesson duration. No registration fee or long-term commitment required.
          </p>
        </div>

        {/* Interactive Pricing Card */}
        <div className="max-w-4xl mx-auto bg-white text-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/20 relative overflow-hidden">
          
          {/* Top Currency & Class Duration Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-slate-200">
            
            {/* Currency Selector */}
            <div>
              <label htmlFor="currency-select" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Select Your Currency / Region
              </label>
              <select
                id="currency-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                aria-label="Select Your Currency or Region"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                {Object.values(CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Duration Selector */}
            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Select Class Duration
              </span>
              <div className="grid grid-cols-2 gap-3" role="group" aria-label="Select Class Duration">
                <button
                  type="button"
                  aria-pressed={durationMinutes === 30}
                  onClick={() => setDurationMinutes(30)}
                  className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                    durationMinutes === 30
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  30 Minutes / Session
                </button>
                
                <button
                  type="button"
                  aria-pressed={durationMinutes === 45}
                  onClick={() => setDurationMinutes(45)}
                  className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                    durationMinutes === 45
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  45 Minutes / Session
                </button>
              </div>
            </div>

          </div>

          {/* Days Per Week Selector */}
          <div className="py-8 border-b border-slate-200">
            <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Classes Per Week
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" role="group" aria-label="Select classes per week">
              {FREQUENCIES.map((freq) => (
                <button
                  key={freq.days}
                  type="button"
                  aria-pressed={daysPerWeek === freq.days}
                  onClick={() => setDaysPerWeek(freq.days)}
                  className={`relative py-4 px-3 rounded-2xl border text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                    daysPerWeek === freq.days
                      ? "border-emerald-600 bg-emerald-800 text-white shadow-lg ring-2 ring-emerald-600/30"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50/50"
                  }`}
                >
                  {freq.popular && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 text-emerald-950 px-2.5 py-0.5 text-[10px] font-extrabold tracking-wide uppercase shadow-xs">
                      Most Popular
                    </span>
                  )}
                  <p className="text-base font-extrabold">{freq.label}</p>
                  <p className={`text-[11px] mt-0.5 font-medium ${daysPerWeek === freq.days ? "text-emerald-100" : "text-slate-500"}`}>
                    {freq.classesPerMonth} Classes / Month
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Output & Trial CTA */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
                Special 15% Family Discount for 2nd Sibling
              </span>
              
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                  {curr.symbol} {monthlyPrice}
                </span>
                <span className="text-sm font-semibold text-slate-500">/ Month</span>
              </div>
              
              <p className="mt-1 text-xs text-slate-500 font-medium flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 inline" aria-hidden="true" />
                Includes 1-on-1 Tutor + Flexible Rescheduling + 3-Day Free Trial
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <button
                type="button"
                aria-label="Pay tuition online"
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 hover:bg-emerald-600 px-6 py-4 text-base font-extrabold text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
              >
                <CreditCard className="w-5 h-5 text-amber-300" aria-hidden="true" />
                <span>Pay Tuition Online</span>
              </button>

              <a
                href="#admissions"
                aria-label="Book 3-Day Free Trial Class"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-6 py-4 text-base font-extrabold text-emerald-950 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
              >
                <span>Book 3-Day Free Trial</span>
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

        </div>

        {/* Value Highlights under Pricing */}
        <div className="mt-10 grid sm:grid-cols-3 gap-6 text-center max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-500/20 backdrop-blur-md">
            <h4 className="font-bold text-amber-300 text-sm">No Credit Card Needed</h4>
            <p className="text-xs text-emerald-100/80 mt-1">Take 3 full trial classes completely free before making any commitment.</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-500/20 backdrop-blur-md">
            <h4 className="font-bold text-amber-300 text-sm">Male & Female Tutors</h4>
            <p className="text-xs text-emerald-100/80 mt-1">Dedicated female scholars for sisters and daughters upon request.</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-500/20 backdrop-blur-md">
            <h4 className="font-bold text-amber-300 text-sm">Custom Lesson Plans</h4>
            <p className="text-xs text-emerald-100/80 mt-1">Schedules tailored to your local timezone (US, UK, CA, AU, UAE, PK).</p>
          </div>
        </div>

      </div>

      {/* Multi-gateway Payment Modal */}
      <PaymentGatewayModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        packageDetails={{
          name: `Custom Plan (${daysPerWeek} Days/wk - ${durationMinutes} mins)`,
          amount: monthlyPrice,
          currency: currency,
          classesPerWeek: daysPerWeek,
          durationMinutes: durationMinutes,
        }}
      />
    </section>
  );
}
