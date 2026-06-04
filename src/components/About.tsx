import { useEffect, useRef, useState } from "react";

/* ── Animated counter — IntersectionObserver, runs once, respects reduced-motion ── */
function useCountUp(end: number, duration = 1400, start = false) {
  const [val, setVal] = useState(0);
  const ran = useRef(false);
  useEffect(() => {
    if (!start || ran.current) return;
    ran.current = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setVal(end); return; }
    const startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      // ease-out cubic
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [start, end, duration]);
  return val;
}

function StatCard({ end, suffix, label, isSpecial = false }: { end: number; suffix?: string; label: string; isSpecial?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const val = useCountUp(end, 1400, visible);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="glass rounded-2xl p-6 text-center group hover:-translate-y-1 transition-transform duration-300"
      style={{borderColor:"rgba(255,255,255,0.06)"}}
      onMouseEnter={e=>e.currentTarget.style.boxShadow="0 0 24px rgba(111,4,20,0.20)"}
      onMouseLeave={e=>e.currentTarget.style.boxShadow=""}>
      {isSpecial ? (
        <div className="font-heading text-4xl font-bold mb-1 transition-colors group-hover:text-[#c0392b]"
          style={{color:"var(--accent)", opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.7)", transition:"opacity 0.5s ease, transform 0.5s ease"}}>
          SEO ✓
        </div>
      ) : (
        <div className="font-heading text-4xl font-bold text-white mb-1 group-hover:text-[#c0392b] transition-colors">
          {val}{suffix}
        </div>
      )}
      <div className="font-body text-sm text-white/45">{label}</div>
    </div>
  );
}

const VALUES = ["Usability","Visual Clarity","Performance","Accessibility","Storytelling","Conversion","Brand Trust"];

export default function About() {
  return (
    <section id="about" className="section bg-black" aria-label="About Great Emman-Wori">
      <div className="max-w-7xl mx-auto px-5">

        <div className="text-center mb-14">
          <span className="section-label">Who I Am</span>
          <h2 className="font-heading text-4xl md:text-5xl text-white mt-3">About Great Emman-Wori</h2>
          <div style={{width:48,height:3,background:"var(--accent)",borderRadius:2,margin:"16px auto 0"}}/>
        </div>

        {/* Bio glass card */}
        <div className="glass rounded-2xl p-8 md:p-12 mb-10 max-w-3xl mx-auto text-center"
          style={{borderColor:"rgba(111,4,20,0.20)"}}>
          <p className="font-body text-white/70 text-lg leading-relaxed mb-5">
            I'm <strong className="text-white">Great Emman-Wori</strong>, a Fullstack Website Developer, Product Designer,
            and UI/UX Designer based in <strong className="text-white">Port Harcourt, Nigeria</strong> — available remotely worldwide.
          </p>
          <p className="font-body text-white/60 leading-relaxed mb-5">
            I bridge the gap between clean code, visual design, usability, and business outcomes. I build modern websites, web
            applications, and digital product experiences that are responsive, user-friendly, performance-focused, and
            conversion-ready. From frontend interfaces and fullstack website systems to React apps and Figma design systems,
            every project I deliver is built to perform, rank, and convert.
          </p>
          <p className="font-body text-white/50 leading-relaxed">
            Currently handling digital operations and campaign management at{" "}
            <span style={{color:"var(--accent)",fontWeight:600}}>Phatbird</span> (UK), while building client websites,
            digital products, and brand experiences for global clients.
          </p>
        </div>

        {/* Value pills */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {VALUES.map(v=>(
            <span key={v} className="glass px-4 py-1.5 rounded-full text-sm font-medium"
              style={{color:"var(--accent)",borderColor:"var(--red-border)"}}>
              {v}
            </span>
          ))}
        </div>

        {/* Stats — animated counters, values are editable placeholders */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
          <StatCard end={16} suffix="+"  label="Projects Completed" />
          <StatCard end={3}  suffix="+"  label="Years Learning & Building" />
          <StatCard end={100} suffix="%" label="Responsive Builds" />
          <StatCard end={0}  label="SEO-Ready Delivery" isSpecial />
        </div>

      </div>
    </section>
  );
}
