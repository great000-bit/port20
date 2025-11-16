import { Helmet } from "react-helmet";
import { Quote } from "lucide-react";

const Testimonials = () => {
  // Testimonials array
  const testimonials = [
    {
      id: 1,
      name: "YOUTHUP GLOBAL UK",
      position: "CEO AND FOUNDER - YOUTHUP GLOBAL",
      avatar: "/youth.webp",
      text: "Creative Emman brought our vision for YouthUp Global Pathways to life with clarity, creativity, and care. His ability to turn complex ideas into a clean, intuitive web experience made the entire process seamless. We now have a platform that truly reflects our mission — empowering youth worldwide.",
    },
    {
      id: 2,
      name: "PROFESSOR BOURDILLION OMIJEH",
      position: "CEO AND FOUNDER - THE BOURDILLION OMIJEH FOUNDATION",
      avatar: "/bourdillion omijeh.webp",
      text: "Great was able to capture the essence of our foundation and transform it into a design that is dependable, contemporary, and cosy. His focus on user experience made the website very user-friendly for our wide range of users.",
    },
    {
      id: 3,
      name: "TRUST-GOD EWUZIEM.",
      position: "Founder, CEO - NEXATRUX",
      avatar: "/trustgod.webp",
      text: "Great has been instrumental in transforming our digital experiences. His ability to streamline complexities, create aesthetically striking designs, and maintain usability across platforms has enhanced our value delivery, His creative precision and problem-solving approach are unparalleled.",
    },
    {
      id: 4,
      name: "BELLO STYLEZ",
      position: "CEO - BELLOSTYLEZ UNISEX SALOON",
      avatar: "/bellostylez.webp",
      text: "Working with Creative Emman was the best decision for my brand. He captured my vision perfectly, delivered ahead of schedule, and made everything feel effortless. My site now feels like me  stylish, fast, and functional",
    },
  ];

  return (
    <section id="testimonials" className="section-padding bg-portfolioTheme-secondary relative overflow-hidden">
      <Helmet>
        <title>What Clients Say | Testimonials from Satisfied Clients</title>
        <meta
          name="description"
          content="Read what clients have to say about their experiences working with Creative Emman. See how his web solutions have made a difference for businesses."
        />
        {/* Structured Data for Testimonials */}
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": "YOUTHUP GLOBAL UK"
              },
              "reviewBody": "Creative Emman brought our vision for YouthUp Global Pathways to life with clarity, creativity, and care. His ability to turn complex ideas into a clean, intuitive web experience made the entire process seamless.",
              "reviewRating": {
                "@type": "Rating",
                "bestRating": "5",
                "worstRating": "1",
                "ratingValue": "5"
              }
            }
          `}
        </script>
      </Helmet>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-portfolioTheme-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-portfolioTheme-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="section-title">Listen to my Clients</h2>
          <p className="text-portfolioTheme-textAccent mt-4 max-w-2xl mx-auto">
            Hear what leading professionals have to say about our collaborations and the results we've achieved.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative bg-portfolioTheme-cardBg p-8 rounded-2xl border border-gray-700/50 hover:border-portfolioTheme-primary/50 shadow-lg hover:shadow-2xl hover:shadow-portfolioTheme-primary/10 transition-all duration-500 animate-fade-in hover:-translate-y-2"
              style={{ animationDelay: `${0.15 * index}s` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-portfolioTheme-primary/5 to-portfolioTheme-accent/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>

              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Quote className="w-16 h-16 text-portfolioTheme-primary" />
              </div>

              <div className="relative z-10">
                {/* Avatar and Name Section */}
                <div className="flex items-center gap-4 mb-6">
                  {/* Avatar with enhanced styling */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-portfolioTheme-primary to-portfolioTheme-accent rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-portfolioTheme-primary group-hover:border-portfolioTheme-accent shrink-0 transition-all duration-300 group-hover:scale-110">
                      <picture>
                        <source srcSet={testimonial.avatar.replace(".webp", ".webp")} type="image/webp" />
                        <img
                          src={testimonial.avatar}
                          alt={`Avatar of ${testimonial.name}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </picture>
                    </div>
                  </div>

                  {/* Name and Position */}
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-lg mb-1 group-hover:text-portfolioTheme-primary transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-portfolioTheme-textAccent font-medium">
                      {testimonial.position}
                    </p>
                  </div>
                </div>

                {/* Stars Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-portfolioTheme-accent group-hover:scale-110 transition-transform duration-300"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-portfolioTheme-textAccent leading-relaxed text-base">
                  <span className="text-portfolioTheme-primary text-2xl font-serif leading-none">"</span>
                  {testimonial.text}
                  <span className="text-portfolioTheme-primary text-2xl font-serif leading-none">"</span>
                </blockquote>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-portfolioTheme-primary via-portfolioTheme-accent to-portfolioTheme-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;