import path from 'path'
import { describe, it, expect } from 'vitest'
import { readJSON, fsExists } from '../src'

describe('fs', () => {
  const pkgPath = path.resolve(__dirname, '../package.json')

  it('readJSON should work', async () => {
    const data = await readJSON<any>(pkgPath)
    expect(data).a('object')
    expect(data.name).toBe('@element-plus/build-utils')
  })

  it('fsExists should work', async () => {
    expect(await fsExists(pkgPath)).toBe(true)
    expect(await fsExists('/a/b/c')).toBe(false)
  })
})
