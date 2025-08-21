import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { <%= classify(singular(name)) %>Repository} from '@module/<%= dasherize(singular(name)) %>/repositories/<%= dasherize(singular(name)) %>.repository'

import { Create<%= classify(singular(name)) %>Command } from '../impl/create-<%= dasherize(singular(name)) %>.command'

@CommandHandler(Create<%= classify(singular(name)) %>Command)
export class Create<%= classify(singular(name)) %>CommandHandler implements ICommandHandler<Create<%= classify(singular(name)) %>Command> {
  constructor(private readonly <%= camelize(singular(name)) %>Repository: <%= classify(singular(name)) %>Repository) {}

  async execute(command: Create<%= classify(singular(name)) %>Command) {
    const { dto } = command
    const <%= camelize(singular(name)) %> = await this.<%= camelize(singular(name)) %>Repository.save({
      ...dto
    })

    return <%= camelize(singular(name)) %>
  }
}
