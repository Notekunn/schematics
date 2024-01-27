import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { Create<%= classify(singular(name)) %>Command } from '../impl/create-<%= dasherize(singular(name)) %>.command'

@CommandHandler(Create<%= classify(singular(name)) %>Command)
export class Create<%= classify(singular(name)) %>CommandHandler implements ICommandHandler<Create<%= classify(singular(name)) %>Command> {
  constructor() {}
  
  async execute(command: Create<%= classify(singular(name)) %>Command) {
    return command
  }
}
