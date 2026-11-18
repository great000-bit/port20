import { useRef } from "react";
import { Play } from "lucide-react";
import motionItems from "@/data/motion.json";

type MotionItem = {
  title: string;
  tag: string;
  tools: string[];
  video: string;
  poster: string;
};

export default function MotionWork() {
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const handleEnter = (i: number) => {
    const v = videoRefs.current[i];
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };

  const handleLeave = (i: number) => {
    const v = videoRefs.current[i];
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <>
      <style>{`
        .mo-grid-wrap { max-width: 1180px; margin: 0 auto; padding: 0 clamp(20px,5vw,64px) 112px; }
        .mo-grid-head { margin-bottom: 32px; text-align: center; }
        .mo-grid-kicker { color: var(--accent-text); font: 600 12px/1 Arial, sans-serif; letter-spacing: .11em; text-transform: uppercase; margin: 0 0 10px; }
        .mo-grid-title { font-family: Geist, Arial, sans-serif; font-weight: 700; font-size: clamp(26px,3vw,36px); letter-spacing: -.04em; color: var(--fg); margin: 0 0 10px; }
        .mo-grid-sub { font-family: Arial, sans-serif; font-size: 14px; color: var(--fg-muted); margin: 0 auto; max-width: 52ch; }
        .mo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; max-width: 760px; margin: 0 auto; }
        .mo-card { border-radius: 18px; overflow: hidden; background: var(--card-bg); border: 1px solid var(--card-border); transition: transform .28s ease, border-color .28s ease, box-shadow .28s ease; position: relative; cursor: pointer; }
        .mo-card:hover { transform: translateY(-6px); border-color: var(--accent-border); box-shadow: 0 18px 42px rgba(0,0,0,.18); }
        .mo-card-media { aspect-ratio: 9 / 16; overflow: hidden; background: var(--bg-3); position: relative; }
        .mo-card-video, .mo-card-poster { width: 100%; height: 100%; object-fit: cover; display: block; }
        .mo-card-poster { position: absolute; inset: 0; transition: opacity .25s ease; }
        .mo-card:hover .mo-card-poster { opacity: 0; }
        .mo-card-play {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.18); color: #fff; pointer-events: none;
          transition: opacity .25s ease;
        }
        .mo-card:hover .mo-card-play { opacity: 0; }
        .mo-card-play-icon {
          width: 52px; height: 52px; border-radius: 50%;
          background: rgba(255,255,255,0.18); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
        }
        .mo-card-body { padding: 16px 18px 18px; }
        .mo-card-tag { display: inline-block; font-family: Arial, sans-serif; font-size: 11px; font-weight: 600; letter-spacing: .05em; text-transform: uppercase; color: var(--accent-text); margin-bottom: 7px; }
        .mo-card-title { font-family: Geist, Arial, sans-serif; font-weight: 600; font-size: 16px; line-height: 1.35; color: var(--fg); margin-bottom: 8px; }
        .mo-card-tools { display: flex; flex-wrap: wrap; gap: 6px; }
        .mo-card-tool { font-family: Arial, sans-serif; font-size: 11px; color: var(--fg-muted); background: var(--bg-3); border: 1px solid var(--border); border-radius: 999px; padding: 3px 9px; }
        @media (max-width: 520px) { .mo-grid { grid-template-columns: 1fr; gap: 20px; max-width: 320px; } }
      `}</style>

      <section id="mo-content" className="mo-grid-wrap" aria-label="Video editing and motion work">
        <div className="mo-grid-head" data-aos="fade-up">
          <p className="mo-grid-kicker">Selected work</p>
          <h2 className="mo-grid-title">Video editing &amp; motion graphics</h2>
          <p className="mo-grid-sub">Hover a clip to preview. Short-form edits built for retention: pacing, captions and motion that keep the scroll from happening.</p>
        </div>
        <div className="mo-grid">
          {(motionItems as MotionItem[]).map((item, index) => (
            <article
              key={item.video}
              className="mo-card"
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 80}
              onMouseEnter={() => handleEnter(index)}
              onMouseLeave={() => handleLeave(index)}
            >
              <div className="mo-card-media">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className="mo-card-video"
                  src={item.video}
                  poster={item.poster}
                  muted
                  loop
                  playsInline
                  preload="none"
                />
                <img className="mo-card-poster" src={item.poster} alt={item.title} loading={index < 2 ? "eager" : "lazy"} />
                <div className="mo-card-play" aria-hidden="true">
                  <span className="mo-card-play-icon"><Play size={20} fill="#fff" /></span>
                </div>
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
    </>
  );
}
