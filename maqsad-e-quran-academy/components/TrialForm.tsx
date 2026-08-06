"use client";

import { FormEvent, useState, useCallback } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useLanguage } from "./LanguageProvider";
import { sendTrialConfirmationEmail } from "@/lib/email-service";
import { sendWhatsAppTrialConfirmation } from "@/lib/whatsapp-notifier";

type FormData = {
  studentName: string;
  parentName: string;
  email: string;
  whatsapp: string;
  course: string;
};

const initialFormData: FormData = {
  studentName: "",
  parentName: "",
  email: "",
  whatsapp: "",
  course: "",
};

export default function TrialForm() {
  const { t, language } = useLanguage();

  const [formData, setFormData] =
    useState<FormData>(initialFormData);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = useCallback(
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = event.target;

      setFormData((previous) => ({
        ...previous,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setMessage("");
      setIsSuccess(false);

      if (
        !formData.studentName.trim() ||
        !formData.parentName.trim() ||
        !formData.whatsapp.trim() ||
        !formData.course
      ) {
        setMessage("Please complete all required fields.");
        return;
      }

      try {
        setIsSubmitting(true);

        await addDoc(collection(db, "trialRequests"), {
          studentName: formData.studentName.trim(),
          parentName: formData.parentName.trim(),
          email: formData.email.trim(),
          whatsapp: formData.whatsapp.trim(),
          course: formData.course,
          language,
          status: "pending",
          source: "website-trial-form",
          createdAt: serverTimestamp(),
        });

        // Dispatch Email Notification
        if (formData.email.trim()) {
          try {
            await sendTrialConfirmationEmail({
              studentName: formData.studentName.trim(),
              parentName: formData.parentName.trim(),
              email: formData.email.trim(),
              whatsapp: formData.whatsapp.trim(),
              course: formData.course,
              language,
            });
          } catch (emailErr) {
            console.warn("Trial confirmation email dispatch failed:", emailErr);
          }
        }

        // Dispatch WhatsApp Notification
        if (formData.whatsapp.trim()) {
          try {
            await sendWhatsAppTrialConfirmation({
              toPhone: formData.whatsapp.trim(),
              studentName: formData.studentName.trim(),
              parentName: formData.parentName.trim(),
              course: formData.course,
            });
          } catch (waErr) {
            console.warn("Trial confirmation WhatsApp dispatch failed:", waErr);
          }
        }

        setIsSuccess(true);
        setMessage(
          "Your free trial request has been submitted successfully."
        );

        setFormData(initialFormData);
      } catch (error) {
        console.error("Trial request error:", error);

        setIsSuccess(false);
        setMessage(
          "Request could not be submitted. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, language]
  );

  return (
    <div>
      <div className="text-center">
        <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
          {t("form.badge")}
        </span>
        <h2 className="mt-2 text-2xl font-extrabold text-emerald-950 sm:text-3xl">
          {t("form.title")}
        </h2>
        <p className="mt-1 text-xs font-medium text-gray-600 sm:text-sm">
          {t("form.subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
        <div>
          <label htmlFor="studentName" className="sr-only">
            {t("form.student")}
          </label>
          <input
            id="studentName"
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder={t("form.student")}
            aria-label={t("form.student")}
            required
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          />
        </div>

        <div>
          <label htmlFor="parentName" className="sr-only">
            {t("form.parent")}
          </label>
          <input
            id="parentName"
            type="text"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            placeholder={t("form.parent")}
            aria-label={t("form.parent")}
            required
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          />
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            {t("form.email")}
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("form.email")}
            aria-label={t("form.email")}
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          />
        </div>

        <div>
          <label htmlFor="whatsapp" className="sr-only">
            {t("form.whatsapp")}
          </label>
          <input
            id="whatsapp"
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            placeholder={t("form.whatsapp")}
            aria-label={t("form.whatsapp")}
            required
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          />
        </div>

        <div>
          <label htmlFor="course-select" className="sr-only">
            {t("form.selectCourse")}
          </label>
          <select
            id="course-select"
            name="course"
            value={formData.course}
            onChange={handleChange}
            aria-label={t("form.selectCourse")}
            required
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-800 outline-none transition-all duration-200 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            <option value="">
              {t("form.selectCourse")}
            </option>

            <option value="Noorani Qaida">
              {t("courses.list.qaida.title")}
            </option>

            <option value="Quran Reading">
              {t("courses.list.reading.title")}
            </option>

            <option value="Tajweed">
              {t("courses.list.tajweed.title")}
            </option>

            <option value="Hifz-ul-Quran">
              {t("courses.list.hifz.title")}
            </option>

            <option value="Translation and Tafseer">
              {t("courses.list.tafseer.title")}
            </option>

            <option value="Arabic Language">
              {t("courses.list.arabic.title")}
            </option>

            <option value="Islamic Studies">
              {t("courses.list.islamicStudies.title")}
            </option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          aria-label={isSubmitting ? t("form.submitting") : t("form.submit")}
          className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 py-3.5 px-6 font-extrabold text-emerald-950 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:from-amber-300 hover:to-amber-500 hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <svg className="h-5 w-5 animate-spin text-emerald-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{t("form.submitting")}</span>
              </>
            ) : (
              <>
                <span>{t("form.submit")}</span>
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </>
            )}
          </span>
        </button>

        {message && (
          <div
            role="status"
            aria-live="polite"
            className={`rounded-xl border px-4 py-3 text-center text-sm font-semibold animate-in fade-in ${
              isSuccess
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <div className="flex items-center justify-center gap-4 pt-2 text-[11px] font-medium text-gray-500">
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600" aria-hidden="true">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            {t("form.guarantee1")}
          </span>
          <span aria-hidden="true">•</span>
          <span className="flex items-center gap-1">
            <span aria-hidden="true">⚡</span> {t("form.guarantee2")}
          </span>
          <span aria-hidden="true">•</span>
          <span className="flex items-center gap-1">
            <span aria-hidden="true">🔒</span> {t("form.guarantee3")}
          </span>
        </div>
      </form>
    </div>
  );
}