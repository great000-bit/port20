const Testimonials = () => {
  // Testimonials array
  const testimonials = [
    {
      id: 1,
      name: "YOUTHUP GLOBAL UK",
      position: "CEO AND FOUNDER - YOUTHUP GLOBAL",
      avatar: "/youth.jpg",
      text: "Creative Emman brought our vision for YouthUp Global Pathways to life with clarity, creativity, and care. His ability to turn complex ideas into a clean, intuitive web experience made the entire process seamless. We now have a platform that truly reflects our mission — empowering youth worldwide.",
    },
    {
      id: 2,
      name: "PROFESSOR BOURDILLION OMIJEH",
      position: "CEO AND FOUNDER - THE BOURDILLION OMIJEH FOUNDATION",
      avatar: "/bourdillion omijeh.jpg",
      text: "Great was able to capture the essence of our foundation and transform it into a design that is dependable, contemporary, and cosy. His focus on user experience made the website very user-friendly for our wide range of users.",
    },
    {
      id: 3,
      name: "TRUST-GOD EWUZIEM.",
      position: "Founder, CEO - NEXATRUX",
      avatar: "/trustgod.jpg",
      text: "Great has been instrumental in transforming our digital experiences. His ability to streamline complexities, create aesthetically striking designs, and maintain usability across platforms has enhanced our value delivery, His creative precision and problem-solving approach are unparalleled.",
    },
    {
      id: 4,
      name: "BELLO STYLEZ",
      position: "CEO - BELLOSTYLEZ UNISEX SALOON",
      avatar: "/bellostylez.png",
      text: "Working with Creative Emman was the best decision for my brand. He captured my vision perfectly, delivered ahead of schedule, and made everything feel effortless. My site now feels like me  stylish, fast, and functional",
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
