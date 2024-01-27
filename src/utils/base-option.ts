export type SchemaType = 'query' | 'command' | 'resource'
export interface BaseOptions {
  type?: SchemaType

  name: string

  path?: string

  flat?: boolean

  sourceRoot?: string

  module?: string
}
