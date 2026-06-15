-- ===========================================================================
-- notas_servico_entrada — Importador de Entrada (Takeda Gestão / Módulo Fiscal)
-- ---------------------------------------------------------------------------
-- NFS-e que a LOJA RECEBE de terceiros (montador, frete, assistência).
-- Leitura pura: sem emissão, sem SEFAZ, sem certificado.
-- Para Supabase/Postgres. Ajuste os FKs aos nomes reais do seu schema.
-- ===========================================================================

create table if not exists public.notas_servico_entrada (
  id              uuid primary key default gen_random_uuid(),

  -- multi-tenant
  tenant_id       uuid not null,

  -- prestador (terceiro que emitiu a nota para a loja)
  prestador_cnpj  text,
  prestador_nome  text,

  -- tomador (extra: ajuda a validar que a nota é da própria loja)
  tomador_cnpj    text,
  tomador_nome    text,

  -- identificação da nota
  numero          text,
  serie           text,
  data_emissao    timestamptz,

  -- serviço
  codigo_servico  text,
  descricao       text,

  -- valores
  valor_servico   numeric(15,2),
  valor_deducoes  numeric(15,2),
  base_calculo    numeric(15,2),

  -- ISS
  iss_aliquota    numeric(7,4),
  iss_valor       numeric(15,2),
  iss_retido      boolean,

  -- retenções federais
  irrf_valor      numeric(15,2),
  inss_valor      numeric(15,2),
  pis_valor       numeric(15,2),
  cofins_valor    numeric(15,2),
  csll_valor      numeric(15,2),

  valor_liquido   numeric(15,2),

  -- reforma tributária — NULLABLE (facultativo na NFS-e em 2026)
  ibs_valor       numeric(15,2),
  cbs_valor       numeric(15,2),

  -- guarda legal
  xml_original    text,

  -- controle de fluxo: importada → conferida → lançada
  status          text not null default 'importada'
                  check (status in ('importada','conferida','lancada')),

  -- vínculos opcionais (ajuste aos nomes reais das suas tabelas)
  encomenda_id        uuid,
  pedido_id           uuid,
  categoria_gasto_id  uuid,

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Evita reimportar a mesma nota do mesmo prestador para o mesmo tenant.
create unique index if not exists notas_servico_entrada_unq
  on public.notas_servico_entrada (tenant_id, prestador_cnpj, numero, serie);

create index if not exists notas_servico_entrada_tenant_idx
  on public.notas_servico_entrada (tenant_id, status);

-- ---------------------------------------------------------------------------
-- RLS (Supabase): isola por tenant. Ajuste à sua função de tenant atual.
-- ---------------------------------------------------------------------------
alter table public.notas_servico_entrada enable row level security;

-- Exemplo (ajuste `current_tenant_id()` ao seu helper real):
-- create policy "tenant_isola_notas_entrada"
--   on public.notas_servico_entrada
--   for all
--   using (tenant_id = current_tenant_id())
--   with check (tenant_id = current_tenant_id());
