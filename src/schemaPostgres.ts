import * as PgPromise from 'pg-promise'
import { keys } from 'lodash'
import Options from './options'
import { TableDefinition, Database } from './schemaInterfaces'
import { DatabaseBase, TypescriptType } from './schemaBase'

const pgp = PgPromise()

export class PostgresDatabase extends DatabaseBase implements Database {
    private db: PgPromise.IDatabase<{}>

    constructor (public connectionString: string) {
        super()
        this.db = pgp(connectionString)
    }

    protected static mapTableTypeToNativeType (tableType: string): TypescriptType {
        switch (tableType) {
            case 'bpchar':
            case 'char':
            case 'varchar':
            case 'text':
            case 'citext':
            case 'uuid':
            case 'bytea':
            case 'inet':
            case 'time':
            case 'timetz':
            case 'interval':
            case 'name':
                return 'string'
            case 'int2':
            case 'int4':
            case 'int8':
            case 'float4':
            case 'float8':
            case 'numeric':
            case 'money':
            case 'oid':
                return 'number'
            case 'bool':
                return 'boolean'
            case 'json':
            case 'jsonb':
                return 'Object'
            case 'date':
            case 'timestamp':
            case 'timestamptz':
                return 'Date'
            case '_int2':
            case '_int4':
            case '_int8':
            case '_float4':
            case '_float8':
            case '_numeric':
            case '_money':
                return 'Array<number>'
            case '_bool':
                return 'Array<boolean>'
            case '_varchar':
            case '_text':
            case '_citext':
            case '_uuid':
            case '_bytea':
                return 'Array<string>'
            case '_json':
            case '_jsonb':
                return 'Array<Object>'
            case '_timestamptz':
                return 'Array<Date>'
            default:
                return 'any'
        }
    }

    public query (queryString: string) {
        return this.db.query(queryString)
    }

    public async getEnumTypes (schema?: string) {
        type T = {name: string, value: any}
        let enums: any = {}
        let enumSchemaWhereClause = schema ? pgp.as.format(`where n.nspname = $1`, schema) : ''
        await this.db.each<T>(
             'select n.nspname as schema, t.typname as name, e.enumlabel as value ' +
             'from pg_type t ' +
             'join pg_enum e on t.oid = e.enumtypid ' +
             'join pg_catalog.pg_namespace n ON n.oid = t.typnamespace ' +
             `${enumSchemaWhereClause} ` +
             'order by t.typname asc, e.enumlabel asc;', [],
            (item: T) => {
                if (!enums[item.name]) {
                    enums[item.name] = []
                }
                enums[item.name].push(item.value)
            }
        )
        return enums
    }

    public async getTableDefinition (tableName: string, tableSchema: string) {
        let tableDefinition: TableDefinition = {}
        type T = { column_name: string, udt_name: string, is_nullable: string, description: string | null }
        await this.db.each<T>(`
            SELECT
                c.column_name,
                c.udt_name,
                c.is_nullable,
                pgd.description
            FROM information_schema.columns AS c
            LEFT JOIN pg_catalog.pg_statio_all_tables AS st
                ON c.table_schema = st.schemaname
                AND c.table_name = st.relname
            LEFT JOIN pg_catalog.pg_description AS pgd
                ON st.relid = pgd.objoid
                AND c.ordinal_position = pgd.objsubid
            WHERE table_name = $1 AND table_schema = $2`,
            [tableName, tableSchema],
            (schemaItem: T) => {
                tableDefinition[schemaItem.column_name] = {
                    udtName: schemaItem.udt_name,
                    nullable: schemaItem.is_nullable === 'YES',
                    comment: schemaItem.description
                }
            })
        return tableDefinition
    }

    public async getTableTypes (tableName: string, tableSchema: string, options: Options) {
        let enumTypes = await this.getEnumTypes()
        let customTypes = keys(enumTypes)
        return PostgresDatabase.mapTableDefinitionToType(await this.getTableDefinition(tableName, tableSchema), customTypes, options)
    }

    public async getSchemaTables (schemaName: string): Promise<string[]> {
        return await this.db.map<string>(
            'SELECT table_name ' +
            'FROM information_schema.columns ' +
            'WHERE table_schema = $1 ' +
            'GROUP BY table_name',
            [schemaName],
            (schemaItem: {table_name: string}) => schemaItem.table_name
        )
    }

    getDefaultSchema (): string {
        return 'public'
    }
}
