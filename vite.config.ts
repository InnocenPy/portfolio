import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  build: {
    rolldownOptions: {
      output: {
        // Vendor-split heavy 3D/animation libs for long-term caching. Order = priority.
        codeSplitting: {
          groups: [
            { name: 'vendor-three', test: /[\/]node_modules[\/]three[\/]/, priority: 40 },
            { name: 'vendor-drei', test: /[\/]node_modules[\/]@react-three[\/]drei[\/]/, priority: 30 },
            { name: 'vendor-fiber', test: /[\/]node_modules[\/]@react-three[\/]fiber[\/]/, priority: 20 },
            { name: 'vendor-gsap', test: /[\/]node_modules[\/]gsap[\/]/, priority: 10 },
          ],
        },
      },
    },
  },
})
