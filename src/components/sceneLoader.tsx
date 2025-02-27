import { Html, useProgress } from '@react-three/drei';

export function SceneLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div
        style={{
          color: 'white',
          fontSize: '1.2em',
          fontFamily: 'SpaceMono-Bold',
          background: 'rgba(0,0,0,0.7)',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
        }}
      >
        <div>Loading Scene...</div>
        <div>{progress.toFixed(0)}%</div>
      </div>
    </Html>
  );
}
