import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { NotFoundException } from '@nestjs/common'
import { <%= classify(singular(name)) %>Repository} from '@module/<%= dasherize(singular(name)) %>/repositories/<%= dasherize(singular(name)) %>.repository'

import { Get<%= classify(singular(name)) %>DetailQuery } from '../impl/get-<%= dasherize(singular(name)) %>-detail.query'

@QueryHandler(Get<%= classify(singular(name)) %>DetailQuery)
export class Get<%= classify(singular(name)) %>DetailQueryHandler implements IQueryHandler<Get<%= classify(singular(name)) %>DetailQuery> {
  constructor(private readonly <%= camelize(singular(name)) %>Repository: <%= classify(singular(name)) %>Repository) {}

  async execute(query: Get<%= classify(singular(name)) %>DetailQuery) {
    const <%= camelize(singular(name)) %> = await this.<%= camelize(singular(name)) %>Repository.findOne({
      where: {
        id: query.id,
      },
    })

    if (!<%= camelize(singular(name)) %>) {
      throw new NotFoundException('Not found')
    }

    return <%= camelize(singular(name)) %>
  }
}
