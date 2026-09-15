import { useState } from "react";
import { ArrowLeft, ArrowUpRight, ChevronRight } from "lucide-react";

const stryvonPages = Array.from(
  { length: 18 },
  (_, index) => `/branding/stryvon/stryvon-${String(index + 1).padStart(2, "0")}.jpg`
);
const oakConstructionPages = Array.from(
  { length: 12 },
  (_, index) => `/branding/oak-construction/oak-construction-${String(index + 1).padStart(2, "0")}.jpg`
);

const BRANDS = [
  {
    id: "stryvon",
    name: "Stryvon",
    type: "Fitness brand identity",
    summary:
      "A bold visual identity for a fitness brand built around movement, discipline, and forward momentum.",
    description:
      "The system combines a sharp, energetic mark with a high-contrast palette that feels confident across digital, apparel, and physical brand touchpoints.",
    cover: stryvonPages[1],
    pages: stryvonPages,
  },
  {
    id: "oak-construction",
    name: "OAK Construction Limited",
    type: "Construction brand identity",
    summary:
      "A practical, high-visibility identity system for a construction company built to inspire confidence on and off site.",
    description:
      "The identity pairs a sturdy, geometric mark with a distinctive orange-and-charcoal palette, creating a clear and trusted presence across site wear, machinery, stationery, and campaign materials.",
    cover: oakConstructionPages[1],
    pages: oakConstructionPages,
  },
];

