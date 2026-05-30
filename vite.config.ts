import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages deployment (change to your repo name if needed, or '/' for Vercel/Netlify)
  base: '/',
})
