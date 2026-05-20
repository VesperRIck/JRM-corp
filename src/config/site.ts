/* =====================================================================
   JRM Corp · Configuración central del sitio
   --------------------------------------------------------------------
   Edita aquí los datos globales de la empresa. Los valores marcados
   con "PLACEHOLDER" deben reemplazarse por la información real.
   ===================================================================== */

export const siteConfig = {
  name: "JRM Corp",
  legalName: "JRM Corp",

  /** PLACEHOLDER — eslogan corporativo */
  slogan: "Transformamos ideas en resultados digitales y empresariales",

  description:
    "JRM Corp es una empresa de servicios digitales y empresariales: diseño de páginas web, marketing digital, productora musical y asesoramiento empresarial.",

  /** PLACEHOLDER — dominio real del sitio en producción */
  url: "https://jrmcorp.com",

  /** PLACEHOLDER — datos de contacto */
  email: "contacto@jrmcorp.com",
  phone: "+593 99 000 0000",

  foundedYear: 2020,
  locale: "es",

  /** PLACEHOLDER — video institucional (URL de YouTube embed) */
  institutionalVideo: "https://www.youtube.com/embed/ScMzIvxBSi4",
} as const;

export type SiteConfig = typeof siteConfig;
