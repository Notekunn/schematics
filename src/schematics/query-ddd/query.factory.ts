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
import { QueryOptions } from './query.schema'

export function main(options: QueryOptions) {
  options = transform(options)
  return (tree: Tree, context: SchematicContext) => {
    const sourceRule = chain([mergeSourceRoot(options), discoveryModule(options), mergeWith(generate(options))])
    return branchAndMerge(sourceRule)(tree, context)
  }
}

function transform(source: QueryOptions) {
  const target = Object.assign({}, source)
  const location = NameParser.parse(source)

  target.type = 'query'
  target.name = normalizeToKebabOrSnakeCase(location.name)
  target.path = normalizeToKebabOrSnakeCase(location.path)

  target.path = target.flat ? target.path : join(target.path as Path, target.name)
  return target
}

function generate(option: QueryOptions) {
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
