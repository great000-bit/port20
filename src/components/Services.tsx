import { Globe, Palette, ShoppingCart, Sparkles, Code, Video } from "lucide-react";

const SERVICES = [
  {
    icon:<Code size={28}/>,
    title:"Fullstack Website Development",
    sub:"Frontend · Backend · Full-Stack",
    desc:"I build responsive, scalable websites and web applications using modern frontend and backend technologies. From React and TypeScript frontends to Laravel and Node.js backends — clean code, strong architecture, production-ready.",
    tags:["React","TypeScript","Laravel","Node.js","Fullstack","Responsive"],
  },
  {
    icon:<Globe size={28}/>,
    title:"Frontend Development",
    sub:"React · Tailwind · Modern Interfaces",
    desc:"I create clean, animated, responsive user interfaces with strong attention to usability, accessibility, and performance. Modern web interfaces that look sharp on every screen size and device.",
    tags:["React","Tailwind CSS","Vite","Animations","Responsive UI"],
  },
  {
    icon:<Palette size={28}/>,
    title:"Product Design & UI/UX",
    sub:"Figma · User-Centered · Outcome-Driven",
    desc:"I design user flows, wireframes, interfaces, and digital product experiences that are clear, usable, and visually strong. Product-minded design that balances usability with visual excellence and conversion outcomes.",
    tags:["Figma","UX Research","Prototyping","Product Design","Interface Design"],
  },
  {
    icon:<ShoppingCart size={28}/>,
    title:"Landing Pages & Business Websites",
    sub:"Conversion-Focused · SEO-Ready",
    desc:"I build focused landing pages and business websites designed to communicate value clearly and increase conversions. Built with performance, SEO, and the user journey in mind from the start.",
    tags:["Landing Pages","Business Website","Conversion","SEO-Ready","WordPress"],
  },
  {
    icon:<Sparkles size={28}/>,
    title:"Portfolio & Personal Brand Websites",
    sub:"Premium · Memorable · Credibility-Building",
    desc:"I create premium portfolio websites for creatives, founders, professionals, and technical talent. Designed to make a strong first impression and position you as a credible, serious professional.",
    tags:["Portfolio Website","Personal Brand","React","Design System"],
  },
  {
    icon:<Video size={28}/>,
    title:"Content, Media & AI Tooling",
    sub:"Video · Copywriting · Automation",
    desc:"Mobile videography, video editing, ghostwriting, social media management, and prompt engineering for AI workflows. End-to-end content creation that amplifies your brand and drives audience growth.",
    tags:["Video Editing","Copywriting","Social Media","AI Workflows","Automation"],
  },
];

export default function Services() {
  return (
    <section id="services" className="section bg-[#030303]" aria-label="Services offered by Great Emman-Wori">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="section-label">What I Build</span>
          <h2 className="font-heading text-4xl md:text-5xl text-white mt-3">Services</h2>
          <div style={{width:48,height:3,background:"var(--accent)",borderRadius:2,margin:"16px auto 0"}}/>
          <p className="font-body text-white/45 mt-4 max-w-lg mx-auto">
            Fullstack website development, product design, and UI/UX services for brands, businesses, and founders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s,i)=>(
            <article key={i} className="glass rounded-2xl p-7 group card-hover"
              style={{borderColor:"rgba(255,255,255,0.07)"}}
              data-aos="fade-up"
              data-aos-delay={i * 80}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300"
                style={{background:"rgba(111,4,20,0.10)",border:"1px solid rgba(111,4,20,0.25)",color:"var(--accent)"}}>
                {s.icon}
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-1 group-hover:text-red-300 transition-colors">{s.title}</h3>
              <p className="font-body text-xs mb-3" style={{color:"var(--accent)",letterSpacing:"0.04em"}}>{s.sub}</p>
              <p className="font-body text-sm text-white/52 leading-relaxed mb-5">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map(t=>(
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full"
                    style={{background:"rgba(111,4,20,0.08)",border:"1px solid rgba(111,4,20,0.20)",color:"rgba(255,255,255,0.50)"}}>
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
