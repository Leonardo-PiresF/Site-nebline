create table if not exists pedidos (
  id uuid primary key default gen_random_uuid(),
  codigo text not null unique,
  tipo text not null check (tipo in ('pedido', 'encomenda')),
  status text not null default 'pendente'
    check (status in ('pendente', 'aceito', 'recusado', 'concluido')),
  cliente jsonb not null,
  itens jsonb not null,
  entrega jsonb not null,
  totais jsonb not null,
  pagamento jsonb not null,
  encomenda jsonb,
  observacoes text,
  motivo_recusa text,
  criado_em timestamptz not null default now()
);

create index if not exists pedidos_criado_em_idx on pedidos (criado_em desc);
create index if not exists pedidos_status_idx on pedidos (status);
create index if not exists pedidos_tipo_idx on pedidos (tipo);

create table if not exists disponibilidade (
  produto_id text primary key,
  disponivel boolean not null default true,
  atualizado_em timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- Tempo real: o painel acende sozinho quando entra pedido
-- ---------------------------------------------------------------
do $$
begin
  alter publication supabase_realtime add table pedidos;
exception
  when duplicate_object then null;
end $$;

-- ---------------------------------------------------------------
-- Seguranca
-- ---------------------------------------------------------------
alter table pedidos enable row level security;
alter table disponibilidade enable row level security;

drop policy if exists "visitante cria pedido" on pedidos;
drop policy if exists "equipe le pedidos" on pedidos;
drop policy if exists "equipe atualiza pedidos" on pedidos;
drop policy if exists "visitante le disponibilidade" on disponibilidade;
drop policy if exists "equipe escreve disponibilidade" on disponibilidade;

-- Quem visita o site pode CRIAR pedido, e so isso. Nao pode ler pedido
-- nenhum, nem o proprio: os dados dos clientes ficam fechados.
create policy "visitante cria pedido"
  on pedidos for insert to anon
  with check (
    status = 'pendente'
    and motivo_recusa is null
    and char_length(coalesce(observacoes, '')) < 1000
    and jsonb_array_length(itens) between 1 and 60
  );

-- A vitrine precisa saber o que esta em falta, entao a leitura e publica.
create policy "visitante le disponibilidade"
  on disponibilidade for select to anon using (true);

-- A equipe logada le e mexe em tudo.
create policy "equipe le pedidos"
  on pedidos for select to authenticated using (true);

create policy "equipe atualiza pedidos"
  on pedidos for update to authenticated using (true) with check (true);

create policy "equipe escreve disponibilidade"
  on disponibilidade for all to authenticated using (true) with check (true);

-- ---------------------------------------------------------------
-- Depois de rodar isto:
-- 1. Authentication, Users, Add user: crie o login da equipe da Nebline
--    com "Auto Confirm User" marcado.
-- 2. Authentication, Providers, Email: desligue "Enable sign ups", senao
--    qualquer pessoa cria conta e entra no painel.
-- ---------------------------------------------------------------
