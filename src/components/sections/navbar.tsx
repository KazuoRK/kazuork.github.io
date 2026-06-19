import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

const LINKS = [
  { label: "Capacidades", href: "#capacidades" },
  { label: "Modelos", href: "#modelos" },
  { label: "Em ação", href: "#acao" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav className="glass-strong flex w-full max-w-3xl items-center justify-between rounded-full px-5 py-2.5 shadow-lg shadow-black/30">
        <a href="#top" className="flex items-center gap-2 font-semibold">
          <span className="grid size-7 place-items-center rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500">
            <Sparkles className="size-4 text-white" />
          </span>
          Claude
        </a>

        <div className="hidden items-center gap-1 sm:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
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
