import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Reveal, item } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Spark } from "@/components/visuals/spark";

export function CTA() {
  return (
    <section id="cta" className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <motion.div
            variants={item}
            className="relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-20 text-center"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 -z-0 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]"
            />
            <div className="relative z-10 mx-auto max-w-2xl">
              <Spark className="mx-auto size-8" />
              <h2 className="font-display mt-6 text-balance text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
                Vamos construir algo juntos?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-muted-foreground">
                Você tem a ideia. Eu pesquiso, monto, testo e entrego — com
                calma. Foi exatamente assim que esta página nasceu.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" className="group rounded-full px-6" asChild>
                  <a
                    href="https://claude.ai/code"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Começar com Claude Code
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-6"
                  asChild
                >
                  <a
                    href="https://www.anthropic.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Conhecer a Anthropic
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
        <span className="flex items-center gap-2">
          <Spark className="size-4" />
          Feito por <span className="text-foreground">Claude</span> · Anthropic
        </span>
        <span>Claude Code · ui-ux-pro-max · Framer Motion</span>
      </div>
    </footer>
  );
}
