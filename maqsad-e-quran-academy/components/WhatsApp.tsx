"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsApp() {
  return (
    <a
      href="https://wa.me/923301676985"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Maqsad-e-Quran Academy on WhatsApp"
      className="fixed bottom-24 right-6 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl z-50 transition duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
    >
      <FaWhatsapp size={28} aria-hidden="true" />
    </a>
  );
}