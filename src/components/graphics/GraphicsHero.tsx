import { ArrowRight, ArrowLeft } from "lucide-react";

export default function GraphicsHero() {
  return (
    <>
      <style>{`
        .gx-hero {
          background: var(--bg);
          position: relative;
          overflow: hidden;
          padding: 140px clamp(20px,5vw,64px) 80px;
        }
        .gx-hero-glow {
          position: absolute; top: 8%; right: -6%;
          width: 40vw; height: 60vh;
          background: radial-gradient(ellipse, var(--accent-soft) 0%, transparent 65%);
          pointer-events: none;
        }
        .gx-hero-wrap {
          max-width: 1180px; margin: 0 auto;
          display: grid; grid-template-columns: 1.1fr 0.9fr;
          gap: 56px; align-items: center;
          position: relative; z-index: 1;
        }
        .gx-hero-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 10px 14px; margin-bottom: 28px; }
        .gx-back {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: Arial, sans-serif; font-size: 13px; font-weight: 500;
          color: var(--fg-muted); text-decoration: none;
          transition: color 0.2s;
        }
        .gx-back:hover { color: var(--accent); }
        .gx-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: Arial, sans-serif; font-size: 14px; font-weight: 500;
          color: var(--fg-muted);
        }
        .gx-hero-badge-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: var(--badge-dot); flex-shrink: 0;
          animation: badgePulse 2.5s ease-in-out infinite;
        }
        .gx-hero-title {
          font-family: Geist, Arial, sans-serif;
          font-weight: 400; font-size: clamp(34px, 4.6vw, 54px);
          letter-spacing: -1.5px; line-height: 1.1;
          color: var(--fg); margin: 0 0 22px 0;
        }
        .gx-hero-title strong { font-weight: 700; }
        .gx-hero-sub {
          font-family: Arial, sans-serif; font-size: 17px;
          color: var(--fg-muted); line-height: 1.7;
          max-width: 46ch; margin: 0 0 34px 0;
        }
        .gx-hero-actions { display: flex; flex-wrap: wrap; gap: 12px; }
        .gx-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 24px; border-radius: 10px;
          font-family: Arial, sans-serif; font-size: 14px; font-weight: 600;
          text-decoration: none; transition: all 0.2s; cursor: pointer;
        }
        .gx-btn-primary { background: var(--accent); color: #fff; border: 1px solid var(--accent); }
        .gx-btn-primary:hover { background: var(--accent-hover); }
        .gx-btn-secondary { background: transparent; color: var(--fg); border: 1px solid var(--border-strong); }
        .gx-btn-secondary:hover { border-color: var(--accent); color: var(--accent); }
        .gx-hero-img-wrap {
          position: relative; border-radius: 24px; overflow: hidden;
          aspect-ratio: 1 / 1; border: 1px solid var(--border);
        }
        .gx-hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
        @media (max-width: 860px) {
          .gx-hero-wrap { grid-template-columns: 1fr; gap: 36px; }
          .gx-hero-img-wrap { max-width: 380px; margin: 0 auto; }
        }
      `}</style>

      <section id="gx-hero" className="gx-hero">
        <div className="gx-hero-glow" aria-hidden="true" />
        <div className="gx-hero-wrap">
          <div data-aos="fade-up">
            <div className="gx-hero-meta">
              <a href="/" className="gx-back"><ArrowLeft size={14} /> Back to main portfolio</a>
              <div className="gx-hero-badge">
                <span className="gx-hero-badge-dot" />
                Available for graphic design work
              </div>
            </div>
            <h1 className="gx-hero-title">
              Hey, I'm Great Emman-Wori.<br />
              I design <strong>bold, memorable visuals</strong> for brands.
            </h1>
            <p className="gx-hero-sub">
              Graphic Designer with 3+ years of experience in branding and visual
              design — crafting flyers, social content, and complete brand
              identities that get noticed and get results.
            </p>
            <div className="gx-hero-actions">
              <a href="#gx-content" className="gx-btn gx-btn-primary">View My Work <ArrowRight size={14} /></a>
              <a href="/#contact" className="gx-btn gx-btn-secondary">Get In Touch</a>
            </div>
          </div>
          <div className="gx-hero-img-wrap" data-aos="fade-up" data-aos-delay="120">
            <img
              className="gx-hero-img"
              src="/great-emman-profile.png"
              alt="Great Emman-Wori, Graphic Designer"
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
