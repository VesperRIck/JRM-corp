/* =====================================================================
   Configuración de Supabase
   Lee las variables de entorno públicas y expone un indicador de si
   Supabase está correctamente configurado.
   ===================================================================== */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** `true` cuando ambas variables de entorno de Supabase están definidas */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
