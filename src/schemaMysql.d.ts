import { TableDefinition, Database } from './schemaInterfaces';
import Options from './options';
import { DatabaseBase, TypescriptType } from './schemaBase';
export declare class MysqlDatabase extends DatabaseBase implements Database {
    connectionString: string;
    private db;
    private defaultSchema;
    constructor(connectionString: string);
    protected static mapTableTypeToNativeType(tableType: string): TypescriptType;
    private static parseMysqlEnumeration;
    private static getEnumNameFromColumn;
    query(queryString: string): Promise<Object[]>;
    getEnumTypes(schema?: string): Promise<any>;
    getTableDefinition(tableName: string, tableSchema: string): Promise<TableDefinition>;
    getTableTypes(tableName: string, tableSchema: string, options: Options): Promise<TableDefinition>;
    getSchemaTables(schemaName: string): Promise<string[]>;
    queryAsync(queryString: string, escapedValues?: Array<string>): Promise<Object[]>;
    getDefaultSchema(): string;
}
