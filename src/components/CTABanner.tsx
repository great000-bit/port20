export default function CTABanner() {
  return (
    <>
      {/* Pull quote — strong branded statement */}
      <section aria-label="Brand statement" style={{
        background:"#000",
        padding:"clamp(80px,12vh,120px) clamp(24px,5vw,64px)",
        borderTop:"1px solid rgba(255,255,255,0.05)",
        borderBottom:"1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }} data-aos="fade-up">
          <blockquote style={{
            fontFamily:"Geist,Arial,sans-serif",
            fontSize:"clamp(28px,4.5vw,56px)",
            fontWeight:400,
            letterSpacing:"-0.045em",
            lineHeight:1.12,
            color:"#fff",
            margin:0,
            maxWidth:900,
          }}>
            "Every pixel, every line of code, every interaction — built to make your brand
            impossible to <em style={{ fontStyle:"italic", color:"var(--accent)" }}>ignore</em>."
          </blockquote>
          <p style={{
            fontFamily:"Arial,sans-serif", fontSize:13,
            color:"rgba(255,255,255,0.22)", marginTop:28,
            letterSpacing:"0.06em", textTransform:"uppercase",
          }}>
            — Great Emman-Wori, Founder · Creative Emman
          </p>
        </div>
      </section>

      {/* CTA section */}
      <section style={{ background:"#000", padding:"clamp(64px,8vh,96px) clamp(24px,5vw,64px)" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:32 }} data-aos="fade-up">
          <div>
            <h2 style={{
              fontFamily:"Geist,Arial,sans-serif",
              fontSize:"clamp(24px,3vw,36px)",
              fontWeight:400, letterSpacing:"-0.03em",
              color:"#fff", margin:"0 0 8px 0",
            }}>
              Ready to build something that converts?
            </h2>
            <p style={{ fontFamily:"Arial,sans-serif", fontSize:15, color:"rgba(255,255,255,0.35)", margin:0 }}>
              Available for freelance, contract, and remote projects.
            </p>
          </div>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <a href="#contact" style={{
              display:"inline-flex", alignItems:"center", gap:6,
              height:46, padding:"0 24px", borderRadius:8,
              fontFamily:"Arial,sans-serif", fontSize:14, fontWeight:600,
              background:"var(--accent)", color:"#fff",
              border:"1px solid var(--accent)", textDecoration:"none",
              transition:"background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background="#8a0519")}
            onMouseLeave={e => (e.currentTarget.style.background="var(--accent)")}>
              Start a Project →
            </a>
            <a href="#portfolio" style={{
              display:"inline-flex", alignItems:"center", gap:6,
              height:46, padding:"0 24px", borderRadius:8,
              fontFamily:"Arial,sans-serif", fontSize:14, fontWeight:600,
              background:"transparent", color:"rgba(255,255,255,0.55)",
              border:"1px solid rgba(255,255,255,0.12)", textDecoration:"none",
              transition:"border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.28)"; e.currentTarget.style.color="#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.12)"; e.currentTarget.style.color="rgba(255,255,255,0.55)"; }}>
              View My Work
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
