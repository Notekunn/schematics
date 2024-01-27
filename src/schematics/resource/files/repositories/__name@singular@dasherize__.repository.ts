import { CustomRepository } from '@decorators/typeorm-ex.decorator'
import { Repository } from 'typeorm'

import { <%= classify(singular(name)) %>Entity } from '../entities/<%= dasherize(singular(name)) %>.entity'

@CustomRepository(<%= classify(singular(name)) %>Entity)
export class <%= classify(singular(name)) %>Repository extends Repository<<%= classify(singular(name)) %>Entity> {}
