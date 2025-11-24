import React, { useRef, useEffect, useCallback, useMemo } from "react";
import { Figma, Framer, Code, Palette } from "lucide-react";
import { Helmet } from "react-helmet";
import OrbitingItems, { orbitingItems } from "./OrbitingIcons";

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
  };
}

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  vx: number;
  vy: number;
}

const DotGridBackground = ({
  dotSize = 3,
  gap = 25,
  baseColor = "#2a2a2a",
  activeColor = "#8F0075",
  proximity = 80,
  shockRadius = 150,
  shockStrength = 1.5,
}: {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  shockRadius?: number;
  shockStrength?: number;
}) => {
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
        dots.push({
          cx: startX + x * cell,
          cy: startY + y * cell,
          xOffset: 0,
          yOffset: 0,
          vx: 0,
          vy: 0,
        });
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

        if (Math.abs(dot.xOffset) < 0.05 && Math.abs(dot.vx) < 0.05) {
          dot.xOffset = 0;
          dot.vx = 0;
        }
        if (Math.abs(dot.yOffset) < 0.05 && Math.abs(dot.vy) < 0.05) {
          dot.yOffset = 0;
          dot.vy = 0;
        }

        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let r = baseRgb.r;
        let g = baseRgb.g;
        let b = baseRgb.b;

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
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
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

    const handleMouseLeave = () => {
      pointerRef.current.x = -1000;
      pointerRef.current.y = -1000;
    };

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
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "auto",
        }}
      />
    </div>
  );
};

// ===== ABOUT COMPONENT =====
const About = () => {
  const designer = {
    name: "Great Emman-Wori",
    skills: ["WordPress", "UI/UX", "Product Design"],
    passion: "Creating amazing digital experiences",
  };

  const skillsWithIcons = [
    { name: "Web Developer", icon: <Code className="w-5 h-5" /> },
    { name: "Figma", icon: <Figma className="w-5 h-5" /> },
    { name: "Framer", icon: <Framer className="w-5 h-5" /> },
    { name: "UX Strategy", icon: <Palette className="w-5 h-5" /> },
    { name: "WordPress Developer", icon: <Code className="w-5 h-5" /> },
    { name: "Canva", icon: <Palette className="w-5 h-5" /> },
  ];

  return (
    <section
      id="about"
      className="section-padding bg-portfolioTheme-secondary"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <DotGridBackground
        dotSize={3}
        gap={25}
        baseColor="#2a2a2a"
        activeColor="#8F0075"
        proximity={80}
        shockRadius={150}
        shockStrength={1.5}
      />

      <Helmet>
        <title>About Great Emman-Wori | Web Developer, UI/UX Designer & Digital Creator</title>
        <meta
          name="description"
          content="Get to know Great Emman-Wori — a Web Developer, UI/UX Designer, Product Designer, and Visual Creator based in Nigeria. Discover his passion for building intuitive digital experiences."
        />
        <link rel="canonical" href="https://creative-emman.vercel.app/#about" />
        <meta property="og:title" content="About Great Emman-Wori | Developer & Designer" />
        <meta property="og:description" content="Meet Great Emman-Wori: blending development, design, and digital strategy. Based in Nigeria." />
        <meta property="og:image" content="file:///mnt/data/09dedf66-490c-4a89-8231-4ca929b61d0b.png" />
        <meta property="og:url" content="https://creative-emman.vercel.app/#about" />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Great Emman-Wori | Web & Product Designer" />
        <meta name="twitter:description" content="Explore the background and expertise of Great Emman-Wori. Expert in WordPress, UI/UX, product strategy." />
        <meta name="twitter:image" content="file:///mnt/data/09dedf66-490c-4a89-8231-4ca929b61d0b.png" />
      </Helmet>

      <div className="container mx-auto px-4" style={{ position: "relative", zIndex: 1 }}>
        <h2 className="section-title">About Me</h2>

        <div className="grid md:grid-cols-2 gap-10 mt-10">
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <p className="text-lg mb-6 text-portfolioTheme-textAccent">
              {designer.name} is a Web Developer, UI/UX Designer, and Digital Product Designer based in Port Harcourt, Nigeria. With a passion for turning concepts into functional, user-centric solutions, I design and develop websites that merge creativity, strategy, and technology.
            </p>
            <p className="text-lg mb-6 text-portfolioTheme-textAccent">
              Combining technical knowledge with creative design skills, {designer.name.split(" ")[0]} helps businesses establish strong online presences through custom WordPress solutions and intuitive user interfaces.
            </p>
            <p className="text-lg mb-6 text-portfolioTheme-textAccent">
              His approach focuses on creating websites that not only look professional but also deliver seamless user experiences that drive engagement and conversions.
            </p>
            <p className="text-lg mb-6 text-portfolioTheme-textAccent">
              <span className="font-bold text-portfolioTheme-accent">Passion:</span> {designer.passion}
            </p>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-white">My Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skillsWithIcons.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 bg-portfolioTheme-cardBg py-2 px-4 rounded-full">
                    <span className="text-portfolioTheme-primary">{skill.icon}</span>
                    <span className="text-white">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="animate-fade-in-right flex items-center justify-center" style={{ animationDelay: "0.4s" }}>
            <OrbitingItems items={orbitingItems} radius={40} pauseOnHover />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
