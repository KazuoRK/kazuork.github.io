# Módulo Fiscal — Importador de Notas de Entrada (NFS-e)

MVP do **Importador de Entrada** da Takeda Gestão, conforme o documento de
decisão (`takedamodulofiscaldecisao.md`).

Lê o XML de NFS-e que a **loja recebe** de terceiros (montador, frete,
assistência) e extrai os campos do modelo `notas_servico_entrada`, incluindo
retenções.

## Por que só isto (e não emissão)

O documento separa duas frentes:

| Frente | Risco | Veredito |
|--------|-------|----------|
| **Importação de entrada** (este módulo) | Baixo — só leitura | ✅ Começar agora |
| Emissão pro cliente (NF-e/NFC-e/NFS-e) | Alto — SEFAZ, certificado, responsabilidade legal | ⏸ Decisão separada |

Aqui é **leitura pura**: sem emissão, sem SEFAZ, sem certificado, sem custo de API.

## Arquivos

| Arquivo | O que é |
|---------|---------|
| `nfse-parser.js` | **Núcleo reutilizável** (ES module, sem framework). O coração portável. |
| `nfse-parser.d.ts` | Tipos TypeScript do modelo `NotaServicoEntrada`. |
| `schema.sql` | Tabela `notas_servico_entrada` (Supabase/Postgres) + RLS por tenant. |
| `index.html` / `app.js` / `styles.css` | **Ferramenta standalone** (roda no GitHub Pages). |
| `exemplo-nfse-nacional.xml` | NFS-e fictícia (leiaute Nacional) para teste imediato. |

## Usar standalone (GitHub Pages)

Acesse `https://kazuork.github.io/fiscal/` (ou abra `index.html`).
Arraste um ou vários XMLs → confira os campos extraídos → **Exportar CSV**.
Nada sai do navegador. Há um botão "Carregar nota de exemplo".

## Integrar na Takeda Gestão (Lovable + Supabase)

O mesmo `nfse-parser.js` roda no app:

```ts
import { parseNfseXml } from './fiscal/nfse-parser';
import type { NotaServicoEntrada } from './fiscal/nfse-parser';

const nota: NotaServicoEntrada = parseNfseXml(xmlString);
nota.tenant_id = tenantAtual;          // o parser não preenche multi-tenant
await supabase.from('notas_servico_entrada').insert(nota);
```

- **Browser (React)**: usa `DOMParser` nativo — funciona direto.
- **Edge Function (Deno)**: não há `DOMParser` nativo. Traga seu parser
  (ex.: `deno-dom`) e chame `parseNfseDocument(doc)` em vez de `parseNfseXml`.
- Aplique o `schema.sql` (ajuste `current_tenant_id()` ao seu helper de RLS).

## Cobertura e limites (honestidade > falsa precisão)

- **Leiautes**: Nacional (LC 214/2025) **e** ABRASF 2.x — em 2026 ainda é um mix.
- **IBS/CBS**: `nullable`. Facultativo na NFS-e em 2026; o parser tolera com e sem.
- **Não confia sozinho**: devolve `_meta.avisos` e a fonte do "ISS retido" para
  **conferência humana**. Fluxo: `importada → conferida → lançada`.
- A semântica de alguns campos varia entre prefeituras/leiautes (ex.: alíquota
  em fração vs. percentual; código de `tpRetISSQN`). O parser sinaliza dúvidas
  em vez de fingir certeza.

## Evolução (próximos passos do documento)

1. MVP = **upload manual de XML** (este módulo). ✅
2. Depois: **captura automática via Distribuição DF-e** (puxa com o certificado
   da própria loja) — usar lib como `node-mde` ou NFeWizard.
3. Decidir onde vive no app: sub-aba do Financeiro × módulo "Notas de Entrada".
