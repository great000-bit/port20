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
        paddingTop:"clamp(120px,13vh,150px)",
        paddingBottom:"clamp(70px,9vh,100px)",
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

      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(24px,5vw,72px)",width:"100%",position:"relative",zIndex:1}}>
        <div style={{
          display:"grid",
          gridTemplateColumns:"minmax(620px,1.05fr) minmax(360px,0.95fr)",
          alignItems:"center",
          gap:"clamp(56px,7vw,100px)",
        }} className="hero-grid">

          {/* ── LEFT ── */}
          <div style={{maxWidth:760}} className="hero-text">

            {/* Badge */}
            <div style={{
              display:"inline-flex", alignItems:"center", gap:8,
              padding:"5px 14px", borderRadius:999,
              background:"rgba(111,4,20,0.12)",
              border:"1px solid rgba(111,4,20,0.40)",
              marginBottom:28,
            }}>
              <span style={{width:7,height:7,borderRadius:"50%",background:"#4ade80",flexShrink:0}}/>
              <span style={{fontFamily:"Arial,Helvetica,sans-serif",fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.65)",letterSpacing:0}}>
                Available for freelance &amp; remote projects
              </span>
            </div>

            {/* H1 */}
            <h1 className="hero-title" style={{
              fontFamily:"Geist,Arial,sans-serif",
              fontSize:"clamp(48px,4.4vw,68px)",
              fontWeight:400,
              lineHeight:1.05,
              color:"#fff",
              letterSpacing:"-0.045em",
              marginBottom:22,
              maxWidth:760,
            }}>
              I'm Great Emman-Wori.<br/>
              I build{" "}
              <span className="hero-emphasis">impactful websites,</span>{" "}
              web apps, and digital experiences.
            </h1>

            {/* Single short subtext */}
            <p style={{
              fontFamily:"Arial,Helvetica,sans-serif",
              fontSize:17,
              fontWeight:400,
              color:"rgba(255,255,255,0.62)",
              lineHeight:1.65,
              maxWidth:560,
              marginBottom:32,
              marginTop:0,
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
                  fontFamily:"Arial,Helvetica,sans-serif", fontWeight:700, fontSize:15,
                  border:"1px solid var(--accent)", textDecoration:"none",
                  transition:"background 0.2s, color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e=>{const el=e.currentTarget;el.style.background="transparent";el.style.color="var(--accent)";el.style.boxShadow="0 0 14px rgba(111,4,20,0.25)";}}
                onMouseLeave={e=>{const el=e.currentTarget;el.style.background="var(--accent)";el.style.color="#fff";el.style.boxShadow="";}}
                aria-label="View Great Emman-Wori's projects">
                View Projects <ArrowRight size={15}/>
              </a>
              <a href="#contact"
                style={{
                  display:"inline-flex", alignItems:"center", gap:7,
                  background:"transparent", color:"#fff",
                  padding:"0.7rem 1.5rem", borderRadius:"0.75rem",
                  fontFamily:"Arial,Helvetica,sans-serif", fontWeight:700, fontSize:15,
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
              width:"clamp(340px,28vw,430px)",
              height:"clamp(340px,28vw,430px)",
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
        .hero-emphasis { font-weight: 700; }

        .hero-img-enter {
          animation: heroImgIn 0.65s ease both;
          animation-delay: 0.2s;
        }
        @keyframes heroImgIn {
          from { opacity:0; transform:scale(0.95); }
          to   { opacity:1; transform:scale(1); }
        }
        .hero-text {
          animation: heroTextIn 0.6s ease both;
        }
        @keyframes heroTextIn {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-img-enter, .hero-text { animation:none !important; opacity:1 !important; transform:none !important; }
        }

        /* Laptop */
        @media (max-width: 1100px) {
          .hero-title { font-size: clamp(44px,4vw,60px) !important; }
          .hero-grid  { grid-template-columns: 1fr 1fr !important; gap: 3rem !important; }
        }

        /* Tablet */
        @media (max-width: 900px) {
          .hero-title { font-size: clamp(38px,6vw,50px) !important; line-height: 1.08 !important; }
          .hero-grid  { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .hero-image-wrap { order: -1; }
          .hero-image-wrap > div {
            width: min(70vw, 300px) !important;
            height: min(70vw, 300px) !important;
          }
          .hero-text { text-align: center; }
          .hero-text > div:first-child { justify-content: center !important; display: flex; }
          .hero-text > div:last-child  { justify-content: center !important; }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .hero-title { font-size: clamp(34px,9vw,44px) !important; line-height: 1.1 !important; letter-spacing: -0.035em !important; }
          .hero-image-wrap > div {
            width: min(76vw, 240px) !important;
            height: min(76vw, 240px) !important;
          }
        }

        /* Small mobile */
        @media (max-width: 380px) {
          .hero-title { font-size: 32px !important; line-height: 1.12 !important; }
        }
      `}</style>
    </section>
  );
}
