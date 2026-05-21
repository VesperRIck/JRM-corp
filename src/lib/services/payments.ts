import { getCurrentUser } from "@/lib/auth/dal";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe/client";
import type { Payment } from "@/types";

/* =====================================================================
   Capa de datos de pagos (lado servidor)
   ===================================================================== */

/** Devuelve los pagos del usuario autenticado (más recientes primero) */
export async function getMyPayments(): Promise<Payment[]> {
  const user = await getCurrentUser();
  if (!user) return [];

  const supabase = await createClient();
  const { data } = await supabase
    .from("payments")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (data as Payment[] | null) ?? [];
}

/** Devuelve un pago del usuario por su id (o null) */
export async function getPaymentById(id: string): Promise<Payment | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("payments")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  return (data as Payment | null) ?? null;
}

/**
 * Verifica una sesión de Stripe Checkout y registra el pago.
 * Usa el cliente service_role (omite RLS). Es idempotente: se puede
 * llamar varias veces para la misma sesión sin duplicar el pago.
 */
export async function recordPaymentFromSession(
  sessionId: string,
): Promise<Payment | null> {
  let stripe;
  let admin;
  try {
    stripe = getStripe();
    admin = createAdminClient();
  } catch {
    return null;
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return null;
  }

  if (session.payment_status !== "paid") return null;

  const meta = session.metadata ?? {};
  if (!meta.user_id) return null;

  const { data } = await admin
    .from("payments")
    .upsert(
      {
        stripe_session_id: session.id,
        user_id: meta.user_id,
        service_slug: meta.service_slug ?? null,
        service_title: meta.service_title ?? "Servicio",
        amount: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
        status: "paid",
      },
      { onConflict: "stripe_session_id" },
    )
    .select()
    .single();

  return (data as Payment | null) ?? null;
}
