import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import { SUPABASE_URL } from "./config";

/* =====================================================================
   Cliente de Supabase con privilegios de SERVICIO (service_role).
   Omite las políticas RLS — ÚSALO SOLO EN EL SERVIDOR y con cuidado.
   Se usa para registrar pagos verificados con Stripe.
   ===================================================================== */

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** `true` cuando la clave service_role está disponible */
export const isAdminConfigured = Boolean(SUPABASE_URL && serviceRoleKey);

export function createAdminClient() {
  if (!SUPABASE_URL || !serviceRoleKey) {
    throw new Error(
      "Falta SUPABASE_SERVICE_ROLE_KEY en .env.local para registrar pagos.",
    );
  }
  return createSupabaseClient(SUPABASE_URL, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
