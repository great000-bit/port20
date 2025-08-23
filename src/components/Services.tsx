
import { 
  Code, 
  LayoutDashboard, 
  Smartphone, 
  Globe, 
  Figma 
} from "lucide-react";

const Services = () => {
  // Services array
  const services = [
    {
      title: "WordPress Website Development",
      description: "Custom WordPress websites tailored to your business needs with responsive design and optimized performance.",
      icon: <Code className="w-10 h-10" />
    },
    {
      title: "UI/UX Design",
      description: "User-centered design solutions that create intuitive, engaging interfaces with seamless user experiences.",
      icon: <LayoutDashboard className="w-10 h-10" />
    },
    {
      title: "Responsive Web Design",
      description: "Mobile-first designs that provide optimal viewing across all devices and screen sizes.",
      icon: <Smartphone className="w-10 h-10" />
    },
    {
      title: "Landing Page Development",
      description: "High-converting landing pages designed to capture leads and drive customer action.",
      icon: <Globe className="w-10 h-10" />
    },
    {
      title: "Product Design",
      description: "Comprehensive product design from wireframes to interactive prototypes that solve real user problems.",
      icon: <Figma className="w-10 h-10" />
    },
  ];

  return (
    <section id="services" className="section-padding bg-portfolioTheme-cardBg">
      <div className="container mx-auto px-4">
        <h2 className="section-title">What I Do</h2>
        <p className="text-portfolioTheme-textAccent mt-4 mb-12 max-w-2xl">
          I offer a range of services to help businesses establish a strong online 
          presence through well-designed websites and digital products.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="card group hover:border-l-4 hover:border-portfolioTheme-primary"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="text-portfolioTheme-primary mb-4 group-hover:scale-110 transform transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-portfolioTheme-textAccent">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
