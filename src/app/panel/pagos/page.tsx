import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard } from "lucide-react";

import { PaymentCard } from "@/components/panel/payment-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { getMyPayments } from "@/lib/services/payments";

export const metadata: Metadata = { title: "Mis Pagos" };

export default async function PanelPagosPage() {
  const payments = await getMyPayments();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Mis Pagos
          </h1>
          <p className="mt-1 text-muted-foreground">
            Consulta tu historial de pagos y facturas.
          </p>
        </div>
        {payments.length > 0 && (
          <Button asChild variant="gradient">
            <Link href="/panel/pagos/nuevo">
              <CreditCard className="size-4" />
              Realizar un pago
            </Link>
          </Button>
        )}
      </div>

      {payments.length === 0 ? (
        <EmptyState
          icon={<CreditCard className="size-7" />}
          title="Aún no tienes pagos registrados"
          description="Cuando realices un pago, tu historial y tus facturas aparecerán aquí."
          action={
            <Button asChild variant="gradient">
              <Link href="/panel/pagos/nuevo">
                <CreditCard className="size-4" />
                Realizar un pago
              </Link>
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {payments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))}
        </div>
      )}
    </div>
  );
}
