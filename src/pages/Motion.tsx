import Seo from "../components/Seo";
import MotionNav from "../components/motion/MotionNav";
import MotionHero from "../components/motion/MotionHero";
import MotionWork from "../components/motion/MotionWork";
import Contact from "../components/Contact";
import MotionFooter from "../components/motion/MotionFooter";

export default function Motion() {
  return (
    <>
      <Seo page="motion" />
      <MotionNav />
      <main id="mo-main">
        <MotionHero />
        <MotionWork />
        <Contact />
      </main>
      <MotionFooter />
    </>
  );
}
