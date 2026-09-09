# Contos de Ninar

Protótipo de um app de histórias para a hora de dormir. O pai ou a mãe escolhe os personagens, o cenário e um tema; o Claude escreve um roteiro com narrador e falas; cada personagem ganha uma voz própria, e a narração desacelera até o sono chegar.

- **Versão interativa:** publicada como Artifact no claude.ai (o link está na conversa que gerou este código). Dentro do claude.ai, o botão *Criar a história de hoje* pede a história ao Claude na conta de quem está usando.
- **Versão estática:** `index.html` desta pasta é servido pelo GitHub Pages em `https://kazuork.github.io/contos-de-ninar/` quando este branch for mesclado na `main`. Fora do claude.ai, o app entra em *modo demonstração*: a história de exemplo e as histórias salvas funcionam, mas não gera histórias novas (isso precisa de um backend com chave de API, ver plano abaixo).

Tudo está em um único arquivo HTML, sem dependências, para facilitar o teste no celular.

## Como o protótipo funciona

```
Montagem (pai)            Roteiro (Claude)               Voz (navegador)
─────────────────         ─────────────────────          ────────────────────────
personagens (até 3)  →    prompt em pt-BR           →    narrador: melhor voz pt-BR
nome da criança           sample.json(...)               personagem: voz distinta,
cenário / tema            {titulo, resumo, falas[]}      ou tom+ritmo se só há uma
idade / tamanho           cada fala: quem, texto,        emoção → velocidade, tom, volume
detalhe do dia            emoção, pausa                  modo soninho no final
```

### Formato do roteiro

O Claude responde só com JSON neste formato. O player e o motor de voz trabalham em cima dele; é o mesmo formato que a versão de produção deve usar, trocando apenas o motor de voz.

```json
{
  "titulo": "O Caminho de Volta pra Casa",
  "resumo": "Lulu e Bruno descobrem que o escuro é cheio de amigos.",
  "falas": [
    { "quem": "narrador", "texto": "Era uma vez...", "emocao": "calmo", "pausa": 500 },
    { "quem": "Lulu", "texto": "Bruno! Olha só... o céu ficou roxo!", "emocao": "surpreso", "pausa": 400 },
    { "quem": "Bruno", "texto": "É a noite chegando, Lulu.", "emocao": "calmo", "pausa": 400 }
  ]
}
```

- `quem`: `narrador` ou o nome exato de um personagem (o app corrige maiúsculas e nomes parecidos; falantes inesperados recebem uma voz extra).
- `emocao`: `calmo`, `carinhoso`, `animado`, `feliz`, `curioso`, `misterioso`, `sussurrando`, `sonolento`, `assustado`, `triste`, `bravo`, `surpreso`.
- `pausa`: silêncio depois da fala, em milissegundos (250–600 normal, 900–1500 antes de uma virada, 2000 no fim).
- Cada `texto` tem até 240 caracteres; o prompt pede frases curtas e sem parênteses, o que melhora qualquer sintetizador.

O prompt (função `buildPrompt` em `index.html`) também pede a **curva de sono**: energia leve no começo e os últimos 3 a 5 itens em `sonolento` ou `sussurrando`, terminando com o narrador dando boa noite para a criança pelo nome.

### Como as vozes são distribuídas

O protótipo usa a Web Speech API do navegador (sem custo, sem chave):

| Falante | Voz | Tom (pitch) | Ritmo (rate) |
|---|---|---|---|
| narrador | a de maior qualidade em pt-BR | 1,0 | 0,90 |
| personagem "voz grave" (Bruno, Dona Coruja) | preferindo voz masculina disponível | 0,72 | conforme o ritmo |
| personagem "voz média" (Faísca, Bipe, Capitão Tico) | próxima voz menos usada | 1,00 | conforme o ritmo |
| personagem "voz aguda" (Lulu, Estrela, Nina, a criança) | preferindo voz feminina disponível | 1,35 | conforme o ritmo |

Ritmo: devagar 0,82 · normal 0,95 · rápido 1,08. Quando a mesma voz precisa servir dois personagens, o tom é afastado em ±0,14 a cada reuso para continuarem distinguíveis. O botão *Trocar* no player muda a voz (ou o tom, se só há uma voz) e o botão *Ouvir* toca uma frase de apresentação.

A emoção de cada fala multiplica a velocidade e desloca tom e volume:

