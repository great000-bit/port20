export default function CTABanner() {
  return (
    <section className="section-sm bg-black" aria-label="Call to action">
      <div className="max-w-4xl mx-auto px-5">
        <div className="glass rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{borderColor:"rgba(111,4,20,0.32)"}}>
          <div aria-hidden="true" style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center,rgba(111,4,20,0.10) 0%,transparent 70%)",pointerEvents:"none"}}/>
          <div className="relative z-10">
            <span className="section-label mb-6">Let's Build Together</span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mt-3 mb-5 leading-tight">
              Ready to build a website that<br className="hidden sm:block"/> looks premium and converts?
            </h2>
            <p className="font-body text-white/50 text-lg mb-8 max-w-xl mx-auto">
              Let's create a fast, elegant, user-friendly digital experience for your brand, business, or product.
              Available for freelance, contract, and remote fullstack website development.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#contact" className="btn-red" aria-label="Start a fullstack website project with Great Emman-Wori">Start a Project →</a>
              <a href="#portfolio" className="btn-outline" aria-label="View Great Emman-Wori's fullstack projects">View My Work</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
