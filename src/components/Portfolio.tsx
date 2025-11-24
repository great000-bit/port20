"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ExternalLink, Eye, Code, Layers, Globe } from "lucide-react";
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
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "auto" }} aria-hidden="true" />
    </div>
  );
};

// ===== TYPES =====
type ProjectCategory = "all" | "uiux" | "wordpress" | "webdev";

interface Project {
  id: number;
  title: string;
  category: ProjectCategory[];
  image: string;
  description: string;
  tools: string[];
  link: string;
}

// ===== PORTFOLIO COMPONENT =====
const Portfolio = () => {
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const [showAll, setShowAll] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects: Project[] = [
    { id: 1, title: "Bellostylez Blog (Canada)", category: ["wordpress"], image: "/bellow-stylus.webp", description: "A stylish beauty and lifestyle blog for a Canadian brand. Built with WordPress and Elementor.", tools: ["WordPress", "Divi Builders", "Blog", "Responsive Design"], link: "https://bellostylez.ca/blog/" },
    { id: 2, title: "Bourdillon Omijeh Foundation", category: ["uiux"], image: "/bof.webp", description: "A nonprofit site focused on education and empowerment. Designed for clarity and credibility.", tools: ["WordPress", "UI/UX", "Nonprofit", "Figma", "Responsive Design"], link: "https://www.bourdillonomijehfoundation.com/" },
    { id: 3, title: "YouthUp Global – EmpowerAfrika", category: ["wordpress"], image: "/youthup.webp", description: "WordPress site for an international youth initiative. Built with Gutenberg and optimized for accessibility.", tools: ["WordPress", "Elementor", "Accessibility", "SEO Optimization"], link: "https://youthupglobal.com/empowerafrika/" },
    { id: 4, title: "SuiBiz – Web3 Marketplace", category: ["uiux"], image: "/suibiz.webp", description: "Designed for a decentralized Web3 platform targeting professionals.", tools: ["Web3", "Marketplace", "Blockchain", "UI/UX Design"], link: "https://suibiz.vercel.app/" },
    { id: 5, title: "My Portfolio Design", category: ["uiux"], image: "/portflolio.webp", description: "Designed in Figma and developed from scratch with clean, responsive code.", tools: ["Figma", "Responsive Design", "UI/UX", "React"], link: "https://emman-wori-design-hub.vercel.app/" },
    { id: 6, title: "Hair Brosh Saloon", category: ["uiux"], image: "/webbb.webp", description: "Crafted in Figma and developed with pixel-perfect, responsive code.", tools: ["Figma", "Responsive Design", "UI/UX", "Modern Web"], link: "https://hairbrosh-ui-kit.vercel.app/" },
    { id: 7, title: "WaContacts - WhatsApp Business Platform", category: ["uiux"], image: "/wacontacts.png", description: "A comprehensive WhatsApp business directory platform connecting businesses with real customers.", tools: ["UI/UX Design", "Business Platform", "WhatsApp Integration", "Modern Design"], link: "https://wacontacts.com/" },
    { id: 8, title: "AdsFirr - Meta Ads Management", category: ["uiux"], image: "/adsfirr.png", description: "Strategic ad management platform for Meta and Instagram advertisements.", tools: ["UI/UX Design", "Ad Management", "Analytics", "Meta Ads"], link: "https://adsfirr.vercel.app/" },
    { id: 9, title: "Timini Egbuson - Actor Portfolio", category: ["webdev"], image: "/timini.png", description: "A stunning digital portfolio for Timini Egbuson, one of Nollywood's rising stars.", tools: ["React", "Web Development", "Portfolio", "Responsive Design"], link: "https://timini-egbuson-website-star.vercel.app/" },
    { id: 10, title: "Funke Akindele - Official Website", category: ["webdev"], image: "/funke.png", description: "Official website for Funke Akindele, Nigeria's iconic actress, director, and producer.", tools: ["React", "Web Development", "Celebrity Portfolio", "Modern Web"], link: "https://funke-akindele-unveiled.vercel.app/" },
    { id: 11, title: "Ego Nwosu - Cinematic Portfolio", category: ["webdev"], image: "/ego.png", description: "Digital showcase for Ego Nwosu, the golden muse of modern Nollywood.", tools: ["React", "Web Development", "Portfolio", "Cinematic Design"], link: "https://ego-cinematic-muse.vercel.app/" },
    { id: 12, title: "Omoni Oboli - Director's Portfolio", category: ["webdev"], image: "/omoni.png", description: "Portfolio website for Omoni Oboli, Nigeria's celebrated actress and director.", tools: ["React", "Web Development", "Director Portfolio", "Elegant Design"], link: "https://omoni-oboli.vercel.app/" },
    { id: 13, title: "The Light Mission - NGO Website", category: ["webdev"], image: "/thelightmission.png", description: "A mission-driven website for The Light Mission NGO, focused on empowering African youth.", tools: ["React", "Web Development", "NGO", "Mission-Driven Design"], link: "https://www.thelightmission.com/" },
  ];

  const filteredProjects = projects.filter((project) => filter === "all" || project.category.includes(filter));
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

  const filterOptions = [
    { label: "All Projects", value: "all" as ProjectCategory, icon: <Layers className="w-4 h-4" />, count: projects.length },
    { label: "UI/UX Design", value: "uiux" as ProjectCategory, icon: <Eye className="w-4 h-4" />, count: projects.filter(p => p.category.includes("uiux")).length },
    { label: "Web Design (WordPress)", value: "wordpress" as ProjectCategory, icon: <Code className="w-4 h-4" />, count: projects.filter(p => p.category.includes("wordpress")).length },
    { label: "Web Development", value: "webdev" as ProjectCategory, icon: <Globe className="w-4 h-4" />, count: projects.filter(p => p.category.includes("webdev")).length },
  ];

  // SEO: Generate structured data for portfolio
  const portfolioStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Great Emman-Wori Portfolio - Web Development & Design Projects",
    "description": "Professional portfolio showcasing 13+ completed projects in WordPress development, UI/UX design, and web development by Great Emman-Wori",
    "url": "https://creative-emman.vercel.app/#portfolio",
    "creator": {
      "@type": "Person",
      "name": "Great Emman-Wori",
      "jobTitle": "WordPress Developer & Product Designer",
      "url": "https://creative-emman.vercel.app"
    },
    "hasPart": projects.map((project, index) => ({
      "@type": "CreativeWork",
      "position": index + 1,
      "name": project.title,
      "description": project.description,
      "url": project.link,
      "keywords": project.tools.join(", "),
      "image": `https://creative-emman.vercel.app${project.image}`,
      "creator": {
        "@type": "Person",
        "name": "Great Emman-Wori"
      },
      "workExample": {
        "@type": "WebSite",
        "url": project.link
      }
    }))
  };

  return (
    <section id="portfolio" className="section-padding bg-gradient-to-b from-[#0f0f0f] via-[#121212] to-[#0a0a0a] relative overflow-hidden" style={{ position: "relative" }} itemScope itemType="https://schema.org/CollectionPage">
      
      {/* SEO: Enhanced Helmet with proper meta tags */}
      <Helmet>
        <title>Portfolio | 13+ WordPress & Web Design Projects by Great Emman-Wori</title>
        <meta name="title" content="Portfolio | 13+ WordPress & Web Design Projects by Great Emman-Wori" />
        <meta name="description" content="Explore my portfolio of 13+ completed projects including WordPress development, UI/UX design, and responsive web design. View projects for YouthUp Global, Bourdillon Foundation, and more." />
        <meta name="keywords" content="portfolio, web design projects, WordPress projects, UI/UX design portfolio, web development portfolio, Great Emman-Wori projects, Nigeria web developer portfolio" />
        <link rel="canonical" href="https://creative-emman.vercel.app/#portfolio" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Portfolio | 13+ WordPress & Web Design Projects by Great Emman-Wori" />
        <meta property="og:description" content="Explore my portfolio of 13+ completed projects including WordPress development, UI/UX design, and responsive web design." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creative-emman.vercel.app/#portfolio" />
        <meta property="og:image" content="https://creative-emman.vercel.app/creative-emman-pic.webp" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio | 13+ WordPress & Web Design Projects by Great Emman-Wori" />
        <meta name="twitter:description" content="Explore my portfolio of 13+ completed projects including WordPress development, UI/UX design, and responsive web design." />
        <meta name="twitter:image" content="https://creative-emman.vercel.app/creative-emman-pic.webp" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(portfolioStructuredData)}
        </script>
      </Helmet>

      {/* DotGrid Background */}
      <DotGridBackground dotSize={3} gap={25} baseColor="#2a2a2a" activeColor="#8F0075" proximity={80} shockRadius={150} shockStrength={1.5} />

      <div className="absolute top-0 right-0 w-96 h-96 bg-portfolioTheme-accent/5 rounded-full blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-portfolioTheme-accent/5 rounded-full blur-3xl" aria-hidden="true"></div>

      <div className="container mx-auto px-4 relative z-10">
        <header className="text-center mb-16">
          <h1 className="section-title" itemProp="name">My Projects</h1>
          <p className="text-portfolioTheme-textAccent mt-4 mb-8 max-w-2xl mx-auto text-lg" itemProp="description">Here are some of my recent projects showcasing my work in WordPress development and product design.</p>

          <nav className="flex flex-wrap justify-center gap-3 bg-[#0a0a0a]/50 backdrop-blur-sm rounded-2xl p-2 max-w-2xl mx-auto border border-gray-700/30" role="navigation" aria-label="Project filter navigation">
            {filterOptions.map((option) => (
              <button key={option.value} onClick={() => { setFilter(option.value); setShowAll(false); }}
                className={`group relative flex items-center gap-2 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${filter === option.value ? "bg-gradient-to-r from-portfolioTheme-accent to-amber-600 text-white shadow-lg scale-105" : "bg-transparent text-portfolioTheme-textAccent hover:bg-portfolioTheme-cardBg hover:text-white"}`}
                aria-label={`Filter by ${option.label}`}
                aria-pressed={filter === option.value}>
                <span className={`transition-transform duration-300 ${filter === option.value ? 'scale-110' : 'group-hover:scale-110'}`} aria-hidden="true">{option.icon}</span>
                <span>{option.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full transition-colors duration-300 ${filter === option.value ? 'bg-white/20' : 'bg-portfolioTheme-cardBg text-portfolioTheme-textAccent group-hover:bg-portfolioTheme-accent/20'}`} aria-label={`${option.count} projects`}>{option.count}</span>
                {filter === option.value && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse" aria-hidden="true"></span>}
              </button>
            ))}
          </nav>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Portfolio projects">
          {displayedProjects.map((project, index) => (
            <article key={project.id} className="group relative bg-[#0f0f0f] rounded-2xl overflow-hidden border border-gray-700/50 hover:border-portfolioTheme-accent/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-portfolioTheme-accent/20 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }} onMouseEnter={() => setHoveredProject(project.id)} onMouseLeave={() => setHoveredProject(null)} role="listitem" itemScope itemType="https://schema.org/CreativeWork">
              <div className="absolute inset-0 bg-gradient-to-br from-portfolioTheme-accent via-amber-600 to-portfolioTheme-accent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" aria-hidden="true"></div>
              <figure className="relative aspect-video overflow-hidden bg-portfolioTheme-cardBg">
                <picture>
                  <source srcSet={project.image.replace(".jpg", ".webp")} type="image/webp" />
                  <img src={project.image || "/placeholder.svg"} alt={`${project.title} - ${project.description}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" width="400" height="225" itemProp="image" />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" aria-hidden="true"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="relative bg-gradient-to-r from-portfolioTheme-accent to-amber-600 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 group/btn" aria-label={`View ${project.title} project`} itemProp="url">
                    <ExternalLink size={24} className="group-hover/btn:rotate-12 transition-transform duration-300" aria-hidden="true" />
                    <span className="sr-only">View project</span>
                  </a>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  {project.category.map((cat) => (
                    <span key={cat} className="bg-portfolioTheme-cardBg/90 backdrop-blur-sm text-portfolioTheme-accent px-3 py-1 rounded-full text-xs font-semibold border border-portfolioTheme-accent/30 shadow-lg" aria-label={`Category: ${cat}`}>
                      {cat === "uiux" ? "UI/UX" : cat === "wordpress" ? "WordPress" : cat === "webdev" ? "Web Dev" : cat}
                    </span>
                  ))}
                </div>
              </figure>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-3 text-white group-hover:text-portfolioTheme-accent transition-colors duration-300" itemProp="name">{project.title}</h2>
                <p className="text-portfolioTheme-textAccent mb-4 line-clamp-3 leading-relaxed" itemProp="description">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-5" role="list" aria-label="Technologies used">
                  {project.tools.map((tool, i) => (<span key={i} className="text-xs px-3 py-1.5 rounded-full bg-portfolioTheme-cardBg text-portfolioTheme-textAccent border border-gray-700/50 hover:border-portfolioTheme-accent/50 hover:text-portfolioTheme-accent transition-all duration-300" role="listitem" itemProp="keywords">{tool}</span>))}
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-center gap-2 text-portfolioTheme-accent hover:text-amber-600 font-semibold transition-all duration-300" aria-label={`View ${project.title} live website`}>
                  <span className="relative">View Project<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-portfolioTheme-accent group-hover/link:w-full transition-all duration-300"></span></span>
                  <ExternalLink size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" aria-hidden="true" />
                </a>
                <meta itemProp="url" content={project.link} />
                <meta itemProp="author" content="Great Emman-Wori" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-portfolioTheme-accent via-amber-600 to-portfolioTheme-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
            </article>
          ))}
        </div>

        {filteredProjects.length > 3 && (
          <div className="text-center mt-16">
            <button onClick={() => setShowAll(!showAll)} className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-portfolioTheme-accent to-amber-600 hover:from-amber-600 hover:to-portfolioTheme-accent text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-2xl hover:shadow-portfolioTheme-accent/50 transition-all duration-300 hover:scale-105 overflow-hidden" aria-expanded={showAll} aria-label={showAll ? "View less projects" : "View more projects"}>
              <span className="relative z-10">{showAll ? "View Less" : "View More Projects"}</span>
              <svg className={`relative z-10 w-5 h-5 transition-transform duration-300 ${showAll ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" aria-hidden="true"></span>
            </button>
          </div>
        )}

        <aside className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6" aria-label="Portfolio statistics">
          {[{ label: "Projects Completed", value: "13", suffix: "+" }, { label: "Happy Clients", value: "100", suffix: "%" }, { label: "Design Tools", value: "10", suffix: "+" }, { label: "Years Experience", value: "3", suffix: "+" }].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-[#0a0a0a]/50 backdrop-blur-sm rounded-2xl border border-gray-700/30 hover:border-portfolioTheme-accent/50 transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-portfolioTheme-accent to-amber-600 bg-clip-text text-transparent mb-2" aria-label={`${stat.value}${stat.suffix} ${stat.label}`}>{stat.value}{stat.suffix}</div>
              <div className="text-portfolioTheme-textAccent text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
};

export default Portfolio;