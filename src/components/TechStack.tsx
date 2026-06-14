import { useEffect, useRef, useState } from "react";

/* Skill bar — animates width 0 → target% on scroll enter */
function SkillBar({ name, pct, delay = 0 }: { name: string; pct: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: 0.3 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div ref={ref} style={{ marginBottom: 18 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
        <span style={{ fontFamily:"Arial,sans-serif", fontSize:14, color:"rgba(255,255,255,0.75)", fontWeight:500 }}>
          {name}
        </span>
        <span style={{ fontFamily:"Arial,sans-serif", fontSize:13, color:"rgba(255,255,255,0.30)", fontWeight:400 }}>
          {pct}%
        </span>
      </div>
      <div style={{ height:3, background:"rgba(255,255,255,0.07)", borderRadius:2, overflow:"hidden" }}>
        <div style={{
          height:"100%", borderRadius:2,
          background:"var(--accent)",
          width: (go || reduced) ? `${pct}%` : "0%",
          transition: (go || reduced) ? `width 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms` : "none",
        }}/>
      </div>
    </div>
  );
}

const SKILL_GROUPS = [
  {
    label: "Languages",
    skills: [
      { name:"JavaScript", pct:90 },
      { name:"TypeScript", pct:85 },
      { name:"PHP",        pct:72 },
      { name:"HTML5 / CSS3", pct:96 },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { name:"React / Next.js", pct:88 },
      { name:"Tailwind CSS",    pct:93 },
      { name:"Figma / Framer",  pct:85 },
      { name:"WordPress / Elementor", pct:90 },
    ],
  },
  {
    label: "Backend & Systems",
    skills: [
      { name:"Laravel / PHP",   pct:75 },
      { name:"Node.js / Express", pct:72 },
      { name:"REST APIs",       pct:82 },
      { name:"MySQL / Databases", pct:70 },
    ],
  },
  {
    label: "Design & Product",
    skills: [
      { name:"UI/UX Design",    pct:90 },
      { name:"Product Thinking", pct:85 },
      { name:"SEO Optimization", pct:80 },
      { name:"Responsive Design", pct:95 },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="techstack" className="section" style={{background:"var(--bg-2)"}} style={{paddingTop:"5rem",paddingBottom:"5rem"}}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 clamp(24px,5vw,64px)" }}>

        {/* Section label */}
        <div style={{ marginBottom:64 }} data-aos="fade-up">
          <span style={{
            fontFamily:"Arial,sans-serif", fontSize:11, fontWeight:600,
            letterSpacing:"0.18em", textTransform:"uppercase",
            color:"rgba(255,255,255,0.22)", display:"block", marginBottom:16,
          }}>
            02 — Skills
          </span>
          <h2 style={{
            fontFamily:"Geist,Arial,sans-serif", fontSize:"clamp(28px,3.5vw,42px)",
            fontWeight:400, color:"var(--fg)", letterSpacing:"-0.04em", margin:0,
          }}>
            Technical Depth
          </h2>
          <p style={{
            fontFamily:"Arial,sans-serif", fontSize:15, color:"rgba(255,255,255,0.38)",
            marginTop:12, maxWidth:540,
          }}>
            A fullstack skillset built across 3+ years — from responsive UIs to backend systems and product design.
          </p>
        </div>

        {/* Skill stats row */}
        <div style={{
          display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:32,
          marginBottom:64, maxWidth:560,
        }} data-aos="fade-up" data-aos-delay="80">
          {[
            {v:"3+",  l:"Years Building"},
            {v:"16+", l:"Projects Shipped"},
            {v:"Full",l:"Stack Depth"},
          ].map(s => (
            <div key={s.l}>
              <div style={{fontFamily:"Geist,Arial,sans-serif",fontSize:36,fontWeight:700,color:"var(--fg)",lineHeight:1}}>{s.v}</div>
              <div style={{fontFamily:"Arial,sans-serif",fontSize:12,color:"rgba(255,255,255,0.35)",marginTop:6,textTransform:"uppercase",letterSpacing:"0.06em"}}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* 4-column skill groups */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",
          gap:"clamp(32px,5vw,56px)",
        }}>
          {SKILL_GROUPS.map((group, gi) => (
            <div key={group.label} data-aos="fade-up" data-aos-delay={gi * 80}>
              {/* Category label */}
              <div style={{
                fontFamily:"Arial,sans-serif", fontSize:11, fontWeight:700,
                letterSpacing:"0.14em", textTransform:"uppercase",
                color:"var(--accent)", marginBottom:20,
                display:"flex", alignItems:"center", gap:8,
              }}>
                <span style={{width:20,height:1,background:"var(--accent)",display:"inline-block"}}/>
                {group.label}
              </div>
              {group.skills.map((s, si) => (
                <SkillBar key={s.name} name={s.name} pct={s.pct} delay={si * 80}/>
              ))}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
