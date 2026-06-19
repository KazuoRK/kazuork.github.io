# Catálogo de Construção — Estilos, Animação e Imagens

> Receitas em código para construir visuais modernos de verdade. Cada item: o que é, o que funciona vs. o que tem
> "cara de IA/barato", e o snippet copiável. Pesquisa multi-fonte (2025–2026); citações por item.
> Regra transversal: **animar só `transform`/`opacity`, guardar tudo atrás de `prefers-reduced-motion`, restraint > espetáculo.**

---

## 0. Quais SKILLS usar (e quando)

| Skill | Para quê | Como obter |
|---|---|---|
| **ui-ux-pro-max** (instalada) | Sistema de design baseado em dados (paletas, fontes, estilos, regras de UX). Rodar `--design-system` antes de desenhar. | já em `.claude/skills/` |
| **taste-skill** (Leonxlnx) | Catálogo exaustivo de "AI tells" → alternativa de bom gosto. Usar como checklist anti-IA. | `github.com/Leonxlnx/taste-skill` |
| **emil-design-eng** (emilkowalski/skills) | Craft de motion/animação (curvas, durações, física). A fonte-ouro de micro-interações. | `github.com/emilkowalski/skills` |
| **gsap-scrolltrigger** (greensock/gsap-skills) | Pin/scrub/scrollytelling/horizontal scroll com GSAP. | `github.com/greensock/gsap-skills` |
| **anthropics/skills → brand-guidelines** | Hex oficiais da marca Anthropic (ignorar as fontes de Office). | `github.com/anthropics/skills` |

Fluxo recomendado: **(1)** rodar `ui-ux-pro-max --design-system` → **(2)** validar contra `taste-skill` (anti-IA) → **(3)** motion via `emil-design-eng`/`gsap` → **(4)** se for sobre o Claude, aplicar `CLAUDE-BRAND.md`.

---

## 1. Master DO / DON'T — os "tells" de IA

Tese: **IA faz média.** Sem direção devolve o centro estatístico: roxo `indigo-500`, Inter, hero centralizado, 3 cards.

| ❌ Tell de IA | ✅ Alternativa |
|---|---|
| Acento roxo/índigo | Cor própria em **OKLCH**, acento só no CTA |
| Blobs/orbs borrados no fundo | Wash tonal dessaturado atrás de **conteúdo real** + grão |
| Gradient text em todo heading | Contraste de peso/escala; gradiente em 1 momento |
| Inter + tokens shadcn crus | Fonte com voz + re-tematizar raio/sombra/escala |
| Hero centralizado + subtítulo + 2 botões | Hero editorial/assimétrico ou liderado por imagem |
| 3 cards com emoji | Variar ambição por seção; SVG icon set único |
| Glass/animação/bento em tudo | Tudo **seletivo** e justificado (regra 80/20) |
| Simetria sem vida | Offset editorial + 1 momento de "segunda leitura" |
| Stock/AI de pessoas, métricas/nomes fake | Foto art-directed, UI real, copy/dados verdadeiros |

