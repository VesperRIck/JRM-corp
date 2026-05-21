-- =====================================================================
-- JRM Corp · Esquema de base de datos
-- Fase 3: Autenticación, perfiles y roles
-- ---------------------------------------------------------------------
-- Cómo ejecutarlo:
--   1. Supabase Dashboard > SQL Editor > New query
--   2. Pega TODO este archivo y pulsa "Run"
-- =====================================================================

-- ---------------------------------------------------------------------
-- Tabla de perfiles  (extiende auth.users con datos del cliente)
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text        not null default '',
  email       text,
  phone       text,
  cedula      text,
  role        text        not null default 'client'
                          check (role in ('client', 'admin')),
  is_blocked  boolean     not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.profiles is 'Perfiles de usuario de JRM Corp';

-- ---------------------------------------------------------------------
-- Row Level Security (RLS)
-- ---------------------------------------------------------------------
alter table public.profiles enable row level security;

-- Función auxiliar: ¿el usuario actual es administrador?
-- SECURITY DEFINER evita recursión infinita dentro de las políticas.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Cada usuario ve su propio perfil
drop policy if exists "Ver perfil propio" on public.profiles;
create policy "Ver perfil propio"
  on public.profiles for select
  using (auth.uid() = id);

-- Cada usuario actualiza su propio perfil
drop policy if exists "Actualizar perfil propio" on public.profiles;
create policy "Actualizar perfil propio"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Los administradores ven todos los perfiles
drop policy if exists "Admin ve todos los perfiles" on public.profiles;
create policy "Admin ve todos los perfiles"
  on public.profiles for select
  using (public.is_admin());

-- Los administradores actualizan cualquier perfil
drop policy if exists "Admin actualiza perfiles" on public.profiles;
create policy "Admin actualiza perfiles"
  on public.profiles for update
  using (public.is_admin());

-- ---------------------------------------------------------------------
-- Trigger: crea el perfil automáticamente al registrarse un usuario
-- ---------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, phone, cedula)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email,
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'cedula'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------
-- Trigger: mantiene actualizado el campo updated_at
-- ---------------------------------------------------------------------
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- =====================================================================
-- CÓMO CONVERTIR A UN USUARIO EN ADMINISTRADOR
-- ---------------------------------------------------------------------
-- Primero regístralo de forma normal desde la web. Luego, en el
-- SQL Editor, ejecuta (cambiando el correo):
--
--   update public.profiles
--   set role = 'admin'
--   where email = 'admin1@jrmcorp.com';
--
-- Repite para los 4 administradores. El panel de administración
-- se construirá en la Fase 7.
-- =====================================================================
