import { useState } from "react";
import { ArrowLeft, Layers } from "lucide-react";

// Placeholder slots — swap in real cover/guideline images once the 3 brandings are supplied.
const BRANDS = [
  { id: 1, name: "Brand One",   summary: "Full brand identity — logo, color system, and guidelines." },
  { id: 2, name: "Brand Two",   summary: "Full brand identity — logo, color system, and guidelines." },
  { id: 3, name: "Brand Three", summary: "Full brand identity — logo, color system, and guidelines." },
];

export default function BrandingWork() {
  const [selected, setSelected] = useState<number | null>(null);
  const brand = BRANDS.find(b => b.id === selected);

  return (
    <>
      <style>{`
        .gx-brand-wrap { max-width: 1180px; margin: 0 auto; padding: 0 clamp(20px,5vw,64px) 100px; }
        .gx-grid-head { margin-bottom: 32px; }
        .gx-grid-title {
          font-family: Geist, Arial, sans-serif; font-weight: 700;
          font-size: clamp(24px,3vw,32px); color: var(--fg); margin-bottom: 8px;
        }
        .gx-grid-sub { font-family: Arial, sans-serif; font-size: 14px; color: var(--fg-muted); }
        .gx-brand-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 22px;
        }
        .gx-brand-card {
          border-radius: 18px; overflow: hidden; cursor: pointer;
          background: var(--card-bg); border: 1px solid var(--card-border);
          transition: transform 0.28s ease, border-color 0.28s ease;
        }
        .gx-brand-card:hover { transform: translateY(-6px); border-color: var(--accent-border); }
        .gx-brand-cover {
          aspect-ratio: 16 / 10; display: flex; align-items: center; justify-content: center;
          background: var(--bg-3); color: var(--fg-faint);
        }
        .gx-brand-body { padding: 18px 20px; }
        .gx-brand-name { font-family: Geist, Arial, sans-serif; font-weight: 600; font-size: 16px; color: var(--fg); margin-bottom: 4px; }
        .gx-brand-summary { font-family: Arial, sans-serif; font-size: 13px; color: var(--fg-muted); }

        /* Detail view */
        .gx-brand-detail { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 40px; align-items: start; }
        .gx-brand-back {
          display: inline-flex; align-items: center; gap: 6px;
          background: none; border: none; cursor: pointer;
          font-family: Arial, sans-serif; font-size: 13px; font-weight: 500;
          color: var(--fg-muted); margin-bottom: 24px; transition: color 0.2s;
        }
        .gx-brand-back:hover { color: var(--accent); }
        .gx-brand-detail-cover {
          aspect-ratio: 4 / 5; border-radius: 18px; overflow: hidden;
          background: var(--bg-3); border: 1px solid var(--card-border);
          display: flex; align-items: center; justify-content: center; color: var(--fg-faint);
        }
        .gx-brand-detail-title { font-family: Geist, Arial, sans-serif; font-weight: 700; font-size: 26px; color: var(--fg); margin-bottom: 12px; }
        .gx-brand-detail-text { font-family: Arial, sans-serif; font-size: 14px; color: var(--fg-muted); line-height: 1.7; margin-bottom: 20px; }
        @media (max-width: 760px) {
          .gx-brand-detail { grid-template-columns: 1fr; }
          .gx-brand-detail-cover { max-width: 340px; margin: 0 auto; }
        }
      `}</style>

      <div className="gx-brand-wrap">
        {!brand ? (
          <>
            <div className="gx-grid-head" data-aos="fade-up">
              <h2 className="gx-grid-title">Branding Projects</h2>
              <p className="gx-grid-sub">Complete identity systems — click one to view the guidelines.</p>
            </div>
            <div className="gx-brand-grid">
              {BRANDS.map((b, i) => (
                <article
                  key={b.id}
                  className="gx-brand-card"
                  data-aos="fade-up"
                  data-aos-delay={(i % 3) * 80}
                  onClick={() => setSelected(b.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === "Enter" && setSelected(b.id)}
                >
                  <div className="gx-brand-cover"><Layers size={28} strokeWidth={1.4} /></div>
                  <div className="gx-brand-body">
                    <div className="gx-brand-name">{b.name}</div>
                    <div className="gx-brand-summary">{b.summary}</div>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div data-aos="fade-up">
            <button className="gx-brand-back" onClick={() => setSelected(null)}>
              <ArrowLeft size={14} /> Back to all branding
            </button>
            <div className="gx-brand-detail">
              <div className="gx-brand-detail-cover"><Layers size={36} strokeWidth={1.2} /></div>
              <div>
                <h3 className="gx-brand-detail-title">{brand.name}</h3>
                <p className="gx-brand-detail-text">
                  Brand guideline content — cover, color palette, typography, and
                  logo usage — goes here once the guideline pages are supplied.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
