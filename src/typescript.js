"use strict";
/**
 * Generate typescript interface from table schema
 * Created by xiamx on 2016-08-10.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
function nameIsReservedKeyword(name) {
    var reservedKeywords = [
        // Reserved Words
        'break',
        'case',
        'catch',
        'class',
        'const',
        'continue',
        'debugger',
        'default',
        'delete',
        'do',
        'else',
        'enum',
        'export',
        'extends',
        'false',
        'finally',
        'for',
        'function',
        'if',
        'import',
        'in',
        'instanceof',
        'new',
        'null',
        'return',
        'super',
        'switch',
        'this',
        'throw',
        'true',
        'try',
        'typeof',
        'var',
        'void',
        'while',
        'with',
        // Strict Mode Reserved Words
        'as',
        'implements',
        'interface',
        'let',
        'package',
        'private',
        'protected',
        'public',
        'static',
        'yield',
        // Contextual Keywords
        'any',
        'boolean',
        'constructor',
        'declare',
        'get',
        'module',
        'require',
        'number',
        'set',
        'string',
        'symbol',
        'type',
        'from',
        'of'
    ];
    return reservedKeywords.indexOf(name) !== -1;
}
function normalizeName(name, options) {
    if (nameIsReservedKeyword(name)) {
        return name + '_';
    }
    else {
        return name;
    }
}
function generateTableInterface(tableNameRaw, tableDefinition, options) {
    var tableName = options.transformTypeName(tableNameRaw);
    var members = [];
    Object.keys(tableDefinition)
        .map(function (k) { return (__assign({}, tableDefinition[k], { column_name: options.transformColumnName(k) })); })
        .forEach(function (column) {
        var generatedCode = '';
        if (column.comment) {
            generatedCode += "/** " + column.comment + " */\n";
        }
        generatedCode += column.column_name + ": " + tableName + "Fields_" + normalizeName(column.column_name, options);
        members.push(generatedCode);
    });
    var interfaceName = normalizeName(tableName, options);
    return "\nexport const " + interfaceName + " = t.type({\n" + members.join(',\n') + "\n});\nexport interface " + interfaceName + " extends t.TypeOf<typeof " + interfaceName + "> { };\n";
}
exports.generateTableInterface = generateTableInterface;
function generateEnumType(enumObject, options) {
    var iotsTypes = [];
    var enumTypes = [];
    for (var enumNameRaw in enumObject) {
        var enumName = options.transformTypeName(enumNameRaw);
        var literalTypes = enumObject[enumNameRaw].map(function (v) { return "t.literal('" + v + "')"; }).join(', ');
        iotsTypes.push("export const " + enumName + " = t.union([" + literalTypes + "]);");
        enumTypes.push("export type " + enumName + " = t.TypeOf<typeof " + enumName + ">;");
    }
    return "\n" + iotsTypes.join('\n') + "\n\n" + enumTypes.join('\n') + "\n";
}
exports.generateEnumType = generateEnumType;
function generateTableTypes(tableNameRaw, tableDefinition, options) {
    var tableName = options.transformTypeName(tableNameRaw);
    var types = [];
    Object.keys(tableDefinition).forEach(function (columnNameRaw) {
        var columnName = options.transformColumnName(columnNameRaw);
        var typeName = normalizeName(columnName, options);
        var iotsType = tableDefinition[columnNameRaw].iotsType;
        if (tableDefinition[columnNameRaw].nullable) {
            types.push("const " + tableName + "Fields_" + typeName + " = t.union([t.null, " + iotsType + "]);");
        }
        else {
            types.push("const " + tableName + "Fields_" + typeName + " = " + iotsType + ";");
        }
    });
    return "\n" + types.join('\n') + "\n\n";
}
exports.generateTableTypes = generateTableTypes;
//# sourceMappingURL=typescript.js.map