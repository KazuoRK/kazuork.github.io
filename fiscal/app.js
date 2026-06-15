/**
 * app.js — UI standalone do Importador de Entrada.
 * Cola o núcleo (nfse-parser.js) numa tela de upload + conferência.
 * 100% client-side: nenhum dado sai do navegador.
 */
import { parseNfseXml } from './nfse-parser.js';

const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const resultados = document.getElementById('resultados');
const cards = document.getElementById('cards');
const contador = document.getElementById('contador');

/** @type {Array<{nome:string, nota?:object, erro?:string}>} */
let notas = [];

// ---- Formatação ----
const fmtMoeda = (n) =>
  n == null ? null : n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const fmtPerc = (n) => (n == null ? null : `${n}`);
const fmtCnpj = (d) =>
  !d ? null : d.length === 14
    ? d.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
    : d;
const fmtBool = (b) => (b == null ? null : b ? 'Sim' : 'Não');

// ---- Leitura de arquivos ----
function lerArquivos(fileList) {
  const arquivos = Array.from(fileList).filter((f) => /\.xml$/i.test(f.name) || /xml/.test(f.type));
  if (!arquivos.length) return;
  arquivos.forEach((f) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const nota = parseNfseXml(String(reader.result));
        notas.push({ nome: f.name, nota });
      } catch (e) {
        notas.push({ nome: f.name, erro: e.message });
      }
      render();
    };
    reader.onerror = () => {
      notas.push({ nome: f.name, erro: 'Falha ao ler o arquivo.' });
      render();
    };
    reader.readAsText(f, 'UTF-8');
  });
}

// ---- Render ----
function campo(label, valor, { destaque = false } = {}) {
  const vazio = valor == null || valor === '';
  return `
    <div class="campo${destaque ? ' destaque' : ''}">
      <span class="k">${label}</span>
      <span class="v${vazio ? ' vazio' : ''}">${vazio ? '—' : escape(valor)}</span>
    </div>`;
}

function escape(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function cardNota(item) {
  if (item.erro) {
    return `<div class="card card-erro">
      <div class="card-head"><h3>${escape(item.nome)}</h3><span class="tag desconhecido">erro</span></div>
      <div class="aviso">${escape(item.erro)}</div>
    </div>`;
  }
  const n = item.nota;
  const m = n._meta;
  const avisos = (m.avisos || [])
    .map((a) => `<div class="aviso">${escape(a)}</div>`)
    .join('');

  return `<div class="card">
    <div class="card-head">
      <h3>${escape(n.prestador_nome || item.nome)}</h3>
      <span class="tag ${m.layout_detectado}">${m.layout_detectado}</span>
    </div>
    <div class="grid">
      ${campo('CNPJ prestador', fmtCnpj(n.prestador_cnpj))}
      ${campo('Nota / Série', [n.numero, n.serie].filter(Boolean).join(' / '))}
      ${campo('Emissão', n.data_emissao)}
      ${campo('Cód. serviço', n.codigo_servico)}
      ${campo('Valor serviço', fmtMoeda(n.valor_servico))}
      ${campo('Base de cálculo', fmtMoeda(n.base_calculo))}
      ${campo('ISS alíquota', fmtPerc(n.iss_aliquota))}
      ${campo('ISS valor', fmtMoeda(n.iss_valor))}
      ${campo('ISS retido', fmtBool(n.iss_retido))}
      ${campo('IRRF', fmtMoeda(n.irrf_valor))}
      ${campo('INSS', fmtMoeda(n.inss_valor))}
      ${campo('PIS', fmtMoeda(n.pis_valor))}
      ${campo('COFINS', fmtMoeda(n.cofins_valor))}
      ${campo('CSLL', fmtMoeda(n.csll_valor))}
      ${campo('IBS', fmtMoeda(n.ibs_valor))}
      ${campo('CBS', fmtMoeda(n.cbs_valor))}
      ${campo('Valor líquido', fmtMoeda(n.valor_liquido), { destaque: true })}
    </div>
    ${n.descricao ? `<div class="campo" style="margin-top:10px"><span class="k">Descrição</span><span class="v">${escape(n.descricao)}</span></div>` : ''}
    ${m.iss_retido_fonte ? `<div class="fonte-iss">Fonte do ISS retido: <code>${escape(m.iss_retido_fonte)}</code></div>` : ''}
    ${avisos ? `<div class="avisos">${avisos}</div>` : ''}
  </div>`;
}

function render() {
  if (!notas.length) {
    resultados.hidden = true;
    return;
  }
  resultados.hidden = false;
  const ok = notas.filter((i) => !i.erro).length;
  const erros = notas.length - ok;
  contador.textContent = `${ok} nota(s) lida(s)${erros ? ` · ${erros} com erro` : ''}`;
  cards.innerHTML = notas.map(cardNota).join('');
}

// ---- Exportar CSV ----
function exportarCsv() {
  const cols = [
    'prestador_cnpj', 'prestador_nome', 'tomador_cnpj', 'numero', 'serie', 'data_emissao',
    'codigo_servico', 'descricao', 'valor_servico', 'valor_deducoes', 'base_calculo',
    'iss_aliquota', 'iss_valor', 'iss_retido', 'irrf_valor', 'inss_valor', 'pis_valor',
    'cofins_valor', 'csll_valor', 'valor_liquido', 'ibs_valor', 'cbs_valor', 'status',
  ];
  const esc = (v) => {
    if (v == null) return '';
    const s = String(v).replace(/"/g, '""');
    return /[",;\n]/.test(s) ? `"${s}"` : s;
  };
  const linhas = [cols.join(';')];
  notas.filter((i) => i.nota).forEach((i) => {
    linhas.push(cols.map((c) => esc(i.nota[c])).join(';'));
  });
  const blob = new Blob(['﻿' + linhas.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'notas_servico_entrada.csv';
  a.click();
  URL.revokeObjectURL(url);
}

// ---- Eventos ----
dropzone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => lerArquivos(e.target.files));

['dragenter', 'dragover'].forEach((ev) =>
  dropzone.addEventListener(ev, (e) => {
    e.preventDefault();
    dropzone.classList.add('drag');
  })
);
['dragleave', 'drop'].forEach((ev) =>
  dropzone.addEventListener(ev, (e) => {
    e.preventDefault();
    dropzone.classList.remove('drag');
  })
);
dropzone.addEventListener('drop', (e) => lerArquivos(e.dataTransfer.files));

document.getElementById('btnLimpar').addEventListener('click', () => {
  notas = [];
  fileInput.value = '';
  render();
});
document.getElementById('btnCsv').addEventListener('click', exportarCsv);

document.getElementById('btnExemplo').addEventListener('click', async (e) => {
  e.stopPropagation();
  try {
    const resp = await fetch('./exemplo-nfse-nacional.xml');
    const xml = await resp.text();
    notas.push({ nome: 'exemplo-nfse-nacional.xml', nota: parseNfseXml(xml) });
  } catch (err) {
    notas.push({ nome: 'exemplo', erro: 'Não foi possível carregar o exemplo: ' + err.message });
  }
  render();
});
