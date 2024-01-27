import { BaseOptions } from '../../utils/base-option'

export interface ResourceOptions extends BaseOptions {
  orm?: 'typeorm' | 'nonce'

  createDto?: boolean

  crud?: boolean
}
