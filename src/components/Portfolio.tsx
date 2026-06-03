"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

type ProjectCategory = "all" | "uiux" | "wordpress" | "webdev";

interface Project {
  id: number;
  title: string;
  category: ProjectCategory[];
  image: string;
  description: string;
  tools: string[];
  link: string;
  tag: string;
}

const projects: Project[] = [
  { id: 1, title: "Bellostylez Blog (Canada)", category: ["wordpress"], image: "/bellow-stylus.webp", description: "A stylish beauty and lifestyle blog for a Canadian brand. Built with WordPress and Elementor.", tools: ["WordPress", "Divi", "Blog", "Responsive"], link: "https://bellostylez.ca/blog/", tag: "WordPress" },
  { id: 2, title: "Bourdillon Omijeh Foundation", category: ["uiux"], image: "/bof.webp", description: "A nonprofit site focused on education and empowerment. Designed for clarity and credibility.", tools: ["WordPress", "UI/UX", "Nonprofit", "Figma"], link: "https://www.bourdillonomijehfoundation.com/", tag: "UI/UX" },
  { id: 3, title: "YouthUp Global – EmpowerAfrika", category: ["wordpress"], image: "/youthup.webp", description: "WordPress site for an international youth initiative. Optimized for accessibility and SEO.", tools: ["WordPress", "Elementor", "Accessibility", "SEO"], link: "https://youthupglobal.com/empowerafrika/", tag: "WordPress" },
  { id: 4, title: "SuiBiz – Web3 Marketplace", category: ["uiux"], image: "/suibiz.webp", description: "Designed for a decentralized Web3 platform targeting professionals.", tools: ["Web3", "Marketplace", "Blockchain", "UI/UX"], link: "https://suibiz.vercel.app/", tag: "Web3" },
  { id: 5, title: "My Portfolio Design", category: ["uiux"], image: "/portflolio.webp", description: "Designed in Figma and developed from scratch with clean, responsive code.", tools: ["Figma", "Responsive", "UI/UX", "React"], link: "https://emman-wori-design-hub.vercel.app/", tag: "UI/UX" },
  { id: 6, title: "Hair Brosh Saloon", category: ["uiux"], image: "/webbb.webp", description: "Crafted in Figma and developed with pixel-perfect, responsive code.", tools: ["Figma", "Responsive", "UI/UX", "Modern Web"], link: "https://hairbrosh-ui-kit.vercel.app/", tag: "UI/UX" },
  { id: 7, title: "WaContacts – WhatsApp Business Platform", category: ["uiux"], image: "/wacontacts.png", description: "A comprehensive WhatsApp business directory platform connecting businesses with real customers.", tools: ["UI/UX Design", "Business Platform", "WhatsApp", "Modern Design"], link: "https://wacontacts.com/", tag: "UI/UX" },
  { id: 8, title: "AdsFirr – Meta Ads Management", category: ["uiux"], image: "/adsfirr.png", description: "Strategic ad management platform for Meta and Instagram advertisements.", tools: ["UI/UX Design", "Ad Management", "Analytics", "Meta Ads"], link: "https://adsfirr.vercel.app/", tag: "UI/UX" },
  { id: 9, title: "Timini Egbuson – Actor Portfolio", category: ["webdev"], image: "/timini.png", description: "A stunning digital portfolio for Timini Egbuson, one of Nollywood's rising stars.", tools: ["React", "Web Dev", "Portfolio", "Responsive"], link: "https://timini-egbuson-website-star.vercel.app/", tag: "Full Stack" },
  { id: 10, title: "Funke Akindele – Official Website", category: ["webdev"], image: "/funke.png", description: "Official website for Funke Akindele, Nigeria's iconic actress, director, and producer.", tools: ["React", "Web Dev", "Celebrity Portfolio", "Modern Web"], link: "https://funke-akindele-unveiled.vercel.app/", tag: "Full Stack" },
  { id: 11, title: "Ego Nwosu – Cinematic Portfolio", category: ["webdev"], image: "/ego.png", description: "Digital showcase for Ego Nwosu, the golden muse of modern Nollywood.", tools: ["React", "Web Dev", "Portfolio", "Cinematic Design"], link: "https://ego-cinematic-muse.vercel.app/", tag: "Frontend" },
  { id: 12, title: "Omoni Oboli – Director's Portfolio", category: ["webdev"], image: "/omoni.png", description: "Portfolio website for Omoni Oboli, Nigeria's celebrated actress and director.", tools: ["React", "Web Dev", "Director Portfolio", "Elegant Design"], link: "https://omoni-oboli.vercel.app/", tag: "Frontend" },
  { id: 13, title: "The Light Mission – NGO Website", category: ["webdev"], image: "/thelightmission.png", description: "A mission-driven website for The Light Mission NGO, empowering African youth.", tools: ["React", "Web Dev", "NGO", "Mission-Driven"], link: "https://www.thelightmission.com/", tag: "Full Stack" },
  { id: 14, title: "Wizor Progress – Real Estate Portfolio", category: ["webdev"], image: "/wizor.png", description: "Professional portfolio for Wizor, a real estate manager and owner of Sommy Properties.", tools: ["React", "Web Dev", "Real Estate", "Business Website"], link: "https://wizor-progress-hub.vercel.app/", tag: "Frontend" },
];

