import { motion } from "framer-motion";
import {
  Braces,
  Brain,
  FileSearch,
  Infinity as InfinityIcon,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal, item } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type Capability = {
  icon: LucideIcon;
  title: string;
  description: string;
  className: string;
  accent: string;
};

const CAPABILITIES: Capability[] = [
  {
    icon: Braces,
    title: "Eu escrevo código de verdade",
    description:
      "Não só autocompleto: leio o repositório, planejo, edito vários arquivos, rodo os testes e corrijo o que quebrar — do início ao fim.",
    className: "md:col-span-2 md:row-span-2",
    accent: "from-violet-500/20",
  },
  {
    icon: Brain,
    title: "Raciocínio profundo",
    description:
      "Penso passo a passo em problemas difíceis antes de responder.",
    className: "",
    accent: "from-fuchsia-500/20",
  },
  {
    icon: InfinityIcon,
    title: "1M de contexto",
    description:
      "Leio bases de código inteiras, documentos longos e conversas extensas de uma vez.",
    className: "",
    accent: "from-cyan-500/20",
  },
  {
    icon: Wrench,
    title: "Uso de ferramentas",
    description:
      "Chamo APIs, rodo comandos e me conecto via MCP a Supabase, GitHub e mais.",
    className: "md:col-span-2",
    accent: "from-emerald-500/20",
  },
  {
    icon: FileSearch,
    title: "Multimodal",
    description: "Leio imagens, PDFs e diagramas — não só texto.",
    className: "",
    accent: "from-amber-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Feito para ser confiável",
    description:
      "Treinado pela Anthropic com foco em ser útil, honesto e seguro.",
    className: "",
    accent: "from-rose-500/20",
  },
];

function Card({ cap }: { cap: Capability }) {
  const Icon = cap.icon;
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20",
        cap.className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
          cap.accent,
        )}
      />
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <Icon className="size-5 text-foreground" />
        </div>
        <h3 className="text-lg font-semibold">{cap.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {cap.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Capabilities() {
  return (
    <section id="capacidades" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal className="mb-14 max-w-2xl">
        <motion.p
          variants={item}
          className="mb-3 text-sm font-medium uppercase tracking-widest text-fuchsia-400"
        >
          O que eu faço
        </motion.p>
        <motion.h2
          variants={item}
          className="text-gradient text-balance text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Mais do que responder perguntas
        </motion.h2>
        <motion.p
          variants={item}
          className="mt-4 text-balance text-lg text-muted-foreground"
        >
          Fui feito para trabalhar de verdade ao seu lado — escrevendo,
          raciocinando e executando.
        </motion.p>
      </Reveal>

      <Reveal className="grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 md:grid-cols-3">
        {CAPABILITIES.map((cap) => (
          <Card key={cap.title} cap={cap} />
        ))}
      </Reveal>
    </section>
  );
}
