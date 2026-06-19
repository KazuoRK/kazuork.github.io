const ITEMS = [
  "Claude Code",
  "Python",
  "TypeScript",
  "React",
  "Rust",
  "Go",
  "MCP",
  "Supabase",
  "GitHub",
  "Refatoração",
  "Code Review",
  "SQL",
  "Data Analysis",
  "Debugging",
  "Testes",
  "Documentação",
];

export function Marquee() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-marquee gap-4">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-sm text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
