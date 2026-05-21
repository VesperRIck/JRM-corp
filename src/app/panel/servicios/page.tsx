import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck } from "lucide-react";

import { ServiceIcon } from "@/components/shared/service-icon";
import { Button } from "@/components/ui/button";
import { getActiveServices } from "@/lib/services/services-data";

export const metadata: Metadata = { title: "Servicios" };

export default async function PanelServiciosPage() {
  const services = await getActiveServices();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          Servicios
        </h1>
        <p className="mt-1 text-muted-foreground">
          Explora nuestros servicios y agenda una cita.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.slug}
            className="flex flex-col rounded-2xl border border-border bg-card p-6"
          >
            <ServiceIcon icon={service.icon} accent={service.accent} />
            <h3 className="mt-4 font-display text-lg font-bold text-foreground">
              {service.title}
            </h3>
            <p className="text-sm font-medium text-brand-deep">
              {service.tagline}
            </p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {service.shortDescription}
            </p>
            <div className="mt-5 flex gap-2">
              <Button asChild variant="gradient" size="sm" className="flex-1">
                <Link href={`/panel/citas/agendar?servicio=${service.slug}`}>
                  <CalendarCheck className="size-4" />
                  Agendar
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={`/servicios/${service.slug}`}>Detalles</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
