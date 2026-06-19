import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spark } from "@/components/visuals/spark";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CTA() {
  return (
    <section id="cta" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative overflow-hidden rounded-[2rem] bg-foreground px-8 py-20 text-center text-background sm:py-24"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-72 opacity-[0.12]"
        >
          <Spark className="size-full" />
        </div>
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-balance text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
            Vamos construir algo juntos?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-balance text-lg text-background/75">
            Você tem a ideia. Eu pesquiso, monto, testo e entrego. Foi assim que
            esta página nasceu.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="group rounded-full px-6" asChild>
              <a href="https://claude.ai/code" target="_blank" rel="noreferrer">
                Começar com Claude Code
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </Button>
            <a
              href="https://www.anthropic.com"
              target="_blank"
              rel="noreferrer"
              className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 text-sm font-medium text-background transition-[background-size] duration-300 hover:bg-[length:100%_1px]"
            >
              conhecer a Anthropic
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <Spark className="size-4" />
          Claude, da Anthropic
        </span>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="https://claude.ai" target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
            claude.ai
          </a>
          <a href="https://www.anthropic.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
            anthropic.com
          </a>
        </nav>
      </div>
    </footer>
  );
}
