import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const { mode } = config

  // .env
  const root = process.cwd()
  const { VITE_API_PROXY } = loadEnv(mode, root)

  return {
    plugins: [react()],
    base: "./",
    server: VITE_API_PROXY && {
      proxy: {
        "/v1": {
          target: VITE_API_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace("/v1", ""),
        },
      },
    },
  }
})
