import Link from "next/link";
import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Islamic Blog & Resources",
  description: "Read our latest articles on Quranic studies, Tajweed, Hifz, and Islamic education.",
};

const posts = [
  {
    slug: "benefits-of-learning-quran-online",
    title: "7 Life-Changing Benefits of Learning Quran Online",
    excerpt: "Discover why thousands of families are switching to online Quran classes and how it can transform your learning journey.",
    date: "July 26, 2026",
    image: "🕌",
  },
  {
    slug: "how-to-improve-tajweed",
    title: "A Beginner's Guide to Improving Your Tajweed",
    excerpt: "Practical tips and essential rules to help you recite the Holy Quran with proper pronunciation.",
    date: "July 20, 2026",
    image: "📖",
  }
];

export default function BlogIndex() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-emerald-950 tracking-tight">Islamic Blog & Resources</h1>
            <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">Enhance your knowledge with our latest articles on Quran recitation, Tajweed rules, and Islamic studies.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-3xl p-8 shadow-md border border-slate-100 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl mb-6">{post.image}</div>
                <p className="text-sm font-semibold text-amber-500 mb-2">{post.date}</p>
                <h2 className="text-2xl font-bold text-slate-800 group-hover:text-emerald-700 transition">{post.title}</h2>
                <p className="mt-4 text-slate-600 leading-relaxed">{post.excerpt}</p>
                <div className="mt-6 flex items-center text-emerald-700 font-bold">
                  Read Article &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
