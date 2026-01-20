create table "PathsAndForms"
(
    "characterId"    varchar(255)                           not null
        primary key
        references "Character"
            on update cascade on delete restrict,
    "understandForm" integer                                not null,
    "createForm"     integer                                not null,
    "controlForm"    integer                                not null,
    fire             integer                                not null,
    water            integer                                not null,
    earth            integer                                not null,
    air              integer                                not null,
    light            integer                                not null,
    darkness         integer                                not null,
    plants           integer                                not null,
    animals          integer                                not null,
    humans           integer                                not null,
    spiritum         integer                                not null,
    arkanun          integer                                not null,
    metamagic        integer                                not null,
    "createdAt"      timestamp(3) default CURRENT_TIMESTAMP not null,
    "updatedAt"      timestamp(3)                           not null
);

alter table "PathsAndForms"
    owner to yeyokp_rpg;

INSERT INTO public."PathsAndForms" ("characterId", "understandForm", "createForm", "controlForm", fire, water, earth, air, light, darkness, plants, animals, humans, spiritum, arkanun, metamagic, "createdAt", "updatedAt") VALUES ('48a82c80-490f-4568-9b53-f9c4dbc991c1', 0, 4, 2, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, '2025-07-12 23:59:00.690', '2025-07-12 23:59:00.690');
