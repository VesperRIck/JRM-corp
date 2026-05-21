/* =====================================================================
   JRM Corp · Tipos compartidos de la aplicación
   ===================================================================== */

/* ---------- Roles y usuarios ---------- */
export type UserRole = "client" | "admin";

/** Perfil de usuario almacenado en la tabla `profiles` de Supabase */
export interface Profile {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  cedula: string | null;
  role: UserRole;
  is_blocked: boolean;
  created_at: string;
  updated_at: string;
}

/* ---------- Navegación ---------- */
export interface NavLink {
  label: string;
  href: string;
}

/* ---------- Servicios ---------- */
export type ServiceSlug =
  | "diseno-web"
  | "marketing-digital"
  | "productora-musical"
  | "asesoramiento-empresarial";

export interface Service {
  slug: ServiceSlug;
  title: string;
  tagline: string;
  shortDescription: string;
  description: string;
  /** Clave de icono; se resuelve a un icono concreto en el componente */
  icon: string;
  benefits: string[];
  features: string[];
  /** Color de acento en HEX para gradientes y estados hover */
  accent: string;
}

/* ---------- Equipo / Fundadores ---------- */
export interface Founder {
  name: string;
  role: string;
  bio: string;
  /** Ruta de la foto en /public o URL absoluta */
  photo: string;
  socials?: Partial<Record<"linkedin" | "instagram" | "email", string>>;
}

/* ---------- Sucursales ---------- */
export interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  schedule: string;
  phone: string;
  email: string;
  /** Enlace para abrir la ubicación en Google Maps */
  mapUrl: string;
  /** URL de incrustación (iframe) de Google Maps */
  mapEmbed: string;
}

/* ---------- Redes sociales y contacto ---------- */
export type SocialPlatform =
  | "instagram"
  | "facebook"
  | "tiktok"
  | "youtube"
  | "linkedin"
  | "whatsapp";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface WhatsAppContact {
  /** Área de atención (Ventas, Soporte, etc.) */
  area: string;
  agent: string;
  /** Número en formato internacional SIN el signo + (para enlaces wa.me) */
  number: string;
}
