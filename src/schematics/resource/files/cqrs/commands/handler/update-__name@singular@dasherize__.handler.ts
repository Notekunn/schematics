import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { <%= classify(singular(name)) %>Repository} from '@module/<%= dasherize(singular(name)) %>/repositories/<%= dasherize(singular(name)) %>.repository'

import { Update<%= classify(singular(name)) %>Command } from '../impl/update-<%= dasherize(singular(name)) %>.command'

@CommandHandler(Update<%= classify(singular(name)) %>Command)
export class Update<%= classify(singular(name)) %>CommandHandler implements ICommandHandler<Update<%= classify(singular(name)) %>Command> {
  constructor(private readonly <%= camelize(singular(name)) %>Repository: <%= classify(singular(name)) %>Repository) {}

  async execute(command: Update<%= classify(singular(name)) %>Command) {
    const { id, dto } = command
    const <%= camelize(singular(name)) %> = await this.<%= camelize(singular(name)) %>Repository.update(
      {
        id,
      },
      {
        ...dto,
      },
    )

    return <%= camelize(singular(name)) %>
  }
}
