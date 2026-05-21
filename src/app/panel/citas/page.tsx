import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Mis Citas" };

export default function PanelCitasPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          Mis Citas
        </h1>
        <p className="mt-1 text-muted-foreground">
          Gestiona tus citas con el equipo de JRM Corp.
        </p>
      </div>

      <EmptyState
        icon={<CalendarCheck className="size-7" />}
        title="Aún no tienes citas agendadas"
        description="Cuando reserves una cita con nuestro equipo, aparecerá aquí con su fecha y estado."
        action={
          <Button asChild variant="gradient">
            <Link href="/panel/servicios">
              <CalendarCheck className="size-4" />
              Agendar una cita
            </Link>
          </Button>
        }
      />
    </div>
  );
}
