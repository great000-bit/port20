import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function MotionNav() {
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
        .mo-nav {
          position: fixed; top: 0; left: 0; width: 100%; z-index: 50;
          transition: background 0.3s, border-color 0.3s;
        }
        .mo-nav-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 clamp(20px,4vw,56px); height: 72px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .mo-nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .mo-nav-logo-img { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; border: 1px solid rgba(95,107,31,0.45); }
        .mo-nav-logo-text { font-family: "Clash Display", Geist, Arial, sans-serif; font-size: 15px; font-weight: 600; letter-spacing: -0.02em; color: var(--fg); }
        .mo-nav-logo-accent { color: var(--accent-text); }
        .mo-nav-badge {
          font-family: Arial, sans-serif; font-size: 11px; font-weight: 600;
          letter-spacing: 0.03em; text-transform: uppercase;
          color: var(--fg-faint); border: 1px solid var(--border); border-radius: 999px;
          padding: 4px 10px; margin-left: 4px;
        }
        .mo-nav-theme-btn {
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: var(--nav-pill); border: 1px solid var(--nav-pill-border);
          cursor: pointer; color: var(--fg-muted); transition: color 0.2s;
        }
        .mo-nav-theme-btn:hover { color: var(--fg); }
      `}</style>
      <header
        className="mo-nav"
        style={{
          background: scrolled ? "var(--nav-bg)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border-soft)" : "none",
        }}
      >
        <div className="mo-nav-inner">
          <a href="/motion" className="mo-nav-logo">
            <img src="/great-emman-wori-2026.webp" alt="Great" className="mo-nav-logo-img" />
            <span className="mo-nav-logo-text">
              <span className="mo-nav-logo-accent">Great</span>
            </span>
            <span className="mo-nav-badge">Motion</span>
          </a>
          <button onClick={toggle} className="mo-nav-theme-btn" aria-label="Toggle theme">
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </header>
    </>
  );
}
