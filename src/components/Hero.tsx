import { useEffect, useRef } from "react";
import { ArrowRight, Download } from "lucide-react";

const Stars = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf: number;
    type S = {x:number;y:number;r:number;o:number;s:number};
    let stars: S[] = [];
    const resize = () => { c.width=c.offsetWidth; c.height=c.offsetHeight; };
    const init = () => { stars=Array.from({length:130},()=>({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.3+0.2,o:Math.random()*0.5+0.12,s:Math.random()*0.22+0.04})); };
    const draw = () => {
      ctx.clearRect(0,0,c.width,c.height);
      for(const s of stars){ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${s.o})`;ctx.fill();s.y-=s.s;if(s.y<-2){s.y=c.height+2;s.x=Math.random()*c.width;}}
      raf=requestAnimationFrame(draw);
    };
    const ro=new ResizeObserver(()=>{resize();init();});
    ro.observe(c);resize();init();draw();
    // Pause when off-screen
    const obs = new IntersectionObserver(([e])=>{
      if (!e.isIntersecting) cancelAnimationFrame(raf);
      else { raf = requestAnimationFrame(draw); }
    },{threshold:0});
    obs.observe(c);
    return()=>{cancelAnimationFrame(raf);ro.disconnect();obs.disconnect();};
  },[]);
  return <canvas ref={ref} aria-hidden="true" style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}/>;
};

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-black overflow-hidden" aria-label="Introduction">
      <Stars />

      {/* Red glow blob */}
      <div aria-hidden="true" style={{position:"absolute",bottom:"-10%",right:"3%",width:"38vw",height:"38vw",maxWidth:500,maxHeight:500,background:"radial-gradient(circle,rgba(111,4,20,0.20) 0%,transparent 70%)",borderRadius:"50%",pointerEvents:"none"}}/>

      <div className="relative z-10 max-w-7xl mx-auto px-5 w-full py-28 md:py-0">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8">

          {/* ── LEFT ── */}
          <div className="flex-1 max-w-2xl text-center md:text-left anim-fade-up">

            {/* Availability badge */}
            <span className="section-label mb-6">● Available for freelance &amp; remote projects</span>

            {/* H1 — single on entire page, SEO keyword-targeted */}
            <h1 className="font-heading text-[2.3rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.7rem] text-white leading-[1.12] tracking-tight mb-5">
              Fullstack Website Developer<br/>
              Building Modern{" "}
              <span style={{background:"linear-gradient(90deg,#fff 0%,rgba(255,255,255,0.7) 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                Digital Experiences
              </span>
            </h1>

            {/* Subheadline — keyword-rich, reads naturally */}
            <p className="font-body text-white/60 text-base md:text-lg leading-relaxed mb-3 max-w-xl mx-auto md:mx-0">
              I'm <strong className="text-white">Great Emman-Wori</strong> — a Fullstack Website Developer and Product Designer
              building fast, responsive, and conversion-focused digital experiences.
            </p>
            <p className="font-body text-white/50 text-sm md:text-base leading-relaxed mb-7 max-w-xl mx-auto md:mx-0">
              I design and develop modern websites, web applications, landing pages, and product interfaces that help
              brands look credible, communicate clearly, and convert visitors into action.
            </p>

            {/* Trust microcopy */}
            <p className="font-body text-xs text-white/30 mb-7 italic">
              Based in Port Harcourt, Nigeria — available for remote fullstack website development and product design projects.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="#portfolio" className="btn-red" aria-label="View fullstack projects by Great Emman-Wori">
                View My Projects <ArrowRight size={15}/>
              </a>
              <a href="#contact" className="btn-outline" aria-label="Contact Great Emman-Wori">
                Contact Me
              </a>
              <a href="/My cv.pdf" download className="btn-outline"
                style={{borderColor:"rgba(111,4,20,0.4)",color:"rgba(255,255,255,0.6)"}}
                aria-label="Download Great Emman-Wori's resume">
                Resume <Download size={14}/>
              </a>
            </div>
          </div>

          {/* ── RIGHT — hero image ── */}
          <div className="flex-shrink-0 flex justify-center anim-fade-in" style={{animationDelay:"0.3s"}}>
            <div className="anim-float relative" style={{width:"clamp(200px,26vw,340px)",height:"clamp(200px,26vw,340px)"}}>
              {/* glow ring */}
              <div aria-hidden="true" style={{position:"absolute",inset:"-8px",borderRadius:"50%",background:"linear-gradient(135deg,rgba(111,4,20,0.65) 0%,transparent 55%)",filter:"blur(14px)"}}/>
              {/* image */}
              <div style={{position:"relative",width:"100%",height:"100%",borderRadius:"50%",overflow:"hidden",border:"2px solid rgba(111,4,20,0.50)",boxShadow:"0 0 48px rgba(111,4,20,0.28),0 0 0 1px rgba(255,255,255,0.05)"}}>
                <img
                  src="/great-emman-wori-fullstack-developer.png"
                  alt="Great Emman-Wori, Fullstack Website Developer and Product Designer based in Port Harcourt, Nigeria"
                  width={340} height={340}
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
