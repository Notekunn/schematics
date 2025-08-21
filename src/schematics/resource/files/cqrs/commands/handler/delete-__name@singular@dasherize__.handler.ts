import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { <%= classify(singular(name)) %>Repository} from '@module/<%= dasherize(singular(name)) %>/repositories/<%= dasherize(singular(name)) %>.repository'

import { Delete<%= classify(singular(name)) %>Command } from '../impl/delete-<%= dasherize(singular(name)) %>.command'

@CommandHandler(Delete<%= classify(singular(name)) %>Command)
export class Delete<%= classify(singular(name)) %>CommandHandler implements ICommandHandler<Delete<%= classify(singular(name)) %>Command> {
  constructor(private readonly <%= camelize(singular(name)) %>Repository: <%= classify(singular(name)) %>Repository) {}

  async execute(command: Delete<%= classify(singular(name)) %>Command) {
    const { id } = command
    await this.<%= camelize(singular(name)) %>Repository.softDelete({
      id
    })
  }
}
