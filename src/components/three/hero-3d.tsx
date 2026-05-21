"use client";

import dynamic from "next/dynamic";

/* Carga la escena 3D solo en el cliente (three.js necesita WebGL) */
const SceneHero = dynamic(() => import("@/components/three/scene-hero"), {
  ssr: false,
  loading: () => null,
});

export function Hero3D() {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden
    >
      <div className="h-[120%] w-full max-w-3xl">
        <SceneHero />
      </div>
    </div>
  );
}
