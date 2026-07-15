"use client";

import { FormEvent, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useLanguage } from "./LanguageProvider";

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

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
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
  };

  return (
    <div>
      <h2 className="text-center text-3xl font-bold text-emerald-800">
        {t("form.title")}
      </h2>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          placeholder={t("form.student")}
          required
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-700"
        />

        <input
          type="text"
          name="parentName"
          value={formData.parentName}
          onChange={handleChange}
          placeholder={t("form.parent")}
          required
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-700"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t("form.email")}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-700"
        />

        <input
          type="tel"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          placeholder={t("form.whatsapp")}
          required
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-700"
        />

        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-600 outline-none transition focus:border-emerald-700"
        >
          <option value="">
            {t("form.selectCourse")}
          </option>

          <option value="Noorani Qaida">
            Noorani Qaida
          </option>

          <option value="Quran Reading">
            Quran Reading
          </option>

          <option value="Tajweed">
            Tajweed
          </option>

          <option value="Hifz-ul-Quran">
            Hifz-ul-Quran
          </option>

          <option value="Translation and Tafseer">
            Translation & Tafseer
          </option>

          <option value="Arabic Language">
            Arabic Language
          </option>

          <option value="Islamic Studies">
            Islamic Studies
          </option>
        </select>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-emerald-800 px-6 py-4 font-bold text-white transition hover:bg-emerald-950 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isSubmitting
            ? "Submitting..."
            : t("form.submit")}
        </button>

        {message && (
          <div
            className={`rounded-xl border px-4 py-3 text-center text-sm font-semibold ${
              isSuccess
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}