import {
  BookOpenCheck,
  Clock3,
  Globe2,
  GraduationCap,
  Users,
} from "lucide-react";

export default function About() {
  const features = [
    {
      icon: BookOpenCheck,
      text: "One-to-One Live Quran Classes",
    },
    {
      icon: Users,
      text: "Qualified Male & Female Tutors",
    },
    {
      icon: Clock3,
      text: "Flexible Class Timings",
    },
    {
      icon: Globe2,
      text: "Worldwide Online Availability",
    },
    {
      icon: GraduationCap,
      text: "Free Trial Class",
    },
  ];

  return (
    <section id="about" className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Side */}
          <div>
            <p className="font-bold uppercase tracking-[0.25em] text-emerald-700 text-xs sm:text-sm">
              About Our Academy
            </p>

            <h2 className="mt-2 text-3xl font-black leading-tight text-gray-950 sm:text-4xl lg:text-5xl">
              Welcome to{" "}
              <span className="text-emerald-800">
                Maqsad-e-Quran Academy
              </span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
              Maqsad-e-Quran Academy is an international online Quran
              academy dedicated to providing authentic and high-quality Quran
              education to children and adults around the world.
            </p>

            <p className="mt-3 text-base leading-relaxed text-gray-600">
              We offer Noorani Qaida, Quran Reading, Tajweed, Hifz-ul-Quran,
              Translation, Tafseer, Arabic Language and Islamic Studies with
              qualified male and female teachers.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-5 shadow-sm">
                <p className="text-3xl font-extrabold text-emerald-800">50+</p>
                <p className="mt-1 text-sm font-semibold text-gray-700">
                  Qualified Quran Teachers
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-5 shadow-sm">
                <p className="text-3xl font-extrabold text-emerald-800">5000+</p>
                <p className="mt-1 text-sm font-semibold text-gray-700">
                  Students Worldwide
                </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 p-7 text-white shadow-xl sm:p-10">
            <p className="font-semibold uppercase tracking-[0.22em] text-amber-400 text-xs sm:text-sm">
              Our Mission
            </p>

            <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
              Spreading the Light of the Quran
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-emerald-100 sm:text-base">
              Our mission is to make authentic Quran education accessible to
              every Muslim family through modern technology, experienced
              teachers and personalised online classes.
            </p>

            <div className="mt-6 space-y-3.5">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.text}
                    className="flex items-center gap-3.5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-emerald-950">
                      <Icon size={18} />
                    </div>

                    <p className="text-sm font-semibold text-emerald-50 sm:text-base">
                      {feature.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}