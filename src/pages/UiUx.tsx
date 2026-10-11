import { Link, useSearchParams } from "react-router-dom";
import { Mail, MapPin, Briefcase, ArrowUpRight } from "lucide-react";
import Seo from "../components/Seo";
import Contact from "../components/Contact";
import UiUxNav from "../components/uiux/UiUxNav";
import ProjectCard from "../components/uiux/ProjectCard";
import { profile, projects, testimonials } from "@/data/uiux";
import config from "@/seo.config.json";
import "../components/uiux/uiux.css";

type Tab = "work" | "about";

export default function UiUx() {
  const [params, setParams] = useSearchParams();
  const tab: Tab = params.get("tab") === "about" ? "about" : "work";
  const setTab = (next: Tab) => setParams(next === "about" ? { tab: "about" } : {}, { replace: true });

  return (
    <div className="ux">
      <Seo page="uiux" />
      <UiUxNav />
      <main id="main">
        <div className="ux-cover" role="img" aria-label="UI/UX portfolio banner">
          <div className="ux-cover-inner">
            <p className="ux-cover-title">{profile.coverTitle}</p>
            <p className="ux-cover-sub">{profile.coverSub}</p>
          </div>
        </div>

        <div className="ux-profile">
          <aside className="ux-side" aria-label="Designer profile">
            <img className="ux-avatar" src={profile.avatar} alt={profile.name} width={100} height={100} />
            <h1 className="ux-name">{profile.name}</h1>
            <p className="ux-headline">{profile.headline}</p>
            <ul className="ux-meta">
              <li><Briefcase size={14} /> {profile.tagline}</li>
              <li><Mail size={14} /> <a href={`mailto:${profile.email}`}>{profile.email}</a></li>
              <li><MapPin size={14} /> {profile.location}</li>
            </ul>
            <div className="ux-side-actions">
              <a className="ux-btn ux-btn-primary ux-btn-block" href={profile.whatsapp} target="_blank" rel="noopener noreferrer">Hire me</a>
              <a className="ux-btn ux-btn-soft ux-btn-block" href={`mailto:${profile.email}`}>Message</a>
            </div>
            <section className="ux-side-block" aria-labelledby="ux-stats">
              <h2 className="ux-side-title" id="ux-stats">Stats</h2>
              <dl className="ux-stats">
                {profile.stats.map((s) => (
                  <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>
                ))}
              </dl>
            </section>
            <section className="ux-side-block" aria-labelledby="ux-web">
              <h2 className="ux-side-title" id="ux-web">On the web</h2>
              <ul className="ux-links">
                {profile.links.map((l) => {
                  const external = l.href.startsWith("http");
                  return (
                    <li key={l.label}>
                      {external ? (
                        <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label} <ArrowUpRight size={13} /></a>
                      ) : (
                        <Link to={l.href}>{l.label} <ArrowUpRight size={13} /></Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          </aside>

          <section className="ux-main" aria-label="Portfolio content">
            <div className="ux-tabs" role="tablist" aria-label="Portfolio sections">
              <button type="button" role="tab" id="tab-work" aria-selected={tab === "work"} aria-controls="panel-work" className="ux-tab" onClick={() => setTab("work")}>Work</button>
              <button type="button" role="tab" id="tab-about" aria-selected={tab === "about"} aria-controls="panel-about" className="ux-tab" onClick={() => setTab("about")}>About</button>
            </div>

            {tab === "work" ? (
              <div role="tabpanel" id="panel-work" aria-labelledby="tab-work" className="ux-grid">
                {projects.map((p, i) => <ProjectCard key={p.slug} project={p} priority={i < 2} />)}
              </div>
            ) : (
              <div role="tabpanel" id="panel-about" aria-labelledby="tab-about" className="ux-about">
                <p>{profile.bio}</p>
                <div>
                  <h2>What I design</h2>
                  <ul>{profile.services.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
                <div>
                  <h2>Tools</h2>
                  <div className="ux-chips">{profile.tools.map((t) => <span key={t} className="ux-chip">{t}</span>)}</div>
                </div>
                <div>
                  <h2>Client words</h2>
                  <div className="ux-quotes">
                    {testimonials.map((t) => (
                      <figure className="ux-quote" key={t.name}>
                        <blockquote>{t.text}</blockquote>
                        <figcaption><strong>{t.name}</strong><span>{t.role}</span></figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
                <div>
                  <a className="ux-btn ux-btn-primary" href={profile.whatsapp} target="_blank" rel="noopener noreferrer">Start a project <ArrowUpRight size={15} /></a>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
      <Contact eyebrow="Contact" heading="Let's design something." sub="Have a product, app or website in mind? Tell me about it — I reply within 24 hours." />
      <footer className="ux-foot">
        <span>© {new Date().getFullYear()} {profile.name}. UI/UX portfolio.</span>
        <span><Link to="/">Main portfolio</Link> · <Link to="/graphics">Graphics</Link> · <a href={config.siteUrl}>{config.siteUrl.replace("https://", "")}</a></span>
      </footer>
    </div>
  );
}
