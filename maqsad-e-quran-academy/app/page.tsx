import About from "@/components/About";
import AcademyHighlights from "@/components/AcademyHighlights";
import Contact from "@/components/Contact";
import Countries from "@/components/Countries";
import Courses from "@/components/Courses";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LearningProcess from "@/components/LearningProcess";
import NavBar from "@/components/NavBar";
import Programs from "@/components/Programs";
import Reviews from "@/components/Reviews";
import Teachers from "@/components/Teachers";
import TopBar from "@/components/TopBar";
import WhatsApp from "@/components/WhatsApp";
import WhyChoose from "@/components/WhyChoose";

export default function Home() {
  return (
    <>
      <TopBar />
      <NavBar />

      <main>
        <div id="home">
          <Hero />
        </div>

        <About />
        <AcademyHighlights />
        <Programs />

        <div id="courses">
          <Courses />
        </div>

        <WhyChoose />
        <LearningProcess />
        <Teachers />
        <Reviews />
        <Countries />
        <FAQ />
        <Contact />
      </main>

      <WhatsApp />
      <Footer />
    </>
  );
}