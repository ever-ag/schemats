export declare type OptionValues = {
    camelCase?: boolean | 'columns' | 'tables';
    writeHeader?: boolean;
};
export default class Options {
    options: OptionValues;
    constructor(options?: OptionValues);
    transformTypeName(typename: string): string;
    transformColumnName(columnName: string): string;
}
