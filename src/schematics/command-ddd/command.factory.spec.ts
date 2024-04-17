import { EmptyTree } from '@angular-devkit/schematics'
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing'
import { join } from 'path'
import { CommandOptions } from './command.schema'
describe('CommandDDDFactory', () => {
  const runner = new SchematicTestRunner('.', join(process.cwd(), 'src/collection.json'))

  it('should create a command', async () => {
    const options: CommandOptions = {
      name: 'foo',
      flat: true,
    }
    const tree: UnitTestTree = await runner.runSchematic('command', options)
    const files = tree.files

    const commandFile = files.find((file) => file.endsWith('/commands/impl/foo.command.ts'))
    const handlerFile = files.find((file) => file.endsWith('/commands/handler/foo.handler.ts'))
    expect(commandFile).toBeDefined()
    expect(handlerFile).toBeDefined()
  })

  it('should create a command in a subfolder', async () => {
    const options: CommandOptions = {
      name: 'CreateUser',
      module: 'User',
      sourceRoot: 'src',
    }
    const initTree = new EmptyTree()
    initTree.create('src/modules/users/user.module.ts', 'users module content')
    initTree.create('src/app.module.ts', 'app module content')
    const tree: UnitTestTree = await runner.runSchematic('command', options, initTree)
    const files = tree.files

    const commandFile = files.find((file) => file == '/src/modules/users/commands/impl/create-user.command.ts')
    const handlerFile = files.find((file) => file == '/src/modules/users/commands/handler/create-user.handler.ts')

    expect(commandFile).toBeDefined()
    expect(handlerFile).toBeDefined()

    const commandContent = tree.readContent(commandFile)
    expect(commandContent).toContain(`export class CreateUserCommand extends Command<any>`)
  })
})
