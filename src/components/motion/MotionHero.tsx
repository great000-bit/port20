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
          position: relative; z-index: 1;
          text-align: center;
        }
        .mo-hero-meta { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 10px 14px; margin-bottom: 28px; }
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
          color: var(--fg); margin: 0 auto 22px; max-width: 18ch;
        }
        .mo-hero-title strong { font-weight: 700; }
        .mo-hero-sub {
          font-family: Arial, sans-serif; font-size: 17px;
          color: var(--fg-muted); line-height: 1.7;
          max-width: 52ch; margin: 0 auto 34px;
        }
        .mo-hero-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
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
              I cut and animate <strong>video that keeps people watching.</strong>
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
        </div>
      </section>
    </>
  );
}
