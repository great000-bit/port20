export default function CTABanner() {
  return (
    <section className="section-sm bg-black">
      <div className="max-w-4xl mx-auto px-5">
        <div className="glass rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{borderColor:"rgba(111,4,20,0.35)"}}>
          {/* glow */}
          <div aria-hidden="true" style={{
            position:"absolute",inset:0,
            background:"radial-gradient(ellipse at center, rgba(111,4,20,0.12) 0%, transparent 70%)",
            pointerEvents:"none",
          }}/>
          <div className="relative z-10">
            <span className="section-label mb-6">Let's Build</span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mt-3 mb-5 leading-tight">
              Ready to build a website that<br className="hidden sm:block"/> looks premium and converts?
            </h2>
            <p className="font-body text-white/55 text-lg mb-8 max-w-xl mx-auto">
              Let's create a fast, elegant, user-friendly digital experience for your brand, business, or product.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#contact" className="btn-red">Start a Project →</a>
              <a href="#portfolio" className="btn-outline">View My Work</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
