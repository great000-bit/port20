import { useEffect, useRef } from "react";
import { ArrowRight, Download } from "lucide-react";

/* lightweight star canvas */
const Stars = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf: number;
    type Star = { x:number; y:number; r:number; o:number; s:number };
    let stars: Star[] = [];
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    const init = () => { stars = Array.from({length:130},()=>({ x:Math.random()*c.width, y:Math.random()*c.height, r:Math.random()*1.3+0.2, o:Math.random()*0.55+0.15, s:Math.random()*0.25+0.04 })); };
    const draw = () => {
      ctx.clearRect(0,0,c.width,c.height);
      for (const s of stars) { ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${s.o})`; ctx.fill(); s.y-=s.s; if(s.y<-2){s.y=c.height+2;s.x=Math.random()*c.width;} }
      raf = requestAnimationFrame(draw);
    };
    const ro = new ResizeObserver(()=>{resize();init();});
    ro.observe(c); resize(); init(); draw();
    return ()=>{ cancelAnimationFrame(raf); ro.disconnect(); };
  },[]);
  return <canvas ref={ref} aria-hidden="true" style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}} />;
};

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-black overflow-hidden">
      <Stars />

      {/* soft red glow blob */}
      <div aria-hidden="true" style={{
        position:"absolute", bottom:"-10%", right:"5%",
        width:"40vw", height:"40vw", maxWidth:520, maxHeight:520,
        background:"radial-gradient(circle, rgba(111,4,20,0.22) 0%, transparent 70%)",
        borderRadius:"50%", pointerEvents:"none",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 w-full py-28 md:py-0">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8">

          {/* ── LEFT ── */}
          <div className="flex-1 max-w-2xl text-center md:text-left anim-fade-up">
            {/* badge */}
            <span className="section-label mb-6">● Available for work</span>

            {/* H1 */}
            <h1 className="font-heading text-[2.4rem] sm:text-[2.9rem] md:text-[3.3rem] lg:text-[3.8rem] text-white leading-[1.12] tracking-tight mb-5">
              I'm Great Emman-Wori.<br />
              I design and build{" "}
              <span style={{
                background:"linear-gradient(90deg,#fff 0%,rgba(255,255,255,0.75) 100%)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"
              }}>
                premium websites,
              </span>{" "}
              product experiences,<br className="hidden sm:block" /> and digital brands.
            </h1>

            {/* subheadline */}
            <p className="font-body text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto md:mx-0">
              WordPress Development · UI/UX Design · Product Design · Responsive websites ·
              Conversion-focused interfaces · Scalable digital experiences.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="#portfolio" className="btn-red">View Projects <ArrowRight size={16}/></a>
              <a href="#contact"   className="btn-outline">Contact Me</a>
              <a href="/My cv.pdf" download className="btn-outline" style={{borderColor:"rgba(111,4,20,0.5)",color:"rgba(255,255,255,0.7)"}}>
                Resume <Download size={15}/>
              </a>
            </div>
          </div>

          {/* ── RIGHT — hero image ── */}
          <div className="flex-shrink-0 flex justify-center anim-fade-in" style={{animationDelay:"0.25s"}}>
            <div className="anim-float relative" style={{
              width:"clamp(220px,28vw,360px)",
              height:"clamp(220px,28vw,360px)",
            }}>
              {/* glow ring */}
              <div aria-hidden="true" style={{
                position:"absolute", inset:"-6px",
                borderRadius:"50%",
                background:"linear-gradient(135deg, rgba(111,4,20,0.7) 0%, transparent 60%)",
                filter:"blur(12px)",
              }}/>
              {/* image frame */}
              <div style={{
                position:"relative", width:"100%", height:"100%",
                borderRadius:"50%", overflow:"hidden",
                border:"2px solid rgba(111,4,20,0.55)",
                boxShadow:"0 0 40px rgba(111,4,20,0.30), 0 0 0 1px rgba(255,255,255,0.06)",
              }}>
                <img
                  src="/great-emman-profile.png"
                  alt="Great Emman-Wori — WordPress Developer, Product Designer & UI/UX Designer"
                  style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
