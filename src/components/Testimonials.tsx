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
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{color:"var(--accent)"}} aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

export default function Testimonials() {
  const [idx, setIdx]   = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>|null>(null);

  const next = useCallback(() => setIdx(i => (i+1) % TESTIMONIALS.length), []);
  const prev = useCallback(() => setIdx(i => (i-1+TESTIMONIALS.length) % TESTIMONIALS.length), []);

  // Auto-advance — simple interval, no window listeners
  useEffect(() => {
    if (paused) { if (timerRef.current) clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, next]);

  const t = TESTIMONIALS[idx];

  return (
    <section
      id="testimonials"
      className="section" style={{background:"var(--bg-2)"}}
      aria-labelledby="testimonials-heading"
      onMouseEnter={()=>setPaused(true)}
      onMouseLeave={()=>setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-14" data-aos="fade-up">
          <span style={{fontFamily:"Arial,sans-serif",fontSize:11,fontWeight:600,letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--fg-ultra)",display:"block",marginBottom:16}}>06 — Testimonials</span>
          <h2 id="testimonials-heading" style={{fontFamily:"Geist,Arial,sans-serif",fontSize:"clamp(28px,3.5vw,42px)",fontWeight:400,letterSpacing:"-0.04em",color:"var(--fg)",margin:"0 0 12px 0"}}>
            Client Testimonials
          </h2>
          <div style={{width:48,height:3,background:"var(--accent)",borderRadius:2,margin:"16px auto 0"}}/>
          <p className="font-body text-white/45 mt-4 max-w-lg mx-auto">
            Real feedback from people and brands I've worked with.
          </p>
        </div>

        {/* Card */}
        <div className="max-w-3xl mx-auto relative">
          <article
            key={t.id}
            className="glass rounded-2xl p-8 md:p-12 relative overflow-hidden"
            style={{borderColor:"rgba(111,4,20,0.28)"}}
            aria-live="polite"
            aria-atomic="true"
          >
            {/* Quote icon */}
            <div aria-hidden="true" style={{position:"absolute",top:24,right:28,opacity:0.07}}>
              <Quote size={72} style={{color:"var(--accent)"}}/>
            </div>

            {/* Red glow bottom */}
            <div aria-hidden="true" style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:"60%",height:1,background:"linear-gradient(90deg,transparent,rgba(111,4,20,0.5),transparent)"}}/>

            {/* Stars */}
            <div className="mb-5"><Stars n={t.rating}/></div>

            {/* Quote text */}
            <blockquote className="font-body text-white/68 text-base md:text-lg leading-relaxed mb-8">
              "{t.text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div style={{width:52,height:52,borderRadius:"50%",overflow:"hidden",border:"2px solid rgba(111,4,20,0.45)",flexShrink:0}}>
                <img src={t.avatar} alt={`${t.name} testimonial`}
                  width={52} height={52}
                  style={{width:"100%",height:"100%",objectFit:"cover"}} loading="lazy"/>
              </div>
              <div>
                <p className="font-heading font-semibold text-white text-sm">{t.name}</p>
                <p className="font-body text-xs text-white/40 mt-0.5">{t.role}</p>
              </div>
            </div>
          </article>

          {/* Nav arrows */}
          <div className="flex items-center justify-between mt-8">
            <button onClick={prev} aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
              style={{border:"1px solid var(--border)"}}>
              <ChevronLeft size={18}/>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_,i)=>(
                <button key={i} onClick={()=>setIdx(i)}
                  aria-label={`Go to testimonial ${i+1}`}
                  aria-current={i===idx?"true":undefined}
                  style={{
                    width: i===idx ? 28 : 8, height:8, borderRadius:4,
                    background: i===idx ? "var(--accent)" : "var(--fg-ultra)",
                    transition:"all 0.3s ease", border:"none", cursor:"pointer", padding:0,
                  }}/>
              ))}
            </div>

            <button onClick={next} aria-label="Next testimonial"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
              style={{border:"1px solid var(--border)"}}>
              <ChevronRight size={18}/>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
