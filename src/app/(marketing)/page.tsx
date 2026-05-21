import { About } from "@/components/sections/about";
import { Branches } from "@/components/sections/branches";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Social } from "@/components/sections/social";

/* =====================================================================
   Página de inicio · Landing page de JRM Corp
   ===================================================================== */

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Branches />
      <Social />
      <Contact />
    </>
  );
}
