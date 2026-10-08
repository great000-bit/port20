import { useState } from "react";
import { Check, ArrowUpRight } from "lucide-react";

type Currency = "NGN" | "USD";

type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: Record<Currency, string>;
  features: string[];
  featured?: boolean;
};

const WHATSAPP_NUMBER = "2348103887554";

const PLANS: Plan[] = [
  {
    id: "branding",
    name: "Branding",
    tagline: "Complete brand identity",
    price: { NGN: "₦250,000", USD: "$170" },
    features: [
      "Logo with 3 concepts",
      "Color palette and typography",
      "Brand guidelines PDF",
      "Business card design",
      "Social media kit",
    ],
    featured: true,
  },
  {
    id: "logo",
    name: "Logo",
    tagline: "A mark that lasts",
    price: { NGN: "₦60,000", USD: "$40" },
    features: [
      "3 initial concepts",
      "2 rounds of revisions",
      "PNG, SVG and PDF files",
      "Light and dark versions",
      "Full usage rights",
    ],
  },
  {
    id: "flyer",
    name: "Flyer",
    tagline: "Print and digital ready",
    price: { NGN: "₦20,000", USD: "$15" },
    features: [
      "1 custom flyer design",
      "2 rounds of revisions",
      "Print-ready PDF",
      "Web-optimised PNG",
      "Your copy, logo and brand colors",
    ],
  },
  {
    id: "cover-photo",
    name: "Cover Photo",
    tagline: "Profile and page headers",
    price: { NGN: "₦15,000", USD: "$10" },
    features: [
      "1 custom cover design",
      "2 rounds of revisions",
      "Sized for one platform",
      "High-resolution PNG",
      "Mobile and desktop safe zones",
    ],
  },
];

