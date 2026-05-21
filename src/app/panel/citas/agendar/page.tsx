import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { BookingForm } from "@/components/panel/booking-form";

export const metadata: Metadata = { title: "Agendar cita" };

export default async function AgendarCitaPage({
  searchParams,
}: {
  searchParams: Promise<{ servicio?: string }>;
}) {
  const { servicio } = await searchParams;

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/panel/citas"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Volver a mis citas
        </Link>
        <h1 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">
          Agendar una cita
        </h1>
        <p className="mt-1 text-muted-foreground">
          Selecciona el servicio, la fecha y la hora que prefieras.
        </p>
      </div>

      <BookingForm defaultService={servicio} />
    </div>
  );
}
