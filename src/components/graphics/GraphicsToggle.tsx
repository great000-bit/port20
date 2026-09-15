import { useEffect, useRef, useState } from "react";
import { Palette, Layers } from "lucide-react";

type View = "graphics" | "branding";

export default function GraphicsToggle({
  view,
  setView,
}: {
  view: View;
  setView: (v: View) => void;
}) {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "-96px 0px 0px 0px", threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Sentinel sits right after the hero — when it scrolls out of view, the toggle appears */}
      <div ref={sentinelRef} aria-hidden="true" style={{ height: 1 }} />

      <style>{`
        .gx-toggle-wrap {
          position: sticky; top: 84px; z-index: 30;
          display: flex; justify-content: center;
          padding: 0 20px 28px;
          opacity: 0; transform: translateY(-10px);
          pointer-events: none;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .gx-toggle-wrap.gx-visible {
          opacity: 1; transform: translateY(0);
          pointer-events: all;
        }
        .gx-toggle {
          display: inline-flex; gap: 4px; padding: 5px;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid var(--nav-pill-border);
          box-shadow: 0 12px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.10);
        }
        .gx-toggle-btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 10px 20px; border-radius: 999px; border: none;
          background: transparent; cursor: pointer;
          font-family: Arial, sans-serif; font-size: 13px; font-weight: 600;
          color: var(--fg-muted); transition: all 0.2s;
        }
        .gx-toggle-btn.gx-active {
          background: var(--accent); color: #fff;
        }
        .gx-toggle-btn:not(.gx-active):hover { color: var(--fg); }
      `}</style>

      <div className={`gx-toggle-wrap${visible ? " gx-visible" : ""}`}>
        <div className="gx-toggle">
          <button
            className={`gx-toggle-btn${view === "graphics" ? " gx-active" : ""}`}
            onClick={() => setView("graphics")}
          >
            <Palette size={14} /> Graphics
          </button>
          <button
            className={`gx-toggle-btn${view === "branding" ? " gx-active" : ""}`}
            onClick={() => setView("branding")}
          >
            <Layers size={14} /> Branding
          </button>
        </div>
      </div>
    </>
  );
}
