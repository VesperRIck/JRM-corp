import type { Metadata } from "next";
import Link from "next/link";
import { CircleAlert, CircleCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCurrency, formatLongDate } from "@/lib/format";
import { recordPaymentFromSession } from "@/lib/services/payments";

export const metadata: Metadata = { title: "Pago confirmado" };

export default async function PagoExitoPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const payment = session_id
    ? await recordPaymentFromSession(session_id)
    : null;

  if (!payment) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-amber-100 text-amber-700">
          <CircleAlert className="size-9" />
        </div>
        <h1 className="mt-5 font-display text-2xl font-bold text-foreground">
          No pudimos confirmar el pago
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Si el cobro se realizó, aparecerá en tu historial. Si acabas de
          configurar Stripe, verifica las claves en el archivo .env.local.
        </p>
        <Button asChild variant="gradient" className="mt-6">
          <Link href="/panel/pagos">Ir a mis pagos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center">
      <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
        <CircleCheck className="size-9" />
      </div>
      <h1 className="mt-5 font-display text-2xl font-bold text-foreground">
        ¡Pago realizado!
      </h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Tu pago se procesó correctamente. Gracias por confiar en JRM Corp.
      </p>

      <dl className="mt-6 space-y-2 rounded-xl bg-secondary/60 p-4 text-left text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Servicio</dt>
          <dd className="font-medium text-foreground">
            {payment.service_title}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Monto</dt>
          <dd className="font-medium text-foreground">
            {formatCurrency(payment.amount, payment.currency)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Fecha</dt>
          <dd className="text-right font-medium capitalize text-foreground">
            {formatLongDate(payment.created_at)}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Button asChild variant="gradient" className="flex-1">
          <Link href={`/panel/pagos/${payment.id}`}>Ver factura</Link>
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link href="/panel/pagos">Mis pagos</Link>
        </Button>
      </div>
    </div>
  );
}
