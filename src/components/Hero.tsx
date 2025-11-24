import { useRef, useEffect, useCallback, useMemo } from "react";
import { Download } from "lucide-react";
import { Helmet } from "react-helmet";

// ===== DOTGRID BACKGROUND =====
function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

interface Dot { cx: number; cy: number; xOffset: number; yOffset: number; vx: number; vy: number; }

const DotGridBackground = ({
  dotSize = 3, gap = 25, baseColor = "#2a2a2a", activeColor = "#8F0075",
  proximity = 80, shockRadius = 150, shockStrength = 1.5,
}: { dotSize?: number; gap?: number; baseColor?: string; activeColor?: string;
  proximity?: number; shockRadius?: number; shockStrength?: number; }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({ x: -1000, y: -1000 });
  const containerRef = useRef<HTMLDivElement>(null);
  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const buildGrid = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const { width, height } = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;
    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;
    const startX = (width - gridW) / 2 + dotSize / 2;
    const startY = (height - gridH) / 2 + dotSize / 2;
    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dots.push({ cx: startX + x * cell, cy: startY + y * cell, xOffset: 0, yOffset: 0, vx: 0, vy: 0 });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    let rafId: number;
    const proxSq = proximity * proximity;
    const springK = 0.08;
    const damping = 0.92;
    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: px, y: py } = pointerRef.current;
      const radius = dotSize / 2;
      for (const dot of dotsRef.current) {
        const ax = -springK * dot.xOffset;
        const ay = -springK * dot.yOffset;
        dot.vx = (dot.vx + ax) * damping;
        dot.vy = (dot.vy + ay) * damping;
        dot.xOffset += dot.vx;
        dot.yOffset += dot.vy;
        if (Math.abs(dot.xOffset) < 0.05 && Math.abs(dot.vx) < 0.05) { dot.xOffset = 0; dot.vx = 0; }
        if (Math.abs(dot.yOffset) < 0.05 && Math.abs(dot.vy) < 0.05) { dot.yOffset = 0; dot.vy = 0; }
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;
        let r = baseRgb.r, g = baseRgb.g, b = baseRgb.b;
        if (dsq <= proxSq) {
          const t = 1 - Math.sqrt(dsq) / proximity;
          r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
        }
        ctx.beginPath();
        ctx.arc(ox, oy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [proximity, baseRgb, activeRgb, dotSize]);

  useEffect(() => {
    buildGrid();
    const ro = new ResizeObserver(buildGrid);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [buildGrid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
    };
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius) {
          const falloff = Math.max(0, 1 - dist / shockRadius);
          dot.vx += (dot.cx - cx) * shockStrength * falloff * 0.1;
          dot.vy += (dot.cy - cy) * shockStrength * falloff * 0.1;
        }
      }
    };
    const handleMouseLeave = () => { pointerRef.current.x = -1000; pointerRef.current.y = -1000; };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [shockRadius, shockStrength]);

  return (
    <div ref={containerRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "auto" }} />
    </div>
  );
};

// ===== HERO COMPONENT =====
const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-16 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0f0f0f]"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* DotGrid Background */}
      <DotGridBackground dotSize={3} gap={25} baseColor="#2a2a2a" activeColor="#8F0075" proximity={80} shockRadius={150} shockStrength={1.5} />

      <Helmet>
        <title>Great Emman-Wori | WordPress Developer & Product Designer</title>
        <meta name="description" content="I'm Great Emman-Wori, a creative technologist blending design and development into seamless digital experiences." />
      </Helmet>

      <div className="container mx-auto px-4 py-16 flex md:flex-row flex-col gap-10 items-center" style={{ position: "relative", zIndex: 1 }}>
        {/* Left Column - Text Content */}
        <div className="flex flex-col md:gap-8 gap-4 order-2 md:order-1 animate-fade-in" style={{ animationDelay: "0.2s" }}>
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
            <span className="text-portfolioTheme-accent">collaborate</span> to bring something truly exceptional to life.
          </p>

          <div className="flex flex-wrap items-center justify-start gap-4">
            <a href="#portfolio" className="relative bg-portfolioTheme-accent text-white px-6 py-3 rounded-md font-bold uppercase transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-portfolioTheme-accent/50 overflow-hidden group">
              <span className="relative z-10">Explore My Work</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#8F0075] to-[#f59e0b] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </a>
            <a href="#contact" className="relative bg-transparent border-2 border-portfolioTheme-accent text-portfolioTheme-textMain px-6 py-3 rounded-md font-bold uppercase transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden group">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Hire Me</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#8F0075] to-[#f59e0b] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </a>
            <a href="/My cv.pdf" download="My cv.pdf" className="relative group bg-portfolioTheme-accent text-white px-6 py-3 rounded-md font-bold uppercase transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-portfolioTheme-accent/50 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Resume <Download size={18} className="group-hover:translate-y-1 transition-transform duration-300" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#8F0075] to-[#f59e0b] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </a>
          </div>
        </div>

        {/* Right Column - Avatar */}
        <div className="order-1 md:order-2 flex-grow flex justify-center md:justify-end animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-portfolioTheme-cardBg border-4 border-portfolioTheme-accent overflow-hidden hover:scale-105 transition-transform duration-500 shadow-2xl shadow-portfolioTheme-accent/20">
              <picture>
                <source srcSet="/creative-emman-pic.webp" type="image/webp" />
                <img src="/creative-emman-pic.png" alt="Great Emman-Wori" className="w-full h-full object-cover" loading="lazy" />
              </picture>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-portfolioTheme-accent opacity-30 blur-2xl -z-10 animate-pulse"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-portfolioTheme-accent opacity-20 blur-xl -z-10 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;