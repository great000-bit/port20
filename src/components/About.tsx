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
    "jobTitle": "WordPress Developer & Product Designer",
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
        className="section-padding bg-portfolioTheme-secondary"
        style={{ position: "relative", overflow: "hidden" }}
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

        <div className="container mx-auto px-4" style={{ position: "relative", zIndex: 1 }}>
          {/* Primary Heading - SEO Critical */}
          <h2 
            id="about-heading" 
            className="section-title text-4xl md:text-5xl font-bold mb-2 text-white"
          >
            About Me
          </h2>
          
          {/* Subheading for better context */}
          <p className="text-portfolioTheme-textAccent mb-12 text-lg max-w-2xl">
            Professional background, expertise, and approach to web development and design
          </p>

          <div className="grid md:grid-cols-2 gap-10 mt-10">
            {/* Left column - About Content */}
            <article 
              className="animate-fade-in space-y-6" 
              style={{ animationDelay: "0.2s" }}
            >
              {/* First paragraph - Introduction */}
              <p className="text-lg leading-relaxed text-portfolioTheme-textAccent">
                I'm <strong className="text-white">{designer.name}</strong>, a creative technologist based in <strong className="text-white">{designer.location}</strong>. 
                As a <strong className="text-white">Web Developer</strong>, <strong className="text-white">UI/UX Designer</strong>, and <strong className="text-white">Digital Product Designer</strong>, 
                I specialize in transforming complex concepts into functional, user-centric digital solutions that drive real business results.
              </p>

              {/* Second paragraph - Philosophy */}
              <p className="text-lg leading-relaxed text-portfolioTheme-textAccent">
                My approach transcends visual aesthetics. I'm committed to building digital experiences that are intuitive, scalable, and future-ready. 
                By combining technical expertise with creative design thinking, I help businesses establish powerful online presences through custom 
                <strong className="text-white"> WordPress solutions</strong> and meticulously crafted user interfaces that engage and convert.
              </p>

              {/* Third paragraph - Specialization */}
              <p className="text-lg leading-relaxed text-portfolioTheme-textAccent">
                Whether architecting complex WordPress implementations with Elementor and Divi, designing comprehensive design systems in Figma, 
                or developing interactive prototypes with Framer, my focus remains consistent: delivering websites and digital products that are 
                professionally polished, technically optimized, and genuinely user-friendly.
              </p>

              {/* Passion statement */}
              <div className="bg-portfolioTheme-cardBg/50 border border-portfolioTheme-primary/30 rounded-lg p-6 mt-8">
                <p className="text-lg">
                  <span className="font-bold text-portfolioTheme-accent">My Passion:</span>{" "}
                  <span className="text-portfolioTheme-textAccent">{designer.passion}</span>
                </p>
              </div>

              {/* Skills Section */}
              <div className="mt-10 pt-8 border-t border-gray-700/50">
                <h3 className="text-2xl font-bold mb-6 text-white">Professional Skills & Tools</h3>
                <p className="text-portfolioTheme-textAccent mb-6">
                  A comprehensive toolkit combining design, development, and strategy expertise:
                </p>
                
                {/* Skills Grid */}
                <div 
                  className="flex flex-wrap gap-4" 
                  role="list"
                  aria-label="Professional skills and technologies"
                >
                  {skillsWithIcons.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-portfolioTheme-cardBg hover:bg-portfolioTheme-cardBg/80 transition-colors duration-300 py-3 px-5 rounded-full border border-gray-700/50 hover:border-portfolioTheme-primary/50"
                      role="listitem"
                      title={skill.ariaLabel}
                    >
                      <span 
                        className="text-portfolioTheme-accent flex-shrink-0"
                        aria-hidden="true"
                      >
                        {skill.icon}
                      </span>
                      <span className="text-white font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* Right column - Visual Element */}
            <aside
              className="animate-fade-in-right flex items-center justify-center"
              style={{ animationDelay: "0.4s" }}
              aria-label="Interactive skill visualization showing technologies and tools"
              role="complementary"
            >
              <div className="w-full h-full flex items-center justify-center">
                <OrbitingItems items={orbitingItems} radius={40} pauseOnHover />
              </div>
            </aside>
          </div>

          {/* Expertise Highlights - SEO Keywords */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-gray-700/50">
            <div className="text-center">
              <h4 className="text-xl font-bold text-portfolioTheme-accent mb-3">2+ Years</h4>
              <p className="text-portfolioTheme-textAccent">Professional web development and design experience</p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-bold text-portfolioTheme-accent mb-3">13+ Projects</h4>
              <p className="text-portfolioTheme-textAccent">Successfully completed web and design projects</p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-bold text-portfolioTheme-accent mb-3">Global Reach</h4>
              <p className="text-portfolioTheme-textAccent">Serving clients worldwide with remote expertise</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;