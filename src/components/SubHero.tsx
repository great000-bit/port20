import { useEffect, useState } from "react";
import { ArrowRight, Download } from "lucide-react";

/* Letter-by-letter reveal, same as the main development hero. */
function TextReveal({ text, delay = 0, bold = false }: { text: string; delay?: number; bold?: boolean }) {
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

interface SubHeroProps {
  id: string;
  badge: string;
  lineOne: string;
  lineTwoPre: string;
  lineTwoBold: string;
  lineThree: string;
  subtitle: string;
  workHref: string;
  workLabel: string;
  imgAlt: string;
}

/* Hero for the Graphics / Motion pages — mirrors the main development hero. */
export default function SubHero(p: SubHeroProps) {
  return (
    <>
      <style>{`
        .sh-section { background: var(--bg); position: relative; overflow: hidden; padding: 170px 0 110px; }
        .sh-glow {
          position: absolute; top: 10%; right: -4%; width: 38vw; height: 60vh;
          background: radial-gradient(ellipse, var(--accent-soft) 0%, transparent 65%);
          pointer-events: none;
        }
        .sh-wrap {
          width: min(calc(100% - 48px), 1280px); margin-inline: auto;
          display: grid; grid-template-columns: minmax(0, 1fr) 441px;
          align-items: center; gap: 48px; position: relative; z-index: 1;
        }
        .sh-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 500;
          color: var(--fg-muted); letter-spacing: 0.01em; margin-bottom: 32px;
        }
        .sh-badge-dot {
          width: 9px; height: 9px; border-radius: 50%; background: var(--badge-dot);
          flex-shrink: 0; animation: badgePulse 2.5s ease-in-out infinite;
        }
        .sh-title {
          font-family: Geist, Arial, sans-serif; font-weight: 400; font-size: 60px;
          line-height: 1.06; letter-spacing: -1.5px; color: var(--fg);
          margin: 0 0 24px 0; word-break: keep-all; hyphens: none;
        }
        .sh-title strong { font-weight: 700; }
        .sh-sub {
          font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 26px;
          color: var(--fg-muted); margin: 0; max-width: 600px;
        }
        .sh-actions { display: flex; align-items: center; gap: 12px; margin-top: 40px; flex-wrap: wrap; }
        .sh-btn {
          display: inline-flex; align-items: center; gap: 7px; height: 48px; padding: 0 24px;
          font-family: Arial, Helvetica, sans-serif; font-size: 15px; font-weight: 500;
          text-decoration: none; cursor: pointer; transition: all 0.2s; white-space: nowrap; border-radius: 10px;
        }
        .sh-btn-primary { background: var(--accent); color: #fff; border: 1px solid var(--accent); }
        .sh-btn-primary:hover { background: var(--accent-hover); }
        .sh-btn-secondary { background: transparent; color: var(--fg-muted); border: 1px solid var(--border-strong); }
        .sh-btn-secondary:hover { border-color: var(--accent); color: var(--accent-text); }
        .sh-img-wrap { display: flex; align-items: center; justify-content: center; }
        .sh-img {
          width: 441px; height: 441px; border-radius: 999px; object-fit: cover; object-position: center;
          display: block; border: 2px solid var(--accent-border); animation: shImgIn 0.7s ease both 0.3s;
        }
        @keyframes shImgIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        @media (max-width: 1200px) {
          .sh-wrap { grid-template-columns: minmax(0, 1fr) 360px; gap: 40px; }
          .sh-title { font-size: 46px; }
          .sh-img { width: 340px; height: 340px; }
        }
        @media (max-width: 980px) {
          .sh-section { padding: 130px 0 80px; }
          .sh-wrap { grid-template-columns: 1fr; gap: 40px; }
          .sh-title { font-size: 40px; }
          .sh-img-wrap { order: -1; }
          .sh-img { width: min(55vw, 300px); height: min(55vw, 300px); }
        }
        @media (max-width: 640px) {
          .sh-section { padding: 96px 0 56px; }
          .sh-wrap { width: calc(100% - 48px); }
          .sh-title { font-size: clamp(32px, 9vw, 40px); letter-spacing: -1px; }
          .sh-sub { font-size: 15px; line-height: 1.65; }
          .sh-actions { flex-direction: column; align-items: stretch; margin-top: 28px; }
          .sh-btn { justify-content: center; }
          .sh-btn-primary { height: 54px; font-size: 16px; font-weight: 600; }
        }
        @media (prefers-reduced-motion: reduce) { .sh-badge-dot { animation: none !important; } }
      `}</style>

      <section id={p.id} className="sh-section">
        <div className="sh-glow" aria-hidden="true" />
        <div className="sh-wrap">
          <div>
            <div className="sh-badge">
              <span className="sh-badge-dot" />
              {p.badge}
            </div>
            <h1 className="sh-title">
              <TextReveal text={p.lineOne} delay={80} />
              <br />
              <TextReveal text={p.lineTwoPre} delay={600} />
              <TextReveal text={p.lineTwoBold} delay={780} bold />
              <br />
              <TextReveal text={p.lineThree} delay={980} />
            </h1>
            <p className="sh-sub">{p.subtitle}</p>
            <div className="sh-actions">
              <a href={p.workHref} className="sh-btn sh-btn-primary">{p.workLabel} <ArrowRight size={14} /></a>
              <a href="#contact" className="sh-btn sh-btn-secondary">Contact Me</a>
              <a href="/documents/great-emman-wori-cv.pdf" download="Great-Emman-Wori-CV.pdf" className="sh-btn sh-btn-secondary">
                <Download size={13} /> Download CV
              </a>
            </div>
          </div>
          <div className="sh-img-wrap">
            <img className="sh-img" src="/great-emman-wori-2026.webp" alt={p.imgAlt} width={441} height={441} loading="eager" />
          </div>
        </div>
      </section>
    </>
  );
}
