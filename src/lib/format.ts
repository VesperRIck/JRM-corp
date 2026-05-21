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

/** Convierte una fecha "YYYY-MM-DD", un timestamp ISO o un Date a Date */
function toDate(value: string | Date): Date {
  if (value instanceof Date) return value;
  return value.length === 10 ? parseISODate(value) : new Date(value);
}

/** Formatea una fecha larga en español: "lunes, 25 de mayo de 2026" */
export function formatLongDate(value: string | Date): string {
  const date = toDate(value);
  return new Intl.DateTimeFormat("es", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Formatea una fecha corta en español: "25 may 2026" */
export function formatShortDate(value: string | Date): string {
  const date = toDate(value);
  return new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/** Formatea un monto en centavos como moneda: 49900 -> "$499,00" */
export function formatCurrency(cents: number, currency = "usd"): string {
  return new Intl.NumberFormat("es", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

/** Formatea un precio en dólares (no centavos): 499 -> "$499,00" */
export function formatPrice(dollars: number): string {
  return new Intl.NumberFormat("es", {
    style: "currency",
    currency: "USD",
  }).format(dollars);
}
