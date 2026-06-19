import { ScrollProgress } from "@/components/visuals/scroll-progress";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Capabilities } from "@/components/sections/capabilities";
import { Models } from "@/components/sections/models";
import { Showcase } from "@/components/sections/showcase";
import { CTA, Footer } from "@/components/sections/cta";

function App() {
  return (
    <div className="paper-grain relative min-h-dvh overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Capabilities />
        <Models />
        <Showcase />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
