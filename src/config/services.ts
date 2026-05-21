import type { Service, ServiceSlug } from "@/types";

/* =====================================================================
   JRM Corp · Catálogo de servicios
   Cada servicio tendrá su propia página en /servicios/[slug].
   ===================================================================== */

export const services: Service[] = [
  {
    slug: "diseno-web",
    title: "Diseño de Páginas Web",
    tagline: "Sitios que convierten visitantes en clientes",
    shortDescription:
      "Páginas web modernas, rápidas y responsivas, diseñadas para destacar tu marca y generar resultados.",
    description:
      "Creamos experiencias digitales a medida: landing pages, sitios corporativos y tiendas en línea con diseño premium, optimización SEO y máxima velocidad. Cada proyecto se construye pensando en tu identidad de marca y en convertir visitas en clientes.",
    icon: "globe",
    accent: "#3f6fc2",
    price: 499,
    benefits: [
      "Diseño 100% responsive (móvil, tablet y escritorio)",
      "Optimización SEO y carga ultrarrápida",
      "Identidad visual alineada a tu marca",
      "Panel de administración de contenidos",
    ],
    features: [
      "Landing pages y sitios corporativos",
      "Tiendas en línea (e-commerce)",
      "Integración con redes y formularios",
      "Mantenimiento y soporte continuo",
    ],
  },
  {
    slug: "marketing-digital",
    title: "Marketing Digital",
    tagline: "Estrategias que hacen crecer tu negocio",
    shortDescription:
      "Campañas de publicidad, gestión de redes y estrategias de contenido para aumentar tu alcance y ventas.",
    description:
      "Impulsamos tu marca con estrategias de marketing basadas en datos: publicidad en redes sociales y Google, gestión profesional de comunidades, creación de contenido y embudos de venta. Medimos cada resultado para maximizar tu retorno de inversión.",
    icon: "megaphone",
    accent: "#6a5cc8",
    price: 299,
    benefits: [
      "Mayor alcance y reconocimiento de marca",
      "Campañas optimizadas por retorno de inversión",
      "Reportes claros de resultados",
      "Crecimiento sostenido de comunidad",
    ],
    features: [
      "Publicidad en Meta Ads y Google Ads",
      "Gestión de redes sociales",
      "Creación de contenido y copywriting",
      "Email marketing y embudos de venta",
    ],
  },
  {
    slug: "productora-musical",
    title: "Productora Musical",
    tagline: "Tu sonido, llevado al siguiente nivel",
    shortDescription:
      "Producción, grabación y mezcla profesional para artistas y proyectos audiovisuales.",
    description:
      "Nuestro estudio acompaña a artistas y marcas en todo el proceso creativo: composición, grabación, mezcla, masterización y producción de videos musicales. Equipo profesional y un equipo creativo para que tu proyecto suene como lo imaginaste.",
    icon: "music",
    accent: "#c8568f",
    price: 399,
    benefits: [
      "Estudio con equipo profesional",
      "Acompañamiento creativo integral",
      "Mezcla y masterización de calidad",
      "Distribución en plataformas digitales",
    ],
    features: [
      "Grabación y producción musical",
      "Mezcla y masterización",
      "Videos musicales y audiovisuales",
      "Distribución digital (Spotify, YouTube)",
    ],
  },
  {
    slug: "asesoramiento-empresarial",
    title: "Asesoramiento Empresarial",
    tagline: "Decisiones estratégicas con respaldo experto",
    shortDescription:
      "Consultoría para optimizar procesos, finanzas y crecimiento de tu empresa.",
    description:
      "Asesoramos a emprendedores y empresas en planificación estratégica, optimización de procesos, finanzas y transformación digital. Te ayudamos a tomar decisiones informadas y a escalar tu negocio con bases sólidas.",
    icon: "briefcase",
    accent: "#2c9e7e",
    price: 249,
    benefits: [
      "Diagnóstico empresarial completo",
      "Planes de crecimiento accionables",
      "Optimización de costos y procesos",
      "Acompañamiento profesional continuo",
    ],
    features: [
      "Planificación estratégica",
      "Consultoría financiera y operativa",
      "Transformación digital",
      "Capacitación de equipos",
    ],
  },
];

/** Devuelve un servicio por su slug */
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** Lista de slugs para generación estática de rutas */
export const serviceSlugs: ServiceSlug[] = services.map((s) => s.slug);
