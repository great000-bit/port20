import { useEffect, useRef, useState } from "react";

function useCountUp(end: number, duration = 1200, start = false) {
  const [val, setVal] = useState(0);
  const ran = useRef(false);
  useEffect(() => {
    if (!start || ran.current) return;
    ran.current = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setVal(end); return; }
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [start, end, duration]);
  return val;
}

function CountStat({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);
  const val = useCountUp(end, 1200, go);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: 0.3 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="about-stat">
      <div className="about-stat-value">{val}{suffix}</div>
      <div className="about-stat-label">{label}</div>
    </div>
  );
}

function SpecialStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="about-stat">
      <div className="about-stat-value">{value}</div>
      <div className="about-stat-label">{label}</div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" aria-label="About Great Emman-Wori">
      <style>{`
        #about {
          padding: clamp(80px, 12vh, 140px) 0 clamp(80px, 12vh, 120px);
          background:"var(--bg)";
        }
        .about-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 64px);
        }
        .about-eyebrow {
          font-family: Arial, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color:"var(--fg-ultra)";
          display: block;
          margin-bottom: 20px;
        }
        .about-heading {
          font-family: Geist, Arial, sans-serif;
          font-size: clamp(36px, 4.5vw, 56px);
          font-weight: 400;
          letter-spacing: -0.045em;
          color:"var(--fg)";
          line-height: 1.05;
          margin: 0 0 64px 0;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: clamp(48px, 8vw, 96px);
          align-items: start;
        }
        .about-body p {
          font-family: Arial, sans-serif;
          font-size: 17px;
          line-height: 1.78;
          margin-bottom: 22px;
        }
        .about-body p:last-child { margin-bottom: 0; }
        .about-studio-line {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 36px;
          font-family: Arial, sans-serif;
          font-size: 13px;
          color:"var(--fg-faint)";
          letter-spacing: 0.02em;
          border-top: 1px solid var(--border);
          padding-top: 28px;
          width: 100%;
        }
        .about-studio-link {
          color: var(--accent);
          font-weight: 600;
          text-decoration: none;
          font-size: 13px;
          letter-spacing: 0.02em;
          transition: opacity 0.2s;
        }
        .about-studio-link:hover { opacity: 0.75; }
        .about-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 32px;
        }
        .about-tag {
          font-family: Arial, sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color:"var(--fg-muted)";
          padding: 5px 14px;
          border-radius: 999px;
          border: 1px solid var(--border-strong);
          background: transparent;
          transition: border-color 0.2s, color 0.2s;
        }
        .about-tag:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        /* Right column */
        .about-right {}
        .about-photo-wrap {
          position: relative;
          margin-bottom: 48px;
        }
        .about-photo {
          width: 100%;
          aspect-ratio: 4/4;
          object-fit: cover;
          object-position: center 15%;
          border-radius: 12px;
          display: block;
          border:"1px solid var(--border-soft)";
        }
        .about-photo-caption {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
        }
        .about-photo-name {
          font-family: Geist, Arial, sans-serif;
          font-size: 13px;
          font-weight: 500;
          color:"var(--fg-muted)";
        }
        .about-photo-handle {
          font-family: Arial, sans-serif;
          font-size: 11px;
          color:"var(--fg-ultra)";
          letter-spacing: 0.04em;
        }

        /* Stats — horizontal strip below text */
        .about-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border-soft);
          border:"1px solid var(--border-soft)";
          border-radius: 12px;
          overflow: hidden;
          margin-top: 40px;
        }
        .about-stat {
          padding: 22px 20px;
          background:"var(--bg-2)";
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .about-stat-value {
          font-family: Geist, Arial, sans-serif;
          font-size: 30px;
          font-weight: 700;
          color:"var(--fg)";
          line-height: 1;
          letter-spacing: -0.03em;
        }
        .about-stat-label {
          font-family: Arial, sans-serif;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color:"var(--fg-faint)";
        }
        @media (max-width: 640px) {
          .about-stats { grid-template-columns: 1fr 1fr; }
        }

        /* Responsive */
        @media (max-width: 960px) {
          .about-grid { grid-template-columns: 1fr; gap: 48px; }
          .about-photo { max-width: 400px; }
        }
      `}</style>

      <div className="about-wrap">
        {/* Eyebrow + heading */}
        <div data-aos="fade-up">
          <span className="about-eyebrow">01 — About</span>
          <h2 className="about-heading">Founder Story</h2>
        </div>

        <div className="about-grid">
          {/* LEFT — story */}
          <div data-aos="fade-up" data-aos-delay="80">
            <div className="about-body">
              <p style={{ color: "var(--fg-muted)" }}>
                I'm <strong style={{ color:"var(--fg)", fontWeight:600 }}>Great Emman-Wori</strong> — a Fullstack Website
                Developer, Product Designer, and UI/UX Designer based in{" "}
                <strong style={{ color:"var(--fg)", fontWeight:600 }}>Port Harcourt, Nigeria</strong>.
                Founder of{" "}
                <a href="https://emman-engineered.vercel.app/" target="_blank" rel="noopener noreferrer"
                  style={{ color:"var(--accent)", fontWeight:600, textDecoration:"none" }}>
                  Creative Emman
                </a>
                {" "}— a premium digital design &amp; branding studio.
              </p>
              <p style={{ color: "var(--fg-muted)" }}>
                I bridge the gap between clean code, visual design, usability, and real business outcomes.
                I build websites, web applications, and digital product experiences that are responsive,
                conversion-ready, and built to rank — from frontend interfaces to fullstack systems to
                Figma design systems.
              </p>
              <p style={{ color: "var(--fg-faint)" }}>
                Currently handling digital operations at{" "}
                <span style={{ color:"var(--accent)", fontWeight:600 }}>Phatbird</span> (UK), while
                building client websites and brand experiences for global clients through Creative Emman.
              </p>
            </div>

            {/* Studio attribution line */}
            <div className="about-studio-line">
              <span>Founder &amp; Creative Director —</span>
              <a
                href="https://emman-engineered.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="about-studio-link"
              >
                Creative Emman Studio →
              </a>
            </div>

            {/* Value tags */}
            <div className="about-tags">
              {["Usability","Visual Clarity","Performance","Accessibility","Storytelling","Conversion","Brand Trust"].map(v => (
                <span key={v} className="about-tag">{v}</span>
              ))}
            </div>

            {/* Stats — horizontal strip below tags */}
            <div className="about-stats">
              <CountStat end={16}  suffix="+" label="Projects Completed" />
              <CountStat end={3}   suffix="+" label="Years Experience" />
              <CountStat end={100} suffix="%" label="Responsive Builds" />
              <SpecialStat value="SEO ✓" label="SEO-Ready Delivery" />
            </div>
          </div>

          {/* RIGHT — photo only */}
          <div className="about-right" data-aos="fade-up" data-aos-delay="160">
            <div className="about-photo-wrap">
              <img
                src="/great-emman-wori-fullstack-developer.png"
                alt="Great Emman-Wori, Founder of Creative Emman"
                className="about-photo"
                loading="lazy"
                width={400}
                height={400}
              />
              <div className="about-photo-caption">
                <span className="about-photo-name">Great Emman-Wori</span>
                <span className="about-photo-handle">@creative_emman</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
