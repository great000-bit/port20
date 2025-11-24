import React, { useRef, useEffect, useCallback, useMemo } from "react";
import { Figma, Framer, Code, Palette } from "lucide-react";
import OrbitingItems, { orbitingItems } from "./OrbitingIcons";

// ===== DOTGRID COMPONENT (INLINE) =====
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
      aria-hidden="true"
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
        aria-label="Interactive dot grid background"
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
    { name: "Web Developer", icon: <Code className="w-5 h-5" />, ariaLabel: "Web Development expertise" },
    { name: "Figma", icon: <Figma className="w-5 h-5" />, ariaLabel: "Figma design tool proficiency" },
    { name: "Framer", icon: <Framer className="w-5 h-5" />, ariaLabel: "Framer prototyping skills" },
    { name: "UX Strategy", icon: <Palette className="w-5 h-5" />, ariaLabel: "User Experience Strategy" },
    { name: "WordPress Developer", icon: <Code className="w-5 h-5" />, ariaLabel: "WordPress development expertise" },
    { name: "Canva", icon: <Palette className="w-5 h-5" />, ariaLabel: "Canva design skills" },
  ];

  return (
    <section
      id="about"
      className="section-padding bg-portfolioTheme-secondary"
      style={{ position: "relative", overflow: "hidden" }}
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      {/* DotGrid Background */}
      <DotGridBackground
        dotSize={3}
        gap={25}
        baseColor="#2a2a2a"
        activeColor="#8F0075"
        proximity={80}
        shockRadius={150}
        shockStrength={1.5}
      />

      <div className="container mx-auto px-4" style={{ position: "relative", zIndex: 1 }}>
        <h2 id="about-heading" className="section-title" itemProp="name">About Me</h2>

        <div className="grid md:grid-cols-2 gap-10 mt-10">
          {/* Left column */}
          <article 
            className="animate-fade-in" 
            style={{ animationDelay: "0.2s" }}
            itemProp="description"
          >
            <p className="text-lg mb-6 text-portfolioTheme-textAccent">
              <span itemProp="author" itemScope itemType="https://schema.org/Person">
                <span itemProp="name">{designer.name}</span>
              </span> is a <strong>Web Developer</strong>, <strong>UI/UX Designer</strong>, and <strong>Digital Product Designer</strong> based in <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress"><span itemProp="addressLocality">Port Harcourt</span>, <span itemProp="addressCountry">Nigeria</span></span>. With a passion for turning concepts into functional, user-centric solutions, I design and develop websites that merge creativity, strategy, and technology. My approach goes beyond visuals. I focus on building experiences that are intuitive, scalable, and future-ready.
            </p>
            <p className="text-lg mb-6 text-portfolioTheme-textAccent">
              Combining technical knowledge with creative design skills,{" "}
              {designer.name.split(" ")[0]} helps businesses establish strong
              online presences through custom <strong>WordPress solutions</strong> and intuitive
              user interfaces.
            </p>
            <p className="text-lg mb-6 text-portfolioTheme-textAccent">
              His approach focuses on creating websites that not only look
              professional but also deliver seamless user experiences that drive
              engagement and conversions.
            </p>
            <p className="text-lg mb-6 text-portfolioTheme-textAccent">
              <span className="font-bold text-portfolioTheme-accent">Passion:</span>{" "}
              <span itemProp="knowsAbout">{designer.passion}</span>
            </p>

            {/* Skills */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-white">My Skills</h3>
              <nav 
                className="flex flex-wrap gap-3" 
                aria-label="Professional skills and technologies"
                itemProp="knowsAbout"
              >
                {skillsWithIcons.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-portfolioTheme-cardBg py-2 px-4 rounded-full"
                    itemProp="knowsAbout"
                    role="listitem"
                  >
                    <span 
                      className="text-portfolioTheme-primary"
                      aria-label={skill.ariaLabel}
                    >
                      {skill.icon}
                    </span>
                    <span className="text-white">{skill.name}</span>
                  </div>
                ))}
              </nav>
            </div>
          </article>

          {/* Right column */}
          <aside
            className="animate-fade-in-right flex items-center justify-center"
            style={{ animationDelay: "0.4s" }}
            aria-label="Interactive skill visualization"
          >
            <OrbitingItems items={orbitingItems} radius={40} pauseOnHover />
          </aside>
        </div>
      </div>
    </section>
  );
};

export default About;