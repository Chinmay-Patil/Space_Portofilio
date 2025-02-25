import { Float, Html, Stars, Text } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

interface LoaderProps {
  onFinish?: () => void;
}

function AnimatedText({
  text,
  position = [0, 0, 0],
  delay = 0,
  duration = 4,
  isLaunched,
  startTime,
}: {
  text: string;
  position?: [number, number, number];
  delay?: number;
  duration?: number;
  isLaunched: boolean;
  startTime: number;
}) {
  if (!isLaunched) return null;

  const textRef = useRef<THREE.Group>(null);
  const opacityRef = useRef(0);
  const { camera } = useThree();

  useFrame(() => {
    if (textRef.current) {
      const elapsedTime = (Date.now() - startTime) / 1000;
      const time = elapsedTime - delay;

      // Calculate opacity based on animation phase
      if (time >= 0 && time <= duration) {
        if (time < 1) {
          opacityRef.current = time;
        } else if (time < duration - 2) {
          opacityRef.current = 1;
        } else {
          opacityRef.current = Math.max(0, 1 - (time - (duration - 1)));
        }
      } else {
        opacityRef.current = 0;
      }

      // Update position relative to camera
      textRef.current.position.z = camera.position.z - 20; // Keep text 20 units in front of camera
      textRef.current.position.y = position[1];
      textRef.current.position.x = position[0];

      // Update material opacity
      //@ts-ignore
      const material = textRef.current.children[0].material as THREE.Material;
      material.opacity = opacityRef.current;
    }
  });

  return (
    <group ref={textRef} position={position}>
      <Text
        fontSize={1.0}
        maxWidth={90}
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

function CameraAnimation({ isLaunched }: { isLaunched: boolean }) {
  const { camera } = useThree();

  if (!isLaunched) return;

  useEffect(() => {
    // Initial camera position
    camera.position.set(0, 0, 0);

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0,
    });

    tl.to(camera.position, {
      z: -700,
      duration: 30,
      ease: 'none',
      onComplete: () => {
        camera.position.z = 0;
      },
    });

    return () => {
      tl.kill();
    };
  }, [camera, isLaunched]);

  return null;
}

export const Loader: React.FC<LoaderProps> = ({ onFinish }) => {
  const [isLaunched, setIsLaunched] = useState(false);
  const [visible, setVisible] = useState(true);
  const [animationStartTime, setAnimationStartTime] = useState(0);
  const launchButtonRef = useRef<HTMLButtonElement>(null);

  const handleLaunch = () => {
    setIsLaunched(true);
    setAnimationStartTime(Date.now());
  };

  const messages: {
    text: string;
    position: [number, number, number];
    delay: number;
    duration: number;
  }[] = [
    {
      text: 'Initiating cosmic alignment...',
      position: [0, 0.5, 0],
      delay: 0,
      duration: 4,
    },
    {
      text: 'Loading the stars, one by one...',
      position: [0, 0.5, 0],
      delay: 4,
      duration: 4,
    },
    {
      text: 'Your journey through the universe of creativity is about to begin...',
      position: [0, 0.5, 0],
      delay: 8,
      duration: 4,
    },
    {
      text: "Hold on tight, you're about to explore new dimensions.",
      position: [0, 0.5, 0],
      delay: 12,
      duration: 4,
    },
    {
      text: 'Reaching In 3...',
      position: [0, 0.5, 0],
      delay: 16,
      duration: 2,
    },
    {
      text: '2...',
      position: [0, 0.5, 0],
      delay: 18,
      duration: 2,
    },
    {
      text: '1...',
      position: [0, 0.5, 0],
      delay: 20,
      duration: 2,
    },
  ];

  useEffect(() => {
    if (!isLaunched) return;

    const elapsedTime = Date.now() - animationStartTime;
    const totalDuration = 22000; // 22 seconds total animation
    const remainingTime = Math.max(totalDuration - elapsedTime, 0);

    const timeout = setTimeout(() => {
      setVisible(false);
      onFinish?.();
    }, remainingTime);

    return () => clearTimeout(timeout);
  }, [onFinish, isLaunched, animationStartTime]);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(launchButtonRef.current, {
      opacity: 0,
      duration: 0,
    }).to(launchButtonRef.current, {
      opacity: 1,
      duration: 1,
      delay: 1,
      ease: 'power2.inOut',
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {!isLaunched ? (
        <>
          <Stars
            radius={300}
            depth={60}
            count={1000}
            factor={7}
            saturation={0}
            fade={true}
            speed={1}
          />
          <Float speed={0.5} floatIntensity={0.1}>
            <Text
              position={[0, 2.4, -10]}
              anchorX="center"
              anchorY="middle"
              font="./fonts/SpaceMono-Bold.ttf"
              fontSize={1.0}
            >
              STARTDUST AWAITS. HIT LAUNCH !
            </Text>
          </Float>
          <Html center>
            <button
              ref={launchButtonRef}
              onClick={() => handleLaunch()}
              style={{
                marginTop: '100px',
                padding: '10px 10px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                fontFamily: 'SpaceMono-Bold',
                width: '200px',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              Launch
            </button>
          </Html>
        </>
      ) : (
        <>
          <Stars
            radius={300}
            depth={60}
            count={1000}
            factor={7}
            saturation={0}
            fade={true}
            speed={1}
          />
          <CameraAnimation isLaunched={isLaunched} />
          <group>
            {messages.map((message, index) => (
              <AnimatedText
                key={index}
                text={message.text}
                position={message.position}
                delay={message.delay}
                duration={message.duration}
                isLaunched={isLaunched}
                startTime={animationStartTime}
              />
            ))}
          </group>
        </>
      )}
    </>
  );
};
