"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var DatabaseBase = /** @class */ (function () {
    function DatabaseBase() {
    }
    DatabaseBase.mapTableTypeToNativeType = function (tableType) {
        return tableType;
    };
    DatabaseBase.mapTypescriptTypetoIoTsType = function (nativeType) {
        switch (nativeType) {
            case 'Array<Date>':
                return 't.array(DateType)';
            case 'Array<Object>':
                return 't.array(t.object)';
            case 'Array<boolean>':
                return 't.array(t.boolean)';
            case 'Array<number>':
                return 't.array(t.number)';
            case 'Array<string>':
                return 't.array(t.string)';
            case 'Date':
                return 'DateType';
            case 'Buffer':
                return 'BufferType';
            case 'Object':
                return 't.object';
            case 'boolean':
                return 't.boolean';
            case 'number':
                return 't.number';
            case 'string':
                return 't.string';
            default:
                return 't.any';
        }
    };
    DatabaseBase.mapTableDefinitionToType = function (tableDefinition, customTypes, options) {
        var _this = this;
        return lodash_1.mapValues(tableDefinition, function (column) {
            column.tsType = _this.mapTableTypeToNativeType(column.udtName);
            column.iotsType = _this.mapTypescriptTypetoIoTsType(column.tsType);
            if (column.tsType === 'any') {
                if (customTypes.indexOf(column.udtName) !== -1) {
                    column.tsType = options.transformTypeName(column.udtName);
                    column.iotsType = options.transformTypeName(column.udtName);
                }
                else {
                    console.log("Type [" + column.udtName + " has been mapped to [any] because no specific type has been found.");
                }
            }
            return column;
        });
    };
    return DatabaseBase;
}());
exports.DatabaseBase = DatabaseBase;
//# sourceMappingURL=schemaBase.js.map