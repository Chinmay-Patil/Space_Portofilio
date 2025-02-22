import { useGLTF, Html, Float, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/Addons.js';
import gsap from 'gsap';
import Card from 'react-bootstrap/Card';
import { Model } from '../models/spaceship';
import { useNavigate } from 'react-router-dom';

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

export function ProjectScene(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    'src/models/earth/space_boi.glb',
  ) as unknown as GLTFResult;
  const { camera, controls } = useThree();
  const [isAnimating, setIsAnimating] = useState(true);
  const startPosition = new THREE.Vector3(0, 0, 70); // Start from far behind
  const endPosition = new THREE.Vector3(0, 0, 12); // Final position
  const innerBodyRef = useRef<THREE.Mesh>(null);
  const outerBodyRef = useRef<THREE.Mesh>(null);
  const profyloref = useRef<HTMLDivElement>(null);
  const PDFriendRef = useRef<HTMLDivElement>(null);
  const reccycleRef = useRef<HTMLDivElement>(null);
  const [_, setHovered] = useState(false);
  const navigate = useNavigate();
  const { domElement } = useThree((state) => state.gl);
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
        if (profyloref.current && PDFriendRef.current && reccycleRef.current) {
          // Set initial positions
          gsap.set(
            [profyloref.current, PDFriendRef.current, reccycleRef.current],
            {
              opacity: 0,
              z: 100,
              scale: 0.5,
            },
          );

          // Start animations halfway through camera movement
          gsap.to(profyloref.current, {
            opacity: 0.9,
            z: 0,
            scale: 1,
            duration: 1.5,
            ease: 'power2.out',
            delay: 2, // Start halfway through camera movement
          });

          gsap.to(PDFriendRef.current, {
            opacity: 0.9,
            z: 0,
            scale: 1,
            duration: 1.5,
            ease: 'power2.out',
            delay: 2.2, // Slightly after first card
          });

          gsap.to(reccycleRef.current, {
            opacity: 0.9,
            z: 0,
            scale: 1,
            duration: 1.5,
            ease: 'power2.out',
            delay: 2.4, // Slightly after second card
          });
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
        duration: 2,
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
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere010_Material002_0.geometry}
            material={materials['Material.002']}
            position={[0.634, -50.883, 101.001]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={40.706}
          ></mesh>
        </group>
        <Float
          rotationIntensity={0.5}
          floatIntensity={0.7}
          floatingRange={[0, 1]}
        >
          <Html position={[70, 85, -130]}>
            <Card
              ref={profyloref}
              onClick={() => window.open('https://profylo.com')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.borderColor = '#61dafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = '#FFFFFF';
              }}
              style={{
                width: '20rem',
                color: '#FFFFFF',
                border: '1px solid #FFFFFF',
                borderRadius: '8px',
                padding: '1rem',
                opacity: 0,
                fontFamily: '"Space Mono", monospace',
              }}
            >
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  Profylo.com
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: '1rem',
                    lineHeight: '1.5',
                    opacity: 0.9,
                  }}
                >
                  Online Portfolio Creation Platform
                  <br />
                  <br />
                  <span
                    onClick={() =>
                      window.open('https://aniketkatkar.github.io/')
                    }
                    style={{
                      cursor: 'pointer',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = '#D2665A')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = '#FFFFFF')
                    }
                  >
                    With: Aniket Katkar
                  </span>
                  <br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Html>
        </Float>
        <Float
          speed={1}
          rotationIntensity={0.5}
          floatIntensity={0.7}
          floatingRange={[0, 1]}
        >
          <Html position={[-180, 45, -130]}>
            <Card
              ref={PDFriendRef}
              onClick={() => window.open('https://kitabai.web.app/')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.borderColor = '#61dafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = '#FFFFFF';
              }}
              style={{
                width: '20rem',
                color: '#FFFFFF',
                border: '1px solid #FFFFFF',
                borderRadius: '8px',
                padding: '1rem',
                opacity: 0,
                fontFamily: '"Space Mono", monospace',
              }}
            >
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  PDFriend
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: '1rem',
                    lineHeight: '1.5',
                    opacity: 0.9,
                  }}
                >
                  An AI-powered chatbot that lets you interact with and extract
                  information from your PDFs effortlessly.
                </Card.Text>
              </Card.Body>
            </Card>
          </Html>
        </Float>

        <Float
          rotationIntensity={0.5}
          floatIntensity={0.7}
          floatingRange={[0, 1]}
        >
          <Html position={[110, -20, -130]}>
            <Card
              ref={reccycleRef}
              onClick={() =>
                window.open('https://github.com/Chinmay-Patil/Recycle_App-1')
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.borderColor = '#61dafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = '#FFFFFF';
              }}
              style={{
                width: '20rem',
                color: '#FFFFFF',
                border: '1px solid #FFFFFF',
                borderRadius: '8px',
                padding: '1rem',
                opacity: 0,
                fontFamily: '"Space Mono", monospace',
              }}
            >
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  Recycle App
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: '1rem',
                    lineHeight: '1.5',
                    opacity: 0.9,
                  }}
                >
                  Locates the nearest recycling center and provides information
                  on how to recycle different materials.
                </Card.Text>
              </Card.Body>
            </Card>
          </Html>
        </Float>
      </group>
      <group {...props} dispose={null}>
        <group scale={0.01} position={[0, -1, 0]}>
          {
            <group rotation={[-Math.PI / 2, 0, 0]} scale={80}>
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

useGLTF.preload('/space_boi.glb');
