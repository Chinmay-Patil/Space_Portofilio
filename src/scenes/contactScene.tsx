import { Float, useGLTF, Html, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/Addons.js';
import gsap from 'gsap';
import { Model } from '../models/spaceship';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaInstagram, FaLinkedin, FaReact } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { ContactForm } from '../components/contactForm';

type GLTFResult = GLTF & {
  nodes: {
    body_Material001_0: THREE.Mesh;
    body_Material002_0: THREE.Mesh;
    waves_Material002_0: THREE.Mesh;
    waves1_Material002_0: THREE.Mesh;
    waves2_Material002_0: THREE.Mesh;
    particles_Material002_0: THREE.Mesh;
    Sphere_Material001_0: THREE.Mesh;
    Sphere001_Material002_0: THREE.Mesh;
    Sphere004_Material002_0: THREE.Mesh;
    Sphere005_Material001_0: THREE.Mesh;
    Sphere006_Material002_0: THREE.Mesh;
    Sphere009_Material002_0: THREE.Mesh;
    Sphere010_Material002_0: THREE.Mesh;
    Sphere011_Material002_0: THREE.Mesh;
    Cube_Material001_0: THREE.Mesh;
    Sphere002_Material001_0: THREE.Mesh;
    Sphere002_Material002_0: THREE.Mesh;
    Sphere003_Material002_0: THREE.Mesh;
    Sphere007_Material001_0: THREE.Mesh;
    Sphere007_Material002_0: THREE.Mesh;
    Sphere008_Material002_0: THREE.Mesh;
  };
  materials: {
    ['Material.001']: THREE.MeshBasicMaterial;
    ['Material.002']: THREE.MeshBasicMaterial;
  };
};

function ContactIcon({
  position,
  Icon,
  label,
  onClick,
}: {
  position: [number, number, number];
  Icon: typeof FaReact | undefined;
  label: string | undefined;
  Iconcolor: string | undefined;
  onClick?: () => void;
}) {
  const iconRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<gsap.core.Timeline>(null);

  useEffect(() => {
    // Wait for next frame to ensure refs are populated
    const frameId = requestAnimationFrame(() => {
      if (!iconRef.current || !labelRef.current) return;

      // Create and store timeline
      animationRef.current = gsap.timeline({
        paused: true,
        onComplete: () => setIsVisible(true),
      });

      // Set initial state
      gsap.set([iconRef.current, labelRef.current], {
        opacity: 0,
        scale: 0.95,
      });

      // Build animation
      animationRef.current.to([iconRef.current, labelRef.current], {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.inOut',
      });

      // Start after delay
      setTimeout(() => animationRef.current?.play(), 3000);
    });

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      animationRef.current?.kill();
    };
  }, []); // Run once on mount

  if (!Icon) return null;

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
      <group position={position}>
        <Html transform distanceFactor={15}>
          <div
            ref={iconRef}
            style={{
              opacity: 0,
              cursor: 'pointer',
              transform: `scale(${isVisible ? 1 : 0.95})`,
              transition: 'transform 0.3s ease',
            }}
            onClick={onClick}
          >
            <Icon size={400} color={'#FFFFFF'} />
          </div>
        </Html>
        <Html transform position={[0, -15, 0]} center distanceFactor={80}>
          <div
            ref={labelRef}
            style={{
              opacity: 0,
              color: '#ffffff',
              fontSize: '24px',
              fontWeight: 'bold',
              padding: '10px 20px',
              background: 'rgba(0,0,0,0.7)',
              borderRadius: '8px',
              border: `1px solid #ffffff`,
              cursor: 'pointer',
              transform: `scale(${isVisible ? 1 : 0.95})`,
              transition: 'all 0.3s ease',
            }}
            onClick={onClick}
          >
            {label}
          </div>
        </Html>
      </group>
    </Float>
  );
}
const ContactIcons = [
  {
    position: new THREE.Vector3(-200, 10, -150),
    Icon: FaLinkedin,
    label: 'LinkedIn',
    onclick: () =>
      window.open('https://www.linkedin.com/your-profile', '_blank'),
    color: '#0077B5',
  },
  {
    position: new THREE.Vector3(-170, 80, -150),
    Icon: SiGmail,
    label: 'Gmail',
    onclick: () => window.open('mailto:your.email@gmail.com'),
    color: '#EA4335',
  },
  {
    position: new THREE.Vector3(-70, 60, -150),
    Icon: FaInstagram,
    label: 'Instagram',
    onclick: () =>
      window.open('https://www.instagram.com/your-profile', '_blank'),
    color: '#E4405F',
  },
  {
    position: new THREE.Vector3(-80, -30, -150),
    Icon: FaGithub,
    label: 'GitHub',
    onclick: () => window.open('https://github.com/your-profile', '_blank'),
    color: '#181717',
  },
];

