/**
 * Generate typescript interface from table schema
 * Created by xiamx on 2016-08-10.
 */

import { TableDefinition } from './schemaInterfaces'
import Options from './options'

function nameIsReservedKeyword (name: string): boolean {
    const reservedKeywords = [
        // Reserved Words
        'break',
        'case',
        'catch',
        'class',
        'const',
        'continue',
        'debugger',
        'default',
        'delete',
        'do',
        'else',
        'enum',
        'export',
        'extends',
        'false',
        'finally',
        'for',
        'function',
        'if',
        'import',
        'in',
        'instanceof',
        'new',
        'null',
        'return',
        'super',
        'switch',
        'this',
        'throw',
        'true',
        'try',
        'typeof',
        'var',
        'void',
        'while',
        'with',

        // Strict Mode Reserved Words
        'as',
        'implements',
        'interface',
        'let',
        'package',
        'private',
        'protected',
        'public',
        'static',
        'yield',

        // Contextual Keywords
        'any',
        'boolean',
        'constructor',
        'declare',
        'get',
        'module',
        'require',
        'number',
        'set',
        'string',
        'symbol',
        'type',
        'from',
        'of'
    ]
    return reservedKeywords.indexOf(name) !== -1
}

function normalizeName (name: string, options: Options): string {
    if (nameIsReservedKeyword(name)) {
        return name + '_'
    } else {
        return name
    }
}

export function generateTableInterface (tableNameRaw: string, tableDefinition: TableDefinition, options: Options) {
    const tableName = options.transformTypeName(tableNameRaw)
    const members: string[] = []
    Object.keys(tableDefinition).map(c => options.transformColumnName(c)).forEach((columnName) => {
        members.push(`${columnName}: ${tableName}Fields_${normalizeName(columnName, options)}`)
    })

    const interfaceName = normalizeName(tableName, options)
    return `
export const ${interfaceName} = t.type({
${members.join(',\n')}
});
export interface ${interfaceName} extends t.TypeOf<typeof ${interfaceName}> { };
`
}

export function generateEnumType (enumObject: any, options: Options) {
    const iotsTypes: string[] = []
    const enumTypes: string[] = []
    for (let enumNameRaw in enumObject) {
        const enumName = options.transformTypeName(enumNameRaw)
        const literalTypes = enumObject[enumNameRaw].map((v: string) => `t.literal('${v}')`).join(', ')
        iotsTypes.push(`export const ${enumName} = t.union([${literalTypes}]);`)
        enumTypes.push(`export type ${enumName} = t.TypeOf<typeof ${enumName}>;`)
    }
    return `\n${iotsTypes.join('\n')}\n\n${enumTypes.join('\n')}\n`
}

export function generateTableTypes (tableNameRaw: string, tableDefinition: TableDefinition, options: Options) {
    const tableName = options.transformTypeName(tableNameRaw)
    const types: string[] = []
    Object.keys(tableDefinition).forEach((columnNameRaw) => {
        const columnName = options.transformColumnName(columnNameRaw)
        const typeName = normalizeName(columnName, options)
        const iotsType = tableDefinition[columnNameRaw].iotsType
        if (tableDefinition[columnNameRaw].nullable) {
            types.push(`const ${tableName}Fields_${typeName} = t.union([t.null, ${iotsType}]);`)
        } else {
            types.push(`const ${tableName}Fields_${typeName} = ${iotsType};`)
        }
    })

    return `
${types.join('\n')}

`
}
