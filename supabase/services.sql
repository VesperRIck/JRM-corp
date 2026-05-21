-- =====================================================================
-- JRM Corp · Esquema de base de datos
-- Servicios gestionables + almacenamiento de imágenes
-- ---------------------------------------------------------------------
-- Ejecuta este script DESPUÉS de schema.sql en:
--   Supabase Dashboard > SQL Editor > New query
-- =====================================================================

-- ---------------------------------------------------------------------
-- Tabla de servicios
-- ---------------------------------------------------------------------
create table if not exists public.services (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  title             text not null,
  tagline           text not null default '',
  short_description text not null default '',
  description       text not null default '',
  icon              text not null default 'sparkles',
  accent            text not null default '#8fb4e3',
  price             integer not null default 0,
  benefits          text[] not null default '{}',
  features          text[] not null default '{}',
  image_url         text,
  video_url         text,
  is_active         boolean not null default true,
  sort_order        integer not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table public.services is 'Servicios de JRM Corp (gestionables desde el panel admin)';

-- ---------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------
alter table public.services enable row level security;

drop policy if exists "Ver servicios activos" on public.services;
create policy "Ver servicios activos"
  on public.services for select
  using (is_active = true);

drop policy if exists "Admin ve todos los servicios" on public.services;
create policy "Admin ve todos los servicios"
  on public.services for select
  using (public.is_admin());

drop policy if exists "Admin crea servicios" on public.services;
create policy "Admin crea servicios"
  on public.services for insert
  with check (public.is_admin());

drop policy if exists "Admin edita servicios" on public.services;
create policy "Admin edita servicios"
  on public.services for update
  using (public.is_admin());

drop policy if exists "Admin elimina servicios" on public.services;
create policy "Admin elimina servicios"
  on public.services for delete
  using (public.is_admin());

drop trigger if exists services_updated_at on public.services;
create trigger services_updated_at
  before update on public.services
  for each row execute function public.handle_updated_at();

-- ---------------------------------------------------------------------
-- Datos iniciales (los 4 servicios actuales)
-- ---------------------------------------------------------------------
insert into public.services
  (slug, title, tagline, short_description, description, icon, accent, price, benefits, features, sort_order)
values
  (
    'diseno-web',
    'Diseño de Páginas Web',
    'Sitios que convierten visitantes en clientes',
    'Páginas web modernas, rápidas y responsivas, diseñadas para destacar tu marca y generar resultados.',
    'Creamos experiencias digitales a medida: landing pages, sitios corporativos y tiendas en línea con diseño premium, optimización SEO y máxima velocidad.',
    'globe', '#3f6fc2', 499,
    array['Diseño 100% responsive', 'Optimización SEO y carga rápida', 'Identidad visual de marca', 'Panel de administración'],
    array['Landing pages y sitios corporativos', 'Tiendas en línea', 'Integración con redes y formularios', 'Mantenimiento y soporte'],
    1
  ),
  (
    'marketing-digital',
    'Marketing Digital',
    'Estrategias que hacen crecer tu negocio',
    'Campañas de publicidad, gestión de redes y estrategias de contenido para aumentar tu alcance y ventas.',
    'Impulsamos tu marca con estrategias de marketing basadas en datos: publicidad en redes y Google, gestión de comunidades, contenido y embudos de venta.',
    'megaphone', '#6a5cc8', 299,
    array['Mayor alcance de marca', 'Campañas optimizadas por retorno', 'Reportes claros de resultados', 'Crecimiento de comunidad'],
    array['Publicidad en Meta y Google Ads', 'Gestión de redes sociales', 'Creación de contenido', 'Email marketing y embudos'],
    2
  ),
  (
    'productora-musical',
    'Productora Musical',
    'Tu sonido, llevado al siguiente nivel',
    'Producción, grabación y mezcla profesional para artistas y proyectos audiovisuales.',
    'Nuestro estudio acompaña a artistas y marcas en todo el proceso creativo: composición, grabación, mezcla, masterización y videos musicales.',
    'music', '#c8568f', 399,
    array['Estudio con equipo profesional', 'Acompañamiento creativo integral', 'Mezcla y masterización de calidad', 'Distribución digital'],
    array['Grabación y producción musical', 'Mezcla y masterización', 'Videos musicales y audiovisuales', 'Distribución digital'],
    3
  ),
  (
    'asesoramiento-empresarial',
    'Asesoramiento Empresarial',
    'Decisiones estratégicas con respaldo experto',
    'Consultoría para optimizar procesos, finanzas y crecimiento de tu empresa.',
    'Asesoramos a emprendedores y empresas en planificación estratégica, optimización de procesos, finanzas y transformación digital.',
    'briefcase', '#2c9e7e', 249,
    array['Diagnóstico empresarial completo', 'Planes de crecimiento accionables', 'Optimización de costos', 'Acompañamiento continuo'],
    array['Planificación estratégica', 'Consultoría financiera y operativa', 'Transformación digital', 'Capacitación de equipos'],
    4
  )
on conflict (slug) do nothing;

-- =====================================================================
-- ALMACENAMIENTO (Storage) · imágenes de los servicios
-- =====================================================================
insert into storage.buckets (id, name, public)
values ('service-media', 'service-media', true)
on conflict (id) do nothing;

drop policy if exists "Media de servicios publica" on storage.objects;
create policy "Media de servicios publica"
  on storage.objects for select
  using (bucket_id = 'service-media');

drop policy if exists "Admin sube media" on storage.objects;
create policy "Admin sube media"
  on storage.objects for insert
  with check (bucket_id = 'service-media' and public.is_admin());

drop policy if exists "Admin actualiza media" on storage.objects;
create policy "Admin actualiza media"
  on storage.objects for update
  using (bucket_id = 'service-media' and public.is_admin());

drop policy if exists "Admin elimina media" on storage.objects;
create policy "Admin elimina media"
  on storage.objects for delete
  using (bucket_id = 'service-media' and public.is_admin());
