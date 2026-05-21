import { z } from "zod";

/* =====================================================================
   Validación del formulario de servicios (admin)
   ===================================================================== */

export const serviceSchema = z.object({
  title: z.string().min(2, "Ingresa el título del servicio").max(80),
  slug: z
    .string()
    .min(2, "Ingresa el identificador (slug)")
    .max(60)
    .regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  tagline: z.string().min(2, "Ingresa un eslogan").max(120),
  shortDescription: z
    .string()
    .min(5, "Ingresa una descripción corta")
    .max(300),
  description: z.string().min(10, "Ingresa la descripción completa"),
  icon: z.string().min(1, "Elige un icono"),
  accent: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Debe ser un color HEX, ej. #3f6fc2"),
  price: z.number().min(0, "El precio no puede ser negativo"),
  /** Beneficios y características: un elemento por línea */
  benefits: z.string(),
  features: z.string(),
  videoUrl: z.string(),
  isActive: z.boolean(),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
