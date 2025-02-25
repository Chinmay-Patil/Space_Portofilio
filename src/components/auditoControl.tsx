import { useAudio } from './audio';
import { Html } from '@react-three/drei';
import { BsSoundwave, BsVolumeMute } from 'react-icons/bs';

export function AudioControl() {
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <Html
      style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}
    >
      <button
        onClick={toggleAudio}
        style={{
          background: isPlaying
            ? 'rgba(0, 255, 0, 0.1)'
            : 'rgba(255, 0, 0, 0.1)',
          border: `2px solid ${
            isPlaying ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)'
          }`,
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
          transition: 'all 0.3s ease',
          animation: !isPlaying ? 'pulse 2s infinite' : 'none',
        }}
      >
        {isPlaying ? <BsSoundwave size={24} /> : <BsVolumeMute size={24} />}
      </button>
    </Html>
  );
}
