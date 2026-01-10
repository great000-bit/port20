import { useRef, useEffect, useCallback, useMemo } from "react";
import { Code, LayoutDashboard, Smartphone, Globe, Figma, ArrowUpRight, Sparkles, PenTool, Share2, Users, Palette, Video, Film, Wand2, Layers } from "lucide-react";

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
    <div ref={containerRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} aria-hidden="true">
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "auto" }} aria-label="Interactive dot grid background" />
    </div>
  );
};

// ===== SERVICES COMPONENT =====
const Services = () => {
  const services = [
    { title: "Website Development", description: "Custom websites tailored to your business needs with responsive design and optimized performance.", icon: <Code className="w-8 h-8" />, delay: 0, category: "Web Development" },
    { title: "UI/UX Design", description: "User-centered design solutions that create intuitive, engaging interfaces with seamless user experiences.", icon: <Layers className="w-8 h-8" />, delay: 0.1, category: "Design" },
    { title: "Responsive Web Design", description: "Mobile-first designs that provide optimal viewing across all devices and screen sizes.", icon: <Smartphone className="w-8 h-8" />, delay: 0.15, category: "Web Design" },
    { title: "Landing Page Development", description: "High-converting landing pages designed to capture leads and drive customer action.", icon: <Globe className="w-8 h-8" />, delay: 0.2, category: "Web Development" },
    { title: "Product Design", description: "Comprehensive product design from wireframes to interactive prototypes that solve real user problems.", icon: <Figma className="w-8 h-8" />, delay: 0.25, category: "Design" },
    { title: "Graphic Design", description: "Visual brand identity design including logos, marketing materials, and creative assets that captivate.", icon: <Palette className="w-8 h-8" />, delay: 0.3, category: "Design" },
    { title: "Mobile Videography", description: "Professional mobile video production capturing dynamic content with creative storytelling and technical precision.", icon: <Video className="w-8 h-8" />, delay: 0.35, category: "Media Production" },
    { title: "Video Editing", description: "Expert video editing and post-production creating polished, engaging content that resonates with your audience.", icon: <Film className="w-8 h-8" />, delay: 0.4, category: "Media Production" },
    { title: "Prompt Engineering", description: "Expert AI prompt crafting for optimal ChatGPT, Claude, and other LLM outputs.", icon: <Wand2 className="w-8 h-8" />, delay: 0.45, category: "AI Services" },
    { title: "Ghost Writing", description: "Professional content creation that captures your voice and vision with compelling storytelling.", icon: <PenTool className="w-8 h-8" />, delay: 0.5, category: "Content Creation" },
    { title: "Social Media Management", description: "Strategic social media management that builds your brand presence and drives engagement.", icon: <Share2 className="w-8 h-8" />, delay: 0.55, category: "Digital Marketing" },
    { title: "Community Management", description: "Build and nurture thriving online communities with meaningful connections.", icon: <Users className="w-8 h-8" />, delay: 0.6, category: "Community Building" },
  ];

  return (
    <section
      id="services"
      className="section-padding bg-portfolioTheme-secondary relative overflow-hidden"
      aria-labelledby="services-heading"
      itemScope
      itemType="https://schema.org/Service"
    >

      {/* DotGrid Background */}
      <DotGridBackground dotSize={3} gap={25} baseColor="#2a2a2a" activeColor="#8F0075" proximity={80} shockRadius={150} shockStrength={1.5} />

      {/* Gradient Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-portfolioTheme-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" aria-hidden="true"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-portfolioTheme-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" aria-hidden="true"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <header className="text-center mb-16">
          <h2 id="services-heading" className="section-title inline-block text-4xl md:text-5xl font-bold text-white mb-4" itemProp="name">
            What I Do
          </h2>
          <p className="text-portfolioTheme-textAccent text-base md:text-lg max-w-3xl mx-auto mt-4" itemProp="description">
            Comprehensive digital solutions combining <span className="text-white font-medium">development excellence</span>, <span className="text-white font-medium">design precision</span>, and <span className="text-white font-medium">strategic thinking</span> to elevate your brand
          </p>
        </header>

        {/* Services Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          role="list"
          aria-label="Professional services offered"
        >
          {services.map((service, index) => (
            <article
              key={index}
              className="group relative bg-portfolioTheme-cardBg rounded-2xl p-6 md:p-8 border border-gray-700/50 hover:border-portfolioTheme-primary/50 shadow-lg hover:shadow-2xl hover:shadow-portfolioTheme-primary/20 transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${service.delay}s` }}
              itemScope
              itemType="https://schema.org/Service"
              role="listitem"
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-portfolioTheme-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" aria-hidden="true"></div>

              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-portfolioTheme-primary via-portfolioTheme-accent to-portfolioTheme-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" aria-hidden="true"></div>

              {/* Icon Container */}
              <div className="relative mb-6 flex items-center justify-between">
                <div className="w-16 h-16 bg-portfolioTheme-primary/10 group-hover:bg-portfolioTheme-primary/20 rounded-xl flex items-center justify-center text-portfolioTheme-primary group-hover:scale-110 transition-all duration-500 border border-portfolioTheme-primary/20 group-hover:border-portfolioTheme-primary/40">
                  {service.icon}
                </div>

                {/* Category Badge */}
                <span className="text-xs uppercase tracking-wider text-portfolioTheme-textAccent/60 font-semibold">
                  {service.category}
                </span>
              </div>

              {/* Content */}
              <div className="relative space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-portfolioTheme-primary transition-colors duration-500" itemProp="name">
                    {service.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 flex-shrink-0 text-portfolioTheme-textAccent/40 group-hover:text-portfolioTheme-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" aria-hidden="true" />
                </div>

                <meta itemProp="serviceType" content={service.category} />

                <p className="text-sm md:text-base text-portfolioTheme-textAccent leading-relaxed group-hover:text-white/80 transition-colors duration-500" itemProp="description">
                  {service.description}
                </p>
              </div>

              {/* Bottom Decorative Element */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-portfolioTheme-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
            </article>
          ))}
        </div>

        {/* Call-to-Action Section */}
        <footer className="mt-20 pt-12 border-t border-gray-700/30">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Vision?
            </h3>
            <p className="text-portfolioTheme-textAccent text-base md:text-lg mb-8">
              Let's collaborate to create something exceptional that drives real results
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-portfolioTheme-primary to-portfolioTheme-accent hover:from-portfolioTheme-accent hover:to-portfolioTheme-primary text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl hover:shadow-portfolioTheme-primary/50 transition-all duration-500 hover:scale-105 border border-portfolioTheme-primary/20"
              aria-label="Navigate to contact section to start a project"
            >
              Start Your Project
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" aria-hidden="true" />
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Services;