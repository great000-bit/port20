import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

// ===== DOTGRID BACKGROUND =====
function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

interface Dot { cx: number; cy: number; xOffset: number; yOffset: number; vx: number; vy: number; }

const DotGridBackground = ({
  dotSize = 3, gap = 25, baseColor = "#2a2a2a", activeColor = "#8F0075",
  proximity = 80, shockRadius = 150, shockStrength = 1.5,
}: { dotSize?: number; gap?: number; baseColor?: string; activeColor?: string;
  proximity?: number; shockRadius?: number; shockStrength?: number; }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({ x: -1000, y: -1000 });
  const containerRef = useRef<HTMLDivElement>(null);
  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const buildGrid = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const { width, height } = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;
    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;
    const startX = (width - gridW) / 2 + dotSize / 2;
    const startY = (height - gridH) / 2 + dotSize / 2;
    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dots.push({ cx: startX + x * cell, cy: startY + y * cell, xOffset: 0, yOffset: 0, vx: 0, vy: 0 });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    let rafId: number;
    const proxSq = proximity * proximity;
    const springK = 0.08;
    const damping = 0.92;
    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: px, y: py } = pointerRef.current;
      const radius = dotSize / 2;
      for (const dot of dotsRef.current) {
        const ax = -springK * dot.xOffset;
        const ay = -springK * dot.yOffset;
        dot.vx = (dot.vx + ax) * damping;
        dot.vy = (dot.vy + ay) * damping;
        dot.xOffset += dot.vx;
        dot.yOffset += dot.vy;
        if (Math.abs(dot.xOffset) < 0.05 && Math.abs(dot.vx) < 0.05) { dot.xOffset = 0; dot.vx = 0; }
        if (Math.abs(dot.yOffset) < 0.05 && Math.abs(dot.vy) < 0.05) { dot.yOffset = 0; dot.vy = 0; }
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;
        let r = baseRgb.r, g = baseRgb.g, b = baseRgb.b;
        if (dsq <= proxSq) {
          const t = 1 - Math.sqrt(dsq) / proximity;
          r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
        }
        ctx.beginPath();
        ctx.arc(ox, oy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [proximity, baseRgb, activeRgb, dotSize]);

  useEffect(() => {
    buildGrid();
    const ro = new ResizeObserver(buildGrid);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [buildGrid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
    };
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius) {
          const falloff = Math.max(0, 1 - dist / shockRadius);
          dot.vx += (dot.cx - cx) * shockStrength * falloff * 0.1;
          dot.vy += (dot.cy - cy) * shockStrength * falloff * 0.1;
        }
      }
    };
    const handleMouseLeave = () => { pointerRef.current.x = -1000; pointerRef.current.y = -1000; };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [shockRadius, shockStrength]);

  return (
    <div ref={containerRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} aria-hidden="true">
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "auto" }} aria-label="Interactive dot grid background" />
    </div>
  );
};

