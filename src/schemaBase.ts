import { mapValues } from 'lodash'
import { TableDefinition } from './schemaInterfaces'
import Options from './options'

export type TypescriptType = 'string' | 'number' | 'boolean' | 'Object' | 'Date' | 'Array<number>' | 'Array<boolean>' | 'Array<string>' | 'Array<Object>' | 'Array<Date>' | 'any' | 'Buffer'
export type IoTsType = 't.string' | 't.number' | 't.boolean' | 't.object' | 'DateType' | 't.array(t.number)' | 't.array(t.boolean)' | 't.array(t.string)' | 't.array(t.object)' | 't.array(DateType)' | 't.any' | 'BufferType'

export class DatabaseBase {
    protected static mapTableTypeToNativeType (tableType: string) {
        return tableType
    }

    protected static mapTypescriptTypetoIoTsType (nativeType: TypescriptType): IoTsType {
        switch (nativeType) {
            case 'Array<Date>':
                return 't.array(DateType)'
            case 'Array<Object>':
                return 't.array(t.object)'
            case 'Array<boolean>':
                return 't.array(t.boolean)'
            case 'Array<number>':
                return 't.array(t.number)'
            case 'Array<string>':
                return 't.array(t.string)'
            case 'Date':
                return 'DateType'
            case 'Buffer':
                return 'BufferType'
            case 'Object':
                return 't.object'
            case 'boolean':
                return 't.boolean'
            case 'number':
                return 't.number'
            case 'string':
                return 't.string'
            default:
                return 't.any'
        }
    }

    protected static mapTableDefinitionToType (tableDefinition: TableDefinition, customTypes: string[], options: Options): TableDefinition {
        return mapValues(tableDefinition, column => {
            column.tsType = this.mapTableTypeToNativeType(column.udtName)
            column.iotsType = this.mapTypescriptTypetoIoTsType(column.tsType as TypescriptType)
            if (column.tsType === 'any') {
                if (customTypes.indexOf(column.udtName) !== -1) {
                    column.tsType = options.transformTypeName(column.udtName)
                    column.iotsType = options.transformTypeName(column.udtName)
                } else {
                    console.log(`Type [${column.udtName} has been mapped to [any] because no specific type has been found.`)
                }
            }
            return column
        })
    }

}
