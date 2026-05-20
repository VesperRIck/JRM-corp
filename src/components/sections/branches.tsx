import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { branches } from "@/config/branches";

/* =====================================================================
   Sección "Sucursales" · Tarjetas con mapa, dirección, horarios y contacto.
   ===================================================================== */

export function Branches() {
  return (
    <section id="sucursales" className="scroll-mt-20 bg-background py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Sucursales"
          title="Dónde encontrarnos"
          description="Visítanos en cualquiera de nuestras sucursales o contáctanos directamente."
        />

        <div className="mt-14 grid gap-7 md:grid-cols-2">
          {branches.map((branch, i) => (
            <Reveal key={branch.id} delay={i * 0.1}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10">
                {/* Mapa */}
                <div className="aspect-[16/9] border-b border-border">
                  <iframe
                    src={branch.mapEmbed}
                    title={`Mapa de ${branch.name}`}
                    className="size-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Información */}
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {branch.name}
                  </h3>

                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2.5">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-brand-deep" />
                      <span>
                        {branch.address}
                        <br />
                        {branch.city}
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Clock className="mt-0.5 size-4 shrink-0 text-brand-deep" />
                      <span>{branch.schedule}</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Phone className="size-4 shrink-0 text-brand-deep" />
                      <a
                        href={`tel:${branch.phone.replace(/\s/g, "")}`}
                        className="transition-colors hover:text-brand-deep"
                      >
                        {branch.phone}
                      </a>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Mail className="size-4 shrink-0 text-brand-deep" />
                      <a
                        href={`mailto:${branch.email}`}
                        className="transition-colors hover:text-brand-deep"
                      >
                        {branch.email}
                      </a>
                    </li>
                  </ul>

                  <Button asChild variant="outline" className="mt-6 w-full">
                    <a href={branch.mapUrl} target="_blank" rel="noreferrer">
                      <Navigation className="size-4" />
                      Cómo llegar
                    </a>
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
