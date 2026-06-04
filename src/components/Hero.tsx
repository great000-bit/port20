import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

/* Stars — pauses when off-screen, disabled on desktop if lagging */
const Stars = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf: number;
    type S = { x: number; y: number; r: number; o: number; s: number };
    let stars: S[] = [];
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    const init   = () => { stars = Array.from({ length: 70 }, () => ({ x: Math.random() * c.width, y: Math.random() * c.height, r: Math.random() * 0.9 + 0.2, o: Math.random() * 0.3 + 0.07, s: Math.random() * 0.12 + 0.03 })); };
    const draw   = () => { ctx.clearRect(0, 0, c.width, c.height); for (const s of stars) { ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${s.o})`; ctx.fill(); s.y -= s.s; if (s.y < -2) { s.y = c.height + 2; s.x = Math.random() * c.width; } } raf = requestAnimationFrame(draw); };
    const ro  = new ResizeObserver(() => { resize(); init(); });
    const obs = new IntersectionObserver(([e]) => { e.isIntersecting ? (raf = requestAnimationFrame(draw)) : cancelAnimationFrame(raf); }, { threshold: 0 });
    ro.observe(c); obs.observe(c); resize(); init(); draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); obs.disconnect(); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="hero-stars" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.45 }} />;
};

export default function Hero() {
  return (
    <>
      <style>{`
        .hero-section {
          min-height: calc(100vh - 88px);
          padding: 120px 0 80px;
          background: #000;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .hero-container {
          width: min(calc(100% - 64px), 1320px);
          margin-inline: auto;
          display: grid;
          grid-template-columns: 720px 1fr;
          align-items: center;
          gap: 80px;
        }
        .hero-content {
          width: 720px;
          max-width: 720px;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 16px;
          font-weight: 400;
          color: #21e37b;
          background: transparent;
          border: none;
          padding: 0;
          letter-spacing: 0;
        }
        .hero-badge-dot {
          width: 9px; height: 9px;
          border-radius: 50%;
          background: #21e37b;
          flex-shrink: 0;
        }
        .hero-title {
          font-family: Geist, Arial, sans-serif;
          font-size: 64px;
          line-height: 1.06;
          font-weight: 400;
          letter-spacing: -0.055em;
          color: #fff;
          max-width: 720px;
          margin: 0 0 24px 0;
          overflow-wrap: normal;
          word-break: normal;
          hyphens: none;
        }
        .hero-title, .hero-title * {
          overflow-wrap: normal;
          word-break: normal;
          hyphens: none;
        }
        .hero-title strong { font-weight: 700; }
        .hero-subtitle {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 18px;
          line-height: 1.65;
          font-weight: 400;
          color: rgba(255,255,255,0.68);
          max-width: 640px;
          margin: 0;
        }
        .hero-actions {
          display: flex;
          gap: 14px;
          margin-top: 34px;
          flex-wrap: wrap;
        }
        .hero-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          height: 52px; padding: 0 24px; border-radius: 10px;
          font-family: Arial, Helvetica, sans-serif; font-size: 15px; font-weight: 600;
          background: #6f0414; color: #fff; border: 1px solid #6f0414;
          text-decoration: none; cursor: pointer;
          transition: background 0.2s, color 0.2s; white-space: nowrap;
        }
        .hero-btn-primary:hover { background: transparent; color: #6f0414; }
        .hero-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          height: 52px; padding: 0 24px; border-radius: 10px;
          font-family: Arial, Helvetica, sans-serif; font-size: 15px; font-weight: 600;
          background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.22);
          text-decoration: none; cursor: pointer;
          transition: border-color 0.2s, color 0.2s; white-space: nowrap;
        }
        .hero-btn-secondary:hover { border-color: #6f0414; color: #6f0414; }
        .hero-image-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-image {
          width: 390px; height: 390px;
          border-radius: 999px;
          object-fit: cover; object-position: center top;
          display: block;
          border: 2px solid rgba(111,4,20,0.50);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.05);
          flex-shrink: 0;
          animation: heroImgFade 0.7s ease both 0.25s;
        }
        .hero-text-anim { animation: heroTextUp 0.6s ease both; }

        @keyframes heroImgFade {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes heroTextUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-image, .hero-text-anim { animation: none !important; opacity: 1 !important; transform: none !important; }
        }

        /* Laptop */
        @media (max-width: 1200px) {
          .hero-container { grid-template-columns: 640px 1fr; gap: 56px; }
          .hero-content   { width: 640px; max-width: 640px; }
          .hero-title     { font-size: 58px; max-width: 640px; }
          .hero-image     { width: 350px; height: 350px; }
        }

        /* Tablet */
        @media (max-width: 980px) {
          .hero-container { grid-template-columns: 1fr; gap: 56px; }
          .hero-content   { width: 100%; max-width: 720px; }
          .hero-title     { font-size: clamp(44px, 7vw, 58px); max-width: 720px; }
          .hero-image     { width: min(70vw, 340px); height: min(70vw, 340px); }
          .hero-image-wrap { order: -1; }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .hero-section   { min-height: auto; padding: 105px 0 70px; }
          .hero-container { width: min(calc(100% - 32px), 1320px); grid-template-columns: 1fr; gap: 40px; }
          .hero-title     { font-size: clamp(38px, 10vw, 46px); line-height: 1.08; letter-spacing: -0.04em; }
          .hero-subtitle  { font-size: 16px; line-height: 1.6; max-width: 100%; }
          .hero-image     { width: min(76vw, 300px); height: min(76vw, 300px); }
          .hero-badge     { font-size: 14px; }
        }

        /* Disable stars on desktop for perf */
        @media (min-width: 769px) {
          .hero-stars { display: none; }
        }
      `}</style>

      <section id="hero" className="hero-section">
        <Stars />

        {/* Subtle red glow blob */}
        <div aria-hidden="true" style={{ position: "absolute", top: "15%", right: "-2%", width: "38vw", height: "55vh", background: "radial-gradient(ellipse, rgba(111,4,20,0.11) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div className="hero-container">

          {/* LEFT */}
          <div className="hero-content hero-text-anim">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Available for work
            </div>

            <h1 className="hero-title">
              I'm Great Emman-Wori<br />
              I build <strong>impactful websites</strong>, apps,<br />
              and digital experiences.
            </h1>

            <p className="hero-subtitle">
              Fullstack Website Developer and Product Designer creating accessible,
              responsive, and conversion-focused experiences for brands and businesses.
            </p>

            <div className="hero-actions">
              <a href="#portfolio" className="hero-btn-primary" aria-label="View projects by Great Emman-Wori">
                View Projects <ArrowRight size={15} />
              </a>
              <a href="#contact" className="hero-btn-secondary" aria-label="Contact Great Emman-Wori">
                Contact Me
              </a>
            </div>
          </div>

          {/* RIGHT — static image */}
          <div className="hero-image-wrap">
            <img
              className="hero-image"
              src="/great-emman-wori-fullstack-developer.png"
              alt="Great Emman-Wori, Fullstack Website Developer and Product Designer"
              width={390} height={390}
              loading="eager"
              fetchPriority="high"
            />
          </div>

        </div>
      </section>
    </>
  );
}
