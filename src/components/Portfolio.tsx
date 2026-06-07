import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Cat = "all"|"fullstack"|"uiux"|"landing";

const PROJECTS = [
  { title:"The Light Mission NGO Website",   cat:"fullstack", img:"/thelightmission.png",  alt:"Fullstack NGO website built with Laravel and React by Great Emman-Wori", desc:"Full-stack Laravel 12 + React/TypeScript registration system for an NGO bootcamp — admin dashboard, enrollment form, CSV export, and Facebook Pixel conversion tracking.", tags:["Laravel","React","TypeScript","Full-Stack","NGO"],          link:"https://www.thelightmission.com/",                            badge:"Fullstack" },
  { title:"Timini Egbuson Actor Portfolio",   cat:"fullstack", img:"/timini.png",           alt:"React portfolio website for Nollywood actor Timini Egbuson by Great Emman-Wori", desc:"Premium React portfolio website for Nollywood rising star Timini Egbuson — dark cinematic design, smooth animations, mobile-first, performance-optimised.", tags:["React","TypeScript","Vite","Portfolio","Frontend"],           link:"https://timini-egbuson-website-star.vercel.app/",             badge:"Web Dev" },
  { title:"Funke Akindele Official Website",  cat:"fullstack", img:"/funke.png",            alt:"Official website for actress and director Funke Akindele, built with React by Great Emman-Wori", desc:"Official website for iconic Nigerian actress and director Funke Akindele — premium dark design, React, fully responsive, optimised for Core Web Vitals.", tags:["React","Frontend","Celebrity","Responsive"],                 link:"https://funke-akindele-unveiled.vercel.app/",                 badge:"Web Dev" },
  { title:"Ego Nwosu Cinematic Portfolio",    cat:"fullstack", img:"/ego.png",              alt:"Cinematic portfolio website for Nollywood actress Ego Nwosu by Great Emman-Wori", desc:"Cinematic portfolio website for Nollywood actress Ego Nwosu — dark aesthetic, smooth scroll interactions, React, performance-first build.", tags:["React","Vite","Frontend","Portfolio","Cinematic"],            link:"https://ego-cinematic-muse.vercel.app/",                     badge:"Web Dev" },
  { title:"Wizor Progress Real Estate Site",  cat:"fullstack", img:"/wizor.png",            alt:"Real estate professional website built with React by Great Emman-Wori", desc:"Professional business website for a real estate manager and property developer — responsive, elegant, conversion-focused React build.", tags:["React","Frontend","Real Estate","Business Website"],         link:"https://wizor-progress-hub.vercel.app/",                     badge:"Web Dev" },
  { title:"Omoni Oboli — Director's Portfolio", cat:"fullstack", img:"/omoni.png",            alt:"Portfolio website for Nollywood actress and director Omoni Oboli, built with React by Great Emman-Wori", desc:"Elegant portfolio website for Nollywood celebrated actress and director Omoni Oboli — premium dark design, smooth interactions, React, fully responsive and performance-optimised.", tags:["React","TypeScript","Vite","Portfolio","Frontend"],           link:"https://omoni-oboli.vercel.app/",                             badge:"Web Dev" },
  { title:"Bourdillon Omijeh Foundation",     cat:"uiux",      img:"/bof.webp",             alt:"Nonprofit website UI/UX design and development by Great Emman-Wori", desc:"Nonprofit website designed for clarity and credibility — accessibility-first, brand-aligned, built to inspire donor and community trust.", tags:["WordPress","UI/UX","Figma","Nonprofit","Accessibility"],     link:"https://www.bourdillonomijehfoundation.com/",                badge:"UI/UX" },
  { title:"Hair Brosh Saloon Website",        cat:"uiux",      img:"/webbb.webp",           alt:"Responsive salon website designed and developed by Great Emman-Wori", desc:"Pixel-perfect responsive salon website — designed in Figma, developed with modern CSS, clean layout, and mobile-first approach.", tags:["Figma","UI/UX","Responsive","CSS","Modern Design"],          link:"https://hairbrosh-ui-kit.vercel.app/",                       badge:"UI/UX" },
  { title:"AdsFirr Meta Ads Platform UI",     cat:"uiux",      img:"/adsfirr.png",          alt:"Meta Ads management platform UI designed by Great Emman-Wori", desc:"Dashboard UI design for a Meta and Instagram ads management platform — analytics layout, ad performance views, and campaign management interface.", tags:["UI/UX","Dashboard","Meta Ads","Analytics","Figma"],          link:"https://adsfirr.vercel.app/",                                badge:"UI/UX" },
  { title:"WaContacts WhatsApp Directory",    cat:"uiux",      img:"/wacontacts.png",       alt:"WhatsApp business directory platform designed by Great Emman-Wori", desc:"Product design for a WhatsApp business directory connecting Nigerian SMEs with real customers — user research, information architecture, and interface design.", tags:["Product Design","UI/UX","Business Platform","WhatsApp"],    link:"https://wacontacts.com/",                                    badge:"Product" },
  { title:"YouthUp Global — EmpowerAfrika",  cat:"landing",   img:"/youthup.webp",         alt:"International youth initiative website built with WordPress by Great Emman-Wori", desc:"Responsive, accessible international youth initiative website — SEO-optimised WordPress build, fast load times, designed for global audience.", tags:["WordPress","Elementor","Responsive","SEO","International"],  link:"https://youthupglobal.com/empowerafrika/",                   badge:"WordPress" },
  { title:"Bellostylez Blog — Canada",        cat:"landing",   img:"/bellow-stylus.webp",   alt:"Canadian beauty and lifestyle blog built with WordPress by Great Emman-Wori", desc:"Beauty and lifestyle blog for a Canadian brand — WordPress build with Divi, SEO-optimised structure, responsive layout, and clean editorial design.", tags:["WordPress","Divi","Blog","SEO","Responsive"],                link:"https://bellostylez.ca/blog/",                               badge:"WordPress" },
];

