"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Group } from "three";

/* =====================================================================
   SceneService · Figura 3D para la página de cada servicio.
   La forma cambia según el servicio.
   ===================================================================== */

export type ServiceShape = "sphere" | "cone" | "torus" | "box";

function geometryFor(kind: ServiceShape) {
  switch (kind) {
    case "cone":
      return <coneGeometry args={[1.1, 2.2, 56]} />;
    case "torus":
      return <torusGeometry args={[1.05, 0.4, 28, 80]} />;
    case "box":
      return <dodecahedronGeometry args={[1.35, 0]} />;
    default:
      return <icosahedronGeometry args={[1.35, 3]} />;
  }
}

function Figure({ kind, color }: { kind: ServiceShape; color: string }) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.3;
    group.current.rotation.x += delta * 0.1;
  });

  return (
    <Float speed={1.7} rotationIntensity={0.5} floatIntensity={1.5}>
      <group ref={group}>
        <mesh>
          {geometryFor(kind)}
          <meshStandardMaterial
            color={color}
            roughness={0.3}
            metalness={0.35}
          />
        </mesh>
        <mesh scale={1.4}>
          {geometryFor(kind)}
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={0.16}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function SceneService({
  kind,
  color,
}: {
  kind: ServiceShape;
  color: string;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={2.6} color={color} />
      <pointLight position={[3, 3, -2]} intensity={1.4} color="#8fb4e3" />
      <Figure kind={kind} color={color} />
    </Canvas>
  );
}
