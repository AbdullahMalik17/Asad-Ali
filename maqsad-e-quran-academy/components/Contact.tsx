import TrialForm from "./TrialForm";
import {
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="bg-[#fbf8f0] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-extrabold uppercase tracking-[0.25em] text-amber-600 text-xs sm:text-sm">
            Contact & Admissions
          </p>

          <h2 className="mt-2 text-3xl font-black text-emerald-950 sm:text-4xl lg:text-5xl">
            Start Your Quran{" "}
            <span className="block text-amber-600">
              Learning Journey Today
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            Submit your details for a free trial class. Our admission team will
            contact you through WhatsApp.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="rounded-3xl bg-emerald-950 p-6 text-white shadow-xl sm:p-8 flex flex-col justify-between">
            <div>
              <p className="font-bold uppercase tracking-[0.22em] text-amber-400 text-xs sm:text-sm">
                Get in Touch
              </p>

              <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                Maqsad-e-Quran Academy
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-emerald-100">
                Contact our admission team for course guidance, teacher selection,
                class timings and free trial booking.
              </p>

              <div className="mt-6 space-y-4 text-sm">
                <a
                  href="tel:+923301676985"
                  className="flex items-center gap-3.5 hover:text-amber-300 transition-colors"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-emerald-950">
                    <Phone size={20} />
                  </span>

                  <div>
                    <p className="text-xs text-emerald-200">Phone</p>
                    <p className="font-bold">+92 330 1676985</p>
                  </div>
                </a>

                <a
                  href="mailto:maqsadquran@gmail.com"
                  className="flex items-center gap-3.5 hover:text-amber-300 transition-colors"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-emerald-950">
                    <Mail size={20} />
                  </span>

                  <div>
                    <p className="text-xs text-emerald-200">Email</p>
                    <p className="font-bold truncate">maqsadquran@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/923301676985"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 hover:text-amber-300 transition-colors"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-emerald-950">
                    <MessageCircle size={20} />
                  </span>

                  <div>
                    <p className="text-xs text-emerald-200">WhatsApp</p>
                    <p className="font-bold">Chat with Admission Team</p>
                  </div>
                </a>

                <div className="flex items-center gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-emerald-950">
                    <Clock3 size={20} />
                  </span>

                  <div>
                    <p className="text-xs text-emerald-200">Availability</p>
                    <p className="font-bold">24/7 Flexible Scheduling</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-emerald-950">
                    <MapPin size={20} />
                  </span>

                  <div>
                    <p className="text-xs text-emerald-200">Classes</p>
                    <p className="font-bold">Online — Worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Admission Form */}
          <div
            id="admissions"
            className="rounded-3xl border border-amber-200/80 bg-white p-6 shadow-xl sm:p-8"
          >
            <TrialForm />
          </div>
        </div>
      </div>
    </section>
  );
}