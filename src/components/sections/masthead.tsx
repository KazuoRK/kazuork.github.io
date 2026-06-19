import { Spark } from "@/components/visuals/spark";

export function Masthead() {
  return (
    <header className="border-b border-foreground/15">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <Spark className="size-5" />
          <span className="font-display text-lg tracking-tight">Claude</span>
        </a>
        <span className="label">Opus 4.8</span>
      </div>
    </header>
  );
}
