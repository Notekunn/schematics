import { Module } from '@nestjs/common'

import { <%= classify(singular(name)) %>Controller } from './controllers/<%= dasherize(singular(name)) %>.controller.ts'
import { Create<%= classify(singular(name)) %>CommandHandler } from './cqrs/commands/handler/create-<%= dasherize(singular(name)) %>.handler'
import { Update<%= classify(singular(name)) %>CommandHandler } from './cqrs/commands/handler/update-<%= dasherize(singular(name)) %>.handler'
import { Delete<%= classify(singular(name)) %>CommandHandler } from './cqrs/commands/handler/delete-<%= dasherize(singular(name)) %>.handler'

const CommandHandlers = [Create<%= classify(singular(name)) %>CommandHandler, Update<%= classify(singular(name)) %>CommandHandler, Delete<%= classify(singular(name)) %>CommandHandler]
const QueryHandlers = []

@Module({
    controllers: [<%= classify(singular(name)) %>Controller],
    exports: [],
    imports: [],
    providers: [...CommandHandlers, ...QueryHandlers]
})
export class <%= classify(singular(name)) %>Module{}