import {
  CalendarCheck,
  GraduationCap,
  MessageSquareText,
  UserCheck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Send Your Details",
    description:
      "Complete the free trial form or contact our admission team through WhatsApp.",
    icon: MessageSquareText,
  },
  {
    number: "02",
    title: "Choose Your Teacher",
    description:
      "Select a qualified male or female Quran teacher according to your preference.",
    icon: UserCheck,
  },
  {
    number: "03",
    title: "Attend Free Trial",
    description:
      "Join a one-to-one trial class and experience our teaching method before admission.",
    icon: CalendarCheck,
  },
  {
    number: "04",
    title: "Start Learning",
    description:
      "Choose a suitable schedule and begin your regular online Quran classes.",
    icon: GraduationCap,
  },
];

export default function LearningProcess() {
  return (
    <section className="relative overflow-hidden bg-emerald-950 py-24 text-white">
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold uppercase tracking-[0.28em] text-amber-400">
            Simple Admission Process
          </p>

          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Start Quran Classes
            <span className="block text-amber-400">
              in Four Easy Steps
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-emerald-100">
            Our admission process is simple, quick and designed for families
            living in different countries and time zones.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="relative rounded-3xl border border-white/10 bg-white/10 p-7 backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-amber-400/50 hover:bg-white/15"
              >
                <span className="absolute right-6 top-5 text-5xl font-bold text-white/10">
                  {step.number}
                </span>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400 text-emerald-950 shadow-lg">
                  <Icon size={30} />
                </div>

                <h3 className="mt-7 text-2xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-emerald-100">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <a
            href="#admissions"
            className="inline-flex rounded-xl bg-amber-400 px-9 py-4 font-bold text-emerald-950 shadow-lg transition hover:bg-amber-300"
          >
            Start with a Free Trial
          </a>
        </div>
      </div>
    </section>
  );
}