import { Github, Linkedin, Instagram } from "lucide-react";

const SOCIALS = [
  { icon:<Linkedin size={14}/>, href:"https://www.linkedin.com/in/great-emman-wori", label:"LinkedIn" },
  { icon:<Instagram size={14}/>,href:"https://msng.link/o?creative_emman=ig",        label:"Instagram" },
  { icon:<Github size={14}/>,   href:"https://github.com/great000-bit",               label:"GitHub" },
];

const NAV = [
  { label:"About",      href:"#about" },
  { label:"Services",   href:"#services" },
  { label:"Experience", href:"#experience" },
  { label:"Projects",   href:"#portfolio" },
  { label:"Contact",    href:"#contact" },
];

export default function Footer() {
  return (
    <footer style={{
      background:"#000",
      borderTop:"1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{
        maxWidth:1280, margin:"0 auto",
        padding:"28px clamp(24px,5vw,64px)",
        display:"flex", flexWrap:"wrap",
        alignItems:"center", justifyContent:"space-between",
        gap:20,
      }}>
        {/* Left — copyright */}
        <p style={{
          fontFamily:"Arial,sans-serif", fontSize:12,
          color:"rgba(255,255,255,0.22)", margin:0,
          letterSpacing:"0.02em",
        }}>
          © MMXXVI · Great Emman-Wori · All rights reserved
        </p>

        {/* Centre — nav links */}
        <nav style={{ display:"flex", gap:24, flexWrap:"wrap" }} aria-label="Footer navigation">
          {NAV.map(l => (
            <a key={l.label} href={l.href} style={{
              fontFamily:"Arial,sans-serif", fontSize:12,
              color:"rgba(255,255,255,0.28)", textDecoration:"none",
              transition:"color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color="#fff")}
            onMouseLeave={e => (e.currentTarget.style.color="rgba(255,255,255,0.28)")}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right — social icons */}
        <div style={{ display:"flex", gap:16, alignItems:"center" }}>
          {SOCIALS.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              aria-label={s.label}
              style={{
                color:"rgba(255,255,255,0.28)", textDecoration:"none",
                transition:"color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color="#fff")}
              onMouseLeave={e => (e.currentTarget.style.color="rgba(255,255,255,0.28)")}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
