import react from '@vitejs/plugin-react-swc'
// Provee soporte para los navegadores obsoletos en el compilado para producción.
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  preview: {
    port: 5000
  },
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
})