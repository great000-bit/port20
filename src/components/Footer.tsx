const DIRECTORY_COLUMNS = [
  {
    heading: "Contact",
    links: [
      { label: "greatemmanwori@gmail.com", href: "mailto:greatemmanwori@gmail.com" },
      { label: "+234 810 388 7554", href: "https://wa.me/2348103887554", external: true },
      { label: "Port Harcourt, Nigeria" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Experience", href: "#experience" },
    ],
  },
  {
    heading: "Work",
    links: [
      { label: "Projects", href: "#portfolio" },
      { label: "Contact", href: "#contact" },
      { label: "Download CV", href: "/Great-Emman-Wori-CV.pdf", external: true },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/great-emman-wori", external: true },
      { label: "Instagram", href: "https://msng.link/o?creative_emman=ig", external: true },
      { label: "GitHub", href: "https://github.com/great000-bit", external: true },
    ],
  },
];

export default function Footer() {
  return (
    <>
      <style>{`
        .site-footer {
          background: #000;
          border-top: 1px solid rgba(248,247,244,0.12);
          color: #F8F7F4;
          overflow: hidden;
        }
        .footer-directory {
          display: grid;
          grid-template-columns: repeat(4,minmax(0,1fr));
          border-bottom: 1px solid rgba(248,247,244,0.13);
        }
        .footer-column {
          min-height: clamp(220px,21vw,310px);
          padding: clamp(32px,3.4vw,52px) clamp(24px,3.4vw,52px);
        }
        .footer-column + .footer-column {
          border-left: 1px solid rgba(248,247,244,0.13);
        }
        .footer-heading {
          margin: 0 0 28px;
          color: #F8F7F4;
          font: 700 11px/1.2 Arial,sans-serif;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }
        .footer-list {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .footer-directory-link,
        .footer-directory-text {
          color: rgba(248,247,244,0.72);
          font: 400 clamp(14px,1.15vw,17px)/1.45 Arial,sans-serif;
        }
        .footer-directory-link {
          text-decoration: none;
          transition: color .2s ease;
        }
        .footer-directory-link:hover { color: #F8F7F4; }
        .footer-brand-stage {
          position: relative;
          display: flex;
          align-items: flex-end;
          min-height: clamp(250px,29vw,440px);
          padding: clamp(70px,10vw,150px) clamp(18px,3vw,48px) clamp(24px,3vw,42px);
          isolation: isolate;
        }
        .footer-brand-stage::before {
          position: absolute;
          z-index: -1;
          right: 18%;
          bottom: -45%;
          width: min(54vw,760px);
          aspect-ratio: 1.4;
          content: "";
          background: radial-gradient(ellipse,rgba(140,0,18,0.28) 0%,rgba(90,0,12,0.12) 42%,transparent 72%);
          filter: blur(24px);
          pointer-events: none;
        }
        .footer-name {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: clamp(12px,1.25vw,22px);
          width: 100%;
          margin: 0;
          color: #F8F7F4;
          font-family: "Clash Display",Arial,sans-serif;
          font-size: clamp(4.25rem,8.2vw,7.5rem);
          font-weight: 700;
          line-height: .82;
          letter-spacing: -0.065em;
          white-space: nowrap;
        }
        .footer-utility {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          min-height: 62px;
          padding: 18px clamp(24px,3vw,48px);
          border-top: 1px solid rgba(248,247,244,0.13);
        }
        .footer-copyright,
        .footer-credit {
          margin: 0;
          color: rgba(248,247,244,0.38);
          font: 400 10px/1.4 Arial,sans-serif;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        @media (max-width: 860px) {
          .footer-directory { grid-template-columns: repeat(2,minmax(0,1fr)); }
          .footer-column { min-height: 210px; }
          .footer-column:nth-child(3) { border-left: 0; }
          .footer-column:nth-child(n+3) { border-top: 1px solid rgba(248,247,244,0.13); }
          .footer-name { font-size: clamp(3.3rem,10.2vw,5.5rem); }
        }
        @media (max-width: 559px) {
          .footer-directory { grid-template-columns: 1fr; }
          .footer-column { min-height: auto; padding-block: 30px; }
          .footer-column + .footer-column { border-left: 0; border-top: 1px solid rgba(248,247,244,0.13); }
          .footer-heading { margin-bottom: 20px; }
          .footer-brand-stage {
            min-height: 300px;
            padding: 76px 20px 28px;
          }
          .footer-brand-stage::before { right: -30%; width: 130vw; }
          .footer-name {
            flex-wrap: nowrap;
            justify-content: center;
            gap: clamp(6px,2vw,10px);
            font-size: clamp(1.9rem,10.4vw,2.6rem);
            line-height: .88;
            white-space: nowrap;
          }
          .footer-name > span { white-space: nowrap; }
          .footer-utility {
            align-items: flex-start;
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>

      <footer className="site-footer">
        <div className="footer-directory" aria-label="Footer directory">
          {DIRECTORY_COLUMNS.map(column => (
            <section className="footer-column" key={column.heading}>
              <h2 className="footer-heading">{column.heading}</h2>
              <ul className="footer-list">
                {column.links.map(item => (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        className="footer-directory-link"
                        href={item.href}
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span className="footer-directory-text">{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="footer-brand-stage">
          <p className="footer-name" aria-label="Great Emman-Wori">
            <span aria-hidden="true">Great</span>
            <span aria-hidden="true">Emman-Wori</span>
          </p>
        </div>

        <div className="footer-utility">
          <p className="footer-copyright">© 2026 Great Emman-Wori · All rights reserved</p>
          <p className="footer-credit">Designed &amp; developed by Great Emman-Wori</p>
        </div>
      </footer>
    </>
  );
}
