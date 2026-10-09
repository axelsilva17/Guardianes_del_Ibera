import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Build de demostración de un solo archivo: incrusta todos los recursos como
// base64 y emite un script clásico (iife) para que el HTML resultante se pueda
// abrir directamente desde el disco (file://) y compartir tal cual.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist-demo',
    emptyOutDir: true,
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true,
      },
    },
  },
})
