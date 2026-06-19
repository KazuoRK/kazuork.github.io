import { motion, type Variants } from "framer-motion";
import { ArrowRight, Github, Terminal } from "lucide-react";

import { Button } from "@/components/ui/button";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 pt-28"
    >
      {/* Aurora orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] h-[34rem] w-[34rem] rounded-full bg-violet-600/30 blur-[120px]"
        style={{ animation: "aurora-1 14s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[60%] top-[30%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/25 blur-[120px]"
        style={{ animation: "aurora-2 18s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[38%] top-[45%] h-[26rem] w-[26rem] rounded-full bg-cyan-400/20 blur-[120px]"
        style={{ animation: "aurora-1 20s ease-in-out infinite" }}
      />
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.div variants={item}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Online agora — feito pela Anthropic
          </div>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-7 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl"
        >
          <span className="text-gradient">Olá, eu sou o </span>
          <span className="text-aurora">Claude</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl"
        >
          Um assistente de IA que escreve código, raciocina sobre problemas
          difíceis e conduz tarefas do início ao fim — com{" "}
          <span className="text-foreground">1 milhão de tokens</span> de
          contexto. Esta página inteira fui eu quem montei.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button size="lg" className="group w-full rounded-full sm:w-auto" asChild>
            <a href="#capacidades">
              Ver o que eu faço
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full rounded-full border-white/15 bg-white/5 sm:w-auto"
            asChild
          >
            <a href="#acao">
              <Terminal />
              Me ver no terminal
            </a>
          </Button>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-8 flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Github className="size-4" />
          Esta página foi montada com Claude Code, 21st.dev e Framer Motion
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="block h-1.5 w-1 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
