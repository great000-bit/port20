const EXP = [
  {
    role:"Digital Operations & Technology Lead",
    org:"Phatbird Fashion Brand (UK)",
    loc:"Remote",
    period:"2024 – Present",
    bullets:[
      "Managed Meta Ads and Google Ads campaigns, producing CEO-facing performance reports and strategic recommendations",
      "Evaluated and integrated AI toolchains including HeyGen, Seedance 2.0, Runway ML, and Kling AI into production workflows",
      "Optimised Shopify store: fixed responsiveness, built interactive size guides, embedded review widgets",
      "Handled digital workflow automation, Google Drive organisation, and formal meeting documentation",
    ],
    tags:["Meta Ads","Shopify","Google Ads","AI Tooling","Digital Ops"],
  },
  {
    role:"Fullstack Website Developer (Contract)",
    org:"The Light Mission NGO",
    loc:"Remote",
    period:"2024",
    bullets:[
      "Built a full-stack Laravel 12 + React/TypeScript event registration system from scratch",
      "Implemented Sanctum admin authentication, enrollment form, and admin CSV export dashboard",
      "Integrated Facebook Pixel CompleteRegistration event for real-time conversion monitoring",
    ],
    tags:["Laravel","React","TypeScript","Sanctum","Facebook Pixel"],
  },
  {
    role:"Frontend Developer & Product Designer",
    org:"Nollywood Talent Portfolio Projects",
    loc:"Remote",
    period:"2023 – 2024",
    bullets:[
      "Built premium React portfolio websites for Funke Akindele, Timini Egbuson, Ego Nwosu, and Omoni Oboli",
      "Delivered cinematic dark-aesthetic designs with smooth animations, full mobile responsiveness, and performance optimisation",
      "Optimised all deliverables for Core Web Vitals, SEO metadata, and social sharing previews",
    ],
    tags:["React","TypeScript","Vite","Portfolio Design","Frontend"],
  },
  {
    role:"Web Designer & WordPress Developer",
    org:"International & Canadian Client Projects",
    loc:"Remote",
    period:"2022 – 2024",
    bullets:[
      "Built responsive WordPress websites for YouthUp Global (international), Bellostylez (Canada), and Bourdillon Omijeh Foundation (Nigeria)",
      "Delivered SEO-optimised, accessible builds using Elementor and Divi builders",
      "Designed UI/UX for Hair Brosh Saloon, AdsFirr, and WaContacts using Figma",
    ],
    tags:["WordPress","Elementor","Divi","Figma","UI/UX","SEO"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section bg-[#030303]" aria-label="Work experience of Great Emman-Wori">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="section-label">Track Record</span>
          <h2 className="font-heading text-4xl md:text-5xl text-white mt-3">Work Experience</h2>
          <div style={{width:48,height:3,background:"var(--accent)",borderRadius:2,margin:"16px auto 0"}}/>
          <p className="font-body text-white/40 mt-4">My professional journey and the projects I've delivered</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 hidden md:block"
            style={{width:1,background:"rgba(111,4,20,0.20)",transform:"translateX(-50%)"}}/>

          {EXP.map((e,i)=>{
            const isLeft=i%2===0;
            return (
              <div key={i} className="relative mb-12 md:mb-16">
                {/* dot */}
                <div className="absolute left-1/2 hidden md:flex items-center justify-center"
                  style={{top:28,transform:"translate(-50%,-50%)",width:44,height:44,borderRadius:"50%",background:"#000",border:"2px solid var(--accent)",zIndex:2}}>
                  <div style={{width:12,height:12,borderRadius:"50%",background:"var(--accent)"}}/>
                </div>
                {/* period */}
                <div className={`absolute top-5 hidden md:block text-xs font-medium ${isLeft?"left-[53%] pl-8":"right-[53%] pr-8 text-right"}`}
                  style={{color:"var(--accent)"}}>
                  {e.period}
                </div>
                {/* card */}
                <div className={`md:w-[46%] ${isLeft?"md:mr-auto":"md:ml-auto"}`}>
                  <article className="glass rounded-2xl p-6 group card-hover"
                    style={{borderColor:"rgba(255,255,255,0.07)"}}
                    onMouseEnter={el=>el.currentTarget.style.borderColor="rgba(111,4,20,0.42)"}
                    onMouseLeave={el=>el.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}>
                    <p className="text-xs font-semibold mb-2 md:hidden" style={{color:"var(--accent)"}}>{e.period}</p>
                    <h3 className="font-heading font-semibold text-white text-lg mb-1 group-hover:text-red-300 transition-colors">{e.role}</h3>
                    <p className="font-body text-sm mb-0.5" style={{color:"var(--accent)"}}>{e.org}</p>
                    <p className="font-body text-xs text-white/30 mb-4">{e.loc}</p>
                    <ul className="space-y-2 mb-5">
                      {e.bullets.map((b,j)=>(
                        <li key={j} className="flex gap-2 text-sm text-white/52">
                          <span style={{color:"var(--accent)",flexShrink:0,marginTop:2}}>▸</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {e.tags.map(t=>(
                        <span key={t} className="text-xs px-2.5 py-1 rounded-full"
                          style={{background:"rgba(111,4,20,0.08)",border:"1px solid rgba(111,4,20,0.18)",color:"rgba(255,255,255,0.45)"}}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
