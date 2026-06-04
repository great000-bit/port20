import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Cat = "all"|"wordpress"|"uiux"|"webdev";

const PROJECTS = [
  { title:"Bellostylez Blog (Canada)",      cat:"wordpress", img:"/bellow-stylus.webp", desc:"A stylish beauty & lifestyle blog for a Canadian brand — built with WordPress and optimised for SEO and readability.",        tags:["WordPress","Divi","Blog","SEO"],             link:"https://bellostylez.ca/blog/",                           badge:"WordPress" },
  { title:"Bourdillon Omijeh Foundation",   cat:"uiux",      img:"/bof.webp",          desc:"Nonprofit site built for clarity and credibility — designed in Figma, developed for accessibility and brand trust.",           tags:["WordPress","Figma","UI/UX","Nonprofit"],    link:"https://www.bourdillonomijehfoundation.com/",            badge:"UI/UX" },
  { title:"YouthUp Global – EmpowerAfrika", cat:"wordpress", img:"/youthup.webp",       desc:"International youth initiative website — responsive, accessible, and SEO-optimised WordPress build.",                          tags:["WordPress","Elementor","Accessibility","SEO"],link:"https://youthupglobal.com/empowerafrika/",               badge:"WordPress" },
  { title:"SuiBiz — Web3 Marketplace UI",  cat:"uiux",      img:"/suibiz.webp",        desc:"UI/UX design for a decentralised Web3 marketplace targeting professionals on the Sui blockchain.",                             tags:["Web3","Marketplace","UI/UX","Figma"],       link:"https://suibiz.vercel.app/",                             badge:"UI/UX" },
  { title:"Hair Brosh Saloon",             cat:"uiux",      img:"/webbb.webp",         desc:"Pixel-perfect, responsive salon website — designed in Figma and developed with modern CSS and clean component architecture.",  tags:["Figma","Responsive","UI/UX","CSS"],          link:"https://hairbrosh-ui-kit.vercel.app/",                   badge:"UI/UX" },
  { title:"WaContacts — WhatsApp Business",cat:"uiux",      img:"/wacontacts.png",     desc:"Comprehensive WhatsApp business directory platform connecting Nigerian SMEs with real customers.",                              tags:["UI/UX","Business Platform","WhatsApp"],      link:"https://wacontacts.com/",                                badge:"Product" },
  { title:"AdsFirr — Meta Ads Platform",   cat:"uiux",      img:"/adsfirr.png",        desc:"Strategic ad management platform UI for Meta and Instagram campaigns — dashboard design, analytics, and ad management.",       tags:["UI/UX","Meta Ads","Dashboard","Analytics"],  link:"https://adsfirr.vercel.app/",                            badge:"UI/UX" },
  { title:"Timini Egbuson — Actor Portfolio",cat:"webdev",  img:"/timini.png",         desc:"Stunning digital portfolio for Nollywood rising star Timini Egbuson — React, modern animations, mobile-first.",               tags:["React","Web Dev","Portfolio","Responsive"],  link:"https://timini-egbuson-website-star.vercel.app/",        badge:"Web Dev" },
  { title:"Funke Akindele — Official Site", cat:"webdev",   img:"/funke.png",          desc:"Official website for iconic actress and director Funke Akindele — premium design, React, and performant build.",               tags:["React","Web Dev","Celebrity","Design"],       link:"https://funke-akindele-unveiled.vercel.app/",            badge:"Web Dev" },
  { title:"Ego Nwosu — Cinematic Portfolio",cat:"webdev",   img:"/ego.png",            desc:"Cinematic digital showcase for Nollywood actress Ego Nwosu — dark aesthetic, smooth interactions, React.",                    tags:["React","Web Dev","Portfolio","Cinema"],       link:"https://ego-cinematic-muse.vercel.app/",                 badge:"Web Dev" },
  { title:"The Light Mission — NGO",        cat:"webdev",   img:"/thelightmission.png",desc:"Full-stack Laravel + React website for The Light Mission NGO — enrollment system, admin dashboard, Facebook Pixel tracking.",   tags:["Laravel","React","NGO","Full-Stack"],         link:"https://www.thelightmission.com/",                       badge:"Full-Stack" },
  { title:"Wizor Progress — Real Estate",  cat:"webdev",   img:"/wizor.png",          desc:"Professional portfolio website for a real estate manager — responsive, elegant, business-focused React build.",                 tags:["React","Web Dev","Real Estate","Responsive"], link:"https://wizor-progress-hub.vercel.app/",                 badge:"Web Dev" },
];

