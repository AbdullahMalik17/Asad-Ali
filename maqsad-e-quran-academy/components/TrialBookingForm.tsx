"use client";

import { FormEvent, useState, useCallback } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useLanguage } from "./LanguageProvider";
import { sendTrialConfirmationEmail } from "@/lib/email-service";
import { sendWhatsAppTrialConfirmation } from "@/lib/whatsapp-notifier";
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Lock,
  User,
  Users,
  Phone,
  Mail,
  BookOpen,
  ArrowRight,
  UserCheck,
} from "lucide-react";

interface CountryCodeOption {
  code: string;
  dial: string;
  name: string;
  flag: string;
}

const COUNTRY_CODES: CountryCodeOption[] = [
  { code: "US", dial: "+1", name: "USA / Canada", flag: "🇺🇸" },
  { code: "GB", dial: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", dial: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "AE", dial: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "SA", dial: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "PK", dial: "+92", name: "Pakistan", flag: "🇵🇰" },
  { code: "QA", dial: "+974", name: "Qatar", flag: "🇶🇦" },
  { code: "KW", dial: "+965", name: "Kuwait", flag: "🇰🇼" },
  { code: "OM", dial: "+968", name: "Oman", flag: "🇴🇲" },
  { code: "DE", dial: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "FR", dial: "+33", name: "France", flag: "🇫🇷" },
  { code: "MY", dial: "+60", name: "Malaysia", flag: "🇲🇾" },
  { code: "SG", dial: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "ZA", dial: "+27", name: "South Africa", flag: "🇿🇦" },
];

export default function TrialBookingForm() {
  const { t, language } = useLanguage();

  const [studentName, setStudentName] = useState("");
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [countryDial, setCountryDial] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [course, setCourse] = useState("Noorani Qaida");
  const [preferredTutorGender, setPreferredTutorGender] = useState<"Male" | "Female">("Female");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setMessage("");
      setIsSuccess(false);

      if (!studentName.trim() || !parentName.trim() || !phoneNumber.trim()) {
        setMessage("Please fill in the required fields (Student Name, Parent Name, WhatsApp).");
        return;
      }

      const fullWhatsApp = `${countryDial} ${phoneNumber.trim()}`;

      try {
        setIsSubmitting(true);

        await addDoc(collection(db, "trialRequests"), {
          studentName: studentName.trim(),
          parentName: parentName.trim(),
          email: email.trim(),
          whatsapp: fullWhatsApp,
          countryDial,
          phoneRaw: phoneNumber.trim(),
          course,
          preferredTutorGender,
          language,
          status: "pending",
          source: "21st-royal-trial-form",
          createdAt: serverTimestamp(),
        });

        // Dispatch Email Notification if provided
        if (email.trim()) {
          try {
            await sendTrialConfirmationEmail({
              studentName: studentName.trim(),
              parentName: parentName.trim(),
              email: email.trim(),
              whatsapp: fullWhatsApp,
              course: `${course} (${preferredTutorGender} Tutor Requested)`,
              language,
            });
          } catch (emailErr) {
            console.warn("Trial confirmation email dispatch note:", emailErr);
          }
        }

        // Dispatch WhatsApp Notification
        if (phoneNumber.trim()) {
          try {
            await sendWhatsAppTrialConfirmation({
              toPhone: fullWhatsApp,
              studentName: studentName.trim(),
              parentName: parentName.trim(),
              course: `${course} (${preferredTutorGender} Tutor)`,
            });
          } catch (waErr) {
            console.warn("Trial confirmation WhatsApp dispatch note:", waErr);
          }
        }

        setIsSuccess(true);
        setMessage("Alhamdulillah! Your 3-Day Free Trial has been registered. Our academic coordinator will contact your WhatsApp within 2-4 hours.");
        setStudentName("");
        setParentName("");
        setEmail("");
        setPhoneNumber("");
      } catch (error) {
        console.error("Trial request error:", error);
        setIsSuccess(false);
        setMessage("Could not submit request. Please reach us directly via WhatsApp (+92 330 1676985).");
      } finally {
        setIsSubmitting(false);
      }
    },
    [studentName, parentName, email, countryDial, phoneNumber, course, preferredTutorGender, language]
  );

  return (
    <div className="w-full">
      {/* Top Form Header */}
      <div className="text-center pb-5 border-b border-emerald-950/10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-900 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Quick 60-Sec Enrollment</span>
        </div>
        <h2 className="mt-2 text-2xl font-black text-emerald-950 sm:text-3xl tracking-tight">
          Claim 3-Day Free Trial
        </h2>
        <p className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
          1-on-1 Live Class with Certified Scholars • No Credit Card Required
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        {/* Student Name */}
        <div>
          <label htmlFor="trial-student-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Student Name <span className="text-amber-600">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <User className="h-4 w-4" />
            </div>
            <input
              id="trial-student-name"
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Zayd / Maryam"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition duration-200 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>
        </div>

        {/* Parent / Guardian Name */}
        <div>
          <label htmlFor="trial-parent-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Parent / Guardian Name <span className="text-amber-600">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Users className="h-4 w-4" />
            </div>
            <input
              id="trial-parent-name"
              type="text"
              required
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              placeholder="e.g. Tariq Khan"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition duration-200 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>
        </div>

        {/* WhatsApp Phone with Country Code Selector */}
        <div>
          <label htmlFor="trial-phone-number" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            WhatsApp Number <span className="text-amber-600">*</span>
          </label>
          <div className="flex gap-2">
            <div className="w-32 shrink-0">
              <select
                aria-label="Country dial code"
                value={countryDial}
                onChange={(e) => setCountryDial(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-2.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 cursor-pointer"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.dial}>
                    {c.flag} {c.dial} ({c.code})
                  </option>
                ))}
              </select>
            </div>
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Phone className="h-4 w-4" />
              </div>
              <input
                id="trial-phone-number"
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="300 1234567"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition duration-200 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
          </div>
        </div>

        {/* Email Address (Optional) */}
        <div>
          <label htmlFor="trial-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Email Address <span className="text-slate-400 font-normal">(Optional for Zoom invite)</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="trial-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="parent@example.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition duration-200 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>
        </div>

        {/* Course Selection */}
        <div>
          <label htmlFor="trial-course" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Selected Course <span className="text-amber-600">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <BookOpen className="h-4 w-4" />
            </div>
            <select
              id="trial-course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition duration-200 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 cursor-pointer"
            >
              <option value="Noorani Qaida">Noorani Qaida (Beginners / Kids)</option>
              <option value="Quran Reading (Nazra)">Quran Reading (Nazra with Fluency)</option>
              <option value="Tajweed-ul-Quran">Tajweed-ul-Quran (Rules & Makharij)</option>
              <option value="Hifz-ul-Quran">Hifz-ul-Quran (Memorization Program)</option>
              <option value="Translation & Tafseer">Translation & Tafseer (Understanding Quran)</option>
              <option value="Arabic Language">Quranic & Conversational Arabic</option>
              <option value="Kids Islamic Studies">Islamic Studies for Children (Salah, Duas, Seerah)</option>
            </select>
          </div>
        </div>

        {/* Preferred Tutor Gender Toggle */}
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Preferred Tutor Preference <span className="text-amber-600">*</span>
          </span>
          <div className="grid grid-cols-2 gap-2.5" role="group" aria-label="Preferred Tutor Gender">
            <button
              type="button"
              aria-pressed={preferredTutorGender === "Female"}
              onClick={() => setPreferredTutorGender("Female")}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                preferredTutorGender === "Female"
                  ? "border-emerald-600 bg-emerald-900 text-white shadow-sm ring-1 ring-emerald-600"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50/40"
              }`}
            >
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>Female Scholar (Alimah)</span>
            </button>

            <button
              type="button"
              aria-pressed={preferredTutorGender === "Male"}
              onClick={() => setPreferredTutorGender("Male")}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                preferredTutorGender === "Male"
                  ? "border-emerald-600 bg-emerald-900 text-white shadow-sm ring-1 ring-emerald-600"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50/40"
              }`}
            >
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>Male Scholar (Qari)</span>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 py-3.5 px-6 font-extrabold text-emerald-950 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:from-amber-300 hover:to-amber-500 hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          <span className="relative z-10 flex items-center justify-center gap-2 text-sm sm:text-base">
            {isSubmitting ? (
              <>
                <svg className="h-5 w-5 animate-spin text-emerald-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Allocating Certified Tutor...</span>
              </>
            ) : (
              <>
                <span>Claim 3-Day Free Trial (No Card Needed)</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </span>
        </button>

        {/* Status Message */}
        {message && (
          <div
            role="status"
            className={`rounded-xl border p-3.5 text-xs sm:text-sm font-semibold leading-relaxed animate-in fade-in ${
              isSuccess
                ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Trust Badges Strip */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            100% Free
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            2-4h Response
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            Privacy Assured
          </span>
        </div>
      </form>
    </div>
  );
}
