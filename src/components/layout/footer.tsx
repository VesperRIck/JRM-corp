import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { SocialIcon } from "@/components/shared/social-icon";
import { branches } from "@/config/branches";
import { footerNav } from "@/config/navigation";
import { services } from "@/config/services";
import { siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social";

/* =====================================================================
   Footer · Pie de página corporativo (fondo oscuro).
   ===================================================================== */

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-ink text-white/65">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div>
            <Logo tone="light" />
            <p className="mt-4 text-sm leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid size-9 place-items-center rounded-lg bg-white/5 text-white/70 transition-colors hover:bg-brand hover:text-white"
                >
                  <SocialIcon platform={social.platform} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-brand-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white">
              Servicios
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="transition-colors hover:text-brand-light"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-brand-light" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-brand-light"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-brand-light" />
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-brand-light"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-light" />
                <span>{branches[0]?.city}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs sm:flex-row">
          <p>
            © {year} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <p className="text-white/45">
            Servicios digitales y empresariales · Hecho con tecnología de punta
          </p>
        </div>
      </div>
    </footer>
  );
}
