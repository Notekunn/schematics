import { join, normalize, Path, PathFragment, strings } from '@angular-devkit/core'
import { DirEntry, Rule, Tree } from '@angular-devkit/schematics'
import { BaseOptions } from './base-option'

export interface FindResult {
  directory: string
  file: string
}

export class ModuleFinder {
  constructor(private tree: Tree) {}

  public find(path: string, name?: string): FindResult | null {
    const generatedDirectory: DirEntry = this.tree.getDir(path)
    return this.findOut(generatedDirectory, name)
  }

  private findOut(directory: DirEntry, name?: string): FindResult | null {
    if (!directory) {
      return null
    }

    const fileNamePattern = new RegExp(`^${name ? strings.dasherize(name) : '.*'}\.module\.(t|j)s$`)

    const moduleFilename: PathFragment = directory.subfiles.find((filename) => fileNamePattern.test(filename))
    if (!moduleFilename) {
      return this.findOut(directory.parent, name)
    }

    return {
      directory: directory.path,
      file: join(directory.path, moduleFilename.valueOf()),
    }
  }
}

export function discoveryModule<T extends BaseOptions>(options: T): Rule {
  return (tree: Tree) => {
    const moduleFinder = new ModuleFinder(tree)
    if (options?.module && options?.sourceRoot) {
      const modulePaths = [options.module, `${options.module}s`].map((p) =>
        normalize(join(options.sourceRoot as Path, 'modules', strings.dasherize(p))),
      )
      const moduleFounded =
        moduleFinder.find(modulePaths[0], options.module) || moduleFinder.find(modulePaths[1], options.module)
      options.module = moduleFounded?.directory || null
    }

    if (options.module) {
      options.path = options.module
    }

    return tree
  }
}
