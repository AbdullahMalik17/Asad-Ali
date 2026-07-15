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
      className="relative overflow-hidden bg-emerald-950 py-24 text-white"
    >
      {/* Decorative background */}
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold uppercase tracking-[0.28em] text-amber-400">
            Our Teaching Faculty
          </p>

          <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            Learn with More Than
            <span className="block text-amber-400">
              50 Qualified Quran Teachers
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-emerald-100">
            Our experienced male and female tutors provide personal attention,
            correct pronunciation, Tajweed guidance and structured Quran
            education for children and adults around the world.
          </p>
        </div>

        {/* Teacher Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teacherGroups.map((teacher) => {
            const Icon = teacher.icon;

            return (
              <article
                key={teacher.name}
                className="group rounded-3xl border border-white/10 bg-white/10 p-8 shadow-xl backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-amber-400/50 hover:bg-white/15"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-400 text-emerald-950 shadow-lg">
                  <Icon size={38} strokeWidth={1.8} />
                </div>

                <h3 className="mt-7 text-2xl font-bold">{teacher.name}</h3>

                <p className="mt-2 font-medium text-amber-300">
                  {teacher.role}
                </p>

                <div className="mt-7 space-y-4 text-emerald-50">
                  <div className="flex items-start gap-3">
                    <Award
                      size={20}
                      className="mt-0.5 shrink-0 text-amber-400"
                    />
                    <span>{teacher.experience}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Languages
                      size={20}
                      className="mt-0.5 shrink-0 text-amber-400"
                    />
                    <span>{teacher.languages}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Star
                      size={20}
                      className="mt-0.5 shrink-0 text-amber-400"
                    />
                    <span>{teacher.total}</span>
                  </div>
                </div>

                <a
                  href="https://wa.me/923301676985?text=Assalamualaikum%2C%20I%20want%20to%20book%20a%20free%20trial%20class."
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex rounded-xl bg-amber-400 px-6 py-3 font-bold text-emerald-950 transition hover:bg-amber-300"
                >
                  Book a Free Trial
                </a>
              </article>
            );
          })}
        </div>

        {/* Statistics */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {facultyStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-3xl border border-amber-400/20 bg-white/10 p-7 text-center backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/15"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-emerald-950">
                  <Icon size={28} />
                </div>

                <p className="mt-5 text-4xl font-bold text-amber-400">
                  {stat.value}
                </p>

                <p className="mt-2 text-emerald-100">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom statement */}
        <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-lg leading-8 text-emerald-100">
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