/**
 * nfse-parser.js — Importador de Entrada (Takeda Gestão / Módulo Fiscal)
 * ---------------------------------------------------------------------------
 * Núcleo reutilizável e independente de framework.
 *
 * O que ele FAZ:
 *   - Lê o XML de uma NFS-e que a loja RECEBE de terceiros (montador, frete, etc.)
 *   - Extrai os campos do modelo `notas_servico_entrada` (retenções inclusas)
 *   - Tolera o leiaute Nacional (LC 214/2025) E o leiaute ABRASF 2.x antigo
 *     (em 2026 ainda é um mix), além de IBS/CBS ausentes (facultativo na NFS-e)
 *
 * O que ele NÃO faz (de propósito):
 *   - NÃO emite nota, NÃO fala com SEFAZ/prefeitura, NÃO usa certificado.
 *   - NÃO "confia" sozinho: devolve os valores para CONFERÊNCIA humana
 *     (fluxo importada → conferida → lançada). A leitura é barata; confiar é caro.
 *
 * Portabilidade:
 *   - `parseNfseXml(xml)`  -> usa DOMParser quando disponível (browser / Deno-dom)
 *   - `parseNfseDocument(doc)` -> para ambientes que trazem o próprio parser
 *
 * Uso (browser / ES module):
 *   import { parseNfseXml } from './nfse-parser.js';
 *   const nota = parseNfseXml(xmlString);
 */

// ---------------------------------------------------------------------------
// Helpers de travessia (namespace-agnósticos: ignoram prefixos como nfse:, ns2:)
// ---------------------------------------------------------------------------

function getLocalName(el) {
  return (el.localName || el.nodeName || '').replace(/^.*:/, '');
}

/** Busca em largura todos os elementos cujo localName casa com `names`. */
function findAll(root, names) {
  if (!root) return [];
  const alvo = new Set(names.map((n) => n.toLowerCase()));
  const out = [];
  const fila = [root];
  while (fila.length) {
    const node = fila.shift();
    if (!node) continue;
    // casa só em elementos (nodeType 1); mas atravessa filhos de qualquer nó
    // (inclusive o próprio Document, nodeType 9, dono do elemento raiz)
    if (node.nodeType === 1 && alvo.has(getLocalName(node).toLowerCase())) out.push(node);
    const filhos = node.childNodes || [];
    for (let i = 0; i < filhos.length; i++) fila.push(filhos[i]);
  }
  return out;
}

/** Primeiro elemento (mais ao topo) cujo localName casa com `names`. */
function findFirst(root, names) {
  const todos = findAll(root, names);
  return todos.length ? todos[0] : null;
}

/** Texto do primeiro elemento encontrado, ou null. */
function textOf(root, names) {
  const el = findFirst(root, names);
  if (!el) return null;
  const t = (el.textContent || '').trim();
  return t === '' ? null : t;
}

/**
 * Converte texto monetário/percentual em número, tolerando formatos:
 *   "1234.56" -> 1234.56 | "1.234,56" -> 1234.56 | "0,05" -> 0.05
 */
