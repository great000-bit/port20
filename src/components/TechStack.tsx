const SKILLS_R1 = [
  { name:"WordPress",  icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
  { name:"Elementor",  icon:"https://cdn.worldvectorlogo.com/logos/elementor.svg" },
  { name:"Figma",      icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name:"HTML5",      icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name:"CSS3",       icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name:"JavaScript", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name:"React",      icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name:"Tailwind",   icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name:"TypeScript", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
];
const SKILLS_R2 = [
  { name:"Next.js",    icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name:"Framer",     icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg" },
  { name:"Git",        icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name:"GitHub",     icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name:"MySQL",      icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name:"Laravel",    icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
  { name:"Vite",       icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
  { name:"Canva",      icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
  { name:"Node.js",    icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
];

const doubled = <T,>(arr: T[]) => [...arr, ...arr];

const Card = ({ name, icon }: { name:string; icon:string }) => (
  <div className="glass flex-shrink-0 flex flex-col items-center gap-2.5 rounded-2xl"
    style={{width:104,height:104,justifyContent:"center",margin:"0 8px"}}>
    <img src={icon} alt={name} width={36} height={36} loading="lazy"
      onError={e=>{(e.target as HTMLImageElement).style.display="none"}} />
    <span style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.55)",fontWeight:500}}>{name}</span>
  </div>
);

export default function TechStack() {
  return (
    <section className="section-sm bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 text-center mb-10">
        <span className="section-label">Tech Stack</span>
        <h2 className="font-heading text-3xl md:text-4xl text-white mt-3">Skills &amp; Technologies</h2>
      </div>

      {/* Row 1 — left */}
      <div className="relative mb-4">
        <div className="flex marquee-left" style={{width:"max-content"}}>
          {doubled(SKILLS_R1).map((s,i)=><Card key={i} {...s}/>)}
        </div>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,#000 0%,transparent 12%,transparent 88%,#000 100%)",pointerEvents:"none"}}/>
      </div>

      {/* Row 2 — right */}
      <div className="relative">
        <div className="flex marquee-right" style={{width:"max-content"}}>
          {doubled(SKILLS_R2).map((s,i)=><Card key={i} {...s}/>)}
        </div>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,#000 0%,transparent 12%,transparent 88%,#000 100%)",pointerEvents:"none"}}/>
      </div>
    </section>
  );
}
