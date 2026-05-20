import {
  BadgeCheck,
  Briefcase,
  Eye,
  Globe,
  Handshake,
  Megaphone,
  Music,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/* =====================================================================
   Mapa de iconos · Convierte las claves de texto usadas en `config/`
   (servicios, valores) en componentes de icono de lucide-react.
   ===================================================================== */

const iconMap: Record<string, LucideIcon> = {
  globe: Globe,
  megaphone: Megaphone,
  music: Music,
  briefcase: Briefcase,
  sparkles: Sparkles,
  handshake: Handshake,
  "badge-check": BadgeCheck,
  eye: Eye,
};

export function getIcon(key: string): LucideIcon {
  return iconMap[key] ?? Sparkles;
}
