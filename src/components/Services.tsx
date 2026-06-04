import { Globe, Palette, ShoppingCart, Sparkles, Code, Video } from "lucide-react";

const SERVICES = [
  {
    icon: <Globe size={28}/>,
    title:"WordPress Website Development",
    sub:"Custom CMS & Responsive Builds",
    desc:"Custom responsive WordPress websites with Elementor, Divi, or custom blocks. Business sites, landing pages, blogs, and portfolios — built for speed, SEO, and scale.",
    tags:["WordPress","Elementor","CMS","Responsive","SEO"],
  },
  {
    icon: <Palette size={28}/>,
    title:"UI/UX & Product Design",
    sub:"Figma · Framer · User-Centered",
    desc:"User flows, wireframes, interface design, and clickable prototypes. Product-minded design that balances usability with visual excellence and conversion outcomes.",
    tags:["Figma","UX Research","Prototyping","Product Design"],
  },
  {
    icon: <ShoppingCart size={28}/>,
    title:"E-commerce & Landing Pages",
    sub:"WooCommerce · Conversion-Focused",
    desc:"WooCommerce stores, product pages, sales funnels, and high-converting landing pages. Built to turn visitors into customers with clean UX and smart page structure.",
    tags:["WooCommerce","Conversion","SEO","Checkout UX"],
  },
  {
    icon: <Sparkles size={28}/>,
    title:"Brand & Web Experience Design",
    sub:"Visual Identity · Storytelling",
    desc:"Visual identity direction, website storytelling, portfolio design, and interaction design. Your digital presence, elevated to reflect the quality of your work.",
    tags:["Branding","Visual Design","Interaction","Web Experience"],
  },
  {
    icon: <Code size={28}/>,
    title:"Full-Stack Web Development",
    sub:"React · TypeScript · Laravel",
    desc:"Full-stack web applications built with React, TypeScript, and Laravel. From startup MVPs and SaaS dashboards to custom business tools — clean code, strong architecture.",
    tags:["React","TypeScript","Laravel","Full-Stack"],
  },
  {
    icon: <Video size={28}/>,
    title:"Content, Media & AI Tooling",
    sub:"Video · Copywriting · Automation",
    desc:"Mobile videography, video editing, ghostwriting, social media management, and prompt engineering for AI workflows. End-to-end content that amplifies your brand.",
    tags:["Video Editing","Copywriting","Social Media","AI/Automation"],
  },
];

export default function Services() {
  return (
    <section id="services" className="section bg-[#030303]">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14">
          <span className="section-label">What I Do</span>
          <h2 className="font-heading text-4xl md:text-5xl text-white mt-3">Services</h2>
          <div style={{width:48,height:3,background:"var(--accent)",borderRadius:2,margin:"16px auto 0"}}/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s,i)=>(
            <article key={i} className="glass rounded-2xl p-7 group hover:-translate-y-1.5 transition-all duration-300"
              style={{borderColor:"rgba(255,255,255,0.07)"}}
              onMouseEnter={e=>(e.currentTarget.style.borderColor="rgba(111,4,20,0.55)")}
              onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(255,255,255,0.07)")}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300"
                style={{background:"rgba(111,4,20,0.12)",border:"1px solid rgba(111,4,20,0.30)",color:"var(--accent)"}}>
                {s.icon}
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-1 group-hover:text-[#e87] transition-colors">{s.title}</h3>
              <p className="font-body text-xs mb-3" style={{color:"var(--accent)",letterSpacing:"0.04em"}}>{s.sub}</p>
              <p className="font-body text-sm text-white/55 leading-relaxed mb-5">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map(t=>(
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full"
                    style={{background:"rgba(111,4,20,0.10)",border:"1px solid rgba(111,4,20,0.25)",color:"rgba(255,255,255,0.55)"}}>
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
