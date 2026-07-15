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
    <section id="reviews" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold uppercase tracking-[0.28em] text-amber-600">
            Parents Reviews
          </p>

          <h2 className="mt-4 text-4xl font-bold text-emerald-950 sm:text-5xl">
            What Families Say About
            <span className="block text-amber-600">
              Maqsad-e-Quran Academy
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Families from different countries trust our teachers for
            structured, friendly and authentic online Quran education.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((item) => (
            <article
              key={item.name}
              className="relative rounded-3xl border border-emerald-100 bg-[#fbf8f0] p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <Quote
                size={42}
                className="absolute right-7 top-7 text-amber-300"
              />

              <div className="flex gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={20} fill="currentColor" />
                ))}
              </div>

              <p className="mt-7 leading-8 text-gray-700">
                “{item.review}”
              </p>

              <div className="mt-8 border-t border-emerald-100 pt-6">
                <h3 className="text-lg font-bold text-emerald-950">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm font-medium text-amber-600">
                  {item.country}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://wa.me/923301676985?text=Assalamualaikum%2C%20I%20want%20to%20book%20a%20free%20trial%20Quran%20class."
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-xl bg-emerald-800 px-8 py-4 font-bold text-white shadow-lg transition hover:bg-emerald-950"
          >
            Join Our Global Quran Community
          </a>
        </div>
      </div>
    </section>
  );
}