Fontes: [DEV/Alan West (indigo-500)](https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p), [taste-skill](https://github.com/Leonxlnx/taste-skill/blob/main/skills/imagegen-frontend-web/SKILL.md), [Trilogy AI](https://trilogyai.substack.com/p/fixing-visual-ai-slop).

---

## 2. CATÁLOGO DE ESTILOS

Regra universal de todos: **uma fonte de luz consistente** (topo/topo-esq.), sombras **tingidas** (não preto puro), nunca remover affordances reais (focus ring, texto ≥4.5:1). Sombras realistas = camadas múltiplas tingidas para o fundo ([Josh Comeau](https://www.joshwcomeau.com/css/designing-shadows/)).

### 2.1 Liquid Glass / Glassmorphism
Refração nas **bordas** (não só blur). 4 props: `background` translúcido + `backdrop-filter: blur() saturate(180%)` (sempre com `-webkit-`) + borda topo-claro/base-escuro + `box-shadow` multicamada. Fundo atrás precisa de contraste; **scrim sob texto**; **noise** contra banding; **nunca vidro-sobre-vidro**; vidro só na camada de navegação.
```css
.glass{
  background: hsl(0 0% 100% / .10);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
          backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid transparent;
  border-image: linear-gradient(135deg,rgba(255,255,255,.6),rgba(255,255,255,0) 60%) 1;
  border-radius: 24px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.55), inset 0 -1px 0 rgba(0,0,0,.15), 0 8px 32px rgba(0,0,0,.22);
}
@media (prefers-reduced-transparency: reduce){ .glass{ backdrop-filter:none; background:rgba(30,30,40,.92);} }
```
Refração real (Chromium-only, enhancement): `feDisplacementMap` (128=neutro) + 3 passes p/ aberração cromática; fallback `blur()`. O truque do Josh Comeau: superdimensionar + `mask` p/ pegar luz da vizinhança.
Fontes: [Apple WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/), [Josh Comeau](https://www.joshwcomeau.com/css/backdrop-filter/), [NN/g](https://www.nngroup.com/articles/glassmorphism/), [rizroze](https://github.com/rizroze/liquid-glass).

### 2.2 Neumorphism (soft UI)
Duas sombras opostas derivadas de **um** bg (claro topo-esq / escuro baixo-dir), blur ≈ 2× offset, bg do elemento = bg do container. Só p/ acentos (toggles/knobs). **A11y crítica:** bordas implícitas = baixo contraste; adicionar focus real + texto ≥4.5:1.
```css
.neu{background:#e0e5ec;border-radius:18px;
  box-shadow:8px 8px 16px #a3b1c6,-8px -8px 16px #fff;}
.neu:active{box-shadow:inset 6px 6px 12px #a3b1c6,inset -6px -6px 12px #fff;}
```
Fontes: [css-tricks](https://css-tricks.com/neumorphism-and-css/), [a11y](https://medium.com/@xurxe/accessible-neumorphism-soft-ui-992286900bfa).

### 2.3 Claymorphism
Raio **grande** (~48px) + 1 drop shadow colorido + 2 insets (highlight topo-esq, emboss baixo-dir). Pastéis brilhantes (escuro mata o drop). Playful/edu.
```css
.clay{background:#e3f2ff;border-radius:48px;padding:2rem;color:#1e3a5f;
  box-shadow:18px 18px 40px rgba(70,130,200,.20),
    inset -10px -10px 24px rgba(255,255,255,.55),
    inset 10px 10px 24px rgba(70,130,200,.18);}
.clay:hover{transform:translateY(-4px) rotate(-1deg);}
```
Fontes: [hype4.academy](https://hype4.academy/articles/coding/how-to-create-claymorphism-using-css), [clay.css](https://github.com/codeAdrian/clay.css).

### 2.4 Skeuomorphism (soft/realista)
Gradiente 3-stops (claro no topo, ~15% spread) + **4 sombras** (2 outer contato+ambiente, 2 inset bevel+sombra) + noise `fractalNoise` 0.04–0.06 + texto embossed. Tons de material quentes. Controles de hardware/momentos premium. Descendente moderno = Liquid Glass.
Fontes: [superdesign.dev](https://www.superdesign.dev/styles/skeuomorphism), [uiverse](https://uiverse.io/blog/the-rise-of-skeumorphic-minimalism-ui-designs-unexpected-comeback-in-2025).

### 2.5 Neo-brutalism
**Um** token de sombra dura (`4px 4px 0 0 #000`, blur 0), borda preta única (2–3px), cores chapadas, grotesk. "Push-down" no `:active`. Vive de disciplina (1 sombra, 1 borda, paleta controlada).
```css
.nb-btn{background:#facc15;border:2px solid #000;border-radius:5px;box-shadow:4px 4px 0 0 #000;
  font-weight:700;padding:.75rem 1.5rem;transition:transform .08s,box-shadow .08s;}
.nb-btn:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 0 #000;}
.nb-btn:active{transform:translate(4px,4px);box-shadow:0 0 0 0 #000;}
```
Fontes: [neobrutalism.dev](https://www.neobrutalism.dev/), [Toptal](https://www.toptal.com/designers/ux/minimalist-brutalist-web-design).

### 2.6 Swiss / Editorial
Grid rígido (12 col), escala modular (1.333), `clamp()` fluido, tracking negativo em display, baseline rhythm (espaços múltiplos de 1 unidade), paleta tinta+papel+1 acento. Assimetria com tensão.
```css
.hero{display:grid;grid-template-columns:repeat(12,1fr);gap:clamp(1rem,2vw,1.5rem);max-width:80rem;margin-inline:auto;}
.hero__title{grid-column:1/9;font-size:clamp(2.5rem,1.5rem+5vw,6rem);font-weight:800;line-height:.95;letter-spacing:-.03em;}
.hero__lead{grid-column:9/13;align-self:end;}
```
Fontes: [Wikipedia ITS](https://en.wikipedia.org/wiki/International_Typographic_Style), [W3C CSS Rhythm](https://www.w3.org/TR/css-rhythm-1/).

### 2.7 Minimalismo / Monocromático
Base **neutra quente** (sand/stone, não branco clínico), 1 acento só p/ interação, whitespace grande, microtipografia (tracking, line-height, measure ~65ch), 1 micro-interação (underline que cresce). *Minimalismo = redução; Swiss = sistema.*
Fontes: [Design Shack](https://designshack.net/articles/trends/design-minimalism/), [bave](https://bavedesigns.com/top-minimalist-web-design-trends-in-2025/).

### 2.8 Cor & gradientes (color-field)
- **Aurora/mesh CSS:** stack de `radial-gradient` com falloff gradual (`transparent 50–55%`) + alfas diferentes; versão animada = blobs com `filter:blur(80px)` no wrapper, `mix-blend-mode:screen`, durações **diferentes** (sem sincronia). **Sempre adicionar grão.**
- **Stripe-way (WebGL):** lib `whatamesh`/minigl (~10kb), cores dessaturadas, `pause()` via IntersectionObserver + reduced-motion.
- **Grão (o maior upgrade):** SVG `feTurbulence type=fractalNoise baseFrequency .65 numOctaves 3`, opacidade **0.03–0.12**, `mix-blend-mode:overlay`.
- **Gradient border animado:** `@property --angle{syntax:"<angle>"}` + `conic-gradient(from var(--angle),…)` + `mask-composite:exclude`.
```css
.grain::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.08;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
```
Fontes: [css-tricks grainy gradients](https://css-tricks.com/grainy-gradients/), [whatamesh](https://github.com/jordienr/whatamesh), [web.dev conic border](https://web.dev/articles/conic-gradient-border).

### 2.9 Expressivos (retrô)
Cada um vive de **layering** (não 1 declaração chapada):
- **Neon/cyberpunk:** base off-black `#0a0a0f` + `text-shadow` empilhado (core branco 2–6px → bloom 48–80px) na cor do acento; glitch só no hover; restraint.
- **Vaporwave/synthwave:** grade em perspectiva (`perspective(280px) rotateX(60deg)` + `mask` fade) + sol com slats + chrome text.
- **Y2K:** gel glossy (rim→face→sheen), holográfico (`conic-gradient` animado), 1 sparkle.
- **Memphis:** formas chapadas (sem sombra/gradiente), paleta 3–4 + preto, respeitando grid de conteúdo.
- **Maximalismo:** caos sobre grid invisível, serif↔sans, 1 palavra dominante, rotações <8°.
- **Pixel/8-bit:** `image-rendering:pixelated`, box-shadow em degraus de 4px, fonte pixel só em títulos.
Fontes: [theosoti grid](https://theosoti.com/short/moving-grid/), [MDN image-rendering](https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering).

### 2.10 3D / WebGL (escada de custo)
**CSS tilt/parallax (grátis) → shader plane (1 draw call) → Spline (1–4MB) → R3F (~150KB+modelo) → R3F scroll (mais caro).** Só usar 3D se melhora entendimento/conversão. Sempre: lazy-load, pausar off-screen (`frameloop`), DPR `[1,2]`, poster fallback, reduced-motion.
```css
/* 3D tilt card — pointer math via CSS var, transform only */
.tilt{transform-style:preserve-3d;transition:transform .25s cubic-bezier(.22,1,.36,1);
  transform:perspective(800px) rotateX(var(--rx,0)) rotateY(var(--ry,0));will-change:transform;}
.tilt .depth{transform:translateZ(40px);}
@media (prefers-reduced-motion:reduce),(hover:none){.tilt{transform:none;}}
```
Fontes: [r3f docs](https://r3f.docs.pmnd.rs/), [keithclark parallax](https://keithclark.co.uk/articles/pure-css-parallax-websites/), [thebookofshaders](https://thebookofshaders.com/).

---

## 3. CATÁLOGO DE ANIMAÇÃO

### Tokens de motion (a base)
```js
export const EASE_OUT    = [0.23, 1, 0.32, 1];   // entrar/sair (forte)
export const EASE_IN_OUT = [0.77, 0, 0.175, 1];  // mover na tela
export const EASE_DRAWER = [0.32, 0.72, 0, 1];   // sheet iOS
export const SPRING_UI   = { type:"spring", duration:0.5, bounce:0.2 };
// durações: botão 100–160 · tooltip 125–200 · dropdown 150–250 · modal 200–500 · <300 na maioria
// stagger 30–80ms · saída mais rápida que entrada · nunca ease-in em entrada
```
Em Framer, `x/y/scale` **não** são acelerados — anime a string `transform` p/ perf máxima. Fonte: [emil-design-eng](https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md).

### 3 abordagens de scroll (quando usar cada)
- **CSS scroll-driven nativo** (`animation-timeline: view()/scroll()`, `animation-range`): reveals/parallax/progress; off-main-thread; **Chromium** (gate `@supports`). NÃO é auto-desligado por reduced-motion — gate você mesmo.
- **GSAP ScrollTrigger:** pin/scrub/snap/horizontal/scrollytelling (padrão pro). `ease:"none"` no horizontal. `gsap.matchMedia()` p/ reduced-motion.
- **Framer Motion:** React — `whileInView` (reveal once) e `useScroll`+`useTransform` (parallax/progress).
**Anti-padrão cardeal: scroll-jacking** (sequestrar o ritmo do scroll). Pin ≠ jacking se 1 scroll = 1 progresso.

### O que FUNCIONA vs NÃO
- **Reveal:** sutil (8–24px), rápido (200–500ms), **once**, dispara um pouco antes de entrar. ❌ slides 100px+, 1s+, re-esconder, stagger de 30 itens.
- **Parallax:** bg ~10–30% mais lento, deslocamento pequeno (±15%), transform-only, off no reduced-motion. ❌ offsets grandes, parallax em texto → enjoo.
- **Text reveal/split:** stagger por linha/palavra (40–80ms) com `clip-path`/mask `y:110%→0`. ❌ char em parágrafos longos. A11y: `aria-label` no todo, `aria-hidden` nos spans.
- **Magnetic button:** pull 0.2–0.35× capado, spring, só no CTA. ❌ em todo botão.
- **Custom cursor:** dot lerp que **acompanha** o nativo, ou spotlight decorativo. ❌ `cursor:none` + blob laggy.
- **Particle/constellation:** é **o** tell de IA — só 1 hero atmosférico, baixa densidade. ❌ em toda seção.
- **Lottie:** só p/ motion complexo multi-layer; ❌ p/ 1 ícone (use CSS/SVG).

### Snippets-chave
```jsx
// Reveal once + stagger (Framer)
const container={hidden:{},show:{transition:{staggerChildren:.08}}};
const item={hidden:{opacity:0,y:20},show:{opacity:1,y:0,transition:{duration:.4,ease:[0.23,1,0.32,1]}}};
<motion.ul variants={container} initial="hidden" whileInView="show"
  viewport={{once:true,amount:.2,margin:"0px 0px -10% 0px"}}>…</motion.ul>
```
```css
/* Reveal nativo CSS (zero JS, off-main-thread) */
@supports (animation-timeline:view()){@media (prefers-reduced-motion:no-preference){
  .reveal{animation:reveal-in ease-out both;animation-timeline:view();animation-range:entry 10% cover 40%;}
  @keyframes reveal-in{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}}}
```
```css
/* Barra de progresso de scroll (nativa) */
@supports (animation-timeline:scroll()){
  .progress{animation:grow linear both;animation-timeline:scroll(root block);transform-origin:0 50%;}
  @keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}}
```
```css
/* Marquee infinito pausável: duplicar conteúdo, transladar -50% (menos meia-gap) */
.track{display:flex;gap:30px;width:max-content;animation:scroll 18s linear infinite;}
@keyframes scroll{to{transform:translateX(calc(-50% - 15px))}}
.marquee:hover .track{animation-play-state:paused;}
```
Fontes: [motion.dev scroll](https://motion.dev/docs/react-scroll-animations), [Chrome scroll-driven](https://developer.chrome.com/docs/css-ui/scroll-driven-animations), [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [Ryan Mulligan marquee](https://ryanmulligan.dev/blog/css-marquee/).

### View Transitions API
Same-document agora **Baseline** (`document.startViewTransition()`, `view-transition-name`). Cross-document MPA: `@view-transition{navigation:auto;}` (ainda não Firefox). VT p/ troca de página; Framer p/ gesto/spring/`layoutId`.
Fontes: [Chrome VT 2025](https://developer.chrome.com/blog/view-transitions-in-2025).

---

## 4. CATÁLOGO DE IMAGENS

A IA moveu a régua: stock genérico e "AI slop" agora leem igual = baixo esforço. Premium = **evidência de direção de arte humana**.

| ❌ Não funciona | Tell | ✅ Funciona |
|---|---|---|
| Stock genérico (sorrindo no laptop) | poderia ser de qualquer marca | foto autêntica/art-directed do time/produto real |
| IA de pessoas/cenas | pele plástica, mãos tortas, glow Midjourney, geometria impossível | foto real; IA só p/ textura abstrata (dessaturada+grão+crop) |
| Blobs 3D/renders genéricos | default Spline/Blobmaker | 3D/ilustração custom com identidade de marca |
| Emoji como ícone | inconsistente entre plataformas | **um** SVG set (Lucide/Phosphor) — nunca misturar libs |
| Fotos cruas mistas | ad-hoc/stock-grab | tratamento unificador (grade/duotone/grão), crops generosos |
| — | — | **screenshots reais de UI** em device/browser frame, angulados, @2x–3x |

**Composição:** scrim sob texto (gradiente direcional), `object-fit:cover`+`object-position`, `<picture media>` p/ re-crop mobile (não só encolher).
**Técnico:** AVIF→WebP→JPEG via `<picture>`; `srcset`/`sizes`; **1** LCP com `fetchpriority="high"` eager, resto `loading="lazy"`; `width/height`/`aspect-ratio` sempre (CLS=0); LQIP blur-up.
```html
<img src="hero-1920.jpg" srcset="hero-1280.jpg 1280w, hero-1920.jpg 1920w" sizes="100vw"
  width="1920" height="1080" alt="…" fetchpriority="high" loading="eager" decoding="async"
  style="width:100%;height:auto;object-fit:cover">
```
```css
.hero__scrim{position:absolute;inset:0;z-index:1;pointer-events:none;
  background:linear-gradient(105deg,rgba(0,0,0,.72),rgba(0,0,0,.45) 40%,rgba(0,0,0,.05));}
```
Fontes: [Smashing text-over-image](https://www.smashingmagazine.com/2023/08/designing-accessible-text-over-images-part1/), [AVIF/WebP/JPEG](https://blog.freeimages.com/post/webp-vs-jpeg-vs-avif-best-format-for-web-photos), [Lucide vs Phosphor](https://www.pkgpulse.com/guides/lucide-vs-heroicons-vs-phosphor-react-icon-libraries-2026), [Screenhance](https://screenhance.com/blog/saas-landing-page-screenshots).

---

## 5. Checklist final (antes de entregar)
- [ ] Cor própria (sem roxo default), acento racionado, OKLCH, dark sem `#000`.
- [ ] Fonte com voz (não Inter cru); tracking/measure controlados; serifa editorial onde fizer sentido.
- [ ] Profundidade por sombra com offset (não glow); vidro/3D/animação seletivos.
- [ ] Motion: ease-out forte <300ms, só transform/opacity, reduced-motion em tudo.
- [ ] Imagens reais/tratadas; 1 LCP priorizado; CLS=0; SVG icon set único.
- [ ] `npm run build` passa; testado em 375px e 1280px.
