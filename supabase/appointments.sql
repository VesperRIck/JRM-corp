-- =====================================================================
-- JRM Corp · Esquema de base de datos
-- Fase 5: Sistema de Citas
-- ---------------------------------------------------------------------
-- Ejecuta este script DESPUÉS de schema.sql en:
--   Supabase Dashboard > SQL Editor > New query
-- =====================================================================

-- ---------------------------------------------------------------------
-- Tabla de citas
-- ---------------------------------------------------------------------
create table if not exists public.appointments (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references auth.users (id) on delete cascade,
  service_slug      text not null,
  service_title     text not null,
  appointment_date  date not null,
  appointment_time  text not null,
  status            text not null default 'confirmed'
                       check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  notes             text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table public.appointments is 'Citas agendadas por los clientes de JRM Corp';

create index if not exists appointments_user_id_idx on public.appointments (user_id);
create index if not exists appointments_date_idx on public.appointments (appointment_date);

-- ---------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------
alter table public.appointments enable row level security;

-- El cliente ve sus propias citas
drop policy if exists "Ver mis citas" on public.appointments;
create policy "Ver mis citas"
  on public.appointments for select
  using (auth.uid() = user_id);

-- El cliente crea sus propias citas
drop policy if exists "Crear mis citas" on public.appointments;
create policy "Crear mis citas"
  on public.appointments for insert
  with check (auth.uid() = user_id);

-- El cliente actualiza sus propias citas (p. ej. cancelar)
drop policy if exists "Actualizar mis citas" on public.appointments;
create policy "Actualizar mis citas"
  on public.appointments for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Los administradores ven y gestionan todas las citas
drop policy if exists "Admin ve todas las citas" on public.appointments;
create policy "Admin ve todas las citas"
  on public.appointments for select
  using (public.is_admin());

drop policy if exists "Admin gestiona citas" on public.appointments;
create policy "Admin gestiona citas"
  on public.appointments for update
  using (public.is_admin());

-- ---------------------------------------------------------------------
-- Trigger de updated_at (la función se creó en schema.sql)
-- ---------------------------------------------------------------------
drop trigger if exists appointments_updated_at on public.appointments;
create trigger appointments_updated_at
  before update on public.appointments
  for each row execute function public.handle_updated_at();
