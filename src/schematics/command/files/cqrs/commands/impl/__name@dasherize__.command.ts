import { Command } from '@nestjs-architects/typed-cqrs'
export class <%= classify(name) %>Command extends Command<any> {
  constructor(public readonly input: any) {
    super()
  }
}
