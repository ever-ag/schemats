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
const UsersFields_pass_crypt = t.string;
const UsersFields_creation_time = DateType;
const UsersFields_display_name = t.string;
const UsersFields_data_public = t.boolean;
const UsersFields_description = t.string;
const UsersFields_home_lat = t.union([t.null, t.number]);
const UsersFields_home_lon = t.union([t.null, t.number]);
const UsersFields_home_zoom = t.union([t.null, t.number]);
const UsersFields_nearby = t.union([t.null, t.number]);
const UsersFields_pass_salt = t.union([t.null, t.string]);
const UsersFields_image_file_name = t.union([t.null, t.string]);
const UsersFields_email_valid = t.boolean;
const UsersFields_new_email = t.union([t.null, t.string]);
const UsersFields_creation_ip = t.union([t.null, t.string]);
const UsersFields_languages = t.union([t.null, t.string]);
const UsersFields_status = UserStatusEnum;
const UsersFields_terms_agreed = t.union([t.null, DateType]);
const UsersFields_consider_pd = t.boolean;
const UsersFields_preferred_editor = t.union([t.null, t.string]);
const UsersFields_terms_seen = t.boolean;
const UsersFields_auth_uid = t.union([t.null, t.string]);
const UsersFields_description_format = FormatEnum;
const UsersFields_image_fingerprint = t.union([t.null, t.string]);
const UsersFields_changesets_count = t.number;
const UsersFields_traces_count = t.number;
const UsersFields_diary_entries_count = t.number;
const UsersFields_image_use_gravatar = t.boolean;
const UsersFields_image_content_type = t.union([t.null, t.string]);
const UsersFields_auth_provider = t.union([t.null, t.string]);
const UsersFields_uuid_column = t.union([t.null, t.string]);
const UsersFields_number_ = t.union([t.null, t.number]);
const UsersFields_string_ = t.union([t.null, t.string]);
const UsersFields_money_col = t.union([t.null, t.number]);
const UsersFields_char_col = t.union([t.null, t.string]);
const UsersFields_time_col = t.union([t.null, t.string]);
const UsersFields_inet_col = t.union([t.null, t.string]);
const UsersFields_jsonb_col = t.union([t.null, t.object]);
const UsersFields_numeric_col = t.union([t.null, t.number]);
const UsersFields_bytea_col = t.union([t.null, t.string]);
const UsersFields_bool_array_col = t.union([t.null, t.array(t.boolean)]);
const UsersFields_varchar_array_col = t.union([t.null, t.array(t.string)]);
const UsersFields_int2_array_col = t.union([t.null, t.array(t.number)]);
const UsersFields_int4_array_col = t.union([t.null, t.array(t.number)]);
const UsersFields_int8_array_col = t.union([t.null, t.array(t.number)]);
const UsersFields_uuid_array_col = t.union([t.null, t.array(t.string)]);
const UsersFields_text_array_col = t.union([t.null, t.array(t.string)]);
const UsersFields_bytea_array_col = t.union([t.null, t.array(t.string)]);
const UsersFields_real_col = t.union([t.null, t.number]);
const UsersFields_double_col = t.union([t.null, t.number]);
const UsersFields_time_with_tz = t.union([t.null, t.string]);
const UsersFields_oid_col = t.union([t.null, t.number]);
const UsersFields_interval_col = t.union([t.null, t.string]);
const UsersFields_json_col = t.union([t.null, t.object]);
const UsersFields_date_col = t.union([t.null, t.string]);
const UsersFields_unspported_path_type = t.union([t.null, t.any]);
const UsersFields_name_type_col = t.union([t.null, t.string]);
const UsersFields_json_array_col = t.union([t.null, t.array(t.object)]);
const UsersFields_jsonb_array_col = t.union([t.null, t.array(t.object)]);
const UsersFields_timestamptz_array_col = t.union([t.null, t.array(DateType)]);
const UsersFields_email_valid_with_description = t.boolean;
const UsersFields_new_email_with_description = t.union([t.null, t.string]);
const UsersFields_creation_ip_with_description = t.union([t.null, t.string]);
const UsersFields_languages_with_description = t.union([t.null, t.string]);

export const Users = t.type({
    email: UsersFields_email,
    id: UsersFields_id,
    pass_crypt: UsersFields_pass_crypt,
    creation_time: UsersFields_creation_time,
    display_name: UsersFields_display_name,
    data_public: UsersFields_data_public,
    description: UsersFields_description,
    home_lat: UsersFields_home_lat,
    home_lon: UsersFields_home_lon,
    home_zoom: UsersFields_home_zoom,
    nearby: UsersFields_nearby,
    pass_salt: UsersFields_pass_salt,
    image_file_name: UsersFields_image_file_name,
    email_valid: UsersFields_email_valid,
    new_email: UsersFields_new_email,
    creation_ip: UsersFields_creation_ip,
    languages: UsersFields_languages,
    status: UsersFields_status,
    terms_agreed: UsersFields_terms_agreed,
    consider_pd: UsersFields_consider_pd,
    preferred_editor: UsersFields_preferred_editor,
    terms_seen: UsersFields_terms_seen,
    auth_uid: UsersFields_auth_uid,
    description_format: UsersFields_description_format,
    image_fingerprint: UsersFields_image_fingerprint,
    changesets_count: UsersFields_changesets_count,
    traces_count: UsersFields_traces_count,
    diary_entries_count: UsersFields_diary_entries_count,
    image_use_gravatar: UsersFields_image_use_gravatar,
    image_content_type: UsersFields_image_content_type,
    auth_provider: UsersFields_auth_provider,
    uuid_column: UsersFields_uuid_column,
    number: UsersFields_number_,
    string: UsersFields_string_,
    money_col: UsersFields_money_col,
    char_col: UsersFields_char_col,
    time_col: UsersFields_time_col,
    inet_col: UsersFields_inet_col,
    jsonb_col: UsersFields_jsonb_col,
    numeric_col: UsersFields_numeric_col,
    bytea_col: UsersFields_bytea_col,
    bool_array_col: UsersFields_bool_array_col,
    varchar_array_col: UsersFields_varchar_array_col,
    int2_array_col: UsersFields_int2_array_col,
    int4_array_col: UsersFields_int4_array_col,
    int8_array_col: UsersFields_int8_array_col,
    uuid_array_col: UsersFields_uuid_array_col,
    text_array_col: UsersFields_text_array_col,
    bytea_array_col: UsersFields_bytea_array_col,
    real_col: UsersFields_real_col,
    double_col: UsersFields_double_col,
    time_with_tz: UsersFields_time_with_tz,
    oid_col: UsersFields_oid_col,
    interval_col: UsersFields_interval_col,
    json_col: UsersFields_json_col,
    date_col: UsersFields_date_col,
    unspported_path_type: UsersFields_unspported_path_type,
    name_type_col: UsersFields_name_type_col,
    json_array_col: UsersFields_json_array_col,
    jsonb_array_col: UsersFields_jsonb_array_col,
    timestamptz_array_col: UsersFields_timestamptz_array_col,
    /** email_valid description */
    email_valid_with_description: UsersFields_email_valid_with_description,
    /** new_email description */
    new_email_with_description: UsersFields_new_email_with_description,
    /** creation_ip description */
    creation_ip_with_description: UsersFields_creation_ip_with_description,
    /** languages description */
    languages_with_description: UsersFields_languages_with_description
});
export interface Users extends t.TypeOf<typeof Users> { };
