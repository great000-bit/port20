import { useEffect, useRef, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const PORTFOLIOS = [
  { key: "fullstack", label: "Full-Stack", href: "/" },
  { key: "graphics", label: "Graphics", href: "/graphics" },
  { key: "uiux", label: "UI/UX", href: "/uiux" },
  { key: "motion", label: "Motion", href: "/motion" },
];

/* Nav for the portfolio sub-pages. Carries the same pill as the main site
   and lets visitors move straight between portfolios. */
export default function SubNav({ current, badge }: { current: string; badge: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => { setScrolled(window.scrollY > 40); ticking.current = false; });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <style>{`
        .sn-header { position: fixed; top: 0; left: 0; width: 100%; z-index: 50; transition: background 0.3s, padding 0.3s; }
        .sn-inner {
          max-width: 1280px; margin: 0 auto; padding: 0 clamp(20px,4vw,56px); height: 72px;
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
        }
        .sn-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
        .sn-logo-img {
          width: 34px; height: 34px; border-radius: 50%; object-fit: cover; object-position: center top;
          border: 1px solid rgba(95,107,31,0.45); flex-shrink: 0;
        }
        .sn-logo-text {
          font-family: "Clash Display",Geist,Arial,sans-serif; font-size: 15px; font-weight: 600;
          letter-spacing: -0.02em; color: var(--fg); white-space: nowrap;
        }
        .sn-logo-accent { color: var(--accent-text); }
        .sn-badge {
          font-family: Arial, sans-serif; font-size: 11px; font-weight: 600;
          letter-spacing: 0.03em; text-transform: uppercase; color: var(--fg-faint);
          border: 1px solid var(--border); border-radius: 999px; padding: 4px 10px; white-space: nowrap;
        }
        .sn-pill {
          display: flex; align-items: center; gap: 2px; padding: 5px; border-radius: 999px;
          background: var(--nav-pill); border: 1px solid var(--nav-pill-border);
        }
        .sn-link {
          padding: 6px 14px; border-radius: 999px; font-family: Arial,sans-serif;
          font-size: 13px; font-weight: 500; text-decoration: none; transition: all 0.2s;
          color: var(--fg-muted); white-space: nowrap;
        }
        .sn-link:hover { color: var(--fg); }
        .sn-link.active { background: var(--accent); color: #ffffff; }
        .sn-theme-btn {
          width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center;
          justify-content: center; background: var(--nav-pill); border: 1px solid var(--nav-pill-border);
          cursor: pointer; color: var(--fg-muted); transition: all 0.2s; flex-shrink: 0;
        }
        .sn-theme-btn:hover { color: var(--fg); }
        .sn-right { display: flex; align-items: center; gap: 10px; }
        .sn-cta {
          display: inline-flex; align-items: center; padding: 7px 18px; border-radius: 8px;
          font-family: Arial,sans-serif; font-size: 13px; font-weight: 600;
          background: var(--accent); color: #ffffff; border: 1px solid var(--accent);
          text-decoration: none; transition: background 0.2s; white-space: nowrap;
        }
        .sn-cta:hover { background: var(--accent-hover); }
        .sn-hamburger {
          width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center;
          justify-content: center; background: var(--nav-pill); border: 1px solid var(--nav-pill-border);
          cursor: pointer; color: var(--fg);
        }
        .sn-mobile {
          position: absolute; top: 80px; left: 50%; transform: translateX(-50%);
          width: calc(100% - 40px); max-width: 420px; border-radius: 20px;
          background: var(--nav-bg); border: 1px solid var(--border); padding: 12px;
          transition: opacity 0.25s, transform 0.25s;
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
        }
        .sn-mobile.closed { opacity: 0; pointer-events: none; transform: translateX(-50%) translateY(-8px); }
        .sn-mobile.open { opacity: 1; pointer-events: all; transform: translateX(-50%) translateY(0); }
        .sn-mobile-link {
          display: block; padding: 11px 16px; border-radius: 12px; font-family: Arial,sans-serif;
          font-size: 15px; font-weight: 500; color: var(--fg-muted); text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .sn-mobile-link:hover { background: var(--card-bg); color: var(--fg); }
        .sn-mobile-link.active { color: var(--accent-text); font-weight: 600; }
        .sn-mobile-divider { height: 1px; background: var(--border); margin: 8px 0; }

        @media (min-width: 900px) { .sn-hamburger { display: none; } .sn-mobile { display: none; } }
        @media (max-width: 899px) {
          .sn-pill-wrap { display: none; }
          .sn-cta { display: none; }
          .sn-badge { display: none; }
          .sn-logo-text { display: none; }
        }
        @media (max-width: 480px) { .sn-inner { height: 64px; } }
      `}</style>

      <header className="sn-header"
        style={{ background: scrolled ? "var(--nav-bg)" : "transparent",
                 borderBottom: scrolled ? "1px solid var(--border-soft)" : "none" }}
      >
        <div className="sn-inner">
          <a href="/" className="sn-logo">
            <img src="/great-emman-wori-2026.webp" alt="Great Emman-Wori" className="sn-logo-img" loading="eager" />
            <span className="sn-logo-text"><span className="sn-logo-accent">Great</span> Emman-Wori</span>
            <span className="sn-badge">{badge}</span>
          </a>

          <nav className="sn-pill-wrap sn-pill" aria-label="Portfolio navigation">
            {PORTFOLIOS.map(p => (
              <a key={p.key} href={p.href}
                className={`sn-link${p.key === current ? " active" : ""}`}
                aria-current={p.key === current ? "page" : undefined}>
                {p.label}
              </a>
            ))}
          </nav>

          <div className="sn-right">
            <button onClick={toggle} className="sn-theme-btn" aria-label="Toggle theme">
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <a href="#contact" className="sn-cta">Hire Me</a>
            <button className="sn-hamburger" onClick={() => setOpen(o => !o)}
              aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        <div className={`sn-mobile ${open ? "open" : "closed"}`}>
          {PORTFOLIOS.map(p => (
            <a key={p.key} href={p.href} onClick={close}
              className={`sn-mobile-link${p.key === current ? " active" : ""}`}
              aria-current={p.key === current ? "page" : undefined}>
              {p.label} Portfolio
            </a>
          ))}
          <div className="sn-mobile-divider" />
          <a href="#contact" onClick={close} className="sn-mobile-link"
            style={{ color: "var(--accent-text)", fontWeight: 600 }}>
            Hire Me
          </a>
        </div>
      </header>
    </>
  );
}
