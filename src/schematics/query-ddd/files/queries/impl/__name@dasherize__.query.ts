import { Query } from '@nestjs-architects/typed-cqrs'

export class <%= classify(name) %>Query extends Query<any> {
  constructor(public readonly input: any) {
    super()
  }
}
