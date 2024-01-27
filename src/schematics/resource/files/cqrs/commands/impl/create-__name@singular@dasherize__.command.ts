import { Command } from '@nestjs-architects/typed-cqrs'

import { Create<%= classify(singular(name)) %>Dto } from '../../../dto/create-<%= dasherize(singular(name)) %>.dto'
import { <%= classify(singular(name)) %>Entity } from '../../../entities/<%= dasherize(singular(name)) %>.entity'

export class Create<%= classify(singular(name)) %>Command extends Command<<%= classify(singular(name)) %>Entity> {
  constructor(public readonly dto: Create<%= classify(singular(name)) %>Dto) {
    super()
  }
}
