import { ImageIcon } from "lucide-react";

// Placeholder slots — swap `img` for a real flyer path once assets are supplied,
// and remove the `placeholder: true` flag on that item.
const GRAPHICS_ITEMS = [
  { id: 1, title: "Flyer Design",        tag: "Event Flyer",     placeholder: true },
  { id: 2, title: "Social Media Post",   tag: "Instagram",       placeholder: true },
  { id: 3, title: "Church Program Card", tag: "Event Graphic",   placeholder: true },
  { id: 4, title: "Promo Banner",        tag: "Ad Creative",     placeholder: true },
  { id: 5, title: "Business Flyer",      tag: "Corporate",       placeholder: true },
  { id: 6, title: "Product Showcase",    tag: "E-commerce",      placeholder: true },
];

export default function GraphicsWork() {
  return (
    <>
      <style>{`
        .gx-grid-wrap { max-width: 1180px; margin: 0 auto; padding: 0 clamp(20px,5vw,64px) 100px; }
        .gx-grid-head { margin-bottom: 32px; }
        .gx-grid-title {
          font-family: Geist, Arial, sans-serif; font-weight: 700;
          font-size: clamp(24px,3vw,32px); color: var(--fg); margin-bottom: 8px;
        }
        .gx-grid-sub { font-family: Arial, sans-serif; font-size: 14px; color: var(--fg-muted); }
        .gx-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
        }
        .gx-card {
          position: relative; border-radius: 18px; overflow: hidden;
          aspect-ratio: 4 / 5;
          background: linear-gradient(150deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 100%);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid var(--card-border);
          transition: transform 0.28s ease, border-color 0.28s ease;
          display: flex; flex-direction: column;
        }
        .gx-card:hover { transform: translateY(-6px); border-color: var(--accent-border); }
        .gx-card-media {
          flex: 1; display: flex; align-items: center; justify-content: center;
          background: var(--bg-3);
          color: var(--fg-faint);
        }
        .gx-card-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .gx-card-body { padding: 16px 18px; }
        .gx-card-tag {
          display: inline-block; font-family: Arial, sans-serif; font-size: 11px;
          font-weight: 600; letter-spacing: 0.03em; text-transform: uppercase;
          color: var(--accent); margin-bottom: 6px;
        }
        .gx-card-title {
          font-family: Geist, Arial, sans-serif; font-weight: 600; font-size: 15px;
          color: var(--fg);
        }
      `}</style>

      <div className="gx-grid-wrap">
        <div className="gx-grid-head" data-aos="fade-up">
          <h2 className="gx-grid-title">Graphic Design Work</h2>
          <p className="gx-grid-sub">Flyers, social content, and visual campaigns.</p>
        </div>
        <div className="gx-grid">
          {GRAPHICS_ITEMS.map((item, i) => (
            <article key={item.id} className="gx-card" data-aos="fade-up" data-aos-delay={(i % 3) * 80}>
              <div className="gx-card-media">
                {item.placeholder ? <ImageIcon size={30} strokeWidth={1.4} /> : null}
              </div>
              <div className="gx-card-body">
                <span className="gx-card-tag">{item.tag}</span>
                <div className="gx-card-title">{item.title}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
