import { Counter } from "@/components/motion/counter";
import { Reveal, RevealItem } from "@/components/motion/reveal";

const STATS = [
  { value: 1, decimals: 0, suffix: "M", label: "tokens de contexto" },
  { value: 4, decimals: 0, suffix: "", label: "modelos na família" },
  { value: 100, decimals: 0, suffix: "+", label: "linguagens de código" },
  { value: 24, decimals: 0, suffix: "/7", label: "sempre disponível" },
];

export function Stats() {
  return (
    <section className="relative border-y border-white/5 bg-white/[0.02] py-16">
      <Reveal className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {STATS.map((stat) => (
          <RevealItem key={stat.label} className="text-center">
            <div className="text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="text-aurora">
                <Counter value={stat.value} decimals={stat.decimals} />
                {stat.suffix}
              </span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {stat.label}
            </div>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
