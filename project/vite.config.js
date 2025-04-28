import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import path from 'path'
export default defineConfig({
  plugins: [vue(),],
  base: '/invite/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    emptyOutDir: true,
    outDir: path.resolve(__dirname, '../invite'),
    rollupOptions: {
      input: ['src/main.js', './index.html']
    },
  },

})
