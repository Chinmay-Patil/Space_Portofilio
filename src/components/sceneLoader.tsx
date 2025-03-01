import { Stars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function SceneLoader() {
  const starsRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0003;
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={300}
      depth={60}
      count={5000}
      factor={6}
      saturation={0}
      fade={true}
      speed={1}
    />
  );
}
