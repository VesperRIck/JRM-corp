"use client";

import { useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Mesh } from "three";

/* =====================================================================
   SceneObjects · Grupo de figuras 3D flotantes (decorativo).
   Se usa como fondo de la sección de Servicios.
   ===================================================================== */

function Spinner({
  position,
  scale = 1,
  speed = 0.3,
  children,
}: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  children: ReactNode;
}) {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * speed;
    ref.current.rotation.y += delta * speed * 0.7;
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh ref={ref} position={position} scale={scale}>
        {children}
      </mesh>
    </Float>
  );
}

export default function SceneObjects() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 5]} intensity={1.3} color="#ffffff" />
      <pointLight position={[-5, -2, 3]} intensity={2} color="#8fb4e3" />

      <Spinner position={[-3.4, 1.6, 0]} scale={0.9} speed={0.35}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#8fb4e3" roughness={0.3} metalness={0.4} />
      </Spinner>

      <Spinner position={[3.6, -1.4, -1]} scale={1.1} speed={0.25}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#6f9ad8"
          roughness={0.25}
          metalness={0.5}
        />
      </Spinner>

      <Spinner position={[2.6, 1.9, -2]} scale={0.7} speed={0.4}>
        <torusGeometry args={[1, 0.36, 16, 40]} />
        <meshStandardMaterial color="#c3d8f5" roughness={0.3} metalness={0.4} />
      </Spinner>

      <Spinner position={[-3, -1.9, -1]} scale={0.8} speed={0.3}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#8fb4e3" wireframe transparent opacity={0.4} />
      </Spinner>
    </Canvas>
  );
}
