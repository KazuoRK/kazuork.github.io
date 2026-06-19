import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const word: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.7, ease: EASE } },
};

/**
 * Revela um título palavra a palavra, cada palavra subindo por trás de uma
 * máscara (overflow hidden). Respeita prefers-reduced-motion. Uma palavra pode
 * receber destaque em clay via `accent`.
 */
export function SplitReveal({
  text,
  accent,
  className,
}: {
  text: string;
  accent?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <motion.h1
      aria-label={text}
      initial={reduce ? undefined : "hidden"}
      animate={reduce ? undefined : "show"}
      transition={{ staggerChildren: 0.07, delayChildren: 0.08 }}
      className={cn("flex flex-wrap", className)}
    >
      {words.map((w, i) => {
        const isAccent = accent && w.replace(/[.,]/g, "") === accent;
        return (
          <span
            key={`${w}-${i}`}
            aria-hidden
            className="mr-[0.22em] inline-flex overflow-hidden pb-[0.12em]"
          >
            <motion.span
              variants={reduce ? undefined : word}
              className={cn("inline-block", isAccent && "italic text-clay")}
            >
              {w}
            </motion.span>
          </span>
        );
      })}
    </motion.h1>
  );
}
