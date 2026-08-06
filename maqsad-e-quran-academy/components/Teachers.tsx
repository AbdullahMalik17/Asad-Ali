import {
  Award,
  BookOpen,
  Clock3,
  Globe2,
  GraduationCap,
  Languages,
  Star,
  UserRound,
  Users,
} from "lucide-react";

const teacherGroups = [
  {
    name: "Qualified Male Tutors",
    role: "Quran, Tajweed, Hifz & Tafseer Teachers",
    experience: "Experienced and certified faculty",
    languages: "English, Urdu, Arabic and more",
    total: "30+ Male Teachers",
    icon: UserRound,
  },
  {
    name: "Qualified Female Tutors",
    role: "Specialist Teachers for Sisters and Children",
    experience: "Experienced and certified faculty",
    languages: "English, Urdu, Arabic and more",
    total: "20+ Female Teachers",
    icon: GraduationCap,
  },
  {
    name: "Tajweed & Hifz Specialists",
    role: "Makharij, Tajweed and Memorisation Experts",
    experience: "Individual correction and lesson plans",
    languages: "Arabic, English and Urdu",
    total: "Specialist Tutors",
    icon: BookOpen,
  },
];

const facultyStats = [
  {
    icon: Users,
    value: "50+",
    label: "Qualified Teachers",
  },
  {
    icon: Globe2,
    value: "Worldwide",
    label: "Online Availability",
  },
  {
    icon: Clock3,
    value: "24/7",
    label: "Flexible Scheduling",
  },
  {
    icon: Award,
    value: "1-to-1",
    label: "Personal Classes",
  },
];

export default function Teachers() {
  return (
    <section
      id="teachers"
      className="relative overflow-hidden bg-emerald-950 py-12 sm:py-16 text-white"
    >
      {/* Decorative background */}
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-extrabold uppercase tracking-[0.25em] text-amber-400 text-xs sm:text-sm">
            Our Teaching Faculty
          </p>

          <h2 className="mt-2 text-3xl font-black sm:text-4xl lg:text-5xl">
            Learn with More Than{" "}
            <span className="block text-amber-400">
              50 Qualified Quran Teachers
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-emerald-100 sm:text-lg">
            Our experienced male and female tutors provide personal attention,
            correct pronunciation, Tajweed guidance and structured Quran
            education for children and adults around the world.
          </p>
        </div>

        {/* Teacher Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teacherGroups.map((teacher) => {
            const Icon = teacher.icon;

            return (
              <article
                key={teacher.name}
                className="group rounded-3xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:border-amber-400/50 hover:bg-white/15 flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400 text-emerald-950 shadow-md">
                    <Icon size={32} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold">{teacher.name}</h3>

                  <p className="mt-1 text-xs font-semibold text-amber-300 sm:text-sm">
                    {teacher.role}
                  </p>

                  <div className="mt-5 space-y-3 text-xs sm:text-sm text-emerald-50">
                    <div className="flex items-start gap-2.5">
                      <Award
                        size={18}
                        className="mt-0.5 shrink-0 text-amber-400"
                      />
                      <span>{teacher.experience}</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Languages
                        size={18}
                        className="mt-0.5 shrink-0 text-amber-400"
                      />
                      <span>{teacher.languages}</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Star
                        size={18}
                        className="mt-0.5 shrink-0 text-amber-400"
                      />
                      <span>{teacher.total}</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/923301676985?text=Assalamualaikum%2C%20I%20want%20to%20book%20a%20free%20trial%20class."
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-amber-400 px-5 py-3 font-bold text-emerald-950 text-sm transition hover:bg-amber-300"
                >
                  Book a Free Trial
                </a>
              </article>
            );
          })}
        </div>

        {/* Statistics */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facultyStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-3xl border border-amber-400/20 bg-white/10 p-5 text-center backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/15"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-emerald-950">
                  <Icon size={24} />
                </div>

                <p className="mt-3 text-3xl font-extrabold text-amber-400">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs sm:text-sm text-emerald-100">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom statement */}
        <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
          <p className="text-sm leading-relaxed text-emerald-100 sm:text-base">
            Students can choose male or female tutors according to their
            preference. Classes are available for children, adults, beginners
            and advanced learners with flexible timings in different time
            zones.
          </p>
        </div>
      </div>
    </section>
  );
}