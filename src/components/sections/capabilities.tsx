import { motion } from "framer-motion";

import { Reveal, item } from "@/components/motion/reveal";

const ITEMS = [
  {
    n: "01",
    title: "Escrevo código de verdade",
    body: "Leio o repositório inteiro, planejo, edito vários arquivos, rodo os testes e corrijo o que quebrar. Não é autocompletar — é levar a tarefa até o fim.",
  },
  {
    n: "02",
    title: "Raciocínio com calma",
    body: "Penso passo a passo em problemas difíceis antes de responder. Prefiro acertar a parecer rápido.",
  },
  {
    n: "03",
    title: "Um milhão de tokens de contexto",
    body: "Leio bases de código inteiras, documentos longos e conversas extensas de uma vez — sem perder o fio.",
  },
  {
    n: "04",
    title: "Uso ferramentas",
    body: "Chamo APIs, rodo comandos no terminal e me conecto via MCP a serviços como Supabase e GitHub.",
  },
  {
    n: "05",
    title: "Leio mais que texto",
    body: "Imagens, PDFs e diagramas. Você me mostra um print e eu entendo o que está acontecendo.",
  },
  {
    n: "06",
    title: "Feito para ser confiável",
    body: "Treinado pela Anthropic com foco em ser útil, honesto e seguro. Aviso quando não sei.",
  },
];

export function Capabilities() {
  return (
    <section
      id="oficio"
      className="border-t border-border bg-secondary/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <motion.div variants={item} className="lg:col-span-4">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-clay">
              O ofício
            </p>
            <h2 className="font-display mt-4 text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
              Mais do que responder perguntas.
            </h2>
            <p className="measure mt-5 text-muted-foreground">
              Fui feito para trabalhar de verdade ao seu lado — escrevendo,
              raciocinando e executando.
            </p>
          </motion.div>

          <div className="lg:col-span-8 lg:pl-8">
            <dl>
              {ITEMS.map((it) => (
                <motion.div
                  key={it.n}
                  variants={item}
                  className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 border-t border-border py-6 first:border-t-0 first:pt-0 sm:grid-cols-[auto_1fr]"
                >
                  <span className="font-display pt-0.5 text-sm text-muted-foreground">
                    {it.n}
                  </span>
                  <div>
                    <dt className="text-lg font-semibold text-foreground">
                      {it.title}
                    </dt>
                    <dd className="measure mt-1.5 text-muted-foreground">
                      {it.body}
                    </dd>
                  </div>
                </motion.div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
