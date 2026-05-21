import type { Metadata } from "next";
import { CreditCard } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";

export const metadata: Metadata = { title: "Mis Pagos" };

export default function PanelPagosPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          Mis Pagos
        </h1>
        <p className="mt-1 text-muted-foreground">
          Consulta tu historial de pagos y facturas.
        </p>
      </div>

      <EmptyState
        icon={<CreditCard className="size-7" />}
        title="Aún no tienes pagos registrados"
        description="Cuando realices un pago, tu historial y tus facturas aparecerán aquí."
      />
    </div>
  );
}
