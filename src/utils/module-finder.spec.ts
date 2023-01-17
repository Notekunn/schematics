import { normalize } from '@angular-devkit/core'
import { EmptyTree } from '@angular-devkit/schematics'
import { ModuleFinder } from './module-finder'

describe('Module Finder', () => {
  it('should return the app module path', () => {
    const tree = new EmptyTree()
    tree.create('/src/app.module.ts', 'app module content')
    const finder = new ModuleFinder(tree)
    expect(finder.find(normalize('/src'))?.file).toEqual(normalize('/src/app.module.ts'))
  })
  it('should return the intermediate module path', () => {
    const tree = new EmptyTree()
    tree.create('/src/app.module.ts', 'app module content')
    tree.create('/src/modules/foo.module.ts', 'foo module content')
    const finder = new ModuleFinder(tree)
    expect(finder.find(normalize('/src/modules/foo'), 'app')?.file).toEqual(normalize('/src/app.module.ts'))
  })
  it('should manage javascript module file', () => {
    const tree = new EmptyTree()
    tree.create('/src/app.module.js', 'app module content')
    const finder = new ModuleFinder(tree)
    expect(finder.find(normalize('/src'))?.file).toEqual(normalize('/src/app.module.js'))
  })

  it('should return null when directory does not exist', () => {
    const tree = new EmptyTree()

    const finder = new ModuleFinder(tree)
    expect(finder.find(normalize('/src'), 'foo')).toEqual(null)
  })

  it('should ignore vim swap files', () => {
    const tree = new EmptyTree()
    tree.create('/src/foo/foo.module.ts.swp', 'foo module content')
    const finder = new ModuleFinder(tree)
    expect(finder.find(normalize('/src/foo'))).toEqual(null)
  })
})
