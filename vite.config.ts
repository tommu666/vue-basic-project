import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: process.env.VITE_ENV_DIR || '../',
  plugins: [vue()],
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
})
