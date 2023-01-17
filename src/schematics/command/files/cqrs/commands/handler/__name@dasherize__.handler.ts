import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { <%= classify(name) %>Command } from '../impl/<%= dasherize(name) %>.command'

@CommandHandler(<%= classify(name) %>Command)
export class <%= classify(name) %>CommandHandler implements ICommandHandler<<%= classify(name) %>Command> {
  async execute(command: <%= classify(name) %>Command) {
    return command
  }
}
