import { useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const NAV = [
  { label:"About",      href:"#about" },
  { label:"Services",   href:"#services" },
  { label:"Experience", href:"#experience" },
  { label:"Projects",   href:"#portfolio" },
  { label:"Contact",    href:"#contact" },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]   = useState("hero");
  const ticking               = useRef(false);
  const { theme, toggle }     = useTheme();
  const isDark                = theme === "dark";

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => { setScrolled(window.scrollY > 40); ticking.current = false; });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["hero","about","services","experience","portfolio","contact"];
    const obs = ids.map(id => {
      const el = document.getElementById(id); if (!el) return null;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin:"-40% 0px -55% 0px", threshold:0 }
      );
      o.observe(el); return o;
    });
    return () => obs.forEach(o => o?.disconnect());
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <style>{`
        .nav-header {
          position: fixed; top: 0; left: 0; width: 100%; z-index: 50;
          transition: background 0.3s, padding 0.3s;
        }
        .nav-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 clamp(20px,4vw,56px);
          height: 72px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px;
        }
        /* Logo */
        .nav-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; flex-shrink: 0;
        }
        .nav-logo-img {
          width: 34px; height: 34px; border-radius: 50%;
          object-fit: cover; object-position: center top;
          border: 1px solid rgba(111,4,20,0.45);
          flex-shrink: 0;
        }
        .nav-logo-text {
          font-family: Geist,Arial,sans-serif;
          font-size: 15px; font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--fg);
        }
        /* Pill nav — Omijeh style */
        .nav-pill {
          display: flex; align-items: center; gap: 2px;
          padding: 5px; border-radius: 999px;
          background: var(--nav-pill);
          border: 1px solid var(--nav-pill-border);
        }
        .nav-link {
          padding: 6px 14px; border-radius: 999px;
          font-family: Arial,sans-serif; font-size: 13px; font-weight: 500;
          text-decoration: none; transition: all 0.2s;
          color: var(--fg-muted);
          white-space: nowrap;
        }
        .nav-link:hover { color: var(--fg); }
        .nav-link.active {
          background: var(--accent);
          color: var(--fg);
        }
        /* Theme toggle */
        .nav-theme-btn {
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: var(--nav-pill); border: 1px solid var(--nav-pill-border);
          cursor: pointer; color: var(--fg-muted);
          transition: all 0.2s; flex-shrink: 0;
        }
        .nav-theme-btn:hover { color: var(--fg); }
        /* Right group */
        .nav-right {
          display: flex; align-items: center; gap: 10px;
        }
        /* Hire Me */
        .nav-cta {
          display: inline-flex; align-items: center;
          padding: 7px 18px; border-radius: 8px;
          font-family: Arial,sans-serif; font-size: 13px; font-weight: 600;
          background: var(--accent); color: #ffffff;
          border: 1px solid var(--accent); text-decoration: none;
          transition: background 0.2s; white-space: nowrap;
        }
        .nav-cta:hover { background: #8a0519; }
        /* Hamburger */
        .nav-hamburger {
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: var(--nav-pill); border: 1px solid var(--nav-pill-border);
          cursor: pointer; color: var(--fg);
        }
        /* Mobile menu — Omijeh style: slide from top, pill-shaped */
        .nav-mobile {
          position: absolute; top: 80px; left: 50%; transform: translateX(-50%);
          width: calc(100% - 40px); max-width: 420px;
          border-radius: 20px;
          background: var(--nav-bg);
          border: 1px solid var(--border);
          padding: 12px;
          transition: opacity 0.25s, transform 0.25s;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .nav-mobile.closed {
          opacity: 0; pointer-events: none;
          transform: translateX(-50%) translateY(-8px);
        }
        .nav-mobile.open {
          opacity: 1; pointer-events: all;
          transform: translateX(-50%) translateY(0);
        }
        .nav-mobile-link {
          display: block; padding: 11px 16px; border-radius: 12px;
          font-family: Arial,sans-serif; font-size: 15px; font-weight: 500;
          color: var(--fg-muted); text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .nav-mobile-link:hover { background: var(--card-bg); color: var(--fg); }
        .nav-mobile-divider {
          height: 1px; background: var(--border); margin: 8px 0;
        }
        @media (min-width: 768px) {
          .nav-hamburger { display: none; }
          .nav-mobile { display: none; }
        }
        @media (max-width: 767px) {
          .nav-pill-wrap { display: none; }
          .nav-cta { display: none; }
          .nav-logo-text { display: none; }
          .nav-logo { display: none; }
          .nav-right { display: none; }

          /* Centered floating pill on mobile */
          .nav-header {
            background: transparent !important;
            border: none !important;
          }
          .nav-inner {
            height: auto;
            padding: 14px 20px;
            justify-content: center;
          }
          /* Single centered pill containing avatar + theme + menu */
          .nav-mobile-pill {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 10px 20px;
            border-radius: 999px;
            background: rgba(20,20,20,0.85);
            border: 1px solid rgba(255,255,255,0.10);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
          }
          [data-theme="light"] .nav-mobile-pill {
            background: rgba(248,247,244,0.90);
            border-color: rgba(0,0,0,0.10);
          }
          .nav-logo-img {
            width: 38px; height: 38px;
          }
        }
        @media (min-width: 768px) {
          .nav-mobile-pill { display: none; }
        }
      `}</style>

      <header className="nav-header"
        style={{ background: scrolled ? "var(--nav-bg)" : "transparent",
                 borderBottom: scrolled ? "1px solid var(--border-soft)" : "none" }}
      >
        <div className="nav-inner">
          {/* Logo — desktop only */}
          <a href="#hero" onClick={close} className="nav-logo">
            <img src="/great-emman-wori-fullstack-developer.png" alt="Great Emman-Wori"
              className="nav-logo-img" loading="eager"/>
            <span className="nav-logo-text" style={{color:"var(--accent)"}}>Great</span>
            <span className="nav-logo-text" style={{marginLeft:3}}>Emman-Wori</span>
          </a>

          {/* Desktop pill nav */}
          <nav className="nav-pill-wrap nav-pill" aria-label="Main navigation">
            {NAV.map(n => (
              <a key={n.href} href={n.href}
                className={`nav-link${active === n.href.slice(1) ? " active" : ""}`}>
                {n.label}
              </a>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="nav-right">
            <button onClick={toggle} className="nav-theme-btn" aria-label="Toggle theme">
              {isDark ? <Sun size={15}/> : <Moon size={15}/>}
            </button>
            <a href="#contact" className="nav-cta">Hire Me →</a>
            <button className="nav-hamburger md:hidden" onClick={() => setOpen(o => !o)}
              aria-label={open ? "Close menu" : "Open menu"}>
              {open ? <X size={16}/> : <Menu size={16}/>}
            </button>
          </div>

          {/* ── MOBILE: centered floating pill ── */}
          <div className="nav-mobile-pill" aria-hidden="false" role="navigation">
            <a href="#hero" onClick={close}>
              <img src="/great-emman-wori-fullstack-developer.png" alt="Great Emman-Wori"
                className="nav-logo-img" loading="eager"/>
            </a>
            <button onClick={toggle} className="nav-theme-btn" aria-label="Toggle theme">
              {isDark ? <Sun size={16}/> : <Moon size={16}/>}
            </button>
            <button className="nav-hamburger" onClick={() => setOpen(o => !o)}
              aria-label={open ? "Close menu" : "Open menu"}>
              {open ? <X size={16}/> : <Menu size={16}/>}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`nav-mobile ${open ? "open" : "closed"}`}>
          {NAV.map(n => (
            <a key={n.href} href={n.href} onClick={close} className="nav-mobile-link">
              {n.label}
            </a>
          ))}
          <div className="nav-mobile-divider"/>
          <a href="#contact" onClick={close} className="nav-mobile-link"
            style={{ color:"var(--accent)", fontWeight:600 }}>
            Hire Me →
          </a>
        </div>
      </header>
    </>
  );
}
