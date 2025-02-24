import * as THREE from 'three';
import { useGLTF, Text } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { OrbitControls } from '@react-three/drei';

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

export function Model({ setTransitioning, setTransitionSpeed, ...props }: any) {
  const aboutMeshRef = useRef<THREE.Mesh>(null);
  const contactMeshRef = useRef<THREE.Mesh>(null);
  const knowledgeMeshRef = useRef<THREE.Mesh>(null);
  const projectsMeshRef = useRef<THREE.Mesh>(null);
  const { camera, controls } = useThree();
  const navigate = useNavigate();

  const { nodes, materials } = useGLTF(
    'public/models/space_boi.glb',
  ) as GLTFResult;
  const [clickedAbout, setAboutClicked] = useState(false);
  const [clickedKnowledge, setKnowLedgeClicked] = useState(false);
  const [clickedProjects, setProjectsClicked] = useState(false);
  const [clickedContact, setContactClicked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [orbitEnabled, setOrbitEnabled] = useState(true);
  const controlsRef = useRef(null);

  const startPosition = new THREE.Vector3(0, 0, 20);
  const endPosition = new THREE.Vector3(0, 0, 6);

  useEffect(() => {
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

          //@ts-ignore
          controls.maxDistace = 7;
        }
      },
    });

    tl.to(camera.position, {
      x: endPosition.x,
      y: endPosition.y,
      z: endPosition.z,
      duration: 4.5,
      ease: 'power2.inOut',
      onUpdate: () => camera.lookAt(0, 0, 0),
      onComplete: () => {
        //@ts-ignore
        controls.maxDistace = 7;
      },
    });
    return () => {
      // Cleanup
      tl.kill();
      if (controls) {
        //@ts-ignore
        controls.enabled = true;
      }
    };
  }, [camera, controls]);

  const handleAboutClicked = () => {
    if (!aboutMeshRef.current || isAnimating) return;

    setIsAnimating(true);
    setOrbitEnabled(false); // Disable controls when animation starts
    setAboutClicked(!clickedAbout);

    // Get mesh's world position
    const targetPosition = new THREE.Vector3();
    aboutMeshRef.current.getWorldPosition(targetPosition);

    // Add offset for better viewing angle
    const offset = new THREE.Vector3(0, 2, 10);
    targetPosition.add(offset);

    // Calculate the direction from camera to target
    const direction = new THREE.Vector3().subVectors(
      targetPosition,
      camera.position,
    );
    direction.normalize();

    // Animate camera position
    gsap.to(camera.position, {
      x: targetPosition.x - offset.x,
      y: targetPosition.y - offset.y,
      z: targetPosition.z - offset.z,
      duration: 1.8,
      ease: 'power2.inOut',
      onComplete: () => {
        setIsAnimating(false);
        console.log('Animation completed!');
        navigate('/about');
        setOrbitEnabled(true); // Re-enable controls when animation completes
      },
    });
  };

  const handleKnowledgeClicked = () => {
    if (!knowledgeMeshRef.current || isAnimating) return;

    setIsAnimating(true);
    setOrbitEnabled(false); // Disable controls when animation starts
    setKnowLedgeClicked(!clickedKnowledge);

    // Get mesh's world position
    const targetPosition = new THREE.Vector3();
    knowledgeMeshRef.current.getWorldPosition(targetPosition);

    // Add offset for better viewing angle
    const offset = new THREE.Vector3(0, 2, 10);
    targetPosition.add(offset);

    // Calculate the direction from camera to target
    const direction = new THREE.Vector3().subVectors(
      targetPosition,
      camera.position,
    );
    direction.normalize();

    // Animate camera position
    gsap.to(camera.position, {
      x: targetPosition.x - offset.x,
      y: targetPosition.y - offset.y,
      z: targetPosition.z - offset.z,
      duration: 2,
      ease: 'power3.inOut',
      onComplete: () => {
        setIsAnimating(false);
        console.log('Animation completed!');
        navigate('/knowledge');
        setOrbitEnabled(true); // Re-enable controls when animation completes
      },
    });

    // Animate camera rotation
    gsap.to(camera.rotation, {
      x: Math.atan2(
        targetPosition.y - camera.position.y,
        Math.sqrt(
          Math.pow(targetPosition.x - camera.position.x, 1) +
            Math.pow(targetPosition.z - camera.position.z, 2),
        ),
      ),
      y: Math.atan2(
        targetPosition.x - camera.position.x,
        targetPosition.z - camera.position.z,
      ),
      duration: 2,
      ease: 'power3.inOut',
    });
  };
  const handleProjectsClicked = () => {
    if (!projectsMeshRef.current || isAnimating) return;

    setIsAnimating(true);
    setOrbitEnabled(false); // Disable controls when animation starts
    setProjectsClicked(!clickedProjects);

    // Get mesh's world position
    const targetPosition = new THREE.Vector3();
    projectsMeshRef.current.getWorldPosition(targetPosition);

    // Add offset for better viewing angle
    const offset = new THREE.Vector3(0, 2, 10);
    targetPosition.add(offset);

    // Calculate the direction from camera to target
    const direction = new THREE.Vector3().subVectors(
      targetPosition,
      camera.position,
    );
    direction.normalize();

    // Animate camera position
    gsap.to(camera.position, {
      x: targetPosition.x - offset.x,
      y: targetPosition.y - offset.y,
      z: targetPosition.z - offset.z,
      duration: 2,
      ease: 'power3.inOut',
      onComplete: () => {
        setIsAnimating(false);
        console.log('Animation completed!');
        navigate('/projects');
        setOrbitEnabled(true); // Re-enable controls when animation completes
      },
    });

    // Animate camera rotation
    gsap.to(camera.rotation, {
      x: Math.atan2(
        targetPosition.y - camera.position.y,
        Math.sqrt(
          Math.pow(targetPosition.x - camera.position.x, 1) +
            Math.pow(targetPosition.z - camera.position.z, 2),
        ),
      ),
      y: Math.atan2(
        targetPosition.x - camera.position.x,
        targetPosition.z - camera.position.z,
      ),
      duration: 2,
      ease: 'power3.inOut',
    });
  };
  const handleContactClicked = () => {
    if (!contactMeshRef.current || isAnimating) return;

    setIsAnimating(true);
    setOrbitEnabled(false); // Disable controls when animation starts
    setContactClicked(!clickedContact);

    // Get mesh's world position
    const targetPosition = new THREE.Vector3();
    contactMeshRef.current.getWorldPosition(targetPosition);

    // Add offset for better viewing angle
    const offset = new THREE.Vector3(0, 2, 10);
    targetPosition.add(offset);

    // Calculate the direction from camera to target
    const direction = new THREE.Vector3().subVectors(
      targetPosition,
      camera.position,
    );
    direction.normalize();

    // Animate camera position
    gsap.to(camera.position, {
      x: targetPosition.x - offset.x,
      y: targetPosition.y - offset.y,
      z: targetPosition.z - offset.z,
      duration: 2,
      ease: 'power3.inOut',
      onComplete: () => {
        setIsAnimating(false);
        console.log('Animation completed!');
        navigate('/contact');
        setOrbitEnabled(true); // Re-enable controls when animation completes
      },
    });

    // Animate camera rotation
    gsap.to(camera.rotation, {
      x: Math.atan2(
        targetPosition.y - camera.position.y,
        Math.sqrt(
          Math.pow(targetPosition.x - camera.position.x, 1) +
            Math.pow(targetPosition.z - camera.position.z, 2),
        ),
      ),
      y: Math.atan2(
        targetPosition.x - camera.position.x,
        targetPosition.z - camera.position.z,
      ),
      duration: 2,
      ease: 'power3.inOut',
    });
  };

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enabled={orbitEnabled}
        maxDistance={20}
        minDistance={5}
      />
      <group {...props} dispose={null}>
        <group scale={0.01} position={[0, -3, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={40}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_Material001_0.geometry}
              material={materials['Material.001']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_Material002_0.geometry}
              material={materials['Material.002']}
            />
          </group>
          <group
            position={[-357.404, 392.646, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={39.706}
          >
            <mesh
              ref={knowledgeMeshRef}
              castShadow
              receiveShadow
              geometry={nodes.Sphere002_Material001_0.geometry}
              material={materials['Material.001']}
              onClick={handleKnowledgeClicked}
            />
            <mesh
              ref={knowledgeMeshRef}
              castShadow
              receiveShadow
              geometry={nodes.Sphere002_Material002_0.geometry}
              material={materials['Material.002']}
              onClick={handleKnowledgeClicked}
            />
          </group>
          <group
            position={[199.634, 566.883, -221.001]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={39.706}
          >
            <mesh
              ref={aboutMeshRef}
              castShadow
              receiveShadow
              geometry={nodes.Sphere007_Material001_0.geometry}
              material={materials['Material.001']}
              onClick={handleAboutClicked}
            >
              <Text
                position={[-1.9, 0, 0]} // Adjust this based on your sphere’s size
                fontSize={1.3}
                rotation={[Math.PI / 2, 0, 0]} // Corrected rotation syntax
                color={clickedAbout ? 'gray' : 'white'} // Change text color on click
                anchorX="center"
                anchorY="middle"
              >
                ab
              </Text>
              <Text
                position={[2.1, 0, 0]} // Adjust this based on your sphere’s size
                fontSize={1.3}
                rotation={[Math.PI / 2, 0, 0]} // Corrected rotation syntax
                color={clickedAbout ? 'gray' : 'white'} // Change text color on click
                anchorX="center"
                anchorY="middle"
              >
                ut
              </Text>
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere007_Material002_0.geometry}
              material={materials['Material.002']}
            />
          </group>
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
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.particles_Material002_0.geometry}
            material={materials['Material.002']}
            position={[489.69, 793.811, 355.293]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={20.408}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere_Material001_0.geometry}
            material={materials['Material.001']}
            position={[375.469, 427.948, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={62.402}
          />
          <mesh
            ref={contactMeshRef}
            castShadow
            receiveShadow
            geometry={nodes.Sphere001_Material002_0.geometry}
            material={materials['Material.002']}
            position={[375.469, 427.948, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={60.324}
            onClick={handleContactClicked}
          >
            <Text
              position={[-1.9, 0, 0]} // Adjust this based on your sphere’s size
              fontSize={1.3}
              rotation={[Math.PI / 2, 0, 0]} // Corrected rotation syntax
              color={clickedContact ? 'gray' : 'white'} // Change text color on click
              anchorX="center"
              anchorY="middle"
            >
              c
            </Text>
            <Text
              position={[3.1, 0, 0]} // Adjust this based on your sphere’s size
              fontSize={1.3}
              rotation={[Math.PI / 2, 0, 0]} // Corrected rotation syntax
              color={clickedContact ? 'gray' : 'white'} // Change text color on click
              anchorX="center"
              anchorY="middle"
            >
              ntact
            </Text>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere004_Material002_0.geometry}
            material={materials['Material.002']}
            position={[375.469, 427.948, 0]}
            rotation={[-0.688, 0, 0]}
            scale={[104.129, 81.609, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere005_Material001_0.geometry}
            material={materials['Material.001']}
            position={[-341.988, 460.196, -117.028]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={62.402}
          />
          {/* <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere006_Material002_0.geometry}
          material={materials['Material.002']}
          position={[-341.988, 460.196, -117.028]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={60.324}
        /> */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere009_Material002_0.geometry}
            material={materials['Material.002']}
            position={[507.522, 667.594, -214.475]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={16.881}
          />
          <mesh
            ref={projectsMeshRef}
            castShadow
            receiveShadow
            geometry={nodes.Sphere010_Material002_0.geometry}
            material={materials['Material.002']}
            position={[-287.442, 585.792, -111.857]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={20.881}
            onClick={handleProjectsClicked}
          >
            <Text
              position={[-1.9, 0, 0]} // Adjust this based on your sphere’s size
              fontSize={1.3}
              rotation={[Math.PI / 2, 0, 0]} // Corrected rotation syntax
              color={clickedProjects ? 'gray' : 'white'} // Change text color on click
              anchorX="center"
              anchorY="middle"
            >
              pr
            </Text>
            <Text
              position={[2.7, 0, 0]} // Adjust this based on your sphere’s size
              fontSize={1.3}
              rotation={[Math.PI / 2, 0, 0]} // Corrected rotation syntax
              color={clickedProjects ? 'gray' : 'white'} // Change text color on click
              anchorX="center"
              anchorY="middle"
            >
              jects
            </Text>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere011_Material002_0.geometry}
            material={materials['Material.002']}
            position={[-553.462, 331.074, -379.067]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={11.437}
          />
          <mesh
            ref={knowledgeMeshRef}
            castShadow
            receiveShadow
            geometry={nodes.Sphere003_Material002_0.geometry}
            material={materials['Material.002']}
            position={[-357.404, 392.646, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={40.075}
            onClick={handleKnowledgeClicked}
          >
            <Text
              position={[-1.8, 0, 0]} // Adjust this based on your sphere’s size
              fontSize={1.2}
              rotation={[Math.PI / 2, 0, 0]}
              color={clickedKnowledge ? 'gray' : 'white'}
              anchorX="center"
              anchorY="middle"
            >
              kn
            </Text>
            <Text
              position={[3.1, 0, 0]} // Adjust this based on your sphere’s size
              fontSize={1.2}
              rotation={[Math.PI / 2, 0, 0]}
              color={clickedKnowledge ? 'gray' : 'white'}
              anchorX="center"
              anchorY="middle"
            >
              wledge
            </Text>
          </mesh>
        </group>
      </group>
    </>
  );
}

useGLTF.preload('/models/space_boi.glb');