const whatsappLink = (plan: Plan) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Great, I'd like to get started with the ${plan.name} package.`
  )}`;

export default function RateCard() {
  const [currency, setCurrency] = useState<Currency>("NGN");

  return (
    <>
      <style>{`
        .gx-rc { position: relative; overflow: hidden; background: var(--bg); padding: 40px clamp(20px,5vw,64px) 120px; }
        .gx-rc-glow { position: absolute; left: 50%; top: 60px; width: min(900px, 90vw); height: 420px; transform: translateX(-50%); background: radial-gradient(ellipse, var(--accent-soft) 0%, transparent 68%); pointer-events: none; }
        .gx-rc-wrap { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; }

        .gx-rc-head { text-align: center; margin-bottom: 48px; }
        .gx-rc-kicker { display: inline-block; color: var(--accent); font: 600 12px/1 Arial, sans-serif; letter-spacing: .11em; text-transform: uppercase; padding: 7px 14px; border: 1px solid var(--accent-border); border-radius: 999px; background: var(--accent-soft); margin: 0 0 22px; }
        .gx-rc-title { font-family: Geist, Arial, sans-serif; font-weight: 800; font-size: clamp(54px, 11vw, 132px); line-height: .95; letter-spacing: -.06em; margin: 0 0 20px; background: linear-gradient(180deg, var(--fg) 25%, var(--fg-faint) 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; }
        .gx-rc-sub { font: 16px/1.7 Arial, sans-serif; color: var(--fg-muted); max-width: 52ch; margin: 0 auto 30px; }

        .gx-rc-switch { display: inline-flex; gap: 4px; padding: 5px; border-radius: 999px; background: linear-gradient(135deg, rgba(255,255,255,.10) 0%, rgba(255,255,255,.03) 100%); backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%); border: 1px solid var(--nav-pill-border); box-shadow: inset 0 1px 0 rgba(255,255,255,.10); }
        [data-theme="light"] .gx-rc-switch { background: var(--nav-pill); box-shadow: none; }
        .gx-rc-switch-btn { padding: 9px 20px; border: none; border-radius: 999px; background: transparent; cursor: pointer; font: 600 13px Arial, sans-serif; color: var(--fg-muted); transition: background .2s, color .2s; }
        .gx-rc-switch-btn:hover { color: var(--fg); }
        .gx-rc-switch-btn.gx-active { background: var(--accent); color: #fff; }

        .gx-rc-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; align-items: stretch; }
        .gx-rc-card { position: relative; display: flex; flex-direction: column; border-radius: 26px; border: 1px solid var(--card-border); background: linear-gradient(180deg, rgba(255,255,255,.055) 0%, rgba(255,255,255,.015) 100%); box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 24px 60px rgba(0,0,0,.28); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease; overflow: hidden; }
        [data-theme="light"] .gx-rc-card { background: var(--card-bg); box-shadow: 0 18px 44px rgba(17,17,17,.08); }
        .gx-rc-card:hover { transform: translateY(-6px); border-color: var(--accent-border); }
        .gx-rc-card.gx-featured { border-color: var(--accent-border); box-shadow: inset 0 1px 0 rgba(255,255,255,.10), 0 0 0 1px var(--accent-border), 0 24px 70px rgba(111,4,20,.32); }
        .gx-rc-card.gx-featured::before { content: ""; position: absolute; inset: 0 0 auto 0; height: 160px; background: radial-gradient(ellipse at 50% 0%, var(--accent-soft) 0%, transparent 70%); pointer-events: none; }

        .gx-rc-top { position: relative; padding: 28px 26px 26px; border-bottom: 1px solid var(--border); }
        .gx-rc-name-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 18px; }
        .gx-rc-name { font: 600 14px/1 Geist, Arial, sans-serif; color: var(--fg); letter-spacing: -.01em; }
        .gx-rc-badge { font: 600 10px/1 Arial, sans-serif; letter-spacing: .08em; text-transform: uppercase; color: #fff; background: var(--accent); padding: 6px 9px; border-radius: 999px; }
        .gx-rc-price { font-family: Geist, Arial, sans-serif; font-weight: 700; font-size: clamp(32px, 3.2vw, 42px); line-height: 1; letter-spacing: -.045em; margin: 0 0 12px; background: linear-gradient(90deg, var(--fg) 55%, var(--fg-faint) 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; white-space: nowrap; }
        .gx-rc-tagline { font: 13px/1.5 Arial, sans-serif; color: var(--fg-muted); margin: 0; }

        .gx-rc-list { list-style: none; display: flex; flex-direction: column; gap: 15px; padding: 26px 26px 28px; margin: 0; flex: 1; }
        .gx-rc-item { display: flex; align-items: flex-start; gap: 12px; font: 13px/1.5 Arial, sans-serif; color: var(--fg-muted); }
        .gx-rc-check { flex: 0 0 auto; width: 24px; height: 24px; display: grid; place-items: center; border-radius: 50%; background: var(--nav-pill); border: 1px solid var(--nav-pill-border); color: var(--fg); }
        .gx-featured .gx-rc-check { background: var(--accent); border-color: var(--accent); color: #fff; }

        .gx-rc-cta-wrap { padding: 0 26px 26px; }
        .gx-rc-cta { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 14px 20px; border-radius: 999px; font: 600 13px Arial, sans-serif; text-decoration: none; color: var(--fg); background: transparent; border: 1px solid var(--border-strong); transition: background .2s, border-color .2s, color .2s; }
        .gx-rc-cta:hover { border-color: var(--accent); color: var(--accent); }
        .gx-featured .gx-rc-cta { background: var(--accent); border-color: var(--accent); color: #fff; }
        .gx-featured .gx-rc-cta:hover { background: var(--accent-hover); border-color: var(--accent-hover); color: #fff; }

        .gx-rc-note { text-align: center; font: 13px/1.6 Arial, sans-serif; color: var(--fg-faint); margin: 34px auto 0; max-width: 60ch; }
        .gx-rc-note a { color: var(--fg-muted); text-decoration: underline; text-underline-offset: 3px; }
        .gx-rc-note a:hover { color: var(--accent); }

        @media (max-width: 1060px) { .gx-rc-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 620px) { .gx-rc-grid { grid-template-columns: 1fr; max-width: 440px; margin: 0 auto; } .gx-rc { padding-bottom: 88px; } }
      `}</style>

      <section id="rates" className="gx-rc" aria-label="Rate card">
        <div className="gx-rc-glow" aria-hidden="true" />
        <div className="gx-rc-wrap">
          <div className="gx-rc-head" data-aos="fade-up">
            <p className="gx-rc-kicker">Pricing</p>
            <h2 className="gx-rc-title">Rate Card</h2>
            <p className="gx-rc-sub">
              Clear, fixed rates for the most common design work. Pick a package and message me to get started.
            </p>
            <div className="gx-rc-switch" role="group" aria-label="Currency">
              {(["NGN", "USD"] as Currency[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`gx-rc-switch-btn${currency === c ? " gx-active" : ""}`}
                  aria-pressed={currency === c}
                  onClick={() => setCurrency(c)}
                >
                  {c === "NGN" ? "₦ Naira" : "$ Dollar"}
                </button>
              ))}
            </div>
          </div>

          <div className="gx-rc-grid">
            {PLANS.map((plan, index) => (
              <article
                key={plan.id}
                className={`gx-rc-card${plan.featured ? " gx-featured" : ""}`}
                data-aos="fade-up"
                data-aos-delay={index * 70}
              >
                <div className="gx-rc-top">
                  <div className="gx-rc-name-row">
                    <h3 className="gx-rc-name">{plan.name}</h3>
                    {plan.featured && <span className="gx-rc-badge">Most complete</span>}
                  </div>
                  <p className="gx-rc-price">{plan.price[currency]}</p>
                  <p className="gx-rc-tagline">{plan.tagline}</p>
                </div>

                <ul className="gx-rc-list">
                  {plan.features.map((feature) => (
                    <li key={feature} className="gx-rc-item">
                      <span className="gx-rc-check" aria-hidden="true">
                        <Check size={13} strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="gx-rc-cta-wrap">
                  <a
                    className="gx-rc-cta"
                    href={whatsappLink(plan)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Get started with the ${plan.name} package on WhatsApp`}
                  >
                    Get Started <ArrowUpRight size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="gx-rc-note">
            Rates are starting prices per project. Need something bigger or custom?{" "}
            <a href="#contact">Send a brief</a> and I will quote it.
          </p>
        </div>
      </section>
    </>
  );
}
