import path from 'path'
import { program } from 'commander'
import {
  getDependencies,
  getWorkspacePackages,
  fsExists,
} from '@element-plus/build-utils'
import { build as tsup } from 'tsup'
import { register } from 'esbuild-register/dist/node'
import type { Project } from '@element-plus/build-utils'
import type { BuildOptions } from './types'

program
  .name('Element Plus React CLI')
  .command('build [packageName]')
  .description('build package')
  .action(build)
  .parse(process.argv)

export type BuildOptionsResolved = Required<BuildOptions>

function resolveConfig(options?: BuildOptions): BuildOptionsResolved {
  return {
    format: ['cjs', 'esm'],
    ...(options ?? {}),
  }
}

async function loadConfig(pkg: Project): Promise<BuildOptionsResolved> {
  const configPath = path.resolve(pkg.dir, 'build.config.ts')
  if (!(await fsExists(configPath))) return resolveConfig({})
  const { unregister } = register()
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const config = require(configPath).default
  unregister()
  return resolveConfig(config)
}

async function build(packageName?: string) {
  const pkgs = await getWorkspacePackages()
  let pkg: Project
  if (packageName) {
    pkg = pkgs[packageName]
  } else {
    pkg = Object.values(pkgs).find((pkg) => pkg.dir === process.cwd())!
  }
  if (!pkg) throw new Error("pkg doesn't exist!")
  const deps = getDependencies(pkg)
  const config = await loadConfig(pkg)

  const inject = []
  if (deps.includes('react')) {
    inject.push(path.resolve(__dirname, '../react-shim.ts'))
  }

  process.chdir(pkg.dir)
  tsup({
    name: 'ep-cli-tsup',
    entry: [path.resolve(pkg.dir, 'src')],
    outDir: path.resolve(pkg.dir, 'dist'),
    target: 'es2018',
    format: config.format ?? ['esm', 'cjs'],
    splitting: false,
    clean: true,
    inject,
  })
}
