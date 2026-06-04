import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { label:"About",      href:"#about" },
  { label:"Services",   href:"#services" },
  { label:"Experience", href:"#experience" },
  { label:"Projects",   href:"#portfolio" },
  { label:"Contact",    href:"#contact" },
];

export default function Navbar() {
  const [open, setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const ticking = useRef(false);

  // Lightweight scroll handler — throttled via requestAnimationFrame
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for active section — zero scroll cost
  useEffect(() => {
    const ids = ["hero","about","services","experience","portfolio","contact"];
    const observers: IntersectionObserver[] = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-black/85 backdrop-blur-xl border-b border-white/5 shadow-lg"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" onClick={close} className="text-xl font-heading font-bold tracking-tight">
          <span style={{color:"var(--accent)"}}>Great</span>
          <span className="text-white"> Emman-Wori</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 glass rounded-full px-4 py-2">
          {NAV.map(n => {
            const isActive = active === n.href.slice(1);
            return (
              <a
                key={n.href} href={n.href}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-white" : "text-white/55 hover:text-white"
                }`}
                style={isActive ? {background:"var(--accent)"} : {}}
              >
                {n.label}
              </a>
            );
          })}
        </nav>

        {/* CTA */}
        <a href="#contact" className="hidden md:inline-flex btn-red text-sm">Hire Me →</a>

        {/* Hamburger */}
        <button
          className="md:hidden w-9 h-9 rounded-full glass flex items-center justify-center text-white"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={18}/> : <Menu size={18}/>}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 ${
        open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
      }`}>
        <nav className="max-w-7xl mx-auto px-5 py-6 flex flex-col gap-2">
          {NAV.map(n => (
            <a key={n.href} href={n.href} onClick={close}
              className="px-4 py-3 rounded-xl text-sm font-medium text-white/65 hover:text-white hover:bg-white/5 transition-all">
              {n.label}
            </a>
          ))}
          <a href="#contact" onClick={close} className="btn-red mt-2 justify-center">Hire Me →</a>
        </nav>
      </div>
    </header>
  );
}
