import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function GraphicsNav() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .gx-nav {
          position: fixed; top: 0; left: 0; width: 100%; z-index: 50;
          transition: background 0.3s, border-color 0.3s;
        }
        .gx-nav-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 clamp(20px,4vw,56px); height: 72px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .gx-nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .gx-nav-logo-img { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; border: 1px solid rgba(111,4,20,0.45); }
        .gx-nav-logo-text { font-family: "Clash Display", Geist, Arial, sans-serif; font-size: 15px; font-weight: 600; letter-spacing: -0.02em; color: var(--fg); }
        .gx-nav-logo-accent { color: var(--accent); }
        .gx-nav-badge {
          font-family: Arial, sans-serif; font-size: 11px; font-weight: 600;
          letter-spacing: 0.03em; text-transform: uppercase;
          color: var(--fg-faint); border: 1px solid var(--border); border-radius: 999px;
          padding: 4px 10px; margin-left: 4px;
        }
        .gx-nav-theme-btn {
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: var(--nav-pill); border: 1px solid var(--nav-pill-border);
          cursor: pointer; color: var(--fg-muted); transition: color 0.2s;
        }
        .gx-nav-theme-btn:hover { color: var(--fg); }
      `}</style>
      <header
        className="gx-nav"
        style={{
          background: scrolled ? "var(--nav-bg)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border-soft)" : "none",
        }}
      >
        <div className="gx-nav-inner">
          <a href="/graphics" className="gx-nav-logo">
            <img src="/great-emman-wori-fullstack-developer.png" alt="Great Emman-Wori" className="gx-nav-logo-img" />
            <span className="gx-nav-logo-text">
              <span className="gx-nav-logo-accent">Great</span> Emman-Wori
            </span>
            <span className="gx-nav-badge">Graphics</span>
          </a>
          <button onClick={toggle} className="gx-nav-theme-btn" aria-label="Toggle theme">
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </header>
    </>
  );
}