const FILTERS: {label:string;value:Cat}[] = [
  {label:"All Projects",value:"all"},{label:"Fullstack & Web Dev",value:"fullstack"},{label:"UI/UX & Product",value:"uiux"},{label:"Landing & WordPress",value:"landing"},
];

const BADGE: Record<string,string> = {
  "Fullstack":"rgba(111,4,20,0.85)","Web Dev":"rgba(16,185,129,0.80)","UI/UX":"rgba(111,4,20,0.75)",
  "Product":"rgba(139,92,246,0.80)","WordPress":"rgba(59,130,246,0.80)",
};

export default function Portfolio() {
  const [filter,setFilter] = useState<Cat>("all");
  const [showAll,setShowAll] = useState(false);
  const shown = PROJECTS.filter(p=>filter==="all"||p.cat===filter);
  const displayed = showAll ? shown : shown.slice(0,6);

  return (
    <section id="portfolio" className="section bg-black" aria-label="Selected projects by Great Emman-Wori">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-10">
          <span className="section-label">My Work</span>
          <h2 className="font-heading text-4xl md:text-5xl text-white mt-3">Selected Projects</h2>
          <div style={{width:48,height:3,background:"var(--accent)",borderRadius:2,margin:"16px auto 0"}}/>
          <p className="font-body text-white/45 mt-4 max-w-xl mx-auto">
            Fullstack websites, product designs, and web applications — built with attention to performance, usability, and conversion.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10" role="group" aria-label="Filter projects by category">
          {FILTERS.map(f=>(
            <button key={f.value} onClick={()=>{setFilter(f.value);setShowAll(false);}}
              aria-pressed={filter===f.value}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={filter===f.value
                ?{background:"var(--accent)",color:"#fff",border:"1px solid var(--accent)"}
                :{background:"transparent",color:"rgba(255,255,255,0.45)",border:"1px solid rgba(255,255,255,0.10)"}}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {displayed.map((p,i)=>(
            <article key={i} className="glass rounded-2xl overflow-hidden group card-hover"
              style={{borderColor:"rgba(255,255,255,0.07)"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(111,4,20,0.48)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}>
              <div className="relative overflow-hidden" style={{aspectRatio:"16/9",background:"#0a0a0a"}}>
                <img src={p.img} alt={p.alt} width={480} height={270}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy"/>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{background:"rgba(0,0,0,0.3)"}}/>
                <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full text-white"
                  style={{background:BADGE[p.badge]||"rgba(111,4,20,0.85)"}}>
                  {p.badge}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-heading font-semibold text-white mb-2 group-hover:text-red-300 transition-colors line-clamp-1">{p.title}</h3>
                <p className="font-body text-sm text-white/48 leading-relaxed mb-4 line-clamp-2">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.slice(0,3).map(t=>(
                    <span key={t} className="text-xs px-2 py-0.5 rounded"
                      style={{background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.40)",border:"1px solid rgba(255,255,255,0.07)"}}>
                      {t}
                    </span>
                  ))}
                  {p.tags.length>3&&<span className="text-xs px-2 py-0.5 rounded" style={{color:"rgba(255,255,255,0.28)"}}>+{p.tags.length-3}</span>}
                </div>
                <a href={p.link} target="_blank" rel="noopener noreferrer"
                  aria-label={`View project: ${p.title}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium card-link"
                  style={{border:"1px solid rgba(255,255,255,0.09)",color:"rgba(255,255,255,0.50)"}}
                  View Project <ArrowUpRight size={13}/>
                </a>
              </div>
            </article>
          ))}
        </div>

        {shown.length>6&&(
          <div className="text-center">
            <button onClick={()=>setShowAll(v=>!v)} className="btn-outline">
              {showAll?`Show Less`:`View All ${shown.length} Fullstack Projects`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
