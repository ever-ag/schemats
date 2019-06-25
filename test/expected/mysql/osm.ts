/* tslint:disable */

import * as t from 'io-ts';
const DateType = new t.Type<Date, Date, unknown>(
    'DateType',
    (u): u is Date => u instanceof Date,
    (u, c) => (u instanceof Date ? t.success(u) : t.failure(u, c)),
    a => a,
);
const BufferType = new t.Type<Buffer, Buffer, unknown>(
    'BufferType',
    (u): u is Buffer => u instanceof Buffer,
    (u, c) => (u instanceof Buffer ? t.success(u) : t.failure(u, c)),
    a => a,
);

export const enum_enum_col = t.union([t.literal('enum1'), t.literal('enum2'), t.literal('enum3')]);
export const enum_enum_col_nullable = t.union([t.literal('enum1'), t.literal('enum2'), t.literal('enum3')]);
export const set_set_col = t.union([t.literal('set1'), t.literal('set2'), t.literal('set3')]);
export const set_set_col_nullable = t.union([t.literal('set1'), t.literal('set2'), t.literal('set3')]);

export type enum_enum_col = t.TypeOf<typeof enum_enum_col>;
export type enum_enum_col_nullable = t.TypeOf<typeof enum_enum_col_nullable>;
export type set_set_col = t.TypeOf<typeof set_set_col>;
export type set_set_col_nullable = t.TypeOf<typeof set_set_col_nullable>;

const usersFields_bigint_col = t.number;
const usersFields_bigint_col_nullable = t.union([t.null, t.number]);
const usersFields_binary_col = BufferType;
const usersFields_binary_col_nullable = t.union([t.null, BufferType]);
const usersFields_bit_col = BufferType;
const usersFields_bit_col_nullable = t.union([t.null, BufferType]);
const usersFields_blob_col = BufferType;
const usersFields_blob_col_nullable = t.union([t.null, BufferType]);
const usersFields_char_col = t.string;
const usersFields_char_col_nullable = t.union([t.null, t.string]);
const usersFields_date_col = DateType;
const usersFields_date_col_nullable = t.union([t.null, DateType]);
const usersFields_datetime_col = DateType;
const usersFields_datetime_col_nullable = t.union([t.null, DateType]);
const usersFields_decimal_col = t.number;
const usersFields_decimal_col_nullable = t.union([t.null, t.number]);
const usersFields_double_col = t.number;
const usersFields_double_col_nullable = t.union([t.null, t.number]);
const usersFields_enum_col = enum_enum_col;
const usersFields_enum_col_nullable = t.union([t.null, enum_enum_col_nullable]);
const usersFields_float_col = t.number;
const usersFields_float_col_nullable = t.union([t.null, t.number]);
const usersFields_geometry_col = t.string;
const usersFields_geometry_col_nullable = t.union([t.null, t.string]);
const usersFields_int_col = t.number;
const usersFields_int_col_nullable = t.union([t.null, t.number]);
const usersFields_integer_col = t.number;
const usersFields_integer_col_nullable = t.union([t.null, t.number]);
const usersFields_longblob_col = BufferType;
const usersFields_longblob_col_nullable = t.union([t.null, BufferType]);
const usersFields_longtext_col = t.string;
const usersFields_longtext_col_nullable = t.union([t.null, t.string]);
const usersFields_mediumblob_col = BufferType;
const usersFields_mediumblob_col_nullable = t.union([t.null, BufferType]);
const usersFields_mediumint_col = t.number;
const usersFields_mediumint_col_nullable = t.union([t.null, t.number]);
const usersFields_mediumtext_col = t.string;
const usersFields_mediumtext_col_nullable = t.union([t.null, t.string]);
const usersFields_numeric_col = t.number;
const usersFields_numeric_col_nullable = t.union([t.null, t.number]);
const usersFields_set_col = set_set_col;
const usersFields_set_col_nullable = t.union([t.null, set_set_col_nullable]);
const usersFields_smallint_col = t.number;
const usersFields_smallint_col_nullable = t.union([t.null, t.number]);
const usersFields_text_col = t.string;
const usersFields_text_col_nullable = t.union([t.null, t.string]);
const usersFields_time_col = t.string;
const usersFields_time_col_nullable = t.union([t.null, t.string]);
const usersFields_timestamp_col = DateType;
const usersFields_tinyblob_col = BufferType;
const usersFields_tinyblob_col_nullable = t.union([t.null, BufferType]);
const usersFields_tinyint_col = t.boolean;
const usersFields_tinyint_col_nullable = t.union([t.null, t.boolean]);
const usersFields_tinytext_col = t.string;
const usersFields_tinytext_col_nullable = t.union([t.null, t.string]);
const usersFields_varbinary_col = BufferType;
const usersFields_varbinary_col_nullable = t.union([t.null, BufferType]);
const usersFields_year_col = t.number;
const usersFields_year_col_nullable = t.union([t.null, t.number]);

