import { Download, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

// Simple star/particle background — lightweight canvas
const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const stars: { x: number; y: number; r: number; opacity: number; speed: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      stars.length = 0;
      for (let i = 0; i < 120; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.7 + 0.2,
          speed: Math.random() * 0.3 + 0.05,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fill();
        s.y -= s.speed;
        if (s.y < -2) { s.y = canvas.height + 2; s.x = Math.random() * canvas.width; }
      }
      animId = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);

    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
};

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center bg-[#080b12] relative overflow-hidden pt-20"
    >
      <StarBackground />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          {/* Left — text */}
          <div className="flex-1 max-w-2xl">
            {/* Available badge */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-sm font-medium">Available for work</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 normal-case tracking-tight">
              I'm Great Emman-Wori<br />
              <span className="text-white">I build </span>
              <span className="text-portfolioTheme-primary">impactful</span>
              <span className="text-white"> websites,<br />designs & digital products.</span>
            </h1>

            {/* Bio */}
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
              Web developer, product designer, and creative technologist — passionate about crafting accessible, human-centered digital experiences. From WordPress builds to full-stack apps and UI/UX design systems.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#portfolio"
                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 border border-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:border-portfolioTheme-primary hover:text-portfolioTheme-primary transition-all duration-300"
              >
                Contact Me <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/My cv.pdf"
                download="Great-Emman-Wori-Resume.pdf"
                className="flex items-center gap-2 bg-portfolioTheme-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300"
              >
                Resume <Download className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right — profile image */}
          <div className="flex-shrink-0 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-portfolioTheme-primary/40 shadow-2xl shadow-portfolioTheme-primary/20">
              <img
                src="/great-emman-profile.png"
                alt="Great Emman-Wori — Web Developer & Product Designer"
                className="w-full h-full object-cover object-top"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
