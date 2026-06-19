---
name: ui-ux-pro-max
description: >-
  Gera layouts e seções modernas (hero, features, pricing, CTA, footer) com
  visual de produto premium. Use quando o usuário pedir para criar/melhorar uma
  landing page, hero section, ou deixar uma tela "mais bonita/moderna". Combina
  componentes do 21st.dev, Tailwind/shadcn e animações com Framer Motion.
---

# UI UX Pro Max

Skill para montar interfaces modernas e animadas rapidamente, no mesmo padrão
de agências que cobram caro — mas em minutos.

## Stack que esta skill assume

- **React + TypeScript + Vite**
- **Tailwind CSS + shadcn/ui** (design tokens em CSS variables, `cn()` em `@/lib/utils`)
- **21st.dev** como fonte de seções prontas (hero, bento, pricing, etc.)
- **Framer Motion** para animar entrada e interações
- **lucide-react** para ícones

## Workflow (siga nesta ordem)

1. **Entenda o objetivo da seção** — produto, público, tom (sério, divertido,
   luxo, dev-tool). Defina headline + subheadline + 1 CTA primário antes de
   escrever JSX.
2. **Pegue a base no 21st.dev** — escolha uma seção que se aproxime do objetivo.
   Instale via shadcn registry:
   ```bash
   npx shadcn@latest add "https://21st.dev/r/<autor>/<componente>"
   ```
   Se não houver acesso à rede, recrie a estrutura manualmente seguindo os
   princípios de layout abaixo.
3. **Adapte ao design system** — troque cores hardcoded por tokens
   (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`).
   Reuse o componente `Button` de `@/components/ui/button`.
4. **Anime com Framer Motion** — use o padrão de `container`/`item` com
   `staggerChildren` (ver receita abaixo). Entrada com `opacity + y + blur`.
5. **Polimento** — `text-balance` em parágrafos, gradient no título
   (`bg-clip-text text-transparent`), glow de fundo com `blur-[120px]`, grid
   sutil com `mask-image` radial.

## Receita de animação (Framer Motion)

```tsx
import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// <motion.div variants={container} initial="hidden" animate="show">
//   <motion.h1 variants={item}> ... </motion.h1>
// </motion.div>
```

Para revelar acima da dobra use `animate="show"`. Para seções abaixo da dobra,
troque por `whileInView="show"` + `viewport={{ once: true, margin: "-100px" }}`.

## Princípios de layout (não negociáveis)

- **Hierarquia clara**: 1 headline forte, 1 subheadline, 1 CTA primário (+1 secundário no máximo).
- **Respiro**: padding generoso (`py-24`+), `max-w-3xl` para texto centralizado.
- **Contraste**: título quase branco/preto, corpo em `muted-foreground`.
- **Profundidade**: glow + grid sutil + bordas finas, sem exagerar.
- **Responsivo desde o início**: mobile-first, `sm:`/`lg:` para escalar.
- **Acessibilidade**: `aria-hidden` em elementos decorativos, contraste AA.

## Checklist antes de entregar

- [ ] Usa tokens do tema (sem cor hardcoded fora de gradientes decorativos)
- [ ] Funciona em mobile (testar largura ~375px)
- [ ] Animações suaves, sem layout shift
- [ ] CTA primário óbvio
- [ ] `npm run build` passa sem erros de type
