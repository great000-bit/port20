import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import { ThumbsUp, Mail, Wrench, Share2, Link2, Linkedin, MessageCircle, ArrowUpRight, Check } from "lucide-react";
import { toast } from "sonner";
import Seo from "../components/Seo";
import UiUxNav from "../components/uiux/UiUxNav";
import ProjectCard from "../components/uiux/ProjectCard";
import NotFound from "./NotFound";
import { profile, projects, mockupsFor, canvasTone } from "@/data/uiux";
import config from "@/seo.config.json";
import "../components/uiux/uiux.css";

const APPRECIATED_KEY = "ux-appreciated";

const trim = (text: string, max = 155) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}...`;
};

const readAppreciated = (): string[] => {
  try {
    const raw = localStorage.getItem(APPRECIATED_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};

type Popover = "tools" | "share" | null;

export default function UiUxProject() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [open, setOpen] = useState<Popover>(null);
  const [appreciated, setAppreciated] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAppreciated(project ? readAppreciated().includes(project.slug) : false);
    setOpen(null);
    window.scrollTo(0, 0);
  }, [project]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (railRef.current && !railRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!project) return <NotFound />;

  const url = `${config.siteUrl}/uiux/${project.slug}`;
  const tone = canvasTone(project.canvas);
  const mockups = mockupsFor(project.slug);
  const more = projects.filter((p) => p.slug !== project.slug).slice(0, 4);
  const canvasVars = {
    "--canvas": project.canvas,
    "--canvas-fg": tone.fg,
    "--canvas-muted": tone.muted,
    "--canvas-line": tone.line,
  } as CSSProperties;

  const toggleAppreciate = () => {
    const list = readAppreciated().filter((s) => s !== project.slug);
    const next = !appreciated;
    if (next) list.push(project.slug);
    try {
      localStorage.setItem(APPRECIATED_KEY, JSON.stringify(list));
    } catch {
      /* storage unavailable, keep the in-memory state */
    }
    setAppreciated(next);
    if (next) toast.success("Appreciated. Thanks for the love!");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    } catch {
      toast.error("Could not copy the link");
    }
    setOpen(null);
  };

  const enc = encodeURIComponent;

  return (
    <div className="ux">
      <Seo
        custom={{
          path: `/uiux/${project.slug}`,
          title: `${project.title} | UI/UX Case Study | Great Emman-Wori`,
          description: trim(project.brief),
          ogType: "article",
          image: `${config.siteUrl}${project.cover}`,
          imageAlt: project.alt,
        }}
      />
      <UiUxNav />
      <main id="main" className="ux-project">
        <div className="ux-pbar">
          <img className="ux-pbar-avatar" src={profile.avatar} alt="" width={40} height={40} />
          <div>
            <h1 className="ux-pbar-title">{project.title}</h1>
            <p className="ux-pbar-sub">
              <Link to="/uiux">{profile.name}</Link>
              <span>{project.type}</span>
              {project.year && <span>{project.year}</span>}
            </p>
          </div>
          <div className="ux-pbar-fields">
            {project.fields.map((f) => <span key={f} className="ux-chip">{f}</span>)}
          </div>
        </div>

        <div className="ux-stage">
          <article className="ux-canvas" style={canvasVars} aria-label={`${project.title} case study`}>
            <figure className="ux-mod-img is-cover">
              <img src={project.cover} alt={project.alt} width={1135} height={700} />
            </figure>

            <section className="ux-mod" aria-labelledby="ux-brief">
              <div className="ux-mod-inner">
                <p className="ux-eyebrow">The brief</p>
                <h2 id="ux-brief">{project.title}</h2>
                <p>{project.brief}</p>
                <dl className="ux-facts">
                  <div><dt>Role</dt><dd>{project.role}</dd></div>
                  <div><dt>Client</dt><dd>{project.client}</dd></div>
                  {project.year && <div><dt>Year</dt><dd>{project.year}</dd></div>}
                  <div><dt>Tools</dt><dd>{project.tools.join(", ")}</dd></div>
                </dl>
              </div>
            </section>

            {(() => {
              const mock = (src: string, i: number) => (
                <figure className="ux-mod-img" key={src}>
                  <img src={src} alt={`${project.title} mockup ${i + 1}`} loading="lazy" decoding="async" />
                </figure>
              );
              const used = Math.min(project.story.length, mockups.length);
              return (
                <>
                  {project.story.map((block, i) => (
                    <div key={block.title}>
                      <section className="ux-mod">
                        <div className="ux-mod-inner">
                          {i === 0 && <p className="ux-eyebrow">The story</p>}
                          <h2>{block.title}</h2>
                          {block.body.split("\n\n").map((para) => <p key={para}>{para}</p>)}
                        </div>
                      </section>
                      {i < used && mock(mockups[i], i)}
                    </div>
                  ))}
                  {mockups.slice(used).map((src, i) => mock(src, used + i))}
                </>
              );
            })()}

            {project.results.length > 0 && (
            <section className="ux-mod" aria-labelledby="ux-results">
              <div className="ux-mod-inner">
                <p className="ux-eyebrow">Results</p>
                <h2 id="ux-results">What this delivered</h2>
                <ol className="ux-results">
                  {project.results.map((r, i) => (
                    <li key={r}><span className="n">{String(i + 1).padStart(2, "0")}</span><span>{r}</span></li>
                  ))}
                </ol>
              </div>
            </section>
            )}

            <section className="ux-mod ux-mod-cta" aria-label="Next steps">
              <div className="ux-mod-inner">
                <h2>Want something like this?</h2>
                <p>Send a short brief and you will get a reply within 24 hours.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                  <a className="ux-btn ux-btn-primary" href={`${profile.whatsapp}?text=${enc(`Hi Great, I saw the ${project.title} case study and I have a project in mind.`)}`} target="_blank" rel="noopener noreferrer">
                    Hire me <ArrowUpRight size={15} />
                  </a>
                  {project.liveUrl && (
                    <a className="ux-btn ux-btn-soft" style={{ background: "transparent", color: "var(--canvas-fg)", borderColor: "var(--canvas-line)" }} href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      Visit live site <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
              </div>
            </section>
          </article>

          <div className="ux-rail" ref={railRef} role="toolbar" aria-label="Project actions">
            <div className="ux-rail-item">
              <Link to="/uiux" className="ux-rail-btn" aria-label={`${profile.name} profile`}>
                <img src={profile.avatar} alt="" width={45} height={45} />
              </Link>
              <span className="ux-rail-label">Profile</span>
            </div>
            <div className="ux-rail-item">
              <a className="ux-rail-btn" href={`mailto:${profile.email}?subject=${enc(`About ${project.title}`)}`} aria-label="Hire me by email">
                <Mail size={19} />
              </a>
              <span className="ux-rail-label">Hire</span>
            </div>
            <div className="ux-rail-item">
              <button type="button" className={`ux-rail-btn${open === "tools" ? " is-on" : ""}`} aria-label="Tools used" aria-expanded={open === "tools"} onClick={() => setOpen(open === "tools" ? null : "tools")}>
                <Wrench size={19} />
              </button>
              <span className="ux-rail-label">Tools</span>
              {open === "tools" && (
                <div className="ux-pop" role="dialog" aria-label="Tools used">
                  <p className="ux-pop-title">Tools used</p>
                  {project.tools.map((t) => <span key={t} className="ux-pop-tool">{t}</span>)}
                </div>
              )}
            </div>
            <div className="ux-rail-item">
              <button type="button" className={`ux-rail-btn${open === "share" ? " is-on" : ""}`} aria-label="Share this project" aria-expanded={open === "share"} onClick={() => setOpen(open === "share" ? null : "share")}>
                <Share2 size={19} />
              </button>
              <span className="ux-rail-label">Share</span>
              {open === "share" && (
                <div className="ux-pop" role="dialog" aria-label="Share this project">
                  <p className="ux-pop-title">Share</p>
                  <button type="button" onClick={copyLink}><Link2 size={16} /> Copy link</button>
                  <a href={`https://wa.me/?text=${enc(`${project.title} ${url}`)}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> WhatsApp</a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`} target="_blank" rel="noopener noreferrer"><Linkedin size={16} /> LinkedIn</a>
                </div>
              )}
            </div>
            <div className="ux-rail-item">
              <button type="button" className={`ux-rail-btn is-primary${appreciated ? " is-on" : ""}`} aria-pressed={appreciated} aria-label={appreciated ? "Remove appreciation" : "Appreciate this project"} onClick={toggleAppreciate}>
                {appreciated ? <Check size={20} strokeWidth={3} /> : <ThumbsUp size={19} />}
              </button>
              <span className="ux-rail-label">{appreciated ? "Appreciated" : "Appreciate"}</span>
            </div>
          </div>
        </div>

        <section className="ux-info" aria-label="Project information">
          <div>
            <h2>{project.title}</h2>
            <p>{project.brief}</p>
            <div className="ux-info-row">
              <h3 className="ux-side-title">Tools</h3>
              <div className="ux-chips">{project.tools.map((t) => <span key={t} className="ux-chip">{t}</span>)}</div>
            </div>
            <div className="ux-info-row">
              <h3 className="ux-side-title">Creative fields</h3>
              <div className="ux-chips">{project.fields.map((f) => <span key={f} className="ux-chip">{f}</span>)}</div>
            </div>
            <div className="ux-info-row">
              <h3 className="ux-side-title">Tags</h3>
              <div className="ux-chips">{project.tags.map((t) => <span key={t} className="ux-chip">{t}</span>)}</div>
              <p className="ux-rights">
                {project.year && <>Published {project.year}. </>}© All rights reserved.
              </p>
            </div>
          </div>
          <aside className="ux-owner" aria-label="Designer">
            <div className="ux-owner-head">
              <img src={profile.avatar} alt="" width={48} height={48} />
              <div>
                <p className="ux-owner-name">{profile.name}</p>
                <p className="ux-owner-loc">{profile.location}</p>
              </div>
            </div>
            <a className="ux-btn ux-btn-primary ux-btn-block" href={profile.whatsapp} target="_blank" rel="noopener noreferrer">Hire me</a>
            <Link className="ux-btn ux-btn-soft ux-btn-block" to="/uiux">View full portfolio</Link>
          </aside>
        </section>

        {more.length > 0 && (
          <section className="ux-more" aria-labelledby="ux-more">
            <h2 id="ux-more">More by {profile.name}</h2>
            <div className="ux-more-grid">
              {more.map((p) => <ProjectCard key={p.slug} project={p} below />)}
            </div>
          </section>
        )}
      </main>
      <footer className="ux-foot">
        <span>© {new Date().getFullYear()} {profile.name}. UI/UX portfolio.</span>
        <span><Link to="/uiux">All projects</Link> · <Link to="/">Main portfolio</Link></span>
      </footer>
    </div>
  );
}
