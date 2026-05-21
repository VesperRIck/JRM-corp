import { getCurrentUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import type { Appointment } from "@/types";

/* =====================================================================
   Capa de datos de citas (lado servidor)
   ===================================================================== */

/** Devuelve las citas del usuario autenticado (más recientes primero) */
export async function getMyAppointments(): Promise<Appointment[]> {
  const user = await getCurrentUser();
  if (!user) return [];

  const supabase = await createClient();
  const { data } = await supabase
    .from("appointments")
    .select("*")
    .eq("user_id", user.id)
    .order("appointment_date", { ascending: false })
    .order("appointment_time", { ascending: false });

  return (data as Appointment[] | null) ?? [];
}
