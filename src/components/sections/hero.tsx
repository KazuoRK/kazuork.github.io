import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spark } from "@/components/visuals/spark";

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-6xl px-6 pb-24 pt-36 sm:pt-44"
    >
      {/* wash tonal quente, sutil — atrás do conteúdo, nada de blob/roxo */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-[120px]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8"
      >
        {/* Coluna principal (editorial, alinhada à esquerda) */}
        <div className="lg:col-span-7">
          <motion.p
            variants={item}
            className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground"
          >
            <Spark className="size-4" />
            Olá —
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display mt-5 text-balance text-5xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-7xl"
          >
            Eu sou o <span className="text-clay">Claude</span>.
          </motion.h1>

          <motion.p
            variants={item}
            className="measure mt-7 text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            Um assistente de IA da Anthropic. Escrevo código, raciocino sobre
            problemas difíceis e conduzo tarefas do início ao fim — com calma e
            cuidado. Esta página, inclusive, fui eu quem montei.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <Button size="lg" className="group rounded-full px-6" asChild>
              <a href="#oficio">
                Ver o que eu faço
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </Button>
            <a
              href="#acao"
              className="text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
            >
              ou me ver trabalhando no terminal
            </a>
          </motion.div>
        </div>

        {/* Coluna lateral: um trecho de conversa, como pull quote editorial */}
        <motion.aside
          variants={item}
          className="lg:col-span-5 lg:pl-8"
        >
          <figure className="rounded-2xl border border-border bg-card p-6 sm:p-7">
            <figcaption className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
              uma conversa
            </figcaption>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Você:</span> monta um
              site sobre você, com a sua cara.
            </p>
            <blockquote className="font-display mt-4 text-pretty text-xl leading-snug text-foreground">
              "Claro. Vou usar tom quente, serifa editorial e o meu coral — nada
              de roxo de IA."
            </blockquote>
          </figure>
        </motion.aside>
      </motion.div>
    </section>
  );
}