export const users = t.type({
    bigint_col: usersFields_bigint_col,
    bigint_col_nullable: usersFields_bigint_col_nullable,
    binary_col: usersFields_binary_col,
    binary_col_nullable: usersFields_binary_col_nullable,
    bit_col: usersFields_bit_col,
    bit_col_nullable: usersFields_bit_col_nullable,
    blob_col: usersFields_blob_col,
    blob_col_nullable: usersFields_blob_col_nullable,
    char_col: usersFields_char_col,
    char_col_nullable: usersFields_char_col_nullable,
    date_col: usersFields_date_col,
    date_col_nullable: usersFields_date_col_nullable,
    datetime_col: usersFields_datetime_col,
    datetime_col_nullable: usersFields_datetime_col_nullable,
    decimal_col: usersFields_decimal_col,
    decimal_col_nullable: usersFields_decimal_col_nullable,
    double_col: usersFields_double_col,
    double_col_nullable: usersFields_double_col_nullable,
    enum_col: usersFields_enum_col,
    enum_col_nullable: usersFields_enum_col_nullable,
    float_col: usersFields_float_col,
    float_col_nullable: usersFields_float_col_nullable,
    geometry_col: usersFields_geometry_col,
    geometry_col_nullable: usersFields_geometry_col_nullable,
    int_col: usersFields_int_col,
    int_col_nullable: usersFields_int_col_nullable,
    integer_col: usersFields_integer_col,
    integer_col_nullable: usersFields_integer_col_nullable,
    longblob_col: usersFields_longblob_col,
    longblob_col_nullable: usersFields_longblob_col_nullable,
    longtext_col: usersFields_longtext_col,
    longtext_col_nullable: usersFields_longtext_col_nullable,
    mediumblob_col: usersFields_mediumblob_col,
    mediumblob_col_nullable: usersFields_mediumblob_col_nullable,
    mediumint_col: usersFields_mediumint_col,
    mediumint_col_nullable: usersFields_mediumint_col_nullable,
    mediumtext_col: usersFields_mediumtext_col,
    mediumtext_col_nullable: usersFields_mediumtext_col_nullable,
    numeric_col: usersFields_numeric_col,
    numeric_col_nullable: usersFields_numeric_col_nullable,
    set_col: usersFields_set_col,
    set_col_nullable: usersFields_set_col_nullable,
    smallint_col: usersFields_smallint_col,
    smallint_col_nullable: usersFields_smallint_col_nullable,
    text_col: usersFields_text_col,
    text_col_nullable: usersFields_text_col_nullable,
    time_col: usersFields_time_col,
    time_col_nullable: usersFields_time_col_nullable,
    timestamp_col: usersFields_timestamp_col,
    tinyblob_col: usersFields_tinyblob_col,
    tinyblob_col_nullable: usersFields_tinyblob_col_nullable,
    tinyint_col: usersFields_tinyint_col,
    tinyint_col_nullable: usersFields_tinyint_col_nullable,
    tinytext_col: usersFields_tinytext_col,
    tinytext_col_nullable: usersFields_tinytext_col_nullable,
    varbinary_col: usersFields_varbinary_col,
    varbinary_col_nullable: usersFields_varbinary_col_nullable,
    year_col: usersFields_year_col,
    year_col_nullable: usersFields_year_col_nullable
});
export interface users extends t.TypeOf<typeof users> { };

const user_enumsFields_enum_col = enum_enum_col;
const user_enumsFields_enum_col_nullable = t.union([t.null, enum_enum_col_nullable]);
const user_enumsFields_set_col = set_set_col;
const user_enumsFields_set_col_nullable = t.union([t.null, set_set_col_nullable]);

export const user_enums = t.type({
    enum_col: user_enumsFields_enum_col,
    enum_col_nullable: user_enumsFields_enum_col_nullable,
    set_col: user_enumsFields_set_col,
    set_col_nullable: user_enumsFields_set_col_nullable
});
export interface user_enums extends t.TypeOf<typeof user_enums> { };

const packageFields_number_ = t.number;
const packageFields_string_ = t.string;

export const package_ = t.type({
    number: packageFields_number_,
    string: packageFields_string_
});
export interface package_ extends t.TypeOf<typeof package_> { };
