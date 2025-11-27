"use client";

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import { easing } from 'maath';

export default function FluidGlass({ 
  lensProps = {} // Recibimos tus configuraciones aquí
}) {
  
  // Valores por defecto si no pasas nada
  const defaultProps = {
    scale: 0.5,
    ior: 1.2,
    thickness: 3.0,
    chromaticAberration: 0.04,
    anisotropy: 0.1,
    roughness: 0,
    transmission: 1,
    color: "#ffffff",
    ...lensProps // Sobrescribimos con lo que tú mandes
  };

  return (
    <Canvas
      eventSource={typeof document !== 'undefined' && document.body}
      eventPrefix="client"
      camera={{ position: [0, 0, 20], fov: 15 }}
      gl={{ alpha: true }}
    >
      <GlassShape config={defaultProps} />
      {/* El entorno es vital para que el vidrio brille */}
      <Environment preset="city" /> 
    </Canvas>
  );
}

function GlassShape({ config }) {
  const ref = useRef();
  // Cargamos el modelo. Asegúrate de que la ruta sea correcta en tu carpeta public
  const { nodes } = useGLTF("/assets/3d/lens.glb");

  useFrame((state, delta) => {
    const { pointer, viewport, camera } = state;
    
    // Lógica de seguimiento suave del mouse
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    const destX = (pointer.x * v.width) / 2;
    const destY = (pointer.y * v.height) / 2;

    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);
    // Pequeña rotación al mover
    easing.dampE(ref.current.rotation, [pointer.y * 0.5, pointer.x * 0.5, 0], 0.15, delta);
  });

  return (
    <mesh
      ref={ref}
      // Si el GLB falla, usa geometry={undefined} y pon <sphereGeometry /> dentro
      geometry={nodes?.Cylinder?.geometry} 
      rotation-x={Math.PI / 2}
      scale={config.scale} // Aquí aplicamos tu escala
    >
      {/* Si no tienes el GLB, descomenta esto: */}
      {/* <cylinderGeometry args={[1, 1, 0.5, 32]} /> */}

      <MeshTransmissionMaterial
        // Pasamos todas las propiedades dinámicamente
        ior={config.ior}
        thickness={config.thickness}
        chromaticAberration={config.chromaticAberration}
        anisotropy={config.anisotropy}
        roughness={config.roughness}
        transmission={config.transmission}
        color={config.color}
      />
    </mesh>
  );
}