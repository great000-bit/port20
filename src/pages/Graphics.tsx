import { useState } from "react";
import Seo from "../components/Seo";
import GraphicsNav from "../components/graphics/GraphicsNav";
import GraphicsHero from "../components/graphics/GraphicsHero";
import GraphicsToggle from "../components/graphics/GraphicsToggle";
import GraphicsWork from "../components/graphics/GraphicsWork";
import BrandingWork from "../components/graphics/BrandingWork";
import RateCard from "../components/graphics/RateCard";
import GraphicsFooter from "../components/graphics/GraphicsFooter";
import Contact from "../components/Contact";

type View = "graphics" | "branding";

export default function Graphics() {
  const [view, setView] = useState<View>("graphics");

  return (
    <>
      <Seo page="graphics" />
      <GraphicsNav />
      <main id="gx-content">
        <GraphicsHero />
        <GraphicsToggle view={view} setView={setView} />
        {view === "graphics" ? <GraphicsWork /> : <BrandingWork />}
        <RateCard />
        <Contact />
      </main>
      <GraphicsFooter />
    </>
  );
}
