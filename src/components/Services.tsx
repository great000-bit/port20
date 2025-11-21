import { useRef, useEffect, useCallback, useMemo } from "react";
import { Code, LayoutDashboard, Smartphone, Globe, Figma, ArrowUpRight, Sparkles, PenTool, Share2, Users } from "lucide-react";
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

// ===== SERVICES COMPONENT =====
const Services = () => {
  const services = [
    { title: "Website Development", description: "Custom websites tailored to your business needs with responsive design and optimized performance.", icon: <Code className="w-10 h-10" />, gradient: "from-blue-500 to-cyan-500", delay: 0 },
    { title: "UI/UX Design", description: "User-centered design solutions that create intuitive, engaging interfaces with seamless user experiences.", icon: <LayoutDashboard className="w-10 h-10" />, gradient: "from-purple-500 to-pink-500", delay: 0.1 },
    { title: "Responsive Web Design", description: "Mobile-first designs that provide optimal viewing across all devices and screen sizes.", icon: <Smartphone className="w-10 h-10" />, gradient: "from-green-500 to-emerald-500", delay: 0.2 },
    { title: "Landing Page Development", description: "High-converting landing pages designed to capture leads and drive customer action.", icon: <Globe className="w-10 h-10" />, gradient: "from-orange-500 to-red-500", delay: 0.3 },
    { title: "Product Design", description: "Comprehensive product design from wireframes to interactive prototypes that solve real user problems.", icon: <Figma className="w-10 h-10" />, gradient: "from-violet-500 to-purple-500", delay: 0.4 },
    { title: "Prompt Engineering", description: "Expert AI prompt crafting for optimal ChatGPT, Claude, and other LLM outputs.", icon: <Sparkles className="w-10 h-10" />, gradient: "from-yellow-500 to-amber-500", delay: 0.5 },
    { title: "Ghost Writing", description: "Professional content creation that captures your voice and vision with compelling storytelling.", icon: <PenTool className="w-10 h-10" />, gradient: "from-indigo-500 to-blue-500", delay: 0.6 },
    { title: "Social Media Management", description: "Strategic social media management that builds your brand presence and drives engagement.", icon: <Share2 className="w-10 h-10" />, gradient: "from-pink-500 to-rose-500", delay: 0.7 },
    { title: "Community Management", description: "Build and nurture thriving online communities with meaningful connections.", icon: <Users className="w-10 h-10" />, gradient: "from-teal-500 to-cyan-500", delay: 0.8 },
  ];

  return (
    <section id="services" className="section-padding bg-portfolioTheme-secondary relative overflow-hidden">
      
      {/* DotGrid Background */}
      <DotGridBackground dotSize={3} gap={25} baseColor="#2a2a2a" activeColor="#8F0075" proximity={80} shockRadius={150} shockStrength={1.5} />

      <Helmet>
        <title>My Services | WordPress Development, UI/UX Design & More</title>
        <meta name="description" content="Explore my professional services, including WordPress website development, UI/UX design, responsive web design, and more." />
      </Helmet>

      <div className="absolute top-1/4 left-0 w-72 h-72 bg-portfolioTheme-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-portfolioTheme-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title">What I Do</h2>
          <p className="text-portfolioTheme-textAccent mt-4 max-w-2xl mx-auto text-lg">I offer a range of services to help businesses establish a strong online presence through well-designed websites and digital products.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="group relative bg-portfolioTheme-cardBg rounded-2xl p-8 border border-gray-700/50 hover:border-transparent transition-all duration-500 animate-fade-in hover:-translate-y-3 hover:shadow-2xl" style={{ animationDelay: `${service.delay}s` }}>
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}></div>
              <div className="absolute inset-[1px] bg-portfolioTheme-cardBg rounded-2xl -z-10"></div>
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl`}></div>
              <div className="relative mb-6">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                <div className={`relative w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>{service.icon}</div>
              </div>
              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-portfolioTheme-primary transition-colors duration-300 flex-1">{service.title}</h3>
                  <ArrowUpRight className="w-5 h-5 text-portfolioTheme-textAccent group-hover:text-portfolioTheme-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                </div>
                <p className="text-portfolioTheme-textAccent leading-relaxed group-hover:text-white/90 transition-colors duration-300">{service.description}</p>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <div className={`w-full h-full bg-gradient-to-br ${service.gradient} rounded-tl-full`}></div>
              </div>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-portfolioTheme-textAccent mb-6 text-lg">Ready to bring your vision to life?</p>
          <a href="#contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-portfolioTheme-primary to-portfolioTheme-accent hover:from-portfolioTheme-accent hover:to-portfolioTheme-primary text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-2xl hover:shadow-portfolioTheme-primary/50 transition-all duration-300 hover:scale-105">
            Let's Work Together
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;