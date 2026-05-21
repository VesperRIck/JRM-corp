import { z } from "zod";

/* =====================================================================
   Esquemas de validación de autenticación (Zod)
   ===================================================================== */

/** Reglas comunes para contraseñas */
const passwordSchema = z
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres")
  .regex(/[a-zA-Z]/, "Debe incluir al menos una letra")
  .regex(/[0-9]/, "Debe incluir al menos un número");

/* ---------- Inicio de sesión ---------- */
export const loginSchema = z.object({
  email: z.email("Ingresa un correo electrónico válido"),
  password: z.string().min(1, "Ingresa tu contraseña"),
});

/* ---------- Registro ---------- */
export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Ingresa tu nombre completo")
      .max(80, "El nombre es demasiado largo"),
    phone: z
      .string()
      .min(7, "Número de celular no válido")
      .max(20, "Número de celular no válido")
      .regex(/^[0-9+()\s-]+$/, "El celular solo puede contener números"),
    email: z.email("Ingresa un correo electrónico válido"),
    cedula: z
      .string()
      .min(6, "Cédula no válida")
      .max(20, "Cédula no válida")
      .regex(/^[0-9]+$/, "La cédula solo puede contener números"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

/* ---------- Recuperar contraseña ---------- */
export const forgotPasswordSchema = z.object({
  email: z.email("Ingresa un correo electrónico válido"),
});

/* ---------- Restablecer contraseña ---------- */
export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
