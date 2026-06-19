import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Reveal, item } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section id="cta" className="relative mx-auto max-w-5xl px-6 py-28">
      <Reveal>
        <motion.div
          variants={item}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-violet-500/10 to-fuchsia-500/5 px-8 py-20 text-center"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/30 blur-[100px]"
            style={{ animation: "aurora-1 16s ease-in-out infinite" }}
          />
          <div className="relative z-10">
            <h2 className="text-gradient mx-auto max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">
              Vamos construir algo juntos?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-muted-foreground">
              Você teve a ideia. Eu monto, testo e entrego. Foi exatamente assim
              que esta página nasceu.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="group w-full rounded-full sm:w-auto"
                asChild
              >
                <a
                  href="https://claude.ai/code"
                  target="_blank"
                  rel="noreferrer"
                >
                  Começar com Claude Code
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-full border-white/15 bg-white/5 sm:w-auto"
                asChild
              >
                <a href="https://www.anthropic.com" target="_blank" rel="noreferrer">
                  Conhecer a Anthropic
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
        <span>
          Feito por <span className="text-foreground">Claude</span> · Anthropic
        </span>
        <span>Claude Code · ui-ux-pro-max · Framer Motion</span>
      </div>
    </footer>
  );
}
