import { ArrowRight, ArrowLeft } from "lucide-react";

export default function MotionHero() {
  return (
    <>
      <style>{`
        .mo-hero {
          background: var(--bg);
          position: relative;
          overflow: hidden;
          padding: 120px clamp(20px,5vw,64px) 0;
        }
        .mo-hero-glow {
          position: absolute; top: 8%; right: -6%;
          width: 40vw; height: 60vh;
          background: radial-gradient(ellipse, var(--accent-soft) 0%, transparent 65%);
          pointer-events: none;
        }
        .mo-hero-wrap {
          max-width: 1180px; margin: 0 auto;
          position: relative; z-index: 1;
        }
        .mo-hero-meta { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 10px 14px; margin-bottom: 8px; }
        .mo-back {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: Arial, sans-serif; font-size: 13px; font-weight: 500;
          color: var(--fg-muted); text-decoration: none;
          transition: color 0.2s;
        }
        .mo-back:hover { color: var(--accent-text); }
        .mo-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: Arial, sans-serif; font-size: 14px; font-weight: 500;
          color: var(--fg-muted);
        }
        .mo-hero-badge-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: var(--badge-dot); flex-shrink: 0;
          animation: badgePulse 2.5s ease-in-out infinite;
        }

        /* Oversized stacked wordmark with portrait overlap */
        .mo-hero-stage {
          position: relative;
          display: flex; align-items: flex-end; justify-content: center;
          min-height: clamp(320px, 46vw, 520px);
          margin: 18px 0 0;
        }
        .mo-hero-bigtext {
          font-family: Geist, Arial, sans-serif;
          font-weight: 800;
          font-size: clamp(64px, 13vw, 168px);
          line-height: 0.86;
          letter-spacing: -0.03em;
          text-align: center;
          text-transform: uppercase;
          margin: 0;
          background: linear-gradient(180deg, var(--fg) 0%, var(--fg) 48%, var(--accent-text) 82%, transparent 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          user-select: none;
          pointer-events: none;
        }
        .mo-hero-portrait {
          position: absolute; left: 50%; bottom: 0;
          transform: translateX(-50%);
          width: clamp(160px, 24vw, 300px);
          aspect-ratio: 3 / 4;
          z-index: 2;
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 12%, #000 78%, transparent 100%);
          mask-image: linear-gradient(180deg, transparent 0%, #000 12%, #000 78%, transparent 100%);
        }
        .mo-hero-portrait img {
          width: 100%; height: 100%; object-fit: cover; object-position: top center;
          display: block; filter: grayscale(1) contrast(1.08);
        }
        .mo-hero-footer {
          position: relative; z-index: 1;
          display: flex; justify-content: space-between; align-items: flex-end;
          flex-wrap: wrap; gap: 20px;
          border-top: 1px solid var(--border);
          padding: 20px 0 32px;
        }
        .mo-hero-role {
          font-family: Geist, Arial, sans-serif;
          font-weight: 700; font-size: clamp(16px, 2vw, 20px);
          letter-spacing: -0.01em; line-height: 1.25;
          color: var(--fg); margin: 0 0 8px;
          text-transform: uppercase;
        }
        .mo-hero-tagline {
          font-family: Arial, sans-serif; font-size: 13px;
          color: var(--fg-muted); margin: 0;
        }
        .mo-hero-blurb {
          font-family: Arial, sans-serif; font-size: 13px;
          color: var(--fg-muted); line-height: 1.6;
          max-width: 30ch; text-align: right; margin: 0;
        }
        .mo-hero-sub {
          font-family: Arial, sans-serif; font-size: 17px;
          color: var(--fg-muted); line-height: 1.7;
          max-width: 52ch; margin: 0 auto 30px; text-align: center;
        }
        .mo-hero-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; padding-bottom: 56px; }
        .mo-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 24px; border-radius: 10px;
          font-family: Arial, sans-serif; font-size: 14px; font-weight: 600;
          text-decoration: none; transition: all 0.2s; cursor: pointer;
        }
        .mo-btn-primary { background: var(--accent); color: #fff; border: 1px solid var(--accent); }
        .mo-btn-primary:hover { background: var(--accent-hover); }
        .mo-btn-secondary { background: transparent; color: var(--fg); border: 1px solid var(--border-strong); }
        .mo-btn-secondary:hover { border-color: var(--accent); color: var(--accent-text); }
        @media (max-width: 640px) {
          .mo-hero-footer { flex-direction: column; align-items: flex-start; }
          .mo-hero-blurb { text-align: left; }
        }
      `}</style>

      <section id="mo-hero" className="mo-hero">
        <div className="mo-hero-glow" aria-hidden="true" />
        <div className="mo-hero-wrap">
          <div data-aos="fade-up">
            <div className="mo-hero-meta">
              <a href="/" className="mo-back"><ArrowLeft size={14} /> Back to main portfolio</a>
              <div className="mo-hero-badge">
                <span className="mo-hero-badge-dot" />
                Available for video editing &amp; motion work
              </div>
            </div>

            <div className="mo-hero-stage" aria-hidden="false">
              <h1 className="mo-hero-bigtext">
                Edit<br />Animate
              </h1>
              <div className="mo-hero-portrait">
                <img
                  src="/great-emman-wori-2026.webp"
                  alt="Great Emman-Wori, Video Editor &amp; Motion Designer"
                  width={300}
                  height={400}
                  loading="eager"
                />
              </div>
            </div>

            <div className="mo-hero-footer">
              <div>
                <p className="mo-hero-role">Video Editor<br />Motion Designer</p>
                <p className="mo-hero-tagline">Cut. Animate. Captivate.</p>
              </div>
              <p className="mo-hero-blurb">Bringing ideas to life through edits &amp; motion.</p>
            </div>

            <p className="mo-hero-sub">
              Short-form edits, kinetic typography and motion graphics for
              podcasts, brands and creators — built to hook attention in the
              first second and hold it.
            </p>
            <div className="mo-hero-actions">
              <a href="#mo-content" className="mo-btn mo-btn-primary">View My Work <ArrowRight size={14} /></a>
              <a href="#contact" className="mo-btn mo-btn-secondary">Get In Touch</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
