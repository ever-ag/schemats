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

export const format_enum = t.union([t.literal('html'), t.literal('markdown'), t.literal('text')]);
export const user_status_enum = t.union([t.literal('active'), t.literal('confirmed'), t.literal('deleted'), t.literal('pending'), t.literal('suspended')]);

export type format_enum = t.TypeOf<typeof format_enum>;
export type user_status_enum = t.TypeOf<typeof user_status_enum>;

const usersFields_email = t.string;
const usersFields_id = t.number;
const usersFields_passCrypt = t.string;
const usersFields_creationTime = DateType;
const usersFields_displayName = t.string;
const usersFields_dataPublic = t.boolean;
const usersFields_description = t.string;
const usersFields_homeLat = t.union([t.null, t.number]);
const usersFields_homeLon = t.union([t.null, t.number]);
const usersFields_homeZoom = t.union([t.null, t.number]);
const usersFields_nearby = t.union([t.null, t.number]);
const usersFields_passSalt = t.union([t.null, t.string]);
const usersFields_imageFileName = t.union([t.null, t.string]);
const usersFields_emailValid = t.boolean;
const usersFields_newEmail = t.union([t.null, t.string]);
const usersFields_creationIp = t.union([t.null, t.string]);
const usersFields_languages = t.union([t.null, t.string]);
const usersFields_status = user_status_enum;
const usersFields_termsAgreed = t.union([t.null, DateType]);
const usersFields_considerPd = t.boolean;
const usersFields_preferredEditor = t.union([t.null, t.string]);
const usersFields_termsSeen = t.boolean;
const usersFields_authUid = t.union([t.null, t.string]);
const usersFields_descriptionFormat = format_enum;
const usersFields_imageFingerprint = t.union([t.null, t.string]);
const usersFields_changesetsCount = t.number;
const usersFields_tracesCount = t.number;
const usersFields_diaryEntriesCount = t.number;
const usersFields_imageUseGravatar = t.boolean;
const usersFields_imageContentType = t.union([t.null, t.string]);
const usersFields_authProvider = t.union([t.null, t.string]);
const usersFields_uuidColumn = t.union([t.null, t.string]);
const usersFields_number_ = t.union([t.null, t.number]);
const usersFields_string_ = t.union([t.null, t.string]);
const usersFields_moneyCol = t.union([t.null, t.number]);
const usersFields_charCol = t.union([t.null, t.string]);
const usersFields_timeCol = t.union([t.null, t.string]);
const usersFields_inetCol = t.union([t.null, t.string]);
const usersFields_jsonbCol = t.union([t.null, t.object]);
const usersFields_numericCol = t.union([t.null, t.number]);
const usersFields_byteaCol = t.union([t.null, t.string]);
const usersFields_boolArrayCol = t.union([t.null, t.array(t.boolean)]);
const usersFields_varcharArrayCol = t.union([t.null, t.array(t.string)]);
const usersFields_int2ArrayCol = t.union([t.null, t.array(t.number)]);
const usersFields_int4ArrayCol = t.union([t.null, t.array(t.number)]);
const usersFields_int8ArrayCol = t.union([t.null, t.array(t.number)]);
const usersFields_uuidArrayCol = t.union([t.null, t.array(t.string)]);
const usersFields_textArrayCol = t.union([t.null, t.array(t.string)]);
const usersFields_byteaArrayCol = t.union([t.null, t.array(t.string)]);
const usersFields_realCol = t.union([t.null, t.number]);
const usersFields_doubleCol = t.union([t.null, t.number]);
const usersFields_timeWithTz = t.union([t.null, t.string]);
const usersFields_oidCol = t.union([t.null, t.number]);
const usersFields_intervalCol = t.union([t.null, t.string]);
const usersFields_jsonCol = t.union([t.null, t.object]);
const usersFields_dateCol = t.union([t.null, DateType]);
const usersFields_unspportedPathType = t.union([t.null, t.any]);
const usersFields_nameTypeCol = t.union([t.null, t.string]);
const usersFields_jsonArrayCol = t.union([t.null, t.array(t.object)]);
const usersFields_jsonbArrayCol = t.union([t.null, t.array(t.object)]);
const usersFields_timestamptzArrayCol = t.union([t.null, t.array(DateType)]);

export const users = t.type({
    email: usersFields_email,
    id: usersFields_id,
    passCrypt: usersFields_passCrypt,
    creationTime: usersFields_creationTime,
    displayName: usersFields_displayName,
    dataPublic: usersFields_dataPublic,
    description: usersFields_description,
    homeLat: usersFields_homeLat,
    homeLon: usersFields_homeLon,
    homeZoom: usersFields_homeZoom,
    nearby: usersFields_nearby,
    passSalt: usersFields_passSalt,
    imageFileName: usersFields_imageFileName,
    emailValid: usersFields_emailValid,
    newEmail: usersFields_newEmail,
    creationIp: usersFields_creationIp,
    languages: usersFields_languages,
    status: usersFields_status,
    termsAgreed: usersFields_termsAgreed,
    considerPd: usersFields_considerPd,
    preferredEditor: usersFields_preferredEditor,
    termsSeen: usersFields_termsSeen,
    authUid: usersFields_authUid,
    descriptionFormat: usersFields_descriptionFormat,
    imageFingerprint: usersFields_imageFingerprint,
    changesetsCount: usersFields_changesetsCount,
    tracesCount: usersFields_tracesCount,
    diaryEntriesCount: usersFields_diaryEntriesCount,
    imageUseGravatar: usersFields_imageUseGravatar,
    imageContentType: usersFields_imageContentType,
    authProvider: usersFields_authProvider,
    uuidColumn: usersFields_uuidColumn,
    number: usersFields_number_,
    string: usersFields_string_,
    moneyCol: usersFields_moneyCol,
    charCol: usersFields_charCol,
    timeCol: usersFields_timeCol,
    inetCol: usersFields_inetCol,
    jsonbCol: usersFields_jsonbCol,
    numericCol: usersFields_numericCol,
    byteaCol: usersFields_byteaCol,
    boolArrayCol: usersFields_boolArrayCol,
    varcharArrayCol: usersFields_varcharArrayCol,
    int2ArrayCol: usersFields_int2ArrayCol,
    int4ArrayCol: usersFields_int4ArrayCol,
    int8ArrayCol: usersFields_int8ArrayCol,
    uuidArrayCol: usersFields_uuidArrayCol,
    textArrayCol: usersFields_textArrayCol,
    byteaArrayCol: usersFields_byteaArrayCol,
    realCol: usersFields_realCol,
    doubleCol: usersFields_doubleCol,
    timeWithTz: usersFields_timeWithTz,
    oidCol: usersFields_oidCol,
    intervalCol: usersFields_intervalCol,
    jsonCol: usersFields_jsonCol,
    dateCol: usersFields_dateCol,
    unspportedPathType: usersFields_unspportedPathType,
    nameTypeCol: usersFields_nameTypeCol,
    jsonArrayCol: usersFields_jsonArrayCol,
    jsonbArrayCol: usersFields_jsonbArrayCol,
    timestamptzArrayCol: usersFields_timestamptzArrayCol
});
export interface users extends t.TypeOf<typeof users> { };