export function ConatactScene(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    './models/space_boi.glb',
  ) as unknown as GLTFResult;
  const { camera, controls } = useThree();

  const [isAnimating, setIsAnimating] = useState(true);
  const startPosition = new THREE.Vector3(0, 0, 50); // Start from far behind
  const endPosition = new THREE.Vector3(0, 0, 9); // Final position
  const [isInitialized, setIsInitialized] = useState(false);
  const innerBodyRef = useRef<THREE.Mesh>(null);
  const outerBodyRef = useRef<THREE.Mesh>(null);
  const [_, setHovered] = useState(false);
  const { domElement } = useThree((state) => state.gl);
  const navigate = useNavigate();
  // const IconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!innerBodyRef.current || !outerBodyRef.current) return;

    // Set initial positions safely
    innerBodyRef.current.position.y = 200;
    outerBodyRef.current.position.y = 200;
    camera.position.copy(startPosition);
    camera.lookAt(0, 0, 0);

    setIsInitialized(true);
  }, [innerBodyRef.current, outerBodyRef.current]);

  useEffect(() => {
    // Wait for refs to be initialized
    if (!isInitialized || !innerBodyRef.current || !outerBodyRef.current)
      return;
    // Disable controls during animation
    if (controls) {
      //@ts-ignore
      controls.enabled = !isAnimating;
    }

    // Create GSAP timeline
    const tl = gsap.timeline({
      delay: 0.1,
      onComplete: () => {
        setIsAnimating(false);
        if (controls) {
          //@ts-ignore
          controls.enabled = true;
          //@ts-ignore
          controls.enableZoom = false;
          //@ts-ignore
          controls.enablePan = false;
          //@ts-ignore
          controls.minPolarAngle = Math.PI / 2;
          //@ts-ignore
          controls.maxPolarAngle = Math.PI / 2;
        }
      },
    });

    // Animate camera position
    tl.to(camera.position, {
      x: endPosition.x,
      y: endPosition.y,
      z: endPosition.z,
      duration: 4,
      ease: 'power2.inOut',
      onUpdate: () => {
        camera.lookAt(0, 0, 0);
      },
    });

    tl.to(
      [innerBodyRef.current.position, outerBodyRef.current.position],
      {
        y: 0,
        duration: 1,
        ease: 'power2.out',
      },
      '-=1.0',
    );

    return () => {
      // Cleanup
      tl.kill();
      if (controls) {
        //@ts-ignore
        controls.enabled = true;
      }
    };
  }, [camera, controls, isInitialized]);

  return (
    <>
      <OrbitControls
        enabled={!isAnimating}
        enableZoom={true}
        enablePan={true}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        minDistance={2}
        maxDistance={20}
      />
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
        <Model
          position={[-15, 6.5, -1]}
          onClick={() => navigate('/')}
          onPointerOver={() => {
            domElement.style.cursor = 'pointer';
            setHovered(true);
          }}
          onPointerOut={() => {
            domElement.style.cursor = 'auto';
            setHovered(false);
          }}
        />
      </Float>
      <group {...props} dispose={null}>
        <group scale={0.11}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere_Material001_0.geometry}
            material={materials['Material.001']}
            position={[0.634, -50.883, 101.001]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={42.402}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere001_Material002_0.geometry}
            material={materials['Material.002']}
            position={[0.634, -50.883, 101.001]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={40.324}
          ></mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere004_Material002_0.geometry}
            material={materials['Material.002']}
            position={[0.934, -50.883, 100.001]}
            rotation={[-1.2, 0, 0]}
            scale={[90.129, 81.609, 0]}
          />
        </group>
        {ContactIcons.map((icon, index) => (
          <ContactIcon
            key={index}
            position={[icon.position.x, icon.position.y, icon.position.z]}
            Icon={icon.Icon}
            label={icon.label}
            Iconcolor={icon.color}
            onClick={icon.onclick}
          />
        ))}
      </group>

      <group>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
          <ContactForm />
        </Float>
      </group>

      <group {...props} dispose={null}>
        <group scale={0.01} position={[0, -1, 0]}>
          {
            <group rotation={[-Math.PI / 2, 0, 0]} scale={50}>
              <mesh
                ref={innerBodyRef}
                castShadow
                receiveShadow
                geometry={nodes.body_Material001_0.geometry}
                material={materials['Material.001']}
              />
              <mesh
                ref={outerBodyRef}
                castShadow
                receiveShadow
                geometry={nodes.body_Material002_0.geometry}
                material={materials['Material.002']}
              />
            </group>
          }
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.waves_Material002_0.geometry}
            material={materials['Material.002']}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[20, 20, 1.891]}
          ></mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.waves1_Material002_0.geometry}
            material={materials['Material.002']}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[20, 20, 1.891]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.waves2_Material002_0.geometry}
            material={materials['Material.002']}
            position={[92.464, 15.529, 2.112]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[20, 20, 1.891]}
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload('./models/space_boi.glb');
