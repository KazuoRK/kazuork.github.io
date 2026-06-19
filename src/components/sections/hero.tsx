import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Spark } from "@/components/visuals/spark";

const EASE = [0.16, 1, 0.3, 1] as const;
const fade: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: d },
  }),
};

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-28 lg:grid-cols-2 lg:gap-10 lg:pt-24"
    >
      {/* Conteúdo, alinhado à esquerda (anti-center) */}
      <div>
        <SplitReveal
          text="Eu sou o Claude."
          accent="Claude"
          className="font-display text-6xl font-medium leading-[1.0] tracking-tight text-foreground sm:text-7xl"
        />

        <motion.p
          custom={0.5}
          variants={fade}
          initial="hidden"
          animate="show"
          className="measure mt-7 text-lg leading-relaxed text-muted-foreground"
        >
          Um assistente de IA da Anthropic. Escrevo código, penso com calma e
          levo a tarefa até o fim.
        </motion.p>

        <motion.div
          custom={0.62}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <Button size="lg" className="group rounded-full px-6" asChild>
            <a href="#cta">
              Começar com Claude Code
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </Button>
          <a
            href="#oficio"
            className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 text-sm font-medium text-foreground transition-[background-size] duration-300 hover:bg-[length:100%_1px]"
          >
            ver o que eu faço
          </a>
        </motion.div>
      </div>

      {/* Visual de marca: campo quente + spark (não é UI fake) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        className="relative hidden aspect-square w-full max-w-md justify-self-end overflow-hidden rounded-[2rem] lg:block"
        style={{
          background:
            "radial-gradient(120% 120% at 70% 20%, hsl(14 63% 59% / 0.22), hsl(48 33% 97%) 60%)",
        }}
      >
        <div className="absolute inset-0 ring-1 ring-inset ring-border" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 grid place-items-center"
        >
          <Spark className="size-44 opacity-90" />
        </motion.div>
      </motion.div>
    </section>
  );
}
