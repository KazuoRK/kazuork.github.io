import { cn } from "@/lib/utils";

/**
 * Marca "spark"/sunburst do Claude — estrela radial de 8 pontas, abstrata.
 * Inspirada no símbolo da Anthropic (não é um "C" literal). Cor clay por padrão.
 * Ver design-system/catalog/CLAUDE-BRAND.md.
 */
export function Spark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      className={cn("text-primary", className)}
      fill="currentColor"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <path
          key={i}
          d="M50 6 C 53 30, 53 30, 50 50 C 47 30, 47 30, 50 6 Z"
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="6" />
    </svg>
  );
}
