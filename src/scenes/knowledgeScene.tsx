import { Float, Html, OrbitControls, useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/Addons.js';
import { FaReact, FaPython, FaNode, FaAws } from 'react-icons/fa';
import {
  SiGooglecloud,
  SiTypescript,
  SiNestjs,
  SiExpress,
  SiTerraform,
  SiDocker,
  SiPostgresql,
  SiGooglebigquery,
  SiSupabase,
} from 'react-icons/si';
import { IoLogoJavascript, IoLogoFirebase } from 'react-icons/io5';
import { RiNextjsFill } from 'react-icons/ri';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { Model } from '../models/spaceship';

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

const iconGroups = {
  frontend: [
    {
      Icon: FaReact,
      label: 'React',
      color: '#61dafb',
      position: new THREE.Vector3(200, 0, -50),
    },
    {
      Icon: SiTypescript,
      label: 'TypeScript',
      color: '#4285F4',
      position: new THREE.Vector3(190, 50, -50),
    },
    {},
    {
      Icon: IoLogoJavascript,
      label: 'Javascript',
      color: '#FFD95F',
      position: new THREE.Vector3(140, -50, -50),
    },
    {
      Icon: FaPython,
      label: 'Python',
      color: '#3D8D7A',
      position: new THREE.Vector3(-200, 0, -50),
    },
  ],
  backend: [
    {
      Icon: FaNode,
      label: 'Node.js',
      color: '#A4B465',
      position: new THREE.Vector3(0, 100, -50),
    },
    {
      Icon: RiNextjsFill,
      label: 'Next.js',
      color: '#ffffff',
      position: new THREE.Vector3(120, 100, -50),
    },
    {},
    {
      Icon: SiNestjs,
      label: 'Nest.js',
      color: '#D70654',
      position: new THREE.Vector3(-127, 70, -50),
    },
    {
      Icon: SiExpress,
      label: 'Express',
      color: '#27445D',
      position: new THREE.Vector3(-200, 60, -50),
    },
  ],
  cloud: [
    {
      Icon: SiGooglecloud,
      label: 'GCP',
      color: '#4285F4',
      position: new THREE.Vector3(-50, 40, -50),
    },
    {
      Icon: FaAws,
      label: 'AWS',
      color: '#FBA518',
      position: new THREE.Vector3(50, 40, -50),
    },
    {},
    {
      Icon: SiTerraform,
      label: 'Terraform',
      color: '#493D9E',
      position: new THREE.Vector3(-100, 0, -50),
    },
    {
      Icon: SiDocker,
      label: 'Docker',
      color: '#2973B2',
      position: new THREE.Vector3(-120, -50, -50),
    },
  ],
  database: [
    {
      Icon: SiPostgresql,
      label: 'PostgreSQL',
      color: '#155E95',
      position: new THREE.Vector3(-200, -70, -50),
    },
    {
      Icon: SiSupabase,
      label: 'Supabase',
      color: '#72BF78',
      position: new THREE.Vector3(50, -30, -50),
    },
    {},
    {
      Icon: SiGooglebigquery,
      label: 'BigQuery',
      color: '#615EFC',
      position: new THREE.Vector3(200, -70, -50),
    },
    {
      Icon: IoLogoFirebase,
      label: 'Firebase',
      color: '#DF6D14',
      position: new THREE.Vector3(120, 30, -50),
    },
  ],
};

function TechIcon({
  position,
  Icon,
  label,
  ref,
}: {
  position: [number, number, number];
  Icon: typeof FaReact | undefined;
  label: string | undefined;
  Iconcolor: string | undefined;
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  const iconRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to([iconRef.current, labelRef.current], {
      opacity: 0,
      duration: 0,
    }).to(
      [iconRef.current, labelRef.current],
      {
        opacity: 1,
        duration: 1,
        delay: 4, // Start after camera animation
        ease: 'power2.inOut',
        stagger: 0.1,
      },
      '-=1.0',
    );

    return () => {
      tl.kill();
    };
  }, []);

  if (!Icon) return null;
  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
      <group position={position}>
        <Html transform distanceFactor={15}>
          <div ref={iconRef} style={{ opacity: 0 }}>
            <Icon size={400} color="#FFFFFF" />
          </div>
        </Html>
        <Html
          transform
          position={[0, -15, 0]}
          center
          distanceFactor={80}
          ref={ref}
        >
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
            }}
          >
            {label}
          </div>
        </Html>
      </group>
    </Float>
  );
}

