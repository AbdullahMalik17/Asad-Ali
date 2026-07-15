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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="text-emerald-700 font-bold uppercase tracking-widest">
            Why Choose Us
          </p>

          <h2 className="text-5xl font-bold mt-4 text-gray-900">
            Why Students Love
            <br />
            Maqsad-e-Quran Academy
          </h2>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border p-8 hover:shadow-xl hover:-translate-y-2 transition"
            >
              <div className="text-5xl mb-5">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold text-emerald-800">
                {item.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {item.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}