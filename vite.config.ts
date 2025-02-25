import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   base: '/Space_Portfolio/',
  build: {
    
    assetsDir: 'assets',  // Customize the asset directory
    //  minify: "terser", // Alternative minifier that may handle eval better
     terserOptions: {
      compress: {
        drop_console: true, // Optional: Remove console logs for smaller size
      },
      format: {
        comments: false,
      },
    },
  },
  plugins: [react()],
})
