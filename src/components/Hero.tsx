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
    <div 
      ref={containerRef} 
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} 
      aria-hidden="true"
    >
      <canvas 
        ref={canvasRef} 
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "auto" }} 
        aria-label="Interactive dot grid background animation"
      />
    </div>
  );
};

// ===== HERO COMPONENT =====
const Hero = () => {
  // SEO: Comprehensive Person/Professional Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Great Emman-Wori",
    "alternateName": "Creative Emman",
    "jobTitle": "WordPress Developer & Product Designer",
    "description": "Creative technologist specializing in WordPress development with Elementor & Divi, UI/UX design, and digital product design. Based in Port Harcourt, Nigeria with 2+ years of professional experience.",
    "url": "https://creative-emman.vercel.app",
    "image": {
      "@type": "ImageObject",
      "url": "https://creative-emman.vercel.app/creative-emman-pic.webp",
      "width": 320,
      "height": 320
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Port Harcourt",
      "addressRegion": "Rivers State",
      "addressCountry": "Nigeria"
    },
    "sameAs": [
      "https://linkedin.com/in/creative-emman",
      "https://github.com/creative-emman",
      "https://dribbble.com/creative-emman",
      "https://twitter.com/creative_emman"
    ],
    "knowsAbout": [
      "WordPress Development",
      "Product Design",
      "UI/UX Design",
      "Elementor",
      "Divi",
      "Figma",
      "Web Development",
      "Frontend Development",
      "Responsive Web Design",
      "Digital Strategy"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "WordPress Developer & Product Designer",
      "occupationLocation": {
        "@type": "Country",
        "name": "Nigeria"
      },
      "skills": "WordPress, Elementor, Divi, Figma, UI/UX Design, Product Design, Web Development, HTML, CSS, JavaScript, Responsive Design, User Experience Strategy"
    }
  };

  // SEO: Call to Action Schema
  const callToActionSchema = {
    "@context": "https://schema.org",
    "@type": "Action",
    "name": "Explore Portfolio",
    "url": "https://creative-emman.vercel.app#portfolio"
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags - SEO CRITICAL */}
        <title>Great Emman-Wori | WordPress Developer & Product Designer Portfolio</title>
        <meta name="title" content="Great Emman-Wori | WordPress Developer & Product Designer Portfolio" />
        <meta 
          name="description" 
          content="Creative technologist specializing in WordPress development with Elementor & Divi, UI/UX design, and product design. Transform your ideas into high-impact digital experiences. 2+ years experience from Nigeria." 
        />
        <meta 
          name="keywords" 
          content="WordPress developer, product designer, UI/UX designer, Elementor expert, Divi developer, Figma designer, web developer, Great Emman-Wori, creative technologist, Nigeria developer, web design, responsive design, landing page development" 
        />
        <meta name="author" content="Great Emman-Wori" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://creative-emman.vercel.app" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creative-emman.vercel.app" />
        <meta property="og:title" content="Great Emman-Wori | WordPress Developer & Product Designer" />
        <meta 
          property="og:description" 
          content="Creative technologist specializing in WordPress development with Elementor & Divi, UI/UX design, and product design. Let's collaborate to create exceptional digital experiences." 
        />
        <meta property="og:image" content="https://creative-emman.vercel.app/creative-emman-pic.webp" />
        <meta property="og:image:alt" content="Great Emman-Wori - Professional WordPress Developer and Product Designer" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Great Emman-Wori Portfolio" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://creative-emman.vercel.app" />
        <meta name="twitter:title" content="Great Emman-Wori | WordPress Developer & Product Designer" />
        <meta 
          name="twitter:description" 
          content="Creative technologist specializing in WordPress development with Elementor & Divi, UI/UX design, and product design." 
        />
        <meta name="twitter:image" content="https://creative-emman.vercel.app/creative-emman-pic.webp" />
        <meta name="twitter:image:alt" content="Great Emman-Wori - Professional WordPress Developer and Product Designer" />
        <meta name="twitter:creator" content="@creative_emman" />

        {/* Additional SEO Tags */}
        <meta name="theme-color" content="#8F0075" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />

        {/* Structured Data - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(callToActionSchema)}
        </script>
      </Helmet>

      <section
        id="hero"
        className="min-h-screen flex items-center pt-16 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0f0f0f]"
        style={{ position: "relative", overflow: "hidden" }}
        aria-label="Hero section introducing Great Emman-Wori, WordPress Developer and Product Designer"
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

        <div 
          className="container mx-auto px-4 py-16 flex md:flex-row flex-col gap-10 items-center" 
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Left Column - Text Content */}
          <article 
            className="flex flex-col md:gap-8 gap-4 order-2 md:order-1 animate-fade-in" 
            style={{ animationDelay: "0.2s" }}
          >
            {/* H1 - SEO Critical: Primary Heading */}
            <h1 className="text-4xl lg:text-[70px] font-bold capitalize leading-tight">
              I'm Great E<span className="text-portfolioTheme-accent" aria-hidden="true">.</span>
            </h1>

            {/* H2 - Secondary Heading with Professional Titles */}
            <h2 className="text-md md:text-lg font-medium flex gap-x-4 font-heading flex-wrap text-portfolioTheme-textAccent">
              <span className="hover:text-portfolioTheme-accent transition-colors duration-300">Web Developer</span>
              <span aria-hidden="true" className="text-gray-600">|</span>
              <span className="hover:text-portfolioTheme-accent transition-colors duration-300">Product Designer</span>
              <span aria-hidden="true" className="text-gray-600">|</span>
              <span className="hover:text-portfolioTheme-accent transition-colors duration-300">UI/UX Designer</span>
            </h2>

            {/* Hero Description - SEO Keywords */}
            <p className="text-portfolioTheme-textAccent text-lg max-w-xl leading-relaxed">
              I'm Great Emman-wori, a creative technologist who blends design and development into seamless digital experiences. From WordPress frameworks like Elementor and Divi to design systems in Figma, I transform ideas into high-impact products that don't just look good, they work beautifully. Let's <span className="text-portfolioTheme-accent font-medium">collaborate</span> to bring something truly exceptional to life.
            </p>

            {/* Call-to-Action Navigation */}
            <nav 
              className="flex flex-wrap items-center justify-start gap-4 pt-4" 
              aria-label="Primary call-to-action navigation"
            >
              <a 
                href="#portfolio" 
                className="relative bg-portfolioTheme-accent text-white px-6 py-3 rounded-md font-bold uppercase transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-portfolioTheme-accent/50 overflow-hidden group"
                aria-label="View portfolio of completed web development and design projects"
                title="Explore Great Emman-Wori's portfolio of WordPress and design projects"
              >
                <span className="relative z-10">Explore My Work</span>
                <span 
                  className="absolute inset-0 bg-gradient-to-r from-[#8F0075] to-[#f59e0b] opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                  aria-hidden="true"
                ></span>
              </a>

              <a 
                href="#contact" 
                className="relative bg-transparent border-2 border-portfolioTheme-accent text-portfolioTheme-textMain px-6 py-3 rounded-md font-bold uppercase transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden group"
                aria-label="Contact Great Emman-Wori for hiring opportunities and project collaborations"
                title="Get in touch to hire Great Emman-Wori for your next project"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Hire Me</span>
                <span 
                  className="absolute inset-0 bg-gradient-to-r from-[#8F0075] to-[#f59e0b] opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                  aria-hidden="true"
                ></span>
              </a>

              <a 
                href="/My cv.pdf" 
                download="Great-Emman-Wori-Resume.pdf" 
                className="relative group bg-portfolioTheme-accent text-white px-6 py-3 rounded-md font-bold uppercase transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-portfolioTheme-accent/50 overflow-hidden"
                aria-label="Download resume - PDF document of Great Emman-Wori's professional experience and skills"
                title="Download my professional resume (PDF)"
                data-download-type="resume"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Resume 
                  <Download 
                    size={18} 
                    className="group-hover:translate-y-1 transition-transform duration-300" 
                    aria-hidden="true" 
                  />
                </span>
                <span 
                  className="absolute inset-0 bg-gradient-to-r from-[#8F0075] to-[#f59e0b] opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                  aria-hidden="true"
                ></span>
              </a>
            </nav>
          </article>

          {/* Right Column - Professional Headshot */}
          <aside 
            className="order-1 md:order-2 flex-grow flex justify-center md:justify-end animate-fade-in" 
            style={{ animationDelay: "0.4s" }}
            aria-label="Professional headshot of Great Emman-Wori"
          >
            <figure className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-portfolioTheme-cardBg border-4 border-portfolioTheme-accent overflow-hidden hover:scale-105 transition-transform duration-500 shadow-2xl shadow-portfolioTheme-accent/20">
                <picture>
                  <source 
                    srcSet="/creative-emman-pic.webp" 
                    type="image/webp" 
                  />
                  <img 
                    src="/creative-emman-pic.png" 
                    alt="Great Emman-Wori - Professional WordPress Developer and Product Designer headshot from Port Harcourt, Nigeria" 
                    className="w-full h-full object-cover" 
                    loading="eager"
                    width="320"
                    height="320"
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
              </div>
              
              {/* Decorative glows - SEO: aria-hidden as they're decorative */}
              <div 
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-portfolioTheme-accent opacity-30 blur-2xl -z-10 animate-pulse" 
                aria-hidden="true"
              ></div>
              <div 
                className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-portfolioTheme-accent opacity-20 blur-xl -z-10 animate-pulse" 
                style={{ animationDelay: "0.5s" }} 
                aria-hidden="true"
              ></div>
              
              {/* Figcaption for semantic HTML */}
              <figcaption className="sr-only">
                Portrait photograph of Great Emman-Wori, a professional WordPress developer and product designer based in Port Harcourt, Nigeria, specializing in web development with Elementor and Divi, UI/UX design, and digital product creation.
              </figcaption>
            </figure>
          </aside>
        </div>
      </section>
    </>
  );
};

export default Hero;