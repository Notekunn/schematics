import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { <%= classify(singular(name)) %>Repository} from '@module/<%= dasherize(singular(name)) %>/repositories/<%= dasherize(singular(name)) %>.repository'

import { Get<%= classify(singular(name)) %>ListQuery } from '../impl/get-<%= dasherize(singular(name)) %>-list.query'

@QueryHandler(Get<%= classify(singular(name)) %>ListQuery)
export class Get<%= classify(singular(name)) %>ListQueryHandler implements IQueryHandler<Get<%= classify(singular(name)) %>ListQuery> {
  constructor(private readonly <%= camelize(singular(name)) %>Repository: <%= classify(singular(name)) %>Repository) {}

  async execute(query: Get<%= classify(singular(name)) %>ListQuery) {
    const <%= camelize(plural(name)) %> = await this.<%= camelize(singular(name)) %>Repository.find({
      where: {
        ...query.dto,
      },
    })

    return <%= camelize(plural(name)) %>
  }
}
