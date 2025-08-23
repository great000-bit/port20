
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-portfolioTheme-secondary border-t border-gray-800 py-8">
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
            <a href="#home" className="text-portfolioTheme-textAccent hover:text-portfolioTheme-primary transition-colors">Home</a>
            <a href="#about" className="text-portfolioTheme-textAccent hover:text-portfolioTheme-primary transition-colors">About</a>
            <a href="#services" className="text-portfolioTheme-textAccent hover:text-portfolioTheme-primary transition-colors">Services</a>
            <a href="#portfolio" className="text-portfolioTheme-textAccent hover:text-portfolioTheme-primary transition-colors">Portfolio</a>
            <a href="#testimonials" className="text-portfolioTheme-textAccent hover:text-portfolioTheme-primary transition-colors">Testimonials</a>
            <a href="#contact" className="text-portfolioTheme-textAccent hover:text-portfolioTheme-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
