/* =====================================================================
   JRM Corp · Configuración del sistema de citas
   ===================================================================== */

/** Horarios disponibles para agendar citas (formato 24h) */
export const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
] as const;

/** Cuántos días hacia adelante se pueden agendar citas */
export const maxBookingDays = 60;
