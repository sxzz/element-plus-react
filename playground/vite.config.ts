import path from 'path'
import { getTsConfigPaths, getWorkspaceRoot } from '@element-plus/build-utils'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import TsconfigPathsPlugin from '@esbuild-plugins/tsconfig-paths'
import { tsConfigPaths } from 'vite-plugin-tsconfig-paths'
import Inspect from 'vite-plugin-inspect'

export default defineConfig(async () => {
  const paths = await getTsConfigPaths()

  return {
    plugins: [
      react(),
      tsConfigPaths({
        tsConfigPath: path.resolve(await getWorkspaceRoot(), 'tsconfig.json'),
      }),
      Inspect(),
    ],
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
