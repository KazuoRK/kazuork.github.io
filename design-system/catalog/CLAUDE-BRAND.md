# Identidade Visual do Claude — guia para "desenhar como Claude"

> Regra-mãe deste repositório: **qualquer página sobre o Claude deve parecer o Claude.**
> Nada de "dark SaaS roxo" genérico. A identidade da Anthropic/Claude é quente, humana, editorial, calma — papel, não tela fria.
> Pesquisa com fontes citadas; valores centrais corroborados em múltiplas fontes.

## Fato importante
O rebrand de 2024 da Anthropic foi feito pelo estúdio **Geist** (Portland) — *não* COLLINS.
Fontes: [geist.co/work/anthropic](https://geist.co/work/anthropic), [type.today](https://type.today/en/journal/anthropic).

## Paleta (hex + nomes dos tokens)

**Neutros (a base do site)**
- **Ivory / cream (fundo principal):** `#FAF9F5` — papel, nunca branco-clínico.
- **Light gray / cloud:** `#E8E6DC` — painéis sutis.
- **Kraft (tan quente):** `#D4A27F` — neutro quente.
- **Cloud dark (cinza quente):** `#87867F`.
- **Mid gray:** `#B0AEA5` — texto secundário.
- **Slate (tinta / texto e fundos escuros):** `#141413` — nunca `#000` puro.

**Acento assinatura (o "Claude" coral/clay) — usar com parcimônia**
- **Clay (acento atual):** `#D97757` (também escrito `#DA7756`).
- **Book cloth (terracota clássica, alternativa):** `#CC785C`.

**Acentos de apoio (raros, dessaturados)**
- **Sky (azul):** `#6A9BCC`
- **Olive/cactus (verde):** `#788C5D`
- Família de swatches "print" nomeada: clay, fig, cactus, sky, heather, olive, manilla, kraft.

Tokens vivos do claude.ai: `--bg-000/100/200`, `--text-100`, `--font-styrene-b`.
Fontes: [shadcn.io/design/anthropic](https://www.shadcn.io/design/anthropic), [github.com/anthropics/skills brand-guidelines](https://github.com/anthropics/skills/blob/main/skills/brand-guidelines/SKILL.md), [fontofweb.com/tokens/claude.ai](https://fontofweb.com/tokens/claude.ai).

**Proporção de uso:** ~70% ivory · ~20% slate/neutros · **<10% clay**. O acento é racionado, não espalhado.

## Tipografia
- **Display serif — Copernicus** ("Anthropic Serif"). Logo/headers do claude.ai. Editorial, calmo, confiável.
- **Sans/grotesk — Styrene A/B** ("Anthropic Sans"). Headlines/subheads/UI. Humanista, levemente "synthetic".
- **Body serif — Tiempos Text**. Leitura long-form com cara editorial.
- **Mono — "Anthropic Mono"** (no produto, JetBrains Mono).
- ⚠️ As guidelines de PowerPoint citam Poppins+Lora, mas isso é **fallback de Office**, não o sistema real.

**Fontes reais → alternativas livres (o que vamos usar):**
- Display/serif (Copernicus/Tiempos) → **Fraunces** (variável, com `opsz`), ou Newsreader/Lora.
- UI sans (Styrene) → **General Sans** ou Hanken Grotesk (humanista, levemente squarish).
- Mono → JetBrains Mono / Geist Mono.

Fontes: [type.today](https://type.today/en/journal/anthropic), [fontofweb.com/pin/1469](https://www.fontofweb.com/pin/1469), [beginswithai](https://beginswithai.com/claude-ai-logo-color-codes-fonts-downloadable-assets/).

## Logo / símbolo
- **Anthropic:** wordmark tipográfico; detalhe único = uma **barra/slash** (alusão a código). Sem logo pictórico.
- **Símbolo do Claude ("spark"/sunburst):** estrela/asterisco radial em clay — "ideias irradiando". **Não** é um "C" literal; não recolorir off-brand.
Fontes: [geist.co/work/anthropic](https://geist.co/work/anthropic), [Wikimedia Claude AI symbol](https://commons.wikimedia.org/wiki/File:Claude_AI_symbol.svg), [brandfetch.com/claude.ai](https://brandfetch.com/claude.ai).

## Estética & tom
Quente, humano, paper-like, editorial, mínimo, preciso, calmo, "crafted", anti-trope-tech.
Projetado deliberadamente para **evitar** o look "branco→roxo / Inter-ou-Roboto / vagamente-Linear-vagamente-Stripe" — o que a própria Anthropic chama de clichê de IA.
Motion: contido e suave; o produto parece um chat de mensageiro calmo, sem efeitos chamativos.
Fontes: [anthropic.com/news/claude-design-anthropic-labs](https://www.anthropic.com/news/claude-design-anthropic-labs), [muz.li](https://muz.li/blog/claude-design-one-week-in-hacks-best-practices-tips-from-real-world-use/).

## Tokens drop-in (o que vamos usar no rebuild)
```css
:root {
  /* fundações */
  --ivory:      #FAF9F5;  /* fundo principal */
  --cloud:      #E8E6DC;  /* painéis claros  */
  --kraft:      #D4A27F;  /* tan quente      */
  --cloud-dark: #87867F;  /* cinza quente    */
  --slate:      #141413;  /* tinta / texto   */
  --mid-gray:   #B0AEA5;  /* texto secundário*/
  /* acento (parcimônia) */
  --clay:       #D97757;  /* acento principal */
  --book-cloth: #CC785C;  /* terracota alt    */
  /* apoio (raro) */
  --sky:        #6A9BCC;
  --olive:      #788C5D;
}
```

## DO / DON'T (na régua do Claude)
**DO**
1. Fundo **ivory `#FAF9F5`** com tinta **slate `#141413`** — papel, nunca branco/preto puro.
2. **Um** acento clay `#D97757`, reservado a 1 CTA / destaque / o "spark".
3. **Serifa editorial (Fraunces) pra display + body** + **grotesk humanista (General Sans) pra UI** — essa mistura é a assinatura.
4. Layout mínimo, whitespace generoso, grid/editorial, restraint de impressão, tom calmo.
5. Cores com nomes terrosos/print (clay, kraft, olive, sky) — dessaturadas, nunca neon.
6. Interações **suaves e quietas**: transições gentis, raios pequenos, sem bounce/flash.

**DON'T**
1. ❌ Gradientes roxo/azul→branco (ou →preto) — o clichê de "AI slop" que a Anthropic rejeita.
2. ❌ Inter/Roboto puro, e ❌ tela só-sans (perde a serifa editorial).
3. ❌ Branco/preto frio, dark mode glassy/neon.
4. ❌ Acento saturado demais ou vários acentos berrando ao mesmo tempo.
5. ❌ Chrome techy (glows, motivos holográficos de IA, dashboards SaaS densos).
6. ❌ Renderizar o "spark" como um "C" literal ou recolorir off-brand.

## Fontes-chave
[geist.co/work/anthropic](https://geist.co/work/anthropic) · [type.today](https://type.today/en/journal/anthropic) · [shadcn.io/design/anthropic](https://www.shadcn.io/design/anthropic) · [anthropics/skills brand-guidelines](https://github.com/anthropics/skills/blob/main/skills/brand-guidelines/SKILL.md) · [claude.ai tokens](https://fontofweb.com/tokens/claude.ai) · [anthropic.com/news/claude-design](https://www.anthropic.com/news/claude-design-anthropic-labs)
