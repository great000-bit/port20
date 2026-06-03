const skills = [
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "WordPress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Framer", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg" },
  { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Canva", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
];

// Duplicate for seamless loop
const row1 = [...skills.slice(0, 8), ...skills.slice(0, 8)];
const row2 = [...skills.slice(8), ...skills.slice(8)];

const SkillCard = ({ name, icon }: { name: string; icon: string }) => (
  <div className="flex-shrink-0 flex flex-col items-center justify-center gap-2 w-28 h-28 bg-[#0f1117] border border-gray-800 rounded-2xl hover:border-portfolioTheme-primary/50 hover:bg-portfolioTheme-primary/5 transition-all duration-300 cursor-default">
    <img src={icon} alt={name} className="w-10 h-10 object-contain" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
    <span className="text-xs text-gray-400 font-medium">{name}</span>
  </div>
);

const TechStack = () => {
  return (
    <section id="techstack" className="py-20 bg-portfolioTheme-secondary overflow-hidden">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">My Programming Languages and Frameworks</h2>
        <div className="w-16 h-1 bg-portfolioTheme-primary mx-auto rounded-full" />
      </div>

      {/* Row 1 — scroll left */}
      <div className="relative mb-4">
        <div className="flex gap-4 animate-scroll-left" style={{ width: "max-content" }}>
          {row1.map((skill, i) => <SkillCard key={`r1-${i}`} {...skill} />)}
        </div>
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-portfolioTheme-secondary to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-portfolioTheme-secondary to-transparent z-10" />
      </div>

      {/* Row 2 — scroll right */}
      <div className="relative">
        <div className="flex gap-4 animate-scroll-right" style={{ width: "max-content" }}>
          {row2.map((skill, i) => <SkillCard key={`r2-${i}`} {...skill} />)}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-portfolioTheme-secondary to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-portfolioTheme-secondary to-transparent z-10" />
      </div>

      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scrollLeft 30s linear infinite;
        }
        .animate-scroll-right {
          animation: scrollRight 30s linear infinite;
        }
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TechStack;