export default function BrandingWork() {
  const [selected, setSelected] = useState<string | null>(null);
  const brand = BRANDS.find((item) => item.id === selected);

  return (
    <>
      <style>{`
        .gx-brand-wrap { max-width: 1180px; margin: 0 auto; padding: 0 clamp(20px,5vw,64px) 112px; }
        .gx-grid-head { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin: 0 auto 32px; max-width: 820px; }
        .gx-grid-kicker { color: var(--accent); font: 600 12px/1 Arial, sans-serif; letter-spacing: .11em; text-transform: uppercase; margin: 0 0 10px; }
        .gx-grid-title { font-family: Geist, Arial, sans-serif; font-weight: 700; font-size: clamp(26px,3vw,36px); letter-spacing: -.04em; color: var(--fg); margin: 0 0 10px; }
        .gx-grid-sub { font: 14px/1.65 Arial, sans-serif; color: var(--fg-muted); margin: 0; max-width: 54ch; }
        .gx-brand-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px; max-width: 1000px; margin: 0 auto; }
        .gx-brand-card { border-radius: 22px; overflow: hidden; cursor: pointer; background: var(--card-bg); border: 1px solid var(--card-border); transition: transform .28s ease, border-color .28s ease, box-shadow .28s ease; }
        .gx-brand-card:hover { transform: translateY(-6px); border-color: var(--accent-border); box-shadow: 0 20px 52px rgba(0,0,0,.2); }
        .gx-brand-cover { position: relative; aspect-ratio: 16 / 9; overflow: hidden; background: var(--bg-3); }
        .gx-brand-cover::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 45%, rgba(0,0,0,.42)); }
        .gx-brand-cover img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; display: block; transition: transform .5s ease; }
        .gx-brand-card:hover .gx-brand-cover img { transform: scale(1.035); }
        .gx-brand-tag { position: absolute; z-index: 1; top: 18px; left: 18px; padding: 7px 10px; border: 1px solid rgba(255,255,255,.18); border-radius: 999px; background: rgba(15,15,15,.64); backdrop-filter: blur(12px); color: #fff; font: 600 11px/1 Arial, sans-serif; letter-spacing: .04em; text-transform: uppercase; }
        .gx-brand-body { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 21px 24px 23px; }
        .gx-brand-name { color: var(--fg); font: 700 21px/1.2 Geist, Arial, sans-serif; letter-spacing: -.03em; margin: 0 0 6px; }
        .gx-brand-summary { color: var(--fg-muted); font: 13px/1.55 Arial, sans-serif; margin: 0; max-width: 66ch; }
        .gx-brand-open { flex: 0 0 auto; width: 38px; height: 38px; display: grid; place-items: center; border: 1px solid var(--border-strong); border-radius: 50%; color: var(--fg); transition: color .2s, background .2s, border-color .2s; }
        .gx-brand-card:hover .gx-brand-open { background: var(--accent); border-color: var(--accent); color: #fff; }
        .gx-brand-detail { max-width: 1000px; margin: 0 auto; }
        .gx-brand-back { display: inline-flex; align-items: center; gap: 7px; padding: 0; background: none; border: none; cursor: pointer; font: 500 13px Arial, sans-serif; color: var(--fg-muted); margin-bottom: 30px; transition: color .2s; }
        .gx-brand-back:hover { color: var(--accent); }
        .gx-brand-intro { display: grid; grid-template-columns: minmax(0,1fr) minmax(280px,.75fr); gap: clamp(28px,5vw,72px); align-items: center; margin-bottom: 52px; }
        .gx-brand-detail-cover { aspect-ratio: 4 / 3; border: 1px solid var(--card-border); border-radius: 20px; overflow: hidden; background: var(--bg-3); }
        .gx-brand-detail-cover img { width: 100%; height: 100%; display: block; object-fit: cover; object-position: center 30%; }
        .gx-brand-detail-type { color: var(--accent); font: 600 12px/1 Arial, sans-serif; letter-spacing: .1em; text-transform: uppercase; margin: 0 0 12px; }
        .gx-brand-detail-title { color: var(--fg); font: 700 clamp(32px,5vw,52px)/1 Geist, Arial, sans-serif; letter-spacing: -.055em; margin: 0 0 16px; }
        .gx-brand-detail-text { color: var(--fg-muted); font: 15px/1.7 Arial, sans-serif; margin: 0; max-width: 48ch; }
        .gx-guidelines-head { display: flex; align-items: center; gap: 10px; color: var(--fg); font: 600 15px Arial, sans-serif; padding: 18px 0; border-top: 1px solid var(--card-border); }
        .gx-guideline-gallery { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 16px; }
        .gx-guideline-page { border: 1px solid var(--card-border); border-radius: 14px; overflow: hidden; background: var(--bg-3); margin: 0; }
        .gx-guideline-page img { width: 100%; height: auto; display: block; }
        @media (max-width: 760px) { .gx-grid-head { display:block; } .gx-brand-grid { grid-template-columns: 1fr; max-width: 620px; } .gx-brand-intro { grid-template-columns: 1fr; } .gx-brand-detail-cover { max-width: 520px; } .gx-guideline-gallery { grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; } }
        @media (max-width: 460px) { .gx-brand-body { padding: 18px; } .gx-brand-summary { font-size: 12px; } .gx-guideline-gallery { grid-template-columns: 1fr; } }
      `}</style>

      <section id="gx-content" className="gx-brand-wrap" aria-label="Branding projects">
        {!brand ? (
          <>
            <div className="gx-grid-head" data-aos="fade-up">
              <div>
                <p className="gx-grid-kicker">Selected work</p>
                <h2 className="gx-grid-title">Brand identities with a point of view.</h2>
                <p className="gx-grid-sub">Explore the thinking, visual systems, and applications behind each brand.</p>
              </div>
            </div>
            <div className="gx-brand-grid">
              {BRANDS.map((item) => (
                <article key={item.id} className="gx-brand-card" data-aos="fade-up" onClick={() => setSelected(item.id)} role="button" tabIndex={0} onKeyDown={(event) => event.key === "Enter" && setSelected(item.id)} aria-label={`View ${item.name} brand guidelines`}>
                  <div className="gx-brand-cover">
                    <img src={item.cover} alt={`${item.name} brand identity preview`} loading="lazy" />
                    <span className="gx-brand-tag">{item.type}</span>
                  </div>
                  <div className="gx-brand-body">
                    <div><h3 className="gx-brand-name">{item.name}</h3><p className="gx-brand-summary">{item.summary}</p></div>
                    <span className="gx-brand-open" aria-hidden="true"><ArrowUpRight size={17} /></span>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="gx-brand-detail" data-aos="fade-up">
            <button className="gx-brand-back" onClick={() => setSelected(null)}><ArrowLeft size={15} /> Back to all branding</button>
            <div className="gx-brand-intro">
              <div className="gx-brand-detail-cover"><img src={brand.cover} alt={`${brand.name} brand identity`} /></div>
              <div>
                <p className="gx-brand-detail-type">{brand.type}</p>
                <h2 className="gx-brand-detail-title">{brand.name}</h2>
                <p className="gx-brand-detail-text">{brand.summary} {brand.description}</p>
              </div>
            </div>
            <div className="gx-guidelines-head"><ChevronRight size={16} color="var(--accent)" /> Brand guidelines & applications</div>
            <div className="gx-guideline-gallery">
              {brand.pages.map((page, index) => <figure className="gx-guideline-page" key={page}><img src={page} alt={`${brand.name} guideline page ${index + 1}`} loading={index < 3 ? "eager" : "lazy"} /></figure>)}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
