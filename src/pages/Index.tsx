import { Helmet } from "react-helmet";
import Navbar      from "../components/Navbar";
import Hero        from "../components/Hero";
import TechStack   from "../components/TechStack";
import About       from "../components/About";
import Services    from "../components/Services";
import Portfolio   from "../components/Portfolio";
import Experience  from "../components/Experience";
import CTABanner   from "../components/CTABanner";
import Contact     from "../components/Contact";
import Footer      from "../components/Footer";
import Testimonials from "../components/Testimonials";

const SCHEMA_PERSON = {
  "@context":"https://schema.org","@type":"Person",
  "name":"Great Emman-Wori",
  "url":"https://port20-chi.vercel.app",
  "image":"https://port20-chi.vercel.app/great-emman-profile.png",
  "jobTitle":"WordPress Developer, Product Designer & UI/UX Designer",
  "description":"Portfolio of Great Emman-Wori — WordPress Developer, Product Designer, and UI/UX Designer building responsive websites, digital products, and conversion-focused web experiences.",
  "address":{"@type":"PostalAddress","addressLocality":"Port Harcourt","addressRegion":"Rivers State","addressCountry":"Nigeria"},
  "email":"greatemmanwori@gmail.com","telephone":"+234-810-388-7554",
  "sameAs":["https://www.linkedin.com/in/great-emman-wori","https://github.com/great000-bit","https://msng.link/o?creative_emman=ig","https://www.tiktok.com/@great_emman_wori"],
};
const SCHEMA_SITE = {
  "@context":"https://schema.org","@type":"WebSite",
  "name":"Great Emman-Wori Portfolio","url":"https://port20-chi.vercel.app",
};

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Great Emman-Wori | WordPress Developer, Product Designer &amp; UI/UX Designer</title>
        <meta name="description" content="Portfolio of Great Emman-Wori — WordPress Developer, Product Designer, and UI/UX Designer building responsive websites, digital products, landing pages, and conversion-focused web experiences." />
        <meta name="keywords" content="Great Emman-Wori, WordPress Developer Nigeria, Product Designer, UI/UX Designer, web developer Port Harcourt, Elementor developer, Figma designer" />
        <link rel="canonical" href="https://port20-chi.vercel.app" />
        <meta property="og:title" content="Great Emman-Wori | WordPress Developer, Product Designer & UI/UX Designer" />
        <meta property="og:description" content="Portfolio of Great Emman-Wori — building responsive websites, digital products, and conversion-focused web experiences." />
        <meta property="og:image" content="https://port20-chi.vercel.app/great-emman-profile.png" />
        <meta property="og:url" content="https://port20-chi.vercel.app" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Great Emman-Wori | WordPress Developer, Product Designer & UI/UX Designer" />
        <meta name="twitter:description" content="Portfolio of Great Emman-Wori — building responsive websites, digital products, and conversion-focused web experiences." />
        <meta name="twitter:image" content="https://port20-chi.vercel.app/great-emman-profile.png" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA_PERSON)}</script>
        <script type="application/ld+json">{JSON.stringify(SCHEMA_SITE)}</script>
      </Helmet>

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
