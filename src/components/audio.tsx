import { createContext, useContext, useEffect, useRef, useState } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
}

const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  toggleAudio: () => {},
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('./audio/space-ambient.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5; // Start with lower volume

    // Add event listeners
    audioRef.current.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
      console.log('Audio loaded and ready to play');
    });

    audioRef.current.addEventListener('error', (e) => {
      console.error('Audio loading error:', e);
    });

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const toggleAudio = async () => {
    if (!audioRef.current || !isLoaded) return;

    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
