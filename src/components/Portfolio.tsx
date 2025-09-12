"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet";

type ProjectCategory = "all" | "design" | "wordpress";

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

  // Projects array - replace with actual projects
  const projects: Project[] = [
    {
      id: 1,
      title: "Bellostylez Blog",
      category: ["wordpress"],
      image: "/bellow-stylus.webp",
      description:
        "A stylish beauty and lifestyle blog for a Canadian brand. Built with WordPress and Elementor, delivering smooth performance and aesthetic design.",
      tools: ["WordPress", "Divi Builders", "Blog", "Responsive performance"],
      link: "https://bellostylez.ca/blog/",
    },
    {
      id: 2,
      title: "Bourdillon Omijeh Foundation",
      category: ["design"],
      image: "/bof.webp",
      description:
        "A nonprofit site focused on education and empowerment. Designed for clarity, credibility, and smooth donor experience.",
      tools: ["WordPress", "UI/UX", "Nonprofit", "Figma", "Responsive performance"],
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
      category: ["design"],
      image: "/suibiz.webp",
      description:
        "Designed for a decentralized Web3 platform targeting professionals. Clean, intuitive, and ready for blockchain integration.",
      tools: ["Web3", "Marketplace", "Blockchain", "Professional"],
      link: "https://suibiz.vercel.app/",
    },
    {
      id: 5,
      title: "My Portfolio Design",
      category: ["design"],
      image: "/portflolio.webp",
      description:
        "Designed in Figma and developed from scratch with clean, responsive code. This portfolio represents my creative identity and technical skillset — blending intuitive UX, sleek animations, and performance-first development.",
      tools: ["Figma", "Responsive Design", "UI/UX"],
      link: "https://emman-wori-design-hub.vercel.app/",
    },
    {
      id: 6,
      title: "Hair Brosh Saloon",
      category: ["design"],
      image: "/webbb.webp",
      description:
        "Crafted in Figma and developed with pixel-perfect, responsive code. HairBrosh embodies modern barbershop aesthetics, merging sharp design with smooth user experience. The project highlights clean UI, accessibility, and fast-loading performance — a true showcase of creativity and precision.",
      tools: ["Figma", "Responsive Design", "UI/UX"],
      link: "https://hairbrosh-ui-kit.vercel.app/",
    },
  ];

  // Filter projects based on selected category
  const filteredProjects = projects.filter(
    (project) => filter === "all" || project.category.includes(filter)
  );

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

  // Filter tabs
  const filterOptions: { label: string; value: ProjectCategory }[] = [
    { label: "All", value: "all" },
    { label: "Design", value: "design" },
    { label: "WordPress", value: "wordpress" },
  ];

  return (
    <section id="portfolio" className="py-20">
      <Helmet>
        <title>My Portfolio | Web Design, WordPress Development & More</title>
        <meta
          name="description"
          content="Explore my portfolio showcasing my work in WordPress development, UI/UX design, and responsive web design. See how I bring digital ideas to life."
        />
        {/* Structured Data for Portfolio */}
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
              "mainEntityOfPage": "https://yourwebsite.com/portfolio",
              "project": [
                {
                  "@type": "CreativeWork",
                  "name": "Bellostylez Blog",
                  "url": "https://bellostylez.ca/blog/"
                },
                {
                  "@type": "CreativeWork",
                  "name": "Bourdillon Omijeh Foundation",
                  "url": "https://www.bourdillonomijehfoundation.com/"
                },
                {
                  "@type": "CreativeWork",
                  "name": "YouthUp Global – EmpowerAfrika",
                  "url": "https://youthupglobal.com/empowerafrika/"
                }
              ]
            }
          `}
        </script>
      </Helmet>

      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">My Projects</h2>
        <p className="text-gray-400 mt-4 mb-8 max-w-2xl mx-auto text-center">
          Here are some of my recent projects showcasing my work in WordPress development and product design.
        </p>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setFilter(option.value);
                setShowAll(false);
              }}
              className={`py-2 px-6 rounded-full font-medium transition-all duration-300 ${
                filter === option.value
                  ? "bg-amber-500 text-black"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              style={{ backgroundColor: "#2B2B2B" }}
              className="rounded-lg overflow-hidden group transition-all duration-300 hover:-translate-y-2"
            >
              {/* Project image */}
              <div className="relative aspect-video overflow-hidden bg-gray-700">
                <picture>
                  {/* WebP image for supported browsers */}
                  <source srcSet={project.image.replace(".jpg", ".webp")} type="image/webp" />
                  {/* Fallback image */}
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={`Preview of ${project.title}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy" // Lazy loading for performance
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                </picture>
                {/* Fallback placeholder */}
                <div className="absolute inset-0 bg-gray-700 flex items-center justify-center text-gray-500 hidden">
                  <span className="text-sm">Image not available</span>
                </div>
                <div className="absolute inset-0 bg-amber-500 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: "#2B2B2B" }}
                    className="text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:opacity-80"
                    aria-label={`View project: ${project.title}`}
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              {/* Project info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>

                {/* Tools used */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tools.map((tool, index) => (
                    <span
                      key={index}
                      style={{ backgroundColor: "#1F1F1F" }}
                      className="text-xs px-3 py-1 rounded-full text-gray-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-500 hover:text-amber-400 inline-flex items-center font-medium transition-colors"
                  aria-label={`View project: ${project.title}`}
                >
                  View Project <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View More/View Less button */}
        {filteredProjects.length > 3 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-amber-500 hover:bg-amber-600 text-black font-medium py-3 px-8 rounded-full transition-all duration-300 hover:scale-105"
            >
              {showAll ? "View Less" : "View More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
