import { Download } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-16 bg-gradient-to-br from-portfolioTheme-secondary to-portfolioTheme-cardBg"
    >
      <div className="container mx-auto px-4 py-16 flex md:flex-row flex-col gap-10 items-center">
        {/* Left Column - Text Content */}
        <div
          className="flex flex-col md:gap-8 gap-4 order-2 md:order-1 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <h1 className="text-4xl lg:text-[70px] font-bold capitalize">
            I'm Creative E<span className="text-portfolioTheme-primary">.</span>
          </h1>

          <h2 className="text-md md:text-lg font-medium flex gap-x-4 font-heading flex-wrap">
            <span>WordPress Developer</span>
            <span>|</span>
            <span> Product Designer</span>
            <span>|</span>
            <span>UI/UX Designer</span>
          </h2>

          <p className="text-portfolioTheme-textAccent text-lg max-w-xl">
            I’m Great Emman-wori, a WordPress Developer & UI/UX Designer blending creativity and code to build lovable websites that work beautifully. Whether it’s Elementor, Divi, or Figma, I turn ideas into digital magic. Let's{" "}
            <span className="text-portfolioTheme-accent">collaborate</span> to
            bring something truly exceptional to life.
          </p>

          <div className="flex flex-wrap items-center justify-start gap-4">
            <a
              href="#portfolio"
              className="bg-portfolioTheme-accent hover:bg-amber-600 text-portfolioTheme-secondary px-6 py-3 rounded-md font-bold uppercase transition-colors duration-300"
            >
              Explore My Work
            </a>
            <a
              href="#contact"
              className="bg-portfolioTheme-secondary border-2 border-portfolioTheme-accent text-portfolioTheme-textMain hover:bg-portfolioTheme-accent hover:text-portfolioTheme-secondary px-6 py-3 rounded-md font-bold uppercase transition-colors duration-300"
            >
              Hire Me
            </a>
            <a
              href="/assets/My Resume.pdf"
              download="Great-Emman-Wori-Resume.pdf"
              className="bg-portfolioTheme-accent hover:bg-amber-600 text-portfolioTheme-secondary px-6 py-3 rounded-md font-bold uppercase transition-colors duration-300 flex items-center gap-2"
            >
              Resume <Download size={18} />
            </a>
          </div>
        </div>

        {/* Right Column - Avatar */}
        <div
          className="order-1 md:order-2 flex-grow flex justify-center md:justify-end animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="relative">
            {/* Placeholder for actual avatar - replace with real image */}
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-portfolioTheme-cardBg border-4 border-portfolioTheme-primary overflow-hidden">
              <img
                src="/creative-emman-pic.png"
                alt="Great Emman-Wori"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative circle */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-portfolioTheme-primary opacity-30 -z-10"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-portfolioTheme-primary opacity-20 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;