import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing'
import { join } from 'path'
import { CommandOptions } from './command.schema'
describe('CommandFactory', () => {
  const runner = new SchematicTestRunner('.', join(process.cwd(), 'src/collection.json'))

  it('should create a command', async () => {
    const options: CommandOptions = {
      name: 'foo',
    }
    const tree: UnitTestTree = await runner.runSchematic('command', options)
    const files = tree.files

    const commandFile = files.find((file) => file.endsWith('/cqrs/commands/impl/foo.command.ts'))
    const handlerFile = files.find((file) => file.endsWith('/cqrs/commands/handler/foo.handler.ts'))
    expect(commandFile).toBeDefined()
    expect(handlerFile).toBeDefined()
  })
})
