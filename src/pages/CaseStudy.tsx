import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import projects from "@/data/projects.json";
import config from "@/seo.config.json";
import Seo from "../components/Seo";
import WorkNav from "../components/WorkNav";
import NotFound from "./NotFound";

const WHATSAPP = "https://wa.me/2348103887554";

const trim = (text: string, max = 155) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}...`;
};

export default function CaseStudy() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <NotFound />;

  const related = projects.filter((p) => p.cat === project.cat && p.slug !== project.slug).slice(0, 3);
  const host = project.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <>
      <Seo
        custom={{
          path: `/work/${project.slug}`,
          title: `${project.name} Case Study | Great Emman-Wori`,
          description: trim(project.desc),
          ogType: "article",
          image: `${config.siteUrl}${project.img}`,
          imageAlt: project.alt,
        }}
      />
      <style>{`
        .cs { background: var(--bg); color: var(--fg); min-height: 100vh; padding: 128px clamp(20px,5vw,64px) 0; }
        .cs-wrap { max-width: 1000px; margin: 0 auto; }
        .cs-crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font: 13px Arial, sans-serif; color: var(--fg-faint); margin: 0 0 28px; padding: 0; list-style: none; }
        .cs-crumbs a { color: var(--fg-muted); text-decoration: none; }
        .cs-crumbs a:hover { color: var(--accent); }
        .cs-badge { display: inline-block; font: 600 11px/1 Arial, sans-serif; letter-spacing: .1em; text-transform: uppercase; color: var(--accent); padding: 7px 12px; border: 1px solid var(--accent-border); border-radius: 999px; background: var(--accent-soft); margin-bottom: 20px; }
        .cs-title { font-family: Geist, Arial, sans-serif; font-weight: 700; font-size: clamp(34px, 6vw, 64px); line-height: 1.02; letter-spacing: -.05em; margin: 0 0 20px; }
        .cs-lead { font: clamp(16px,2vw,19px)/1.7 Arial, sans-serif; color: var(--fg-muted); max-width: 62ch; margin: 0 0 28px; }
        .cs-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 44px; }
        .cs-shot { border: 1px solid var(--card-border); border-radius: 22px; overflow: hidden; background: var(--bg-3); margin: 0 0 64px; }
        .cs-shot img { display: block; width: 100%; height: auto; object-position: top center; }
        .cs-grid { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); gap: clamp(32px, 6vw, 80px); margin-bottom: 72px; }
        .cs-h2 { font: 700 22px/1.2 Geist, Arial, sans-serif; letter-spacing: -.03em; margin: 0 0 20px; }
        .cs-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px; }
        .cs-list li { display: flex; gap: 12px; font: 15px/1.65 Arial, sans-serif; color: var(--fg-muted); }
        .cs-check { flex: 0 0 auto; width: 22px; height: 22px; margin-top: 1px; display: grid; place-items: center; border-radius: 50%; background: var(--accent); color: #fff; }
        .cs-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .cs-tag { font: 12px Arial, sans-serif; color: var(--fg-muted); padding: 6px 12px; border-radius: 6px; background: var(--tag-bg); border: 1px solid var(--border); }
        .cs-meta { margin: 28px 0 0; display: grid; gap: 14px; }
        .cs-meta dt { font: 600 11px/1 Arial, sans-serif; letter-spacing: .1em; text-transform: uppercase; color: var(--fg-faint); margin-bottom: 6px; }
        .cs-meta dd { margin: 0; font: 15px/1.5 Arial, sans-serif; color: var(--fg); }
        .cs-meta a { color: var(--fg); text-underline-offset: 3px; }
        .cs-meta a:hover { color: var(--accent); }
        .cs-related { border-top: 1px solid var(--border); padding: 56px 0 72px; }
        .cs-related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px; }
        .cs-rel { display: block; text-decoration: none; border: 1px solid var(--card-border); border-radius: 16px; overflow: hidden; background: var(--card-bg); transition: transform .25s, border-color .25s; }
        .cs-rel:hover { transform: translateY(-4px); border-color: var(--accent-border); }
        .cs-rel img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: top center; background: var(--bg-3); }
        .cs-rel span { display: block; padding: 16px 18px; font: 600 14px/1.35 Geist, Arial, sans-serif; color: var(--fg); }
        .cs-cta { border-top: 1px solid var(--border); padding: 64px 0 96px; text-align: center; }
        .cs-cta p { font: 16px/1.7 Arial, sans-serif; color: var(--fg-muted); max-width: 48ch; margin: 0 auto 28px; }
        .cs-cta .cs-actions { justify-content: center; margin: 0; }
        .cs-foot { border-top: 1px solid var(--border-soft); padding: 28px clamp(20px,5vw,64px); font: 13px Arial, sans-serif; color: var(--fg-faint); text-align: center; }
        .cs-foot a { color: var(--fg-muted); text-decoration: none; }
        @media (max-width: 760px) { .cs-grid { grid-template-columns: 1fr; } .cs { padding-top: 104px; } }
      `}</style>

      <WorkNav />
      <main className="cs" id="main">
        <article className="cs-wrap">
          <ol className="cs-crumbs" aria-label="Breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/#portfolio">Projects</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{project.name}</li>
          </ol>

          <span className="cs-badge">{project.badge}</span>
          <h1 className="cs-title">{project.name}</h1>
          <p className="cs-lead">{project.desc}</p>

          <div className="cs-actions">
            <a className="btn-red" href={project.url} target="_blank" rel="noopener noreferrer">
              Visit live site <ArrowUpRight size={15} />
            </a>
            <Link className="btn-outline" to="/#portfolio">
              <ArrowLeft size={15} /> All projects
            </Link>
          </div>

          <figure className="cs-shot">
            <img src={project.img} alt={project.alt} width={1200} height={750} />
          </figure>

          <div className="cs-grid">
            <section aria-labelledby="cs-delivered">
              <h2 className="cs-h2" id="cs-delivered">What was delivered</h2>
              <ul className="cs-list">
                {project.highlights.map((item) => (
                  <li key={item}>
                    <span className="cs-check" aria-hidden="true"><Check size={12} strokeWidth={3} /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <aside aria-label="Project details">
              <h2 className="cs-h2">Stack and tools</h2>
              <div className="cs-tags">
                {project.tags.map((tag) => <span key={tag} className="cs-tag">{tag}</span>)}
              </div>
              <dl className="cs-meta">
                <div><dt>Type</dt><dd>{project.badge}</dd></div>
                <div>
                  <dt>Live site</dt>
                  <dd><a href={project.url} target="_blank" rel="noopener noreferrer">{host}</a></dd>
                </div>
                <div><dt>Built by</dt><dd>Great Emman-Wori, Port Harcourt, Nigeria</dd></div>
              </dl>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="cs-related" aria-labelledby="cs-related">
              <h2 className="cs-h2" id="cs-related">More projects</h2>
              <div className="cs-related-grid">
                {related.map((p) => (
                  <Link key={p.slug} to={`/work/${p.slug}`} className="cs-rel">
                    <img src={p.img} alt={p.alt} loading="lazy" />
                    <span>{p.name}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="cs-cta" aria-label="Start a project">
            <h2 className="cs-h2">Have a similar project in mind?</h2>
            <p>Send a short brief and you will get a reply within 24 hours.</p>
            <div className="cs-actions">
              <a className="btn-red" href={`${WHATSAPP}?text=${encodeURIComponent(`Hi Great, I saw the ${project.name} case study and I have a project in mind.`)}`} target="_blank" rel="noopener noreferrer">
                Message on WhatsApp <ArrowUpRight size={15} />
              </a>
              <Link className="btn-outline" to="/#contact">Use the contact form</Link>
            </div>
          </section>
        </article>
      </main>
      <footer className="cs-foot">
        © {new Date().getFullYear()} Great Emman-Wori. <Link to="/">Back to portfolio</Link>
      </footer>
    </>
  );
}
