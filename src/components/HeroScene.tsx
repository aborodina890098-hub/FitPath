import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

export function NeuralDumbbell() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        {/* Central "Brain" Core */}
        <Sphere args={[1, 64, 64]} ref={meshRef}>
          <MeshDistortMaterial
            color="#0066FF"
            speed={3}
            distort={0.4}
            radius={1}
            emissive="#00F0FF"
            emissiveIntensity={0.5}
          />
        </Sphere>
        
        {/* Dumbbell-like rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.05, 16, 100]} />
          <meshStandardMaterial color="#00FF94" emissive="#00FF94" emissiveIntensity={2} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.8, 0.02, 16, 100]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1} />
        </mesh>
      </Float>
      
      {/* Lighting */}
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00F0FF" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#00FF94" />
      <ambientLight intensity={0.2} />
    </group>
  );
}

export function Scene() {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <React.Suspense fallback={null}>
        <NeuralDumbbell />
        <Environment preset="city" />
      </React.Suspense>
    </>
  );
}
