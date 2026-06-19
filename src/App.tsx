import { ShaderBackground } from "@/components/visuals/shader-background";
import { Grain } from "@/components/visuals/grain";
import { ScrollProgress } from "@/components/visuals/scroll-progress";
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
    <div className="relative min-h-dvh overflow-x-hidden bg-background text-foreground">
      {/* Atmosfera: shader WebGL ao fundo + scrim para legibilidade + grão */}
      <ShaderBackground />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 100% 75% at 50% -5%, hsl(240 10% 4% / 0.35), hsl(240 10% 4% / 0.92) 70%, hsl(240 10% 4%) 100%)",
        }}
      />
      <Grain />
      <ScrollProgress />

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
