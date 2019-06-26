CREATE TABLE users (
    bigint_col bigint NOT NULL,
    bigint_col_nullable bigint,
    binary_col binary NOT NULL,
    binary_col_nullable binary,
    bit_col bit NOT NULL,
    bit_col_nullable bit,
    blob_col blob NOT NULL,
    blob_col_nullable blob,
    char_col varchar(255) NOT NULL,
    char_col_nullable varchar(255),
    date_col date NOT NULL,
    date_col_nullable date,
    datetime_col datetime NOT NULL,
    datetime_col_nullable datetime,
    decimal_col decimal NOT NULL,
    decimal_col_nullable decimal,
    double_col double NOT NULL,
    double_col_nullable double,
    enum_col enum('enum1', 'enum2', 'enum3') DEFAULT 'enum1' NOT NULL,
    enum_col_nullable enum('enum1', 'enum2', 'enum3'),
    float_col float NOT NULL,
    float_col_nullable float,
    geometry_col geometry NOT NULL,
    geometry_col_nullable geometry,
    int_col int NOT NULL,
    int_col_nullable int,
    integer_col integer NOT NULL,
    integer_col_nullable integer,
    longblob_col longblob NOT NULL,
    longblob_col_nullable longblob,
    longtext_col longtext NOT NULL,
    longtext_col_nullable longtext,
    mediumblob_col mediumblob NOT NULL,
    mediumblob_col_nullable mediumblob,
    mediumint_col mediumint NOT NULL,
    mediumint_col_nullable mediumint,
    mediumtext_col mediumtext NOT NULL,
    mediumtext_col_nullable mediumtext,
    numeric_col numeric NOT NULL,
    numeric_col_nullable numeric,
    set_col set('set1', 'set2', 'set3') DEFAULT 'set1' NOT NULL,
    set_col_nullable set('set1', 'set2', 'set3'),
    smallint_col smallint NOT NULL,
    smallint_col_nullable smallint,
    text_col text NOT NULL,
    text_col_nullable text,
    time_col time NOT NULL,
    time_col_nullable time,
    timestamp_col timestamp NOT NULL,
    tinyblob_col tinyblob NOT NULL,
    tinyblob_col_nullable tinyblob,
    tinyint_col tinyint NOT NULL,
    tinyint_col_nullable tinyint,
    tinytext_col tinytext NOT NULL,
    tinytext_col_nullable tinytext,
    varbinary_col varbinary(255) NOT NULL,
    varbinary_col_nullable varbinary(255),
    year_col year NOT NULL,
    year_col_nullable year,
    year_col_with_comment year NOT NULL COMMENT 'year_col comment'
);

DROP TABLE IF EXISTS user_enums;

CREATE TABLE user_enums (
    enum_col enum('enum1', 'enum2', 'enum3') DEFAULT 'enum1' NOT NULL,
    enum_col_nullable enum('enum1', 'enum2', 'enum3'),
    set_col set('set1', 'set2', 'set3') DEFAULT 'set1' NOT NULL,
    set_col_nullable set('set1', 'set2', 'set3')
);

DROP TABLE IF EXISTS package;

CREATE TABLE package (
    number integer NOT NULL,
    string varchar(20) NOT NULL
);
