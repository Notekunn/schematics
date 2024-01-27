import { Command } from '@nestjs-architects/typed-cqrs'

import { Update<%= classify(singular(name)) %>Dto } from '../../../dto/update-<%= dasherize(singular(name)) %>.dto'
import { <%= classify(singular(name)) %>Entity } from '../../../entities/<%= dasherize(singular(name)) %>.entity'

export class Update<%= classify(singular(name)) %>Command extends Command<<%= classify(singular(name)) %>Entity> {
  constructor(public readonly id: number, public readonly dto: Update<%= classify(singular(name)) %>Dto) {
    super()
  }
}
