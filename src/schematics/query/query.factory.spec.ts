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
})
