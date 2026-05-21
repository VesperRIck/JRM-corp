import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PaymentCheckout } from "@/components/panel/payment-checkout";

export const metadata: Metadata = { title: "Realizar un pago" };

export default function NuevoPagoPage() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/panel/pagos"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Volver a mis pagos
        </Link>
        <h1 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">
          Realizar un pago
        </h1>
        <p className="mt-1 text-muted-foreground">
          Selecciona el servicio que deseas pagar.
        </p>
      </div>

      <PaymentCheckout />
    </div>
  );
}
