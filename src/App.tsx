import { Canvas } from '@react-three/fiber';
import { Model } from './models/earth';
import { Stars } from '@react-three/drei';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { AboutScene } from './scenes/aboutScene';
import { KnowledgeScene } from './scenes/knowledgeScene';
import { ProjectScene } from './scenes/projectsScene';
import { ConatactScene } from './scenes/contactScene';
import { Loader } from './components/loader';

function Scene() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Only apply loading state for root route
    if (location.pathname === '/') {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 16000);

      return () => clearTimeout(timer);
    } else {
      // For other routes, set loading to false immediately
      setIsLoading(false);
    }
  }, [location]);

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

      {isLoading ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Model />} />
            <Route path="/about" element={<AboutScene />} />
            <Route path="/knowledge" element={<KnowledgeScene />} />
            <Route path="/projects" element={<ProjectScene />} />
            <Route path="/contact" element={<ConatactScene />} />
          </Routes>
        </Suspense>
      )}

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </>
  );
}

export default function App() {
  return (
    <Router basename="/Space_Portfolio">
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <Canvas>
          <Scene />
        </Canvas>
      </div>
    </Router>
  );
}
