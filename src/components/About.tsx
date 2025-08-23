import { Figma, Framer, Code, Palette } from "lucide-react";

const About = () => {
  // Designer data object
  const designer = {
    name: "Great Emman-Wori",
    skills: ["WordPress", "UI/UX", "Product Design"],
    passion: "Creating amazing digital experiences",
  };

  // Skills array with icons
  const skillsWithIcons = [
    { name: "WordPress", icon: <Code className="w-5 h-5" /> },
    { name: "Figma", icon: <Figma className="w-5 h-5" /> },
    { name: "UI Design", icon: <Framer className="w-5 h-5" /> },
    { name: "UX Strategy", icon: <Palette className="w-5 h-5" /> },
    { name: "HTML", icon: <Code className="w-5 h-5" /> },
    { name: "CSS", icon: <Palette className="w-5 h-5" /> },
  ];

  return (
    <section id="about" className="section-padding bg-portfolioTheme-secondary">
      <div className="container mx-auto px-4">
        <h2 className="section-title">About Me</h2>

        <div className="grid md:grid-cols-2 gap-10 mt-10">
          {/* Left column - Bio text */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <p className="text-lg mb-6 text-portfolioTheme-textAccent">
              {designer.name} is a 19-year-old Nigerian WordPress Developer and
              Junior Product Designer with over two years of practical
              experience in the digital space.
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
              <span className="font-bold">Passion:</span> {designer.passion}
            </p>

            {/* Skills section */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">My Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skillsWithIcons.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-portfolioTheme-cardBg py-2 px-4 rounded-full"
                  >
                    <span className="text-portfolioTheme-primary">
                      {skill.icon}
                    </span>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Stack Visualization */}
          <div
            className="animate-fade-in-right"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="relative h-full flex items-center justify-center">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-portfolioTheme-primary opacity-10 rounded-full -z-10"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-portfolioTheme-primary opacity-5 rounded-full -z-10"></div>

              {/* Central icon with stack visualization */}
              <div className="relative w-full max-w-md aspect-square">
                {/* Central logo/icon */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-purple-700 to-portfolioTheme-primary w-24 h-24 flex items-center justify-center z-20">
                  <div className="text-white text-4xl font-bold font-sans">
                    Σ
                  </div>
                  <div className="absolute w-full h-full rounded-full bg-yellow-500/20 animate-pulse"></div>
                </div>

                {/* Stack icons - using available Lucide icons */}
                <div className="absolute left-1/2 top-[15%] -translate-x-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Figma className="w-8 h-8 text-[#F24E1E]" />
                </div>

                <div className="absolute left-[15%] top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Code className="w-8 h-8 text-[#21759b]" />
                </div>

                <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Framer className="w-8 h-8 text-[#0055FF]" />
                </div>

                <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2  w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Palette className="w-8 h-8 text-[#00c4cc]" />
                </div>

                {/* Connecting lines (subtle) */}
                <div className="absolute w-full h-full rounded-full border-2 border-gray-700/30"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full border-2 border-gray-700/20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
