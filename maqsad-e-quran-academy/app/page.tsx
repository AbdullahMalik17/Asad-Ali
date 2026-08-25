"use client";

import TopBar from "@/components/TopBar";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import AudioRecitationPreview from "@/components/AudioRecitationPreview";
import ProgramsBento from "@/components/ProgramsBento";
import PricingCalculator from "@/components/PricingCalculator";
import TutorsShowcase from "@/components/TutorsShowcase";
import AdmissionsRoadmap from "@/components/AdmissionsRoadmap";
import WhyChoose from "@/components/WhyChoose";
import ReviewsMarquee from "@/components/ReviewsMarquee";
import AcademyHighlights from "@/components/AcademyHighlights";
import About from "@/components/About";
import Countries from "@/components/Countries";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import WhatsApp from "@/components/WhatsApp";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TopBar />
      <NavBar />

      <main className="min-h-screen bg-[#fbf9f4] text-slate-900 overflow-x-hidden">
        {/* Hero Section with Lead Capture Form */}
        <HeroSection />

        {/* Interactive Recitation Audio Player & Tajweed Standards */}
        <AudioRecitationPreview />

        {/* 21st Tabbed Bento Grid Programs */}
        <ProgramsBento />

        {/* Dynamic Multi-Currency Tuition Calculator */}
        <PricingCalculator />

        {/* Verified Scholars & Alimahs Faculty Showcase */}
        <TutorsShowcase />

        {/* 4-Step Admissions Roadmap */}
        <AdmissionsRoadmap />

        {/* Institutional Pillars & Why Choose */}
        <div id="why-choose">
          <WhyChoose />
        </div>

        {/* Global Parent Testimonials Infinite Marquee */}
        <ReviewsMarquee />

        {/* Heritage, About & Highlights */}
        <div id="about">
          <About />
          <AcademyHighlights />
        </div>

        {/* Global Reach across 35+ Countries */}
        <Countries />

        {/* Frequently Asked Questions */}
        <FAQ />

        {/* Direct Contact & Support */}
        <div id="contact">
          <Contact />
        </div>
      </main>

      {/* Floating Interactive Elements */}
      <WhatsApp />
      <Chatbot />

      {/* Royal Emerald & Sacred Gold Footer */}
      <Footer />
    </>
  );
}