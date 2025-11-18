"use client";

import { useState } from "react";
import { ExternalLink, Eye, Code, Layers, Globe } from "lucide-react";
import { Helmet } from "react-helmet";

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

const Portfolio = () => {
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const [showAll, setShowAll] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Projects array
  const projects: Project[] = [
    {
      id: 1,
      title: "Bellostylez Blog (Canada)",
      category: ["wordpress"],
      image: "/bellow-stylus.webp",
      description:
        "A stylish beauty and lifestyle blog for a Canadian brand. Built with WordPress and Elementor, delivering smooth performance and aesthetic design.",
      tools: ["WordPress", "Divi Builders", "Blog", "Responsive Design"],
      link: "https://bellostylez.ca/blog/",
    },
    {
      id: 2,
      title: "Bourdillon Omijeh Foundation",
      category: ["uiux"],
      image: "/bof.webp",
      description:
        "A nonprofit site focused on education and empowerment. Designed for clarity, credibility, and smooth donor experience with intuitive user flows.",
      tools: ["WordPress", "UI/UX", "Nonprofit", "Figma", "Responsive Design"],
      link: "https://www.bourdillonomijehfoundation.com/",
    },
    {
      id: 3,
      title: "YouthUp Global – EmpowerAfrika",
      category: ["wordpress"],
      image: "/youthup.webp",
      description:
        "WordPress site for an international youth initiative. Built with Gutenberg and optimized for accessibility and responsive design.",
      tools: ["WordPress", "Elementor", "Accessibility", "SEO Optimization"],
      link: "https://youthupglobal.com/empowerafrika/",
    },
    {
      id: 4,
      title: "SuiBiz – Web3 Marketplace",
      category: ["uiux"],
      image: "/suibiz.webp",
      description:
        "Designed for a decentralized Web3 platform targeting professionals. Clean, intuitive, and ready for blockchain integration.",
      tools: ["Web3", "Marketplace", "Blockchain", "UI/UX Design"],
      link: "https://suibiz.vercel.app/",
    },
    {
      id: 5,
      title: "My Portfolio Design",
      category: ["uiux"],
      image: "/portflolio.webp",
      description:
        "Designed in Figma and developed from scratch with clean, responsive code. This portfolio represents my creative identity and technical skillset — blending intuitive UX, sleek animations, and performance-first development.",
      tools: ["Figma", "Responsive Design", "UI/UX", "React"],
      link: "https://emman-wori-design-hub.vercel.app/",
    },
    {
      id: 6,
      title: "Hair Brosh Saloon",
      category: ["uiux"],
      image: "/webbb.webp",
      description:
        "Crafted in Figma and developed with pixel-perfect, responsive code. HairBrosh embodies modern barbershop aesthetics, merging sharp design with smooth user experience.",
      tools: ["Figma", "Responsive Design", "UI/UX", "Modern Web"],
      link: "https://hairbrosh-ui-kit.vercel.app/",
    },
    {
      id: 7,
      title: "WaContacts - WhatsApp Business Platform",
      category: ["uiux"],
      image: "/wacontacts.png",
      description:
        "A comprehensive WhatsApp business directory platform connecting businesses with real customers. Features channel following, group joining, and business promotion tools with a clean, modern interface.",
      tools: ["UI/UX Design", "Business Platform", "WhatsApp Integration", "Modern Design"],
      link: "https://wacontacts.com/",
    },
    {
      id: 8,
      title: "AdsFirr - Meta Ads Management",
      category: ["uiux"],
      image: "/adsfirr.png",
      description:
        "Strategic ad management platform for Meta and Instagram advertisements. Designed to help advertisers optimize campaigns, track performance, and maximize ROI with an intuitive dashboard experience.",
      tools: ["UI/UX Design", "Ad Management", "Analytics", "Meta Ads"],
      link: "https://adsfirr.vercel.app/",
    },
    {
      id: 9,
      title: "Timini Egbuson - Actor Portfolio",
      category: ["webdev"],
      image: "/timini.png",
      description:
        "A stunning digital portfolio for Timini Egbuson, one of Nollywood's rising stars. The website showcases his filmography, awards, and journey as an actor with elegant design and smooth interactions.",
      tools: ["React", "Web Development", "Portfolio", "Responsive Design"],
      link: "https://timini-egbuson-website-star.vercel.app/",
    },
    {
      id: 10,
      title: "Funke Akindele - Official Website",
      category: ["webdev"],
      image: "/funke.png",
      description:
        "Official website for Funke Akindele, Nigeria's iconic actress, director, and producer. Known for her groundbreaking work including 'Jenifa's Diary' and box office hits, this site captures her legacy with sophistication.",
      tools: ["React", "Web Development", "Celebrity Portfolio", "Modern Web"],
      link: "https://funke-akindele-unveiled.vercel.app/",
    },
    {
      id: 11,
      title: "Ego Nwosu - Cinematic Portfolio",
      category: ["webdev"],
      image: "/ego.png",
      description:
        "Digital showcase for Ego Nwosu, the golden muse of modern Nollywood. An actress, visionary, and storyteller whose grace and power define African cinema with every performance.",
      tools: ["React", "Web Development", "Portfolio", "Cinematic Design"],
      link: "https://ego-cinematic-muse.vercel.app/",
    },
    {
      id: 12,
      title: "Omoni Oboli - Director's Portfolio",
      category: ["webdev"],
      image: "/omoni.png",
      description:
        "Portfolio website for Omoni Oboli, Nigeria's celebrated actress, director, and visionary. Empowering through art, excellence, and global influence, this site reflects her journey in African cinema.",
      tools: ["React", "Web Development", "Director Portfolio", "Elegant Design"],
      link: "https://omoni-oboli.vercel.app/",
    },
    {
      id: 13,
      title: "The Light Mission - NGO Website",
      category: ["webdev"],
      image: "/thelightmission.png",
      description:
        "A mission-driven website for The Light Mission NGO, focused on illuminating Africa and empowering futures. Built to inspire action through faith, innovation, and digital excellence for African youth development.",
      tools: ["React", "Web Development", "NGO", "Mission-Driven Design"],
      link: "https://www.thelightmission.com/",
    },
  ];

  // Filter projects based on selected category
  const filteredProjects = projects.filter(
    (project) => filter === "all" || project.category.includes(filter)
  );

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

  // Enhanced filter options with icons and counts
  const filterOptions = [
    { 
      label: "All Projects", 
      value: "all" as ProjectCategory, 
      icon: <Layers className="w-4 h-4" />,
      count: projects.length 
    },
    { 
      label: "UI/UX Design", 
      value: "uiux" as ProjectCategory, 
      icon: <Eye className="w-4 h-4" />,
      count: projects.filter(p => p.category.includes("uiux")).length 
    },
    { 
      label: "Web Design (WordPress)", 
      value: "wordpress" as ProjectCategory, 
      icon: <Code className="w-4 h-4" />,
      count: projects.filter(p => p.category.includes("wordpress")).length 
    },
    { 
      label: "Web Development", 
      value: "webdev" as ProjectCategory, 
      icon: <Globe className="w-4 h-4" />,
      count: projects.filter(p => p.category.includes("webdev")).length 
    },
  ];

  return (
    <section id="portfolio" className="section-padding bg-gradient-to-b from-[#0f0f0f] via-[#121212] to-[#0a0a0a] relative overflow-hidden">
      <Helmet>
        <title>My Portfolio | Web Design, WordPress Development & More</title>
        <meta
          name="description"
          content="Explore my portfolio showcasing my work in WordPress development, UI/UX design, and responsive web design. See how I bring digital ideas to life."
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "CreativeWork",
              "name": "Great Emman-Wori Portfolio",
              "author": {
                "@type": "Person",
                "name": "Great Emman-Wori"
              },
              "description": "A portfolio showcasing a variety of projects including web design, WordPress development, and UI/UX design.",
              "url": "https://yourwebsite.com/portfolio",
              "mainEntityOfPage": "https://yourwebsite.com/portfolio"
            }
          `}
        </script>
      </Helmet>

      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-portfolioTheme-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-portfolioTheme-accent/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="section-title">My Projects</h2>
          <p className="text-portfolioTheme-textAccent mt-4 mb-8 max-w-2xl mx-auto text-lg">
            Here are some of my recent projects showcasing my work in WordPress development and product design.
          </p>

          {/* Enhanced Filter tabs with icons and counts */}
          <div className="flex flex-wrap justify-center gap-3 bg-[#0a0a0a]/50 backdrop-blur-sm rounded-2xl p-2 max-w-2xl mx-auto border border-gray-700/30">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setFilter(option.value);
                  setShowAll(false);
                }}
                className={`group relative flex items-center gap-2 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                  filter === option.value
                    ? "bg-gradient-to-r from-portfolioTheme-accent to-amber-600 text-white shadow-lg scale-105"
                    : "bg-transparent text-portfolioTheme-textAccent hover:bg-portfolioTheme-cardBg hover:text-white"
                }`}
              >
                <span className={`transition-transform duration-300 ${filter === option.value ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {option.icon}
                </span>
                <span>{option.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full transition-colors duration-300 ${
                  filter === option.value 
                    ? 'bg-white/20' 
                    : 'bg-portfolioTheme-cardBg text-portfolioTheme-textAccent group-hover:bg-portfolioTheme-accent/20'
                }`}>
                  {option.count}
                </span>
                
                {/* Active indicator */}
                {filter === option.value && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid with stagger animation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-[#0f0f0f] rounded-2xl overflow-hidden border border-gray-700/50 hover:border-portfolioTheme-accent/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-portfolioTheme-accent/20 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Gradient border glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-portfolioTheme-accent via-amber-600 to-portfolioTheme-accent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>

              {/* Project image */}
              <div className="relative aspect-video overflow-hidden bg-portfolioTheme-cardBg">
                <picture>
                  <source srcSet={project.image.replace(".jpg", ".webp")} type="image/webp" />
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={`Preview of ${project.title}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                </picture>
                
                {/* Fallback placeholder */}
                <div className="absolute inset-0 bg-portfolioTheme-cardBg flex items-center justify-center text-portfolioTheme-textAccent hidden">
                  <span className="text-sm">Image not available</span>
                </div>

                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* View button with enhanced styling */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative bg-gradient-to-r from-portfolioTheme-accent to-amber-600 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 group/btn"
                    aria-label={`View project: ${project.title}`}
                  >
                    <ExternalLink size={24} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                    <span className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover/btn:scale-150 transition-transform duration-500 opacity-0 group-hover/btn:opacity-100"></span>
                  </a>
                </div>

                {/* Category badge */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {project.category.map((cat) => (
                    <span
                      key={cat}
                      className="bg-portfolioTheme-cardBg/90 backdrop-blur-sm text-portfolioTheme-accent px-3 py-1 rounded-full text-xs font-semibold border border-portfolioTheme-accent/30 shadow-lg"
                    >
                      {cat === "uiux" ? "UI/UX" : cat === "wordpress" ? "WordPress" : cat === "webdev" ? "Web Dev" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-portfolioTheme-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-portfolioTheme-textAccent mb-4 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Tools used with enhanced styling */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="text-xs px-3 py-1.5 rounded-full bg-portfolioTheme-cardBg text-portfolioTheme-textAccent border border-gray-700/50 hover:border-portfolioTheme-accent/50 hover:text-portfolioTheme-accent transition-all duration-300"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* View project link */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 text-portfolioTheme-accent hover:text-amber-600 font-semibold transition-all duration-300"
                  aria-label={`View project: ${project.title}`}
                >
                  <span className="relative">
                    View Project
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-portfolioTheme-accent group-hover/link:w-full transition-all duration-300"></span>
                  </span>
                  <ExternalLink 
                    size={16} 
                    className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" 
                  />
                </a>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-portfolioTheme-accent via-amber-600 to-portfolioTheme-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Enhanced View More/View Less button */}
        {filteredProjects.length > 3 && (
          <div className="text-center mt-16">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-portfolioTheme-accent to-amber-600 hover:from-amber-600 hover:to-portfolioTheme-accent text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-2xl hover:shadow-portfolioTheme-accent/50 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10">{showAll ? "View Less" : "View More Projects"}</span>
              <svg 
                className={`relative z-10 w-5 h-5 transition-transform duration-300 ${showAll ? 'rotate-180' : 'rotate-0'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              
              {/* Shine effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></span>
            </button>
          </div>
        )}

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Projects Completed", value: "13", suffix: "+" },
            { label: "Happy Clients", value: "100", suffix: "%" },
            { label: "Design Tools", value: "10", suffix: "+" },
            { label: "Years Experience", value: "3", suffix: "+" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-[#0a0a0a]/50 backdrop-blur-sm rounded-2xl border border-gray-700/30 hover:border-portfolioTheme-accent/50 transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-portfolioTheme-accent to-amber-600 bg-clip-text text-transparent mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-portfolioTheme-textAccent text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;