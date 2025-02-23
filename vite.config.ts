import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
 base: '/Space_Portofilio/',  // Repository name
  build: {
    assetsDir: 'assets',  // Customize the asset directory
  },
  plugins: [react()],
})
