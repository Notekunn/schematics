import { basename, dirname, Path } from '@angular-devkit/core'
import { resolve } from 'path'
export class NameParser {
  public static parse(name: string, path?: string) {
    const nameWithoutPath = basename(name as Path)
    const fullPath = resolve(path || '', name) as Path
    const namePath = dirname(fullPath)

    return {
      name: nameWithoutPath,
      path: namePath,
    }
  }
}
