import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, Plus } from "lucide-react";

import { ServiceAdminRow } from "@/components/admin/service-admin-row";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { getAllServices } from "@/lib/services/services-data";

export const metadata: Metadata = { title: "Servicios" };

export default async function AdminServiciosPage() {
  const services = await getAllServices();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Servicios
          </h1>
          <p className="mt-1 text-muted-foreground">
            Crea, edita, suspende o elimina los servicios de la plataforma.
          </p>
        </div>
        <Button asChild variant="gradient">
          <Link href="/admin/servicios/nuevo">
            <Plus className="size-4" />
            Nuevo servicio
          </Link>
        </Button>
      </div>

      {services.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="size-7" />}
          title="Aún no hay servicios"
          description="Crea el primer servicio o ejecuta el script services.sql en Supabase."
          action={
            <Button asChild variant="gradient">
              <Link href="/admin/servicios/nuevo">
                <Plus className="size-4" />
                Crear servicio
              </Link>
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {services.map((service) => (
            <ServiceAdminRow key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
