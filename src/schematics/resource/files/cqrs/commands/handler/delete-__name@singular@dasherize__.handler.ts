import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { Delete<%= classify(singular(name)) %>Command } from '../impl/delete-<%= dasherize(singular(name)) %>.command'

@CommandHandler(Delete<%= classify(singular(name)) %>Command)
export class Delete<%= classify(singular(name)) %>CommandHandler implements ICommandHandler<Delete<%= classify(singular(name)) %>Command> {
  constructor() {}

  async execute(command: Delete<%= classify(singular(name)) %>Command) {
    return command
  }
}
