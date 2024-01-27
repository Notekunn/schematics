import { Command } from '@nestjs-architects/typed-cqrs'

import { <%= classify(singular(name)) %>Entity } from '../../../entities/<%= dasherize(singular(name)) %>.entity'

export class Delete<%= classify(singular(name)) %>Command extends Command<<%= classify(singular(name)) %>Entity> {
  constructor(public readonly id: number) {
    super()
  }
}
