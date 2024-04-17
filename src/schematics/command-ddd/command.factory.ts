import { join, Path, strings } from '@angular-devkit/core'
import {
  apply,
  branchAndMerge,
  chain,
  move,
  SchematicContext,
  Tree,
  url,
  template,
  mergeWith,
} from '@angular-devkit/schematics'
import { discoveryModule } from '../../utils/module-finder'
import { normalizeToKebabOrSnakeCase } from '../../utils/formatting'
import { NameParser } from '../../utils/name-parser'
import { mergeSourceRoot } from '../../utils/source-root'
import { CommandOptions } from './command.schema'

export function main(options: CommandOptions) {
  options = transform(options)
  return (tree: Tree, context: SchematicContext) => {
    const sourceRule = chain([mergeSourceRoot(options), discoveryModule(options), mergeWith(generate(options))])
    return branchAndMerge(sourceRule)(tree, context)
  }
}

function transform(source: CommandOptions) {
  const target = Object.assign({}, source)
  const location = NameParser.parse(source)
  target.name = normalizeToKebabOrSnakeCase(location.name)
  target.path = normalizeToKebabOrSnakeCase(location.path) as Path

  target.path = target.flat ? target.path : join(target.path as Path, target.name)
  target.type = 'command'

  return target
}

function generate(option: CommandOptions) {
  return (context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      template({
        ...option,
        ...strings,
      }),
      move(option.path),
    ])
    return templateSource(context)
  }
}