function parseNumero(str) {
  if (str == null) return null;
  let s = String(str).trim();
  if (!s) return null;
  if (s.includes(',') && s.includes('.')) {
    s = s.replace(/\./g, '').replace(',', '.'); // 1.234,56 -> 1234.56
  } else if (s.includes(',')) {
    s = s.replace(',', '.'); // 0,05 -> 0.05
  }
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/** Mantém apenas dígitos (para CNPJ/CPF). */
function soDigitos(str) {
  if (str == null) return null;
  const d = String(str).replace(/\D/g, '');
  return d === '' ? null : d;
}

// ---------------------------------------------------------------------------
// Detecção de leiaute e ISS retido
// ---------------------------------------------------------------------------

function detectarLayout(doc) {
  // Usa tags EXCLUSIVAS de cada leiaute. Evita `infNFSe`/`InfNfse`, que colidem
  // ao normalizar caixa (nacional vs. ABRASF diferem só por maiúsculas).
  if (findFirst(doc, ['DPS', 'infDPS', 'cTribNac', 'tpRetISSQN', 'vServPrest'])) return 'nacional';
  if (findFirst(doc, ['CompNfse', 'InfDeclaracaoPrestacaoServico', 'ItemListaServico', 'Discriminacao']))
    return 'abrasf';
  return 'desconhecido';
}

/**
 * ISS retido. Surface SEMPRE a fonte para conferência humana, pois a semântica
 * varia entre leiautes:
 *   - ABRASF <IssRetido>: 1 = Sim (retido), 2 = Não
 *   - Nacional <tpRetISSQN>: 1 = Não retido; 2/3 = Retido (tomador/intermediário)
 */
function parseIssRetido(doc) {
  const abrasf = textOf(doc, ['IssRetido']);
  if (abrasf != null) {
    return { valor: abrasf.trim() === '1', fonte: `IssRetido=${abrasf}` };
  }
  const nac = textOf(doc, ['tpRetISSQN']);
  if (nac != null) {
    return { valor: nac.trim() !== '1', fonte: `tpRetISSQN=${nac}` };
  }
  return { valor: null, fonte: null };
}

// ---------------------------------------------------------------------------
// Parser principal
// ---------------------------------------------------------------------------

/**
 * Recebe um Document (DOM) já parseado e devolve o objeto `notas_servico_entrada`.
 * @param {Document} doc
 * @returns {object}
 */
export function parseNfseDocument(doc) {
  if (!doc) throw new Error('Documento XML vazio ou inválido.');

  const avisos = [];
  const layout = detectarLayout(doc);
  if (layout === 'desconhecido') {
    avisos.push('Leiaute não reconhecido (nem Nacional nem ABRASF). Confira os campos manualmente.');
  }

  // --- Prestador (quem prestou o serviço = o terceiro de quem a loja recebeu)
  const prestRoot =
    findFirst(doc, ['prest', 'PrestadorServico', 'Prestador', 'IdentificacaoPrestador']) || doc;
  const prestador_cnpj = soDigitos(textOf(prestRoot, ['CNPJ', 'Cnpj', 'CpfCnpj']));
  const prestador_nome = textOf(prestRoot, ['xNome', 'RazaoSocial', 'Nome', 'xFant']);

  // --- Tomador (extras úteis: confirma que a nota é da própria loja/tenant)
  const tomaRoot = findFirst(doc, ['toma', 'TomadorServico', 'Tomador']);
  const tomador_cnpj = tomaRoot ? soDigitos(textOf(tomaRoot, ['CNPJ', 'Cnpj', 'CpfCnpj'])) : null;
  const tomador_nome = tomaRoot ? textOf(tomaRoot, ['xNome', 'RazaoSocial', 'Nome']) : null;

  // --- Identificação da nota
  const numero = textOf(doc, ['nNFSe', 'Numero', 'nDPS']);
  const serie = textOf(doc, ['serie', 'Serie']);
  const data_emissao = textOf(doc, ['dhProc', 'dhEmi', 'DataEmissao', 'Competencia']);

  // --- Serviço
  const servRoot = findFirst(doc, ['serv', 'Servico']) || doc;
  // Obs.: NÃO incluir 'cServ' (é o container que aninha código + descrição).
  const codigo_servico = textOf(servRoot, [
    'cTribNac', 'ItemListaServico', 'CodigoTributacaoMunicipio', 'cTribMun',
  ]);
  const descricao = textOf(servRoot, ['xDescServ', 'Discriminacao', 'xServ']);

  // --- Valores e base
  const valor_servico = parseNumero(textOf(doc, ['vServ', 'ValorServicos', 'vServPrest']));
  const valor_deducoes = parseNumero(textOf(doc, ['vDeducoes', 'ValorDeducoes', 'vDed']));
  const base_calculo = parseNumero(textOf(doc, ['vBC', 'BaseCalculo', 'vBCISSQN']));

  // --- ISS
  const iss_aliquota = parseNumero(textOf(doc, ['pAliq', 'Aliquota', 'pAliqISSQN']));
  const iss_valor = parseNumero(textOf(doc, ['vISSQN', 'ValorIss', 'vISS']));
  const issRet = parseIssRetido(doc);

  // --- Retenções federais
  const irrf_valor = parseNumero(textOf(doc, ['vRetIRRF', 'ValorIr', 'vIR', 'vRetIR']));
  const inss_valor = parseNumero(textOf(doc, ['vRetCP', 'ValorInss', 'vINSS', 'vRetINSS']));
  const pis_valor = parseNumero(textOf(doc, ['vRetPIS', 'ValorPis', 'vPIS']));
  const cofins_valor = parseNumero(textOf(doc, ['vRetCOFINS', 'ValorCofins', 'vCOFINS']));
  const csll_valor = parseNumero(textOf(doc, ['vRetCSLL', 'ValorCsll', 'vCSLL']));

  // --- Líquido
  const valor_liquido = parseNumero(
    textOf(doc, ['vLiq', 'ValorLiquidoNfse', 'vLiquido', 'vNF'])
  );

  // --- Reforma tributária (NULLABLE: facultativo na NFS-e em 2026)
  const ibs_valor = parseNumero(textOf(doc, ['vIBS', 'vIBSTot', 'vIBSMun', 'vIBSUF']));
  const cbs_valor = parseNumero(textOf(doc, ['vCBS', 'vCBSTot']));

  // --- Avisos de conferência (honestidade > falsa precisão)
  if (iss_aliquota != null && iss_aliquota > 0 && iss_aliquota <= 1) {
    avisos.push(
      `Alíquota de ISS lida como ${iss_aliquota} — pode estar em fração (ex.: 0,05 = 5%). Confirme.`
    );
  }
  if (issRet.valor === null) {
    avisos.push('Não foi possível determinar se o ISS foi retido. Confira manualmente.');
  }
  if (ibs_valor == null && cbs_valor == null) {
    avisos.push('Sem destaque de IBS/CBS (esperado: facultativo na NFS-e em 2026).');
  }
  if (!prestador_cnpj) {
    avisos.push('CNPJ do prestador não encontrado.');
  }

  return {
    // preenchido pela aplicação, não vem do XML:
    tenant_id: null,

    // prestador (terceiro)
    prestador_cnpj,
    prestador_nome,

    // tomador (extras úteis para validar a loja — fora do modelo original do doc)
    tomador_cnpj,
    tomador_nome,

    // identificação
    numero,
    serie,
    data_emissao,

    // serviço
    codigo_servico,
    descricao,

    // valores
    valor_servico,
    valor_deducoes,
    base_calculo,

    // ISS
    iss_aliquota,
    iss_valor,
    iss_retido: issRet.valor,

    // retenções federais
    irrf_valor,
    inss_valor,
    pis_valor,
    cofins_valor,
    csll_valor,

    valor_liquido,

    // reforma (nullable)
    ibs_valor,
    cbs_valor,

    // guarda legal + controle
    xml_original: null, // preenchido por parseNfseXml / pela aplicação
    status: 'importada', // importada → conferida → lançada

    // metadados para a tela de conferência (não persistir necessariamente)
    _meta: {
      layout_detectado: layout,
      iss_retido_fonte: issRet.fonte,
      avisos,
    },
  };
}

/**
 * Recebe a string XML, faz o parse via DOMParser (quando disponível) e delega.
 * @param {string} xml
 * @returns {object}
 */
export function parseNfseXml(xml) {
  if (typeof xml !== 'string' || !xml.trim()) {
    throw new Error('XML vazio. Selecione um arquivo .xml de NFS-e.');
  }

  let doc;
  if (typeof DOMParser !== 'undefined') {
    doc = new DOMParser().parseFromString(xml, 'application/xml');
    const erro = doc.querySelector && doc.querySelector('parsererror');
    if (erro) throw new Error('XML mal formado: ' + erro.textContent.trim());
  } else {
    throw new Error(
      'DOMParser indisponível neste ambiente. Faça o parse no seu runtime e ' +
        'chame parseNfseDocument(doc).'
    );
  }

  const nota = parseNfseDocument(doc);
  nota.xml_original = xml;
  return nota;
}

export default { parseNfseXml, parseNfseDocument };
