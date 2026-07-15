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
    <section id="about" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left Side */}
          <div>
            <p className="font-bold uppercase tracking-[0.25em] text-emerald-700">
              About Our Academy
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight text-gray-950 sm:text-5xl">
              Welcome to
              <span className="block text-emerald-800">
                Maqsad-e-Quran Academy
              </span>
            </h2>

            <p className="mt-7 text-lg leading-8 text-gray-600">
              Maqsad-e-Quran Academy is an international online Quran
              academy dedicated to providing authentic and high-quality Quran
              education to children and adults around the world.
            </p>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              We offer Noorani Qaida, Quran Reading, Tajweed, Hifz-ul-Quran,
              Translation, Tafseer, Arabic Language and Islamic Studies with
              qualified male and female teachers.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-7 shadow-sm">
                <p className="text-4xl font-bold text-emerald-800">50+</p>
                <p className="mt-2 font-semibold text-gray-700">
                  Qualified Quran Teachers
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-7 shadow-sm">
                <p className="text-4xl font-bold text-emerald-800">5000+</p>
                <p className="mt-2 font-semibold text-gray-700">
                  Students Worldwide
                </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-950 p-9 text-white shadow-2xl sm:p-12">
            <p className="font-semibold uppercase tracking-[0.22em] text-amber-400">
              Our Mission
            </p>

            <h3 className="mt-3 text-3xl font-bold">
              Spreading the Light of the Quran
            </h3>

            <p className="mt-5 leading-8 text-emerald-100">
              Our mission is to make authentic Quran education accessible to
              every Muslim family through modern technology, experienced
              teachers and personalised online classes.
            </p>

            <div className="mt-9 space-y-5">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.text}
                    className="flex items-center gap-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-emerald-950">
                      <Icon size={22} />
                    </div>

                    <p className="font-medium text-emerald-50">
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