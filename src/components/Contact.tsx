import { FormEvent, useEffect, useRef, useState } from "react";
import { Mail, Linkedin, Instagram, Send, CheckCircle, Phone, Smartphone } from "lucide-react";
import { ValidationError, useForm } from "@formspree/react";

const DEFAULT_PORTFOLIO_FORM_ENDPOINT = "https://formspree.io/f/xdaqjqwe";

const configuredFormEndpoint = String(import.meta.env.VITE_FORMSPREE_ENDPOINT ?? "").trim();
const normalizedConfiguredFormEndpoint = configuredFormEndpoint.replace(/\/$/, "");
const isValidFormspreeEndpoint = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "formspree.io" && /^\/f\/[a-zA-Z0-9]+\/?$/.test(url.pathname);
  } catch {
    return false;
  }
};

const PORTFOLIO_FORM_ENDPOINT = isValidFormspreeEndpoint(configuredFormEndpoint)
  && normalizedConfiguredFormEndpoint === DEFAULT_PORTFOLIO_FORM_ENDPOINT
  ? normalizedConfiguredFormEndpoint
  : DEFAULT_PORTFOLIO_FORM_ENDPOINT;
const PORTFOLIO_FORM_KEY = PORTFOLIO_FORM_ENDPOINT.split("/").pop() ?? "xdaqjqwe";

type ContactFormFields = {
  name: string;
  email: string;
  message: string;
  role?: string;
  _gotcha?: string;
};

type RequiredField = "name" | "email" | "message";
type FieldErrors = Partial<Record<RequiredField, string>>;

const TikTok = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const SOCIALS = [
  { label:"Email",     icon:<Mail size={15}/>,       href:"mailto:greatemmanwori@gmail.com",               sub:"greatemmanwori@gmail.com", ariaLabel:"Email Great Emman-wori" },
  { label:"WhatsApp",  icon:<Phone size={15}/>,      href:"https://wa.me/2348103887554",                   sub:"+234 810 388 7554",        ariaLabel:"Message Great Emman-wori on WhatsApp" },
  { label:"Phone",     icon:<Smartphone size={15}/>, href:"tel:+2347037845433",                            sub:"+234 703 784 5433",        ariaLabel:"Call Great Emman-wori" },
  { label:"LinkedIn",  icon:<Linkedin size={15}/>,   href:"https://www.linkedin.com/in/great-emman-wori",  sub:"great-emman-wori",         ariaLabel:"Connect with Great Emman-wori on LinkedIn" },
  { label:"Instagram", icon:<Instagram size={15}/>,  href:"https://msng.link/o?creative_emman=ig",         sub:"@creative_emman",          ariaLabel:"Follow Great Emman-wori on Instagram" },
  { label:"TikTok",    icon:<TikTok />,              href:"https://www.tiktok.com/@great_emman_wori",      sub:"@great_emman_wori",        ariaLabel:"Follow Great Emman-wori on TikTok" },
];

const ROLES = ["client","collaborator","other"] as const;
type Role = typeof ROLES[number];

