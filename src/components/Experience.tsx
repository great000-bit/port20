import EXP from "@/data/experience.json";

export default function Experience() {
  return (
    <section id="experience" style={{ background:"var(--bg-2)", padding:"clamp(80px,12vh,120px) 0" }}>
      <style>{`
        .exp-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(24px,5vw,64px);
        }
        .exp-eyebrow {
          font-family: Arial,sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color:var(--fg-ultra);
          display: block; margin-bottom: 20px;
        }
        .exp-heading {
          font-family: Geist,Arial,sans-serif;
          font-size: clamp(28px,3.5vw,42px);
          font-weight: 400; letter-spacing: -0.04em;
          color:var(--fg); margin: 0 0 64px 0;
        }
        /* Timeline container */
        .exp-timeline {
          position: relative;
          padding-left: 28px;
        }
        /* Left rail line */
        .exp-timeline::before {
          content: "";
          position: absolute;
          left: 0; top: 6px; bottom: 0;
          width: 1px;
          background: var(--border);
        }
        /* Each entry */
        .exp-entry {
          position: relative;
          padding-bottom: 56px;
        }
        .exp-entry:last-child { padding-bottom: 0; }
        /* Dot on the rail */
        .exp-dot {
          position: absolute;
          left: -34px; top: 6px;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: var(--accent);
          border: 2px solid var(--bg);
          box-shadow: 0 0 0 1px var(--accent);
        }
        /* Period label */
        .exp-period {
          font-family: Arial,sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--accent-text);
          margin-bottom: 10px;
          display: block;
        }
        /* Role */
        .exp-role {
          font-family: Geist,Arial,sans-serif;
          font-size: 18px; font-weight: 600;
          color:var(--fg); margin: 0 0 4px 0;
          letter-spacing: -0.02em;
        }
        /* Org + loc */
        .exp-org {
          font-family: Arial,sans-serif;
          font-size: 13px; color:var(--fg-faint);
          margin-bottom: 20px;
        }
        /* Bullets */
        .exp-bullets {
          list-style: none;
          padding: 0; margin: 0 0 18px 0;
          display: flex; flex-direction: column; gap: 8px;
        }
        .exp-bullet {
          font-family: Arial,sans-serif;
          font-size: 14px; line-height: 1.65;
          color:var(--fg-muted);
          display: flex; gap: 10px;
        }
        .exp-bullet-text { min-width: 0; overflow-wrap: anywhere; }
        .exp-bullet::before {
          content: "·";
          color: var(--accent-text);
          flex-shrink: 0;
          font-size: 12px;
          margin-top: 2px;
        }
        /* Tags */
        .exp-tags {
          display: flex; flex-wrap: wrap; gap: 6px;
        }
        .exp-tag {
          font-family: Arial,sans-serif;
          font-size: 11px; font-weight: 500;
          color:var(--fg-faint);
          padding: 3px 10px; border-radius: 4px;
          background:var(--card-bg);
          border:1px solid var(--border);
        }
        /* Divider between entries */
        .exp-divider {
          height: 1px;
          background:var(--nav-pill);
          margin-bottom: 48px;
        }
        @media (max-width: 640px) {
          .exp-timeline { padding-left: 20px; }
          .exp-dot { left: -26px; }
          .exp-role { font-size: 16px; }
        }
      `}</style>

      <div className="exp-wrap">
        <div data-aos="fade-up">
          <span className="exp-eyebrow">05 / Experience</span>
          <h2 className="exp-heading">Work Experience</h2>
        </div>

        <div className="exp-timeline">
          {EXP.map((e, i) => (
            <div key={i} className="exp-entry" data-aos="fade-up" data-aos-delay={i * 80}>
              <div className="exp-dot" />
              <span className="exp-period">{e.period}</span>
              <h3 className="exp-role">{e.role}</h3>
              <p className="exp-org">{e.org} · {e.loc}</p>
              <ul className="exp-bullets">
                {e.bullets.map((b, j) => (
                  <li key={j} className="exp-bullet"><span className="exp-bullet-text">{b}</span></li>
                ))}
              </ul>
              <div className="exp-tags">
                {e.tags.map(t => <span key={t} className="exp-tag">{t}</span>)}
              </div>
              {i < EXP.length - 1 && <div className="exp-divider" style={{ marginTop: 40 }} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
