import type { NavLink } from "@/types";

/** Navegación principal de la landing page */
export const mainNav: NavLink[] = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Sucursales", href: "/#sucursales" },
  { label: "Contacto", href: "/#contacto" },
];

/** Enlaces del pie de página */
export const footerNav: NavLink[] = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Sucursales", href: "/#sucursales" },
  { label: "Contacto", href: "/#contacto" },
  { label: "Iniciar sesión", href: "/login" },
];
