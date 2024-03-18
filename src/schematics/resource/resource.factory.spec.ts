import { EmptyTree } from '@angular-devkit/schematics'
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing'
import { join } from 'path'
import { ResourceOptions } from './resource.schema'
import fs from 'fs'

describe('ResourceFactory', () => {
  const runner = new SchematicTestRunner('.', join(process.cwd(), 'src/collection.json'))

  it('should create a command', async () => {
    const options: ResourceOptions = {
      name: 'posts',
      orm: 'typeorm',
      createDto: true,
      crud: true,
    }
    const tree: UnitTestTree = await runner.runSchematic('resource', options)
    const files = tree.files

    const filesMustHave = [
      '/posts/post.module.ts',
      '/posts/dto/create-post.dto.ts',
      '/posts/dto/update-post.dto.ts',
      '/posts/dto/response/post-response.dto.ts',
      '/posts/entities/post.entity.ts',
      '/posts/controllers/post.controller.ts',
      '/posts/cqrs/commands/impl/create-post.command.ts',
      '/posts/cqrs/commands/impl/update-post.command.ts',
      '/posts/cqrs/commands/impl/delete-post.command.ts',
      '/posts/cqrs/commands/handler/create-post.handler.ts',
      '/posts/cqrs/commands/handler/update-post.handler.ts',
      '/posts/cqrs/commands/handler/delete-post.handler.ts',
      '/posts/cqrs/queries/impl/get-post-list.query.ts',
      '/posts/cqrs/queries/impl/get-post-detail.query.ts',
      '/posts/cqrs/queries/handler/get-post-list.handler.ts',
      '/posts/cqrs/queries/handler/get-post-detail.handler.ts',
    ]

    const filesNotIncludes = filesMustHave.filter((fileMustHave) => !files.includes(fileMustHave))

    expect(filesNotIncludes).toEqual([])

    const moduleContent = tree.readContent('/posts/post.module.ts')
    expect(moduleContent).toContain('export class PostModule')

    const entityContent = tree.readContent('/posts/entities/post.entity.ts')
    expect(entityContent).toContain("@Entity('posts')\nexport class PostEntity")

    const createDtoContent = tree.readContent('/posts/dto/create-post.dto.ts')
    expect(createDtoContent).toContain('export class CreatePostDto')

    const updateDtoContent = tree.readContent('/posts/dto/update-post.dto.ts')
    expect(updateDtoContent).toContain('export class UpdatePostDto extends PartialType(CreatePostDto)')
  })

  it('name have > 2 words', async () => {
    const options: ResourceOptions = {
      name: 'PublicFile',
      orm: 'typeorm',
      createDto: true,
      crud: true,
    }
    const tree: UnitTestTree = await runner.runSchematic('resource', options)
    const files = tree.files

    const filesMustHave = [
      '/public-file/public-file.module.ts',
      '/public-file/dto/create-public-file.dto.ts',
      '/public-file/dto/update-public-file.dto.ts',
      '/public-file/dto/response/public-file-response.dto.ts',
      '/public-file/entities/public-file.entity.ts',
    ]

    const filesNotIncludes = filesMustHave.filter((fileMustHave) => !files.includes(fileMustHave))

    expect(filesNotIncludes).toEqual([])

    const moduleContent = tree.readContent('/public-file/public-file.module.ts')
    expect(moduleContent).toContain('export class PublicFileModule')

    const entityContent = tree.readContent('/public-file/entities/public-file.entity.ts')
    expect(entityContent).toContain("@Entity('public_files')\nexport class PublicFileEntity")

    const createDtoContent = tree.readContent('/public-file/dto/create-public-file.dto.ts')
    expect(createDtoContent).toContain('export class CreatePublicFileDto')

    const updateDtoContent = tree.readContent('/public-file/dto/update-public-file.dto.ts')
    expect(updateDtoContent).toContain('export class UpdatePublicFileDto extends PartialType(CreatePublicFileDto)')

    for (const file of files) {
      const directoryName = join(process.cwd(), 'out', file).split('/').slice(0, -1).join('/')
      if (!fs.existsSync(directoryName)) {
        fs.mkdirSync(directoryName, { recursive: true })
      }
      fs.writeFileSync(join(process.cwd(), 'out', file), tree.readContent(file), {
        encoding: 'utf-8',
        flag: 'w',
      })
      console.log(file)
    }
  })

  it('should create a command in a subfolder', async () => {
    const options: ResourceOptions = {
      name: 'User',
      sourceRoot: 'src',
      orm: 'typeorm',
    }
    const initTree = new EmptyTree()
    initTree.create('src/app.module.ts', 'app module content')
    initTree.create('package.json', '')
    initTree.create('tsconfig.json', '')
    const tree: UnitTestTree = await runner.runSchematic('resource', options, initTree)
    const files = tree.files

    const filesMustHave = [
      '/src/modules/user/user.module.ts',
      '/src/modules/user/controllers/user.controller.ts',
      '/src/modules/user/cqrs/commands/handler/create-user.handler.ts',
      '/src/modules/user/cqrs/commands/handler/delete-user.handler.ts',
      '/src/modules/user/cqrs/commands/handler/update-user.handler.ts',
      '/src/modules/user/cqrs/commands/impl/create-user.command.ts',
      '/src/modules/user/cqrs/commands/impl/delete-user.command.ts',
      '/src/modules/user/cqrs/commands/impl/update-user.command.ts',
      '/src/modules/user/cqrs/queries/handler/get-user-detail.handler.ts',
      '/src/modules/user/cqrs/queries/handler/get-user-list.handler.ts',
      '/src/modules/user/cqrs/queries/impl/get-user-detail.query.ts',
      '/src/modules/user/cqrs/queries/impl/get-user-list.query.ts',
      '/src/modules/user/dto/create-user.dto.ts',
      '/src/modules/user/dto/get-user.dto.ts',
      '/src/modules/user/dto/update-user.dto.ts',
      '/src/modules/user/dto/response/user-response.dto.ts',
      '/src/modules/user/entities/user.entity.ts',
      '/src/modules/user/repositories/user.repository.ts',
    ]

    const filesNotIncludes = filesMustHave.filter((fileMustHave) => !files.includes(fileMustHave))

    expect(filesNotIncludes).toEqual([])
  })
})
