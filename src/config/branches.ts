import type { Branch } from "@/types";

/* =====================================================================
   JRM Corp · Sucursales
   PLACEHOLDER — reemplaza direcciones, horarios, teléfonos y mapas.
   Para `mapEmbed` usa: https://www.google.com/maps?q=DIRECCION&output=embed
   ===================================================================== */

export const branches: Branch[] = [
  {
    id: "matriz",
    name: "JRM Corp · Matriz",
    address: "Av. Principal 123 y Calle Secundaria",
    city: "Quito, Ecuador",
    schedule: "Lunes a Viernes: 09:00 - 18:00 · Sábados: 09:00 - 13:00",
    phone: "+593 99 000 0001",
    email: "matriz@jrmcorp.com",
    mapUrl: "https://www.google.com/maps?q=Quito+Ecuador",
    mapEmbed: "https://www.google.com/maps?q=Quito+Ecuador&output=embed",
  },
  {
    id: "sucursal-sur",
    name: "JRM Corp · Sucursal Sur",
    address: "Av. del Sur 456 y Avenida Central",
    city: "Guayaquil, Ecuador",
    schedule: "Lunes a Viernes: 09:00 - 18:00 · Sábados: 10:00 - 14:00",
    phone: "+593 99 000 0002",
    email: "sur@jrmcorp.com",
    mapUrl: "https://www.google.com/maps?q=Guayaquil+Ecuador",
    mapEmbed: "https://www.google.com/maps?q=Guayaquil+Ecuador&output=embed",
  },
];
