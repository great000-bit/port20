import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id:1,
    name:"YouthUp Global UK",
    role:"CEO & Founder — YouthUp Global",
    avatar:"/youth.webp",
    text:"Great brought our vision for YouthUp Global Pathways to life with clarity, creativity, and care. His ability to turn complex ideas into a clean, intuitive web experience made the entire process seamless. We now have a platform that truly reflects our mission.",
    rating:5,
  },
  {
    id:2,
    name:"Professor Bourdillion Omijeh",
    role:"CEO & Founder — Bourdillion Omijeh Foundation",
    avatar:"/bourdillion omijeh.webp",
    text:"Great captured the essence of our foundation and transformed it into a design that is dependable, contemporary, and accessible. His focus on user experience made the website very user-friendly for our wide range of visitors.",
    rating:5,
  },
  {
    id:3,
    name:"Trust-God Ewuziem",
    role:"Founder & CEO — Nexatrux",
    avatar:"/trustgod.webp",
    text:"Great has been instrumental in transforming our digital experiences. His ability to streamline complexities, create aesthetically striking designs, and maintain usability across platforms has enhanced our value delivery. His creative precision is unparalleled.",
    rating:5,
  },
  {
    id:4,
    name:"Bello Stylez",
    role:"CEO — Bellostylez Unisex Saloon",
    avatar:"/bellostylez.webp",
    text:"Working with Great was the best decision for my brand. He captured my vision perfectly, delivered ahead of schedule, and made everything feel effortless. My site now feels like me — stylish, fast, and functional.",
    rating:5,
  },
];

const Stars = ({n}:{n:number}) => (
  <div className="flex gap-1" aria-label={`${n} out of 5 stars`}>
    {Array.from({length:n}).map((_,i)=>(
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="var(--accent)" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

export default function Testimonials() {
  const [idx, setIdx]       = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef            = useRef<ReturnType<typeof setInterval>|null>(null);
  const next = useCallback(() => setIdx(i => (i+1) % TESTIMONIALS.length), []);
  const prev = useCallback(() => setIdx(i => (i-1+TESTIMONIALS.length) % TESTIMONIALS.length), []);

  useEffect(() => {
    if (paused) { if (timerRef.current) clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, next]);

  const t = TESTIMONIALS[idx];

  return (
    <section id="testimonials" style={{background:"var(--bg-2)", padding:"clamp(80px,12vh,120px) 0"}}
      onMouseEnter={()=>setPaused(true)}
      onMouseLeave={()=>setPaused(false)}>

      <style>{`
        .testi-eyebrow {
          font-family:Arial,sans-serif; font-size:11px; font-weight:600;
          letter-spacing:0.2em; text-transform:uppercase;
          color:var(--fg-ultra); display:block; margin-bottom:16px;
        }
        .testi-heading {
          font-family:Geist,Arial,sans-serif;
          font-size:clamp(28px,3.5vw,42px);
          font-weight:400; letter-spacing:-0.04em;
          color:var(--fg); margin:0 0 12px 0;
        }
        .testi-sub {
          font-family:Arial,sans-serif; font-size:15px;
          color:var(--fg-faint); margin:0;
        }
        .testi-card {
          background:var(--card-bg);
          border:1px solid var(--border);
          border-radius:16px; padding:clamp(28px,5vw,48px);
          position:relative; overflow:hidden;
        }
        [data-theme="light"] .testi-card {
          background:#ffffff;
          border-color:var(--border);
          box-shadow:0 1px 3px rgba(0,0,0,0.06);
        }
        .testi-quote-icon {
          position:absolute; top:20px; right:24px;
          opacity:0.08; color:var(--accent);
        }
        .testi-text {
          font-family:Arial,sans-serif;
          font-size:clamp(15px,1.4vw,17px);
          line-height:1.75;
          color:var(--fg-muted);
          margin:0 0 28px 0;
        }
        .testi-author-name {
          font-family:Geist,Arial,sans-serif;
          font-size:14px; font-weight:600;
          color:var(--fg);
        }
        .testi-author-role {
          font-family:Arial,sans-serif;
          font-size:12px; color:var(--fg-faint);
          margin-top:2px;
        }
        .testi-avatar {
          width:48px; height:48px; border-radius:50%;
          object-fit:cover;
          border:2px solid var(--accent-border);
          flex-shrink:0;
        }
        .testi-nav-btn {
          width:40px; height:40px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          background:var(--card-bg);
          border:1px solid var(--border);
          color:var(--fg-faint);
          cursor:pointer; transition:all 0.2s;
        }
        .testi-nav-btn:hover {
          border-color:var(--accent);
          color:var(--accent);
        }
        [data-theme="light"] .testi-nav-btn {
          background:#ffffff;
          box-shadow:0 1px 3px rgba(0,0,0,0.08);
        }
        .testi-dot {
          height:8px; border-radius:4px; cursor:pointer;
          border:none; padding:0; transition:all 0.3s ease;
        }
      `}</style>

      <div style={{maxWidth:1280, margin:"0 auto", padding:"0 clamp(24px,5vw,64px)"}}>

        <div style={{marginBottom:48}} data-aos="fade-up">
          <span className="testi-eyebrow">06 — Testimonials</span>
          <h2 className="testi-heading">Client Testimonials</h2>
          <p className="testi-sub">Real feedback from people and brands I've worked with.</p>
        </div>

        <div style={{maxWidth:760, margin:"0 auto"}} data-aos="fade-up" data-aos-delay="80">
          <article className="testi-card" aria-live="polite" aria-atomic="true">
            <div className="testi-quote-icon" aria-hidden="true"><Quote size={64}/></div>
            <div style={{marginBottom:20}}><Stars n={t.rating}/></div>
            <blockquote className="testi-text">"{t.text}"</blockquote>
            <div style={{display:"flex", alignItems:"center", gap:14}}>
              <img src={t.avatar} alt={`${t.name}`} className="testi-avatar" loading="lazy" width={48} height={48}/>
              <div>
                <p className="testi-author-name">{t.name}</p>
                <p className="testi-author-role">{t.role}</p>
              </div>
            </div>
          </article>

          {/* Controls */}
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:24}}>
            <button onClick={prev} className="testi-nav-btn" aria-label="Previous testimonial">
              <ChevronLeft size={17}/>
            </button>

            <div style={{display:"flex", gap:8}}>
              {TESTIMONIALS.map((_,i)=>(
                <button key={i} onClick={()=>setIdx(i)}
                  className="testi-dot"
                  aria-label={`Go to testimonial ${i+1}`}
                  style={{
                    width: i===idx ? 28 : 8,
                    background: i===idx ? "var(--accent)" : "var(--border-strong)",
                  }}/>
              ))}
            </div>

            <button onClick={next} className="testi-nav-btn" aria-label="Next testimonial">
              <ChevronRight size={17}/>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
