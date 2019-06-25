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
const usersFields_pass_crypt = t.string;
const usersFields_creation_time = DateType;
const usersFields_display_name = t.string;
const usersFields_data_public = t.boolean;
const usersFields_description = t.string;
const usersFields_home_lat = t.union([t.null, t.number]);
const usersFields_home_lon = t.union([t.null, t.number]);
const usersFields_home_zoom = t.union([t.null, t.number]);
const usersFields_nearby = t.union([t.null, t.number]);
const usersFields_pass_salt = t.union([t.null, t.string]);
const usersFields_image_file_name = t.union([t.null, t.string]);
const usersFields_email_valid = t.boolean;
const usersFields_new_email = t.union([t.null, t.string]);
const usersFields_creation_ip = t.union([t.null, t.string]);
const usersFields_languages = t.union([t.null, t.string]);
const usersFields_status = user_status_enum;
const usersFields_terms_agreed = t.union([t.null, DateType]);
const usersFields_consider_pd = t.boolean;
const usersFields_preferred_editor = t.union([t.null, t.string]);
const usersFields_terms_seen = t.boolean;
const usersFields_auth_uid = t.union([t.null, t.string]);
const usersFields_description_format = format_enum;
const usersFields_image_fingerprint = t.union([t.null, t.string]);
const usersFields_changesets_count = t.number;
const usersFields_traces_count = t.number;
const usersFields_diary_entries_count = t.number;
const usersFields_image_use_gravatar = t.boolean;
const usersFields_image_content_type = t.union([t.null, t.string]);
const usersFields_auth_provider = t.union([t.null, t.string]);
const usersFields_uuid_column = t.union([t.null, t.string]);
const usersFields_number_ = t.union([t.null, t.number]);
const usersFields_string_ = t.union([t.null, t.string]);
const usersFields_money_col = t.union([t.null, t.number]);
const usersFields_char_col = t.union([t.null, t.string]);
const usersFields_time_col = t.union([t.null, t.string]);
const usersFields_inet_col = t.union([t.null, t.string]);
const usersFields_jsonb_col = t.union([t.null, t.object]);
const usersFields_numeric_col = t.union([t.null, t.number]);
const usersFields_bytea_col = t.union([t.null, t.string]);
const usersFields_bool_array_col = t.union([t.null, t.array(t.boolean)]);
const usersFields_varchar_array_col = t.union([t.null, t.array(t.string)]);
const usersFields_int2_array_col = t.union([t.null, t.array(t.number)]);
const usersFields_int4_array_col = t.union([t.null, t.array(t.number)]);
const usersFields_int8_array_col = t.union([t.null, t.array(t.number)]);
const usersFields_uuid_array_col = t.union([t.null, t.array(t.string)]);
const usersFields_text_array_col = t.union([t.null, t.array(t.string)]);
const usersFields_bytea_array_col = t.union([t.null, t.array(t.string)]);
const usersFields_real_col = t.union([t.null, t.number]);
const usersFields_double_col = t.union([t.null, t.number]);
const usersFields_time_with_tz = t.union([t.null, t.string]);
const usersFields_oid_col = t.union([t.null, t.number]);
const usersFields_interval_col = t.union([t.null, t.string]);
const usersFields_json_col = t.union([t.null, t.object]);
const usersFields_date_col = t.union([t.null, DateType]);
const usersFields_unspported_path_type = t.union([t.null, t.any]);
const usersFields_name_type_col = t.union([t.null, t.string]);
const usersFields_json_array_col = t.union([t.null, t.array(t.object)]);
const usersFields_jsonb_array_col = t.union([t.null, t.array(t.object)]);
const usersFields_timestamptz_array_col = t.union([t.null, t.array(DateType)]);

export const users = t.type({
    email: usersFields_email,
    id: usersFields_id,
    pass_crypt: usersFields_pass_crypt,
    creation_time: usersFields_creation_time,
    display_name: usersFields_display_name,
    data_public: usersFields_data_public,
    description: usersFields_description,
    home_lat: usersFields_home_lat,
    home_lon: usersFields_home_lon,
    home_zoom: usersFields_home_zoom,
    nearby: usersFields_nearby,
    pass_salt: usersFields_pass_salt,
    image_file_name: usersFields_image_file_name,
    email_valid: usersFields_email_valid,
    new_email: usersFields_new_email,
    creation_ip: usersFields_creation_ip,
    languages: usersFields_languages,
    status: usersFields_status,
    terms_agreed: usersFields_terms_agreed,
    consider_pd: usersFields_consider_pd,
    preferred_editor: usersFields_preferred_editor,
    terms_seen: usersFields_terms_seen,
    auth_uid: usersFields_auth_uid,
    description_format: usersFields_description_format,
    image_fingerprint: usersFields_image_fingerprint,
    changesets_count: usersFields_changesets_count,
    traces_count: usersFields_traces_count,
    diary_entries_count: usersFields_diary_entries_count,
    image_use_gravatar: usersFields_image_use_gravatar,
    image_content_type: usersFields_image_content_type,
    auth_provider: usersFields_auth_provider,
    uuid_column: usersFields_uuid_column,
    number: usersFields_number_,
    string: usersFields_string_,
    money_col: usersFields_money_col,
    char_col: usersFields_char_col,
    time_col: usersFields_time_col,
    inet_col: usersFields_inet_col,
    jsonb_col: usersFields_jsonb_col,
    numeric_col: usersFields_numeric_col,
    bytea_col: usersFields_bytea_col,
    bool_array_col: usersFields_bool_array_col,
    varchar_array_col: usersFields_varchar_array_col,
    int2_array_col: usersFields_int2_array_col,
    int4_array_col: usersFields_int4_array_col,
    int8_array_col: usersFields_int8_array_col,
    uuid_array_col: usersFields_uuid_array_col,
    text_array_col: usersFields_text_array_col,
    bytea_array_col: usersFields_bytea_array_col,
    real_col: usersFields_real_col,
    double_col: usersFields_double_col,
    time_with_tz: usersFields_time_with_tz,
    oid_col: usersFields_oid_col,
    interval_col: usersFields_interval_col,
    json_col: usersFields_json_col,
    date_col: usersFields_date_col,
    unspported_path_type: usersFields_unspported_path_type,
    name_type_col: usersFields_name_type_col,
    json_array_col: usersFields_json_array_col,
    jsonb_array_col: usersFields_jsonb_array_col,
    timestamptz_array_col: usersFields_timestamptz_array_col
});
export interface users extends t.TypeOf<typeof users> { };
