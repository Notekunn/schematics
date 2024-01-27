import { Query } from '@nestjs-architects/typed-cqrs'

import { <%= classify(singular(name)) %>Entity } from '../../../entities/<%= dasherize(singular(name)) %>.entity'

export class Get<%= classify(singular(name)) %>DetailQuery extends Query<<%= classify(singular(name)) %>Entity> {
  constructor(public readonly id: number) {
    super()
  }
}
