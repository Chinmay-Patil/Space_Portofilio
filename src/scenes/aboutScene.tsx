import { Text, useGLTF, Float, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/Addons.js';
import gsap from 'gsap';
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

export function AboutScene(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    'src/models/earth/space_boi.glb',
  ) as unknown as GLTFResult;
  const innerBodyRef = useRef<THREE.Mesh>(null);
  const outerBodyRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { camera, controls } = useThree();
  const [isAnimating, setIsAnimating] = useState(true);
  const { domElement } = useThree((state) => state.gl);
  const startPosition = new THREE.Vector3(0, 0, 50); // Start from far behind
  const endPosition = new THREE.Vector3(0, 0, 9); // Final position
  useEffect(() => {
    // Disable controls during animation
    if (controls) {
      //@ts-ignore
      controls.enabled = !isAnimating;
    }

    // Set initial camera position
    camera.position.copy(startPosition);
    camera.lookAt(0, 0, 0);

    // // Create GSAP timeline
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
        y: 100,
      },
      {
        y: 0,
        duration: 1,
        ease: 'power2.out',
      },
      '-=0.5', // Start slightly before camera animation ends
    );

    return () => {
      // Cleanup
      tl.kill();
      if (controls) {
        //@ts-ignore
        controls.enabled = true;
      }
      if (innerBodyRef.current) {
        const material1 = innerBodyRef.current.material as THREE.Material;
        material1.dispose();
      }
    };
  }, [camera, controls, materials]);

  return (
    <>
      <OrbitControls
        enabled={!isAnimating}
        enableZoom={true}
        enablePan={true}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        minDistance={2}
        maxDistance={9}
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
          <group
            position={[0.634, -18.883, 73.001]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={11.706}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere007_Material001_0.geometry}
              material={materials['Material.001']}
            ></mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere007_Material002_0.geometry}
              material={materials['Material.002']}
            />
          </group>
          <Text
            position={[0, 110, -100]}
            fontSize={8}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="src/fonts/SpaceMono-Bold.ttf"
            material-toneMapped={false}
          >
            Hey, I'm Chinmay Patil
          </Text>
          <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
            <Text
              position={[20, 25, -100]}
              maxWidth={500}
              fontSize={6}
              anchorX="center"
              anchorY="middle"
              font="src/fonts/SpaceMono-Regular.ttf"
            >
              A software engineer who loves building cool things, whether it’s
              in the digital world or the real one.{'\n'}
              {'\n'}By day, I solve problems, automate the mundane, and make
              tech work smarter.{'\n'}
              {'\n'}
              By night, I’m either behind a camera, cooking up something new, or
              lost in a music project. {'\n'} {'\n'}I have a habit of turning
              curiosity into creative experiments—whether that means capturing
              the perfect shot, making beats, or{'\n'}
              {'\n'}figuring out how to make a dish taste just right. {'\n'}
              {'\n'}Always up for a chat about tech, photography, or the best
              way to brew a great cup of coffee.{'\n'}
              {'\n'}Let’s connect!
            </Text>
          </Float>
        </group>
      </group>

      <group {...props} dispose={null}>
        <group scale={0.01} position={[0, -3.9, 0]}>
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

useGLTF.preload('/space_boi.glb');
