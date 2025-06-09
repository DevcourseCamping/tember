import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//import vueDevTools from 'vite-plugin-vue-devtools' - 뷰데브툴 활성화시키고싶으면 다시 키기!

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    /*vueDevTools(),*/
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
