import type { CSSProperties } from "react";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { SocialIcon } from "@/components/shared/social-icon";
import { socialLinks, whatsappContacts, whatsappLink } from "@/config/social";
import type { SocialLink, SocialPlatform } from "@/types";

/* =====================================================================
   Sección "Redes Sociales" · Tarjetas con enlace a cada red.
   ===================================================================== */

const platformColor: Record<SocialPlatform, string> = {
  instagram: "#E1306C",
  facebook: "#1877F2",
  tiktok: "#0b0b12",
  youtube: "#FF0000",
  linkedin: "#0A66C2",
  whatsapp: "#25D366",
};

// Las redes configuradas + WhatsApp (que vive en otra parte del config)
const allSocials: SocialLink[] = [
  ...socialLinks,
  {
    platform: "whatsapp",
    label: "WhatsApp",
    href: whatsappLink(
      whatsappContacts[0].number,
      "Hola JRM Corp, quisiera más información.",
    ),
  },
];

export function Social() {
  return (
    <section id="redes" className="scroll-mt-20 bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Redes Sociales"
          title="Síguenos y conéctate"
          description="Mantente al día con nuestro contenido, proyectos y novedades."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {allSocials.map((social, i) => (
            <Reveal key={social.platform} delay={i * 0.06}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visitar ${social.label}`}
                style={{ "--pc": platformColor[social.platform] } as CSSProperties}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-brand/10"
              >
                <span className="grid size-14 place-items-center rounded-xl bg-secondary text-brand-deep transition-colors duration-300 group-hover:bg-[var(--pc)] group-hover:text-white">
                  <SocialIcon platform={social.platform} className="size-6" />
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {social.label}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
