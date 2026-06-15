/**
 * Tipos para o núcleo do Importador de Entrada (Takeda Gestão / Módulo Fiscal).
 * Espelha o modelo de dados `notas_servico_entrada`.
 */

export type StatusNotaEntrada = 'importada' | 'conferida' | 'lancada';
export type LayoutNfse = 'nacional' | 'abrasf' | 'desconhecido';

export interface MetaNotaEntrada {
  /** Leiaute detectado a partir das tags do XML. */
  layout_detectado: LayoutNfse;
  /** Origem bruta usada para decidir `iss_retido` (ex.: "tpRetISSQN=2"). */
  iss_retido_fonte: string | null;
  /** Avisos para a tela de conferência (precisão honesta, sem auto-confiança). */
  avisos: string[];
}

export interface NotaServicoEntrada {
  /** Preenchido pela aplicação (multi-tenant), não vem do XML. */
  tenant_id: string | null;

  prestador_cnpj: string | null;
  prestador_nome: string | null;

  /** Extras úteis para validar que a nota é da própria loja (fora do modelo original). */
  tomador_cnpj: string | null;
  tomador_nome: string | null;

  numero: string | null;
  serie: string | null;
  data_emissao: string | null;

  codigo_servico: string | null;
  descricao: string | null;

  valor_servico: number | null;
  valor_deducoes: number | null;
  base_calculo: number | null;

  iss_aliquota: number | null;
  iss_valor: number | null;
  iss_retido: boolean | null;

  irrf_valor: number | null;
  inss_valor: number | null;
  pis_valor: number | null;
  cofins_valor: number | null;
  csll_valor: number | null;

  valor_liquido: number | null;

  /** Nullable: destaque de IBS/CBS é facultativo na NFS-e em 2026. */
  ibs_valor: number | null;
  cbs_valor: number | null;

  xml_original: string | null;
  status: StatusNotaEntrada;

  _meta: MetaNotaEntrada;
}

/** Faz o parse a partir de um Document já parseado (traga seu próprio parser). */
export function parseNfseDocument(doc: Document): NotaServicoEntrada;

/** Faz o parse a partir da string XML (usa DOMParser quando disponível). */
export function parseNfseXml(xml: string): NotaServicoEntrada;

declare const _default: {
  parseNfseXml: typeof parseNfseXml;
  parseNfseDocument: typeof parseNfseDocument;
};
export default _default;