| emoção | velocidade | tom | volume |
|---|---|---|---|
| calmo | ×1,00 | 0 | 1,00 |
| carinhoso | ×0,94 | +0,05 | 0,95 |
| animado | ×1,12 | +0,12 | 1,00 |
| curioso | ×1,02 | +0,10 | 1,00 |
| misterioso | ×0,88 | −0,08 | 0,85 |
| sussurrando | ×0,86 | −0,05 | 0,55 |
| sonolento | ×0,78 | −0,08 | 0,80 |
| assustado | ×1,10 | +0,18 | 0,95 |
| triste | ×0,86 | −0,10 | 0,85 |

**Modo soninho:** nos últimos 30% da história a velocidade cai até 15% e o volume até 30%, e as pausas ficam 30% mais longas.

Detalhes de robustez: as falas são divididas em trechos de até 180 caracteres (o Chrome corta falas longas), um temporizador de vigia destrava a fila se o navegador não avisar o fim de uma fala, e as referências das falas ficam guardadas até terminar (sem isso o Chrome às vezes não dispara `onend`).

### Limitações do protótipo

- **Qualidade depende do aparelho.** No Edge (computador) há várias vozes neurais em pt-BR e o resultado é bom; no Chrome de computador costuma haver uma só voz do Google; no iPhone a voz "Luciana"; no Android depende das vozes instaladas. É por isso que a versão de produção precisa de um serviço de voz neural.
- **Sem sussurro de verdade.** A Web Speech API não tem SSML nem estilos; o sussurro é simulado com volume baixo e voz mais lenta.
- **Gera histórias só dentro do claude.ai** (capacidade `sample` do runtime de Artifacts). A versão pública precisa de backend com a chave da API.
- **Biblioteca local.** As histórias ficam no `localStorage` do navegador, não sincronizam entre aparelhos.
- **O app do Claude no celular não tem vozes.** Confirmado em teste: dentro do aplicativo do Claude no Android, `speechSynthesis.getVoices()` devolve zero vozes, então nenhuma fala sai. O navegador embutido do app não expõe as vozes do sistema. O app detecta isso, explica e oferece abrir no navegador do celular, onde as vozes existem. Esse é o argumento mais forte para não depender da voz do navegador em produção.
- **O navegador pode bloquear a voz.** Dentro de um iframe (o visualizador de Artifacts do claude.ai) o Chrome pode recusar a leitura em voz alta com o erro `not-allowed`, e um aparelho sem vozes instaladas devolve `synthesis-failed`. O app agora mostra o motivo na tela, com o código do erro e a contagem de vozes, e oferece abrir em uma aba própria. O botão *Testar o som* no topo verifica isso em um toque, antes de a criança estar na cama.
- **Sem áudio em segundo plano.** Com a tela apagada, o navegador pode pausar a fala; um app nativo (Capacitor) resolve isso.

## Plano para o app de verdade

### Arquitetura proposta

Mesma stack do `sales-flow-hub`, para reaproveitar o que já se conhece:

- **App:** React + Vite + TypeScript (PWA instalável), empacotado com **Capacitor** para Android e iOS. Áudio em segundo plano, timer de sono e download para ouvir offline.
- **Backend:** **Supabase** — Auth (uma conta por família), Postgres (`criancas`, `personagens`, `historias`, `falas`, `audios`), Storage para os arquivos de áudio, e **Edge Functions** guardando as chaves:
  - `gerar-historia`: recebe a montagem, chama o Claude e devolve o roteiro no formato acima.
  - `sintetizar`: recebe o roteiro, gera um áudio por fala com a voz do personagem e as tags de emoção, concatena e salva no Storage. Como a criança pede a mesma história de novo, o áudio pronto fica em cache e a segunda vez não custa nada.
- **Geração do roteiro:** Claude via SDK oficial (`@anthropic-ai/sdk`) com o modelo `claude-opus-5`, *structured outputs* (`output_config.format`) com o esquema JSON do roteiro, *adaptive thinking* e streaming para mostrar o progresso. Custo por história: ~1,5 mil tokens de entrada e ~1,5 mil de saída ≈ US$ 0,05.
- **Voz:** serviço de TTS neural com uma voz fixa por personagem (a criança reconhece "a voz do Bruno" de uma história para outra) e controle de emoção. A comparação está na próxima seção.

### Provedores de voz neural em pt-BR

