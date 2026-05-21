"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import type { Group } from "three";

/* =====================================================================
   SceneHero · Cristal 3D animado para el Hero (three.js / R3F).
   ===================================================================== */

function Crystal() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.z += delta * 0.05;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.3}>
      <group ref={group}>
        {/* Núcleo orgánico con distorsión */}
        <Icosahedron args={[1.45, 4]}>
          <MeshDistortMaterial
            color="#7ba3de"
            distort={0.4}
            speed={2.4}
            roughness={0.22}
            metalness={0.3}
          />
        </Icosahedron>
        {/* Estructura alámbrica exterior */}
        <Icosahedron args={[1.95, 1]}>
          <meshBasicMaterial
            color="#8fb4e3"
            wireframe
            transparent
            opacity={0.22}
          />
        </Icosahedron>
      </group>
    </Float>
  );
}

export default function SceneHero() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-5, -2, 3]} intensity={2.4} color="#8fb4e3" />
      <pointLight position={[4, -4, -3]} intensity={1.8} color="#5681c9" />
      <Crystal />
    </Canvas>
  );
}
