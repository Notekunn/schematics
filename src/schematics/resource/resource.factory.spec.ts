import { EmptyTree } from '@angular-devkit/schematics'
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing'
import { join } from 'path'
import { ResourceOptions } from './resource.schema'

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
      '/posts/dto/response/get-post-response.dto.ts',
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
      '/posts/cqrs/queries/impl/get-post-list.handler.ts',
      '/posts/cqrs/queries/impl/get-post-detail.handler.ts',
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

    const responseDtoContent = tree.readContent('/posts/cqrs/queries/impl/get-post-list.handler.ts')

    console.log(responseDtoContent)
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
      '/public-file/dto/response/get-public-file-response.dto.ts',
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
  })

  // it('should create a command in a subfolder', async () => {
  //   const options: ResourceOptions = {
  //     name: 'User',
  //     sourceRoot: 'src',
  //     orm: 'typeorm',
  //   }
  //   const initTree = new EmptyTree()
  //   // initTree.create('src/modules/users/user.module.ts', 'users module content')
  //   // initTree.create('src/app.module.ts', 'app module content')
  //   const tree: UnitTestTree = await runner.runSchematic('resource', options, initTree)
  //   const files = tree.files

  //   const queryFile = files.find((file) => file == '/src/modules/users/cqrs/queries/impl/get-user.query.ts')
  //   const handlerFile = files.find((file) => file == '/src/modules/users/cqrs/queries/handler/get-user.handler.ts')

  //   expect(queryFile).toBeDefined()
  //   expect(handlerFile).toBeDefined()

  //   const queryContent = tree.readContent(queryFile)
  //   expect(queryContent).toContain(`export class GetUserQuery extends Query<any>`)
  // })
})
