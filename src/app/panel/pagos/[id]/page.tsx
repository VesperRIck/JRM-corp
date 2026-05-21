import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { PrintButton } from "@/components/panel/print-button";
import { Logo } from "@/components/shared/logo";
import { getCurrentProfile } from "@/lib/auth/dal";
import { siteConfig } from "@/config/site";
import { formatCurrency, formatLongDate } from "@/lib/format";
import { getPaymentById } from "@/lib/services/payments";

export const metadata: Metadata = { title: "Factura" };

export default async function FacturaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const payment = await getPaymentById(id);
  if (!payment) notFound();

  const profile = await getCurrentProfile();
  const total = formatCurrency(payment.amount, payment.currency);

  return (
    <div className="space-y-6">
      {/* Acciones (se ocultan al imprimir) */}
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link
          href="/panel/pagos"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Volver a mis pagos
        </Link>
        <PrintButton />
      </div>

      {/* Factura */}
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8">
        <div className="flex items-start justify-between gap-4">
          <Logo href={null} />
          <div className="text-right">
            <p className="font-display text-lg font-bold text-foreground">
              Factura
            </p>
            <p className="text-xs text-muted-foreground">
              N.º {payment.id.slice(0, 8).toUpperCase()}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="font-semibold text-foreground">Emitida por</p>
            <p className="text-muted-foreground">{siteConfig.legalName}</p>
            <p className="text-muted-foreground">{siteConfig.email}</p>
          </div>
          <div className="sm:text-right">
            <p className="font-semibold text-foreground">Cliente</p>
            <p className="text-muted-foreground">
              {profile?.full_name ?? "Cliente"}
            </p>
            <p className="text-muted-foreground">{profile?.email ?? ""}</p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-border">
          <div className="flex justify-between bg-secondary/60 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <span>Descripción</span>
            <span>Monto</span>
          </div>
          <div className="flex justify-between px-4 py-3.5 text-sm">
            <span className="text-foreground">{payment.service_title}</span>
            <span className="font-medium text-foreground">{total}</span>
          </div>
          <div className="flex justify-between border-t border-border px-4 py-3.5">
            <span className="font-bold text-foreground">Total pagado</span>
            <span className="font-display text-lg font-bold text-foreground">
              {total}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="text-muted-foreground">
            Fecha:{" "}
            <span className="capitalize text-foreground">
              {formatLongDate(payment.created_at)}
            </span>
          </span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Pagado
          </span>
        </div>

        <p className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          Gracias por confiar en {siteConfig.name}. Este documento es un
          comprobante de pago.
        </p>
      </div>
    </div>
  );
}
