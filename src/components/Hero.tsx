import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download } from "lucide-react";

function TextReveal({ text, delay = 0, bold = false }: {
  text: string; delay?: number; bold?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setVisible(true); return; }
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const Tag = bold ? "strong" : "span";
  return (
    <Tag aria-label={text}>
      {text.split("").map((char, i) => (
        <span key={i} aria-hidden="true" style={{
          display: "inline-block",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(10px)",
          transition: visible
            ? `opacity 0.35s ease ${i * 25 + delay}ms, transform 0.35s ease ${i * 25 + delay}ms`
            : "none",
          whiteSpace: char === " " ? "pre" : "normal",
        }}>{char}</span>
      ))}
    </Tag>
  );
}

export default function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <>
      <style>{`
        /* ══ SHARED ══ */
        .hero-section {
          background: var(--bg);
          position: relative;
          overflow: hidden;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 14px; font-weight: 500;
          color: var(--fg-muted);
          padding: 0; border: none; background: transparent;
          letter-spacing: 0.01em;
          margin-bottom: 32px;
        }
        .hero-badge-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: var(--badge-dot);
          flex-shrink: 0;
          animation: badgePulse 2.5s ease-in-out infinite;
        }
        @keyframes badgePulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.45; transform:scale(0.8); }
        }
        .hero-title {
          font-family: Geist, Arial, sans-serif;
          font-weight: 400;
          letter-spacing: -1.5px;
          color: var(--fg);
          margin: 0 0 24px 0;
          overflow-wrap: normal;
          word-break: keep-all;
          hyphens: none;
        }
        .hero-title strong { font-weight: 700; }
        .hero-subtitle {
          font-family: Arial, Helvetica, sans-serif;
          font-weight: 400;
          color: var(--fg-muted);
          margin: 0;
          line-height: 1.65;
        }
        .hero-btn {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: Arial, Helvetica, sans-serif;
          font-weight: 500; text-decoration: none; cursor: pointer;
          transition: all 0.2s; white-space: nowrap;
          border-radius: 10px;
        }
        .hero-btn-primary {
          background: var(--accent); color: #fff;
          border: 1px solid var(--accent);
        }
        .hero-btn-primary:hover { background: var(--accent-hover); }
        .hero-btn-secondary {
          background: transparent; color: var(--fg-muted);
          border: 1px solid var(--border-strong);
        }
        .hero-btn-secondary:hover { border-color: var(--accent); color: var(--accent); }
        .hero-image {
          object-fit: cover; object-position: center 18%;
          display: block;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-badge-dot { animation: none !important; }
        }

        /* ══ DESKTOP / TABLET ≥ 641px ══ */
        @media (min-width: 641px) {
          .hero-section {
            min-height: 100vh;
            padding-top: 220px;
            padding-bottom: 120px;
            display: block;
          }
          .hero-desktop-wrap {
            width: min(calc(100% - 48px), 1280px);
            margin-inline: auto;
            display: grid;
            grid-template-columns: 821px 1fr;
            align-items: center;
            gap: 48px;
          }
          .hero-desktop-content { width: 821px; max-width: 821px; }
          .hero-title { font-size: 60px; line-height: 1.06; max-width: 821px; }
          .hero-subtitle { font-size: 16px; line-height: 26px; max-width: 600px; }
          .hero-badge { margin-bottom: 32px; }
          .hero-desktop-actions {
            display: flex; align-items: center;
            gap: 12px; margin-top: 40px; flex-wrap: wrap;
          }
          .hero-btn { height: 48px; padding: 0 24px; font-size: 15px; }
          .hero-desktop-img-wrap { display: flex; align-items: center; justify-content: center; }
          .hero-desktop-img {
            width: 441px; height: 441px;
            border-radius: 999px;
            border: 2px solid var(--accent-border);
            animation: heroImgIn 0.7s ease both 0.3s;
          }
          .hero-mobile-layout { display: none; }
          @keyframes heroImgIn {
            from { opacity:0; transform:scale(0.96); }
            to   { opacity:1; transform:scale(1); }
          }
        }
        @media (min-width: 641px) and (max-width: 1200px) {
          .hero-desktop-wrap { grid-template-columns: minmax(0,1fr) 360px; gap:40px; }
          .hero-desktop-content { width:100%; max-width:680px; }
          .hero-title { font-size:46px; }
          .hero-desktop-img { width:340px; height:340px; }
        }
        @media (min-width: 641px) and (max-width: 980px) {
          .hero-section { padding-top:140px; padding-bottom:80px; }
          .hero-desktop-wrap { grid-template-columns:1fr; gap:40px; }
          .hero-desktop-content { width:100%; max-width:100%; }
          .hero-title { font-size:40px; }
          .hero-desktop-img { width:min(55vw,300px); height:min(55vw,300px); }
          .hero-desktop-img-wrap { order:-1; }
        }

        /* ══ MOBILE ≤ 640px — Omijeh structure ══ */
        @media (max-width: 640px) {
          .hero-section {
            min-height: 100svh;
            display: flex;
            flex-direction: column;
            padding: 0;
            overflow-y: auto;
          }
          .hero-desktop-wrap { display: none !important; }
          .hero-mobile-layout {
            display: flex !important;
            flex-direction: column;
            width: 100%;
            padding: 80px 24px 40px;
            gap: 0;
          }
          /* Badge — pill like reference */
          .hero-badge {
            display: inline-flex !important;
            align-items: center;
            gap: 8px;
            padding: 6px 14px !important;
            border-radius: 999px !important;
            background: rgba(255,255,255,0.06) !important;
            border: 1px solid rgba(255,255,255,0.14) !important;
            font-size: 11px !important;
            font-weight: 700 !important;
            letter-spacing: 0.12em !important;
            text-transform: uppercase !important;
            color: rgba(255,255,255,0.65) !important;
            margin-bottom: 28px !important;
            width: fit-content;
          }
          [data-theme="light"] .hero-badge {
            background: rgba(0,0,0,0.06) !important;
            border-color: rgba(0,0,0,0.14) !important;
            color: rgba(0,0,0,0.55) !important;
          }
          .hero-badge-dot {
            width: 7px !important; height: 7px !important;
          }
          /* H1 — dominant name line, Omijeh scale */
          .hero-mobile-name {
            font-family: Geist, Arial, sans-serif;
            font-size: clamp(42px, 12vw, 58px);
            line-height: 1.01;
            font-weight: 400;
            letter-spacing: -0.04em;
            color: var(--fg);
            margin: 0 0 16px 0;
            word-break: keep-all;
            hyphens: none;
          }
          /* Supporting tagline — smaller, below name */
          .hero-mobile-tagline {
            font-family: Geist, Arial, sans-serif;
            font-size: clamp(19px, 5.5vw, 27px);
            line-height: 1.18;
            font-weight: 400;
            letter-spacing: -0.025em;
            color: var(--fg-muted);
            margin: 0 0 20px 0;
            word-break: keep-all;
            hyphens: none;
          }
          .hero-mobile-tagline strong {
            font-weight: 700;
            color: var(--fg);
          }
          /* Subtitle */
          .hero-subtitle {
            font-size: 15px !important;
            line-height: 1.65 !important;
            color: var(--fg-muted) !important;
            max-width: 100% !important;
            margin-bottom: 0 !important;
          }
          /* Buttons */
          .hero-mobile-actions {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 32px;
            margin-bottom: 32px;
          }
          .hero-btn-primary {
            height: 54px !important;
            width: 100% !important;
            justify-content: center !important;
            font-size: 16px !important;
            font-weight: 600 !important;
            border-radius: 12px !important;
          }
          .hero-mobile-row {
            display: flex;
            gap: 10px;
          }
          .hero-btn-secondary {
            flex: 1 !important;
            height: 48px !important;
            justify-content: center !important;
            font-size: 14px !important;
            border-radius: 12px !important;
          }
          /* Image — full rounded square card below buttons */
          .hero-mobile-img-wrap {
            width: 100%;
            border-radius: 20px;
            overflow: hidden;
            position: relative;
            flex-shrink: 0;
            aspect-ratio: 1 / 1;
            max-height: 360px;
          }
          .hero-mobile-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center 10%;
            display: block;
          }
        }
        @media (max-width: 390px) {
          .hero-mobile-layout { padding: 72px 18px 32px; }
          .hero-title { font-size: 36px !important; }
        }
          .hero-title { font-size: 36px !important; }
        }

      `}</style>

      <section id="hero" className="hero-section">
        {/* Subtle glow — desktop */}
        <div aria-hidden="true" style={{
          position:"absolute", top:"10%", right:"-4%",
          width:"38vw", height:"60vh",
          background:"radial-gradient(ellipse, var(--accent-soft) 0%, transparent 65%)",
          pointerEvents:"none",
        }}/>

        {/* ══ DESKTOP layout ══ */}
        <div className="hero-desktop-wrap">
          <div className="hero-desktop-content hero-text-in" style={{animation:"heroTextIn 0.55s ease both"}}>
            <div className="hero-badge">
              <span className="hero-badge-dot"/>
              Available for work
            </div>
            <h1 className="hero-title">
              <TextReveal text="I'm Great Emman-Wori" delay={80}/>
              <br/>
              <TextReveal text="I build " delay={600}/>
              <TextReveal text="impactful websites," delay={780} bold/>
              <br/>
              <TextReveal text="and digital experiences." delay={980}/>
            </h1>
            <p className="hero-subtitle">
              Fullstack Website Developer and Product Designer creating accessible,
              responsive, and conversion-focused experiences for brands and businesses.
            </p>
            <div className="hero-desktop-actions">
              <a href="#portfolio" className="hero-btn hero-btn-primary">View Projects <ArrowRight size={14}/></a>
              <a href="#contact"   className="hero-btn hero-btn-secondary">Contact Me</a>
              <a href="/Great-Emman-Wori-CV.pdf" download className="hero-btn hero-btn-secondary">
                <Download size={13}/> Download CV
              </a>
            </div>
          </div>
          <div className="hero-desktop-img-wrap">
            <img ref={imgRef} className="hero-image hero-desktop-img"
              src="/great-emman-wori-fullstack-developer.png"
              alt="Great Emman-Wori, Fullstack Website Developer and Product Designer"
              width={441} height={441} loading="eager"/>
          </div>
        </div>

        {/* ══ MOBILE layout — Omijeh structure ══ */}
        <div className="hero-mobile-layout">
          {/* Text first */}
          <div className="hero-mobile-text">
            <div className="hero-badge">
              <span className="hero-badge-dot"/>
              Available for work
            </div>
            <h1 className="hero-mobile-name">
              Hey, I'm Great Emman-Wori.
            </h1>
            <p className="hero-mobile-tagline">
              I build <strong>impactful websites,</strong><br/>
              and digital experiences.
            </p>
            <p className="hero-subtitle">
              Fullstack Website Developer and Product Designer creating accessible,
              responsive, and conversion-focused experiences for brands and businesses.
            </p>
            <div className="hero-mobile-actions">
              <a href="#portfolio" className="hero-btn hero-btn-primary">
                View Projects <ArrowRight size={14}/>
              </a>
              <div className="hero-mobile-row">
                <a href="#contact" className="hero-btn hero-btn-secondary">Contact Me</a>
                <a href="/Great-Emman-Wori-CV.pdf" download className="hero-btn hero-btn-secondary">
                  <Download size={13}/> CV
                </a>
              </div>
            </div>
          </div>

          {/* Image card — full, rounded, below buttons like Omijeh */}
          <div className="hero-mobile-img-wrap">
            <img
              className="hero-mobile-img"
              src="/great-emman-wori-fullstack-developer.png"
              alt="Great Emman-Wori, Fullstack Website Developer"
              width={600} height={600}
              loading="eager"
            />
          </div>
        </div>
      </section>

      <style>{`
        @keyframes heroTextIn {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </>
  );
}
