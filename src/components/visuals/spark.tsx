import { cn } from "@/lib/utils";

/**
 * Marca "spark" do Claude: burst radiante de raios afilados de comprimentos
 * alternados (inspirado no símbolo da Anthropic, não é um "C"). Cor clay.
 * Ver design-system/catalog/CLAUDE-BRAND.md.
 */
export function Spark({ className }: { className?: string }) {
  const rays = Array.from({ length: 12 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      className={cn("text-primary", className)}
      fill="currentColor"
    >
      {rays.map((i) => {
        const long = i % 2 === 0;
        const tip = long ? 8 : 28; // raio longo chega mais perto da borda
        const w = long ? 3.6 : 2.8;
        return (
          <path
            key={i}
            d={`M${50 - w} 50 L50 ${tip} L${50 + w} 50 Z`}
            transform={`rotate(${i * 30} 50 50)`}
          />
        );
      })}
      <circle cx="50" cy="50" r="4.5" />
    </svg>
  );
}
