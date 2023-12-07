import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://rafickattour.github.io/appointment-creation',
        changeOrigin: true
      },
    },
  },
  plugins: [react()],
  base: '/appointment-creation'
});