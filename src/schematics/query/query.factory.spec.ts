import { EmptyTree } from '@angular-devkit/schematics'
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing'
import { join } from 'path'
import { QueryOptions } from './query.schema'
describe('QueryFactory', () => {
  const runner = new SchematicTestRunner('.', join(process.cwd(), 'src/collection.json'))

  it('should create a command', async () => {
    const options: QueryOptions = {
      name: 'foo',
    }
    const tree: UnitTestTree = await runner.runSchematic('query', options)
    const files = tree.files

    const queryFile = files.find((file) => file.endsWith('/cqrs/queries/impl/foo.query.ts'))
    const handlerFile = files.find((file) => file.endsWith('/cqrs/queries/handler/foo.handler.ts'))
    expect(queryFile).toBeDefined()
    expect(handlerFile).toBeDefined()
  })

  it('should create a command in a subfolder', async () => {
    const options: QueryOptions = {
      name: 'GetUser',
      module: 'User',
      sourceRoot: 'src',
    }
    const initTree = new EmptyTree()
    initTree.create('src/modules/users/user.module.ts', 'users module content')
    initTree.create('src/app.module.ts', 'app module content')
    const tree: UnitTestTree = await runner.runSchematic('query', options, initTree)
    const files = tree.files

    const queryFile = files.find((file) => file == '/src/modules/users/cqrs/queries/impl/get-user.query.ts')
    const handlerFile = files.find((file) => file == '/src/modules/users/cqrs/queries/handler/get-user.handler.ts')

    expect(queryFile).toBeDefined()
    expect(handlerFile).toBeDefined()

    const queryContent = tree.readContent(queryFile)
    expect(queryContent).toContain(`export class GetUserQuery extends Query<any>`)
  })
})
