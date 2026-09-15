import { useEffect, useState } from "react";
import GraphicsNav from "../components/graphics/GraphicsNav";
import GraphicsHero from "../components/graphics/GraphicsHero";
import GraphicsToggle from "../components/graphics/GraphicsToggle";
import GraphicsWork from "../components/graphics/GraphicsWork";
import BrandingWork from "../components/graphics/BrandingWork";
import GraphicsFooter from "../components/graphics/GraphicsFooter";
import Contact from "../components/Contact";

type View = "graphics" | "branding";

export default function Graphics() {
  const [view, setView] = useState<View>("graphics");

  useEffect(() => {
    document.title = "Graphics Portfolio — Great Emman-Wori";
  }, []);

  return (
    <>
      <GraphicsNav />
      <main id="gx-content">
        <GraphicsHero />
        <GraphicsToggle view={view} setView={setView} />
        {view === "graphics" ? <GraphicsWork /> : <BrandingWork />}
        <Contact />
      </main>
      <GraphicsFooter />
    </>
  );
}
