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
import { ResourceOptions } from './resource.schema'
import * as pluralize from 'pluralize'

export function main(options: ResourceOptions) {
  options = transform(options)
  return (tree: Tree, context: SchematicContext) => {
    const sourceRule = chain([mergeSourceRoot(options), discoveryModule(options), mergeWith(generate(options))])
    return branchAndMerge(sourceRule)(tree, context)
  }
}

function transform(source: ResourceOptions) {
  const target = Object.assign({}, source)
  const location = NameParser.parse(source)
  target.name = normalizeToKebabOrSnakeCase(location.name)
  target.path = normalizeToKebabOrSnakeCase(location.path)

  target.path = target.flat ? target.path : join(target.path as Path, target.name)
  return target
}

function generate(option: ResourceOptions) {
  // TODO: check orm and swagger install
  return (context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      template({
        ...option,
        ...strings,
        singular: (name: string) => pluralize.singular(name),
        plural: (name: string) => pluralize.plural(name),
        ent: (name: string) => name + '.entity',
      }),
      move(option.path),
    ])
    return templateSource(context)
  }
}
