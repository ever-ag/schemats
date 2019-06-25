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

export const FormatEnum = t.union([t.literal('html'), t.literal('markdown'), t.literal('text')]);
export const UserStatusEnum = t.union([t.literal('active'), t.literal('confirmed'), t.literal('deleted'), t.literal('pending'), t.literal('suspended')]);

export type FormatEnum = t.TypeOf<typeof FormatEnum>;
export type UserStatusEnum = t.TypeOf<typeof UserStatusEnum>;

const UsersFields_email = t.string;
const UsersFields_id = t.number;
const UsersFields_passCrypt = t.string;
const UsersFields_creationTime = DateType;
const UsersFields_displayName = t.string;
const UsersFields_dataPublic = t.boolean;
const UsersFields_description = t.string;
const UsersFields_homeLat = t.union([t.null, t.number]);
const UsersFields_homeLon = t.union([t.null, t.number]);
const UsersFields_homeZoom = t.union([t.null, t.number]);
const UsersFields_nearby = t.union([t.null, t.number]);
const UsersFields_passSalt = t.union([t.null, t.string]);
const UsersFields_imageFileName = t.union([t.null, t.string]);
const UsersFields_emailValid = t.boolean;
const UsersFields_newEmail = t.union([t.null, t.string]);
const UsersFields_creationIp = t.union([t.null, t.string]);
const UsersFields_languages = t.union([t.null, t.string]);
const UsersFields_status = UserStatusEnum;
const UsersFields_termsAgreed = t.union([t.null, DateType]);
const UsersFields_considerPd = t.boolean;
const UsersFields_preferredEditor = t.union([t.null, t.string]);
const UsersFields_termsSeen = t.boolean;
const UsersFields_authUid = t.union([t.null, t.string]);
const UsersFields_descriptionFormat = FormatEnum;
const UsersFields_imageFingerprint = t.union([t.null, t.string]);
const UsersFields_changesetsCount = t.number;
const UsersFields_tracesCount = t.number;
const UsersFields_diaryEntriesCount = t.number;
const UsersFields_imageUseGravatar = t.boolean;
const UsersFields_imageContentType = t.union([t.null, t.string]);
const UsersFields_authProvider = t.union([t.null, t.string]);
const UsersFields_uuidColumn = t.union([t.null, t.string]);
const UsersFields_number_ = t.union([t.null, t.number]);
const UsersFields_string_ = t.union([t.null, t.string]);
const UsersFields_moneyCol = t.union([t.null, t.number]);
const UsersFields_charCol = t.union([t.null, t.string]);
const UsersFields_timeCol = t.union([t.null, t.string]);
const UsersFields_inetCol = t.union([t.null, t.string]);
const UsersFields_jsonbCol = t.union([t.null, t.object]);
const UsersFields_numericCol = t.union([t.null, t.number]);
const UsersFields_byteaCol = t.union([t.null, t.string]);
const UsersFields_boolArrayCol = t.union([t.null, t.array(t.boolean)]);
const UsersFields_varcharArrayCol = t.union([t.null, t.array(t.string)]);
const UsersFields_int2ArrayCol = t.union([t.null, t.array(t.number)]);
const UsersFields_int4ArrayCol = t.union([t.null, t.array(t.number)]);
const UsersFields_int8ArrayCol = t.union([t.null, t.array(t.number)]);
const UsersFields_uuidArrayCol = t.union([t.null, t.array(t.string)]);
const UsersFields_textArrayCol = t.union([t.null, t.array(t.string)]);
const UsersFields_byteaArrayCol = t.union([t.null, t.array(t.string)]);
const UsersFields_realCol = t.union([t.null, t.number]);
const UsersFields_doubleCol = t.union([t.null, t.number]);
const UsersFields_timeWithTz = t.union([t.null, t.string]);
const UsersFields_oidCol = t.union([t.null, t.number]);
const UsersFields_intervalCol = t.union([t.null, t.string]);
const UsersFields_jsonCol = t.union([t.null, t.object]);
const UsersFields_dateCol = t.union([t.null, DateType]);
const UsersFields_unspportedPathType = t.union([t.null, t.any]);
const UsersFields_nameTypeCol = t.union([t.null, t.string]);
const UsersFields_jsonArrayCol = t.union([t.null, t.array(t.object)]);
const UsersFields_jsonbArrayCol = t.union([t.null, t.array(t.object)]);
const UsersFields_timestamptzArrayCol = t.union([t.null, t.array(DateType)]);

export const Users = t.type({
    email: UsersFields_email,
    id: UsersFields_id,
    passCrypt: UsersFields_passCrypt,
    creationTime: UsersFields_creationTime,
    displayName: UsersFields_displayName,
    dataPublic: UsersFields_dataPublic,
    description: UsersFields_description,
    homeLat: UsersFields_homeLat,
    homeLon: UsersFields_homeLon,
    homeZoom: UsersFields_homeZoom,
    nearby: UsersFields_nearby,
    passSalt: UsersFields_passSalt,
    imageFileName: UsersFields_imageFileName,
    emailValid: UsersFields_emailValid,
    newEmail: UsersFields_newEmail,
    creationIp: UsersFields_creationIp,
    languages: UsersFields_languages,
    status: UsersFields_status,
    termsAgreed: UsersFields_termsAgreed,
    considerPd: UsersFields_considerPd,
    preferredEditor: UsersFields_preferredEditor,
    termsSeen: UsersFields_termsSeen,
    authUid: UsersFields_authUid,
    descriptionFormat: UsersFields_descriptionFormat,
    imageFingerprint: UsersFields_imageFingerprint,
    changesetsCount: UsersFields_changesetsCount,
    tracesCount: UsersFields_tracesCount,
    diaryEntriesCount: UsersFields_diaryEntriesCount,
    imageUseGravatar: UsersFields_imageUseGravatar,
    imageContentType: UsersFields_imageContentType,
    authProvider: UsersFields_authProvider,
    uuidColumn: UsersFields_uuidColumn,
    number: UsersFields_number_,
    string: UsersFields_string_,
    moneyCol: UsersFields_moneyCol,
    charCol: UsersFields_charCol,
    timeCol: UsersFields_timeCol,
    inetCol: UsersFields_inetCol,
    jsonbCol: UsersFields_jsonbCol,
    numericCol: UsersFields_numericCol,
    byteaCol: UsersFields_byteaCol,
    boolArrayCol: UsersFields_boolArrayCol,
    varcharArrayCol: UsersFields_varcharArrayCol,
    int2ArrayCol: UsersFields_int2ArrayCol,
    int4ArrayCol: UsersFields_int4ArrayCol,
    int8ArrayCol: UsersFields_int8ArrayCol,
    uuidArrayCol: UsersFields_uuidArrayCol,
    textArrayCol: UsersFields_textArrayCol,
    byteaArrayCol: UsersFields_byteaArrayCol,
    realCol: UsersFields_realCol,
    doubleCol: UsersFields_doubleCol,
    timeWithTz: UsersFields_timeWithTz,
    oidCol: UsersFields_oidCol,
    intervalCol: UsersFields_intervalCol,
    jsonCol: UsersFields_jsonCol,
    dateCol: UsersFields_dateCol,
    unspportedPathType: UsersFields_unspportedPathType,
    nameTypeCol: UsersFields_nameTypeCol,
    jsonArrayCol: UsersFields_jsonArrayCol,
    jsonbArrayCol: UsersFields_jsonbArrayCol,
    timestamptzArrayCol: UsersFields_timestamptzArrayCol
});
export interface Users extends t.TypeOf<typeof Users> { };
