import { Query } from '@nestjs-architects/typed-cqrs'

import { <%= classify(singular(name)) %>Entity } from '../../../entities/<%= dasherize(singular(name)) %>.entity'
import { Get<%= classify(singular(name)) %>Dto } from '../../../dto/get-<%= dasherize(singular(name)) %>.dto'

export class Get<%= classify(singular(name)) %>ListQuery extends Query<any> {
  constructor(public readonly get<%= classify(singular(name)) %>Dto: Get<%= classify(singular(name)) %>Dto) {
    super()
  }
}
