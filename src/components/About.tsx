const STATS = [
  { value:"16+",   label:"Projects Completed" },       // EDITABLE placeholder
  { value:"3+",    label:"Years Building & Designing" }, // EDITABLE placeholder
  { value:"100%",  label:"Responsive Builds" },          // EDITABLE placeholder
  { value:"SEO ✓", label:"SEO-Ready Delivery" },         // EDITABLE placeholder
];

const VALUES = ["Usability","Visual Clarity","Performance","Accessibility","Storytelling","Conversion","Brand Trust"];

export default function About() {
  return (
    <section id="about" className="section bg-black" aria-label="About Great Emman-Wori">
      <div className="max-w-7xl mx-auto px-5">

        <div className="text-center mb-14">
          <span className="section-label">Who I Am</span>
          {/* H2 — semantic section heading */}
          <h2 className="font-heading text-4xl md:text-5xl text-white mt-3">About Great Emman-Wori</h2>
          <div style={{width:48,height:3,background:"var(--accent)",borderRadius:2,margin:"16px auto 0"}}/>
        </div>

        {/* Bio glass card */}
        <div className="glass rounded-2xl p-8 md:p-12 mb-10 max-w-3xl mx-auto text-center"
          style={{borderColor:"rgba(111,4,20,0.22)"}}>
          <p className="font-body text-white/70 text-lg leading-relaxed mb-5">
            I'm <strong className="text-white">Great Emman-Wori</strong>, a Fullstack Website Developer, Product Designer,
            and UI/UX Designer based in <strong className="text-white">Port Harcourt, Nigeria</strong> — available remotely worldwide.
          </p>
          <p className="font-body text-white/60 leading-relaxed mb-5">
            I bridge the gap between visual design, usability, and business outcomes. I build websites and digital product
            experiences that are beautiful, responsive, user-friendly, and conversion-focused — from fullstack React
            applications and Laravel backends to WordPress builds and Figma design systems.
          </p>
          <p className="font-body text-white/55 leading-relaxed">
            Every project I deliver is built to perform, rank on Google, and convert visitors into clients.
            Currently handling digital operations and growth at{" "}
            <span style={{color:"var(--accent)",fontWeight:600}}>Phatbird</span> (UK) while building
            client websites and digital products across Nigeria, Canada, and the UK.
          </p>
        </div>

        {/* What I care about */}
        <div className="flex flex-wrap gap-3 justify-center mb-16" aria-label="Core values and focus areas">
          {VALUES.map(v=>(
            <span key={v} className="glass px-4 py-1.5 rounded-full text-sm font-medium"
              style={{color:"var(--accent)",borderColor:"var(--red-border)"}}>
              {v}
            </span>
          ))}
        </div>

        {/* Stats — NOTE: These are editable placeholders. Replace with your real numbers. */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {STATS.map((s,i)=>(
            <div key={i} className="glass rounded-2xl p-6 text-center group hover:-translate-y-1 transition-transform duration-300"
              style={{borderColor:"rgba(255,255,255,0.06)"}}>
              <div className="font-heading text-4xl font-bold text-white mb-1 group-hover:text-[#c0392b] transition-colors">{s.value}</div>
              <div className="font-body text-sm text-white/45">{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
