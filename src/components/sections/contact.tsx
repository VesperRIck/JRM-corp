import { Mail, MessageCircle, Phone } from "lucide-react";

import { ContactForm } from "@/components/sections/contact-form";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { SocialIcon } from "@/components/shared/social-icon";
import { siteConfig } from "@/config/site";
import { whatsappContacts, whatsappLink } from "@/config/social";

/* =====================================================================
   Sección "Contacto" · Formulario + 4 números de WhatsApp.
   ===================================================================== */

export function Contact() {
  return (
    <section id="contacto" className="scroll-mt-20 bg-background py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contacto"
          title="Hablemos de tu proyecto"
          description="Escríbenos por el formulario o contáctanos directamente por WhatsApp."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Formulario */}
          <Reveal direction="right">
            <div className="rounded-2xl border border-border bg-card p-7 sm:p-8">
              <h3 className="font-display text-xl font-bold text-foreground">
                Envíanos un mensaje
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Completa el formulario y nuestro equipo te contactará.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          {/* WhatsApp + datos de contacto */}
          <Reveal direction="left">
            <div className="flex h-full flex-col">
              <h3 className="font-display text-xl font-bold text-foreground">
                Atención por WhatsApp
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Atención personalizada con nuestro equipo según tu necesidad.
              </p>

              <div className="mt-5 grid flex-1 gap-3 sm:grid-cols-2">
                {whatsappContacts.map((contact) => (
                  <a
                    key={contact.number}
                    href={whatsappLink(
                      contact.number,
                      `Hola JRM Corp, escribo al área de ${contact.area}.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#25D366]/50 hover:shadow-lg"
                  >
                    <span className="grid size-11 place-items-center rounded-xl bg-[#25D366]/10 text-[#1ba94c] transition-colors duration-300 group-hover:bg-[#25D366] group-hover:text-white">
                      <SocialIcon platform="whatsapp" className="size-5" />
                    </span>
                    <span className="mt-3 font-display font-bold text-foreground">
                      {contact.area}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {contact.agent}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1ba94c]">
                      <MessageCircle className="size-4" />
                      Chatear ahora
                    </span>
                  </a>
                ))}
              </div>

              {/* Correo y teléfono */}
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-brand/40"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-secondary text-brand-deep">
                    <Mail className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted-foreground">
                      Correo
                    </span>
                    <span className="block truncate text-sm font-medium text-foreground">
                      {siteConfig.email}
                    </span>
                  </span>
                </a>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-brand/40"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-secondary text-brand-deep">
                    <Phone className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted-foreground">
                      Teléfono
                    </span>
                    <span className="block truncate text-sm font-medium text-foreground">
                      {siteConfig.phone}
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
