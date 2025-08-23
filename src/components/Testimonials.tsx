const Testimonials = () => {
  // Testimonials array
  const testimonials = [
    {
      id: 1,
      name: "John Igwe",
      position: "CEO, TechNova",
      avatar: "/use-me.jpg",
      text: "Working with Great was an excellent experience. He understood our requirements perfectly and delivered a WordPress website that exceeded our expectations. His attention to detail and design skills are outstanding.",
    },
    {
      id: 2,
      name: "Chioma K.",
      position: "Marketing Director, StyleHub",
      avatar: "/use-me.jpg",
      text: "Great redesigned our e-commerce site and the results were fantastic. The user experience improved significantly and our conversion rates increased. I highly recommend him for any web design project.",
    },
    {
      id: 3,
      name: "Sophia M.",
      position: "Founder, Wellness Studio",
      avatar: "/use-me.jpg",
      text: "It was a pleasure working with Great on our wellness studio website. He has a keen eye for design and created a beautiful, functional site that perfectly represents our brand. Extremely professional and responsive.",
    },
    {
      id: 4,
      name: "Mary Wells",
      position: "Author & Speaker",
      avatar: "/use-me.jpg",
      text: "Great created a stunning portfolio website for my speaking career. His understanding of my needs was spot on, and he delivered a site that has received numerous compliments from my colleagues. Simply excellent work!",
    },
  ];

  return (
    <section
      id="testimonials"
      className="section-padding bg-portfolioTheme-cardBg"
    >
      <div className="container mx-auto px-4">
        <h2 className="section-title">Listen to my Clients</h2>
        <p className="text-portfolioTheme-textAccent mt-4 mb-12 max-w-2xl">
          Here's what some of my amazing clients have to say about working
          together
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-portfolioTheme-cardBg p-6 rounded-lg border border-gray-700 shadow-lg animate-fade-in"
              style={{ animationDelay: `${0.15 * index}s` }}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-portfolioTheme-primary shrink-0">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div>
                  <div className="mb-4">
                    {/* Stars */}
                    <div className="flex text-portfolioTheme-primary mb-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>

                    <p className="text-portfolioTheme-textAccent mb-4">
                      "{testimonial.text}"
                    </p>

                    {/* Name and position */}
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-portfolioTheme-primary">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
