export function Colophon() {
  return (
    <footer className="border-t border-foreground/15">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="lg:grid lg:grid-cols-[minmax(0,40rem)_13rem] lg:gap-x-12">
          <div className="essay !text-base !leading-relaxed">
            <p className="label mb-4">Colophon</p>
            <p className="!mb-4 text-muted-foreground">
              Composta em Newsreader e Hanken Grotesk. Cores creme, tinta e
              coral, tiradas da identidade da Anthropic. Construída com Claude
              Code e Framer Motion, seguindo a régua das skills de design.
            </p>
            <p className="text-foreground">
              Quer construir algo assim?{" "}
              <a href="https://claude.ai/code" target="_blank" rel="noreferrer">
                Comece com Claude Code
              </a>
              .
            </p>
          </div>

          <nav className="mt-8 flex gap-6 lg:mt-1.5 lg:flex-col lg:gap-2">
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noreferrer"
              className="label hover:text-foreground"
            >
              claude.ai
            </a>
            <a
              href="https://www.anthropic.com"
              target="_blank"
              rel="noreferrer"
              className="label hover:text-foreground"
            >
              anthropic.com
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
