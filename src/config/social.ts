import type { SocialLink, WhatsAppContact } from "@/types";

/* PLACEHOLDER — reemplaza con los enlaces reales de JRM Corp */
export const socialLinks: SocialLink[] = [
  { platform: "instagram", label: "Instagram", href: "https://instagram.com/jrmcorp" },
  { platform: "facebook", label: "Facebook", href: "https://facebook.com/jrmcorp" },
  { platform: "tiktok", label: "TikTok", href: "https://tiktok.com/@jrmcorp" },
  { platform: "youtube", label: "YouTube", href: "https://youtube.com/@jrmcorp" },
  { platform: "linkedin", label: "LinkedIn", href: "https://linkedin.com/company/jrmcorp" },
];

/*
 * PLACEHOLDER — 4 números de WhatsApp para atención personalizada.
 * Formato internacional SIN el signo "+" (ej. Ecuador: 593990000001).
 */
export const whatsappContacts: WhatsAppContact[] = [
  { area: "Ventas", agent: "Equipo Comercial", number: "593900000001" },
  { area: "Soporte", agent: "Soporte Técnico", number: "593900000002" },
  { area: "Citas", agent: "Agenda de Citas", number: "593900000003" },
  { area: "Administración", agent: "Administración", number: "593900000004" },
];

/** Construye un enlace wa.me con un mensaje opcional precargado */
export function whatsappLink(number: string, message?: string): string {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
