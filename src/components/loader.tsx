import { Text } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

function AnimatedText({
  text,
  position = [0, 0, 0],
  delay = 0,
  duration = 4,
}: {
  text: string;
  position?: [number, number, number];
  delay?: number;
  duration?: number;
}) {
  const textRef = useRef<THREE.Group>(null);
  const opacityRef = useRef(0);

  useFrame((state) => {
    if (textRef.current) {
      const time = state.clock.elapsedTime - delay;

      // Calculate opacity based on animation phase
      if (time >= 0 && time <= duration) {
        // Fade in during first second
        if (time < 1) {
          opacityRef.current = time;
        }
        // Stay visible for duration - 2 seconds
        else if (time < duration - 1) {
          opacityRef.current = 1;
        }
        // Fade out during last second
        else {
          opacityRef.current = Math.max(0, 1 - (time - (duration - 1)));
        }
      }

      // Floating animation
      textRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + position[1];

      // Update material opacity
      // @ts-ignore
      const material = textRef.current.children[0].material as THREE.Material;
      material.opacity = opacityRef.current;
    }
  });

  return (
    <group ref={textRef} position={position}>
      <Text
        fontSize={1.5}
        maxWidth={45}
        lineHeight={1.5}
        letterSpacing={0.05}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="./fonts/SpaceMono-Bold.ttf"
        material-transparent
        material-opacity={0}
      >
        {text}
      </Text>
    </group>
  );
}

function CameraAnimation() {
  const { camera } = useThree();

  useEffect(() => {
    // Initial camera position
    camera.position.set(0, 0, 50);

    const tl = gsap.timeline({
      repeat: -1,
    });

    tl.to(camera.position, {
      z: -100,
      duration: 16,
      ease: 'power1.inOut',
      onComplete: () => {
        camera.position.z = 50;
      },
    });

    return () => {
      tl.kill();
    };
  }, [camera]);

  return null;
}

export function Loader() {
  return (
    <>
      <CameraAnimation />
      {/* <AnimatedStars /> */}
      <group>
        <AnimatedText
          text="Initiating cosmic alignment..."
          position={[0, 0.5, 0]}
          delay={0}
          duration={4}
        />
        <AnimatedText
          text="Loading the stars, one by one..."
          position={[0, 0.5, -50]}
          delay={4}
          duration={4}
        />
        <AnimatedText
          text="Your journey through the universe of creativity is about to begin..."
          position={[0, 0.5, -100]}
          delay={8}
          duration={4}
        />
        <AnimatedText
          text="Hold on tight, you're about to explore new dimensions."
          position={[0, 0.5, -150]}
          delay={12}
          duration={4}
        />
      </group>
    </>
  );
}
