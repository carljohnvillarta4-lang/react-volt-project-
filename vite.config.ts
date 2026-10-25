import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, host: true },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1400,
    rollupOptions: {
      output: {
        // Split heavy vendors so the first paint stays fast and the 3D chunk loads lazily.
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('/node_modules/three/')) return 'three'
          if (id.includes('/node_modules/framer-motion/') || id.includes('/node_modules/motion-')) return 'motion'
          if (id.includes('/node_modules/gsap/')) return 'gsap'
          return undefined
        },
      },
    },
  },
})
