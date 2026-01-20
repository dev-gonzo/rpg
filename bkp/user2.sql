create table "user"
(
    id         uuid                        not null
        primary key,
    created_at timestamp(6) with time zone not null,
    email      varchar(255)                not null
        constraint ukhl4ga9r00rh51mdaf20hmnslt
            unique,
    is_master  boolean                     not null,
    name       varchar(255)                not null,
    password   varchar(255)                not null,
    updated_at timestamp(6) with time zone not null
);

alter table "user"
    owner to yeyokp_rpg;

