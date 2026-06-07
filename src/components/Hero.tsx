import { ArrowRight, Download } from "lucide-react";

export default function Hero() {
  return (
    <>
      <style>{`
        .hero-section {
          min-height: 100vh;
          padding-top: 220px;
          padding-bottom: 120px;
          background: #000;
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
        .hero-content {
          width: 821px;
          max-width: 821px;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 32px;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 16px;
          line-height: 24px;
          font-weight: 400;
          color: #00ff7f;
          background: transparent;
          border: none;
          padding: 0;
        }
        .hero-badge-dot {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: #00b86b;
          flex-shrink: 0;
        }
        .hero-title {
          font-family: Geist, Arial, sans-serif;
          font-size: 60px;
          line-height: 60px;
          font-weight: 400;
          letter-spacing: -1.5px;
          color: #ffffff;
          max-width: 821px;
          margin: 0;
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
          font-size: 16px;
          line-height: 26px;
          font-weight: 400;
          color: #D0D5DB;
          max-width: 672px;
          margin-top: 32px;
          margin-bottom: 0;
        }
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 48px;
          flex-wrap: wrap;
        }
        .hero-button {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          height: 48px;
          padding: 0 24px;
          border-radius: 8px;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 16px;
          line-height: 24px;
          font-weight: 400;
          text-decoration: none;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .hero-button-primary {
          background: #6f0414;
          color: #ffffff;
          border: 1px solid #6f0414;
        }
        .hero-button-primary:hover {
          background: #8a0519;
          border-color: #8a0519;
        }
        .hero-button-secondary {
          background: rgba(255,255,255,0.03);
          color: #EDEDED;
          border: 1px solid rgba(255,255,255,0.14);
        }
        .hero-button-secondary:hover {
          border-color: rgba(255,255,255,0.28);
        }
        .hero-image-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-image {
          width: 441px;
          height: 441px;
          border-radius: 999px;
          object-fit: cover;
          object-position: center top;
          display: block;
          border: 2px solid rgba(111,4,20,0.45);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.04);
          flex-shrink: 0;
          animation: heroImgIn 0.5s ease both 0.2s;
        }
        .hero-text-in { animation: heroTextIn 0.55s ease both; }

        @keyframes heroImgIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes heroTextIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-image, .hero-text-in {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }

        /* Laptop */
        @media (max-width: 1200px) {
          .hero-container {
            grid-template-columns: minmax(0, 1fr) 360px;
            gap: 40px;
          }
          .hero-content { width: 100%; max-width: 760px; }
          .hero-title   { font-size: 56px; line-height: 58px; max-width: 760px; }
          .hero-subtitle { max-width: 640px; }
          .hero-image   { width: 360px; height: 360px; }
        }

        /* Tablet */
        @media (max-width: 980px) {
          .hero-section { padding-top: 150px; padding-bottom: 90px; }
          .hero-container { grid-template-columns: 1fr; gap: 56px; }
          .hero-content { width: 100%; max-width: 760px; }
          .hero-title   { font-size: 48px; line-height: 52px; letter-spacing: -1.2px; max-width: 760px; }
          .hero-image   { width: min(70vw, 340px); height: min(70vw, 340px); }
          .hero-image-wrap { order: -1; }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .hero-section   { min-height: auto; padding-top: 120px; padding-bottom: 70px; }
          .hero-container { width: min(calc(100% - 32px), 1280px); grid-template-columns: 1fr; gap: 42px; }
          .hero-title     { font-size: 40px; line-height: 44px; letter-spacing: -1px; max-width: 100%; }
          .hero-subtitle  { font-size: 16px; line-height: 26px; max-width: 100%; margin-top: 24px; }
          .hero-actions   { gap: 10px; margin-top: 34px; }
          .hero-button    { height: 46px; padding: 0 18px; font-size: 15px; }
          .hero-image     { width: min(76vw, 300px); height: min(76vw, 300px); }
        }
      `}</style>

      <section id="hero" className="hero-section">
        {/* Static red glow — no JS, no animation */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "10%", right: "-4%",
          width: "45vw", height: "65vh",
          background: "radial-gradient(ellipse, rgba(111,4,20,0.10) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div className="hero-container">

          {/* LEFT */}
          <div className="hero-content hero-text-in">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Available for work
            </div>

            <h1 className="hero-title">
              I'm Great Emman-Wori<br />
              I build <strong>impactful websites</strong>,<br />
              and digital experiences.
            </h1>

            <p className="hero-subtitle">
              Fullstack Website Developer and Product Designer creating accessible,
              responsive, and conversion-focused experiences for brands and businesses.
            </p>

            <div className="hero-actions">
              <a href="#portfolio" className="hero-button hero-button-primary" aria-label="View projects by Great Emman-Wori">
                View Projects <ArrowRight size={15} />
              </a>
              <a href="#contact" className="hero-button hero-button-secondary" aria-label="Contact Great Emman-Wori">
                Contact Me
              </a>
              <a
                href="/Great-Emman-Wori-CV.pdf"
                download
                className="hero-button hero-button-secondary"
                aria-label="Download Great Emman-Wori CV"
              >
                <Download size={14} /> Download CV
              </a>
            </div>
          </div>

          {/* RIGHT — static image, one entrance animation only */}
          <div className="hero-image-wrap">
            <img
              className="hero-image"
              src="/great-emman-wori-fullstack-developer.png"
              alt="Great Emman-Wori, Fullstack Website Developer and Product Designer"
              width={441}
              height={441}
              loading="eager"
              fetchPriority="high"
            />
          </div>

        </div>
      </section>
    </>
  );
}
