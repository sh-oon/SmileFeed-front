import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from "path";

export default defineConfig({
  plugins: [react()],
  mode: "development",
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 4400,
    proxy: {
      '/v1/api/': {
        // target: 'http://localhost:3000',
        target: 'https://smile-feed-server.herokuapp.com',
        changeOrigin: true,
      },
    },
  },
  //  build: {
  //   outDir: resolve(__dirname, './dist'),
  //   // outDir: './dist',
  //  }
})
