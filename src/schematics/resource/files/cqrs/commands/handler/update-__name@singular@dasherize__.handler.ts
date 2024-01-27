import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { Update<%= classify(singular(name)) %>Command } from '../impl/update-<%= dasherize(singular(name)) %>.command'

@CommandHandler(Update<%= classify(singular(name)) %>Command)
export class Update<%= classify(singular(name)) %>CommandHandler implements ICommandHandler<Update<%= classify(singular(name)) %>Command> {
  constructor() {}

  async execute(command: Update<%= classify(singular(name)) %>Command) {
    return command
  }
}
