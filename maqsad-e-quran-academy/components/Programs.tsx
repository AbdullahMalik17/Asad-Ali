import {
  Baby,
  BookHeart,
  BookOpen,
  BookOpenCheck,
  Languages,
  Mic2,
  MoonStar,
  ShieldCheck,
} from "lucide-react";

const programs = [
  {
    title: "Noorani Qaida",
    description: "Arabic letters, pronunciation and basic Quran reading.",
    icon: BookOpenCheck,
  },
  {
    title: "Quran Reading",
    description: "Fluent Quran recitation with correct pronunciation.",
    icon: BookOpen,
  },
  {
    title: "Tajweed Course",
    description: "Learn Makharij and the essential rules of Tajweed.",
    icon: Mic2,
  },
  {
    title: "Hifz-ul-Quran",
    description: "Structured Quran memorisation with daily revision.",
    icon: ShieldCheck,
  },
  {
    title: "Translation & Tafseer",
    description: "Understand the meanings and guidance of the Quran.",
    icon: BookHeart,
  },
  {
    title: "Arabic Language",
    description: "Learn Quranic and conversational Arabic online.",
    icon: Languages,
  },
  {
    title: "Islamic Studies",
    description: "Aqeedah, Seerah, Salah, Duas and Islamic manners.",
    icon: MoonStar,
  },
  {
    title: "Kids Islamic Program",
    description: "Interactive Islamic learning specially designed for children.",
    icon: Baby,
  },
];

export default function Programs() {
  return (
    <section
      id="programs"
      className="relative overflow-hidden bg-[#fbf8f0] py-12 sm:py-16"
    >
      {/* Decorative Islamic-style circles */}
      <div className="absolute -left-24 top-20 h-64 w-64 rounded-full border border-amber-300/30 pointer-events-none" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full border border-emerald-700/10 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-extrabold uppercase tracking-[0.25em] text-amber-600 text-xs sm:text-sm">
            Our Academic Programs
          </p>

          <h2 className="mt-2 text-3xl font-black text-emerald-950 sm:text-4xl lg:text-5xl">
            Learn the Quran with{" "}
            <span className="block text-amber-600">Knowledge and Excellence</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            Select a course according to your age, learning level and personal
            goals. All programs are available through one-to-one online classes.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => {
            const Icon = program.icon;

            return (
              <article
                key={program.title}
                className="group rounded-3xl border border-amber-200/70 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-amber-400 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800 transition group-hover:bg-emerald-800 group-hover:text-white">
                    <Icon size={28} strokeWidth={1.7} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-emerald-950">
                    {program.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-gray-600">
                    {program.description}
                  </p>
                </div>

                <a
                  href="https://wa.me/923301676985?text=Assalamualaikum%2C%20I%20want%20information%20about%20your%20Quran%20courses."
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center justify-center font-bold text-amber-600 text-xs sm:text-sm transition hover:text-emerald-800"
                >
                  Course Details →
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#admissions"
            className="inline-flex rounded-xl bg-emerald-800 px-7 py-3.5 font-bold text-white shadow-md transition hover:bg-emerald-950 hover:scale-105"
          >
            Book Your Free Trial Class
          </a>
        </div>
      </div>
    </section>
  );
}