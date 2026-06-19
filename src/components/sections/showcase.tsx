import { motion, type Variants } from "framer-motion";

import { Reveal, item } from "@/components/motion/reveal";

type Line = { kind: "prompt" | "claude" | "tool" | "ok"; text: string };

const LINES: Line[] = [
  { kind: "prompt", text: "monta uma landing page sobre você" },
  { kind: "claude", text: "Beleza! Vou usar a skill ui-ux-pro-max." },
  { kind: "tool", text: "● Write  src/components/sections/hero.tsx" },
  { kind: "tool", text: "● Write  src/components/sections/capabilities.tsx" },
  { kind: "tool", text: "● Edit   src/index.css  (aurora + grid)" },
  { kind: "tool", text: "● Bash   npm run build" },
  { kind: "ok", text: "✓ built in 3.2s — 0 erros de type" },
  { kind: "claude", text: "Pronto. Dá uma olhada 👇" },
];

const lineVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const colors: Record<Line["kind"], string> = {
  prompt: "text-fuchsia-300",
  claude: "text-foreground",
  tool: "text-cyan-300",
  ok: "text-emerald-400",
};

function prefix(kind: Line["kind"]) {
  if (kind === "prompt") return "› ";
  if (kind === "claude") return "🤖 ";
  return "   ";
}

export function Showcase() {
  return (
    <section id="acao" className="relative mx-auto max-w-5xl px-6 py-28">
      <Reveal className="mb-12 text-center">
        <motion.p
          variants={item}
          className="mb-3 text-sm font-medium uppercase tracking-widest text-fuchsia-400"
        >
          Eu, em ação
        </motion.p>
        <motion.h2
          variants={item}
          className="text-gradient mx-auto max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Uma linha sua. O resto é comigo.
        </motion.h2>
      </Reveal>

      <Reveal className="relative">
        <motion.div
          variants={item}
          className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0f] shadow-2xl shadow-violet-500/10"
        >
          {/* Barra do terminal */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="size-3 rounded-full bg-red-400/80" />
            <span className="size-3 rounded-full bg-amber-400/80" />
            <span className="size-3 rounded-full bg-emerald-400/80" />
            <span className="ml-3 text-xs text-muted-foreground">
              claude — kazuork.github.io
            </span>
          </div>

          {/* Conteúdo */}
          <motion.div
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.5 } },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            className="space-y-2 p-6 font-mono text-sm leading-relaxed"
          >
            {LINES.map((line, i) => (
              <motion.div
                key={i}
                variants={lineVariants}
                className={colors[line.kind]}
              >
                <span className="select-none text-muted-foreground">
                  {prefix(line.kind)}
                </span>
                {line.text}
              </motion.div>
            ))}
            <motion.span
              variants={lineVariants}
              className="inline-block h-4 w-2 animate-pulse bg-fuchsia-400 align-middle"
            />
          </motion.div>
        </motion.div>
      </Reveal>
    </section>
  );
}
