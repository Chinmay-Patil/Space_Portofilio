import { Float, useGLTF, Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/Addons.js';
import gsap from 'gsap';
import { Model } from '../models/spaceship';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

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

export function ConatactScene(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    '/models/space_boi.glb',
  ) as unknown as GLTFResult;
  const { camera, controls } = useThree();

  const [isAnimating, setIsAnimating] = useState(true);
  const startPosition = new THREE.Vector3(0, 0, 50); // Start from far behind
  const endPosition = new THREE.Vector3(0, 0, 9); // Final position\
  const innerBodyRef = useRef<THREE.Mesh>(null);
  const outerBodyRef = useRef<THREE.Mesh>(null);
  const [_, setHovered] = useState(false);
  const { domElement } = useThree((state) => state.gl);
  const navigate = useNavigate();
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
      '-=1.0', // Start slightly before camera animation ends
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
        <Float
          rotationIntensity={0.5}
          floatIntensity={0.7}
          floatingRange={[0, 1]}
        >
          <Html position={[70, 85, -130]}>
            <FaLinkedin
              size={70}
              color="#FFFFFF"
              onClick={() => {
                window.open('https://www.linkedin.com/in/chinmay-patil-/');
              }}
            />
          </Html>
          <Html
            transform
            position={[80, 58, -130]}
            center
            distanceFactor={80} // Reduced from 15 to make text larger
          >
            <div
              style={{
                color: '#ffffff',
                fontSize: '20px', // Increased from 14px
                fontWeight: 'bold',
                padding: '10px 20px',
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '8px',
                border: `1px solid #ffffff`,
                // textShadow: '0 0 5px rgba(0,0,0,0.5)',
              }}
            >
              LinkedIn
            </div>
          </Html>
        </Float>

        <Float
          rotationIntensity={0.5}
          floatIntensity={0.7}
          floatingRange={[0, 1]}
        >
          <Html position={[-90, 75, -130]}>
            <SiGmail
              size={70}
              color="#FFFFFF"
              onClick={() => {
                window.open('mailto:patiilchinmay62@gmail.com');
              }}
            />
          </Html>
          <Html
            transform
            position={[-80, 50, -130]}
            center
            distanceFactor={80} // Reduced from 15 to make text larger
          >
            <div
              style={{
                color: '#ffffff',
                fontSize: '20px', // Increased from 14px
                fontWeight: 'bold',
                padding: '10px 20px',
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '8px',
                border: `1px solid #ffffff`,
                // textShadow: '0 0 5px rgba(0,0,0,0.5)',
              }}
            >
              Gmail
            </div>
          </Html>
        </Float>
        <Float
          rotationIntensity={0.5}
          floatIntensity={0.7}
          floatingRange={[0, 1]}
        >
          <Html position={[-140, 0, -130]}>
            <FaInstagram
              size={70}
              color="#FFFFFF"
              onClick={() => {
                window.open('https://www.instagram.com/1_Vibe_0');
              }}
            />
          </Html>
          <Html
            transform
            position={[-130, -30, -130]}
            center
            distanceFactor={80} // Reduced from 15 to make text larger
          >
            <div
              style={{
                color: '#ffffff',
                fontSize: '20px', // Increased from 14px
                fontWeight: 'bold',
                padding: '10px 20px',
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '8px',
                border: `1px solid #ffffff`,
                // textShadow: '0 0 5px rgba(0,0,0,0.5)',
              }}
            >
              Instagram
            </div>
          </Html>
        </Float>
        <Float
          rotationIntensity={0.5}
          floatIntensity={0.7}
          floatingRange={[0, 1]}
        >
          <Html position={[140, 0, -130]}>
            <FaGithub
              size={70}
              color="#FFFFFF"
              onClick={() => {
                window.open('https://github.com/Chinmay-Patil');
              }}
            />
          </Html>
          <Html
            transform
            position={[150, -30, -130]}
            center
            distanceFactor={80} // Reduced from 15 to make text larger
          >
            <div
              style={{
                color: '#ffffff',
                fontSize: '20px', // Increased from 14px
                fontWeight: 'bold',
                padding: '10px 20px',
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '8px',
                border: `1px solid #ffffff`,
                opacity: 0.9,
                // textShadow: '0 0 5px rgba(0,0,0,0.5)',
              }}
            >
              GitHub
            </div>
          </Html>
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

useGLTF.preload('/models/space_boi.glb');
