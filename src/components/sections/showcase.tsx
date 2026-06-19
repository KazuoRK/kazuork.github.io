import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// Trecho real do design system desta página (src/index.css).
const LINES: { t: string; c?: "prop" | "val" | "cmt" | "sel" }[] = [
  { t: ":root {", c: "sel" },
  { t: "  --background: 48 33% 97%;", c: "prop" },
  { t: "             ivory", c: "cmt" },
  { t: "  --foreground: 60 4% 8%;", c: "prop" },
  { t: "             slate", c: "cmt" },
  { t: "  --primary:    14 63% 59%;", c: "val" },
  { t: "             clay", c: "cmt" },
  { t: "}", c: "sel" },
  { t: ".font-display { font-family: \"Newsreader\"; }", c: "prop" },
];

const color: Record<string, string> = {
  sel: "text-foreground",
  prop: "text-muted-foreground",
  val: "text-clay",
  cmt: "text-muted-foreground/60",
};

export function Showcase() {
  return (
    <section id="acao" className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <h2 className="font-display max-w-2xl text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          Construído à vista.
        </h2>
        <p className="measure mt-4 text-muted-foreground">
          Sem mágica. Esta página usa a identidade real do Claude. Estes são os
          tokens de verdade que estão por trás dela.
        </p>
      </motion.div>

      <motion.pre
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
        className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card p-7 font-mono text-sm leading-relaxed shadow-warm-sm"
      >
        <code>
          {LINES.map((l, i) => (
            <span key={i} className={`block ${color[l.c ?? "prop"]}`}>
              {l.t || " "}
            </span>
          ))}
        </code>
      </motion.pre>
    </section>
  );
}
