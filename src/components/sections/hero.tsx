import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Hero section no estilo 21st.dev, animada com Framer Motion.
 *
 * Estrutura pensada para ser "copiada e colada": cada bloco entra com um
 * stagger suave, o título revela palavra por palavra e o fundo tem um glow
 * que reage de forma sutil. Ajuste os textos abaixo para o seu projeto.
 */

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const HEADLINE = "Sites que parecem custar R$50 mil";

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-6">
      {/* Glow de fundo animado */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="pointer-events-none absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-violet-500/30 via-fuchsia-500/20 to-cyan-400/30 blur-[120px]"
      />

      {/* Grid sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)] opacity-40"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        {/* Badge */}
        <motion.div variants={item}>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur">
            <Sparkles className="size-3.5 text-fuchsia-400" />
            Montado com Claude Code + 21st.dev + Framer Motion
          </div>
        </motion.div>

        {/* Título com reveal palavra a palavra.
            O gradiente + bg-clip-text fica em CADA span (não no <h1> pai),
            porque o transform do Framer Motion cria um stacking context próprio
            em cada palavra e o fundo do pai não vazaria para o texto filho. */}
        <motion.h1
          variants={item}
          className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl"
        >
          {HEADLINE.split(" ").map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              variants={item}
              className="mr-[0.25em] inline-block bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-balance text-lg text-muted-foreground"
        >
          Layouts modernos, hero sections do 21st.dev e animações suaves — em
          minutos, com uma linha de código no terminal.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button size="lg" className="group w-full sm:w-auto">
            Começar agora
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Ver no GitHub
          </Button>
        </motion.div>

        {/* Prova social */}
        <motion.div
          variants={item}
          className="mt-10 flex items-center gap-2 text-sm text-muted-foreground"
        >
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span>amado por quem odeia mexer em CSS</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
