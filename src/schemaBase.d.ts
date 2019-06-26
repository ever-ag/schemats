import { TableDefinition } from './schemaInterfaces';
import Options from './options';
export declare type TypescriptType = 'string' | 'number' | 'boolean' | 'Object' | 'Date' | 'Array<number>' | 'Array<boolean>' | 'Array<string>' | 'Array<Object>' | 'Array<Date>' | 'any' | 'Buffer';
export declare type IoTsType = 't.string' | 't.number' | 't.boolean' | 't.object' | 'DateType' | 't.array(t.number)' | 't.array(t.boolean)' | 't.array(t.string)' | 't.array(t.object)' | 't.array(DateType)' | 't.any' | 'BufferType';
export declare class DatabaseBase {
    protected static mapTableTypeToNativeType(tableType: string): string;
    protected static mapTypescriptTypetoIoTsType(nativeType: TypescriptType): IoTsType;
    protected static mapTableDefinitionToType(tableDefinition: TableDefinition, customTypes: string[], options: Options): TableDefinition;
}
