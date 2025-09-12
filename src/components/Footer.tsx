import { Linkedin } from "lucide-react";
import { Helmet } from "react-helmet";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-portfolioTheme-secondary border-t border-gray-800 py-8">
      <Helmet>
        <meta name="description" content="Explore Great Emman-Wori's portfolio. Get in touch through LinkedIn for collaboration opportunities and professional networking." />
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "Person",
              "name": "Great Emman-Wori",
              "url": "https://www.linkedin.com/in/great-emman-wori",
              "sameAs": [
                "https://www.linkedin.com/in/great-emman-wori"
              ]
            }
          `}
        </script>
      </Helmet>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and copyright */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-heading font-bold">
              <span className="text-portfolioTheme-primary">Great</span> Emman-Wori
            </h2>
            <p className="text-sm text-portfolioTheme-textAccent mt-2">
              &copy; {currentYear} All rights reserved.
            </p>
          </div>
          
          {/* Quick links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#home" className="text-portfolioTheme-textAccent hover:text-portfolioTheme-primary transition-colors" aria-label="Home page">Home</a>
            <a href="#about" className="text-portfolioTheme-textAccent hover:text-portfolioTheme-primary transition-colors" aria-label="About me page">About</a>
            <a href="#services" className="text-portfolioTheme-textAccent hover:text-portfolioTheme-primary transition-colors" aria-label="Services page">Services</a>
            <a href="#portfolio" className="text-portfolioTheme-textAccent hover:text-portfolioTheme-primary transition-colors" aria-label="Portfolio page">Portfolio</a>
            <a href="#testimonials" className="text-portfolioTheme-textAccent hover:text-portfolioTheme-primary transition-colors" aria-label="Testimonials page">Testimonials</a>
            <a href="#contact" className="text-portfolioTheme-textAccent hover:text-portfolioTheme-primary transition-colors" aria-label="Contact page">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
