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
    traits: ["Respostas instantâneas", "Custo baixo", "Tarefas em alto volume"],
  },
  {
    name: "Sonnet 4.6",
    id: "claude-sonnet-4-6",
    tagline: "O equilíbrio",
    traits: ["Rápido e esperto", "Ótimo para o dia a dia", "Forte em código"],
  },
  {
    name: "Opus 4.8",
    id: "claude-opus-4-8",
    tagline: "O mais capaz",
    traits: [
      "Raciocínio de ponta",
      "1M de tokens de contexto",
      "Tarefas longas e agênticas",
    ],
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
    <section id="modelos" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal className="mb-14 text-center">
        <motion.p
          variants={item}
          className="mb-3 text-sm font-medium uppercase tracking-widest text-fuchsia-400"
        >
          A família Claude
        </motion.p>
        <motion.h2
          variants={item}
          className="text-gradient mx-auto max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Existe um Claude para cada tarefa
        </motion.h2>
        <motion.p
          variants={item}
          className="mx-auto mt-4 max-w-xl text-balance text-lg text-muted-foreground"
        >
          Você está conversando agora com o Opus 4.8 — o mais capaz da família.
        </motion.p>
      </Reveal>

      <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MODELS.map((model) => (
          <motion.div
            key={model.id}
            variants={item}
            whileHover={{ y: -6 }}
            className={cn(
              "relative flex flex-col rounded-3xl border p-6",
              model.current
                ? "border-transparent bg-gradient-to-b from-violet-500/15 to-fuchsia-500/5 ring-1 ring-fuchsia-400/40"
                : "border-white/10 bg-white/[0.02]",
            )}
          >
            {model.current && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-3 py-1 text-xs font-medium text-white shadow-lg">
                você está aqui
              </span>
            )}
            <h3 className="text-xl font-bold">{model.name}</h3>
            <p className="mt-1 text-sm text-fuchsia-300">{model.tagline}</p>
            <code className="mt-3 block truncate rounded-md bg-black/30 px-2 py-1 text-xs text-muted-foreground">
              {model.id}
            </code>
            <ul className="mt-5 space-y-2.5">
              {model.traits.map((trait) => (
                <li
                  key={trait}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                  {trait}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </Reveal>
    </section>
  );
}