export function KnowledgeScene(props: JSX.IntrinsicElements['group']) {
  const navigate = useNavigate();
  const { nodes, materials } = useGLTF(
    './models/space_boi.glb',
  ) as unknown as GLTFResult;
  const { camera, controls } = useThree();
  const innerBodyRef = useRef<THREE.Mesh>(null);
  const outerBodyRef = useRef<THREE.Mesh>(null);
  const { domElement } = useThree((state) => state.gl);
  const [_, setHovered] = useState(false);

  const [isAnimating, setIsAnimating] = useState(true);
  const startPosition = new THREE.Vector3(0, 0, 50); // Start from far behind
  const endPosition = new THREE.Vector3(0, 0, 12); // Final position
  const frontRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable controls during animation
    if (controls) {
      //@ts-ignore
      controls.enabled = !isAnimating;
    }

    // Set initial camera position
    camera.position.copy(startPosition);
    camera.lookAt(0, 0, 0);

    // Create GSAP timeline
    const tl = gsap.timeline({
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
      onStart: () => {
        if (frontRef.current) {
          gsap.set([frontRef.current.children], { opacity: 0 });
        }
      },
    });

    tl.fromTo(
      //@ts-ignore
      [innerBodyRef.current.position, outerBodyRef.current.position],
      {
        y: 200,
      },
      {
        y: 0,
        duration: 1,
        ease: 'power2.out',
      },
      '-=2.0', // Start slightly before camera animation ends
    );
    return () => {
      // Cleanup
      tl.kill();
      if (controls) {
        //@ts-ignore
        controls.enabled = true;
      }
    };
  }, [camera, controls]);

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
          position={[-19, 7.5, -1]}
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
          <group
            position={[0.634, -50.883, 101.001]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={40.706}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere002_Material001_0.geometry}
              material={materials['Material.001']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere002_Material002_0.geometry}
              material={materials['Material.002']}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere003_Material002_0.geometry}
            material={materials['Material.002']}
            position={[0.634, -50.883, 101.001]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={42.0}
          ></mesh>
          {/* Frontend Circle - Outer */}
          {iconGroups.frontend.map((icon) =>
            icon.Icon ? (
              <TechIcon
                key={icon.label}
                position={[icon.position.x, icon.position.y, icon.position.z]}
                Icon={icon.Icon}
                label={icon.label}
                Iconcolor={icon.color}
                ref={frontRef}
              />
            ) : null,
          )}

          {/* Backend Row */}
          {iconGroups.backend.map((icon) =>
            icon.Icon ? (
              <TechIcon
                key={icon.label}
                position={[icon.position.x, icon.position.y, icon.position.z]}
                Icon={icon.Icon}
                label={icon.label}
                Iconcolor={icon.color}
                ref={frontRef}
              />
            ) : null,
          )}

          {/* Cloud Row */}
          {iconGroups.cloud.map((icon) =>
            icon.Icon ? (
              <TechIcon
                key={icon.label}
                position={[icon.position.x, icon.position.y, icon.position.z]}
                Icon={icon.Icon}
                label={icon.label}
                Iconcolor={icon.color}
                ref={frontRef}
              />
            ) : null,
          )}

          {/* Database Row */}
          {iconGroups.database.map((icon) =>
            icon.Icon ? (
              <TechIcon
                key={icon.label}
                position={[icon.position.x, icon.position.y, icon.position.z]}
                Icon={icon.Icon}
                label={icon.label}
                Iconcolor={icon.color}
                ref={frontRef}
              />
            ) : null,
          )}
        </group>
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
