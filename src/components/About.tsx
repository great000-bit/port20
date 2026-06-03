const About = () => {
  const stats = [
    { value: "16+", label: "Projects Completed", icon: "◈" },
    { value: "12+", label: "Happy Clients", icon: "◉" },
    { value: "3+", label: "Years Experience", icon: "◷" },
    { value: "100%", label: "Client Satisfaction", icon: "★" },
  ];

  return (
    <section id="about" className="section-padding bg-[#080b12] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">About Me</h2>
          <div className="w-16 h-1 bg-portfolioTheme-primary mx-auto rounded-full" />
        </div>

        {/* Bio text — centered, clean like Johney */}
        <div className="max-w-3xl mx-auto text-center space-y-5 mb-16">
          <p className="text-gray-300 text-lg leading-relaxed">
            I'm a passionate web developer and product designer with expertise in WordPress development, UI/UX design, and building modern web applications with React and TypeScript. I specialize in creating accessible, human-centered digital experiences that make a real impact.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            My journey has led me to work with clients across Nigeria, Canada, and the UK — building everything from nonprofit sites and celebrity portfolios to Web3 platforms and SaaS products. I believe in clean code, thoughtful design, and products that users genuinely enjoy.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Currently doing digital operations and campaign management at <span className="text-portfolioTheme-primary font-semibold">Phatbird</span> (UK), while taking on freelance development and design projects. I'm always open to new opportunities and collaborations.
          </p>
          <p className="text-white text-lg font-medium">
            Let's build something amazing together!
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#0f1117] border border-gray-800 hover:border-portfolioTheme-primary/50 transition-all duration-300 group"
            >
              <span className="text-3xl text-portfolioTheme-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </span>
              <span className="text-4xl font-bold text-white mb-1">{stat.value}</span>
              <span className="text-sm text-gray-400">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
