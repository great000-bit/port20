import { useCallback, useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import motionItems from "@/data/motion.json";

type MotionItem = {
  title: string;
  tag: string;
  tools: string[];
  video: string;
  poster: string;
};

export default function MotionWork() {
  const items = motionItems as MotionItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const open = (i: number) => {
    lastFocused.current = document.activeElement as HTMLElement;
    setOpenIndex(i);
  };

  const close = useCallback(() => {
    setOpenIndex(null);
    lastFocused.current?.focus();
  }, []);

  // Lock scrolling and wire Esc while the player is open.
  useEffect(() => {
    if (openIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close]);

  const active = openIndex === null ? null : items[openIndex];

  return (
    <>
      <style>{`
        .mo-grid-wrap { max-width: 1180px; margin: 0 auto; padding: 0 clamp(20px,5vw,64px) 112px; }
        .mo-grid-head { margin-bottom: 32px; text-align: center; }
        .mo-grid-kicker { color: var(--accent-text); font: 600 12px/1 Arial, sans-serif; letter-spacing: .11em; text-transform: uppercase; margin: 0 0 10px; }
        .mo-grid-title { font-family: Geist, Arial, sans-serif; font-weight: 700; font-size: clamp(26px,3vw,36px); letter-spacing: -.04em; color: var(--fg); margin: 0 0 10px; }
        .mo-grid-sub { font-family: Arial, sans-serif; font-size: 14px; color: var(--fg-muted); margin: 0 auto; max-width: 52ch; }
        .mo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; max-width: 760px; margin: 0 auto; }

        .mo-card { border-radius: 18px; overflow: hidden; background: var(--card-bg); border: 1px solid var(--card-border); transition: transform .28s ease, border-color .28s ease, box-shadow .28s ease; position: relative; }
        .mo-card:hover { transform: translateY(-6px); border-color: var(--accent-border); box-shadow: 0 18px 42px rgba(0,0,0,.18); }
        .mo-card-media { aspect-ratio: 9 / 16; overflow: hidden; background: var(--bg-3); position: relative; }
        .mo-card-poster { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* Glass sheet over the still, with the Watch button sitting on it */
        .mo-card-glass {
          position: absolute; inset: 0; border: 0; width: 100%; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(180deg, rgba(10,10,10,.28) 0%, rgba(10,10,10,.52) 100%);
          backdrop-filter: blur(7px) saturate(115%);
          -webkit-backdrop-filter: blur(7px) saturate(115%);
          transition: backdrop-filter .3s ease, background .3s ease;
        }
        .mo-card:hover .mo-card-glass, .mo-card-glass:focus-visible {
          background: linear-gradient(180deg, rgba(10,10,10,.18) 0%, rgba(10,10,10,.40) 100%);
          backdrop-filter: blur(3px) saturate(115%);
          -webkit-backdrop-filter: blur(3px) saturate(115%);
        }
        .mo-watch {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 11px 20px; border-radius: 999px;
          font-family: Arial, sans-serif; font-size: 14px; font-weight: 600; color: #fff;
          background: rgba(255,255,255,.14);
          border: 1px solid rgba(255,255,255,.32);
          backdrop-filter: blur(14px) saturate(180%);
          -webkit-backdrop-filter: blur(14px) saturate(180%);
          box-shadow: 0 10px 30px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.28);
          transition: transform .25s ease, background .25s ease;
        }
        .mo-card:hover .mo-watch { transform: scale(1.06); background: rgba(255,255,255,.22); }
        .mo-watch-icon { display: grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; background: rgba(255,255,255,.9); color: #111; }

        .mo-card-body { padding: 16px 18px 18px; }
        .mo-card-tag { display: inline-block; font-family: Arial, sans-serif; font-size: 11px; font-weight: 600; letter-spacing: .05em; text-transform: uppercase; color: var(--accent-text); margin-bottom: 7px; }
        .mo-card-title { font-family: Geist, Arial, sans-serif; font-weight: 600; font-size: 16px; line-height: 1.35; color: var(--fg); margin-bottom: 8px; }
        .mo-card-tools { display: flex; flex-wrap: wrap; gap: 6px; }
        .mo-card-tool { font-family: Arial, sans-serif; font-size: 11px; color: var(--fg-muted); background: var(--bg-3); border: 1px solid var(--border); border-radius: 999px; padding: 3px 9px; }

        /* Player */
        .mo-player {
          position: fixed; inset: 0; z-index: 120; display: flex; align-items: center; justify-content: center;
          padding: max(20px, env(safe-area-inset-top)) 20px max(20px, env(safe-area-inset-bottom));
          background: rgba(0,0,0,.72);
          backdrop-filter: blur(18px) saturate(140%);
          -webkit-backdrop-filter: blur(18px) saturate(140%);
          animation: moFade .22s ease both;
        }
        @keyframes moFade { from { opacity: 0 } to { opacity: 1 } }
        .mo-player-inner { position: relative; display: flex; flex-direction: column; gap: 12px; max-height: 100%; }
        .mo-player-video {
          max-height: calc(100vh - 150px); max-width: min(92vw, 420px);
          width: auto; border-radius: 16px; display: block; background: #000;
          box-shadow: 0 30px 80px rgba(0,0,0,.6);
        }
        .mo-player-meta { color: rgba(255,255,255,.82); font-family: Arial, sans-serif; font-size: 13px; text-align: center; }
        .mo-player-meta strong { display: block; color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 2px; }
        .mo-player-close {
          position: absolute; top: -48px; right: 0;
          width: 38px; height: 38px; border-radius: 50%; cursor: pointer;
          display: grid; place-items: center; color: #fff;
          background: rgba(255,255,255,.14); border: 1px solid rgba(255,255,255,.3);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          transition: background .2s ease;
        }
        .mo-player-close:hover { background: rgba(255,255,255,.26); }

        @media (max-width: 520px) { .mo-grid { grid-template-columns: 1fr; gap: 20px; max-width: 320px; } }
        @media (prefers-reduced-motion: reduce) {
          .mo-card, .mo-card-glass, .mo-watch, .mo-player { transition: none; animation: none; }
        }
      `}</style>

      <section id="mo-content" className="mo-grid-wrap" aria-label="Video editing and motion work">
        <div className="mo-grid-head" data-aos="fade-up">
          <p className="mo-grid-kicker">Selected work</p>
          <h2 className="mo-grid-title">Video editing &amp; motion graphics</h2>
          <p className="mo-grid-sub">Press watch to play a clip with sound. Short-form edits built for retention: pacing, captions and motion that keep the scroll from happening.</p>
        </div>

        <div className="mo-grid">
          {items.map((item, index) => (
            <article key={item.video} className="mo-card" data-aos="fade-up" data-aos-delay={(index % 3) * 80}>
              <div className="mo-card-media">
                <img className="mo-card-poster" src={item.poster} alt="" loading={index < 2 ? "eager" : "lazy"} />
                <button type="button" className="mo-card-glass" onClick={() => open(index)}
                  aria-label={`Watch ${item.title}`}>
                  <span className="mo-watch">
                    <span className="mo-watch-icon" aria-hidden="true"><Play size={11} fill="currentColor" /></span>
                    Watch
                  </span>
                </button>
              </div>
              <div className="mo-card-body">
                <span className="mo-card-tag">{item.tag}</span>
                <div className="mo-card-title">{item.title}</div>
                <div className="mo-card-tools">
                  {item.tools.map((tool) => (
                    <span key={tool} className="mo-card-tool">{tool}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {active && (
        <div className="mo-player" role="dialog" aria-modal="true" aria-label={active.title}
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div className="mo-player-inner">
            <button ref={closeRef} type="button" className="mo-player-close" onClick={close} aria-label="Close player">
              <X size={18} />
            </button>
            <video
              key={active.video}
              className="mo-player-video"
              src={active.video}
              poster={active.poster}
              controls
              autoPlay
              playsInline
            />
            <p className="mo-player-meta">
              <strong>{active.title}</strong>
              {active.tools.join(", ")}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
