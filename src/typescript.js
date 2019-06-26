"use strict";
/**
 * Generate typescript interface from table schema
 * Created by xiamx on 2016-08-10.
 */
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
    Object.keys(tableDefinition).map(function (c) { return options.transformColumnName(c); }).forEach(function (columnName) {
        members.push(columnName + ": " + tableName + "Fields_" + normalizeName(columnName, options));
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