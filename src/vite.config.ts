import { defineConfig } from 'vite'

export default defineConfig({
  base: '/pressure-sensitive-editor/',
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin'
    }
  },
})

