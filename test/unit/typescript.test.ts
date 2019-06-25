import * as assert from 'assert'
import * as Typescript from '../../src/typescript'
import Options from '../../src/options'

const options = new Options({})

describe('Typescript', () => {
    describe('generateTableInterface', () => {
        it('empty table definition object', () => {
            const tableInterface = Typescript.generateTableInterface('tableName', {}, options)
            assert.equal(tableInterface,
`
export const tableName = t.type({

});
export interface tableName extends t.TypeOf<typeof tableName> { };
`)
        })
        it('table name is reserved', () => {
            const tableInterface = Typescript.generateTableInterface('package', {}, options)
            assert.equal(tableInterface,
`
export const package_ = t.type({

});
export interface package_ extends t.TypeOf<typeof package_> { };
`)
        })
        it('table with columns', () => {
            const tableInterface = Typescript.generateTableInterface('tableName', {
                col1: {udtName: 'name1', nullable: false},
                col2: {udtName: 'name2', nullable: false}
            }, options)
            assert.equal(tableInterface,
`
export const tableName = t.type({
col1: tableNameFields_col1,
col2: tableNameFields_col2
});
export interface tableName extends t.TypeOf<typeof tableName> { };
`)
        })
        it('table with reserved columns', () => {
            const tableInterface = Typescript.generateTableInterface('tableName', {
                string: {udtName: 'name1', nullable: false},
                number: {udtName: 'name2', nullable: false},
                package: {udtName: 'name3', nullable: false}
            }, options)
            assert.equal(tableInterface,
`
export const tableName = t.type({
string: tableNameFields_string_,
number: tableNameFields_number_,
package: tableNameFields_package_
});
export interface tableName extends t.TypeOf<typeof tableName> { };
`)
        })
    })
    describe('generateEnumType', () => {
        it('empty object', () => {
            const enumType = Typescript.generateEnumType({}, options)
            assert.equal(enumType,'\n\n\n\n')
        })
        it('with enumerations', () => {
            const enumType = Typescript.generateEnumType({
                enum1: ['val1','val2','val3','val4'],
                enum2: ['val5','val6','val7','val8']
            }, options)
            assert.equal(enumType,
`
export const enum1 = t.union([t.literal('val1'), t.literal('val2'), t.literal('val3'), t.literal('val4')]);
export const enum2 = t.union([t.literal('val5'), t.literal('val6'), t.literal('val7'), t.literal('val8')]);

export type enum1 = t.TypeOf<typeof enum1>;
export type enum2 = t.TypeOf<typeof enum2>;
`)
        })
    })
    describe('generateTableTypes', () => {
        it('empty table definition object', () => {
            const tableTypes = Typescript.generateTableTypes('tableName',{}, options)
            assert.equal(tableTypes, '\n\n\n')
        })
        it('with table definitions', () => {
            const tableTypes = Typescript.generateTableTypes('tableName', {
                col1: {udtName: 'name1', nullable: false, tsType: 'string', iotsType: 't.string'},
                col2: {udtName: 'name2', nullable: false, tsType: 'number', iotsType: 't.number'}
            }, options)
            assert.equal(tableTypes,
`
const tableNameFields_col1 = t.string;
const tableNameFields_col2 = t.number;

`)
        })
        it('with nullable column definitions', () => {
            const tableTypes = Typescript.generateTableTypes('tableName', {
                col1: {udtName: 'name1', nullable: true, tsType: 'string', iotsType: 't.string'},
                col2: {udtName: 'name2', nullable: true, tsType: 'number', iotsType: 't.number'}
            }, options)
            assert.equal(tableTypes,
`
const tableNameFields_col1 = t.union([t.null, t.string]);
const tableNameFields_col2 = t.union([t.null, t.number]);

`)
        })
    })
})
