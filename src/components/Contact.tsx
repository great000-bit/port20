import { useState } from "react";
import { Phone, Mail, Linkedin, Instagram, Send, CheckCircle } from "lucide-react";
import { useForm } from "@formspree/react";

const TikTok = ({size=18}:{size?:number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const SOCIALS = [
  { label:"WhatsApp",  icon:<Phone size={18}/>,      href:"https://wa.me/2348103887554",                    sub:"+234 810 388 7554" },
  { label:"Email",     icon:<Mail size={18}/>,        href:"mailto:greatemmanwori@gmail.com",                sub:"greatemmanwori@gmail.com" },
  { label:"LinkedIn",  icon:<Linkedin size={18}/>,    href:"https://www.linkedin.com/in/great-emman-wori",  sub:"great-emman-wori" },
  { label:"Instagram", icon:<Instagram size={18}/>,   href:"https://msng.link/o?creative_emman=ig",         sub:"@creative_emman" },
  { label:"TikTok",    icon:<TikTok />,               href:"https://www.tiktok.com/@great_emman_wori",      sub:"@great_emman_wori" },
];

const INPUT = "w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/30 outline-none transition-all duration-200";
const INPUT_STYLE = {background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)"};

export default function Contact() {
  const formspreeId = String((import.meta as Record<string,unknown>).env?.VITE_FORMSPREE_ID ?? "");
  const [state, handleSubmit] = useForm(formspreeId);
  const [focused, setFocused] = useState<string|null>(null);

  const focusStyle = (name:string) => focused===name
    ? {...INPUT_STYLE,borderColor:"var(--accent)",boxShadow:"0 0 0 2px rgba(111,4,20,0.18)"}
    : INPUT_STYLE;

  return (
    <section id="contact" className="section bg-[#030303]">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14">
          <span className="section-label">Get In Touch</span>
          <h2 className="font-heading text-4xl md:text-5xl text-white mt-3">Let's work together</h2>
          <div style={{width:48,height:3,background:"var(--accent)",borderRadius:2,margin:"16px auto 0"}}/>
          <p className="font-body text-white/45 mt-4 max-w-lg mx-auto">
            Have a project in mind? Let's discuss how we can create something exceptional together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Socials */}
          <aside>
            <h3 className="font-heading text-2xl font-semibold text-white mb-6">Contact Channels</h3>
            <div className="flex flex-col gap-3">
              {SOCIALS.map(s=>(
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="glass flex items-center gap-4 rounded-xl p-4 group transition-all duration-200"
                  style={{borderColor:"rgba(255,255,255,0.07)"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(111,4,20,0.45)";e.currentTarget.style.boxShadow="0 0 16px rgba(111,4,20,0.15)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";e.currentTarget.style.boxShadow="";}}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[#6f0414]"
                    style={{background:"rgba(111,4,20,0.15)",color:"var(--accent)"}}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="font-heading font-medium text-white text-sm">{s.label}</p>
                    <p className="font-body text-xs text-white/45 group-hover:text-white/65 transition-colors">{s.sub}</p>
                  </div>
                </a>
              ))}
            </div>
          </aside>

          {/* Form */}
          <div>
            {state.succeeded ? (
              <div className="glass rounded-2xl p-10 text-center" style={{borderColor:"rgba(111,4,20,0.35)"}}>
                <CheckCircle size={48} style={{color:"var(--accent)",margin:"0 auto 16px"}}/>
                <h3 className="font-heading text-xl font-semibold text-white mb-2">Message Sent!</h3>
                <p className="font-body text-white/55">I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-7 space-y-4"
                style={{borderColor:"rgba(255,255,255,0.07)"}}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="font-body text-xs text-white/50 mb-1.5 block">Name <span style={{color:"var(--accent)"}}>*</span></label>
                    <input id="name" name="name" type="text" required placeholder="Your name"
                      className={INPUT} style={focusStyle("name")}
                      onFocus={()=>setFocused("name")} onBlur={()=>setFocused(null)}/>
                  </div>
                  <div>
                    <label htmlFor="email" className="font-body text-xs text-white/50 mb-1.5 block">Email <span style={{color:"var(--accent)"}}>*</span></label>
                    <input id="email" name="email" type="email" required placeholder="your@email.com"
                      className={INPUT} style={focusStyle("email")}
                      onFocus={()=>setFocused("email")} onBlur={()=>setFocused(null)}/>
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="font-body text-xs text-white/50 mb-1.5 block">Phone Number</label>
                  <input id="phone" name="phone" type="tel" placeholder="+234..."
                    className={INPUT} style={focusStyle("phone")}
                    onFocus={()=>setFocused("phone")} onBlur={()=>setFocused(null)}/>
                </div>
                <div>
                  <label htmlFor="subject" className="font-body text-xs text-white/50 mb-1.5 block">Subject <span style={{color:"var(--accent)"}}>*</span></label>
                  <input id="subject" name="subject" type="text" required placeholder="What's this about?"
                    className={INPUT} style={focusStyle("subject")}
                    onFocus={()=>setFocused("subject")} onBlur={()=>setFocused(null)}/>
                </div>
                <div>
                  <label htmlFor="message" className="font-body text-xs text-white/50 mb-1.5 block">Message <span style={{color:"var(--accent)"}}>*</span></label>
                  <textarea id="message" name="message" required rows={5} placeholder="Describe your project..."
                    className={INPUT} style={{...focusStyle("message"),resize:"none"}}
                    onFocus={()=>setFocused("message")} onBlur={()=>setFocused(null)}/>
                </div>
                <button type="submit" disabled={state.submitting}
                  className="btn-red w-full justify-center"
                  style={{opacity:state.submitting?0.6:1}}>
                  <Send size={15}/> {state.submitting?"Sending…":"Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
