import { useState, useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import projects from "@/data/projects.json";

type Cat = "all"|"fullstack"|"uiux"|"landing";

type Project = {
  slug: string; name: string; title: string; cat: string; url: string; img: string;
  alt: string; desc: string; tags: string[]; badge: string; highlights: string[];
};

const PROJECTS = projects as Project[];

const FILTERS: { label: string; value: Cat }[] = [
  { label:"All",            value:"all" },
  { label:"Fullstack & Web",value:"fullstack" },
  { label:"UI/UX & Product",value:"uiux" },
  { label:"WordPress",      value:"landing" },
];

const BADGE_COLOR: Record<string,string> = {
  "Full-Stack": "rgba(111,4,20,0.9)",
  "Web Dev":    "rgba(16,185,129,0.85)",
  "UI/UX":      "rgba(111,4,20,0.75)",
  "Product":    "rgba(139,92,246,0.85)",
  "WordPress":  "rgba(59,130,246,0.85)",
};

/* Iframe card — URL bar + live preview + loading skeleton */
function ProjectCard({ p, index }: { p: Project; index: number }) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Only load iframe when card scrolls into view
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1, rootMargin:"200px" });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const displayUrl = p.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <article
      ref={ref}
      data-aos="fade-up"
      data-aos-delay={(index % 3) * 80}
      style={{
        background:"var(--bg-3)",
        border:"1px solid var(--border)",
        borderRadius:14,
        overflow:"hidden",
        display:"flex",
        flexDirection:"column",
        transition:"border-color 0.2s, transform 0.25s",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(111,4,20,0.45)"; e.currentTarget.style.transform="translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.transform="translateY(0)"; }}
    >
      {/* ── URL bar — Omijeh style ── */}
      <div style={{
        display:"flex", alignItems:"center", gap:8,
        padding:"9px 14px",
        borderBottom:"1px solid var(--border-soft)",
        background:"var(--url-bar-bg)",
      }}>
        {/* Traffic lights */}
        <div style={{display:"flex",gap:5,flexShrink:0}}>
          {["#ff5f57","#febc2e","#28c840"].map(c => (
            <div key={c} style={{width:10,height:10,borderRadius:"50%",background:c,opacity:0.7}}/>
          ))}
        </div>
        {/* URL */}
        <div style={{
          flex:1, background:"var(--tag-bg)",
          borderRadius:5, padding:"3px 10px",
          fontFamily:"Arial,sans-serif", fontSize:11,
          color:"var(--fg-faint)", letterSpacing:"0.01em",
          overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
        }}>
          {displayUrl}
        </div>
      </div>

      {/* ── Preview area ── */}
      <div style={{ position:"relative", height:200, background:"var(--bg)", overflow:"hidden", flexShrink:0 }}>
        {/* Category badge */}
        <span style={{
          position:"absolute", top:10, left:10, zIndex:3,
          fontFamily:"Arial,sans-serif", fontSize:10, fontWeight:700,
          padding:"3px 10px", borderRadius:999, color:"var(--fg)",
          background: BADGE_COLOR[p.badge] || "rgba(111,4,20,0.85)",
          letterSpacing:"0.06em", textTransform:"uppercase",
        }}>
          {p.badge}
        </span>

        {/* Loading skeleton — shows until iframe or image loads */}
        {!loaded && (
          <div style={{
            position:"absolute", inset:0, zIndex:2,
            background:"linear-gradient(90deg,#0f0f0f 25%,#1a1a1a 50%,#0f0f0f 75%)",
            backgroundSize:"200% 100%",
            animation:"shimmer 1.6s infinite",
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <span style={{fontFamily:"Arial,sans-serif",fontSize:11,color:"var(--fg-ultra)",letterSpacing:"0.08em"}}>
              Loading preview…
            </span>
          </div>
        )}

        {/* Screenshot image (fast, no iframe lag) */}
        {inView && (
          <img
            src={p.img}
            alt={p.alt}
            onLoad={() => setLoaded(true)}
            style={{
              width:"100%", height:"100%",
              objectFit:"cover", objectPosition:"top center",
              display:"block",
              opacity: loaded ? 1 : 0,
              transition:"opacity 0.4s ease",
            }}
            loading="lazy"
          />
        )}
      </div>

      {/* ── Content ── */}
      <div style={{ padding:"20px 20px 22px", flex:1, display:"flex", flexDirection:"column" }}>
        <h3 style={{
          fontFamily:"Geist,Arial,sans-serif", fontSize:15, fontWeight:600,
          color:"var(--fg)", margin:"0 0 8px 0", lineHeight:1.3,
          letterSpacing:"-0.01em",
        }}>
          {p.title}
        </h3>
        <p style={{
          fontFamily:"Arial,sans-serif", fontSize:13, lineHeight:1.65,
          color:"var(--fg-muted)", margin:"0 0 16px 0", flex:1,
        }}>
          {p.desc}
        </p>

        {/* Tags */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>
          {p.tags.slice(0,3).map(t => (
            <span key={t} style={{
              fontFamily:"Arial,sans-serif", fontSize:11,
              color:"var(--fg-faint)",
              padding:"3px 9px", borderRadius:4,
              background:"var(--tag-bg)",
              border:"1px solid var(--border)",
            }}>
              {t}
            </span>
          ))}
          {p.tags.length > 3 && (
            <span style={{fontFamily:"Arial,sans-serif",fontSize:11,color:"var(--fg-ultra)",padding:"3px 6px"}}>
              +{p.tags.length - 3}
            </span>
          )}
        </div>

        {/* CTA row */}
        <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"10px 20px" }}>
        <Link
          to={`/work/${p.slug}`}
          aria-label={`Read the ${p.name} case study`}
          style={{
            display:"inline-flex", alignItems:"center", gap:6,
            fontFamily:"Arial,sans-serif", fontSize:13, fontWeight:600,
            color:"var(--accent)", textDecoration:"none", letterSpacing:"0.01em",
          }}
        >
          Case study <ArrowUpRight size={13}/>
        </Link>
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${p.title} live site`}
          style={{
            display:"inline-flex", alignItems:"center", gap:6,
            fontFamily:"Arial,sans-serif", fontSize:13, fontWeight:600,
            color:"var(--fg-muted)",
            textDecoration:"none",
            letterSpacing:"0.01em",
            transition:"color 0.2s",
            width:"fit-content",
          }}
          onMouseEnter={e => (e.currentTarget.style.color="var(--fg)")}
          onMouseLeave={e => (e.currentTarget.style.color="var(--fg-muted)")}
        >
          Open Live <ArrowUpRight size={13}/>
        </a>
        </div>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState<Cat>("all");
  const [showAll, setShowAll] = useState(false);

  const shown = PROJECTS.filter(p => filter === "all" || p.cat === filter);
  const displayed = showAll ? shown : shown.slice(0, 6);

  return (
    <section id="portfolio" className="section" style={{background:"var(--bg)"}}>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 clamp(24px,5vw,64px)" }}>

        {/* Header */}
        <div style={{ marginBottom:48 }} data-aos="fade-up">
          <span style={{
            fontFamily:"Arial,sans-serif", fontSize:11, fontWeight:600,
            letterSpacing:"0.2em", textTransform:"uppercase",
            color:"var(--fg-ultra)", display:"block", marginBottom:16,
          }}>
            04 — Projects
          </span>
          <h2 style={{
            fontFamily:"Geist,Arial,sans-serif", fontSize:"clamp(28px,3.5vw,42px)",
            fontWeight:400, color:"var(--fg)", letterSpacing:"-0.04em",
            margin:"0 0 12px 0",
          }}>
            Selected Projects
          </h2>
          <p style={{
            fontFamily:"Arial,sans-serif", fontSize:15,
            color:"var(--fg-faint)", margin:0, maxWidth:560,
          }}>
            {PROJECTS.length}+ projects built with attention to performance, usability, and conversion.
          </p>
        </div>

        {/* Filter tabs */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:40 }} data-aos="fade-up" data-aos-delay="60">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => { setFilter(f.value); setShowAll(false); }}
              style={{
                fontFamily:"Arial,sans-serif", fontSize:13, fontWeight:500,
                padding:"7px 18px", borderRadius:999, cursor:"pointer",
                border: filter === f.value ? "1px solid #6f0414" : "1px solid var(--fg-ultra)",
                background: filter === f.value ? "#6f0414" : "transparent",
                color: filter === f.value ? "#ffffff" : "var(--fg-muted)",
                transition:"all 0.2s",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill, minmax(340px, 1fr))",
          gap:20,
          marginBottom:40,
        }}>
          {displayed.map((p, i) => <ProjectCard key={p.title} p={p} index={i}/>)}
        </div>

        {/* Show more */}
        {shown.length > 6 && (
          <div style={{ textAlign:"center" }}>
            <button
              onClick={() => setShowAll(v => !v)}
              style={{
                fontFamily:"Arial,sans-serif", fontSize:14, fontWeight:500,
                padding:"10px 28px", borderRadius:8, cursor:"pointer",
                border:"1px solid var(--border-strong)",
                background:"transparent", color:"var(--fg-muted)",
                transition:"all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="var(--accent)"; e.currentTarget.style.color="#ffffff"; e.currentTarget.style.background="var(--accent)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border-strong)"; e.currentTarget.style.color="var(--fg-muted)"; }}
            >
              {showAll ? "Show Less" : `View All ${shown.length} Projects`}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
