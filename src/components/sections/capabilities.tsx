import { motion, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function Capabilities() {
  return (
    <section id="oficio" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="font-display max-w-2xl text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl"
      >
        Mais do que responder perguntas.
      </motion.h2>

      <motion.div
        variants={group}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {/* Célula grande, tingida em clay (variação visual) */}
        <motion.article
          variants={item}
          className="rounded-2xl bg-primary p-8 text-primary-foreground md:col-span-2"
        >
          <h3 className="font-display text-2xl font-medium">
            Escrevo código de verdade
          </h3>
          <p className="mt-3 max-w-md text-primary-foreground/85">
            Leio o repositório, planejo, edito vários arquivos, rodo os testes e
            corrijo o que quebrar. Levo a tarefa até o fim, não só autocompleto.
          </p>
        </motion.article>

        {/* Célula com campo de cor quente (variação visual) */}
        <motion.article
          variants={item}
          className="relative overflow-hidden rounded-2xl border border-border p-8"
          style={{
            background:
              "radial-gradient(120% 120% at 80% 10%, hsl(14 63% 59% / 0.14), hsl(46 40% 99%) 65%)",
          }}
        >
          <h3 className="font-display text-2xl font-medium">
            Um milhão de tokens
          </h3>
          <p className="mt-3 text-muted-foreground">
            Leio bases de código inteiras e documentos longos sem perder o fio.
          </p>
        </motion.article>

        {[
          {
            t: "Raciocínio com calma",
            b: "Penso passo a passo em problemas difíceis antes de responder.",
          },
          {
            t: "Uso ferramentas",
            b: "Rodo comandos no terminal, chamo APIs e me conecto via MCP.",
          },
          {
            t: "Leio mais que texto",
            b: "Imagens, PDFs e diagramas. Você me mostra um print e eu entendo.",
          },
        ].map((c) => (
          <motion.article
            key={c.t}
            variants={item}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-warm-sm"
          >
            <h3 className="font-display text-xl font-medium">{c.t}</h3>
            <p className="mt-3 text-muted-foreground">{c.b}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
