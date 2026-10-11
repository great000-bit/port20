import { Link } from "react-router-dom";
import { profile, type UiUxProject } from "@/data/uiux";
import "./uiux.css";

/** Behance-style cover: image only, with the title and details on hover. */
export default function ProjectCard({
  project,
  below = false,
  priority = false,
}: {
  project: UiUxProject;
  below?: boolean;
  priority?: boolean;
}) {
  const meta = [project.type, project.year].filter(Boolean).join(" · ");
  return (
    <Link
      to={`/uiux/${project.slug}`}
      className={`ux-card${below ? " is-below" : ""}`}
      aria-label={`${project.title}, UI/UX case study`}
    >
      <div className="ux-card-cover">
        <img
          src={project.cover}
          alt={project.alt}
          width={808}
          height={632}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
        <div className="ux-card-overlay">
          <span className="ux-card-title">{project.title}</span>
          <span className="ux-card-owner">{profile.name} · {meta}</span>
        </div>
      </div>
      <div className="ux-card-info">
        <span className="ux-card-title">{project.title}</span>
        <span className="ux-card-owner">{profile.name} · {meta}</span>
      </div>
    </Link>
  );
}
