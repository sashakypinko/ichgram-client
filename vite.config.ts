import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  server: {
    host: process.env.VITE_HOST || 'localhost',
    port: process.env.VITE_PORT ? parseInt(process.env.VITE_PORT) : 3000,
    open: true,
  },
})
