import React, { useRef, useEffect, useCallback, useMemo } from "react";
import { Figma, Framer, Code, Palette } from "lucide-react";
import { Helmet } from "react-helmet";
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
        aria-label="Interactive dot grid background animation"
      />
    </div>
  );
};

// ===== ABOUT COMPONENT =====
const About = () => {
  // SEO: Professional Profile Schema
  const personalSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Great Emman-Wori",
    "jobTitle": "Website Developer & Product Designer",
    "description": "Web Developer, UI/UX Designer, and Digital Product Designer based in Port Harcourt, Nigeria with expertise in WordPress, Figma, and product design",
    "url": "https://creative-emman.vercel.app",
    "image": "https://creative-emman.vercel.app/creative-emman-pic.webp",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Port Harcourt",
      "addressRegion": "Rivers State",
      "addressCountry": "Nigeria"
    },
    "knowsAbout": [
      "Web Development",
      "WordPress Development",
      "Elementor",
      "Divi",
      "UI/UX Design",
      "Product Design",
      "Figma",
      "Framer",
      "User Experience Strategy",
      "Responsive Web Design",
      "Frontend Development",
      "Digital Strategy",
      "Canva"
    ]
  };

  // SEO: Skills/Competency Schema
  const skillsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Professional Skills and Expertise",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Web Development",
        "description": "Custom website development with focus on user experience and performance"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Figma Design",
        "description": "User interface and product design using industry-standard Figma tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Framer Prototyping",
        "description": "Interactive prototyping and design system development"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "UX Strategy",
        "description": "User experience strategy and user-centered design approach"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "WordPress Development",
        "description": "Expert WordPress development with Elementor and Divi builders"
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "Design Tools",
        "description": "Proficiency in Canva and other design and branding tools"
      }
    ]
  };

  const designer = {
    name: "Great Emman-Wori",
    title: "WordPress Developer & Product Designer",
    location: "Port Harcourt, Nigeria",
    skills: ["WordPress", "UI/UX", "Product Design"],
    passion: "Creating amazing digital experiences that drive engagement and conversions",
  };

  const skillsWithIcons = [
    { 
      name: "Web Developer", 
      icon: <Code className="w-5 h-5" aria-hidden="true" />, 
      ariaLabel: "Web Development expertise including HTML, CSS, JavaScript, and responsive design" 
    },
    { 
      name: "Figma", 
      icon: <Figma className="w-5 h-5" aria-hidden="true" />, 
      ariaLabel: "Figma design tool proficiency for UI/UX and product design" 
    },
    { 
      name: "Framer", 
      icon: <Framer className="w-5 h-5" aria-hidden="true" />, 
      ariaLabel: "Framer prototyping and interactive design skills" 
    },
    { 
      name: "UX Strategy", 
      icon: <Palette className="w-5 h-5" aria-hidden="true" />, 
      ariaLabel: "User Experience Strategy and user-centered design methodology" 
    },
    { 
      name: "WordPress Developer", 
      icon: <Code className="w-5 h-5" aria-hidden="true" />, 
      ariaLabel: "WordPress development expertise with Elementor and Divi builders" 
    },
    { 
      name: "Canva", 
      icon: <Palette className="w-5 h-5" aria-hidden="true" />, 
      ariaLabel: "Canva design skills for quick visual content creation" 
    },
  ];

  return (
    <>
      <Helmet>
        {/* Structured Data for About Section */}
        <script type="application/ld+json">
          {JSON.stringify(personalSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(skillsSchema)}
        </script>
      </Helmet>

      <section
        id="about"
        className="section-padding bg-portfolioTheme-secondary relative overflow-hidden"
        aria-labelledby="about-heading"
        role="region"
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

        {/* Gradient Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-portfolioTheme-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" aria-hidden="true"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-portfolioTheme-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" aria-hidden="true"></div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2
              id="about-heading"
              className="section-title inline-block text-4xl md:text-5xl font-bold text-white mb-4"
            >
              About Me
            </h2>
            <p className="text-portfolioTheme-textAccent text-base md:text-lg max-w-2xl mx-auto mt-4">
              Crafting digital excellence through strategic design and technical precision
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-7xl mx-auto">

            {/* Left Column - Content */}
            <article className="space-y-8">

              {/* Introduction Card */}
              <div className="group bg-portfolioTheme-cardBg p-8 rounded-2xl border border-gray-700/50 hover:border-portfolioTheme-primary/50 shadow-lg hover:shadow-2xl hover:shadow-portfolioTheme-primary/10 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-portfolioTheme-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" aria-hidden="true"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-portfolioTheme-primary rounded-full"></div>
                    <h3 className="text-2xl font-bold text-white">Who I Am</h3>
                  </div>

                  <p className="text-base md:text-lg leading-relaxed text-portfolioTheme-textAccent mb-4">
                    I'm <span className="text-white font-semibold">{designer.name}</span>, a creative technologist based in <span className="text-white font-semibold">{designer.location}</span>.
                    As a <span className="text-portfolioTheme-primary font-medium">Website Developer</span>, <span className="text-portfolioTheme-primary font-medium">UI/UX Designer</span>, and <span className="text-portfolioTheme-primary font-medium">Digital Product Designer</span>,
                    I transform complex ideas into elegant, user-centric digital solutions.
                  </p>
                </div>
              </div>

              {/* Philosophy Card */}
              <div className="group bg-portfolioTheme-cardBg p-8 rounded-2xl border border-gray-700/50 hover:border-portfolioTheme-primary/50 shadow-lg hover:shadow-2xl hover:shadow-portfolioTheme-primary/10 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-portfolioTheme-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" aria-hidden="true"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-portfolioTheme-primary rounded-full"></div>
                    <h3 className="text-2xl font-bold text-white">My Approach</h3>
                  </div>

                  <p className="text-base md:text-lg leading-relaxed text-portfolioTheme-textAccent mb-4">
                    Every project is an opportunity to create meaningful impact. I blend technical excellence with creative vision to deliver experiences that are
                    <span className="text-white font-medium"> intuitive</span>, <span className="text-white font-medium">scalable</span>, and
                    <span className="text-white font-medium"> future-ready</span>. From WordPress implementations to comprehensive design systems, quality is non-negotiable.
                  </p>
                </div>
              </div>

              {/* Passion Statement Card */}
              <div className="bg-gradient-to-br from-portfolioTheme-primary/10 via-portfolioTheme-cardBg to-portfolioTheme-cardBg p-8 rounded-2xl border border-portfolioTheme-primary/30 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-portfolioTheme-primary rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wider text-portfolioTheme-primary font-bold mb-2">My Mission</p>
                    <p className="text-base md:text-lg text-white leading-relaxed">
                      {designer.passion}
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Right Column - Visual Element */}
            <aside
              className="lg:sticky lg:top-24 space-y-8"
              aria-label="Interactive skill visualization"
              role="complementary"
            >
              <div className="w-full max-w-lg mx-auto">
                <div className="relative">
                  {/* Orbiting Icons Container */}
                  <div className="bg-portfolioTheme-cardBg/30 backdrop-blur-sm rounded-3xl border border-gray-700/30 p-8 md:p-12 shadow-2xl">
                    <OrbitingItems items={orbitingItems} radius={40} pauseOnHover />
                  </div>

                  {/* Decorative Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-portfolioTheme-primary/20 to-transparent rounded-3xl blur-3xl -z-10" aria-hidden="true"></div>
                </div>
              </div>

              {/* Core Expertise Section - Now under orbit */}
              <div className="w-full max-w-lg mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-portfolioTheme-primary rounded-full"></div>
                  <h3 className="text-2xl font-bold text-white">Core Expertise</h3>
                </div>

                <div
                  className="grid grid-cols-2 gap-3"
                  role="list"
                  aria-label="Professional skills and technologies"
                >
                  {skillsWithIcons.map((skill, index) => (
                    <div
                      key={index}
                      className="group flex items-center gap-3 bg-portfolioTheme-cardBg hover:bg-portfolioTheme-primary/10 border border-gray-700/50 hover:border-portfolioTheme-primary transition-all duration-300 py-4 px-4 rounded-xl"
                      role="listitem"
                      title={skill.ariaLabel}
                    >
                      <span
                        className="text-portfolioTheme-accent group-hover:text-portfolioTheme-primary transition-colors duration-300 flex-shrink-0"
                        aria-hidden="true"
                      >
                        {skill.icon}
                      </span>
                      <span className="text-white text-sm md:text-base font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-8 mt-20 pt-12 border-t border-gray-700/30">
            <div className="group text-center p-6 rounded-2xl bg-portfolioTheme-cardBg/50 border border-gray-700/30 hover:border-portfolioTheme-primary/50 transition-all duration-500 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-portfolioTheme-primary to-portfolioTheme-accent bg-clip-text text-transparent mb-3">
                3+
              </div>
              <p className="text-white font-semibold mb-2">Years Experience</p>
              <p className="text-sm text-portfolioTheme-textAccent">Professional web development & design</p>
            </div>

            <div className="group text-center p-6 rounded-2xl bg-portfolioTheme-cardBg/50 border border-gray-700/30 hover:border-portfolioTheme-primary/50 transition-all duration-500 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-portfolioTheme-primary to-portfolioTheme-accent bg-clip-text text-transparent mb-3">
                16
              </div>
              <p className="text-white font-semibold mb-2">Projects Delivered</p>
              <p className="text-sm text-portfolioTheme-textAccent">Successfully completed & launched</p>
            </div>

            <div className="group text-center p-6 rounded-2xl bg-portfolioTheme-cardBg/50 border border-gray-700/30 hover:border-portfolioTheme-primary/50 transition-all duration-500 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-portfolioTheme-primary to-portfolioTheme-accent bg-clip-text text-transparent mb-3">
                100%
              </div>
              <p className="text-white font-semibold mb-2">Client Satisfaction</p>
              <p className="text-sm text-portfolioTheme-textAccent">Global reach, remote excellence</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;