import { useRef, useEffect, useCallback, useMemo } from "react";
import { Monitor, Smartphone, Globe, Palette, Code, Video } from "lucide-react";

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}
interface Dot { cx: number; cy: number; xOffset: number; yOffset: number; vx: number; vy: number; }
const DotGridBackground = ({ dotSize = 3, gap = 25, baseColor = "#2a2a2a", activeColor = "#8F0075", proximity = 80, shockRadius = 150, shockStrength = 1.5 }: { dotSize?: number; gap?: number; baseColor?: string; activeColor?: string; proximity?: number; shockRadius?: number; shockStrength?: number; }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({ x: -1000, y: -1000 });
  const containerRef = useRef<HTMLDivElement>(null);
  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);
  const buildGrid = useCallback(() => {
    const canvas = canvasRef.current; const container = containerRef.current;
    if (!canvas || !container) return;
    const { width, height } = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr; canvas.height = height * dpr;
    canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d"); if (ctx) ctx.scale(dpr, dpr);
    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;
    const startX = (width - (cell * cols - gap)) / 2 + dotSize / 2;
    const startY = (height - (cell * rows - gap)) / 2 + dotSize / 2;
    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) dots.push({ cx: startX + x * cell, cy: startY + y * cell, xOffset: 0, yOffset: 0, vx: 0, vy: 0 });
    dotsRef.current = dots;
  }, [dotSize, gap]);
  useEffect(() => {
    let rafId: number;
    const proxSq = proximity * proximity;
    const draw = () => {
      const canvas = canvasRef.current; if (!canvas) return;
      const ctx = canvas.getContext("2d"); if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: px, y: py } = pointerRef.current;
      for (const dot of dotsRef.current) {
        dot.vx = (dot.vx + (-0.08 * dot.xOffset)) * 0.92; dot.vy = (dot.vy + (-0.08 * dot.yOffset)) * 0.92;
        dot.xOffset += dot.vx; dot.yOffset += dot.vy;
        const ox = dot.cx + dot.xOffset; const oy = dot.cy + dot.yOffset;
        const dsq = (dot.cx - px) ** 2 + (dot.cy - py) ** 2;
        let r = baseRgb.r, g = baseRgb.g, b = baseRgb.b;
        if (dsq <= proxSq) { const t = 1 - Math.sqrt(dsq) / proximity; r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t); g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t); b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t); }
        ctx.beginPath(); ctx.arc(ox, oy, dotSize / 2, 0, Math.PI * 2); ctx.fillStyle = `rgb(${r},${g},${b})`; ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw); return () => cancelAnimationFrame(rafId);
  }, [proximity, baseRgb, activeRgb, dotSize]);
  useEffect(() => { buildGrid(); const ro = new ResizeObserver(buildGrid); if (containerRef.current) ro.observe(containerRef.current); return () => ro.disconnect(); }, [buildGrid]);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const onMove = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); pointerRef.current.x = e.clientX - r.left; pointerRef.current.y = e.clientY - r.top; };
    const onClick = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); const cx = e.clientX - r.left; const cy = e.clientY - r.top; for (const dot of dotsRef.current) { const dist = Math.hypot(dot.cx - cx, dot.cy - cy); if (dist < shockRadius) { const f = Math.max(0, 1 - dist / shockRadius); dot.vx += (dot.cx - cx) * shockStrength * f * 0.1; dot.vy += (dot.cy - cy) * shockStrength * f * 0.1; } } };
    const onLeave = () => { pointerRef.current.x = -1000; pointerRef.current.y = -1000; };
    window.addEventListener("mousemove", onMove, { passive: true }); window.addEventListener("click", onClick); canvas.addEventListener("mouseleave", onLeave);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("click", onClick); canvas.removeEventListener("mouseleave", onLeave); };
  }, [shockRadius, shockStrength]);
  return (
    <div ref={containerRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "auto" }} aria-hidden="true" />
    </div>
  );
};

const services = [
  {
    icon: <Monitor className="w-10 h-10" />,
    title: "Website Development",
    subtitle: "Frontend & Backend",
    description: "I build responsive, high-performance websites and web apps using modern frameworks. From pixel-perfect frontends to custom WordPress builds with Elementor and Divi — fast, secure, and user-friendly.",
    tags: ["WordPress", "React", "Elementor", "Divi"],
  },
  {
    icon: <Palette className="w-10 h-10" />,
    title: "UI/UX & Product Design",
    subtitle: "Figma & Framer",
    description: "User-centered design from wireframes to polished prototypes. I create intuitive interfaces, design systems, and digital products that solve real problems and delight users.",
    tags: ["Figma", "Framer", "Product Design", "UX Strategy"],
  },
  {
    icon: <Globe className="w-10 h-10" />,
    title: "Web3 & Platform Design",
    subtitle: "Blockchain & Marketplaces",
    description: "I've designed and built decentralized platforms and marketplace UIs. From Web3 product design to ecommerce and business directory platforms — built for scale.",
    tags: ["Web3", "Marketplace", "UI/UX", "Blockchain"],
  },
  {
    icon: <Code className="w-10 h-10" />,
    title: "Landing Pages",
    subtitle: "High-Conversion Design",
    description: "Strategic landing pages built to convert. Clean layouts, compelling copy structure, and performance-optimized code that drive real results for businesses.",
    tags: ["React", "Responsive", "SEO", "Conversion"],
  },
  {
    icon: <Video className="w-10 h-10" />,
    title: "Content & Media",
    subtitle: "Video, Writing & Social",
    description: "End-to-end content creation: mobile videography, video editing, ghostwriting, and social media management. Your brand voice, amplified.",
    tags: ["Video Editing", "Ghostwriting", "Social Media", "Content Strategy"],
  },
  {
    icon: <Smartphone className="w-10 h-10" />,
    title: "Prompt Engineering & AI",
    subtitle: "LLM Tooling",
    description: "Expert AI prompt engineering for ChatGPT, Claude, and other LLMs. I help businesses integrate and leverage AI tooling into their workflows efficiently.",
    tags: ["ChatGPT", "Claude", "AI Workflows", "Automation"],
  },
];

const Services = () => {
  return (
    <section id="services" className="section-padding bg-portfolioTheme-secondary relative overflow-hidden">
      <DotGridBackground dotSize={3} gap={25} baseColor="#2a2a2a" activeColor="#8F0075" proximity={80} shockRadius={150} shockStrength={1.5} />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Services</h2>
          <div className="w-16 h-1 bg-portfolioTheme-primary mx-auto rounded-full" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, i) => (
            <article
              key={i}
              className="group bg-[#0f1117] border border-gray-800 hover:border-portfolioTheme-primary/50 rounded-2xl p-8 transition-all duration-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-portfolioTheme-primary/10"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-[#1a1a2e] border border-gray-700 rounded-2xl flex items-center justify-center text-portfolioTheme-primary mb-6 group-hover:bg-portfolioTheme-primary/10 group-hover:border-portfolioTheme-primary/40 transition-all duration-300">
                {service.icon}
              </div>

              {/* Text */}
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-portfolioTheme-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-sm text-portfolioTheme-textAccent mb-4">{service.subtitle}</p>
              <p className="text-portfolioTheme-textAccent text-sm leading-relaxed mb-6">{service.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, j) => (
                  <span key={j} className="text-xs px-3 py-1 rounded-full border border-gray-700 text-gray-400 group-hover:border-portfolioTheme-primary/30 group-hover:text-portfolioTheme-primary transition-all duration-300">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
