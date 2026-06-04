import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

/* Subtle static star field — pauses when off-screen */
const Stars = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf: number;
    type S = {x:number;y:number;r:number;o:number;s:number};
    let stars: S[] = [];
    const resize = () => { c.width=c.offsetWidth; c.height=c.offsetHeight; };
    const init   = () => { stars=Array.from({length:100},()=>({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.1+0.2,o:Math.random()*0.4+0.08,s:Math.random()*0.18+0.03})); };
    const draw   = () => {
      ctx.clearRect(0,0,c.width,c.height);
      for(const s of stars){ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${s.o})`;ctx.fill();s.y-=s.s;if(s.y<-2){s.y=c.height+2;s.x=Math.random()*c.width;}}
      raf=requestAnimationFrame(draw);
    };
    const ro  = new ResizeObserver(()=>{resize();init();});
    const obs = new IntersectionObserver(([e])=>{ e.isIntersecting ? (raf=requestAnimationFrame(draw)) : cancelAnimationFrame(raf); },{threshold:0});
    ro.observe(c); obs.observe(c); resize(); init(); draw();
    return ()=>{ cancelAnimationFrame(raf); ro.disconnect(); obs.disconnect(); };
  },[]);
  return <canvas ref={ref} aria-hidden="true" style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity:0.6}}/>;
};

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight:"calc(100vh - 0px)",
        display:"flex",
        alignItems:"center",
        paddingTop:"100px",
        paddingBottom:"60px",
        background:"#000",
        position:"relative",
        overflow:"hidden",
      }}
    >
      <Stars />

      {/* Subtle red glow — right side only */}
      <div aria-hidden="true" style={{
        position:"absolute", top:"20%", right:"-5%",
        width:"40vw", height:"60vh",
        background:"radial-gradient(ellipse, rgba(111,4,20,0.14) 0%, transparent 65%)",
        pointerEvents:"none",
      }}/>

      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px",width:"100%",position:"relative",zIndex:1}}>
        <div style={{
          display:"grid",
          gridTemplateColumns:"1.15fr 0.85fr",
          alignItems:"center",
          gap:"4rem",
        }} className="hero-grid">

          {/* ── LEFT ── */}
          <div style={{maxWidth:680}} className="hero-text anim-fade-up">

            {/* Badge */}
            <div style={{
              display:"inline-flex", alignItems:"center", gap:8,
              padding:"5px 14px", borderRadius:999,
              background:"rgba(111,4,20,0.12)",
              border:"1px solid rgba(111,4,20,0.40)",
              marginBottom:28,
            }}>
              <span style={{width:7,height:7,borderRadius:"50%",background:"#4ade80",flexShrink:0}}/>
              <span style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.65)",fontFamily:"Geist,Arial,sans-serif",fontWeight:500,letterSpacing:"0.03em"}}>
                Available for freelance &amp; remote projects
              </span>
            </div>

            {/* H1 */}
            <h1 style={{
              fontFamily:"Geist,Arial,sans-serif",
              fontSize:"clamp(2.6rem, 5.5vw, 4.8rem)",
              fontWeight:400,
              lineHeight:1.08,
              color:"#fff",
              letterSpacing:"-0.025em",
              marginBottom:24,
            }}>
              I'm Great Emman-Wori.<br/>
              I build{" "}
              <span style={{fontWeight:700}}>impactful websites,</span>
              <br/>
              web apps, and digital experiences.
            </h1>

            {/* Single short subtext */}
            <p style={{
              fontFamily:"Arial,Helvetica,sans-serif",
              fontSize:"clamp(0.95rem, 1.6vw, 1.1rem)",
              color:"rgba(255,255,255,0.55)",
              lineHeight:1.7,
              maxWidth:520,
              marginBottom:36,
            }}>
              Fullstack Website Developer and Product Designer creating responsive,
              conversion-focused websites and interfaces for brands and businesses.
            </p>

            {/* Two buttons only */}
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <a href="#portfolio"
                style={{
                  display:"inline-flex", alignItems:"center", gap:7,
                  background:"var(--accent)", color:"#fff",
                  padding:"0.7rem 1.5rem", borderRadius:"0.75rem",
                  fontFamily:"Geist,Arial,sans-serif", fontWeight:600, fontSize:"0.9rem",
                  border:"1px solid var(--accent)", textDecoration:"none",
                  transition:"background 0.2s, color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e=>{const el=e.currentTarget;el.style.background="transparent";el.style.color="var(--accent)";el.style.boxShadow="0 0 14px rgba(111,4,20,0.30)";}}
                onMouseLeave={e=>{const el=e.currentTarget;el.style.background="var(--accent)";el.style.color="#fff";el.style.boxShadow="";}}
                aria-label="View Great Emman-Wori's projects">
                View Projects <ArrowRight size={15}/>
              </a>
              <a href="#contact"
                style={{
                  display:"inline-flex", alignItems:"center", gap:7,
                  background:"transparent", color:"#fff",
                  padding:"0.7rem 1.5rem", borderRadius:"0.75rem",
                  fontFamily:"Geist,Arial,sans-serif", fontWeight:600, fontSize:"0.9rem",
                  border:"1px solid rgba(255,255,255,0.18)", textDecoration:"none",
                  transition:"border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={e=>{const el=e.currentTarget;el.style.borderColor="var(--accent)";el.style.color="var(--accent)";}}
                onMouseLeave={e=>{const el=e.currentTarget;el.style.borderColor="rgba(255,255,255,0.18)";el.style.color="#fff";}}
                aria-label="Contact Great Emman-Wori">
                Contact Me
              </a>
            </div>
          </div>

          {/* ── RIGHT — hero image, no float ── */}
          <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} className="hero-image-wrap">
            <div className="hero-img-enter" style={{
              width:"clamp(220px, 28vw, 360px)",
              height:"clamp(220px, 28vw, 360px)",
              position:"relative",
            }}>
              {/* Soft red glow behind */}
              <div aria-hidden="true" style={{
                position:"absolute", inset:"-12px", borderRadius:"50%",
                background:"radial-gradient(circle, rgba(111,4,20,0.30) 0%, transparent 65%)",
                filter:"blur(18px)",
              }}/>
              {/* Image circle */}
              <div style={{
                position:"relative", width:"100%", height:"100%",
                borderRadius:"50%", overflow:"hidden",
                border:"2px solid rgba(111,4,20,0.45)",
                boxShadow:"0 0 0 1px rgba(255,255,255,0.05)",
              }}>
                <img
                  src="/great-emman-wori-fullstack-developer.png"
                  alt="Great Emman-Wori, Fullstack Website Developer and Product Designer"
                  width={360} height={360}
                  style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block"}}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        .hero-img-enter {
          animation: heroImgIn 0.65s ease both;
          animation-delay: 0.2s;
        }
        @keyframes heroImgIn {
          from { opacity:0; transform: scale(0.94); }
          to   { opacity:1; transform: scale(1); }
        }
        .hero-text {
          animation: heroTextIn 0.6s ease both;
        }
        @keyframes heroTextIn {
          from { opacity:0; transform: translateY(20px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-img-enter, .hero-text { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .hero-image-wrap { order: -1; }
          .hero-image-wrap > div {
            width: clamp(160px, 55vw, 240px) !important;
            height: clamp(160px, 55vw, 240px) !important;
          }
          .hero-text { text-align: center; }
          .hero-text > div:first-child { justify-content: center; }
          .hero-text > div:last-child { justify-content: center; }
        }
        @media (max-width: 480px) {
          .hero-image-wrap > div {
            width: 180px !important;
            height: 180px !important;
          }
        }
      `}</style>
    </section>
  );
}
