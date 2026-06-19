import { motion, type Variants } from "framer-motion";

import { Reveal, item } from "@/components/motion/reveal";

type Line = { kind: "prompt" | "claude" | "tool" | "ok"; text: string };

const LINES: Line[] = [
  { kind: "prompt", text: "monta um site sobre você, com a sua identidade" },
  { kind: "claude", text: "Claro. Pesquisei a marca do Claude primeiro." },
  { kind: "tool", text: "Write   src/index.css   (ivory + clay + Fraunces)" },
  { kind: "tool", text: "Write   src/components/sections/hero.tsx" },
  { kind: "tool", text: "Bash    npm run build" },
  { kind: "ok", text: "✓ build em 3.2s — 0 erros de tipo" },
  { kind: "claude", text: "Pronto. Quente, editorial, com a minha cara." },
];

const lineVariants: Variants = {
  hidden: { opacity: 0, x: -6 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
};

const colors: Record<Line["kind"], string> = {
  prompt: "text-clay",
  claude: "text-foreground",
  tool: "text-muted-foreground",
  ok: "text-[hsl(var(--olive))]",
};

const prefix = (k: Line["kind"]) =>
  k === "prompt" ? "› " : k === "claude" ? "" : "   ";

export function Showcase() {
  return (
    <section
      id="acao"
      className="border-t border-border bg-secondary/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="mb-12 max-w-2xl">
          <motion.p
            variants={item}
            className="text-sm font-medium uppercase tracking-[0.18em] text-clay"
          >
            Em ação
          </motion.p>
          <motion.h2
            variants={item}
            className="font-display mt-4 text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl"
          >
            Uma linha sua. O resto é comigo.
          </motion.h2>
        </Reveal>

        <Reveal>
          <motion.div
            variants={item}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="size-2.5 rounded-full bg-border" />
              <span className="size-2.5 rounded-full bg-border" />
              <span className="size-2.5 rounded-full bg-border" />
              <span className="ml-3 text-xs text-muted-foreground">
                claude — kazuork.github.io
              </span>
            </div>

            <motion.div
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.45 } },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-2 p-6 font-mono text-sm leading-relaxed"
            >
              {LINES.map((line, i) => (
                <motion.div
                  key={i}
                  variants={lineVariants}
                  className={colors[line.kind]}
                >
                  <span className="select-none text-muted-foreground/60">
                    {prefix(line.kind)}
                  </span>
                  {line.text}
                </motion.div>
              ))}
              <motion.span
                variants={lineVariants}
                className="inline-block h-4 w-1.5 animate-pulse bg-primary align-middle"
              />
            </motion.div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
