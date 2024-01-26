import { Body, Controller, Delete, Get, ParseIntPipe, Patch, Post } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

import { Create<%= classify(singular(name)) %>Dto } from '../dto/create-<%= dasherize(singular(name)) %>.dto'
import { Update<%= classify(singular(name)) %>Dto } from '../dto/update-<%= dasherize(singular(name)) %>.dto'

import { Create<%= classify(singular(name)) %>Command } from '../cqrs/commands/impl/create-<%= dasherize(singular(name)) %>.command'
import { Delete<%= classify(singular(name)) %>Command } from '../cqrs/commands/impl/delete-<%= dasherize(singular(name)) %>.command'
import { Update<%= classify(singular(name)) %>Command } from '../cqrs/commands/impl/update-<%= dasherize(singular(name)) %>.command'

@Controller('<%= dasherize(plural(name)) %>')
export class <%= classify(singular(name)) %>Controller {
    constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus){}

    @Post()
    create<%= classify(singular(name)) %>(@Body() create<%= classify(singular(name)) %>Dto: Create<%= classify(singular(name)) %>Dto) {
        return this.commandBus.execute(new Create<%= classify(singular(name)) %>Command(create<%= classify(singular(name)) %>Dto));
    }

    @Get()
    find<%= classify(singular(name)) %>(@Body() get<%= classify(singular(name)) %>Dto: Get<%= classify(singular(name)) %>Dto) {
        return this.queryBus.execute();
    }

    @Get(':id')
    findOne<%= classify(singular(name)) %>(@Param('id', ParseIntPipe) id: number){
        return this.queryBus.execute()
    }

    @Patch(':id')
    update<%= classify(singular(name)) %>(@Param('id', ParseIntPipe) id: number, @Body() update<%= classify(singular(name)) %>Dto: Update<%= classify(singular(name)) %>Dto){
        return this.commandBus.execute(new Update<%= classify(singular(name)) %>Command(id, update<%= classify(singular(name)) %>Dto));
    }

    @Delete(':id')
    delete<%= classify(singular(name)) %>(@Param('id', ParseIntPipe) id: number){
        return this.commandBus.execute(new Delete<%= classify(singular(name)) %>Command(id))
    }
}