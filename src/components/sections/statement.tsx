import { motion } from "framer-motion";

export function Statement() {
  return (
    <section className="border-y border-border bg-secondary/50">
      <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-pretty text-3xl font-medium leading-[1.25] tracking-tight text-foreground sm:text-4xl"
        >
          Não tento parecer rápido. Prefiro ler o repositório inteiro, pensar com
          calma e entregar algo que funciona. Esta página, inclusive, fui eu quem{" "}
          <span className="text-clay">montei do zero</span>.
        </motion.p>
      </div>
    </section>
  );
}
