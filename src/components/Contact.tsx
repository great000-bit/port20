import { useState } from "react";
import { Mail, Linkedin, Instagram, Send, CheckCircle, Phone } from "lucide-react";
import { useForm } from "@formspree/react";

const TikTok = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const SOCIALS = [
  { label:"Email",     icon:<Mail size={15}/>,      href:"mailto:greatemmanwori@gmail.com",               sub:"greatemmanwori@gmail.com" },
  { label:"WhatsApp",  icon:<Phone size={15}/>,     href:"https://wa.me/2348103887554",                   sub:"+234 810 388 7554" },
  { label:"LinkedIn",  icon:<Linkedin size={15}/>,  href:"https://www.linkedin.com/in/great-emman-wori",  sub:"great-emman-wori" },
  { label:"Instagram", icon:<Instagram size={15}/>, href:"https://msng.link/o?creative_emman=ig",         sub:"@creative_emman" },
  { label:"TikTok",    icon:<TikTok />,             href:"https://www.tiktok.com/@great_emman_wori",      sub:"@great_emman_wori" },
];

const ROLES = ["client","collaborator","other"] as const;
type Role = typeof ROLES[number];

export default function Contact() {
  const formspreeId = String((import.meta as Record<string, unknown>).env?.VITE_FORMSPREE_ID ?? "");
  if (!formspreeId) {
    // Prevents the whole page from going blank if VITE_FORMSPREE_ID isn't set at build
    // time (e.g. missing from the deployment platform's env config). @formspree/react's
    // useForm() throws synchronously without a key/hashid, which unmounts the entire tree.
    console.warn(
      "Contact form: VITE_FORMSPREE_ID is not set. The contact form will render in a " +
        "disabled state. Set VITE_FORMSPREE_ID in your local .env and in your deployment " +
        "platform's environment variables, then rebuild."
    );
  }
  const [state, handleSubmit] = useForm(formspreeId || "placeholder");
  const [role, setRole] = useState<Role | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const iStyle = (name: string) => ({
    width:"100%", padding:"11px 14px",
    background:"var(--card-bg)",
    border: focused === name ? "1px solid var(--accent)" : "1px solid var(--input-border)",
    borderRadius:8, color:"var(--fg)",
    fontFamily:"Arial,sans-serif", fontSize:14,
    outline:"none", transition:"border-color 0.2s",
  });

  return (
    <section id="contact" style={{ background:"var(--bg)", padding:"clamp(80px,12vh,120px) 0" }}>
      <style>{`
        .contact-wrap {
          max-width: 1280px; margin: 0 auto;
          padding: 0 clamp(24px,5vw,64px);
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(48px,8vw,96px);
          align-items: start;
        }
        .contact-eyebrow {
          font-family: Arial,sans-serif; font-size:11px; font-weight:600;
          letter-spacing:0.2em; text-transform:uppercase;
          color:"var(--fg-ultra)"; display:block; margin-bottom:20px;
        }
        .contact-heading {
          font-family: Geist,Arial,sans-serif;
          font-size: clamp(28px,3.5vw,42px);
          font-weight:400; letter-spacing:-0.04em;
          color:"var(--fg)"; margin:0 0 16px 0;
        }
        .contact-sub {
          font-family: Arial,sans-serif; font-size:15px;
          line-height:1.65; color:"var(--fg-faint)";
          margin:0 0 40px 0;
        }
        /* Role selector — Omijeh style */
        .role-label {
          font-family: Arial,sans-serif; font-size:13px;
          color:"var(--fg-faint)"; margin-bottom:12px;
          display:block; letter-spacing:0.02em;
        }
        .role-options {
          display:flex; gap:8px; margin-bottom:32px; flex-wrap:wrap;
        }
        .role-btn {
          font-family: Arial,sans-serif; font-size:13px; font-weight:500;
          padding:6px 16px; border-radius:999px; cursor:pointer;
          transition: all 0.2s; border:1px solid var(--fg-ultra);
          background:transparent; color:"var(--fg-muted)";
        }
        .role-btn.active {
          background:var(--accent); border-color:var(--accent); color:"var(--fg)";
        }
        .role-btn:hover:not(.active) {
          border-color:"var(--fg-faint)"; color:var(--fg-muted);
        }
        /* Social links */
        .social-row {
          display:flex; align-items:center; gap:14px;
          padding:14px 0;
          border-bottom:1px solid var(--border-soft);
          text-decoration:none;
          transition:opacity 0.2s;
        }
        .social-row:last-child { border-bottom:none; }
        .social-row:hover { opacity:0.65; }
        .social-icon {
          width:32px; height:32px; border-radius:8px;
          display:flex; align-items:center; justify-content:center;
          background:rgba(111,4,20,0.12);
          color:var(--accent); flex-shrink:0;
        }
        .social-name {
          font-family:Geist,Arial,sans-serif; font-size:14px; font-weight:500;
          color:"var(--fg)";
        }
        .social-handle {
          font-family:Arial,sans-serif; font-size:12px;
          color:"var(--fg-faint)"; margin-left:auto;
        }
        /* Form */
        .form-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .form-field { display:flex; flex-direction:column; gap:6px; margin-bottom:12px; }
        .form-label {
          font-family:Arial,sans-serif; font-size:11px; font-weight:600;
          text-transform:uppercase; letter-spacing:0.1em;
          color:"var(--fg-faint)";
        }
        .form-submit {
          display:inline-flex; align-items:center; gap:8px;
          width:100%; justify-content:center;
          height:46px; border-radius:8px; cursor:pointer;
          font-family:Arial,sans-serif; font-size:14px; font-weight:600;
          background:var(--accent); color:"var(--fg)"; border:1px solid var(--accent);
          transition:background 0.2s; margin-top:4px;
        }
        .form-submit:hover { background:#8a0519; }
        .form-submit:disabled { opacity:0.5; cursor:not-allowed; }
        @media (max-width:880px) {
          .contact-grid { grid-template-columns:1fr; gap:56px; }
          .form-row { grid-template-columns:1fr; }
        }
      `}</style>

      <div className="contact-wrap">
        <div data-aos="fade-up">
          <span className="contact-eyebrow">07 — Contact</span>
          <h2 className="contact-heading">Let's Build.</h2>
          <p className="contact-sub">
            Clients, collaborators, and creative partners — reach out.
          </p>
        </div>

        <div className="contact-grid">
          {/* LEFT — socials */}
          <div data-aos="fade-up" data-aos-delay="80">
            <div style={{ borderTop:"1px solid var(--border)", paddingTop:0 }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-row">
                  <div className="social-icon">{s.icon}</div>
                  <span className="social-name">{s.label}</span>
                  <span className="social-handle">{s.sub}</span>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — role selector + form */}
          <div data-aos="fade-up" data-aos-delay="140">
            {!formspreeId ? (
              <div style={{ textAlign:"center", padding:"48px 0" }}>
                <p style={{ fontFamily:"Geist,Arial,sans-serif", fontSize:16, color:"var(--fg)", marginBottom:8 }}>
                  The contact form is temporarily unavailable.
                </p>
                <p style={{ fontFamily:"Arial,sans-serif", fontSize:14, color:"var(--fg-faint)" }}>
                  Please reach out directly using one of the links on the left in the meantime.
                </p>
              </div>
            ) : state.succeeded ? (
              <div style={{ textAlign:"center", padding:"48px 0" }}>
                <CheckCircle size={40} style={{ color:"var(--accent)", margin:"0 auto 16px", display:"block" }}/>
                <p style={{ fontFamily:"Geist,Arial,sans-serif", fontSize:18, color:"var(--fg)", marginBottom:8 }}>Message sent.</p>
                <p style={{ fontFamily:"Arial,sans-serif", fontSize:14, color:"var(--fg-faint)" }}>I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Role selector */}
                <span className="role-label">I am a</span>
                <div className="role-options">
                  {ROLES.map(r => (
                    <button
                      key={r} type="button"
                      className={`role-btn${role === r ? " active" : ""}`}
                      onClick={() => setRole(r)}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                {/* Hidden role field */}
                {role && <input type="hidden" name="role" value={role}/>}

                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" required placeholder="Your name"
                      style={iStyle("name") as React.CSSProperties}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}/>
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required placeholder="your@email.com"
                      style={iStyle("email") as React.CSSProperties}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}/>
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea id="message" name="message" required rows={5}
                    placeholder="Tell me about your project..."
                    style={{...iStyle("message") as React.CSSProperties, resize:"none"}}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}/>
                </div>

                <button type="submit" disabled={state.submitting} className="form-submit">
                  <Send size={14}/> {state.submitting ? "Sending…" : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
