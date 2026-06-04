import { ArrowRight, Download } from "lucide-react";
import { useEffect, useRef } from "react";

const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const stars: { x: number; y: number; r: number; opacity: number; speed: number }[] = [];
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    const init = () => {
      stars.length = 0;
      for (let i = 0; i < 120; i++) stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.4 + 0.3, opacity: Math.random() * 0.6 + 0.15, speed: Math.random() * 0.25 + 0.04 });
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) { ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${s.opacity})`; ctx.fill(); s.y -= s.speed; if (s.y < -2) { s.y = canvas.height + 2; s.x = Math.random() * canvas.width; } }
      animId = requestAnimationFrame(draw);
    };
    resize(); init(); draw();
    const ro = new ResizeObserver(() => { resize(); init(); }); ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} aria-hidden="true" />;
};

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen bg-[#080b12] relative overflow-hidden flex items-center">
      <StarBackground />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16">

          {/* LEFT — text */}
          <div className="flex-1 w-full text-center md:text-left">
            {/* Available badge */}
            <div className="flex items-center gap-2 mb-5 justify-center md:justify-start">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <span className="text-green-400 text-sm font-medium">Available for work</span>
            </div>

            {/* Heading — Geist-style, natural wrap */}
            <h1
              className="text-[2.4rem] sm:text-[2.8rem] md:text-[3rem] lg:text-[3.5rem] text-white leading-[1.15] mb-5 tracking-tight"
              style={{ fontWeight: 400 }}
            >
              I'm Great Emman-Wori{" "}
              I build{" "}
              <span style={{ fontWeight: 700 }}>impactful</span>{" "}
              websites, and digital products.
            </h1>

            {/* Bio */}
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto md:mx-0">
              Web developer, product designer, and creative technologist — passionate about crafting
              accessible, human-centered digital experiences. From WordPress builds to full-stack
              apps and UI/UX design systems.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href="#portfolio"
                className="px-6 py-3 bg-white text-black rounded-lg font-semibold text-sm hover:bg-gray-100 transition-all duration-300"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3 border border-gray-600 text-white rounded-lg font-semibold text-sm hover:border-portfolioTheme-primary hover:text-portfolioTheme-primary transition-all duration-300"
              >
                Contact Me <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/My cv.pdf"
                download="Great-Emman-Wori-CV.pdf"
                className="flex items-center gap-2 px-6 py-3 bg-portfolioTheme-primary text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-all duration-300"
              >
                Resume <Download className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* RIGHT — profile image */}
          <div className="flex-shrink-0 flex justify-center md:justify-end w-full md:w-auto">
            <div
              className="rounded-full overflow-hidden border-2 border-gray-700"
              style={{ width: "clamp(200px, 30vw, 360px)", height: "clamp(200px, 30vw, 360px)" }}
            >
              <img
                src="/great-emman-profile.png"
                alt="Great Emman-Wori"
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
