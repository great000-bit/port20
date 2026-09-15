import { Instagram, Linkedin } from "lucide-react";

export default function GraphicsFooter() {
  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border-soft)" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "28px clamp(24px,5vw,64px)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <span style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "var(--fg-faint)" }}>
          © {new Date().getFullYear()} Great Emman-Wori. Graphics Portfolio.
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <a href="/" style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "var(--fg-muted)", textDecoration: "none" }}>
            Main Portfolio
          </a>
          <a href="https://www.linkedin.com/in/great-emman-wori" aria-label="LinkedIn" style={{ color: "var(--fg-muted)" }}>
            <Linkedin size={15} />
          </a>
          <a href="https://msng.link/o?creative_emman=ig" aria-label="Instagram" style={{ color: "var(--fg-muted)" }}>
            <Instagram size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
