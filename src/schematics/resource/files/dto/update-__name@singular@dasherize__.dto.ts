import { PartialType } from '@nestjs/swagger'

import { Create<%=classify(singular(name))%>Dto } from './create-<%=classify(singular(dasherize))%>.dto'

export class Update<%=classify(singular(name))%>Dto extends PartialType(Create<%=classify(singular(name))%>Dto) {}
