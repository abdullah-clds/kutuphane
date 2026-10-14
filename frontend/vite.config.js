import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Served from the site root (kutuphane.kapadokya.edu.tr). Override with VITE_BASE for sub-path previews.
  base: process.env.VITE_BASE || '/',
  plugins: [
    tailwindcss(),
    react()
  ],
  optimizeDeps: {
    include: ["gsap"],
  },
});
