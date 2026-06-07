import { Github, Linkedin, Instagram } from "lucide-react";

const LINKS = [
  {label:"About",     href:"#about"},
  {label:"Services",  href:"#services"},
  {label:"Experience",href:"#experience"},
  {label:"Projects",  href:"#portfolio"},
  {label:"Contact",   href:"#contact"},
];
const SOCIALS = [
  {icon:<Linkedin size={16}/>, href:"https://www.linkedin.com/in/great-emman-wori", label:"Connect with Great Emman-Wori on LinkedIn"},
  {icon:<Instagram size={16}/>,href:"https://msng.link/o?creative_emman=ig",        label:"Follow Great Emman-Wori on Instagram"},
  {icon:<Github size={16}/>,   href:"https://github.com/great000-bit",               label:"View Great Emman-Wori's GitHub profile"},
];

export default function Footer() {
  return (
    <footer className="bg-black border-t" style={{borderColor:"rgba(255,255,255,0.06)"}}>
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">

          {/* Brand */}
          <div>
            <p className="font-heading text-xl font-bold mb-1">
              <span style={{color:"var(--accent)"}}>Great</span>
              <span className="text-white"> Emman-Wori</span>
            </p>
            <p className="font-body text-sm text-white/35 max-w-xs leading-relaxed">
              Fullstack Website Developer · Product Designer · UI/UX Designer<br/>
              <span className="text-white/20">Port Harcourt, Nigeria — Available Remotely</span>
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-heading text-xs font-semibold text-white/25 uppercase tracking-widest mb-4">Quick Links</p>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-2">
                {LINKS.map(l=>(
                  <li key={l.label}>
                    <a href={l.href} className="font-body text-sm text-white/40 hover:text-white transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h2 className="font-heading text-xs font-semibold text-white/25 uppercase tracking-widest mb-4">Connect With Me</h2>
            <div className="flex gap-3">
              {SOCIALS.map(s=>(
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center social-link"
                  style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.50)"}}
                  {s.icon}
                </a>
              ))}
            </div>
            <p className="font-body text-xs text-white/25 mt-4 max-w-[180px] leading-relaxed">
              greatemmanwori@gmail.com<br/>
              +234 810 388 7554
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{borderTop:"1px solid rgba(255,255,255,0.05)"}}>
          <p className="font-body text-xs text-white/25">© {new Date().getFullYear()} Great Emman-Wori. All rights reserved.</p>
          <p className="font-body text-xs text-white/18">Fullstack Website Developer · Port Harcourt, Nigeria</p>
        </div>
      </div>
    </footer>
  );
}
