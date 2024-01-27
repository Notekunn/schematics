import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { Get<%= classify(singular(name)) %>ListQuery } from '../impl/get-<%= dasherize(singular(name)) %>-list.query'

@QueryHandler(Get<%= classify(singular(name)) %>ListQuery)
export class Get<%= classify(singular(name)) %>ListQueryHandler implements IQueryHandler<Get<%= classify(singular(name)) %>ListQuery> {
  constructor() {}

  async execute(query: Get<%= classify(singular(name)) %>ListQuery) {
    return query
  }
}
