import { Download } from "lucide-react";
import { Helmet } from "react-helmet";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-16 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0f0f0f]"
    >
      <Helmet>
        <title>Great Emman-Wori | WordPress Developer & Product Designer</title>
        <meta
          name="description"
          content="I'm Great Emman-Wori, a creative technologist blending design and development into seamless digital experiences. Explore my portfolio and hire me to bring your ideas to life!"
        />
      </Helmet>

      <div className="container mx-auto px-4 py-16 flex md:flex-row flex-col gap-10 items-center">
        {/* Left Column - Text Content */}
        <div
          className="flex flex-col md:gap-8 gap-4 order-2 md:order-1 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <h1 className="text-4xl lg:text-[70px] font-bold capitalize">
            I'm Great E<span className="text-portfolioTheme-accent">.</span>
          </h1>

          <h2 className="text-md md:text-lg font-medium flex gap-x-4 font-heading flex-wrap">
            <span className="hover:text-portfolioTheme-accent transition-colors duration-300 cursor-pointer">Web Developer</span>
            <span>|</span>
            <span className="hover:text-portfolioTheme-accent transition-colors duration-300 cursor-pointer">Product Designer</span>
            <span>|</span>
            <span className="hover:text-portfolioTheme-accent transition-colors duration-300 cursor-pointer">UI/UX Designer</span>
          </h2>

          <p className="text-portfolioTheme-textAccent text-lg max-w-xl">
            I'm Great Emman-wori. A creative technologist who blends design and development into seamless digital experiences. From WordPress frameworks like Elementor and Divi to design systems in Figma, I transform ideas into high-impact products that don't just look good, they work beautifully. Let's{" "}
            <span className="text-portfolioTheme-accent">collaborate</span> to
            bring something truly exceptional to life.
          </p>

          <div className="flex flex-wrap items-center justify-start gap-4">
            {/* Primary Button - Explore My Work */}
              
              <a
                href="#portfolio"
                className="relative bg-portfolioTheme-accent text-white px-6 py-3 rounded-md font-bold uppercase transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-portfolioTheme-accent/50 overflow-hidden group"
              >
                <span className="relative z-10">Explore My Work</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#8F0075] to-[#f59e0b] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </a>
            {/* Secondary Button - Hire Me */}
            
            <a
              href="#contact"
              className="relative bg-transparent border-2 border-portfolioTheme-accent text-portfolioTheme-textMain px-6 py-3 rounded-md font-bold uppercase transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden group"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Hire Me</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#8F0075] to-[#f59e0b] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </a>
            {/* Resume Button with Download Icon */}
            
            <a
              href="/My cv.pdf"
              download="My cv.pdf"
              className="relative group bg-portfolioTheme-accent text-white px-6 py-3 rounded-md font-bold uppercase transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-portfolioTheme-accent/50 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Resume <Download size={18} className="group-hover:translate-y-1 transition-transform duration-300" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#8F0075] to-[#f59e0b] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </a>
          </div>
        </div>

        {/* Right Column - Avatar */}
        <div
          className="order-1 md:order-2 flex-grow flex justify-center md:justify-end animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="relative">
            {/* Avatar with WebP support and lazy loading */}
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-portfolioTheme-cardBg border-4 border-portfolioTheme-accent overflow-hidden hover:scale-105 transition-transform duration-500 shadow-2xl shadow-portfolioTheme-accent/20">
              <picture>
                {/* WebP for browsers that support it */}
                <source srcSet="/creative-emman-pic.webp" type="image/webp" />
                {/* Fallback PNG image */}
                <img
                  src="/creative-emman-pic.png"
                  alt="Great Emman-Wori"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </picture>
            </div>

            {/* Decorative circles with glow */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-portfolioTheme-accent opacity-30 blur-2xl -z-10 animate-pulse"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-portfolioTheme-accent opacity-20 blur-xl -z-10 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;