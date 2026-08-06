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
    <section className="bg-[#fbf8f0] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
            <Globe2 size={28} />
          </div>

          <p className="mt-4 font-extrabold uppercase tracking-[0.25em] text-amber-600 text-xs sm:text-sm">
            Global Quran Community
          </p>

          <h2 className="mt-2 text-3xl font-black text-emerald-950 sm:text-4xl lg:text-5xl">
            Serving Students{" "}
            <span className="block text-amber-600">
              Across the World
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            Our online Quran classes are available worldwide with flexible
            timings for different countries and time zones.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {countries.map((country) => (
            <div
              key={country}
              className="flex items-center gap-3.5 rounded-2xl border border-amber-200/80 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                <MapPin size={20} />
              </div>

              <p className="font-bold text-emerald-950 text-sm">
                {country}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 rounded-3xl bg-emerald-950 p-6 text-center text-white sm:grid-cols-3 sm:p-8">
          <div>
            <p className="text-3xl sm:text-4xl font-black text-amber-400">35+</p>
            <p className="mt-1 text-xs sm:text-sm text-emerald-100">
              Countries Served
            </p>
          </div>

          <div className="border-white/10 sm:border-x py-2 sm:py-0">
            <p className="text-3xl sm:text-4xl font-black text-amber-400">5000+</p>
            <p className="mt-1 text-xs sm:text-sm text-emerald-100">
              Students Worldwide
            </p>
          </div>

          <div>
            <p className="text-3xl sm:text-4xl font-black text-amber-400">24/7</p>
            <p className="mt-1 text-xs sm:text-sm text-emerald-100">
              Flexible Timings
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}