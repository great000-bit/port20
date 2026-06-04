import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

/* Lightweight star field — pauses when off-screen */
const Stars = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf: number;
    type S = { x: number; y: number; r: number; o: number; s: number };
    let stars: S[] = [];
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    const init = () => {
      stars = Array.from({ length: 80 }, () => ({
        x: Math.random() * c.width, y: Math.random() * c.height,
        r: Math.random() * 1.0 + 0.2, o: Math.random() * 0.35 + 0.08,
        s: Math.random() * 0.15 + 0.03,
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (const s of stars) {
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.o})`; ctx.fill();
        s.y -= s.s; if (s.y < -2) { s.y = c.height + 2; s.x = Math.random() * c.width; }
      }
      raf = requestAnimationFrame(draw);
    };
    const ro = new ResizeObserver(() => { resize(); init(); });
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { raf = requestAnimationFrame(draw); }
      else { cancelAnimationFrame(raf); }
    }, { threshold: 0 });
    ro.observe(c); obs.observe(c); resize(); init(); draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); obs.disconnect(); };
  }, []);
  return (
    <canvas ref={ref} aria-hidden="true" style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      pointerEvents: "none", opacity: 0.5,
    }} />
  );
};

export default function Hero() {
  return (
    <>
      <style>{`
        .hero-section {
          min-height: calc(100vh - 90px);
          padding: 120px 0 90px;
          background: #000;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .hero-container {
          width: min(calc(100% - 48px), 1280px);
          margin-inline: auto;
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(340px, 0.85fr);
          align-items: center;
          gap: clamp(48px, 7vw, 96px);
        }
        .hero-content {
          max-width: 820px;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 16px;
          font-weight: 400;
          color: #20e070;
          margin-bottom: 28px;
          background: transparent;
          border: none;
          padding: 0;
          letter-spacing: 0;
        }
        .hero-badge-dot {
          width: 9px; height: 9px;
          border-radius: 50%;
          background: #20e070;
          flex-shrink: 0;
        }
        .hero-title {
          font-family: Geist, Arial, sans-serif;
          font-size: clamp(54px, 5.1vw, 76px);
          line-height: 1.05;
          font-weight: 400;
          letter-spacing: -0.055em;
          color: #fff;
          max-width: 820px;
          text-wrap: balance;
          margin: 0 0 24px 0;
          white-space: normal;
        }
        .hero-title strong {
          font-weight: 700;
        }
        .hero-subtitle {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 18px;
          line-height: 1.65;
          color: rgba(255,255,255,0.68);
          max-width: 660px;
          margin: 0;
        }
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 34px;
          flex-wrap: wrap;
        }
        .hero-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          height: 52px; padding: 0 24px; border-radius: 10px;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 15px; font-weight: 600;
          background: #6f0414; color: #fff;
          border: 1px solid #6f0414;
          text-decoration: none; cursor: pointer;
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .hero-btn-primary:hover {
          background: transparent; color: #6f0414;
        }
        .hero-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          height: 52px; padding: 0 24px; border-radius: 10px;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 15px; font-weight: 600;
          background: transparent; color: #fff;
          border: 1px solid rgba(255,255,255,0.22);
          text-decoration: none; cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .hero-btn-secondary:hover {
          border-color: #6f0414; color: #6f0414;
        }
        .hero-image-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hero-image-ring {
          width: clamp(320px, 27vw, 420px);
          height: clamp(320px, 27vw, 420px);
          border-radius: 999px;
          overflow: hidden;
          border: 2px solid rgba(111,4,20,0.50);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.05);
          flex-shrink: 0;
          animation: heroImgFade 0.7s ease both 0.25s;
        }
        .hero-image-ring img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          display: block;
          animation: none !important;
          transform: none !important;
        }
        .hero-text-anim {
          animation: heroTextUp 0.6s ease both;
        }
        @keyframes heroImgFade {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes heroTextUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-image-ring, .hero-text-anim {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 56px;
          }
          .hero-content { max-width: 760px; }
          .hero-title {
            font-size: clamp(46px, 7vw, 64px);
            max-width: 760px;
          }
          .hero-image-ring {
            width: min(70vw, 360px);
            height: min(70vw, 360px);
          }
          .hero-image-wrap { order: -1; }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .hero-section {
            min-height: auto;
            padding: 110px 0 70px;
          }
          .hero-container {
            width: min(calc(100% - 32px), 1280px);
            grid-template-columns: 1fr;
            gap: 42px;
          }
          .hero-title {
            font-size: clamp(38px, 11vw, 48px);
            line-height: 1.08;
            letter-spacing: -0.04em;
            max-width: 100%;
          }
          .hero-subtitle {
            font-size: 16px;
            line-height: 1.6;
            max-width: 100%;
          }
          .hero-image-ring {
            width: min(78vw, 300px);
            height: min(78vw, 300px);
          }
          .hero-badge { font-size: 14px; }
        }
      `}</style>

      <section id="hero" className="hero-section">
        <Stars />

        {/* Subtle red glow */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "15%", right: "-2%",
          width: "38vw", height: "55vh",
          background: "radial-gradient(ellipse, rgba(111,4,20,0.12) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div className="hero-container">

          {/* ── LEFT ── */}
          <div className="hero-content hero-text-anim">

            {/* Badge — exactly like reference */}
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Available for work
            </div>

            {/* H1 — name never breaks on desktop with this column width */}
            <h1 className="hero-title">
              I'm Great Emman-Wori<br />
              I build <strong>impactful websites</strong>, apps,<br />
              and digital experiences.
            </h1>

            {/* Short subtext only */}
            <p className="hero-subtitle">
              Fullstack Website Developer and Product Designer creating accessible,
              responsive, and conversion-focused experiences for brands and businesses.
            </p>

            {/* Two buttons */}
            <div className="hero-actions">
              <a href="#portfolio" className="hero-btn-primary" aria-label="View projects by Great Emman-Wori">
                View Projects <ArrowRight size={15} />
              </a>
              <a href="#contact" className="hero-btn-secondary" aria-label="Contact Great Emman-Wori">
                Contact Me
              </a>
            </div>
          </div>

          {/* ── RIGHT — static image ── */}
          <div className="hero-image-wrap">
            <div className="hero-image-ring">
              <img
                src="/great-emman-wori-fullstack-developer.png"
                alt="Great Emman-Wori, Fullstack Website Developer and Product Designer"
                width={420} height={420}
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
