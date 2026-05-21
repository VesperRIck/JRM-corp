import { z } from "zod";

/* =====================================================================
   Validación de edición de perfil (Zod)
   ===================================================================== */

export const profileSchema = z.object({
  fullName: z
    .string()
    .min(3, "Ingresa tu nombre completo")
    .max(80, "El nombre es demasiado largo"),
  phone: z
    .string()
    .min(7, "Número de celular no válido")
    .max(20, "Número de celular no válido")
    .regex(/^[0-9+()\s-]+$/, "El celular solo puede contener números"),
  cedula: z
    .string()
    .min(6, "Cédula no válida")
    .max(20, "Cédula no válida")
    .regex(/^[0-9]+$/, "La cédula solo puede contener números"),
});

export type ProfileInput = z.infer<typeof profileSchema>;
