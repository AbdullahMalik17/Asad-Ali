import { Mail, MessageCircle, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <h2 className="text-3xl font-bold text-amber-400">
            Maqsad-e-Quran
          </h2>

          <p className="mt-2 font-semibold">
            Online Quran Academy
          </p>

          <p className="mt-5 leading-7 text-emerald-100">
            One-to-one online Quran classes for children and adults with
            qualified male and female teachers.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-amber-400">
            Quick Links
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-emerald-100">
            <a href="#home" className="hover:text-amber-400">
              Home
            </a>

            <a href="#about" className="hover:text-amber-400">
              About Us
            </a>

            <a href="#courses" className="hover:text-amber-400">
              Courses
            </a>

            <a href="#teachers" className="hover:text-amber-400">
              Teachers
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-amber-400">
            Contact Us
          </h3>

          <div className="mt-5 space-y-4 text-emerald-100">
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-amber-400" />
              <span>+92 330 1676985</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={20} className="text-amber-400" />
              <span>maqsadquran@gmail.com</span>
            </div>

            <a
              href="https://wa.me/923301676985"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-amber-400"
            >
              <MessageCircle size={20} className="text-amber-400" />
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-sm text-emerald-200">
        © 2026 Maqsad-e-Quran Academy. All rights reserved.
      </div>
    </footer>
  );
}