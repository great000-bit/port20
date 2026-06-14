import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download } from "lucide-react";

/* Character-by-character stagger reveal — Omijeh style */
function TextReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setVisible(true); return; }
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: "inline-block",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: visible
              ? `opacity 0.4s ease ${i * 28}ms, transform 0.4s ease ${i * 28}ms`
              : "none",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <>
      <style>{`
        .hero-section {
          min-height: 100vh;
          padding-top: 220px;
          padding-bottom: 120px;
          background:"var(--bg)";
          position: relative;
          overflow: hidden;
        }
        .hero-container {
          width: min(calc(100% - 48px), 1280px);
          margin-inline: auto;
          display: grid;
          grid-template-columns: 821px 1fr;
          align-items: center;
          gap: 48px;
        }
        .hero-content { width: 821px; max-width: 821px; }

        /* Section number label — Omijeh style */
        .hero-section-num {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color:"var(--fg-faint)";
          margin-bottom: 28px;
          display: block;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 32px;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 16px;
          font-weight: 400;
          color:"var(--badge-text)";
          background: transparent;
          border: none;
          padding: 0;
        }
        .hero-badge-dot {
          width: 9px; height: 9px;
          border-radius: 50%;
          background:"var(--badge-dot)";
          flex-shrink: 0;
          animation: badgePulse 2.5s ease-in-out infinite;
        }
        @keyframes badgePulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.45; }
        }
        .hero-title {
          font-family: Geist, Arial, sans-serif;
          font-size: 60px;
          line-height: 1.06;
          font-weight: 400;
          letter-spacing: -1.5px;
          color:"var(--fg)";
          max-width: 821px;
          margin: 0 0 32px 0;
          overflow-wrap: normal;
          word-break: normal;
          hyphens: none;
          display: block;
        }
        .hero-title strong { font-weight: 700; }
        .hero-subtitle {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 16px;
          line-height: 26px;
          font-weight: 400;
          color: #D0D5DB;
          max-width: 600px;
          margin: 0;
          opacity: 0;
          animation: subtitleIn 0.6s ease both 1.2s;
        }
        @keyframes subtitleIn {
          from { opacity:0; transform: translateY(10px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 48px;
          flex-wrap: wrap;
          opacity: 0;
          animation: subtitleIn 0.5s ease both 1.5s;
        }
        .hero-button {
          display: inline-flex; align-items: center; gap: 7px;
          height: 48px; padding: 0 24px; border-radius: 8px;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 15px; font-weight: 400;
          text-decoration: none; cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .hero-button-primary {
          background: #6f0414; color:"var(--fg)"; border: 1px solid #6f0414;
        }
        .hero-button-primary:hover { background: #8a0519; border-color: #8a0519; }
        .hero-button-secondary {
          background:"var(--card-bg)"; color: #EDEDED;
          border: 1px solid var(--border-strong);
        }
        .hero-button-secondary:hover { border-color:"var(--fg-faint)"; }
        .hero-image-wrap {
          display: flex; align-items: center; justify-content: center;
        }
        .hero-image {
          width: 441px; height: 441px;
          border-radius: 999px;
          object-fit: cover; object-position: center top;
          display: block;
          border: 2px solid rgba(111,4,20,0.45);
          flex-shrink: 0;
          opacity: 0;
          animation: heroImgIn 0.7s ease both 0.3s;
        }
        @keyframes heroImgIn {
          from { opacity:0; transform: scale(0.96); }
          to   { opacity:1; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-image, .hero-subtitle, .hero-actions, .hero-badge-dot {
            animation: none !important; opacity: 1 !important; transform: none !important;
          }
        }
        /* Laptop */
        @media (max-width: 1200px) {
          .hero-container { grid-template-columns: minmax(0,1fr) 360px; gap: 40px; }
          .hero-content   { width: 100%; max-width: 760px; }
          .hero-title     { font-size: 52px; max-width: 760px; }
          .hero-image     { width: 360px; height: 360px; }
        }
        /* Tablet */
        @media (max-width: 980px) {
          .hero-section   { padding-top: 150px; padding-bottom: 90px; }
          .hero-container { grid-template-columns: 1fr; gap: 48px; }
          .hero-content   { width: 100%; max-width: 760px; }
          .hero-title     { font-size: 44px; letter-spacing: -1.2px; max-width: 760px; }
          .hero-image     { width: min(68vw, 340px); height: min(68vw, 340px); }
          .hero-image-wrap { order: -1; }
        }
        /* Mobile */
        @media (max-width: 640px) {
          .hero-section   { min-height: auto; padding-top: 120px; padding-bottom: 70px; }
          .hero-container { width: min(calc(100% - 32px),1280px); grid-template-columns: 1fr; gap: 40px; }
          .hero-title     { font-size: 38px; line-height: 1.08; letter-spacing: -1px; margin-bottom: 20px; }
          .hero-subtitle  { font-size: 15px; line-height: 25px; max-width: 100%; }
          .hero-actions   { gap: 10px; margin-top: 32px; }
          .hero-button    { height: 44px; padding: 0 18px; font-size: 14px; }
          .hero-image     { width: min(74vw, 280px); height: min(74vw, 280px); }
        }
      `}</style>

      <section id="hero" className="hero-section">
        <div aria-hidden="true" style={{
          position:"absolute", top:"10%", right:"-4%",
          width:"42vw", height:"60vh",
          background:"radial-gradient(ellipse, rgba(111,4,20,0.09) 0%, transparent 65%)",
          pointerEvents:"none",
        }}/>

        <div className="hero-container">
          {/* LEFT */}
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot"/>
              Available for work
            </div>

            {/* Character stagger reveal — Omijeh style */}
            <h1 className="hero-title">
              <TextReveal text="I'm Great Emman-Wori" delay={100}/>
              <br/>
              <TextReveal text="I build " delay={700}/>
              <strong><TextReveal text="impactful websites," delay={900}/></strong>
              <br/>
              <TextReveal text="and digital experiences." delay={1100}/>
            </h1>

            <p className="hero-subtitle">
              Fullstack Website Developer and Product Designer creating accessible,
              responsive, and conversion-focused experiences for brands and businesses.
            </p>

            <div className="hero-actions">
              <a href="#portfolio" className="hero-button hero-button-primary">
                View Projects <ArrowRight size={14}/>
              </a>
              <a href="#contact" className="hero-button hero-button-secondary">
                Contact Me
              </a>
              <a href="/Great-Emman-Wori-CV.pdf" download className="hero-button hero-button-secondary">
                <Download size={13}/> Download CV
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-image-wrap">
            <img
              ref={imgRef}
              className="hero-image"
              src="/great-emman-wori-fullstack-developer.png"
              alt="Great Emman-Wori, Fullstack Website Developer and Product Designer"
              width={441} height={441}
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>
    </>
  );
}
