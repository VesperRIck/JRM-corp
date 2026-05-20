import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceIcon } from "@/components/shared/service-icon";
import { services } from "@/config/services";

/* =====================================================================
   Sección "Servicios" · Tarjetas con iconos 3D animados.
   Cada tarjeta enlaza a la página individual del servicio.
   ===================================================================== */

export function Services() {
  return (
    <section id="servicios" className="scroll-mt-20 bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Servicios"
          title="Lo que hacemos por ti"
          description="Soluciones integrales para impulsar tu marca y tu negocio."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.08}>
              <Link
                href={`/servicios/${service.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-2 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
              >
                <ServiceIcon icon={service.icon} accent={service.accent} />

                <h3 className="mt-5 font-display text-lg font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-brand-deep">
                  {service.tagline}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.shortDescription}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-deep">
                  Ver servicio
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
