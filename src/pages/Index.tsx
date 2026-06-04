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

/* ── JSON-LD Schemas ── */
const PERSON = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Great Emman-Wori",
  "url": "https://port20-chi.vercel.app",
  "image": "https://port20-chi.vercel.app/great-emman-wori-fullstack-developer.png",
  "jobTitle": ["Fullstack Website Developer", "Product Designer", "UI/UX Designer"],
  "description": "Fullstack Website Developer, Product Designer, and UI/UX Designer building modern websites, web apps, landing pages, and digital product experiences for brands and businesses.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Port Harcourt",
    "addressRegion": "Rivers State",
    "addressCountry": "NG"
  },
  "email": "greatemmanwori@gmail.com",
  "telephone": "+234-810-388-7554",
  "knowsAbout": [
    "Fullstack Development","Frontend Development","Backend Development",
    "Website Development","Product Design","UI/UX Design",
    "Responsive Web Design","SEO","Web Performance",
    "React","TypeScript","Laravel","WordPress","Figma"
  ],
  "sameAs": [
    "https://www.linkedin.com/in/great-emman-wori",
    "https://github.com/great000-bit",
    "https://msng.link/o?creative_emman=ig",
    "https://www.tiktok.com/@great_emman_wori"
  ]
};

const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Great Emman-Wori Portfolio",
  "url": "https://port20-chi.vercel.app",
  "description": "Portfolio of Great Emman-Wori — Fullstack Website Developer, Product Designer, and UI/UX Designer.",
  "author": { "@type": "Person", "name": "Great Emman-Wori" }
};

const SERVICE = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Great Emman-Wori — Fullstack Website Developer",
  "url": "https://port20-chi.vercel.app",
  "description": "Fullstack website development, product design, and UI/UX design services for brands and businesses.",
  "areaServed": ["Nigeria", "Remote", "Worldwide"],
  "serviceType": [
    "Fullstack Website Development",
    "Frontend Development",
    "Product Design",
    "UI/UX Design",
    "Landing Page Development",
    "Business Website Development",
    "Portfolio Website Development"
  ],
  "provider": { "@type": "Person", "name": "Great Emman-Wori" }
};

const PROJECTS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Selected Projects by Great Emman-Wori",
  "description": "A selection of fullstack website, product design, and UI/UX projects by Great Emman-Wori.",
  "itemListElement": [
    { "@type": "CreativeWork", "position": 1, "name": "Bellostylez Blog", "url": "https://bellostylez.ca/blog/", "creator": {"@type":"Person","name":"Great Emman-Wori"}, "keywords": "WordPress, Blog, Responsive Website" },
    { "@type": "CreativeWork", "position": 2, "name": "Bourdillon Omijeh Foundation", "url": "https://www.bourdillonomijehfoundation.com/", "creator": {"@type":"Person","name":"Great Emman-Wori"}, "keywords": "Nonprofit Website, UI/UX Design" },
    { "@type": "CreativeWork", "position": 3, "name": "YouthUp Global", "url": "https://youthupglobal.com/empowerafrika/", "creator": {"@type":"Person","name":"Great Emman-Wori"}, "keywords": "WordPress, Responsive Website, International" },
    { "@type": "CreativeWork", "position": 4, "name": "The Light Mission NGO", "url": "https://www.thelightmission.com/", "creator": {"@type":"Person","name":"Great Emman-Wori"}, "keywords": "Fullstack Website, Laravel, React, NGO" },
    { "@type": "CreativeWork", "position": 5, "name": "SuiBiz Web3 Marketplace", "url": "https://suibiz.vercel.app/", "creator": {"@type":"Person","name":"Great Emman-Wori"}, "keywords": "UI/UX Design, Web3, Marketplace, Figma" },
    { "@type": "CreativeWork", "position": 6, "name": "Timini Egbuson Portfolio", "url": "https://timini-egbuson-website-star.vercel.app/", "creator": {"@type":"Person","name":"Great Emman-Wori"}, "keywords": "Portfolio Website, React, Frontend Development" },
    { "@type": "CreativeWork", "position": 7, "name": "Funke Akindele Official Website", "url": "https://funke-akindele-unveiled.vercel.app/", "creator": {"@type":"Person","name":"Great Emman-Wori"}, "keywords": "Website Development, React, Celebrity Portfolio" },
  ]
};

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Great Emman-Wori | Fullstack Website Developer &amp; Product Designer</title>
        <meta name="description" content="Portfolio of Great Emman-Wori, a Fullstack Website Developer, Product Designer, and UI/UX Designer building modern websites, responsive web apps, landing pages, and digital experiences for brands and businesses." />
        <link rel="canonical" href="https://port20-chi.vercel.app/" />
        <script type="application/ld+json">{JSON.stringify(PERSON)}</script>
        <script type="application/ld+json">{JSON.stringify(WEBSITE)}</script>
        <script type="application/ld+json">{JSON.stringify(SERVICE)}</script>
        <script type="application/ld+json">{JSON.stringify(PROJECTS_SCHEMA)}</script>
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
