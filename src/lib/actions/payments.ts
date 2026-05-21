"use server";

import { headers } from "next/headers";

import { getCurrentUser } from "@/lib/auth/dal";
import { getServiceBySlug } from "@/lib/services/services-data";
import { getStripe } from "@/lib/stripe/client";

/* =====================================================================
   Server Action · Crea una sesión de Stripe Checkout y devuelve su URL.
   ===================================================================== */

export async function createCheckoutSession(
  serviceSlug: string,
): Promise<{ url?: string; error?: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: "Debes iniciar sesión para pagar." };

  const service = await getServiceBySlug(serviceSlug);
  if (!service) return { error: "El servicio seleccionado no es válido." };

  let stripe;
  try {
    stripe = getStripe();
  } catch {
    return {
      error: "Los pagos no están configurados. Falta STRIPE_SECRET_KEY.",
    };
  }

  // Construye la URL base a partir de la cabecera host
  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const proto = host.startsWith("localhost") ? "http" : "https";
  const origin = `${proto}://${host}`;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: Math.round(service.price * 100),
            product_data: {
              name: service.title,
              description: service.tagline,
            },
          },
        },
      ],
      customer_email: user.email,
      success_url: `${origin}/panel/pagos/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/panel/pagos/nuevo`,
      metadata: {
        user_id: user.id,
        service_slug: service.slug,
        service_title: service.title,
      },
    });

    if (!session.url) return { error: "No se pudo iniciar el pago." };
    return { url: session.url };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Ocurrió un error al crear el pago.",
    };
  }
}
