import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Capabilities } from "@/components/sections/capabilities";
import { Marquee } from "@/components/sections/marquee";
import { Models } from "@/components/sections/models";
import { Showcase } from "@/components/sections/showcase";
import { CTA, Footer } from "@/components/sections/cta";

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Capabilities />
        <Marquee />
        <Models />
        <Showcase />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
