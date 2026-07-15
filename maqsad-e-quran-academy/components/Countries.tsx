import { Globe2, MapPin } from "lucide-react";

const countries = [
  "Pakistan",
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Saudi Arabia",
  "United Arab Emirates",
  "Qatar",
  "Germany",
  "France",
  "Turkey",
  "Malaysia",
];

export default function Countries() {
  return (
    <section className="bg-[#fbf8f0] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
            <Globe2 size={32} />
          </div>

          <p className="mt-6 font-bold uppercase tracking-[0.28em] text-amber-600">
            Global Quran Community
          </p>

          <h2 className="mt-4 text-4xl font-bold text-emerald-950 sm:text-5xl">
            Serving Students
            <span className="block text-amber-600">
              Across the World
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our online Quran classes are available worldwide with flexible
            timings for different countries and time zones.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {countries.map((country) => (
            <div
              key={country}
              className="flex items-center gap-4 rounded-2xl border border-amber-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                <MapPin size={22} />
              </div>

              <p className="font-bold text-emerald-950">
                {country}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-5 rounded-3xl bg-emerald-950 p-8 text-center text-white sm:grid-cols-3">
          <div>
            <p className="text-4xl font-bold text-amber-400">35+</p>
            <p className="mt-2 text-emerald-100">
              Countries Served
            </p>
          </div>

          <div className="border-white/10 sm:border-x">
            <p className="text-4xl font-bold text-amber-400">5000+</p>
            <p className="mt-2 text-emerald-100">
              Students Worldwide
            </p>
          </div>

          <div>
            <p className="text-4xl font-bold text-amber-400">24/7</p>
            <p className="mt-2 text-emerald-100">
              Flexible Timings
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}