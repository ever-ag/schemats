import * as assert from 'assert'
import * as sinon from 'sinon'
import * as proxyquire from 'proxyquire'
import * as PgPromise from 'pg-promise'
import { TableDefinition } from '../../src/schemaInterfaces'
import Options from '../../src/options'

const options = new Options({})
const pgp = PgPromise()

describe('PostgresDatabase', () => {
    const sandbox = sinon.sandbox.create()
    const db = {
        query: sandbox.stub(),
        each: sandbox.stub(),
        map: sandbox.stub()
    }
    let PostgresDBReflection: any
    let PostgresProxy: any
    before(() => {
        const pgpStub: any = () => db
        pgpStub.as = pgp.as
        const SchemaPostgres = proxyquire('../../src/schemaPostgres', {
            'pg-promise': () => pgpStub
        })
        PostgresDBReflection = SchemaPostgres.PostgresDatabase
        PostgresProxy = new PostgresDBReflection()
    })
    beforeEach(() => {
        sandbox.reset()
    })
    after(() => {
        sandbox.restore()
    })
    describe('query', () => {
        it('calls postgres query', () => {
            PostgresProxy.query('SELECT * FROM TEST')
            assert.equal(db.query.getCall(0).args[0], 'SELECT * FROM TEST')
        })
    })
    describe('getEnumTypes', () => {
        it('writes correct query with schema name', () => {
            PostgresProxy.getEnumTypes('schemaName')
            assert.equal(db.each.getCall(0).args[0],
                'select n.nspname as schema, t.typname as name, e.enumlabel as value ' +
                'from pg_type t join pg_enum e on t.oid = e.enumtypid ' +
                'join pg_catalog.pg_namespace n ON n.oid = t.typnamespace ' +
                'where n.nspname = \'schemaName\' ' +
                'order by t.typname asc, e.enumlabel asc;')
            assert.deepEqual(db.each.getCall(0).args[1], [])
        })
        it('writes correct query without schema name', () => {
            PostgresProxy.getEnumTypes()
            assert.equal(db.each.getCall(0).args[0],
                'select n.nspname as schema, t.typname as name, e.enumlabel as value ' +
                'from pg_type t join pg_enum e on t.oid = e.enumtypid ' +
                'join pg_catalog.pg_namespace n ON n.oid = t.typnamespace  ' +
                'order by t.typname asc, e.enumlabel asc;')
            assert.deepEqual(db.each.getCall(0).args[1], [])
        })
        it('handles response from db', async () => {
            let enums = await PostgresProxy.getEnumTypes()
            const callback = db.each.getCall(0).args[2]
            const dbResponse = [
                {name: 'name', value: 'value1'},
                {name: 'name', value: 'value2'}
            ]
            dbResponse.forEach(callback)
            assert.deepEqual(enums, {name: ['value1', 'value2']})
        })
    })
    describe('getTableDefinition', () => {
        it('writes correct query', () => {
            PostgresProxy.getTableDefinition('tableName', 'schemaName')
            assert.equal(db.each.getCall(0).args[0],
            `
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
            WHERE table_name = $1 AND table_schema = $2`)
            assert.deepEqual(db.each.getCall(0).args[1], ['tableName', 'schemaName'])
        })
        it('handles response from db', async () => {
            let tableDefinition = await PostgresProxy.getTableDefinition()
            const callback = db.each.getCall(0).args[2]
            const dbResponse = [
                {column_name: 'col1', udt_name: 'int2', is_nullable: 'YES', description: null },
                {column_name: 'col2', udt_name: 'text', is_nullable: 'NO', description: 'col2 description text' }
            ]
            dbResponse.forEach(callback)
            assert.deepEqual(tableDefinition, {
                col1: { udtName: 'int2', nullable: true, comment: null },
                col2: { udtName: 'text', nullable: false, comment: 'col2 description text' }
            })
        })
    })
    describe('getTableTypes', () => {
        const tableTypesSandbox = sinon.sandbox.create()
        before(() => {
            tableTypesSandbox.stub(PostgresProxy, 'getEnumTypes')
            tableTypesSandbox.stub(PostgresProxy, 'getTableDefinition')
            tableTypesSandbox.stub(PostgresDBReflection, 'mapTableDefinitionToType')
        })
        beforeEach(() => {
            tableTypesSandbox.reset()
        })
        after(() => {
            tableTypesSandbox.restore()
        })
        it('gets custom types from enums', async () => {
            PostgresProxy.getEnumTypes.returns(Promise.resolve({enum1: [], enum2: []}))
            PostgresProxy.getTableDefinition.returns(Promise.resolve({}))
            await PostgresProxy.getTableTypes('tableName', 'tableSchema')
            assert.deepEqual(PostgresDBReflection.mapTableDefinitionToType.getCall(0).args[1], ['enum1', 'enum2'])
        })
        it('gets table definitions', async () => {
            PostgresProxy.getEnumTypes.returns(Promise.resolve({}))
            PostgresProxy.getTableDefinition.returns(Promise.resolve({ table: {
                udtName: 'name',
                nullable: false,
                comment: null
            }}))
            await PostgresProxy.getTableTypes('tableName', 'tableSchema')
            assert.deepEqual(PostgresProxy.getTableDefinition.getCall(0).args, ['tableName', 'tableSchema'])
            assert.deepEqual(PostgresDBReflection.mapTableDefinitionToType.getCall(0).args[0], { table: {
                udtName: 'name',
                nullable: false,
                comment: null
            }})
        })
    })
    describe('getSchemaTables', () => {
        it('writes correct query', () => {
            PostgresProxy.getSchemaTables('schemaName')
            assert.equal(db.map.getCall(0).args[0],
                'SELECT table_name ' +
                'FROM information_schema.columns ' +
                'WHERE table_schema = $1 ' +
                'GROUP BY table_name')
            assert.deepEqual(db.map.getCall(0).args[1], ['schemaName'])
        })
        it('handles response from db', async () => {
            await PostgresProxy.getSchemaTables()
            const callback = db.map.getCall(0).args[2]
            const dbResponse = [
                {table_name: 'table1'},
                {table_name: 'table2'}
            ]
            const schemaTables = dbResponse.map(callback)
            assert.deepEqual(schemaTables, ['table1','table2'])
        })
    })
    describe('mapTableDefinitionToType', () => {
        describe('maps to string', () => {
            it('bpchar', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'bpchar',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
            it('char', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'char',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
            it('varchar', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'varchar',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
            it('text', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'text',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
            it('citext', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'citext',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
            it('uuid', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'uuid',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
            it('bytea', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'bytea',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
            it('inet', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'inet',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
            it('time', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'time',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
            it('timetz', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'timetz',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
            it('interval', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'interval',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
            it('date', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'date',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
            it('name', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'name',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
        })
        describe('maps to number', () => {
            it('int2', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'int2',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'number')
            })
            it('int4', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'int4',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'number')
            })
            it('int8', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'int8',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'number')
            })
            it('float4', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'float4',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'number')
            })
            it('float8', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'float8',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'number')
            })
            it('numeric', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'numeric',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'number')
            })
            it('money', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'money',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'number')
            })
            it('oid', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'oid',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'number')
            })
        })
        describe('maps to boolean', () => {
            it('bool', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'bool',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'boolean')
            })
        })
        describe('maps to Object', () => {
            it('json', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'json',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Object')
            })
            it('jsonb', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'jsonb',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Object')
            })
        })
        describe('maps to Date', () => {
            it('timestamp', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'timestamp',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Date')
            })
            it('timestamptz', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'timestamptz',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Date')
            })
        })
        describe('maps to Array<number>', () => {
            it('_int2', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: '_int2',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Array<number>')
            })
            it('_int4', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: '_int4',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Array<number>')
            })
            it('_int8', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: '_int8',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Array<number>')
            })
            it('_float4', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: '_float4',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Array<number>')
            })
            it('_float8', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: '_float8',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Array<number>')
            })
            it('_numeric', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: '_numeric',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Array<number>')
            })
            it('_money', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: '_money',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Array<number>')
            })
        })
        describe('maps to Array<boolean>', () => {
            it('_bool', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: '_bool',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td, ['CustomType'], options).column.tsType, 'Array<boolean>')
            })
        })
        describe('maps to Array<string>', () => {
            it('_varchar', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: '_varchar',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td, ['CustomType'], options).column.tsType, 'Array<string>')
            })
            it('_text', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: '_text',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td, ['CustomType'], options).column.tsType, 'Array<string>')
            })
            it('_citext', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: '_citext',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td, ['CustomType'], options).column.tsType, 'Array<string>')
            })
            it('_uuid', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: '_uuid',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td, ['CustomType'], options).column.tsType, 'Array<string>')
            })
            it('_bytea', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: '_bytea',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td, ['CustomType'], options).column.tsType, 'Array<string>')
            })
        })

        describe('maps to Array<Object>', () => {
            it('_json', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: '_json',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Array<Object>')
            })
            it('_jsonb', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: '_jsonb',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Array<Object>')
            })
        })

        describe('maps to Array<Date>', () => {
            it('_timestamptz', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: '_timestamptz',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Array<Date>')
            })
        })

        describe('maps to custom', () => {
            it('CustomType', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'CustomType',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td, ['CustomType'], options).column.tsType, 'CustomType')
            })
        })
        describe('maps to any', () => {
            it('UnknownType', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'UnknownType',
                        nullable: false,
                        comment: null
                    }
                }
                assert.equal(PostgresDBReflection.mapTableDefinitionToType(td, ['CustomType'], options).column.tsType, 'any')
            })
        })
    })
})
