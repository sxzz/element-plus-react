import { getTsConfigPaths } from '@element-plus/build-utils'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import TsconfigPathsPlugin from '@esbuild-plugins/tsconfig-paths'
import { tsConfigPaths } from 'vite-plugin-tsconfig-paths'

export default defineConfig(async () => {
  const paths = await getTsConfigPaths()

  return {
    plugins: [react(), tsConfigPaths()],
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          TsconfigPathsPlugin({
            tsconfig: {
              compilerOptions: { paths },
            },
          }),
        ],
      },
    },
  }
})
