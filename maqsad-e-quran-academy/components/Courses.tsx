const courses = [
  {
    title: "Noorani Qaida",
    description: "Learn Arabic letters and correct pronunciation from the beginning.",
    icon: "📖",
  },
  {
    title: "Quran Reading",
    description: "Read the Holy Quran fluently with proper guidance.",
    icon: "📚",
  },
  {
    title: "Tajweed",
    description: "Master the rules of Tajweed with experienced teachers.",
    icon: "🎙️",
  },
  {
    title: "Hifz-ul-Quran",
    description: "Memorize the Holy Quran through structured daily lessons.",
    icon: "🕌",
  },
  {
    title: "Translation & Tafseer",
    description: "Understand the meanings and message of the Holy Quran.",
    icon: "🌙",
  },
  {
    title: "Arabic Language",
    description: "Learn Modern & Classical Arabic for Quran understanding.",
    icon: "✍️",
  },
];

export default function Courses() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="text-emerald-700 font-bold uppercase tracking-widest">
            Our Programs
          </p>

          <h2 className="text-5xl font-bold mt-4 text-gray-900">
            Explore Our Courses
          </h2>

          <p className="mt-6 text-gray-600 max-w-3xl mx-auto">
            We provide authentic Islamic education through qualified male
            and female teachers with flexible timings for students worldwide.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {courses.map((course) => (
            <div
              key={course.title}
              className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition"
            >
              <div className="text-5xl mb-6">{course.icon}</div>

              <h3 className="text-2xl font-bold text-emerald-800">
                {course.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {course.description}
              </p>

              <button className="mt-8 bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-800">
                Learn More
              </button>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}