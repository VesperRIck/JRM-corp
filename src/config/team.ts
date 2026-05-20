import type { Founder } from "@/types";

/* =====================================================================
   JRM Corp · Fundadores
   PLACEHOLDER — reemplaza nombres, cargos, biografías y fotos reales.
   Coloca las fotos en /public/team/ (ej. /public/team/founder-1.jpg).
   ===================================================================== */

export const founders: Founder[] = [
  {
    name: "Nombre Fundador 1",
    role: "CEO & Fundador",
    bio: "Líder visionario con amplia experiencia en negocios digitales y desarrollo de marcas.",
    photo: "/team/founder-1.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/jrmcorp",
      email: "fundador1@jrmcorp.com",
    },
  },
  {
    name: "Nombre Fundador 2",
    role: "Director Creativo & Cofundador",
    bio: "Especialista en diseño, branding y dirección de proyectos audiovisuales.",
    photo: "/team/founder-2.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/jrmcorp",
      email: "fundador2@jrmcorp.com",
    },
  },
  {
    name: "Nombre Fundador 3",
    role: "Director de Operaciones & Cofundador",
    bio: "Experto en estrategia empresarial, finanzas y optimización de procesos.",
    photo: "/team/founder-3.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/jrmcorp",
      email: "fundador3@jrmcorp.com",
    },
  },
];

/* ---------- Identidad corporativa (PLACEHOLDER) ---------- */

export const companyStory =
  "JRM Corp nació de la unión de un grupo de profesionales apasionados por la tecnología, la creatividad y los negocios. Lo que comenzó como un pequeño equipo de trabajo se transformó en una empresa integral de servicios digitales y empresariales, comprometida con el crecimiento de cada cliente.";

export const companyMission =
  "Brindar soluciones digitales y empresariales de alta calidad que impulsen el crecimiento de nuestros clientes, combinando innovación, creatividad y resultados medibles.";

export const companyVision =
  "Ser la empresa de servicios digitales y empresariales líder de la región, reconocida por su excelencia, innovación y compromiso con el éxito de cada cliente.";

export const companyValues: { title: string; description: string; icon: string }[] = [
  {
    title: "Innovación",
    description: "Adoptamos las últimas tecnologías para ofrecer soluciones de vanguardia.",
    icon: "sparkles",
  },
  {
    title: "Compromiso",
    description: "Nos involucramos con cada proyecto como si fuera propio.",
    icon: "handshake",
  },
  {
    title: "Calidad",
    description: "Cuidamos cada detalle para entregar resultados de excelencia.",
    icon: "badge-check",
  },
  {
    title: "Transparencia",
    description: "Comunicación honesta y clara en cada etapa del proceso.",
    icon: "eye",
  },
];
