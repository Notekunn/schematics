import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { <%= classify(name) %>Query } from '../impl/<%= dasherize(name) %>.query'

@QueryHandler(<%= classify(name) %>Query)
export class <%= classify(name) %>QueryHandler implements IQueryHandler<<%= classify(name) %>Query> {
  constructor() {}
  
  async execute(query: <%= classify(name) %>Query) {
    return query
  }
}
