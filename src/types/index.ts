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

/* ---------- Citas ---------- */
export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export interface Appointment {
  id: string;
  user_id: string;
  service_slug: string;
  service_title: string;
  /** Fecha en formato YYYY-MM-DD */
  appointment_date: string;
  /** Hora en formato HH:MM */
  appointment_time: string;
  status: AppointmentStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

/* ---------- Pagos ---------- */
export type PaymentStatus = "paid" | "pending" | "failed" | "refunded";

export interface Payment {
  id: string;
  user_id: string;
  stripe_session_id: string;
  service_slug: string | null;
  service_title: string;
  /** Monto en centavos */
  amount: number;
  currency: string;
  status: PaymentStatus;
  created_at: string;
}

/* ---------- Navegación ---------- */
export interface NavLink {
  label: string;
  href: string;
}

/* ---------- Servicios ---------- */
export interface Service {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  description: string;
  /** Clave de icono; se resuelve a un icono concreto en el componente */
  icon: string;
  /** Color de acento en HEX */
  accent: string;
  /** Precio del servicio en dólares (USD) */
  price: number;
  benefits: string[];
  features: string[];
  /** URL de la imagen (Supabase Storage) o null */
  image: string | null;
  /** URL de video o null */
  video: string | null;
  /** Si está activo (visible en la web) o suspendido */
  isActive: boolean;
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
