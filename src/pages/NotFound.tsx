import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo page="notFound" />
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          padding: "0 24px",
          textAlign: "center",
          background: "var(--bg)",
          color: "var(--fg)",
        }}
      >
        <p style={{ color: "var(--accent)", font: "600 12px/1 Arial, sans-serif", letterSpacing: ".11em", textTransform: "uppercase", margin: 0 }}>
          Error 404
        </p>
        <h1 style={{ fontFamily: "Geist, Arial, sans-serif", fontWeight: 700, fontSize: "clamp(40px, 8vw, 80px)", letterSpacing: "-.05em", margin: 0 }}>
          Page not found
        </h1>
        <p style={{ color: "var(--fg-muted)", font: "16px/1.7 Arial, sans-serif", maxWidth: "44ch", margin: 0 }}>
          The page you are looking for does not exist or has moved.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 8 }}>
          <Link to="/" className="btn-red">Back to portfolio</Link>
          <Link to="/graphics" className="btn-outline">Graphics portfolio</Link>
        </div>
      </main>
    </>
  );
}
