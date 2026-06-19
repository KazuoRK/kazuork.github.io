# Pesquisa: Design Web Moderno de Verdade (2025–2026)

> Base de conhecimento para construir sites de bom gosto que **não** tenham "cara de IA".
> Pesquisa em 5 frentes (cor/tipografia, benchmarks premiados, anti-padrões de IA, liquid glass, motion),
> com fontes citadas. Use isto como referência antes de desenhar/implementar qualquer página.

**Método e confiança:** pesquisa via web em 5 agentes paralelos. Muitas páginas bloquearam fetch direto (HTTP 403 / Cloudflare),
então parte dos achados vem de extratos de busca das fontes canônicas (URLs sempre citadas). Fontes de **alta confiança**
(fetch completo): Apple WWDC25 "Meet Liquid Glass", `emilkowalski/skills` SKILL.md, `taste-skill` no GitHub. Valores numéricos
sintetizados (tokens OKLCH de exemplo, params de bibliotecas de refração) estão marcados como **ajustar antes de usar**.

---

## 0. A tese central

> **IA não desenha — ela faz média.** Um prompt sem direção devolve "o centro estatístico" de toda landing page Tailwind/shadcn
> do dataset: roxo, Inter, três cards, hero centralizado. Adam Wathan (criador do Tailwind) admitiu publicamente que, como o botão
> padrão do Tailwind UI é `bg-indigo-500`, "agora toda interface gerada por IA na Terra é roxa". E há um loop: IA treina em output de IA.
> — [DEV/Alan West](https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p), [Jack Pearce](https://www.jackpearce.co.uk/notes/purple-gradient-ai-aesthetics/)

Fugir da "cara de IA" = **adicionar intenção e restrição**: uma cor própria (não roxo), tipografia com voz, layout assimétrico/editorial,
conteúdo real (foto/copy/métricas verdadeiras), e movimento com propósito. Premium não é *mais* — é *mais apertado*.

---

## 1. Os "tells" de IA → e a alternativa de bom gosto

Ordem de prioridade (matar primeiro os de maior sinal). Catálogo principal: [taste-skill (GitHub)](https://github.com/Leonxlnx/taste-skill/blob/main/skills/imagegen-frontend-web/SKILL.md).

| # | Tell de IA | Por que entrega | Alternativa de bom gosto |
|---|---|---|---|
| 1 | **Acento roxo/índigo** (`indigo-500`) | Cor mais treinada do dataset | Escolher um tom de marca próprio (muitas vezes quente/inesperado), em OKLCH; usar acento **só em CTA** |
| 2 | **"Blobs"/orbs borrados** no fundo | Decoração sem propósito, idêntica em todo site | Wash tonal de baixa croma combinado à paleta, **atrás de foto real**; micro-noise/grão pra textura |
| 3 | **Gradient text em todo heading** | Atalho de "moderno", virou clichê | Contraste tipográfico (peso + escala) faz o trabalho; gradiente em **um** momento só |
| 4 | **Inter em tudo + tokens shadcn padrão** | Default de v0/shadcn/Tailwind UI; "legível e esquecível" | Trocar a fonte (grotesk/display com voz) e **re-tematizar** raio/sombra/escala em OKLCH |
| 5 | **Hero centralizado: eyebrow + 64pt + subtítulo + 2 botões** | A página mediana literal | Hero **assimétrico/editorial** ou liderado por imagem full-bleed; headline 5–10 palavras fortes |
| 6 | **3 cards de feature com emoji/lucide** | O "three-up" reflexo após todo hero | Variar ambição por seção: um bloco grande art-directed, um editorial, um mínimo |
| 7 | **Glassmorphism em tudo** | Trend por trend; "sobrecarrega visualmente" | Vidro **seletivo**, só onde profundidade ajuda hierarquia; senão cor chapada / foto full-bleed |
| 8 | **Bento grid pra tudo** | Container default independente do conteúdo | Só quando o conteúdo realmente "ladrilha"; senão blocos editoriais / masonry |
| 9 | **Linhas clonadas texto-esquerda / imagem-direita** | "O padrão de IA mais usado" | Variar a âncora de composição por seção (≥3 distintas) |
| 10 | **Simetria perfeita e sem vida** | "Quando tudo parece igual, nada se destaca" | Offset editorial fora do grid; um momento de "segunda leitura" (pontuação gigante, troca de material) |
| 11 | **Sem foto real / ilustração custom** | Stock genérico + blobs; sinal mais rápido de "gerado" | Fotografia art-directed, crops reais de produto, foto "escapando do retângulo" |
| 12 | **Copy genérica** ("unleash/elevate/seamless/powerful") | Filler de marketing tipo lorem ipsum | Linguagem concisa e específica sobre valor real |
| 13 | **Nomes fake** (Acme, Nexus, NovaCore) | Placeholder que sobreviveu | Nome curto, crível |
| 14 | **3 colunas de stats inventadas** (99% / $10 / ∞) | Métricas "confiantes pra parecer inteligente" | Prova real: citações, recibos, timelines, workflows |
| 15 | **Dashboards/charts decorativos** ("dark SaaS") | Data viz que não explica nada | Crops reais de UI; charts só em produto de analytics |
| 16 | **Tudo arredondado + glow + soft** | O "SaaS amigável" que toda ferramenta cospe | Linguagem de raio consistente; **disciplina de sombra** (matte > glow) |
| 17 | **Muitas animações sutis sem propósito** | "Quando tudo é novidade, nada tem prioridade" | Regra **80/20**: ~80% estático, 20% movimento proposital; 2 ideias de motion no site todo |

**Top 8 pra matar primeiro:** roxo → cor própria · Inter+shadcn default → fonte+tokens · blobs borrados → wash/foto ·
hero centralizado → editorial · 3 cards-ícone → variar seções · gradient text → peso/escala · sem foto/copy real → art direction ·
glass+animação em tudo → seletivo e justificado.
Fontes: [taste-skill](https://github.com/Leonxlnx/taste-skill/blob/main/skills/imagegen-frontend-web/SKILL.md), [Trilogy AI — Fixing Visual AI Slop](https://trilogyai.substack.com/p/fixing-visual-ai-slop), [Developers Digest](https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it), [RedMonk — shadcn copypasta](https://redmonk.com/kholterhoff/2025/04/22/ui-component-libraries-shadcn-ui-and-the-revenge-of-copypasta/), [freedesignmd — shadcn trap](https://freedesignmd.com/blog/shadcn-looks-generic).

---

## 2. Cor & tipografia de bom gosto

### Cor
- **60-30-10**: ~60% neutro dominante, 30% secundário, 10% **um** acento. O dominante quase sempre é neutro → site calmo, não barulhento. — [Wix](https://www.wix.com/wixel/resources/60-30-10-color-rule), [WPMayor](https://wpmayor.com/the-60-30-10-rule-made-our-website-designs-infinitely-better/)
- **~10 shades por cor** (8–10 cinzas + shades de cada cor) pra ter o passo exato sem `lighten()`/`darken()` ad hoc. — [Refactoring UI](https://refactoringui.com/previews/building-your-color-palette/)
- **Cinzas levemente tingidos** (azul = frio, amarelo = quente); cinza 100% neutro fica sem vida. Desenhe **em grayscale primeiro**. — [Refactoring UI (resumo)](https://www.sglavoie.com/posts/book-summary-refactoring-ui/)
- **OKLCH > HSL/hex**: perceptualmente uniforme (passos iguais parecem iguais), corrige a luminosidade quebrada do HSL, gera rampas consistentes variando 1 eixo, e alcança o gamut P3. — [Evil Martians](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl), [Evil Martians (Tailwind)](https://evilmartians.com/chronicles/better-dynamic-themes-in-tailwind-with-oklch-color-magic), [CSS-Tricks](https://css-tricks.com/almanac/functions/o/oklch/)

### Dark mode
- **Nunca #000 puro** — base perto de `#121214`–`#141416` (L ~8–12%, leve dessaturação). — [ColorArchive](https://colorarchive.org/guides/dark-mode-palette-guide/)
- **Elevação por luminosidade**, não sombra: +4–8% de L por camada (base L10 → card L14–16 → modal L18–20). — [ColorArchive](https://colorarchive.org/guides/dark-mode-color-design-guide/)
- **Dessaturar acentos ~15–25%** no escuro; **texto não-branco-puro** (~92–95% L). — [Medium/Tunde](https://medium.com/@tundehercules/designing-effective-dark-mode-interfaces-17f38ecea2e9)

### Contraste / WCAG
- **AA = 4.5:1** (normal), **3:1** (grande ≥24px ou ≥18.66px bold); **AAA = 7:1 / 4.5:1**. — [W3C SC 1.4.3](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)
- **Armadilha do cinza "elegante"**: `#999/#aaa` reprovam AA no branco; o cinza mais claro que passa é ~`#767676`. Para não ficar "lavado", suba **peso/tamanho** em vez de clarear a cor. — [WebAIM](https://webaim.org/articles/contrast/), [TestParty](https://testparty.ai/blog/color-contrast-requirements)

### Tipografia
- **Escala modular** (escolha 1 ratio e seja consistente): 1.2/1.25 (UI densa), 1.333/1.5+ (editorial). — [A List Apart](https://alistapart.com/article/more-meaningful-typography/)
- **Line-height** body ~1.4–1.6 (1.5 seguro); display apertado 1.05–1.2. **Measure** 45–75 caracteres (`max-width: 65ch`). — [A List Apart](https://alistapart.com/article/more-meaningful-typography/)
- **Tracking**: não trackear demais fontes boas; só apertar display (−0.01 a −0.02em) e abrir all-caps/eyebrows (+0.05 a +0.1em). — [Smashing](https://www.smashingmagazine.com/2020/07/css-techniques-legibility/)
- **Variable fonts** + `font-optical-sizing: auto` (glifos adaptam ao tamanho, como o SF da Apple). — [web.dev](https://web.dev/articles/variable-fonts), [Pixelambacht](https://pixelambacht.nl/2021/optical-size-hidden-superpower/), [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/typography)
- **Fugir do "Inter em tudo"**: Geist, General Sans, Satoshi, Manrope, Instrument Sans. Luxo = serifa display de alto contraste sobre grotesk (ex.: Editorial New / Fraunces sobre Neue Montreal). Rota segura: superfamília (IBM Plex Sans+Serif). — [Pangram Pangram](https://pangrampangram.com/blogs/journal/best-font-pairings-2025), [Shakuro](https://shakuro.com/blog/best-fonts-for-web-design)
- **Onde buscar paletas**: Coolors, Adobe Color, Huemint, Khroma; sistemas: Open Color/ColorKit; checagem: Stark/WebAIM. — [Muzli](https://muz.li/blog/best-color-palette-tools-and-generators-for-designers-2026/)

---

## 3. O que faz "feel premium" (benchmarks)

Fonte-ouro: [emilkowalski/skills SKILL.md](https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md), [Rauno Freiberg](https://rauno.me/craft/interaction-design), [Refactoring UI](https://medium.com/refactoring-ui/7-practical-tips-for-cheating-at-design-40c736799886), [Vercel Geist](https://vercel.com/geist/introduction).

- **Movimento é física honesta e curto.** Ease-out forte, <300ms, só `transform`/`opacity`, origin-aware, interruptível, velocity-aware, reduced-motion safe. Animação reconhece intenção; não performa.
- **Profundidade implícita**: sombra com **offset vertical** (não blur/spread), borda 1px + highlight, elevação em tokens. — [Refactoring UI](https://medium.com/refactoring-ui/7-practical-tips-for-cheating-at-design-40c736799886), [Elevation patterns](https://designsystems.surf/articles/depth-with-purpose-how-elevation-adds-realism-and-hierarchy)
- **Cor como pontuação**: sistemas premium rodam quase só em neutros; acento é exceção. Hierarquia de ação explícita (primário sólido, secundário outline, terciário link). — [Vercel Geist](https://vercel.com/geist/introduction)
- **Whitespace generoso** ("mais do que você acha"); comece largo e apare. — [Refactoring UI](https://medium.com/refactoring-ui/7-practical-tips-for-cheating-at-design-40c736799886)
- **Tipografia como elemento gráfico**: display grande, kerning óptico, "cor tipográfica" consistente — o tell de estúdio vs template. — [Figma kerning](https://www.figma.com/resource-library/what-is-kerning/), [Geist Pixel](https://vercel.com/blog/introducing-geist-pixel)
- **Assinaturas com disciplina de performance**: o gradiente do Stripe é **WebGL** (~10kb), com ScrollObserver que desliga render fora da tela. Awwwards: Three.js/WebGPU + GSAP scroll, mas **usabilidade = 30% da nota**. — [Stripe gradient](https://dev.to/jordienr/how-to-make-animated-gradients-like-stripe-56nh), [Awwwards critérios](https://www.utsubo.com/blog/award-winning-website-design-guide)
- **Velocidade É polish**: Linear ("responsiveness above all else", local-first); grão/noise sobre flat remove o look "plástico". — [Linear redesign](https://linear.app/now/how-we-redesigned-the-linear-ui)

---

## 4. Liquid Glass / glassmorphism do jeito certo

Fonte de verdade: [Apple — Meet Liquid Glass (WWDC25)](https://developer.apple.com/videos/play/wwdc2025/219/).

### Princípios da Apple (o "porquê")
- É um **meta-material que refrata luz** ("lensing"), não um blur gaussiano fixo. A refração nas **bordas** é o tell premium.
- **Vidro pertence à camada de navegação** (toolbars, tabs, sidebars, popovers) — **nunca** na camada de conteúdo.
- **Nunca vidro-sobre-vidro.** Pra elementos por cima, use "fills, transparency, vibrancy".
- **Sombra adaptativa carrega a legibilidade** (aumenta sobre texto, diminui sobre fundo claro).
- **Maior = mais grosso**: escale blur e sombra com o tamanho do elemento (não um blur fixo em tudo).
- **Variantes Regular (default, adaptativa) vs Clear** (mais transparente, exige camada de dimming embaixo).
- **Tint seletivo** (só ação primária). **A11y**: honrar `prefers-reduced-transparency`, `prefers-contrast`, `prefers-reduced-motion`.

### A receita CSS (4 propriedades — faltar uma = fica barato)
1. `background` translúcido · 2. `backdrop-filter: blur() saturate(180%)` (o **`saturate()` é o ingrediente secreto** que quase todo tutorial pula; **sempre** com `-webkit-` pra Safari <17) · 3. **borda = topo iluminado + base escura** (border-image gradiente, não anel uniforme) · 4. `box-shadow` multicamada (highlight inset no topo + rim + drop shadow externo).
Mais: **fundo atrás precisa ter contraste** (foto/gradiente, nunca chapado); **noise/grão** pra matar banding; **scrim sob o texto** pra garantir 4.5:1 num fundo que se move.
Fontes: [ToolboxHubs](https://toolboxhubs.com/en/blog/css-glassmorphism-guide), [WebKit](https://webkit.org/blog/3632/introducing-backdrop-filters/), [NN/g](https://www.nngroup.com/articles/glassmorphism/), [Axess Lab](https://axesslab.com/glassmorphism-meets-accessibility-can-frosted-glass-be-inclusive/).

### O detalhe que quase todos erram (Josh Comeau)
`backdrop-filter` só borra os pixels **diretamente atrás** do elemento — vidro real também pega luz da vizinhança. **Fix**: superdimensione o elemento que borra e recorte de volta com `mask` (em Chrome, overflow corta *antes* dos filtros; mask corta *depois*). — [Josh Comeau](https://www.joshwcomeau.com/css/backdrop-filter/). Suporte de `backdrop-filter` ~97%; use `@supports`.

### Refração de verdade (enhancement só-Chromium)
`feDisplacementMap` (warp por canais de cor; **128 = neutro**) + mapa de deslocamento gerado (0→1 R horizontal, 0→1 B vertical) + 3 passes pra aberração cromática. `backdrop-filter: url(#filtro)` **não funciona em Safari/Firefox** → fallback `blur()`. Filtro no mesmo documento, `id` único, cuidado com elementos >800px (jank). — [kube.io](https://kube.io/blog/liquid-glass-css-svg/), [rizroze/liquid-glass](https://github.com/rizroze/liquid-glass) *(params como `scale:-180` — ajustar antes de usar)*.

### Performance
`backdrop-filter` força camada de compositing e passes extras → **limite a quantidade** de elementos com vidro, `will-change` só onde anima. — [OpenReplay](https://blog.openreplay.com/creating-blurred-backgrounds-css-backdrop-filter/), [WebKit](https://webkit.org/blog/3632/introducing-backdrop-filters/)

---

## 5. Motion premium (com Framer Motion / `motion`)

Fonte-ouro: [emilkowalski/skills SKILL.md](https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md) + [docs do Motion](https://motion.dev/docs/react-scroll-animations).

### Easing (decisão)
- Entrar/sair → **ease-out forte** `cubic-bezier(0.23, 1, 0.32, 1)` (move rápido e desacelera = responsivo). **Nunca `ease-in`** em entrada de UI.
- Mover/morphar na tela → **ease-in-out** `cubic-bezier(0.77, 0, 0.175, 1)`. Drawer iOS → `cubic-bezier(0.32, 0.72, 0, 1)`. Constante (marquee/progress) → `linear`.
- Evite os keywords nativos (`ease`/`ease-out`) — são fracos demais. — [Motion easing](https://motion.dev/docs/easing-functions)

### Spring vs bezier
- **Spring** pra interação/gesto/layout (herda velocidade → handoff natural). **Bezier** pra UI discreta e cronometrada. Spring estilo Apple: `{ type:"spring", duration:0.5, bounce:0.2 }`; bounce subtil **0.1–0.3** (quase nada em UI). — [Motion transitions](https://motion.dev/docs/react-transitions), [Maxime Heckel](https://blog.maximeheckel.com/posts/the-physics-behind-spring-animations/)

### Durações
- Botão 100–160ms · tooltip 125–200ms · dropdown 150–250ms · modal/drawer 200–500ms. **<300ms** na maioria. **Saída mais rápida que entrada** (~200ms ease-out). Stagger **30–80ms** por item.

### Scroll
- **One-shot** (revelar): `whileInView` + `viewport={{ once:true, amount:0.3 }}` (mais performático). **Contínuo** (parallax/progress): `useScroll` + `useTransform`, com `offset:["start end","end start"]`.
- **CSS scroll-driven nativo** (`animation-timeline: view()/scroll()`, `animation-range`) roda no compositor (60fps) — mas **só Chromium**; gate com `@supports`. — [Chrome](https://developer.chrome.com/docs/css-ui/scroll-driven-animations), [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)

### View Transitions API
- **Same-document** virou **Baseline** (Chrome 111+, Safari 18+, Firefox 133+): `document.startViewTransition()`; nomear elemento com `view-transition-name` morfa entre estados. **Cross-document (MPA)**: `@view-transition { navigation: auto; }` (ainda não no Firefox). Use VT pra troca de página/rota; Framer Motion pra gesto/spring/`layoutId`. — [Chrome 2025](https://developer.chrome.com/blog/view-transitions-in-2025), [web.dev baseline](https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available)

### Efeitos assinatura (com gosto)
- **Text reveal** por `clip-path: inset(0 100% 0 0)` → `inset(0)` + stagger por palavra/linha. **Magnetic button** e **cursor spotlight** animando só `transform`/`opacity`. **Shared element** via `layoutId` (FLIP). **Popover origin-aware** (`transform-origin` no trigger); nunca `scale(0)` → comece em `scale(0.95)`.

### Performance / a11y
- Só `transform` + `opacity` (GPU, sem reflow). **Cuidado**: em Framer, os shorthands `x`/`y`/`scale` **não** são acelerados — anime a string `transform` completa pra perf máxima. `will-change` só onde observar jank.
- `prefers-reduced-motion`: **mantenha fades, corte movimento**; em React use `useReducedMotion()`. Regra de frequência: ação 100+×/dia → sem animação; rara → espaço pra encanto. **80/20**: 80% estático.

---

## 6. Saída acionável

### ✅ DO / ❌ DON'T
**DO:** cor própria (OKLCH, acento só em CTA) · fonte com voz + tracking/measure controlados · neutros dominantes, cor como pontuação · whitespace generoso · profundidade por sombra com offset + 1px border · vidro só na camada de navegação, com saturate+scrim+noise · ease-out forte <300ms, só transform/opacity · conteúdo real (foto/copy/métricas) · 80% estático · honrar reduced-motion/contrast/transparency.

**DON'T:** roxo/índigo default · Inter+tokens shadcn crus · blobs borrados decorativos · gradient text em tudo · hero centralizado + 3 cards-emoji · bento/glass/animação em tudo · simetria sem vida · stock/blobs no lugar de arte · métricas e nomes fake · `ease-in` em entradas · animar width/height/top/left · `scale(0)`.

### 🎨 Ponto de partida de design system (ajustar à marca)
```css
/* Cor — defina em OKLCH. Escolha UM hue de acento que NÃO seja índigo. */
:root {
  /* Light */
  --bg:        oklch(0.99 0.005 250);  /* neutro dominante (60%) */
  --surface:   oklch(0.96 0.008 250);  /* secundário (30%)       */
  --text:      oklch(0.20 0.01 250);
  --text-muted:oklch(0.55 0.01 250);   /* ~#767676, passa AA      */
  --accent:    oklch(0.62 0.18 30);    /* 10% — ex.: laranja/terракота, troque o H */
  /* rampa neutra: 10 passos, H fixo ~250, L de 0.99→0.15, +C no escuro */
}
.dark {
  --bg:        oklch(0.17 0.01 250);   /* nunca #000 */
  --surface:   oklch(0.21 0.01 250);   /* +~0.04 L por camada */
  --text:      oklch(0.93 0.005 250);  /* não branco puro */
  --text-muted:oklch(0.72 0.01 250);
  --accent:    oklch(0.70 0.14 30);    /* -20% croma, +L no escuro */
}

/* Tipografia — 1 ratio. Editorial: base 18px, 1.333 → 18/24/32/43/57/76 */
/* Fonte: trocar Inter por Geist/General Sans/Satoshi; serifa display p/ luxo. */
html { font-optical-sizing: auto; }
body { line-height: 1.5; }            /* display: 1.05–1.15 */
.prose { max-width: 65ch; }           /* measure 45–75 */
h1,h2 { letter-spacing: -0.02em; }
.eyebrow { letter-spacing: 0.08em; text-transform: uppercase; }

/* Motion tokens */
:root {
  --ease-out:    cubic-bezier(0.23, 1, 0.32, 1);   /* entrar/sair */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* mover na tela */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);   /* sheet iOS */
  --dur-fast: 140ms; --dur: 220ms; --dur-slow: 320ms;
}

/* Elevação por sombra com offset vertical (não blur/spread) */
--shadow-1: 0 1px 2px rgb(0 0 0 / 0.06), 0 1px 1px rgb(0 0 0 / 0.08);
--shadow-2: 0 4px 8px rgb(0 0 0 / 0.08), 0 2px 4px rgb(0 0 0 / 0.06);
```

```js
// motion-tokens.js (Framer Motion)
export const EASE_OUT    = [0.23, 1, 0.32, 1];
export const EASE_IN_OUT = [0.77, 0, 0.175, 1];
export const SPRING_UI   = { type: "spring", duration: 0.5, bounce: 0.2 };
// stagger 0.06 · whileInView once · transform-string p/ perf · useReducedMotion guard
```

### 🧪 Snippets de referência
Vidro premium, refração opcional, parallax, reveal com stagger, reduced-motion, scroll-driven CSS e View Transitions:
ver os exemplos completos nas seções 4 e 5 acima (todos com fonte citada).

---

## Fontes principais
- **Anti-IA:** [taste-skill](https://github.com/Leonxlnx/taste-skill/blob/main/skills/imagegen-frontend-web/SKILL.md) · [DEV/Alan West](https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p) · [Trilogy AI](https://trilogyai.substack.com/p/fixing-visual-ai-slop) · [RedMonk](https://redmonk.com/kholterhoff/2025/04/22/ui-component-libraries-shadcn-ui-and-the-revenge-of-copypasta/)
- **Cor/tipografia:** [Refactoring UI](https://refactoringui.com/previews/building-your-color-palette/) · [Evil Martians OKLCH](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl) · [A List Apart](https://alistapart.com/article/more-meaningful-typography/) · [web.dev variable fonts](https://web.dev/articles/variable-fonts) · [W3C contrast](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)
- **Premium:** [emilkowalski/skills](https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md) · [Rauno](https://rauno.me/craft/interaction-design) · [Vercel Geist](https://vercel.com/geist/introduction) · [Stripe gradient](https://dev.to/jordienr/how-to-make-animated-gradients-like-stripe-56nh)
- **Liquid glass:** [Apple WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/) · [Josh Comeau](https://www.joshwcomeau.com/css/backdrop-filter/) · [NN/g](https://www.nngroup.com/articles/glassmorphism/) · [Axess Lab](https://axesslab.com/glassmorphism-meets-accessibility-can-frosted-glass-be-inclusive/) · [rizroze](https://github.com/rizroze/liquid-glass)
- **Motion:** [Motion docs](https://motion.dev/docs/react-scroll-animations) · [Chrome scroll-driven](https://developer.chrome.com/docs/css-ui/scroll-driven-animations) · [Chrome View Transitions 2025](https://developer.chrome.com/blog/view-transitions-in-2025) · [web.dev animations](https://web.dev/articles/animations-guide)
