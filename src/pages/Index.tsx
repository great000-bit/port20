import { Helmet } from "react-helmet-async";
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
  "@id": "https://port20-chi.vercel.app/#person",
  "name": "Great Emman-Wori",
  "alternateName": ["Great Emman Wori","Emman-Wori","Creative Emman","greatemmanwori"],
  "url": "https://port20-chi.vercel.app",
  "image": {
    "@type": "ImageObject",
    "url": "https://port20-chi.vercel.app/great-emman-wori-fullstack-developer.png",
    "width": 800,
    "height": 800
  },
  "jobTitle": ["Fullstack Website Developer","Product Designer","UI/UX Designer","Founder"],
  "description": "Great Emman-Wori is a Fullstack Website Developer, Product Designer, and UI/UX Designer based in Port Harcourt, Nigeria. Founder of Creative Emman — a premium digital design and branding studio. Building modern websites, web applications, and digital brand experiences for global clients.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Port Harcourt",
    "addressRegion": "Rivers State",
    "addressCountry": "NG"
  },
  "email": "greatemmanwori@gmail.com",
  "telephone": "+234-810-388-7554",
  "gender": "Male",
  "nationality": "Nigerian",
  "knowsAbout": [
    "Fullstack Website Development","Frontend Development","Backend Development",
    "React","TypeScript","Laravel","WordPress","Figma","UI/UX Design",
    "Product Design","Responsive Web Design","SEO","Web Performance",
    "Elementor","Divi","Tailwind CSS","JavaScript","PHP"
  ],
  "knowsLanguage": ["English"],
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Fullstack Website Developer",
    "occupationLocation": { "@type": "Country", "name": "Nigeria" },
    "skills": "React, TypeScript, Laravel, WordPress, Figma, UI/UX Design, Product Design"
  },
  "worksFor": {
    "@type": "Organization",
    "name": "Creative Emman",
    "url": "https://emman-engineered.vercel.app/",
    "description": "Premium digital design and branding studio founded by Great Emman-Wori"
  },
  "founder": {
    "@type": "Organization",
    "name": "Creative Emman",
    "url": "https://emman-engineered.vercel.app/"
  },
  "sameAs": [
    "https://www.linkedin.com/in/great-emman-wori",
    "https://github.com/great000-bit",
    "https://msng.link/o?creative_emman=ig",
    "https://www.tiktok.com/@great_emman_wori",
    "https://emman-engineered.vercel.app/"
  ]
};

const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://port20-chi.vercel.app/#website",
  "name": "Great Emman-Wori — Portfolio",
  "alternateName": "Creative Emman Portfolio",
  "url": "https://port20-chi.vercel.app",
  "description": "Official portfolio of Great Emman-Wori — Fullstack Website Developer, Product Designer, and UI/UX Designer based in Port Harcourt, Nigeria.",
  "inLanguage": "en-US",
  "author": { "@id": "https://port20-chi.vercel.app/#person" },
  "publisher": { "@id": "https://port20-chi.vercel.app/#person" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://port20-chi.vercel.app/?s={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const SERVICE = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://port20-chi.vercel.app/#service",
  "name": "Great Emman-Wori — Fullstack Website Developer & Product Designer",
  "url": "https://port20-chi.vercel.app",
  "logo": "https://port20-chi.vercel.app/great-emman-wori-fullstack-developer.png",
  "image": "https://port20-chi.vercel.app/great-emman-wori-fullstack-developer.png",
  "description": "Premium fullstack website development, product design, and UI/UX design services for brands and businesses worldwide. Based in Port Harcourt, Nigeria — available remotely.",
  "areaServed": [
    { "@type": "Country", "name": "Nigeria" },
    { "@type": "AdministrativeArea", "name": "Rivers State" },
    { "@type": "Country", "name": "United Kingdom" },
    { "@type": "Country", "name": "Canada" },
    "Remote · Worldwide"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Development & Design Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fullstack Website Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UI/UX Design" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Product Design" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "WordPress Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Landing Page Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Portfolio Website Development" } }
    ]
  },
  "provider": { "@id": "https://port20-chi.vercel.app/#person" }
};

const PROJECTS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Selected Projects by Great Emman-Wori",
  "description": "Portfolio of fullstack website, product design, and UI/UX projects by Great Emman-Wori — Founder of Creative Emman.",
  "itemListElement": [
    { "@type":"CreativeWork","position":1,"name":"The Light Mission NGO Website","url":"https://www.thelightmission.com/","creator":{"@id":"https://port20-chi.vercel.app/#person"},"keywords":"Fullstack Website, Laravel, React, NGO" },
    { "@type":"CreativeWork","position":2,"name":"Timini Egbuson Actor Portfolio","url":"https://timini-egbuson-website-star.vercel.app/","creator":{"@id":"https://port20-chi.vercel.app/#person"},"keywords":"React Portfolio, Nollywood, Frontend Development" },
    { "@type":"CreativeWork","position":3,"name":"Funke Akindele Official Website","url":"https://funke-akindele-unveiled.vercel.app/","creator":{"@id":"https://port20-chi.vercel.app/#person"},"keywords":"Celebrity Website, React, Web Development" },
    { "@type":"CreativeWork","position":4,"name":"Bourdillon Omijeh Foundation","url":"https://www.bourdillonomijehfoundation.com/","creator":{"@id":"https://port20-chi.vercel.app/#person"},"keywords":"Nonprofit Website, UI/UX Design, WordPress" },
    { "@type":"CreativeWork","position":5,"name":"YouthUp Global EmpowerAfrika","url":"https://youthupglobal.com/empowerafrika/","creator":{"@id":"https://port20-chi.vercel.app/#person"},"keywords":"WordPress, Multilingual Website, International NGO" },
    { "@type":"CreativeWork","position":6,"name":"Bellostylez Fashion Blog Canada","url":"https://bellostylez.ca/blog/","creator":{"@id":"https://port20-chi.vercel.app/#person"},"keywords":"WordPress Blog, Fashion, Canada, SEO" },
    { "@type":"CreativeWork","position":7,"name":"WaContacts WhatsApp Business Directory","url":"https://wacontacts.com/","creator":{"@id":"https://port20-chi.vercel.app/#person"},"keywords":"Product Design, Business Platform, WhatsApp" }
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
