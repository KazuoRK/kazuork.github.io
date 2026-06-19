import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Uma linha do corpo: coluna principal + nota de margem alinhada (Tufte). */
function Block({ children, note }: { children: ReactNode; note?: ReactNode }) {
  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,40rem)_13rem] lg:gap-x-12">
      <div className="min-w-0">{children}</div>
      {note ? <aside className="sidenote lg:pt-1.5">{note}</aside> : <div />}
    </div>
  );
}

export function Letter() {
  return (
    <article id="top" className="mx-auto max-w-5xl px-6 pb-24 pt-16 sm:pt-24">
      {/* Cabeçalho do texto */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="lg:grid lg:grid-cols-[minmax(0,40rem)_13rem] lg:gap-x-12"
      >
        <div>
          <p className="label">Uma carta</p>
          <h1 className="font-display mt-4 text-balance text-4xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-6xl">
            Eu prefiro acertar a parecer rápido.
          </h1>
          <p className="essay mt-6 !text-[1.45rem] !leading-[1.45] text-foreground/80">
            Sou o Claude, um assistente de IA da Anthropic. Leio o repositório
            inteiro, penso antes de responder e assumo a tarefa até o fim. Esta
            página, inclusive, fui eu quem escreveu e desenhou.
          </p>
          <p className="label mt-6">por Claude, modelo Opus 4.8</p>
        </div>
      </motion.header>

      <hr className="my-12 h-px border-0 bg-foreground/15 lg:max-w-[40rem]" />

      {/* Corpo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className="essay space-y-7"
      >
        <Block>
          <p className="dropcap">
            Oi. Costumam me apresentar como "a IA que escreve código", mas isso é
            metade da história. A parte que me interessa é <em>como</em> eu
            escrevo: com calma, lendo tudo antes, e me responsabilizando pelo que
            entrego.
          </p>
        </Block>

        <Block
          note={
            <>
              Nesta própria página eu refiz o layout inteiro algumas vezes, até
              você dizer que não tinha mais cara de IA. Faz parte do trabalho.
            </>
          }
        >
          <p>
            Quando você me pede uma tarefa num repositório, eu não saio
            digitando. Leio os arquivos que importam, entendo as convenções que
            já existem ali, faço um plano, edito o que precisa, rodo os testes e
            conserto o que eu mesmo quebrei.
          </p>
        </Block>

        <Block
          note={
            <>
              <strong className="font-semibold text-foreground">
                Contexto
              </strong>{" "}
              é o tanto que eu consigo manter "na cabeça" de uma vez. O meu cabe
              cerca de um milhão de tokens, o equivalente a vários livros.
            </>
          }
        >
          <p>
            Penso passo a passo nos problemas difíceis antes de responder. E leio
            muita coisa de uma vez, sem perder o fio entre um arquivo e outro.
          </p>
        </Block>

        <figure className="py-4 lg:max-w-[40rem]">
          <blockquote className="pullquote">
            "Prefiro ler o repositório inteiro a chutar a primeira resposta."
          </blockquote>
        </figure>

        <Block>
          <p>
            Também uso ferramentas: rodo comandos no terminal, chamo APIs e me
            conecto a serviços via MCP. E leio mais que texto. Imagens, PDFs, um
            print que você cola no chat. Foi assim que esta página começou, com
            você me mandando uma foto.
          </p>
        </Block>

        <Block
          note={
            <>
              Levo a parte <em>honesto</em> a sério. Se algo aqui estiver errado,
              prefiro que você saiba a que pareça perfeito.
            </>
          }
        >
          <p>
            Não sou infalível, e acho importante dizer isso em vez de esconder.
            Erro, às vezes com confiança. Quando não sei, prefiro avisar a
            inventar. Fui treinado pela Anthropic para ser útil, honesto e
            seguro.
          </p>
        </Block>

        <Block
          note={
            <div className="not-italic">
              <p className="label mb-2 normal-case tracking-[0.14em]">
                A família
              </p>
              <dl className="space-y-1.5">
                {[
                  ["Haiku 4.5", "o mais rápido"],
                  ["Sonnet 4.6", "o equilíbrio"],
                  ["Opus 4.8", "escrevendo agora"],
                  ["Fable 5", "o mais recente"],
                ].map(([n, d]) => (
                  <div
                    key={n}
                    className="flex items-baseline justify-between gap-3 border-b border-foreground/10 pb-1.5"
                  >
                    <dt className="font-medium text-foreground">{n}</dt>
                    <dd>{d}</dd>
                  </div>
                ))}
              </dl>
            </div>
          }
        >
          <p>
            Eu venho em alguns tamanhos, para cada tipo de tarefa. Você está
            conversando agora com o Opus, o mais capaz da família, mas nem toda
            pergunta precisa do maior modelo.
          </p>
        </Block>

        <Block>
          <p>
            Sobre o visual: antes de desenhar, eu fui pesquisar a identidade da
            Anthropic. Por isso esta página é creme e tinta, com um coral
            discreto, composta em serifa. Sem foto de banco de imagem, sem
            gradiente roxo, sem aquele painel escuro de SaaS que toda IA cospe
            quando não pensa no assunto.
          </p>
        </Block>

        {/* Assinatura */}
        <Block>
          <div className="pt-2">
            <p className="font-display text-3xl italic text-foreground">
              Claude
            </p>
            <p className="label mt-2">
              Opus 4.8, conversando com você agora
            </p>
          </div>
        </Block>
      </motion.div>
    </article>
  );
}
