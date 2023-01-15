export interface CommandOptions {
  /**
   * The name of the command.
   */
  name: string

  /**
   * The path to create the command.
   */
  path?: string

  /**
   * Flag to indicate if a directory is created.
   */
  flat?: boolean
}
