const experiences = [
  {
    role: "Freelance Web Developer & Designer",
    company: "Self-Employed",
    location: "Remote",
    period: "2022 – Present",
    bullets: [
      "Delivered 14+ client projects across web development, UI/UX design, and WordPress builds",
      "Built full-stack React applications for Nollywood talent including Funke Akindele, Timini Egbuson, Ego Nwosu, and Omoni Oboli",
      "Developed NGO and nonprofit websites including The Light Mission and Bourdillon Omijeh Foundation",
      "Designed and developed Web3 marketplace SuiBiz and WhatsApp business platform WaContacts",
    ],
    tags: ["React", "WordPress", "Figma", "UI/UX", "Elementor"],
  },
  {
    role: "Digital Operations & Technology Lead",
    company: "Phatbird (Fashion Brand, UK)",
    location: "Remote",
    period: "2024 – Present",
    bullets: [
      "Managed Meta Ads and Google Ads campaigns, producing performance reports for the CEO",
      "Evaluated and integrated AI toolchains including HeyGen, Seedance 2.0, Runway ML, and Kling AI",
      "Optimized Shopify store: fixed responsiveness, built interactive size guides, and embedded review widgets",
      "Handled workflow optimization, Google Drive organization, and meeting documentation",
    ],
    tags: ["Meta Ads", "Shopify", "Google Ads", "AI Tooling", "Digital Ops"],
  },
  {
    role: "WordPress Developer & UI/UX Designer",
    company: "Client Projects",
    location: "Remote",
    period: "2022 – 2024",
    bullets: [
      "Built and launched WordPress sites for YouthUp Global, Bellostylez (Canada), and Bourdillon Foundation",
      "Created responsive, SEO-optimized builds using Elementor and Divi builders",
      "Designed UI/UX for Hair Brosh Saloon, AdsFirr, and personal portfolio using Figma and Framer",
    ],
    tags: ["WordPress", "Elementor", "Divi", "Figma", "SEO"],
  },
  {
    role: "Full-Stack Developer (Contract)",
    company: "The Light Mission – Easter Bootcamp",
    location: "Remote",
    period: "2024",
    bullets: [
      "Built a full-stack Laravel 12 + React/TypeScript system for an Easter Bootcamp event",
      "Implemented Sanctum admin authentication, enrollment form, and CSV export dashboard",
      "Integrated Facebook Pixel CompleteRegistration tracking for conversion monitoring",
    ],
    tags: ["Laravel", "React", "TypeScript", "Sanctum", "Facebook Pixel"],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="section-padding bg-portfolioTheme-secondary relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Work Experience</h2>
          <div className="w-16 h-1 bg-portfolioTheme-primary mx-auto rounded-full mb-4" />
          <p className="text-portfolioTheme-textAccent">My professional journey and the work I've done</p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-800 -translate-x-1/2 hidden md:block" />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className="relative mb-12 md:mb-16">
                {/* Center dot */}
                <div className="absolute left-1/2 top-8 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0f1117] border-2 border-portfolioTheme-primary flex items-center justify-center z-10 hidden md:flex">
                  <div className="w-3 h-3 rounded-full bg-portfolioTheme-primary" />
                </div>

                {/* Period label */}
                <div className={`absolute top-8 hidden md:block text-sm text-portfolioTheme-textAccent font-medium ${isLeft ? "left-[54%] pl-8" : "right-[54%] pr-8 text-right"}`}>
                  {exp.period}
                </div>

                {/* Card */}
                <div className={`md:w-[46%] ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}>
                  <article className="bg-[#0f1117] border border-gray-800 hover:border-portfolioTheme-primary/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-portfolioTheme-primary/10 group">
                    {/* Mobile period */}
                    <p className="text-xs text-portfolioTheme-primary font-semibold mb-2 md:hidden">{exp.period}</p>

                    <h3 className="text-lg font-bold text-white group-hover:text-portfolioTheme-primary transition-colors duration-300 mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-portfolioTheme-primary font-medium text-sm mb-1">{exp.company}</p>
                    <p className="text-gray-500 text-xs mb-4">{exp.location}</p>

                    <ul className="space-y-2 mb-5">
                      {exp.bullets.map((bullet, j) => (
                        <li key={j} className="flex gap-2 text-sm text-portfolioTheme-textAccent">
                          <span className="text-portfolioTheme-primary mt-1 flex-shrink-0">▸</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, j) => (
                        <span key={j} className="text-xs px-3 py-1 rounded-full border border-gray-700 text-gray-400 group-hover:border-portfolioTheme-primary/30 transition-all duration-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
