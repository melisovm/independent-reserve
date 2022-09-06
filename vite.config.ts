import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: [
      { find: "@assets", replacement: path.resolve(__dirname, "./src/assets/") },
      { find: "@", replacement: path.resolve(__dirname, "./src/") },
    ],
  },
})