// ===== TESTIMONIALS CAROUSEL COMPONENT =====
const Testimonials = () => {
  const testimonials = [
    { id: 1, name: "YOUTHUP GLOBAL UK", position: "CEO AND FOUNDER - YOUTHUP GLOBAL", avatar: "/youth.webp", text: "Creative Emman brought our vision for YouthUp Global Pathways to life with clarity, creativity, and care. His ability to turn complex ideas into a clean, intuitive web experience made the entire process seamless. We now have a platform that truly reflects our mission — empowering youth worldwide.", rating: 5 },
    { id: 2, name: "PROFESSOR BOURDILLION OMIJEH", position: "CEO AND FOUNDER - THE BOURDILLION OMIJEH FOUNDATION", avatar: "/bourdillion omijeh.webp", text: "Great was able to capture the essence of our foundation and transform it into a design that is dependable, contemporary, and cosy. His focus on user experience made the website very user-friendly for our wide range of users.", rating: 5 },
    { id: 3, name: "TRUST-GOD EWUZIEM.", position: "Founder, CEO - NEXATRUX", avatar: "/trustgod.webp", text: "Great has been instrumental in transforming our digital experiences. His ability to streamline complexities, create aesthetically striking designs, and maintain usability across platforms has enhanced our value delivery. His creative precision and problem-solving approach are unparalleled.", rating: 5 },
    { id: 4, name: "BELLO STYLEZ", position: "CEO - BELLOSTYLEZ UNISEX SALOON", avatar: "/bellostylez.webp", text: "Working with Creative Emman was the best decision for my brand. He captured my vision perfectly, delivered ahead of schedule, and made everything feel effortless. My site now feels like me — stylish, fast, and functional.", rating: 5 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
  }, [testimonials.length]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating, testimonials.length]);

  const goToPrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating, testimonials.length]);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 700);
    stopAutoPlay();
    startAutoPlay();
  }, [isAnimating, currentIndex, stopAutoPlay, startAutoPlay]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      else if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className="section-padding bg-portfolioTheme-secondary relative overflow-hidden"
      aria-labelledby="testimonials-heading"
      itemScope
      itemType="https://schema.org/ReviewPage"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >

      {/* DotGrid Background */}
      <DotGridBackground dotSize={3} gap={25} baseColor="#2a2a2a" activeColor="#8F0075" proximity={80} shockRadius={150} shockStrength={1.5} />

      <div className="absolute top-0 left-0 w-64 h-64 bg-portfolioTheme-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" aria-hidden="true"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-portfolioTheme-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" aria-hidden="true"></div>

      <div className="container mx-auto px-4 relative z-10">
        <header className="text-center mb-12">
          <h2 id="testimonials-heading" className="section-title" itemProp="name">Listen to my Clients</h2>
          <p className="text-portfolioTheme-textAccent mt-4 max-w-2xl mx-auto" itemProp="description">
            Hear what <strong>leading professionals</strong> have to say about our <strong>collaborations</strong> and the <strong>results</strong> we've achieved together.
          </p>
        </header>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">

          {/* Carousel Card */}
          <div
            className="relative"
            role="list"
            aria-label="Client testimonials and reviews"
            aria-live="polite"
          >
            <article
              key={currentTestimonial.id}
              className="group relative bg-portfolioTheme-cardBg p-8 md:p-10 lg:p-12 rounded-2xl border border-gray-700/50 hover:border-portfolioTheme-primary/50 shadow-lg hover:shadow-2xl hover:shadow-portfolioTheme-primary/10 transition-all duration-700 hover:-translate-y-2 animate-fade-in min-h-[380px] md:min-h-[350px]"
              itemScope
              itemType="https://schema.org/Review"
              role="listitem"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-portfolioTheme-primary/5 to-portfolioTheme-accent/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-700" aria-hidden="true"></div>
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500" aria-hidden="true">
                <Quote className="w-16 h-16 text-portfolioTheme-primary" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-portfolioTheme-primary to-portfolioTheme-accent rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500" aria-hidden="true"></div>
                    <figure className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-portfolioTheme-primary group-hover:border-portfolioTheme-accent shrink-0 transition-all duration-500 group-hover:scale-110">
                      <picture>
                        <source srcSet={currentTestimonial.avatar} type="image/webp" />
                        <img
                          src={currentTestimonial.avatar}
                          alt={`${currentTestimonial.name} - ${currentTestimonial.position}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width="64"
                          height="64"
                          itemProp="image"
                        />
                      </picture>
                    </figure>
                  </div>

                  <div className="flex-1" itemProp="author" itemScope itemType="https://schema.org/Person">
                    <h3 className="font-bold text-white text-lg md:text-xl mb-1 group-hover:text-portfolioTheme-primary transition-colors duration-500" itemProp="name">
                      {currentTestimonial.name}
                    </h3>
                    <p className="text-sm text-portfolioTheme-textAccent font-medium" itemProp="jobTitle">
                      {currentTestimonial.position}
                    </p>
                  </div>
                </div>

                <div
                  className="flex gap-1 mb-6"
                  itemProp="reviewRating"
                  itemScope
                  itemType="https://schema.org/Rating"
                  role="img"
                  aria-label={`${currentTestimonial.rating} out of 5 stars rating`}
                >
                  <meta itemProp="ratingValue" content={currentTestimonial.rating.toString()} />
                  <meta itemProp="bestRating" content="5" />
                  <meta itemProp="worstRating" content="1" />
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-portfolioTheme-accent group-hover:scale-110 transition-transform duration-500"
                      style={{ transitionDelay: `${i * 60}ms` }}
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>

                <blockquote
                  className="text-portfolioTheme-textAccent leading-relaxed text-base md:text-lg"
                  itemProp="reviewBody"
                >
                  <span className="text-portfolioTheme-primary text-3xl font-serif leading-none" aria-hidden="true">"</span>
                  {currentTestimonial.text}
                  <span className="text-portfolioTheme-primary text-3xl font-serif leading-none" aria-hidden="true">"</span>
                </blockquote>

                <meta itemProp="itemReviewed" itemScope itemType="https://schema.org/Service" content="Web Development & Design Services" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-portfolioTheme-primary via-portfolioTheme-accent to-portfolioTheme-primary opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-b-2xl" aria-hidden="true"></div>
            </article>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            disabled={isAnimating}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 lg:-translate-x-20 bg-portfolioTheme-cardBg hover:bg-portfolioTheme-primary border border-gray-700/50 hover:border-portfolioTheme-primary text-white rounded-full p-3 md:p-4 transition-all duration-500 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:shadow-portfolioTheme-primary/40 focus:outline-none focus:ring-2 focus:ring-portfolioTheme-primary focus:ring-offset-2 focus:ring-offset-portfolioTheme-secondary z-20"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
          </button>

          <button
            onClick={goToNext}
            disabled={isAnimating}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 lg:translate-x-20 bg-portfolioTheme-cardBg hover:bg-portfolioTheme-primary border border-gray-700/50 hover:border-portfolioTheme-primary text-white rounded-full p-3 md:p-4 transition-all duration-500 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:shadow-portfolioTheme-primary/40 focus:outline-none focus:ring-2 focus:ring-portfolioTheme-primary focus:ring-offset-2 focus:ring-offset-portfolioTheme-secondary z-20"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
          </button>

          {/* Dot Indicators */}
          <div
            className="flex justify-center gap-3 mt-8"
            role="tablist"
            aria-label="Testimonial navigation"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                className={`transition-all duration-500 rounded-full focus:outline-none focus:ring-2 focus:ring-portfolioTheme-primary focus:ring-offset-2 focus:ring-offset-portfolioTheme-secondary ${
                  index === currentIndex
                    ? 'w-12 h-3 bg-portfolioTheme-primary shadow-lg shadow-portfolioTheme-primary/50'
                    : 'w-3 h-3 bg-gray-600 hover:bg-portfolioTheme-primary/60 hover:scale-125'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
                role="tab"
                aria-selected={index === currentIndex}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="h-1 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-portfolioTheme-primary via-portfolioTheme-accent to-portfolioTheme-primary transition-all duration-500 ease-linear shadow-lg shadow-portfolioTheme-primary/30"
                style={{
                  width: `${((currentIndex + 1) / testimonials.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;