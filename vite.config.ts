import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({command, mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': env
    },
    plugins: [react()],
    server: {
      // proxy server to bypass cors
      proxy: {
        '/api': {
          target: 'https://staging-api.turbine.exchange',
          changeOrigin: true,
        }
      }
    }
  }
})
