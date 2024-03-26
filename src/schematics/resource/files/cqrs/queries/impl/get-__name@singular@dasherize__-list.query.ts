import { Query } from '@nestjs-architects/typed-cqrs'

import { Get<%= classify(singular(name)) %>Dto } from '../../../dto/get-<%= dasherize(singular(name)) %>.dto'

export class Get<%= classify(singular(name)) %>ListQuery extends Query<any> {
  constructor(public readonly dto: Get<%= classify(singular(name)) %>Dto) {
    super()
  }
}
