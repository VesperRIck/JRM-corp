import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarCheck, Check, CirclePlay } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceIcon } from "@/components/shared/service-icon";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getServiceBySlug, serviceSlugs } from "@/config/services";

/* =====================================================================
   Página individual de servicio · /servicios/[slug]
   ===================================================================== */

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

/** Genera estáticamente una página por cada servicio */
export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Servicio no encontrado" };
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      {/* ---------- Encabezado ---------- */}
      <header className="relative overflow-hidden bg-brand-ink pb-16 pt-28 text-white">
        <div className="bg-grid absolute inset-0 opacity-20" aria-hidden />
        <div
          className="blur-orb absolute -right-16 top-0 size-80 rounded-full"
          style={{ backgroundColor: service.accent }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal>
            <Link
              href="/#servicios"
              className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Volver a servicios
            </Link>
          </Reveal>

          <div className="mt-7 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <ServiceIcon
              icon={service.icon}
              accent={service.accent}
              size="lg"
            />
            <div>
              <Badge variant="glass">{service.tagline}</Badge>
              <h1 className="mt-2.5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                {service.title}
              </h1>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
            {service.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="gradient" size="lg">
              <Link href="/#contacto">
                <CalendarCheck className="size-4" />
                Agendar cita
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link href="/#contacto">Solicitar información</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ---------- Beneficios y características ---------- */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Beneficios
              </h2>
              <ul className="mt-5 space-y-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-3" />
                    </span>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-display text-2xl font-bold text-foreground">
                ¿Qué incluye?
              </h2>
              <ul className="mt-5 space-y-3">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Video del servicio ---------- */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <h2 className="text-center font-display text-2xl font-bold text-foreground">
              Conoce más sobre este servicio
            </h2>
            <ImagePlaceholder
              label="Video del servicio"
              icon={<CirclePlay className="size-6" />}
              className="mt-6 aspect-video w-full"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------- Portafolio ---------- */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Portafolio"
            title="Proyectos realizados"
            description="Una muestra del trabajo que hemos desarrollado en este servicio."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n, i) => (
              <Reveal key={n} delay={i * 0.06}>
                <ImagePlaceholder
                  label={`Proyecto ${n}`}
                  className="aspect-[4/3] w-full"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Llamado a la acción ---------- */}
      <section className="relative overflow-hidden bg-brand-ink py-20 text-white">
        <div className="bg-grid absolute inset-0 opacity-20" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight">
              ¿Listo para empezar?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/65">
              Agenda una cita con nuestro equipo y conversemos sobre tu
              proyecto de {service.title.toLowerCase()}.
            </p>
            <Button asChild variant="gradient" size="xl" className="mt-7">
              <Link href="/#contacto">
                <CalendarCheck className="size-4" />
                Agendar cita
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
