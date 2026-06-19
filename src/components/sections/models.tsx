import { motion, type Variants } from "framer-motion";

import { Spark } from "@/components/visuals/spark";

const EASE = [0.16, 1, 0.3, 1] as const;
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const OTHERS = [
  { name: "Haiku 4.5", tag: "o mais rápido", id: "claude-haiku-4-5" },
  { name: "Sonnet 4.6", tag: "o equilíbrio", id: "claude-sonnet-4-6" },
  { name: "Fable 5", tag: "o mais recente", id: "claude-fable-5" },
];

export function Models() {
  return (
    <section
      id="modelos"
      className="border-t border-border bg-secondary/50 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-2xl"
        >
          <h2 className="font-display text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            Existe um Claude para cada tarefa.
          </h2>
          <p className="measure mt-4 text-muted-foreground">
            Você está conversando agora com o Opus 4.8, o mais capaz da família.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-5"
        >
          {/* Opus em destaque (assimétrico) */}
          <motion.article
            variants={item}
            className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-foreground p-8 text-background lg:col-span-2"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 size-48 opacity-20"
            >
              <Spark className="size-full" />
            </div>
            <div className="relative">
              <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                você está aqui
              </span>
              <h3 className="font-display mt-4 text-3xl font-medium">
                Opus 4.8
              </h3>
              <p className="mt-1 text-clay">o mais capaz</p>
            </div>
            <ul className="relative mt-8 space-y-1.5 text-sm text-background/80">
              <li>Raciocínio de ponta</li>
              <li>1 milhão de tokens de contexto</li>
              <li>Tarefas longas e agênticas</li>
            </ul>
            <code className="relative mt-6 block w-fit rounded-md bg-background/10 px-2 py-1 font-mono text-xs text-background/70">
              claude-opus-4-8
            </code>
          </motion.article>

          {/* Os outros, em lista dividida */}
          <motion.div
            variants={item}
            className="divide-y divide-border rounded-2xl border border-border bg-card lg:col-span-3"
          >
            {OTHERS.map((m) => (
              <div
                key={m.id}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 p-7"
              >
                <div>
                  <h3 className="font-display text-2xl font-medium">{m.name}</h3>
                  <p className="text-sm text-muted-foreground">{m.tag}</p>
                </div>
                <code className="font-mono text-xs text-muted-foreground">
                  {m.id}
                </code>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
