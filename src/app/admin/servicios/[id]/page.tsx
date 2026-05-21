import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { ServiceForm } from "@/components/admin/service-form";
import { getServiceById } from "@/lib/services/services-data";

export const metadata: Metadata = { title: "Editar servicio" };

export default async function EditarServicioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) notFound();

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
          Editar servicio
        </h1>
        <p className="mt-1 text-muted-foreground">{service.title}</p>
      </div>

      <ServiceForm service={service} />
    </div>
  );
}
