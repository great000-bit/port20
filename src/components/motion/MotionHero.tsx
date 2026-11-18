import { ArrowRight, ArrowLeft } from "lucide-react";

export default function MotionHero() {
  return (
    <>
      <style>{`
        .mo-hero {
          background: var(--bg);
          position: relative;
          overflow: hidden;
          padding: 140px clamp(20px,5vw,64px) 80px;
        }
        .mo-hero-glow {
          position: absolute; top: 8%; right: -6%;
          width: 40vw; height: 60vh;
          background: radial-gradient(ellipse, var(--accent-soft) 0%, transparent 65%);
          pointer-events: none;
        }
        .mo-hero-wrap {
          max-width: 1180px; margin: 0 auto;
          display: grid; grid-template-columns: 1.1fr 0.9fr;
          gap: 56px; align-items: center;
          position: relative; z-index: 1;
        }
        .mo-hero-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 10px 14px; margin-bottom: 28px; }
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
        .mo-hero-title {
          font-family: Geist, Arial, sans-serif;
          font-weight: 400; font-size: clamp(34px, 4.1vw, 56px);
          letter-spacing: -1.5px; line-height: 1.1;
          color: var(--fg); margin: 0 0 22px 0;
        }
        .mo-hero-title strong { font-weight: 700; }
        .mo-hero-title-line { display: block; }
        .mo-hero-sub {
          font-family: Arial, sans-serif; font-size: 17px;
          color: var(--fg-muted); line-height: 1.7;
          max-width: 46ch; margin: 0 0 34px 0;
        }
        .mo-hero-actions { display: flex; flex-wrap: wrap; gap: 12px; }
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
        .mo-hero-img-wrap {
          position: relative; border-radius: 50%; overflow: hidden;
          aspect-ratio: 1 / 1; border: 1px solid var(--border);
        }
        .mo-hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
        @media (max-width: 860px) {
          .mo-hero-wrap { grid-template-columns: 1fr; gap: 36px; }
          .mo-hero-img-wrap { max-width: 380px; margin: 0 auto; }
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
            <h1 className="mo-hero-title">
              <span className="mo-hero-title-line">Hey, I'm Great.</span>
              <span className="mo-hero-title-line">I cut and animate <strong>video that keeps people watching.</strong></span>
            </h1>
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
          <div className="mo-hero-img-wrap" data-aos="fade-up" data-aos-delay="120">
            <img
              className="mo-hero-img"
              src="/great-emman-wori-2026.webp"
              alt="Great Emman-Wori, Video Editor &amp; Motion Designer"
              width={600}
              height={600}
              loading="eager"
            />
          </div>
        </div>
      </section>
    </>
  );
}
