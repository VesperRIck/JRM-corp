import { z } from "zod";

/* =====================================================================
   Esquema de validación del formulario de contacto (Zod).
   ===================================================================== */

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Ingresa tu nombre completo")
    .max(80, "El nombre es demasiado largo"),
  email: z.email("Ingresa un correo electrónico válido"),
  phone: z
    .string()
    .min(7, "Ingresa un número de teléfono válido")
    .max(20, "El número es demasiado largo")
    .regex(/^[0-9+()\s-]+$/, "El teléfono solo puede contener números"),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje es demasiado largo"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
