import Seo from "../components/Seo";
import SubNav from "../components/SubNav";
import MotionHero from "../components/motion/MotionHero";
import MotionWork from "../components/motion/MotionWork";
import Contact from "../components/Contact";
import MotionFooter from "../components/motion/MotionFooter";

export default function Motion() {
  return (
    <>
      <Seo page="motion" />
      <SubNav current="motion" badge="Motion" />
      <main id="mo-main">
        <MotionHero />
        <MotionWork />
        <Contact />
      </main>
      <MotionFooter />
    </>
  );
}
