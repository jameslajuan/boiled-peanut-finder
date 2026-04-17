import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // CRITICAL: Set base to relative for subdirectory hosting
  base: './', 
})
