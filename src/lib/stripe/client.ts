import Stripe from "stripe";

/* =====================================================================
   Cliente de Stripe (solo servidor — usa la clave secreta).
   ===================================================================== */

const secretKey = process.env.STRIPE_SECRET_KEY;

/** `true` cuando Stripe está configurado */
export const isStripeConfigured = Boolean(secretKey);

let instance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!secretKey) {
    throw new Error(
      "Stripe no está configurado. Define STRIPE_SECRET_KEY en .env.local",
    );
  }
  if (!instance) {
    instance = new Stripe(secretKey);
  }
  return instance;
}
