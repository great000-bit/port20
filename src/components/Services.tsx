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
      <DotGridBackground dotSize={3} gap={25} baseColor="#2a2a2a" activeColor="#8F0075" proximity={80} shockRadius={150} shockStrength={1.5} />

      <Helmet>
        <title>My Services | Web Dev, UI/UX, Writing & More</title>
        <meta name="description" content="Explore the diverse services offered by Great Emman-Wori, including web development, UI/UX design, product design, ghost writing, and more." />
        <link rel="canonical" href="https://creative-emman.vercel.app/#services" />
        <meta property="og:title" content="Services by Great Emman-Wori | Digital Solutions Expert" />
        <meta property="og:description" content="From websites to writing, explore professional services tailored to your brand. Designed and delivered by Great Emman-Wori." />
        <meta property="og:image" content="/mnt/data/09dedf66-490c-4a89-8231-4ca929b61d0b.png" />
        <meta property="og:url" content="https://creative-emman.vercel.app/#services" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Explore My Digital Services | Great Emman-Wori" />
        <meta name="twitter:description" content="Multi-talented developer, designer, writer & strategist. Discover services to grow your business." />
        <meta name="twitter:image" content="/mnt/data/09dedf66-490c-4a89-8231-4ca929b61d0b.png" />
      </Helmet>

      {/* ...rest of the component unchanged... */}
    </section>
  );
};

export default Services;