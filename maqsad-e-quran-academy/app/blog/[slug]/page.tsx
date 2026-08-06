"use client";

import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function BlogPost({ params }: Props) {
  const resolvedParams = React.use(params);
  const title = resolvedParams.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  
  return (
    <>
      <NavBar />
      <main className="min-h-screen py-24 bg-white">
        <article className="max-w-3xl mx-auto px-6 prose prose-lg prose-emerald">
          <Link href="/blog" className="text-amber-500 font-semibold no-underline hover:text-amber-600">&larr; Back to Blog</Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-8 mb-8 leading-tight">{title}</h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-12 pb-8 border-b border-slate-100">
            <span>By Maqsad-e-Quran Academy</span>
            <span>&bull;</span>
            <span>July 2026</span>
          </div>
          
          <div className="text-slate-700 leading-relaxed space-y-6">
            <p className="text-xl font-medium text-slate-600">This is an SEO-optimized sample article about {title}. In a real production application, this content would be dynamically fetched from a CMS like Sanity, WordPress, or Supabase.</p>
            
            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Why This Matters</h2>
            <p>Learning the Quran online has revolutionized access to Islamic education. With dedicated 1-on-1 tutoring, students receive personalized attention, flexible scheduling, and expert guidance from certified scholars worldwide.</p>
            
            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Key Takeaways</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Flexibility to learn from home on your schedule.</li>
              <li>Access to highly qualified male and female teachers.</li>
              <li>Interactive digital tools that enhance learning and memorization.</li>
            </ul>

            <div className="mt-16 bg-emerald-50 p-8 rounded-3xl border border-emerald-100 text-center not-prose">
              <h3 className="text-2xl font-bold text-emerald-950 mb-4">Ready to begin your journey?</h3>
              <p className="mb-6 text-emerald-800">Join thousands of students and experience our world-class teaching.</p>
              <Link href="/#admissions" className="inline-block bg-amber-400 text-emerald-950 font-bold px-8 py-4 rounded-xl shadow-md hover:bg-amber-300 transition">Book Your Free Trial</Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
