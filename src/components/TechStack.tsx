import { useEffect, useRef } from "react";

const R1 = [
  {name:"WordPress",  icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg"},
  {name:"Figma",      icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"},
  {name:"HTML5",      icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"},
  {name:"CSS3",       icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"},
  {name:"JavaScript", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"},
  {name:"React",      icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"},
  {name:"Tailwind",   icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"},
  {name:"TypeScript", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"},
  {name:"Next.js",    icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"},
];
const R2 = [
  {name:"Laravel",    icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg"},
  {name:"Node.js",    icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"},
  {name:"Git",        icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"},
  {name:"GitHub",     icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"},
  {name:"MySQL",      icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"},
  {name:"Vite",       icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg"},
  {name:"Framer",     icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg"},
  {name:"Canva",      icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg"},
  {name:"Vite",       icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg"},
];

const d = <T,>(a:T[]) => [...a,...a];

const Card = ({name,icon}:{name:string;icon:string}) => (
  <div className="glass flex-shrink-0 flex flex-col items-center gap-2 rounded-2xl"
    style={{width:100,height:100,justifyContent:"center",margin:"0 8px"}}>
    <img src={icon} alt={`${name} skill icon`} width={34} height={34} loading="lazy"
      onError={e=>{(e.target as HTMLImageElement).style.display="none";}}/>
    <span style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.50)",fontWeight:500}}>{name}</span>
  </div>
);

function MarqueeRow({items, dir}:{items:{name:string;icon:string}[]; dir:"left"|"right"}) {
  const ref = useRef<HTMLDivElement>(null);
  // Pause marquee when off-screen to save GPU
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    const obs = new IntersectionObserver(([e])=>{
      el.style.animationPlayState = e.isIntersecting ? "running" : "paused";
    },{threshold:0});
    obs.observe(el);
    return ()=>obs.disconnect();
  },[]);

  return (
    <div className="relative mb-4">
      <div ref={ref} className={`flex ${dir==="left"?"marquee-left":"marquee-right"}`}
        style={{width:"max-content"}}>
        {d(items).map((s,i)=><Card key={i} {...s}/>)}
      </div>
      <div aria-hidden="true" style={{position:"absolute",inset:0,background:"linear-gradient(90deg,#000 0%,transparent 10%,transparent 90%,#000 100%)",pointerEvents:"none",zIndex:1}}/>
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="section-sm bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 text-center mb-10" data-aos="fade-up">
        <span className="section-label">Tech Stack</span>
        <h2 className="font-heading text-3xl md:text-4xl text-white mt-3">Skills &amp; Technologies</h2>
      </div>
      <MarqueeRow items={R1} dir="left"/>
      <MarqueeRow items={R2} dir="right"/>
    </section>
  );
}
