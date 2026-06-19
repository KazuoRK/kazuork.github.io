import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Spark } from "@/components/visuals/spark";

const LINKS = [
  { label: "O que eu faço", href: "#oficio" },
  { label: "A família", href: "#modelos" },
  { label: "Em ação", href: "#acao" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <a href="#top" className="flex items-center gap-2 text-lg font-semibold">
          <Spark className="size-5" />
          <span className="font-display tracking-tight">Claude</span>
        </a>

        <div className="hidden items-center gap-8 sm:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <Button size="sm" className="rounded-full" asChild>
          <a href="#cta">Conversar</a>
        </Button>
      </nav>
    </motion.header>
  );
}
