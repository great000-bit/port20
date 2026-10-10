import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function WorkNav() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .wk-nav { position: fixed; top: 0; left: 0; width: 100%; z-index: 50; transition: background .3s, border-color .3s; }
        .wk-nav-inner { max-width: 1180px; margin: 0 auto; padding: 0 clamp(20px,4vw,56px); height: 72px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .wk-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .wk-logo-img { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; border: 1px solid rgba(111,4,20,.45); }
        .wk-logo-text { font: 600 15px Geist, Arial, sans-serif; letter-spacing: -.02em; color: var(--fg); }
        .wk-logo-text span { color: var(--accent); }
        .wk-links { display: flex; align-items: center; gap: clamp(12px, 2.5vw, 28px); }
        .wk-link { font: 500 13px Arial, sans-serif; color: var(--fg-muted); text-decoration: none; transition: color .2s; }
        .wk-link:hover { color: var(--accent); }
        .wk-theme { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--nav-pill); border: 1px solid var(--nav-pill-border); cursor: pointer; color: var(--fg-muted); transition: color .2s; }
        .wk-theme:hover { color: var(--fg); }
        @media (max-width: 520px) { .wk-link-secondary { display: none; } }
      `}</style>
      <header
        className="wk-nav"
        style={{
          background: scrolled ? "var(--nav-bg)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border-soft)" : "none",
        }}
      >
        <div className="wk-nav-inner">
          <Link to="/" className="wk-logo" aria-label="Great Emman-Wori home">
            <img src="/great-emman-wori-fullstack-developer.png" alt="" className="wk-logo-img" width={34} height={34} />
            <span className="wk-logo-text"><span>Great</span> Emman-Wori</span>
          </Link>
          <nav className="wk-links" aria-label="Case study navigation">
            <Link to="/#portfolio" className="wk-link">All projects</Link>
            <Link to="/graphics" className="wk-link wk-link-secondary">Graphics</Link>
            <button type="button" onClick={toggle} className="wk-theme" aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}
