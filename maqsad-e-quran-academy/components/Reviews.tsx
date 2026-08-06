import { Quote, Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah Khan",
    country: "Canada",
    review:
      "My children are learning Quran with Tajweed and their confidence has improved greatly. The teachers are patient, punctual and highly professional.",
  },
  {
    name: "Muhammad Ahmed",
    country: "United Kingdom",
    review:
      "The one-to-one classes are very effective. Flexible timings make it easy for our family to manage Quran lessons alongside school and work.",
  },
  {
    name: "Ayesha Rahman",
    country: "Australia",
    review:
      "I am very satisfied with the female Quran teacher. She teaches my daughter with kindness, clear pronunciation and regular revision.",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-extrabold uppercase tracking-[0.25em] text-amber-600 text-xs sm:text-sm">
            Parents Reviews
          </p>

          <h2 className="mt-2 text-3xl font-black text-emerald-950 sm:text-4xl lg:text-5xl">
            What Families Say About{" "}
            <span className="block text-amber-600">
              Maqsad-e-Quran Academy
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            Families from different countries trust our teachers for
            structured, friendly and authentic online Quran education.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((item) => (
            <article
              key={item.name}
              className="relative rounded-3xl border border-emerald-100 bg-[#fbf8f0] p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <Quote
                  size={36}
                  className="absolute right-6 top-6 text-amber-300/80"
                />

                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={18} fill="currentColor" />
                  ))}
                </div>

                <p className="mt-5 text-sm sm:text-base leading-relaxed text-gray-700">
                  “{item.review}”
                </p>
              </div>

              <div className="mt-6 border-t border-emerald-100/80 pt-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-emerald-950">
                    {item.name}
                  </h3>

                  <p className="text-xs font-semibold text-amber-600">
                    {item.country}
                  </p>
                </div>

                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-800">
                  Verified Student
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://wa.me/923301676985?text=Assalamualaikum%2C%20I%20want%20to%20book%20a%20free%20trial%20Quran%20class."
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-xl bg-emerald-800 px-7 py-3.5 font-bold text-white shadow-md transition hover:bg-emerald-950 hover:scale-105"
          >
            Join Our Global Quran Community
          </a>
        </div>
      </div>
    </section>
  );
}