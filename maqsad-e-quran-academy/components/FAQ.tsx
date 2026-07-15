"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How do online Quran classes work?",
    answer:
      "Classes are conducted live through Zoom, Google Meet or another suitable platform. Each student receives one-to-one attention from a qualified teacher.",
  },
  {
    question: "Do you provide male and female Quran teachers?",
    answer:
      "Yes. We have more than 50 qualified male and female teachers. Students may select a teacher according to their preference.",
  },
  {
    question: "Is a free trial class available?",
    answer:
      "Yes. Every new student can book a free trial class before completing admission.",
  },
  {
    question: "Which courses are available?",
    answer:
      "We offer Noorani Qaida, Quran Reading, Tajweed, Hifz-ul-Quran, Translation, Tafseer, Arabic Language, Islamic Studies and special programs for children.",
  },
  {
    question: "Can students choose flexible class timings?",
    answer:
      "Yes. We provide flexible morning, evening and weekend timings according to the student's country and time zone.",
  },
  {
    question: "Are classes available for adults?",
    answer:
      "Yes. Our courses are available for children, adults, beginners and advanced learners.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold uppercase tracking-[0.28em] text-amber-600">
            Frequently Asked Questions
          </p>

          <h2 className="mt-4 text-4xl font-bold text-emerald-950 sm:text-5xl">
            Everything You Need to Know
            <span className="block text-amber-600">
              Before Starting Classes
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Find answers to the most common questions about our online Quran
            classes, teachers, courses and admission process.
          </p>
        </div>

        <div className="mt-14 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-emerald-100 bg-[#fbf8f0]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                >
                  <span className="text-lg font-bold text-emerald-950">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={22}
                    className={`shrink-0 text-amber-600 transition duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-emerald-100 px-6 py-5">
                    <p className="leading-8 text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-3xl bg-emerald-950 px-8 py-10 text-center text-white">
          <h3 className="text-2xl font-bold">
            Still Have a Question?
          </h3>

          <p className="mt-3 text-emerald-100">
            Contact our admission team on WhatsApp for guidance.
          </p>

          <a
            href="https://wa.me/923301676985?text=Assalamualaikum%2C%20I%20have%20a%20question%20about%20your%20online%20Quran%20classes."
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex rounded-xl bg-amber-400 px-8 py-4 font-bold text-emerald-950 transition hover:bg-amber-300"
          >
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}