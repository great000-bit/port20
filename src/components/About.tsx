const STATS = [
  { value:"16+",   label:"Projects Completed",      note:"<!-- EDITABLE -->" },
  { value:"3+",    label:"Years Learning & Building", note:"<!-- EDITABLE -->" },
  { value:"100%",  label:"Responsive Builds",         note:"<!-- EDITABLE -->" },
  { value:"SEO✓",  label:"SEO-Ready Delivery",         note:"<!-- EDITABLE -->" },
];

const VALUES = [
  "Usability","Visual Clarity","Performance","Accessibility",
  "Storytelling","Conversion","Brand Trust",
];

export default function About() {
  return (
    <section id="about" className="section bg-black">
      <div className="max-w-7xl mx-auto px-5">

        <div className="text-center mb-14">
          <span className="section-label">About Me</span>
          <h2 className="font-heading text-4xl md:text-5xl text-white mt-3">The person behind the work</h2>
        </div>

        {/* Bio — glass card */}
        <div className="glass rounded-2xl p-8 md:p-12 mb-10 max-w-3xl mx-auto text-center"
          style={{borderColor:"rgba(111,4,20,0.25)"}}>
          <p className="font-body text-white/70 text-lg leading-relaxed mb-5">
            I'm <strong className="text-white">Great Emman-Wori</strong>, a WordPress Developer, Product Designer, and UI/UX Designer
            based in Port Harcourt, Nigeria — bridging the gap between visual design, usability, and business outcomes.
          </p>
          <p className="font-body text-white/60 leading-relaxed mb-5">
            I build websites and digital product experiences that are beautiful, responsive, user-friendly, and conversion-focused.
            From custom WordPress builds and Elementor designs to full-stack React apps and Figma design systems —
            every project I deliver is built to perform, rank, and convert.
          </p>
          <p className="font-body text-white/60 leading-relaxed">
            Currently handling digital operations and campaign management at{" "}
            <span style={{color:"var(--accent)",fontWeight:600}}>Phatbird</span> (UK),
            while building client websites, digital products, and brand experiences for global clients.
          </p>
        </div>

        {/* What I care about */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {VALUES.map(v=>(
            <span key={v} className="glass px-4 py-1.5 rounded-full text-sm font-medium"
              style={{color:"var(--accent)",borderColor:"var(--red-border)"}}>
              {v}
            </span>
          ))}
        </div>

        {/* Stats — 4 cards */}
        {/* NOTE: Values below are editable placeholders — update with real numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {STATS.map((s,i)=>(
            <div key={i} className="glass rounded-2xl p-6 text-center group hover:-translate-y-1 transition-transform duration-300"
              style={{borderColor:"rgba(255,255,255,0.07)"}}>
              <div className="font-heading text-4xl font-bold text-white mb-1 group-hover:text-[#6f0414] transition-colors">
                {s.value}
              </div>
              <div className="font-body text-sm text-white/50">{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
