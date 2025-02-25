import { motion } from 'motion/react';
import { Outlet } from 'react-router-dom';
import { Html } from '@react-three/drei';

export default function PageLayout() {
  return (
    <Html>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <Outlet /> {/* This is where the current page will be injected */}
      </motion.div>
    </Html>
  );
}
