import * as mysql from 'mysql'
import { keys, isEqual } from 'lodash'
import { parse as urlParse } from 'url'
import { TableDefinition, Database } from './schemaInterfaces'
import Options from './options'
import { DatabaseBase, TypescriptType } from './schemaBase'

export class MysqlDatabase extends DatabaseBase implements Database {
    private db: mysql.Connection
    private defaultSchema: string

    constructor (public connectionString: string) {
        super()
        this.db = mysql.createConnection(connectionString)
        let url = urlParse(connectionString, true)
        if (url && url.pathname) {
            let database = url.pathname.substr(1)
            this.defaultSchema = database
        } else {
            this.defaultSchema = 'public'
        }
    }

    // uses the type mappings from https://github.com/mysqljs/ where sensible
    protected static mapTableTypeToNativeType (tableType: string): TypescriptType {
        switch (tableType) {
            case 'char':
            case 'varchar':
            case 'text':
            case 'tinytext':
            case 'mediumtext':
            case 'longtext':
            case 'time':
            case 'geometry':
            case 'set':
            case 'enum':
                // keep set and enum defaulted to string if custom type not mapped
                return 'string'
            case 'integer':
            case 'int':
            case 'smallint':
            case 'mediumint':
            case 'bigint':
            case 'double':
            case 'decimal':
            case 'numeric':
            case 'float':
            case 'year':
                return 'number'
            case 'tinyint':
                return 'boolean'
            case 'json':
                return 'Object'
            case 'date':
            case 'datetime':
            case 'timestamp':
                return 'Date'
            case 'tinyblob':
            case 'mediumblob':
            case 'longblob':
            case 'blob':
            case 'binary':
            case 'varbinary':
            case 'bit':
                return 'Buffer'
            default:
                return 'any'
        }
    }

    private static parseMysqlEnumeration (mysqlEnum: string): string[] {
        return mysqlEnum.replace(/(^(enum|set)\('|'\)$)/gi, '').split(`','`)
    }

    private static getEnumNameFromColumn (dataType: string, columnName: string): string {
        return `${dataType}_${columnName}`
    }

    public query (queryString: string) {
        return this.queryAsync(queryString)
    }

    public async getEnumTypes (schema?: string) {
        let enums: any = {}
        let enumSchemaWhereClause: string
        let params: string[]
        if (schema) {
            enumSchemaWhereClause = `and table_schema = ?`
            params = [schema]
        } else {
            enumSchemaWhereClause = ''
            params = []
        }
        const rawEnumRecords = await this.queryAsync(
            'SELECT column_name AS column_name, column_type AS column_type, data_type AS data_type ' +
            'FROM information_schema.columns ' +
            `WHERE data_type IN ('enum', 'set') ${enumSchemaWhereClause}`,
            params
        )
        rawEnumRecords.forEach((enumItem: { column_name: string, column_type: string, data_type: string }) => {
            const enumName = MysqlDatabase.getEnumNameFromColumn(enumItem.data_type, enumItem.column_name)
            const enumValues = MysqlDatabase.parseMysqlEnumeration(enumItem.column_type)
            if (enums[enumName] && !isEqual(enums[enumName], enumValues)) {
                const errorMsg = `Multiple enums with the same name and contradicting types were found: ` +
                    `${enumItem.column_name}: ${JSON.stringify(enums[enumName])} and ${JSON.stringify(enumValues)}`
                throw new Error(errorMsg)
            }
            enums[enumName] = enumValues
        })
        return enums
    }

    public async getTableDefinition (tableName: string, tableSchema: string) {
        let tableDefinition: TableDefinition = {}

        const tableColumns = await this.queryAsync(`
            SELECT
                column_name AS column_name,
                data_type AS data_type,
                is_nullable AS is_nullable,
                column_comment AS column_comment
            FROM information_schema.columns
            WHERE table_name = ? AND table_schema = ?`,
            [tableName, tableSchema]
        )
        tableColumns.map((schemaItem: { column_name: string, data_type: string, is_nullable: string, column_comment: string }) => {
            const columnName = schemaItem.column_name
            const dataType = schemaItem.data_type
            tableDefinition[columnName] = {
                udtName: /^(enum|set)$/i.test(dataType) ? MysqlDatabase.getEnumNameFromColumn(dataType, columnName) : dataType,
                nullable: schemaItem.is_nullable === 'YES',
                comment: schemaItem.column_comment
            }
        })
        return tableDefinition
    }

    public async getTableTypes (tableName: string, tableSchema: string, options: Options) {
        const enumTypes: any = await this.getEnumTypes(tableSchema)
        let customTypes = keys(enumTypes)
        return MysqlDatabase.mapTableDefinitionToType(await this.getTableDefinition(tableName, tableSchema), customTypes, options)
    }

    public async getSchemaTables (schemaName: string): Promise<string[]> {
        const schemaTables = await this.queryAsync(
            'SELECT table_name ' +
            'FROM information_schema.columns ' +
            'WHERE table_schema = ? ' +
            'GROUP BY table_name',
            [schemaName]
        )
        return schemaTables.map((schemaItem: { table_name: string }) => schemaItem.table_name)
    }

    public queryAsync (queryString: string, escapedValues?: Array<string>): Promise<Object[]> {
        return new Promise((resolve, reject) => {
            this.db.query(queryString, escapedValues, (error: mysql.MysqlError, results: Array<Object>) => {
                if (error) {
                    return reject(error)
                }
                return resolve(results)
            })
        })
    }

    public getDefaultSchema (): string {
        return this.defaultSchema
    }
}
