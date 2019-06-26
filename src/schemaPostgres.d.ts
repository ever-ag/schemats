import Options from './options';
import { TableDefinition, Database } from './schemaInterfaces';
import { DatabaseBase, TypescriptType } from './schemaBase';
export declare class PostgresDatabase extends DatabaseBase implements Database {
    connectionString: string;
    private db;
    constructor(connectionString: string);
    protected static mapTableTypeToNativeType(tableType: string): TypescriptType;
    query(queryString: string): Promise<any>;
    getEnumTypes(schema?: string): Promise<any>;
    getTableDefinition(tableName: string, tableSchema: string): Promise<TableDefinition>;
    getTableTypes(tableName: string, tableSchema: string, options: Options): Promise<TableDefinition>;
    getSchemaTables(schemaName: string): Promise<string[]>;
    getDefaultSchema(): string;
}
