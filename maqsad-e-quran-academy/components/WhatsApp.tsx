"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsApp() {
  return (
    <a
      href="https://wa.me/923301676985"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl z-50 transition duration-300 hover:scale-110"
    >
      <FaWhatsapp size={40} />
    </a>
  );
}