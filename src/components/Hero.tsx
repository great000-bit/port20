import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download } from "lucide-react";

/* Character-by-character stagger reveal */
function TextReveal({ text, className, delay = 0, tag = "span" }: {
  text: string; className?: string; delay?: number; tag?: "span" | "strong"
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setVisible(true); return; }
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const Tag = tag as keyof JSX.IntrinsicElements;
  return (
    <Tag className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span key={i} aria-hidden="true" style={{
          display: "inline-block",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(10px)",
          transition: visible ? `opacity 0.35s ease ${i * 25 + delay}ms, transform 0.35s ease ${i * 25 + delay}ms` : "none",
          whiteSpace: char === " " ? "pre" : "normal",
        }}>{char}</span>
      ))}
    </Tag>
  );
}

export default function Hero() {
  return (
    <>
      <style>{`
        /* ══ DESKTOP hero ══ */
        .hero-section {
          min-height: 100vh;
          padding-top: 220px;
          padding-bottom: 120px;
          background: var(--bg);
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

        /* Badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 32px;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: var(--fg-muted);
          background: transparent;
          border: none;
          padding: 0;
          letter-spacing: 0.01em;
        }
        .hero-badge-dot {
          width: 9px; height: 9px;
          border-radius: 50%;
          background: var(--badge-dot);
          flex-shrink: 0;
          animation: badgePulse 2.5s ease-in-out infinite;
        }
        @keyframes badgePulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(0.85); }
        }

        /* H1 */
        .hero-title {
          font-family: Geist, Arial, sans-serif;
          font-size: 60px;
          line-height: 1.06;
          font-weight: 400;
          letter-spacing: -1.5px;
          color: var(--fg);
          max-width: 821px;
          margin: 0 0 24px 0;
          overflow-wrap: normal;
          word-break: normal;
          hyphens: none;
        }
        .hero-title strong { font-weight: 700; }

        /* Subtitle */
        .hero-subtitle {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 16px;
          line-height: 26px;
          font-weight: 400;
          color: var(--fg-muted);
          max-width: 600px;
          margin: 0;
        }

        /* Actions */
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 40px;
          flex-wrap: wrap;
        }
        .hero-button {
          display: inline-flex; align-items: center; gap: 7px;
          height: 48px; padding: 0 24px; border-radius: 8px;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 15px; font-weight: 500;
          text-decoration: none; cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
        }
        .hero-button-primary {
          background: var(--accent); color: #fff;
          border: 1px solid var(--accent);
        }
        .hero-button-primary:hover { background: var(--accent-hover); border-color: var(--accent-hover); }
        .hero-button-secondary {
          background: transparent; color: var(--fg-muted);
          border: 1px solid var(--border-strong);
        }
        .hero-button-secondary:hover { border-color: var(--accent); color: var(--accent); }

        /* Image */
        .hero-image-wrap { display: flex; align-items: center; justify-content: center; }
        .hero-image {
          width: 441px; height: 441px;
          border-radius: 999px;
          object-fit: cover; object-position: center top;
          display: block;
          border: 2px solid var(--accent-border);
          flex-shrink: 0;
          animation: heroImgIn 0.7s ease both 0.3s;
        }
        .hero-text-in { animation: heroTextIn 0.55s ease both; }

        @keyframes heroImgIn {
          from { opacity:0; transform:scale(0.96); }
          to   { opacity:1; transform:scale(1); }
        }
        @keyframes heroTextIn {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-image, .hero-text-in, .hero-badge-dot {
            animation: none !important; opacity:1 !important; transform:none !important;
          }
        }

        /* Laptop */
        @media (max-width: 1200px) {
          .hero-container { grid-template-columns: minmax(0,1fr) 360px; gap:40px; }
          .hero-content   { width:100%; max-width:760px; }
          .hero-title     { font-size:52px; max-width:760px; }
          .hero-image     { width:360px; height:360px; }
        }

        /* Tablet */
        @media (max-width: 980px) {
          .hero-section   { padding-top:150px; padding-bottom:80px; }
          .hero-container { grid-template-columns:1fr; gap:40px; }
          .hero-content   { width:100%; max-width:680px; }
          .hero-title     { font-size:44px; letter-spacing:-1.2px; max-width:680px; }
          .hero-image     { width:min(60vw,320px); height:min(60vw,320px); }
          .hero-image-wrap { order:-1; }
        }

        /* ══ MOBILE — Omijeh structure ══ */
        @media (max-width: 640px) {
          .hero-section {
            min-height: 100svh;
            padding: 0;
            display: flex;
            flex-direction: column;
            background: var(--bg);
          }

          /* Image at top — full bleed, not a circle */
          .hero-container {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 0;
          }
          .hero-image-wrap {
            order: -1;
            width: 100%;
            flex-shrink: 0;
          }
          .hero-image {
            width: 100%;
            height: 52vw;
            min-height: 200px;
            border-radius: 0;
            border: none;
            border-bottom: 1px solid var(--border-soft);
            object-position: center 18%;
            animation: none;
            opacity: 1;
            transform: none;
          }

          /* Text block */
          .hero-content {
            width: 100%;
            max-width: 100%;
            padding: 28px 20px 40px;
            order: 1;
          }

          /* Badge */
          .hero-badge {
            font-size: 13px;
            margin-bottom: 20px;
          }
          .hero-badge-dot {
            width: 8px; height: 8px;
          }

          /* Headline — no awkward breaks */
          .hero-title {
            font-size: clamp(30px, 8.5vw, 40px);
            line-height: 1.1;
            letter-spacing: -0.03em;
            max-width: 100%;
            margin-bottom: 16px;
            word-break: keep-all;
            overflow-wrap: break-word;
            hyphens: none;
          }

          /* Subtitle */
          .hero-subtitle {
            font-size: 14px;
            line-height: 1.65;
            max-width: 100%;
          }

          /* Buttons — stack primary full width, secondaries row */
          .hero-actions {
            margin-top: 24px;
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }
          .hero-button-primary {
            height: 50px;
            justify-content: center;
            font-size: 15px;
            font-weight: 600;
            border-radius: 10px;
          }
          .hero-mobile-secondary {
            display: flex;
            gap: 10px;
          }
          .hero-button-secondary {
            flex: 1;
            height: 46px;
            justify-content: center;
            font-size: 14px;
            border-radius: 10px;
          }
        }

        @media (max-width: 380px) {
          .hero-title { font-size: 28px; }
          .hero-content { padding: 22px 16px 36px; }
        }
      `}</style>

      <section id="hero" className="hero-section">
        {/* Subtle red glow — desktop only */}
        <div aria-hidden="true" style={{
          position:"absolute", top:"10%", right:"-4%",
          width:"38vw", height:"60vh",
          background:"radial-gradient(ellipse, var(--accent-soft) 0%, transparent 65%)",
          pointerEvents:"none",
        }}/>

        <div className="hero-container">
          {/* LEFT / BOTTOM — text */}
          <div className="hero-content hero-text-in">
            <div className="hero-badge">
              <span className="hero-badge-dot"/>
              Available for work
            </div>

            <h1 className="hero-title">
              <TextReveal text="I'm Great Emman-Wori" delay={80}/>
              <br/>
              <TextReveal text="I build " delay={600}/>
              <strong><TextReveal text="impactful websites," delay={780}/></strong>
              <br/>
              <TextReveal text="and digital experiences." delay={980}/>
            </h1>

            <p className="hero-subtitle">
              Fullstack Website Developer and Product Designer creating accessible,
              responsive, and conversion-focused experiences for brands and businesses.
            </p>

            {/* Desktop buttons */}
            <div className="hero-actions hero-desktop-actions">
              <a href="#portfolio" className="hero-button hero-button-primary">
                View Projects <ArrowRight size={14}/>
              </a>
              <a href="#contact" className="hero-button hero-button-secondary">Contact Me</a>
              <a href="/Great-Emman-Wori-CV.pdf" download className="hero-button hero-button-secondary">
                <Download size={13}/> Download CV
              </a>
            </div>

            {/* Mobile buttons — primary full width + secondaries in row */}
            <div className="hero-actions hero-mobile-actions">
              <a href="#portfolio" className="hero-button hero-button-primary">
                View Projects <ArrowRight size={14}/>
              </a>
              <div className="hero-mobile-secondary">
                <a href="#contact" className="hero-button hero-button-secondary">Contact Me</a>
                <a href="/Great-Emman-Wori-CV.pdf" download className="hero-button hero-button-secondary">
                  <Download size={13}/> CV
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT / TOP — image */}
          <div className="hero-image-wrap">
            <img
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

      <style>{`
        /* Hide mobile actions on desktop, desktop actions on mobile */
        .hero-mobile-actions { display: none; }
        .hero-desktop-actions { display: flex; }

        @media (max-width: 640px) {
          .hero-desktop-actions { display: none !important; }
          .hero-mobile-actions  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
