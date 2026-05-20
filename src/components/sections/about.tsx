import { CirclePlay, Mail, Target, Telescope } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { SocialIcon } from "@/components/shared/social-icon";
import { Badge } from "@/components/ui/badge";
import {
  companyMission,
  companyStory,
  companyValues,
  companyVision,
  founders,
} from "@/config/team";
import { siteConfig } from "@/config/site";
import { getIcon } from "@/lib/icon-map";
import type { Founder } from "@/types";

/* =====================================================================
   Sección "Sobre Nosotros"
   Historia · Misión · Visión · Valores · Fundadores · Video institucional
   ===================================================================== */

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function FounderCard({ founder }: { founder: Founder }) {
  return (
    <article className="group flex h-full flex-col items-center rounded-2xl border border-border bg-card p-7 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10">
      {/* Avatar con iniciales (reemplaza por foto real desde /public/team) */}
      <div className="relative">
        <span className="absolute -inset-1 rounded-full bg-gradient-to-br from-brand-deep to-brand opacity-0 blur transition-opacity duration-300 group-hover:opacity-60" />
        <div className="relative grid size-24 place-items-center rounded-full bg-gradient-to-br from-brand-deep to-brand font-display text-2xl font-bold text-white shadow-lg">
          {getInitials(founder.name)}
        </div>
      </div>

      <h4 className="mt-5 font-display text-lg font-bold text-foreground">
        {founder.name}
      </h4>
      <Badge variant="brand" className="mt-2">
        {founder.role}
      </Badge>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {founder.bio}
      </p>

      <div className="mt-5 flex gap-2">
        {founder.socials?.linkedin && (
          <a
            href={founder.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={`LinkedIn de ${founder.name}`}
            className="grid size-9 place-items-center rounded-lg bg-secondary text-brand-deep transition-colors hover:bg-brand hover:text-white"
          >
            <SocialIcon platform="linkedin" className="size-4" />
          </a>
        )}
        {founder.socials?.email && (
          <a
            href={`mailto:${founder.socials.email}`}
            aria-label={`Correo de ${founder.name}`}
            className="grid size-9 place-items-center rounded-lg bg-secondary text-brand-deep transition-colors hover:bg-brand hover:text-white"
          >
            <Mail className="size-4" />
          </a>
        )}
      </div>
    </article>
  );
}

export function About() {
  const yearsActive = new Date().getFullYear() - siteConfig.foundedYear;

  return (
    <section id="nosotros" className="scroll-mt-20 bg-background py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Sobre Nosotros"
          title="Conoce a JRM Corp"
          description="Una empresa creada para impulsar el crecimiento digital y empresarial de sus clientes."
        />

        {/* Historia */}
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <h3 className="font-display text-2xl font-bold text-foreground">
              Nuestra Historia
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {companyStory}
            </p>
            <div className="mt-6 flex gap-8">
              <div>
                <p className="font-display text-3xl font-bold text-gradient">
                  {siteConfig.foundedYear}
                </p>
                <p className="text-sm text-muted-foreground">Año de fundación</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-gradient">
                  +{yearsActive}
                </p>
                <p className="text-sm text-muted-foreground">
                  Años de experiencia
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal direction="left">
            <ImagePlaceholder
              label="Nuestras oficinas"
              className="aspect-[4/3] w-full"
            />
          </Reveal>
        </div>

        {/* Misión y Visión */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-card p-8">
              <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-brand-deep to-brand text-white">
                <Target className="size-6" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                Misión
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {companyMission}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-border bg-card p-8">
              <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-brand-deep to-brand text-white">
                <Telescope className="size-6" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                Visión
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {companyVision}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Valores */}
        <div className="mt-20">
          <Reveal>
            <h3 className="text-center font-display text-2xl font-bold text-foreground">
              Nuestros Valores
            </h3>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {companyValues.map((value, i) => {
              const Icon = getIcon(value.icon);
              return (
                <Reveal key={value.title} delay={i * 0.08}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/10">
                    <div className="grid size-11 place-items-center rounded-xl bg-secondary text-brand-deep transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                      <Icon className="size-5" />
                    </div>
                    <h4 className="mt-4 font-display font-bold text-foreground">
                      {value.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Fundadores */}
        <div className="mt-20">
          <Reveal>
            <h3 className="text-center font-display text-2xl font-bold text-foreground">
              Nuestros Fundadores
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
              El equipo que lidera la visión de JRM Corp.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {founders.map((founder, i) => (
              <Reveal key={founder.name} delay={i * 0.1}>
                <FounderCard founder={founder} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Video institucional */}
        <div className="mt-20">
          <Reveal>
            <div className="flex items-center justify-center gap-2 text-brand-deep">
              <CirclePlay className="size-5" />
              <h3 className="font-display text-2xl font-bold text-foreground">
                Video Institucional
              </h3>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glow mx-auto mt-6 max-w-4xl overflow-hidden rounded-2xl border border-border">
              <div className="aspect-video">
                <iframe
                  src={siteConfig.institutionalVideo}
                  title="Video institucional de JRM Corp"
                  className="size-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Galería del local */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {["Recepción", "Espacio creativo", "Sala de reuniones"].map(
            (label, i) => (
              <Reveal key={label} delay={i * 0.08}>
                <ImagePlaceholder label={label} className="aspect-[4/3] w-full" />
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
