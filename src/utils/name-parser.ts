import { basename, dirname, Path } from '@angular-devkit/core'
import { BaseOptions } from './base-option'
export class NameParser {
  public static parse(options: BaseOptions) {
    const nameWithoutPath = basename(options.name as Path)
    const fullPath = `${options.path || ''}/${options.name}` as Path
    const namePath = dirname(fullPath)

    return {
      name: nameWithoutPath,
      path: namePath,
    }
  }
}
