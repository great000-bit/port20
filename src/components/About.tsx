import { useEffect, useRef, useState } from "react";

function useCountUp(end: number, duration = 1400, start = false) {
  const [val, setVal] = useState(0);
  const ran = useRef(false);
  useEffect(() => {
    if (!start || ran.current) return;
    ran.current = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setVal(end); return; }
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [start, end, duration]);
  return val;
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{
        fontFamily: "Geist, Arial, sans-serif",
        fontSize: 48, fontWeight: 700,
        color: "#fff", lineHeight: 1, marginBottom: 6,
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: "Arial, sans-serif",
        fontSize: 13, color: "rgba(255,255,255,0.40)",
        letterSpacing: "0.04em", textTransform: "uppercase",
      }}>
        {label}
      </div>
    </div>
  );
}

function CountStat({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);
  const val = useCountUp(end, 1400, go);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: 0.4 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return <div ref={ref}><Stat value={`${val}${suffix}`} label={label}/></div>;
}

const VALUES = ["Usability","Visual Clarity","Performance","Accessibility","Storytelling","Conversion","Brand Trust"];

export default function About() {
  return (
    <section id="about" className="section bg-black" aria-label="About Great Emman-Wori">
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px,5vw,64px)" }}>

        {/* Section number — editorial style */}
        <div style={{ marginBottom: 64 }} data-aos="fade-up">
          <span style={{
            fontFamily:"Arial,sans-serif", fontSize:11, fontWeight:600,
            letterSpacing:"0.18em", textTransform:"uppercase",
            color:"rgba(255,255,255,0.22)", display:"block", marginBottom:16,
          }}>
            01 — About
          </span>
          <h2 style={{
            fontFamily:"Geist,Arial,sans-serif", fontSize:"clamp(32px,4vw,48px)",
            fontWeight:400, color:"#fff", letterSpacing:"-0.04em", margin:0,
          }}>
            Founder Story
          </h2>
        </div>

        {/* Two-column layout — Omijeh style */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"1fr 380px",
          gap:"clamp(48px,7vw,96px)",
          alignItems:"start",
        }} className="about-grid">

          {/* LEFT — story */}
          <div data-aos="fade-up" data-aos-delay="80">
            <p style={{
              fontFamily:"Arial,sans-serif", fontSize:17, lineHeight:1.75,
              color:"rgba(255,255,255,0.68)", marginBottom:24,
            }}>
              I'm <strong style={{color:"#fff", fontWeight:600}}>Great Emman-Wori</strong> — a Fullstack Website
              Developer, Product Designer, and UI/UX Designer based in{" "}
              <strong style={{color:"#fff", fontWeight:600}}>Port Harcourt, Nigeria</strong>, available remotely worldwide.
            </p>
            <p style={{
              fontFamily:"Arial,sans-serif", fontSize:17, lineHeight:1.75,
              color:"rgba(255,255,255,0.55)", marginBottom:24,
            }}>
              I bridge the gap between clean code, visual design, usability, and business outcomes.
              I build modern websites, web applications, and digital product experiences that are
              responsive, user-friendly, performance-focused, and conversion-ready.
            </p>
            <p style={{
              fontFamily:"Arial,sans-serif", fontSize:17, lineHeight:1.75,
              color:"rgba(255,255,255,0.45)",
            }}>
              Currently handling digital operations and campaign management at{" "}
              <span style={{color:"var(--accent)", fontWeight:600}}>Phatbird</span> (UK), while
              building client websites, digital products, and brand experiences for global clients.
            </p>

            {/* Value pills */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginTop:40 }}>
              {VALUES.map(v => (
                <span key={v} style={{
                  fontFamily:"Arial,sans-serif", fontSize:13, fontWeight:500,
                  color:"var(--accent)", padding:"5px 14px", borderRadius:999,
                  border:"1px solid rgba(111,4,20,0.40)",
                  background:"rgba(111,4,20,0.08)",
                }}>
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — photo + stats */}
          <div data-aos="fade-up" data-aos-delay="160">
            {/* Photo */}
            <div style={{ marginBottom: 40, position:"relative" }}>
              <img
                src="/great-emman-wori-fullstack-developer.png"
                alt="Great Emman-Wori"
                width={380} height={420}
                loading="lazy"
                style={{
                  width:"100%", height:320,
                  objectFit:"cover", objectPosition:"center top",
                  borderRadius:16,
                  border:"1px solid rgba(255,255,255,0.07)",
                  display:"block",
                }}
              />
              {/* Handle watermark — Omijeh style */}
              <div style={{
                position:"absolute", bottom:12, right:14,
                fontFamily:"Arial,sans-serif", fontSize:11,
                color:"rgba(255,255,255,0.35)", fontWeight:500,
                letterSpacing:"0.06em",
              }}>
                @creative_emman
              </div>
            </div>

            {/* Stats — large number style */}
            <CountStat end={16}  suffix="+" label="Projects Completed"/>
            <CountStat end={3}   suffix="+" label="Years Building & Designing"/>
            <CountStat end={100} suffix="%" label="Responsive Builds"/>
            <Stat value="SEO ✓" label="SEO-Ready Delivery"/>
          </div>
        </div>

        {/* Responsive stacking */}
        <style>{`
          @media (max-width: 900px) {
            .about-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
