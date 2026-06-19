# kazuork.github.io

Site moderno montado com o stack: **Claude Code + 21st.dev + Framer Motion + shadcn/Tailwind**.

## Stack

- ⚡️ **Vite + React + TypeScript**
- 🎨 **Tailwind CSS + shadcn/ui** (design tokens em CSS variables)
- 🧩 **21st.dev** como fonte de seções prontas (`npx shadcn@latest add "https://21st.dev/r/..."`)
- ✨ **Framer Motion** para animações
- 🤖 **Skill UI UX Pro Max** em `.claude/skills/ui-ux-pro-max` — gera/melhora seções modernas dentro do Claude Code

## Como rodar

```bash
npm install
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção (dist/)
npm run preview  # preview do build
```

## Como adicionar uma seção (o "one-liner")

No Claude Code, peça: _"usa a skill ui-ux-pro-max e cria uma seção de pricing"_.
A skill segue o workflow: pega a base no 21st.dev → adapta ao design system →
anima com Framer Motion.

Para puxar um componente direto do 21st.dev:

```bash
npx shadcn@latest add "https://21st.dev/r/<autor>/<componente>"
```

## Deploy

O deploy é automático via GitHub Pages (`.github/workflows/deploy.yml`) a cada
push na branch `main`. Habilite **Settings → Pages → Source: GitHub Actions**.
