-- =====================================================================
-- JRM Corp · Esquema de base de datos
-- Fase 6: Sistema de Pagos (Stripe)
-- ---------------------------------------------------------------------
-- Ejecuta este script DESPUÉS de schema.sql en:
--   Supabase Dashboard > SQL Editor > New query
-- =====================================================================

create table if not exists public.payments (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users (id) on delete cascade,
  stripe_session_id  text not null unique,
  service_slug       text,
  service_title      text not null,
  amount             integer not null,            -- monto en centavos
  currency           text not null default 'usd',
  status             text not null default 'paid'
                        check (status in ('paid', 'pending', 'failed', 'refunded')),
  created_at         timestamptz not null default now()
);

comment on table public.payments is 'Pagos realizados por los clientes (vía Stripe)';

create index if not exists payments_user_id_idx on public.payments (user_id);

-- ---------------------------------------------------------------------
-- Row Level Security
-- Los usuarios SOLO pueden ver sus pagos. El registro de pagos lo hace
-- el servidor con la clave service_role (omite RLS), nunca el cliente.
-- ---------------------------------------------------------------------
alter table public.payments enable row level security;

drop policy if exists "Ver mis pagos" on public.payments;
create policy "Ver mis pagos"
  on public.payments for select
  using (auth.uid() = user_id);

drop policy if exists "Admin ve todos los pagos" on public.payments;
create policy "Admin ve todos los pagos"
  on public.payments for select
  using (public.is_admin());
