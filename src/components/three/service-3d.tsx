"use client";

import dynamic from "next/dynamic";

import type { ServiceShape } from "@/components/three/scene-service";

/* Carga la escena 3D solo en el cliente */
const SceneService = dynamic(
  () => import("@/components/three/scene-service"),
  { ssr: false, loading: () => null },
);

/* Cada servicio tiene su propia figura 3D */
const shapeBySlug: Record<string, ServiceShape> = {
  "diseno-web": "sphere",
  "marketing-digital": "cone",
  "productora-musical": "torus",
  "asesoramiento-empresarial": "box",
};

export function Service3D({ slug, color }: { slug: string; color: string }) {
  const kind = shapeBySlug[slug] ?? "sphere";

  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-80 md:w-3/5"
      aria-hidden
    >
      <SceneService kind={kind} color={color} />
    </div>
  );
}