export default function Contact() {
  const [state, handleSubmit, resetSubmission] = useForm<ContactFormFields>(PORTFOLIO_FORM_KEY);
  const [role, setRole] = useState<Role | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [successOpen, setSuccessOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreSubmitFocusRef = useRef(false);

  useEffect(() => {
    if (!state.succeeded) return;

    formRef.current?.reset();
    setRole(null);
    setFieldErrors({});
    setSuccessOpen(true);
  }, [state.succeeded]);

  useEffect(() => {
    if (!successOpen) return;

    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        restoreSubmitFocusRef.current = true;
        setSuccessOpen(false);
        resetSubmission();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [resetSubmission, successOpen]);

  useEffect(() => {
    if (successOpen || !restoreSubmitFocusRef.current) return;
    restoreSubmitFocusRef.current = false;
    const focusTimer = window.setTimeout(() => submitButtonRef.current?.focus(), 50);
    return () => window.clearTimeout(focusTimer);
  }, [successOpen]);

  const closeSuccessModal = () => {
    restoreSubmitFocusRef.current = true;
    setSuccessOpen(false);
    resetSubmission();
  };

  const clearFieldError = (field: RequiredField) => {
    setFieldErrors(current => current[field] ? { ...current, [field]: undefined } : current);
  };

  const submitContactForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;
    const nextErrors: FieldErrors = {};

    if (!name) nextErrors.name = "Please enter your name.";
    if (!email) nextErrors.email = "Please enter your email address.";
    else if (emailInput?.validity.typeMismatch) nextErrors.email = "Please enter a valid email address.";
    if (!message) nextErrors.message = "Please enter a message.";

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      const firstInvalidField = (["name", "email", "message"] as RequiredField[]).find(field => nextErrors[field]);
      if (firstInvalidField) (form.elements.namedItem(firstInvalidField) as HTMLElement | null)?.focus();
      return;
    }

    setFieldErrors({});
    resetSubmission();
    await handleSubmit(event);
  };

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
          min-width:0; overflow-wrap:anywhere; text-align:right;
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
        .role-btn:focus-visible,
        .form-submit:focus-visible,
        .contact-modal-close:focus-visible {
          outline:2px solid var(--accent); outline-offset:3px;
        }
        .contact-honeypot {
          position:absolute; width:1px; height:1px; padding:0; margin:-1px;
          overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0;
        }
        .form-error {
          display:block; margin-top:2px;
          font-family:Arial,sans-serif; font-size:12px; line-height:1.45;
          color:var(--accent);
        }
        .form-error-summary { margin:0 0 12px; }
        .contact-status {
          position:absolute; width:1px; height:1px; padding:0; margin:-1px;
          overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0;
        }
        .contact-modal-backdrop {
          position:fixed; inset:0; z-index:200;
          display:flex; align-items:center; justify-content:center;
          padding:24px; background:rgba(0,0,0,0.72);
        }
        .contact-modal {
          width:min(100%,420px); border-radius:16px;
          padding:40px 32px; text-align:center;
          background:var(--card-bg); border:1px solid var(--border);
          color:var(--fg); box-shadow:0 24px 80px rgba(0,0,0,0.35);
        }
        .contact-modal-title {
          font-family:Geist,Arial,sans-serif; font-size:18px;
          font-weight:500; color:var(--fg); margin:0 0 8px;
        }
        .contact-modal-copy {
          font-family:Arial,sans-serif; font-size:14px;
          color:var(--fg-faint); margin:0 0 24px;
        }
        .contact-modal-close { margin-top:0; }
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
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.ariaLabel}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="social-row"
                >
                  <div className="social-icon">{s.icon}</div>
                  <span className="social-name">{s.label}</span>
                  <span className="social-handle">{s.sub}</span>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — role selector + form */}
          <div data-aos="fade-up" data-aos-delay="140">
            <form
              ref={formRef}
              action={PORTFOLIO_FORM_ENDPOINT}
              method="POST"
              noValidate
              onSubmit={submitContactForm}
            >
              {/* Role selector */}
              <span className="role-label">I am a</span>
              <div className="role-options" aria-label="Enquiry type">
                {ROLES.map(r => (
                  <button
                    key={r} type="button"
                    className={`role-btn${role === r ? " active" : ""}`}
                    aria-pressed={role === r}
                    onClick={() => setRole(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* Hidden role field and Formspree honeypot */}
              {role && <input type="hidden" name="role" value={role}/>}
              <div className="contact-honeypot" aria-hidden="true">
                <label htmlFor="contact-company">Leave this field empty</label>
                <input id="contact-company" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" required placeholder="Your name"
                    aria-invalid={Boolean(fieldErrors.name || state.errors?.getFieldErrors("name").length)}
                    aria-describedby={fieldErrors.name ? "name-error" : undefined}
                    style={iStyle("name") as React.CSSProperties}
                    onChange={() => clearFieldError("name")}
                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}/>
                  {fieldErrors.name && <span id="name-error" className="form-error" role="alert">{fieldErrors.name}</span>}
                  <ValidationError errors={state.errors} field="name" className="form-error" role="alert" />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required placeholder="your@email.com"
                    aria-invalid={Boolean(fieldErrors.email || state.errors?.getFieldErrors("email").length)}
                    aria-describedby={fieldErrors.email ? "email-error" : undefined}
                    style={iStyle("email") as React.CSSProperties}
                    onChange={() => clearFieldError("email")}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}/>
                  {fieldErrors.email && <span id="email-error" className="form-error" role="alert">{fieldErrors.email}</span>}
                  <ValidationError errors={state.errors} field="email" className="form-error" role="alert" />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea id="message" name="message" required rows={5}
                  placeholder="Tell me about your project..."
                  aria-invalid={Boolean(fieldErrors.message || state.errors?.getFieldErrors("message").length)}
                  aria-describedby={fieldErrors.message ? "message-error" : undefined}
                  style={{...iStyle("message") as React.CSSProperties, resize:"none"}}
                  onChange={() => clearFieldError("message")}
                  onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}/>
                {fieldErrors.message && <span id="message-error" className="form-error" role="alert">{fieldErrors.message}</span>}
                <ValidationError errors={state.errors} field="message" className="form-error" role="alert" />
              </div>

              <ValidationError
                errors={state.errors}
                prefix="Unable to send your message:"
                className="form-error form-error-summary"
                role="alert"
                aria-live="assertive"
              />

              <button ref={submitButtonRef} type="submit" disabled={state.submitting} className="form-submit">
                <Send size={14}/> {state.submitting ? "Sending…" : "Send Message →"}
              </button>
              <span className="contact-status" role="status" aria-live="polite">
                {state.submitting ? "Sending your message." : successOpen ? "Your message was sent successfully." : ""}
              </span>
            </form>
          </div>
        </div>
      </div>

      {successOpen && (
        <div
          className="contact-modal-backdrop"
          onMouseDown={event => {
            if (event.target === event.currentTarget) closeSuccessModal();
          }}
        >
          <div
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
            aria-describedby="contact-success-description"
            onKeyDown={event => {
              if (event.key === "Tab") {
                event.preventDefault();
                closeButtonRef.current?.focus();
              }
            }}
          >
            <CheckCircle size={40} aria-hidden="true" style={{ color:"var(--accent)", margin:"0 auto 16px", display:"block" }}/>
            <p id="contact-success-title" className="contact-modal-title">Message sent.</p>
            <p id="contact-success-description" className="contact-modal-copy">I'll get back to you within 24 hours.</p>
            <button ref={closeButtonRef} type="button" className="form-submit contact-modal-close" onClick={closeSuccessModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
