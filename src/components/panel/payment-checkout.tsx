"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CreditCard, ShieldCheck } from "lucide-react";

import { ServiceIcon } from "@/components/shared/service-icon";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/lib/actions/payments";
import { formatPrice } from "@/lib/format";
import type { Service } from "@/types";

/* =====================================================================
   PaymentCheckout · Selección de servicio y pago con Stripe Checkout.
   ===================================================================== */

export function PaymentCheckout({ services }: { services: Service[] }) {
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);

  async function handlePay(slug: string) {
    setLoadingSlug(slug);
    const result = await createCheckoutSession(slug);

    if (result.error || !result.url) {
      toast.error("No se pudo iniciar el pago", {
        description: result.error,
      });
      setLoadingSlug(null);
      return;
    }

    // Redirige a la página de pago segura de Stripe
    window.location.href = result.url;
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.slug}
            className="flex flex-col rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <ServiceIcon icon={service.icon} accent={service.accent} />
              <span className="font-display text-2xl font-bold text-foreground">
                {formatPrice(service.price)}
              </span>
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-foreground">
              {service.title}
            </h3>
            <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
              {service.shortDescription}
            </p>
            <Button
              variant="gradient"
              className="mt-5 w-full"
              disabled={loadingSlug !== null}
              onClick={() => handlePay(service.slug)}
            >
              <CreditCard className="size-4" />
              {loadingSlug === service.slug
                ? "Redirigiendo..."
                : "Pagar con tarjeta"}
            </Button>
          </div>
        ))}
      </div>

      <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="size-4 text-brand-deep" />
        Pago seguro procesado por Stripe. No almacenamos los datos de tu
        tarjeta.
      </p>
    </div>
  );
}
