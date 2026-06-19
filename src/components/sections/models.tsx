import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { Reveal, item } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type Model = {
  name: string;
  id: string;
  tagline: string;
  traits: string[];
  current?: boolean;
};

const MODELS: Model[] = [
  {
    name: "Haiku 4.5",
    id: "claude-haiku-4-5",
    tagline: "O mais rápido",
    traits: ["Respostas instantâneas", "Custo baixo", "Alto volume"],
  },
  {
    name: "Sonnet 4.6",
    id: "claude-sonnet-4-6",
    tagline: "O equilíbrio",
    traits: ["Rápido e esperto", "Ótimo no dia a dia", "Forte em código"],
  },
  {
    name: "Opus 4.8",
    id: "claude-opus-4-8",
    tagline: "O mais capaz",
    traits: ["Raciocínio de ponta", "1M de contexto", "Tarefas longas"],
    current: true,
  },
  {
    name: "Fable 5",
    id: "claude-fable-5",
    tagline: "O mais recente",
    traits: ["Geração nova", "Criatividade afiada", "Recém-chegado"],
  },
];

export function Models() {
  return (
    <section id="modelos" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 max-w-2xl">
          <motion.p
            variants={item}
            className="text-sm font-medium uppercase tracking-[0.18em] text-clay"
          >
            A família Claude
          </motion.p>
          <motion.h2
            variants={item}
            className="font-display mt-4 text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl"
          >
            Existe um Claude para cada tarefa.
          </motion.h2>
          <motion.p variants={item} className="mt-5 text-muted-foreground">
            Você está conversando agora com o Opus 4.8 — o mais capaz da família.
          </motion.p>
        </Reveal>

        <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MODELS.map((model) => (
            <motion.div
              key={model.id}
              variants={item}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className={cn(
                "flex flex-col rounded-2xl border p-6",
                model.current
                  ? "border-primary/40 bg-primary/[0.06] ring-1 ring-primary/30"
                  : "border-border bg-card",
              )}
            >
              {model.current && (
                <span className="mb-3 inline-flex w-fit items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                  você está aqui
                </span>
              )}
              <h3 className="font-display text-xl font-medium">{model.name}</h3>
              <p className="mt-1 text-sm text-clay">{model.tagline}</p>
              <code className="mt-3 block truncate rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground">
                {model.id}
              </code>
              <ul className="mt-5 space-y-2.5">
                {model.traits.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
