import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { Service } from "@/types";

/* =====================================================================
   Capa de datos de servicios (tabla `services` de Supabase).
   ===================================================================== */

type ServiceRow = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  short_description: string;
  description: string;
  icon: string;
  accent: string;
  price: number;
  benefits: string[] | null;
  features: string[] | null;
  image_url: string | null;
  video_url: string | null;
  is_active: boolean;
};

function mapService(row: ServiceRow): Service {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    shortDescription: row.short_description,
    description: row.description,
    icon: row.icon,
    accent: row.accent,
    price: row.price,
    benefits: row.benefits ?? [],
    features: row.features ?? [],
    image: row.image_url,
    video: row.video_url,
    isActive: row.is_active,
  };
}

/** Servicios activos (visibles en la web pública), ordenados */
export async function getActiveServices(): Promise<Service[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  return ((data as ServiceRow[] | null) ?? []).map(mapService);
}

/** Todos los servicios, incluidos los suspendidos (para el admin) */
export async function getAllServices(): Promise<Service[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });
  return ((data as ServiceRow[] | null) ?? []).map(mapService);
}

/** Un servicio por su slug (o null) */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .single();
  return data ? mapService(data as ServiceRow) : null;
}

/** Un servicio por su id (o null) */
export async function getServiceById(id: string): Promise<Service | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();
  return data ? mapService(data as ServiceRow) : null;
}
