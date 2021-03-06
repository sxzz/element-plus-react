import path from 'path'
import { sys, readConfigFile, parseJsonConfigFileContent } from 'typescript'
import { getWorkspaceRoot } from './workspace'

export const getTsConfig = async (tsconfigPath: string) => {
  const configFile = readConfigFile(tsconfigPath, sys.readFile)
  if (configFile.error?.messageText) {
    throw new Error(configFile.error.messageText.toString())
  }

  const parsedConfig = parseJsonConfigFileContent(
    configFile.config,
    sys,
    path.dirname(tsconfigPath)
  )

  if (parsedConfig.errors.length > 0) {
    // eslint-disable-next-line unicorn/error-message
    throw new AggregateError(
      parsedConfig.errors.map((error) => error.messageText)
    )
  }

  return {
    compilerOptions: parsedConfig.options,
  }
}

export const getTsConfigPaths = async () => {
  const root = await getWorkspaceRoot()
  const tsconfigPath = path.resolve(root, 'tsconfig.json')
  const config = await getTsConfig(tsconfigPath)
  const paths = config.compilerOptions.paths!
  return Object.fromEntries(
    Object.entries(paths).map(([key, value]) => [
      key,
      value.map((pathname) => path.join(root, pathname)),
    ])
  )
}
