import { defineConfig } from 'tsup'

const isDev = process.env.MODE === 'dev'

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  watch: isDev ? ['./src', '../build-utils'] : false,
  noExternal: isDev ? ['@element-plus/build-utils'] : [],
})
