
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll event to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 py-4 transition-all duration-300 ${scrolled ? 'bg-portfolioTheme-secondary bg-opacity-95 shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo with styled period */}
        <a href="#home" className="text-2xl font-heading font-bold text-portfolioTheme-textMain">
  <span className="text-portfolioTheme-primary">Creative</span>
  <span> Emman</span>
  <span className="text-portfolioTheme-primary">.</span>
</a>

    

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <a 
                href={item.href}
                className="text-portfolioTheme-textMain hover:text-portfolioTheme-accent transition-colors duration-300 font-medium"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-portfolioTheme-textMain"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-portfolioTheme-cardBg animate-fade-in">
          <ul className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <a 
                  href={item.href}
                  className="block py-2 text-portfolioTheme-textMain hover:text-portfolioTheme-accent transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
