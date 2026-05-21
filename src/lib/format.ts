/* =====================================================================
   Utilidades de fecha (sin desfase de zona horaria)
   ===================================================================== */

/** Convierte un Date a cadena "YYYY-MM-DD" en horario local */
export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Parsea "YYYY-MM-DD" a un Date en horario local */
export function parseISODate(value: string): Date {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1);
}

/** Formatea una fecha larga en español: "lunes, 25 de mayo de 2026" */
export function formatLongDate(value: string | Date): string {
  const date = typeof value === "string" ? parseISODate(value) : value;
  return new Intl.DateTimeFormat("es", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Formatea una fecha corta en español: "25 may 2026" */
export function formatShortDate(value: string | Date): string {
  const date = typeof value === "string" ? parseISODate(value) : value;
  return new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
