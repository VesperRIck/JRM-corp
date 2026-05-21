/* =====================================================================
   Traduce los mensajes de error de Supabase Auth al español.
   ===================================================================== */

const messages: Record<string, string> = {
  "Invalid login credentials": "Correo o contraseña incorrectos",
  "Email not confirmed":
    "Debes confirmar tu correo electrónico antes de iniciar sesión",
  "User already registered": "Este correo electrónico ya está registrado",
  "Password should be at least 6 characters":
    "La contraseña es demasiado corta",
  "Unable to validate email address: invalid format":
    "El formato del correo electrónico no es válido",
  "Email rate limit exceeded":
    "Demasiados intentos. Inténtalo de nuevo más tarde",
  "For security purposes, you can only request this after 60 seconds":
    "Por seguridad, espera 60 segundos antes de volver a intentarlo",
  "New password should be different from the old password":
    "La nueva contraseña debe ser diferente de la anterior",
};

export function getAuthErrorMessage(message?: string): string {
  if (!message) return "Ocurrió un error inesperado. Inténtalo de nuevo.";
  return messages[message] ?? message;
}
