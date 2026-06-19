import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";

import { Button } from "@/components/ui/button";

// Easing recomendado pela skill (Modern Dark / Liquid Glass): expo-out
const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh w-full flex-col items-center justify-center px-6 pt-28"
    >
      {/* Blobs de luz ambiente (morphing lento) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] h-[36rem] w-[36rem] rounded-full bg-violet-600/20 blur-[130px]"
        style={{ animation: "blob-1 16s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[62%] top-[34%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/15 blur-[130px]"
        style={{ animation: "blob-2 20s ease-in-out infinite" }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        {/* Badge de status em vidro */}
        <motion.div variants={item}>
          <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Online agora — feito pela Anthropic
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="mt-7 text-balance text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl"
        >
          <span className="text-gradient">Olá, eu sou o </span>
          <span className="text-iridescent">Claude</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl"
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
          <Button
            size="lg"
            asChild
            className="group h-12 w-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 px-7 text-base text-white shadow-lg shadow-fuchsia-500/25 transition-shadow hover:shadow-fuchsia-500/40 sm:w-auto"
          >
            <a href="#capacidades">
              Ver o que eu faço
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Button>
          <Button
            size="lg"
            asChild
            variant="ghost"
            className="glass h-12 w-full rounded-full px-7 text-base hover:bg-white/10 sm:w-auto"
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
          <Sparkles className="size-4 text-fuchsia-400" />
          Montado com Claude Code · ui-ux-pro-max · Framer Motion
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
