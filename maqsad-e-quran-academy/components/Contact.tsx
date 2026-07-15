import {
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="bg-[#fbf8f0] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold uppercase tracking-[0.28em] text-amber-600">
            Contact & Admissions
          </p>

          <h2 className="mt-4 text-4xl font-bold text-emerald-950 sm:text-5xl">
            Start Your Quran
            <span className="block text-amber-600">
              Learning Journey Today
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Submit your details for a free trial class. Our admission team will
            contact you through WhatsApp.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="rounded-3xl bg-emerald-950 p-8 text-white shadow-2xl sm:p-10">
            <p className="font-bold uppercase tracking-[0.24em] text-amber-400">
              Get in Touch
            </p>

            <h3 className="mt-4 text-3xl font-bold">
              Maqsad-e-Quran Academy
            </h3>

            <p className="mt-5 leading-8 text-emerald-100">
              Contact our admission team for course guidance, teacher selection,
              class timings and free trial booking.
            </p>

            <div className="mt-10 space-y-6">
              <a
                href="tel:+923301676985"
                className="flex items-center gap-4"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400 text-emerald-950">
                  <Phone size={23} />
                </span>

                <div>
                  <p className="text-sm text-emerald-200">Phone</p>
                  <p className="font-bold">+92 330 1676985</p>
                </div>
              </a>

              <a
                href="mailto:maqsadquran@gmail.com"
                className="flex items-center gap-4"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400 text-emerald-950">
                  <Mail size={23} />
                </span>

                <div>
                  <p className="text-sm text-emerald-200">Email</p>
                  <p className="font-bold">maqsadquran@gmail.com</p>
                </div>
              </a>

              <a
                href="https://wa.me/923301676985"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400 text-emerald-950">
                  <MessageCircle size={23} />
                </span>

                <div>
                  <p className="text-sm text-emerald-200">WhatsApp</p>
                  <p className="font-bold">Chat with Admission Team</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400 text-emerald-950">
                  <Clock3 size={23} />
                </span>

                <div>
                  <p className="text-sm text-emerald-200">Availability</p>
                  <p className="font-bold">24/7 Flexible Scheduling</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400 text-emerald-950">
                  <MapPin size={23} />
                </span>

                <div>
                  <p className="text-sm text-emerald-200">Classes</p>
                  <p className="font-bold">Online — Worldwide</p>
                </div>
              </div>
            </div>
          </div>

          {/* Admission Form */}
          <div
            id="admissions"
            className="rounded-3xl border border-amber-200 bg-white p-8 shadow-xl sm:p-10"
          >
            <h3 className="text-3xl font-bold text-emerald-950">
              Book a Free Trial
            </h3>

            <p className="mt-3 text-gray-600">
              Complete the form and our team will contact you shortly.
            </p>

            <form className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Student Name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-4 outline-none transition focus:border-emerald-700"
                />

                <input
                  type="text"
                  placeholder="Parent Name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-4 outline-none transition focus:border-emerald-700"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-xl border border-gray-200 px-4 py-4 outline-none transition focus:border-emerald-700"
                />

                <input
                  type="tel"
                  placeholder="WhatsApp Number"
                  className="w-full rounded-xl border border-gray-200 px-4 py-4 outline-none transition focus:border-emerald-700"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <select className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-gray-600 outline-none focus:border-emerald-700">
                  <option>Select Course</option>
                  <option>Noorani Qaida</option>
                  <option>Quran Reading</option>
                  <option>Tajweed</option>
                  <option>Hifz-ul-Quran</option>
                  <option>Translation & Tafseer</option>
                  <option>Arabic Language</option>
                  <option>Islamic Studies</option>
                </select>

                <select className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-gray-600 outline-none focus:border-emerald-700">
                  <option>Preferred Teacher</option>
                  <option>Male Teacher</option>
                  <option>Female Teacher</option>
                  <option>No Preference</option>
                </select>
              </div>

              <textarea
                rows={4}
                placeholder="Country, age and preferred class timing"
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-4 outline-none transition focus:border-emerald-700"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-800 px-6 py-4 font-bold text-white shadow-lg transition hover:bg-emerald-950"
              >
                Submit Free Trial Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}