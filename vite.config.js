import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@models': path.resolve(__dirname, './public/models'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500, // Evita warnings por archivos de three grandes
  },
  server: {
    port: 5173,
    open: true,
  },
})
