import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { Get<%= classify(singular(name)) %>DetailQuery } from '../impl/get-<%= dasherize(singular(name)) %>-detail.query'

@QueryHandler(Get<%= classify(singular(name)) %>DetailQuery)
export class Get<%= classify(singular(name)) %>DetailQueryHandler implements IQueryHandler<Get<%= classify(singular(name)) %>DetailQuery> {
  constructor() {}

  async execute(query: Get<%= classify(singular(name)) %>DetailQuery) {
    return query
  }
}
