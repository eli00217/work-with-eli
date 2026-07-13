import { Nav } from "@/components/layout/Nav";
import { PointerLayer } from "@/components/ambient/PointerLayer";
import { Footer } from "@/components/layout/Footer";

// The narrative arc — each section sets up the next.
import Hero from "@/components/sections/Hero"; // 1. thesis
import Tension from "@/components/sections/Tension"; // 2. the problem
import Work from "@/components/sections/Work"; // 3. the proof
import Services from "@/components/sections/Services"; // 4. what I do
import ShipsWith from "@/components/sections/ShipsWith"; // 5. what every build gets
import Process from "@/components/sections/Process"; // 6. how it goes
import Stack from "@/components/sections/Stack"; // 7. the toolbox
import Person from "@/components/sections/Person"; // 8. the person
import Contact from "@/components/sections/Contact"; // 9. the close

export default function Home() {
  return (
    <>
      <PointerLayer />
      <Nav />

      {/* relative z-10: the PointerLayer is fixed at z-0, and a positioned
          element paints above non-positioned siblings. Without this the glow
          would render OVER the text instead of behind it. */}
      <main className="relative z-10">
        <Hero />
        <Tension />
        <Work />
        <Services />
        <ShipsWith />
        <Process />
        <Stack />
        <Person />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
