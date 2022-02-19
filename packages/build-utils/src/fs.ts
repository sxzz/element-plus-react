import { readFile, access } from 'fs/promises'

export const readJSON = async <T = unknown>(path: string): Promise<T> =>
  JSON.parse(await readFile(path, 'utf-8'))

export const fsExists = (path: string) =>
  access(path).then(
    () => true,
    () => false
  )
