import { Plus } from "lucide-react";
import faq from "@/faq.json";

export default function FAQ() {
  return (
    <>
      <style>{`
        .faq-wrap { max-width: 860px; margin: 0 auto; padding: 0 20px; }
        .faq-kicker { display: block; font: 600 11px Arial, sans-serif; letter-spacing: .18em; text-transform: uppercase; color: var(--fg-ultra); margin-bottom: 16px; }
        .faq-title { font-family: Geist, Arial, sans-serif; font-size: clamp(28px, 3.5vw, 42px); font-weight: 400; color: var(--fg); letter-spacing: -.04em; margin: 0 0 12px; }
        .faq-sub { font: 15px/1.7 Arial, sans-serif; color: var(--fg-faint); max-width: 52ch; margin: 0 0 40px; }
        .faq-list { display: flex; flex-direction: column; border-top: 1px solid var(--border); }
        .faq-item { border-bottom: 1px solid var(--border); }
        .faq-q { list-style: none; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 22px 0; font: 600 16px/1.4 Geist, Arial, sans-serif; letter-spacing: -.01em; color: var(--fg); }
        .faq-q::-webkit-details-marker { display: none; }
        .faq-q:hover { color: var(--accent); }
        .faq-icon { flex: 0 0 auto; display: grid; place-items: center; width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--border-strong); color: var(--fg-muted); transition: transform .25s ease, background .2s, border-color .2s, color .2s; }
        .faq-item[open] .faq-icon { transform: rotate(45deg); background: var(--accent); border-color: var(--accent); color: #fff; }
        .faq-a { font: 15px/1.75 Arial, sans-serif; color: var(--fg-muted); margin: 0; padding: 0 50px 24px 0; max-width: 70ch; }
        @media (max-width: 560px) { .faq-a { padding-right: 0; } }
      `}</style>
      <section id="faq" className="section" style={{ background: "var(--bg)" }} aria-label="Frequently asked questions">
        <div className="faq-wrap">
          <div data-aos="fade-up">
            <span className="faq-kicker">FAQ</span>
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <p className="faq-sub">Quick answers about the work, the company and how to get started.</p>
          </div>
          <div className="faq-list" data-aos="fade-up">
            {faq.map((item) => (
              <details key={item.q} className="faq-item">
                <summary className="faq-q">
                  <span>{item.q}</span>
                  <span className="faq-icon" aria-hidden="true"><Plus size={15} /></span>
                </summary>
                <p className="faq-a">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
