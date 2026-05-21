"use client";

import dynamic from "next/dynamic";

/* Carga la escena 3D solo en el cliente */
const SceneObjects = dynamic(() => import("@/components/three/scene-objects"), {
  ssr: false,
  loading: () => null,
});

export function Objects3D() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-70"
      aria-hidden
    >
      <SceneObjects />
    </div>
  );
}
