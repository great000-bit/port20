const GRAPHICS_ITEMS = [
  { title: "Building Modern Web", tag: "Web design", image: "/graphics/flyers/flyer-01.jpg" },
  { title: "Design. Build. Grow.", tag: "Web development", image: "/graphics/flyers/flyer-02.jpg" },
  { title: "Meet Our Co-Founders", tag: "Corporate flyer", image: "/graphics/flyers/flyer-03.jpg" },
  { title: "Simplifying Buying and Selling for Everyone", tag: "Real estate", image: "/graphics/flyers/flyer-04.jpg" },
  { title: "Career Talk 1.0", tag: "Event flyer", image: "/graphics/flyers/flyer-05.jpg" },
  { title: "Lux Films", tag: "Brand showcase", image: "/graphics/flyers/flyer-06.jpg" },
  { title: "Touko Banix", tag: "Brand identity", image: "/graphics/flyers/flyer-07.jpg" },
  { title: "Appligo", tag: "Product campaign", image: "/graphics/flyers/flyer-08.jpg" },
  { title: "This September", tag: "Campaign flyer", image: "/graphics/flyers/flyer-09.jpg" },
];

export default function GraphicsWork() {
  return (
    <>
      <style>{`
        .gx-grid-wrap { max-width: 1180px; margin: 0 auto; padding: 0 clamp(20px,5vw,64px) 112px; }
        .gx-grid-head { margin-bottom: 32px; }
        .gx-grid-kicker { color: var(--accent); font: 600 12px/1 Arial, sans-serif; letter-spacing: .11em; text-transform: uppercase; margin: 0 0 10px; }
        .gx-grid-title { font-family: Geist, Arial, sans-serif; font-weight: 700; font-size: clamp(26px,3vw,36px); letter-spacing: -.04em; color: var(--fg); margin: 0 0 10px; }
        .gx-grid-sub { font-family: Arial, sans-serif; font-size: 14px; color: var(--fg-muted); margin: 0; }
        .gx-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
        .gx-card { border-radius: 18px; overflow: hidden; background: var(--card-bg); border: 1px solid var(--card-border); transition: transform .28s ease, border-color .28s ease, box-shadow .28s ease; }
        .gx-card:hover { transform: translateY(-6px); border-color: var(--accent-border); box-shadow: 0 18px 42px rgba(0,0,0,.18); }
        .gx-card-media { aspect-ratio: 4 / 5; overflow: hidden; background: var(--bg-3); }
        .gx-card-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .45s ease; }
        .gx-card:hover .gx-card-img { transform: scale(1.025); }
        .gx-card-body { padding: 16px 18px 18px; }
        .gx-card-tag { display: inline-block; font-family: Arial, sans-serif; font-size: 11px; font-weight: 600; letter-spacing: .05em; text-transform: uppercase; color: var(--accent); margin-bottom: 7px; }
        .gx-card-title { font-family: Geist, Arial, sans-serif; font-weight: 600; font-size: 16px; line-height: 1.35; color: var(--fg); }
        @media (max-width: 860px) { .gx-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 520px) { .gx-grid { grid-template-columns: 1fr; gap: 16px; } .gx-card-media { aspect-ratio: 4 / 4.6; } }
      `}</style>

      <section id="gx-content" className="gx-grid-wrap" aria-label="Graphic design work">
        <div className="gx-grid-head" data-aos="fade-up">
          <p className="gx-grid-kicker">Selected work</p>
          <h2 className="gx-grid-title">Graphic design work</h2>
          <p className="gx-grid-sub">Flyers, campaigns, and visual communication designed to be noticed.</p>
        </div>
        <div className="gx-grid">
          {GRAPHICS_ITEMS.map((item, index) => (
            <article key={item.image} className="gx-card" data-aos="fade-up" data-aos-delay={(index % 3) * 80}>
              <div className="gx-card-media"><img className="gx-card-img" src={item.image} alt={item.title} loading={index < 3 ? "eager" : "lazy"} /></div>
              <div className="gx-card-body"><span className="gx-card-tag">{item.tag}</span><div className="gx-card-title">{item.title}</div></div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
