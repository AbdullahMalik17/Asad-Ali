const features = [
  {
    title: "Certified Teachers",
    description: "Qualified male & female Quran teachers with years of experience.",
    icon: "👨‍🏫",
  },
  {
    title: "One-to-One Classes",
    description: "Personal attention for every student with flexible scheduling.",
    icon: "🎓",
  },
  {
    title: "Worldwide Availability",
    description: "Join from Pakistan, UK, USA, Canada, Australia and anywhere.",
    icon: "🌍",
  },
  {
    title: "24/7 Support",
    description: "Friendly support team available to help students and parents.",
    icon: "💬",
  },
  {
    title: "Flexible Timings",
    description: "Morning, evening and weekend classes available.",
    icon: "🕒",
  },
  {
    title: "Free Trial Class",
    description: "Start with a free class before enrolling.",
    icon: "🎁",
  },
];

export default function WhyChoose() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-10">

          <p className="text-emerald-700 font-extrabold uppercase tracking-widest text-xs sm:text-sm">
            Why Choose Us
          </p>

          <h2 className="text-3xl font-black mt-2 text-gray-950 sm:text-4xl lg:text-5xl">
            Why Students Love{" "}
            <span className="text-amber-600">Maqsad-e-Quran Academy</span>
          </h2>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-gray-100 bg-gray-50/50 p-6 hover:shadow-xl hover:-translate-y-1 hover:bg-white hover:border-emerald-200 transition duration-300"
            >
              <div className="text-4xl mb-4">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-emerald-950">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {item.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}