import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { profile } from "@/data/uiux";
import "./uiux.css";

export default function UiUxNav() {
  const { theme, toggle } = useTheme();
  const { pathname, search } = useLocation();
  const [open, setOpen] = useState(false);
  const onAbout = pathname === "/uiux" && search.includes("tab=about");
  const onWork = pathname.startsWith("/uiux") && !onAbout;

  return (
    <header className="ux-nav">
      <div className="ux-nav-inner">
        <Link to="/uiux" className="ux-logo" aria-label="UI/UX portfolio home">
          <img src={profile.avatar} alt="" className="ux-logo-img" width={28} height={28} />
          <span className="ux-logo-name"><span>Great</span> Emman-Wori</span>
          <span className="ux-logo-tag">UI/UX</span>
        </Link>
        <nav id="ux-menu" className={`ux-nav-links${open ? " is-open" : ""}`} aria-label="UI/UX portfolio" onClick={() => setOpen(false)}>
          <Link to="/uiux" className={`ux-nav-link${onWork ? " is-active" : ""}`}>Work</Link>
          <Link to="/uiux?tab=about" className={`ux-nav-link${onAbout ? " is-active" : ""}`}>About</Link>
          <Link to="/graphics" className="ux-nav-link">Graphics</Link>
          <Link to="/" className="ux-nav-link">Main portfolio</Link>
          <a href="#contact" className="ux-nav-link" onClick={(e) => { const el = document.getElementById("contact"); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); } }}>Contact</a>
        </nav>
        <div className="ux-nav-actions">
          <button type="button" className="ux-icon-btn ux-menu-btn" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="ux-menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
          <button type="button" onClick={toggle} className="ux-icon-btn" aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <a className="ux-btn ux-btn-primary ux-btn-sm" href={profile.whatsapp} target="_blank" rel="noopener noreferrer">
            Hire me
          </a>
        </div>
      </div>
    </header>
  );
}