const FILTERS: {label:string; value:Cat}[] = [
  {label:"All",value:"all"},{label:"WordPress",value:"wordpress"},{label:"UI/UX & Design",value:"uiux"},{label:"Web Development",value:"webdev"},
];

const BADGE_COLORS: Record<string,string> = {
  "WordPress":"rgba(59,130,246,0.85)","UI/UX":"rgba(111,4,20,0.85)","Product":"rgba(139,92,246,0.85)",
  "Web Dev":"rgba(16,185,129,0.85)","Full-Stack":"rgba(245,158,11,0.85)","Cinema":"rgba(111,4,20,0.85)",
};

export default function Portfolio() {
  const [filter,setFilter] = useState<Cat>("all");
  const [showAll,setShowAll] = useState(false);
  const shown = PROJECTS.filter(p=>filter==="all"||p.cat===filter);
  const displayed = showAll ? shown : shown.slice(0,6);

  return (
    <section id="portfolio" className="section bg-black">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-10">
          <span className="section-label">My Work</span>
          <h2 className="font-heading text-4xl md:text-5xl text-white mt-3">Featured Projects</h2>
          <div style={{width:48,height:3,background:"var(--accent)",borderRadius:2,margin:"16px auto 0"}}/>
          <p className="font-body text-white/50 mt-4 max-w-lg mx-auto">A collection of projects built with passion and attention to detail</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {FILTERS.map(f=>(
            <button key={f.value} onClick={()=>{setFilter(f.value);setShowAll(false);}}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={filter===f.value
                ? {background:"var(--accent)",color:"#fff",border:"1px solid var(--accent)"}
                : {background:"transparent",color:"rgba(255,255,255,0.5)",border:"1px solid rgba(255,255,255,0.12)"}}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {displayed.map((p,i)=>(
            <article key={i} className="glass rounded-2xl overflow-hidden group hover:-translate-y-1.5 transition-all duration-300"
              style={{borderColor:"rgba(255,255,255,0.07)"}}
              onMouseEnter={e=>(e.currentTarget.style.borderColor="rgba(111,4,20,0.50)")}
              onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(255,255,255,0.07)")}>
              {/* thumbnail */}
              <div className="relative overflow-hidden" style={{aspectRatio:"16/9",background:"#0a0a0a"}}>
                <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy"/>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{background:"rgba(0,0,0,0.35)"}}/>
                <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full text-white"
                  style={{background:BADGE_COLORS[p.badge]||"rgba(111,4,20,0.85)"}}>
                  {p.badge}
                </span>
              </div>
              {/* content */}
              <div className="p-5">
                <h3 className="font-heading font-semibold text-white mb-2 group-hover:text-red-300 transition-colors line-clamp-1">{p.title}</h3>
                <p className="font-body text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.slice(0,3).map(t=>(
                    <span key={t} className="text-xs px-2 py-0.5 rounded"
                      style={{background:"rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.45)",border:"1px solid rgba(255,255,255,0.08)"}}>
                      {t}
                    </span>
                  ))}
                  {p.tags.length>3&&<span className="text-xs px-2 py-0.5 rounded" style={{color:"rgba(255,255,255,0.3)"}}>+{p.tags.length-3}</span>}
                </div>
                <a href={p.link} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{border:"1px solid rgba(255,255,255,0.10)",color:"rgba(255,255,255,0.55)"}}
                  onMouseEnter={e=>{const el=e.currentTarget;el.style.borderColor="var(--accent)";el.style.color="var(--accent)";}}
                  onMouseLeave={e=>{const el=e.currentTarget;el.style.borderColor="rgba(255,255,255,0.10)";el.style.color="rgba(255,255,255,0.55)";}}>
                  View Project <ArrowUpRight size={14}/>
                </a>
              </div>
            </article>
          ))}
        </div>

        {shown.length>6&&(
          <div className="text-center">
            <button onClick={()=>setShowAll(v=>!v)} className="btn-outline">
              {showAll?`Show Less`:`View All ${shown.length} Projects`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
