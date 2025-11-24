import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  // SEO Configuration for home page
  const SEO_DATA = {
    title: "Great Emman-Wori | WordPress Developer & Product Designer Portfolio",
    description: "Creative technologist specializing in WordPress development with Elementor & Divi, UI/UX design, and product design. Transform your ideas into high-impact digital experiences. 2+ years experience from Nigeria.",
    keywords: "WordPress developer, product designer, UI/UX designer, Elementor expert, Divi developer, Figma designer, web developer, Great Emman-Wori, creative technologist, Nigeria developer, portfolio",
    url: "https://creative-emman.vercel.app",
    image: "https://creative-emman.vercel.app/creative-emman-pic.webp",
  };

  // Breadcrumb Schema for SEO
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SEO_DATA.url
      }
    ]
  };

  // WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": SEO_DATA.title,
    "description": SEO_DATA.description,
    "url": SEO_DATA.url,
    "image": SEO_DATA.image,
    "mainEntity": {
      "@type": "Person",
      "name": "Great Emman-Wori",
      "jobTitle": "WordPress Developer & Product Designer",
      "url": SEO_DATA.url,
      "image": SEO_DATA.image
    }
  };

  useEffect(() => {
    // Smooth scroll functionality for navigation
    const handleHashChange = () => {
      if (window.location.hash) {
        const element = document.querySelector(window.location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Handle initial hash on page load
    if (window.location.hash) {
      setTimeout(handleHashChange, 100);
    }

    // Attach click event listeners to anchor links for smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href') || '';
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          window.history.pushState(null, '', href);
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{SEO_DATA.title}</title>
        <meta name="title" content={SEO_DATA.title} />
        <meta name="description" content={SEO_DATA.description} />
        <meta name="keywords" content={SEO_DATA.keywords} />
        <meta name="author" content="Great Emman-Wori" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={SEO_DATA.url} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SEO_DATA.url} />
        <meta property="og:title" content={SEO_DATA.title} />
        <meta property="og:description" content={SEO_DATA.description} />
        <meta property="og:image" content={SEO_DATA.image} />
        <meta property="og:image:alt" content="Great Emman-Wori - WordPress Developer and Product Designer" />
        <meta property="og:site_name" content="Great Emman-Wori Portfolio" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={SEO_DATA.url} />
        <meta name="twitter:title" content={SEO_DATA.title} />
        <meta name="twitter:description" content={SEO_DATA.description} />
        <meta name="twitter:image" content={SEO_DATA.image} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(webPageSchema)}
        </script>
      </Helmet>

      <main className="font-heading min-h-screen" role="main">
        <Navbar />
        <section id="hero" aria-label="Hero section showcasing portfolio">
          <Hero />
        </section>
        <section id="about" aria-label="About Great Emman-Wori">
          <About />
        </section>
        <section id="services" aria-label="Services offered">
          <Services />
        </section>
        <section id="portfolio" aria-label="Portfolio projects">
          <Portfolio />
        </section>
        <section id="testimonials" aria-label="Client testimonials">
          <Testimonials />
        </section>
        <section id="contact" aria-label="Contact form">
          <Contact />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Index;