// src/components/About.tsx
import React from "react";
import { Figma, Framer, Code, Palette } from "lucide-react";
import { Helmet } from "react-helmet";
import OrbitingItems, { orbitingItems } from "./OrbitingIcons";

const About = () => {
  const designer = {
    name: "Great Emman-Wori",
    skills: ["WordPress", "UI/UX", "Product Design"],
    passion: "Creating amazing digital experiences",
  };

  const skillsWithIcons = [
    { name: "Web Developer", icon: <Code className="w-5 h-5" /> },
    { name: "Figma", icon: <Figma className="w-5 h-5" /> },
    { name: "Framer", icon: <Framer className="w-5 h-5" /> },
    { name: "UX Strategy", icon: <Palette className="w-5 h-5" /> },
    { name: "WordPress Developer", icon: <Code className="w-5 h-5" /> },
    { name: "Canva", icon: <Palette className="w-5 h-5" /> },
  ];

  return (
    <section id="about" className="section-padding bg-portfolioTheme-secondary">
      <Helmet>
        <title>About Great Emman | Web Developer & Product Designer</title>
        <meta
          name="description"
          content="Learn about Great Emman, a skilled Web Developer, UI/UX designer, and product designer based in Port Harcourt, Nigeria, with a passion for creating user-centric digital solutions."
        />
      </Helmet>

      <div className="container mx-auto px-4">
        <h2 className="section-title">About Me</h2>

        <div className="grid md:grid-cols-2 gap-10 mt-10">
          {/* Left column - restored text */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <p className="text-lg mb-6 text-portfolioTheme-textAccent">
              {designer.name} is a Web Developer, UI/UX Designer, and Digital Product Designer based in Port Harcourt, Nigeria. With a passion for turning concepts into functional, user-centric solutions, I design and develop websites that merge creativity, strategy, and technology. My approach goes beyond visuals. I focus on building experiences that are intuitive, scalable, and future-ready.
            </p>
            <p className="text-lg mb-6 text-portfolioTheme-textAccent">
              Combining technical knowledge with creative design skills,{" "}
              {designer.name.split(" ")[0]} helps businesses establish strong
              online presences through custom WordPress solutions and intuitive
              user interfaces.
            </p>
            <p className="text-lg mb-6 text-portfolioTheme-textAccent">
              His approach focuses on creating websites that not only look
              professional but also deliver seamless user experiences that drive
              engagement and conversions.
            </p>
            <p className="text-lg mb-6 text-portfolioTheme-textAccent">
              <span className="font-bold text-portfolioTheme-accent">Passion:</span>{" "}
              {designer.passion}
            </p>

            {/* Skills */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-white">My Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skillsWithIcons.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-portfolioTheme-cardBg py-2 px-4 rounded-full"
                  >
                    <span className="text-portfolioTheme-primary">
                      {skill.icon}
                    </span>
                    <span className="text-white">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Orbiting visualization */}
          <div
            className="animate-fade-in-right flex items-center justify-center"
            style={{ animationDelay: "0.4s" }}
          >
            <OrbitingItems items={orbitingItems} radius={40} pauseOnHover />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