Levantamento feito em 05/09/2026 a partir de documentação oficial, SDKs e páginas de preço (alguns preços vieram de fontes de terceiros porque a página oficial não estava acessível; conferir antes de fechar contrato). Custo por história considera ~4 mil caracteres (uma história média de 650 palavras). Como o áudio fica em cache, cada história é paga uma vez só.

| Provedor | Modelos com pt-BR | Várias vozes numa chamada? | Controle de emoção | Custo por história |
|---|---|---|---|---|
| **ElevenLabs** | Eleven v3, Multilingual v2, Flash v2.5 | **Sim**: endpoint *Text to Dialogue* (só v3), até 10 vozes por pedido, ~2 mil caracteres por chamada (uma história = 2 ou 3 chamadas) | Tags no próprio texto: `[whispers]`, `[excited]`, `[sighs]`, `[laughs]`… (só v3; vocabulário aberto, `[sleepy]` precisa de teste) | ≈ US$ 0,40 (API, US$ 0,10 por mil caracteres); Flash ≈ US$ 0,20 |
| **Azure AI Speech** | 16 vozes pt-BR (Francisca, Antônio, Thalita, Brenda, Letícia-criança…); MAI-Voice-2 pt-BR (Caio, Luana, Pedro, Rafael) em *preview* | **Sim**: vários blocos `<voice>` num só documento SSML | `mstts:express-as`: as vozes pt-BR padrão só têm `calm` (Francisca); as MAI-Voice-2 têm `whispering`, `excited`, `sad`, `softvoice`, `happy`… (preview, sem SLA; Pedro e Rafael não sussurram) | ≈ US$ 0,06 (neural) a US$ 0,09 (HD) |
| **Google Cloud TTS** | Neural2 (2 vozes pt-BR), Chirp 3 HD (8 vozes pt-BR), Gemini 2.5 Flash/Pro TTS | Só no Gemini-TTS, e **no máximo 2 falantes por pedido** | Neural2: SSML completo (velocidade, tom, pausas); Chirp 3 HD: só pausas e velocidade; Gemini-TTS: instrução de estilo em texto livre | Neural2 ≈ US$ 0,06; Chirp 3 HD ≈ US$ 0,12; Gemini Flash ≈ US$ 0,08 |
| **OpenAI** | gpt-4o-mini-tts (13 vozes, otimizadas para inglês: testar o sotaque em pt-BR) | Não: uma voz por pedido | Parâmetro `instructions` em texto livre ("sussurre, bem devagar") | ≈ US$ 0,08 |
| **Amazon Polly** | Camila (motor generativo), Vitória, Thiago | Não | SSML básico, sem estilos | ≈ US$ 0,12 |
| **Kokoro (código aberto)** | pt-BR com poucas vozes | Não (concatenar por fala) | Nenhum | só o custo do servidor |

PlayHT foi comprado pela Meta e desligou a plataforma no fim de 2025; Cartesia Sonic tem tags de emoção mas não confirma o sotaque brasileiro.

**Recomendação.** Para o que este app precisa (uma voz fixa por personagem, sussurro e sono de verdade, pt-BR natural), o **ElevenLabs v3 com Text to Dialogue** é a única opção que resolve os três pontos numa chamada só, e tem a maior biblioteca de vozes em português. É o mais caro (≈ US$ 0,40 por história nova; 30 histórias por mês ≈ US$ 12 por família) e o v3 é para pré-renderizar, não para tempo real, o que combina com o cache. A alternativa barata é o **Azure com as vozes MAI-Voice-2** (≈ US$ 0,09, várias vozes e estilos num SSML só), aceitando que ainda é preview. Um caminho híbrido faz sentido: narrador numa voz barata (Azure ou Google Neural2, que é o que mais fala) e ElevenLabs só nas falas dos personagens.

### Roadmap sugerido

1. **Validar com a família (agora):** usar o protótipo por algumas noites. O que aprender: quais personagens e cenários pegam, tamanho ideal, se a curva de sono funciona, se vale ter a criança como personagem.
2. **MVP com backend (2–3 semanas):** projeto Supabase, Edge Functions `gerar-historia` e `sintetizar`, escolha de um provedor de voz, cache de áudio, app web instalável. Reaproveita o front do protótipo.
3. **App nas lojas:** Capacitor, áudio em segundo plano, biblioteca offline, perfil por criança.
4. **Depois:** histórias em capítulos (uma por noite), sons de ambiente baixinhos, narrador com a voz do pai ou da mãe (clonagem de voz com consentimento), modo "leia você" com a fala destacada.
