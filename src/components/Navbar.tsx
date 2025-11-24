import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  
  // Handle scroll event to change navbar background and detect active section
  useEffect(() => {
    const handleScroll = () => {
      // Change navbar appearance on scroll
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Detect active section for highlighting current nav item
      const sections = ["hero", "about", "services", "portfolio", "testimonials", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items with SEO-optimized labels and ARIA descriptions
  const navItems = [
    { 
      name: "About", 
      href: "#about", 
      ariaLabel: "About Great Emman-Wori - Learn about my background, skills, and experience as a WordPress developer and product designer" 
    },
    { 
      name: "Services", 
      href: "#services", 
      ariaLabel: "Web Development and Design Services - WordPress development, UI/UX design, product design, and responsive web design" 
    },
    { 
      name: "Portfolio", 
      href: "#portfolio", 
      ariaLabel: "View Portfolio Projects - 13+ completed web development and design projects showcasing expertise" 
    },
    { 
      name: "Testimonials", 
      href: "#testimonials", 
      ariaLabel: "Client Testimonials and Reviews - See what clients say about working with Creative Emman" 
    },
    { 
      name: "Contact", 
      href: "#contact", 
      ariaLabel: "Contact Great Emman-Wori - Get in touch to discuss your next web development or design project" 
    },
  ];

  const handleNavClick = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-portfolioTheme-secondary/95 backdrop-blur-lg shadow-lg border-b border-gray-700/30' : 'py-5 bg-transparent'}`}
      role="navigation"
      aria-label="Main navigation"
      aria-expanded={isOpen}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo - SEO Critical */}
        <a 
          href="#hero" 
          className="group text-2xl font-heading font-bold relative overflow-hidden flex-shrink-0" 
          aria-label="Creative Emman - WordPress Developer & Product Designer - Home"
          title="Back to home"
          onClick={handleNavClick}
        >
          <span 
            className="relative z-10 bg-gradient-to-r from-portfolioTheme-primary via-portfolioTheme-accent to-portfolioTheme-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] transition-all duration-300 group-hover:scale-105 inline-block"
          >
            Creative
          </span>
          <span className="relative z-10 text-portfolioTheme-textMain group-hover:text-white transition-colors duration-300"> Emman</span>
          <span 
            className="relative z-10 text-portfolioTheme-primary text-4xl leading-none group-hover:text-portfolioTheme-accent transition-colors duration-300" 
            aria-hidden="true"
          >
            .
          </span>
          
          {/* Animated underline */}
          <span 
            className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-portfolioTheme-primary to-portfolioTheme-accent group-hover:w-full transition-all duration-500" 
            aria-hidden="true"
          ></span>
        </a>

        {/* Desktop Navigation with semantic HTML and SEO attributes */}
        <ul 
          className="hidden md:flex items-center space-x-2 bg-portfolioTheme-cardBg/50 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700/30" 
          role="menubar"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <li key={item.name} role="none">
                <a 
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300 group ${
                    isActive 
                      ? 'text-white bg-gradient-to-r from-portfolioTheme-primary to-portfolioTheme-accent shadow-lg' 
                      : 'text-portfolioTheme-textAccent hover:text-white'
                  }`}
                  aria-label={item.ariaLabel}
                  aria-current={isActive ? 'page' : undefined}
                  role="menuitem"
                  tabIndex={isActive ? 0 : -1}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Hover background effect */}
                  {!isActive && (
                    <span 
                      className="absolute inset-0 bg-portfolioTheme-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" 
                      aria-hidden="true"
                    ></span>
                  )}
                  
                  {/* Active indicator dot */}
                  {isActive && (
                    <span 
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse" 
                      aria-hidden="true"
                    ></span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA Button (Desktop) - SEO Optimized */}
        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 bg-gradient-to-r from-portfolioTheme-primary to-portfolioTheme-accent hover:from-portfolioTheme-accent hover:to-portfolioTheme-primary text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-2xl hover:shadow-portfolioTheme-primary/50 transition-all duration-300 hover:scale-105 flex-shrink-0"
          aria-label="Contact Great Emman-Wori - Let's discuss your web development and design project"
          title="Start a conversation about your project"
          role="button"
        >
          <span>Let's Talk</span>
          <svg 
            className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>

        {/* Mobile Navigation Toggle - Accessible */}
        <button
          className="md:hidden relative w-10 h-10 rounded-full bg-portfolioTheme-cardBg border border-gray-700/50 flex items-center justify-center text-portfolioTheme-textMain hover:border-portfolioTheme-primary hover:text-portfolioTheme-primary transition-all duration-300 flex-shrink-0"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          type="button"
        >
          <div className="relative w-6 h-6">
            <span 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isOpen ? 'rotate-45 opacity-100' : 'rotate-0 opacity-0'}`}
            >
              <X size={20} aria-hidden="true" />
            </span>
            <span 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isOpen ? 'rotate-0 opacity-0' : 'rotate-0 opacity-100'}`}
            >
              <Menu size={20} aria-hidden="true" />
            </span>
          </div>
        </button>
      </div>

      {/* Mobile Navigation Menu - Semantic and Accessible */}
      <div 
        id="mobile-menu"
        className={`md:hidden absolute top-full left-0 w-full bg-portfolioTheme-cardBg/98 backdrop-blur-lg border-b border-gray-700/30 shadow-2xl transition-all duration-500 origin-top ${
          isOpen ? 'scale-y-100 opacity-100 visible' : 'scale-y-0 opacity-0 invisible'
        }`}
        role="menu"
      >
        <ul className="container mx-auto px-4 py-6 flex flex-col space-y-2" role="none">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <li 
                key={item.name}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                role="none"
              >
                <a 
                  href={item.href}
                  className={`group flex items-center justify-between px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-portfolioTheme-primary to-portfolioTheme-accent text-white shadow-lg' 
                      : 'bg-portfolioTheme-secondary/50 text-portfolioTheme-textAccent hover:bg-portfolioTheme-secondary hover:text-white'
                  }`}
                  onClick={handleNavClick}
                  aria-label={item.ariaLabel}
                  aria-current={isActive ? 'page' : undefined}
                  role="menuitem"
                >
                  <span className="flex items-center gap-3">
                    {isActive && (
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" aria-hidden="true"></span>
                    )}
                    {item.name}
                  </span>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </li>
            );
          })}
          
          {/* Mobile CTA Button */}
          <li className="pt-4" role="none">
            <a
              href="#contact"
              onClick={handleNavClick}
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-portfolioTheme-primary to-portfolioTheme-accent text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
              aria-label="Contact Great Emman-Wori - Let's discuss your web development and design project"
              title="Start a conversation about your project"
              role="menuitem"
            >
              <span>Let's Talk</span>
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </li>
        </ul>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;