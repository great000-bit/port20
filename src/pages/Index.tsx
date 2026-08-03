import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TechStack from "../components/TechStack";
import About from "../components/About";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import Experience from "../components/Experience";
import CTABanner from "../components/CTABanner";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";

export default function Index() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] btn-red">
        Skip to content
      </a>

      <Navbar />
      <main id="main">
        <Hero />
        <TechStack />
        <About />
        <Services />
        <Portfolio />
        <Experience />
        <Testimonials />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