const filterOptions = [
  { label: "All Projects", value: "all" as ProjectCategory },
  { label: "UI/UX Design", value: "uiux" as ProjectCategory },
  { label: "WordPress", value: "wordpress" as ProjectCategory },
  { label: "Web Development", value: "webdev" as ProjectCategory },
];

const tagColors: Record<string, string> = {
  "WordPress": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "UI/UX": "bg-portfolioTheme-primary/20 text-portfolioTheme-primary border-portfolioTheme-primary/30",
  "Web3": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Full Stack": "bg-green-500/20 text-green-300 border-green-500/30",
  "Frontend": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
};

const Portfolio = () => {
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const [showAll, setShowAll] = useState(false);

  const filtered = projects.filter(p => filter === "all" || p.category.includes(filter));
  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="portfolio" className="section-padding bg-[#080b12] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Featured Projects</h2>
          <div className="w-16 h-1 bg-portfolioTheme-primary mx-auto rounded-full mb-4" />
          <p className="text-portfolioTheme-textAccent max-w-xl mx-auto">A collection of projects I've built with passion and attention to detail</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => { setFilter(opt.value); setShowAll(false); }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                filter === opt.value
                  ? "bg-portfolioTheme-primary text-white border-portfolioTheme-primary"
                  : "bg-transparent text-gray-400 border-gray-700 hover:border-portfolioTheme-primary/50 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {displayed.map((project) => (
            <article
              key={project.id}
              className="group bg-[#0f1117] border border-gray-800 hover:border-portfolioTheme-primary/40 rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-portfolioTheme-primary/10"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-[#0a0a0a]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75"
                  loading="lazy"
                />
                {/* Tag badge */}
                <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full border ${tagColors[project.tag] || "bg-gray-700 text-gray-300 border-gray-600"}`}>
                  {project.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-portfolioTheme-primary transition-colors duration-300 leading-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-portfolioTheme-textAccent leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>
                {/* Tools */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tools.slice(0, 3).map((tool, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-[#1a1a2e] text-gray-400 border border-gray-800">
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 3 && (
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-[#1a1a2e] text-gray-500 border border-gray-800">+{project.tools.length - 3}</span>
                  )}
                </div>
                {/* CTA */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gray-700 text-gray-400 text-sm font-medium hover:border-portfolioTheme-primary hover:text-portfolioTheme-primary transition-all duration-300 group/btn"
                >
                  View Project
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Show more */}
        {filtered.length > 6 && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full border border-portfolioTheme-primary text-portfolioTheme-primary hover:bg-portfolioTheme-primary hover:text-white font-medium transition-all duration-300"
            >
              {showAll ? "Show Less" : `View All ${filtered.length} Projects`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
