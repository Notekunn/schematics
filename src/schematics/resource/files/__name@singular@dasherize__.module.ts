import { TypeOrmExModule } from '@modules/typeorm-ex.module'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { <%= classify(singular(name)) %>Controller } from './controllers/<%= dasherize(singular(name)) %>.controller'
import { Create<%= classify(singular(name)) %>CommandHandler } from './cqrs/commands/handler/create-<%= dasherize(singular(name)) %>.handler'
import { Delete<%= classify(singular(name)) %>CommandHandler } from './cqrs/commands/handler/delete-<%= dasherize(singular(name)) %>.handler'
import { Update<%= classify(singular(name)) %>CommandHandler } from './cqrs/commands/handler/update-<%= dasherize(singular(name)) %>.handler'
import { Get<%= classify(singular(name)) %>DetailQueryHandler } from './cqrs/queries/handler/get-<%= dasherize(singular(name)) %>-detail.handler'
import { Get<%= classify(singular(name)) %>ListQueryHandler } from './cqrs/queries/handler/get-<%= dasherize(singular(name)) %>-list.handler'
import { <%= classify(singular(name)) %>Repository } from './repositories/<%= dasherize(singular(name)) %>.repository'

const CommandHandlers = [Create<%= classify(singular(name)) %>CommandHandler, Update<%= classify(singular(name)) %>CommandHandler, Delete<%= classify(singular(name)) %>CommandHandler]
const QueryHandlers = [Get<%= classify(singular(name)) %>DetailQueryHandler, Get<%= classify(singular(name)) %>ListQueryHandler]

@Module({
  controllers: [<%= classify(singular(name)) %>Controller],
  exports: [],
  imports: [CqrsModule, TypeOrmExModule.forCustomRepository([<%= classify(singular(name)) %>Repository])],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class <%= classify(singular(name)) %>Module {}
