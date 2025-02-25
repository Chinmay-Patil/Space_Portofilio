import { Canvas } from '@react-three/fiber';
import { Model } from './models/earth';
import { Stars } from '@react-three/drei';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { AboutScene } from './scenes/aboutScene';
import { KnowledgeScene } from './scenes/knowledgeScene';
import { ProjectScene } from './scenes/projectsScene';
import { ConatactScene } from './scenes/contactScene';
import { Loader } from './components/loader';

function Scene() {
  return (
    <>
      <color attach="background" args={['#000000']} />

      <Stars
        radius={200}
        depth={100}
        count={5000}
        factor={4}
        saturation={0}
        fade={true}
        speed={1}
      />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Model />} />
          <Route path="/about" element={<AboutScene />} />
          <Route path="/knowledge" element={<KnowledgeScene />} />
          <Route path="/projects" element={<ProjectScene />} />
          <Route path="/contact" element={<ConatactScene />} />
        </Routes>
      </Suspense>

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </>
  );
}

export default function App() {
  return (
    <Router basename="/Space_Portofilio">
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <Canvas>
          <Scene />
        </Canvas>
      </div>
    </Router>
  );
}
