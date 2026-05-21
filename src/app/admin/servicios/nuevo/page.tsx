import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ServiceForm } from "@/components/admin/service-form";

export const metadata: Metadata = { title: "Nuevo servicio" };

export default function NuevoServicioPage() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/servicios"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Volver a servicios
        </Link>
        <h1 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">
          Nuevo servicio
        </h1>
        <p className="mt-1 text-muted-foreground">
          Completa los datos del nuevo servicio.
        </p>
      </div>

      <ServiceForm />
    </div>
  );
}
