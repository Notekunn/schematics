import { join, normalize } from '@angular-devkit/core'
import { Rule, Tree } from '@angular-devkit/schematics'
import { DEFAULT_PATH_NAME } from './defaults'
import { SchemaType } from './base-option'

export function isInRootDirectory(host: Tree, extraFiles: string[] = []): boolean {
  const files = ['nest-cli.json', 'nest.json'].concat(extraFiles || [])
  return files.map((file) => host.exists(file)).some((isPresent) => isPresent)
}

export function mergeSourceRoot<T extends { sourceRoot?: string; path?: string; type?: SchemaType } = any>(
  options: T,
): Rule {
  return (host: Tree) => {
    const isInRoot = isInRootDirectory(host, ['tsconfig.json', 'package.json'])
    if (!isInRoot) {
      return host
    }
    const defaultSourceRoot = options.sourceRoot || DEFAULT_PATH_NAME

    if (!options.path) {
      options.path = normalize(defaultSourceRoot)
    } else if (options.type === 'resource') {
      options.path = join(normalize(defaultSourceRoot), 'modules', options.path)
    } else {
      options.path = join(normalize(defaultSourceRoot), options.path)
    }

    return host
  }
}
