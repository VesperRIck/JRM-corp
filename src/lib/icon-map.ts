import {
  BadgeCheck,
  Briefcase,
  Camera,
  Code,
  Eye,
  Globe,
  Handshake,
  Headphones,
  Lightbulb,
  Megaphone,
  Monitor,
  Music,
  Palette,
  PenTool,
  Rocket,
  ShoppingBag,
  Sparkles,
  Star,
  TrendingUp,
  Video,
  Zap,
  type LucideIcon,
} from "lucide-react";

/* =====================================================================
   Mapa de iconos · Convierte las claves de texto en componentes de
   icono de lucide-react. Usado por los servicios y los valores.
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
  camera: Camera,
  code: Code,
  palette: Palette,
  rocket: Rocket,
  monitor: Monitor,
  headphones: Headphones,
  "trending-up": TrendingUp,
  lightbulb: Lightbulb,
  star: Star,
  zap: Zap,
  "shopping-bag": ShoppingBag,
  video: Video,
  "pen-tool": PenTool,
};

/** Lista de claves de icono disponibles (para selectores en el admin) */
export const iconKeys = Object.keys(iconMap);

export function getIcon(key: string): LucideIcon {
  return iconMap[key] ?? Sparkles;
}
