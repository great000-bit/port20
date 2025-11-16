import { Code, LayoutDashboard, Smartphone, Globe, Figma, ArrowUpRight, Sparkles, PenTool, Share2, Users } from "lucide-react";
import { Helmet } from "react-helmet";

const Services = () => {
  // Services array
  const services = [
    {
      title: "Website Development",
      description:
        "Custom websites tailored to your business needs with responsive design and optimized performance.",
      icon: <Code className="w-10 h-10" aria-label="Website Development" />,
      gradient: "from-blue-500 to-cyan-500",
      delay: 0,
    },
    {
      title: "UI/UX Design",
      description:
        "User-centered design solutions that create intuitive, engaging interfaces with seamless user experiences.",
      icon: <LayoutDashboard className="w-10 h-10" aria-label="UI/UX Design" />,
      gradient: "from-purple-500 to-pink-500",
      delay: 0.1,
    },
    {
      title: "Responsive Web Design",
      description:
        "Mobile-first designs that provide optimal viewing across all devices and screen sizes.",
      icon: <Smartphone className="w-10 h-10" aria-label="Responsive Web Design" />,
      gradient: "from-green-500 to-emerald-500",
      delay: 0.2,
    },
    {
      title: "Landing Page Development",
      description:
        "High-converting landing pages designed to capture leads and drive customer action.",
      icon: <Globe className="w-10 h-10" aria-label="Landing Page Development" />,
      gradient: "from-orange-500 to-red-500",
      delay: 0.3,
    },
    {
      title: "Product Design",
      description:
        "Comprehensive product design from wireframes to interactive prototypes that solve real user problems.",
      icon: <Figma className="w-10 h-10" aria-label="Product Design" />,
      gradient: "from-violet-500 to-purple-500",
      delay: 0.4,
    },
    {
      title: "Prompt Engineering",
      description:
        "Expert AI prompt crafting for optimal ChatGPT, Claude, and other LLM outputs. Transform your AI interactions into powerful, precise results.",
      icon: <Sparkles className="w-10 h-10" aria-label="Prompt Engineering" />,
      gradient: "from-yellow-500 to-amber-500",
      delay: 0.5,
    },
    {
      title: "Ghost Writing",
      description:
        "Professional content creation that captures your voice and vision. From articles to books, I bring your ideas to life with compelling storytelling.",
      icon: <PenTool className="w-10 h-10" aria-label="Ghost Writing" />,
      gradient: "from-indigo-500 to-blue-500",
      delay: 0.6,
    },
    {
      title: "Social Media Manager",
      description:
        "Strategic social media management that builds your brand presence, drives engagement, and converts followers into loyal customers across all platforms.",
      icon: <Share2 className="w-10 h-10" aria-label="Social Media Manager" />,
      gradient: "from-pink-500 to-rose-500",
      delay: 0.7,
    },
    {
      title: "Community Manager",
      description:
        "Build and nurture thriving online communities. Foster meaningful connections, moderate discussions, and create engaging spaces where your audience feels valued.",
      icon: <Users className="w-10 h-10" aria-label="Community Manager" />,
      gradient: "from-teal-500 to-cyan-500",
      delay: 0.8,
    },
  ];

  return (
    <section id="services" className="section-padding bg-portfolioTheme-secondary relative overflow-hidden">
      <Helmet>
        <title>My Services | WordPress Development, UI/UX Design & More</title>
        <meta
          name="description"
          content="Explore my professional services, including WordPress website development, UI/UX design, responsive web design, and more, to build strong digital solutions."
        />
        {/* Structured Data for Services */}
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "Service",
              "serviceType": "Web Development, UI/UX Design, Product Design",
              "provider": {
                "@type": "Organization",
                "name": "Great Emman-Wori"
              },
              "areaServed": {
                "@type": "Place",
                "name": "Global"
              },
              "description": "Professional services including WordPress website development, UI/UX design, responsive web design, and more."
            }
          `}
        </script>
      </Helmet>

      {/* Animated background elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-portfolioTheme-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-portfolioTheme-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title">What I Do</h2>
          <p className="text-portfolioTheme-textAccent mt-4 max-w-2xl mx-auto text-lg">
            I offer a range of services to help businesses establish a strong online presence through well-designed websites and digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-portfolioTheme-cardBg rounded-2xl p-8 border border-gray-700/50 hover:border-transparent transition-all duration-500 animate-fade-in hover:-translate-y-3 hover:shadow-2xl"
              style={{ animationDelay: `${service.delay}s` }}
            >
              {/* Gradient border effect on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}></div>
              <div className="absolute inset-[1px] bg-portfolioTheme-cardBg rounded-2xl -z-10"></div>

              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl`}></div>

              {/* Icon container with gradient background */}
              <div className="relative mb-6">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                <div className={`relative w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-portfolioTheme-primary transition-colors duration-300 flex-1">
                    {service.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-portfolioTheme-textAccent group-hover:text-portfolioTheme-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                </div>
                <p className="text-portfolioTheme-textAccent leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  {service.description}
                </p>
              </div>

              {/* Decorative corner element */}
              <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <div className={`w-full h-full bg-gradient-to-br ${service.gradient} rounded-tl-full`}></div>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA section */}
        <div className="mt-16 text-center">
          <p className="text-portfolioTheme-textAccent mb-6 text-lg">
            Ready to bring your vision to life?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-portfolioTheme-primary to-portfolioTheme-accent hover:from-portfolioTheme-accent hover:to-portfolioTheme-primary text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-2xl hover:shadow-portfolioTheme-primary/50 transition-all duration-300 hover:scale-105"
          >
            Let's Work Together
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;