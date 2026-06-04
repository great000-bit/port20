import { Github, Linkedin, Instagram } from "lucide-react";

const LINKS = ["About","Services","Experience","Projects","Contact"];
const SOCIALS = [
  { icon:<Linkedin size={16}/>,  href:"https://www.linkedin.com/in/great-emman-wori", label:"LinkedIn" },
  { icon:<Instagram size={16}/>, href:"https://msng.link/o?creative_emman=ig",        label:"Instagram" },
  { icon:<Github size={16}/>,    href:"https://github.com/great000-bit",               label:"GitHub" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t" style={{borderColor:"rgba(255,255,255,0.07)"}}>
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Brand */}
          <div>
            <p className="font-heading text-xl font-bold mb-2">
              <span style={{color:"var(--accent)"}}>Great</span>
              <span className="text-white"> Emman-Wori</span>
            </p>
            <p className="font-body text-sm text-white/40 max-w-xs">
              WordPress Developer · Product Designer · UI/UX Designer
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-heading text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Quick Links</p>
            <nav className="flex flex-col gap-2">
              {LINKS.map(l=>(
                <a key={l} href={`#${l.toLowerCase()}`}
                  className="font-body text-sm text-white/45 hover:text-white transition-colors">{l}</a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <p className="font-heading text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Connect With Me</p>
            <div className="flex gap-3">
              {SOCIALS.map(s=>(
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.55)"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="var(--accent)";e.currentTarget.style.borderColor="var(--accent)";e.currentTarget.style.color="#fff";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.05)";e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";e.currentTarget.style.color="rgba(255,255,255,0.55)";}}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{borderTop:"1px solid rgba(255,255,255,0.05)"}}>
          <p className="font-body text-xs text-white/30">© {new Date().getFullYear()} Great Emman-Wori. All rights reserved.</p>
          <p className="font-body text-xs text-white/20">WordPress Developer · UI/UX Designer · Product Designer</p>
        </div>
      </div>
    </footer>
  );
}
