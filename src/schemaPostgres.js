"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var PgPromise = require("pg-promise");
var lodash_1 = require("lodash");
var schemaBase_1 = require("./schemaBase");
var pgp = PgPromise();
var PostgresDatabase = /** @class */ (function (_super) {
    __extends(PostgresDatabase, _super);
    function PostgresDatabase(connectionString) {
        var _this = _super.call(this) || this;
        _this.connectionString = connectionString;
        _this.db = pgp(connectionString);
        return _this;
    }
    PostgresDatabase.mapTableTypeToNativeType = function (tableType) {
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
            case 'date':
            case 'name':
                return 'string';
            case 'int2':
            case 'int4':
            case 'int8':
            case 'float4':
            case 'float8':
            case 'numeric':
            case 'money':
            case 'oid':
                return 'number';
            case 'bool':
                return 'boolean';
            case 'json':
            case 'jsonb':
                return 'Object';
            case 'timestamp':
            case 'timestamptz':
                return 'Date';
            case '_int2':
            case '_int4':
            case '_int8':
            case '_float4':
            case '_float8':
            case '_numeric':
            case '_money':
                return 'Array<number>';
            case '_bool':
                return 'Array<boolean>';
            case '_varchar':
            case '_text':
            case '_citext':
            case '_uuid':
            case '_bytea':
                return 'Array<string>';
            case '_json':
            case '_jsonb':
                return 'Array<Object>';
            case '_timestamptz':
                return 'Array<Date>';
            default:
                return 'any';
        }
    };
    PostgresDatabase.prototype.query = function (queryString) {
        return this.db.query(queryString);
    };
    PostgresDatabase.prototype.getEnumTypes = function (schema) {
        return __awaiter(this, void 0, void 0, function () {
            var enums, enumSchemaWhereClause;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        enums = {};
                        enumSchemaWhereClause = schema ? pgp.as.format("where n.nspname = $1", schema) : '';
                        return [4 /*yield*/, this.db.each('select n.nspname as schema, t.typname as name, e.enumlabel as value ' +
                                'from pg_type t ' +
                                'join pg_enum e on t.oid = e.enumtypid ' +
                                'join pg_catalog.pg_namespace n ON n.oid = t.typnamespace ' +
                                (enumSchemaWhereClause + " ") +
                                'order by t.typname asc, e.enumlabel asc;', [], function (item) {
                                if (!enums[item.name]) {
                                    enums[item.name] = [];
                                }
                                enums[item.name].push(item.value);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, enums];
                }
            });
        });
    };
    PostgresDatabase.prototype.getTableDefinition = function (tableName, tableSchema) {
        return __awaiter(this, void 0, void 0, function () {
            var tableDefinition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tableDefinition = {};
                        return [4 /*yield*/, this.db.each("\n            SELECT\n                c.column_name,\n                c.udt_name,\n                c.is_nullable,\n                pgd.description\n            FROM information_schema.columns AS c\n            LEFT JOIN pg_catalog.pg_statio_all_tables AS st\n                ON c.table_schema = st.schemaname\n                AND c.table_name = st.relname\n            LEFT JOIN pg_catalog.pg_description AS pgd\n                ON st.relid = pgd.objoid\n                AND c.ordinal_position = pgd.objsubid\n            WHERE table_name = $1 AND table_schema = $2", [tableName, tableSchema], function (schemaItem) {
                                tableDefinition[schemaItem.column_name] = {
                                    udtName: schemaItem.udt_name,
                                    nullable: schemaItem.is_nullable === 'YES',
                                    comment: schemaItem.description
                                };
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, tableDefinition];
                }
            });
        });
    };
    PostgresDatabase.prototype.getTableTypes = function (tableName, tableSchema, options) {
        return __awaiter(this, void 0, void 0, function () {
            var enumTypes, customTypes, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getEnumTypes()];
                    case 1:
                        enumTypes = _c.sent();
                        customTypes = lodash_1.keys(enumTypes);
                        _b = (_a = PostgresDatabase).mapTableDefinitionToType;
                        return [4 /*yield*/, this.getTableDefinition(tableName, tableSchema)];
                    case 2: return [2 /*return*/, _b.apply(_a, [_c.sent(), customTypes, options])];
                }
            });
        });
    };
    PostgresDatabase.prototype.getSchemaTables = function (schemaName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.map('SELECT table_name ' +
                            'FROM information_schema.columns ' +
                            'WHERE table_schema = $1 ' +
                            'GROUP BY table_name', [schemaName], function (schemaItem) { return schemaItem.table_name; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PostgresDatabase.prototype.getDefaultSchema = function () {
        return 'public';
    };
    return PostgresDatabase;
}(schemaBase_1.DatabaseBase));
exports.PostgresDatabase = PostgresDatabase;
//# sourceMappingURL=schemaPostgres.js.map