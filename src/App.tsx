import { ScrollProgress } from "@/components/visuals/scroll-progress";
import { Masthead } from "@/components/sections/masthead";
import { Letter } from "@/components/sections/letter";
import { Colophon } from "@/components/sections/colophon";

function App() {
  return (
    <div className="paper-grain relative min-h-dvh bg-background text-foreground">
      <ScrollProgress />
      <Masthead />
      <main>
        <Letter />
      </main>
      <Colophon />
    </div>
  );
}

export default App;
