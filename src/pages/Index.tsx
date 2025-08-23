
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  // Smooth scroll functionality for anchor links
  useEffect(() => {
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
      // Small timeout to ensure the DOM is fully loaded
      setTimeout(handleHashChange, 100);
    }

    // Handle click events on anchor links
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

    // Handle browser back/forward navigation
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Update document title
  useEffect(() => {
    document.title = "Great Emman-Wori | WordPress Developer & Product Designer";
  }, []);

  return (
    <div className="font-heading min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
