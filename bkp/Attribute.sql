create table "Attribute"
(
    id            varchar(255)                           not null
        primary key,
    "characterId" varchar(255)                           not null
        references "Character"
            on update cascade on delete restrict,
    "CON"         integer                                not null,
    "FR"          integer                                not null,
    "DEX"         integer                                not null,
    "AGI"         integer                                not null,
    "INT"         integer                                not null,
    "WILL"        integer                                not null,
    "PER"         integer                                not null,
    "CAR"         integer                                not null,
    "createdAt"   timestamp(3) default CURRENT_TIMESTAMP not null,
    "updatedAt"   timestamp(3)                           not null,
    con_mod       integer,
    fr_mod        integer,
    dex_mod       integer,
    agi_mod       integer,
    int_mod       integer,
    will_mod      integer,
    per_mod       integer,
    car_mod       integer
);

alter table "Attribute"
    owner to yeyokp_rpg;

create unique index "Attribute_characterId_key"
    on "Attribute" ("characterId");

INSERT INTO public."Attribute" (id, "characterId", "CON", "FR", "DEX", "AGI", "INT", "WILL", "PER", "CAR", "createdAt", "updatedAt", con_mod, fr_mod, dex_mod, agi_mod, int_mod, will_mod, per_mod, car_mod) VALUES ('165dcfbc-19ce-46d8-be76-2889a43134fc', 'c32c1497-7f84-42ba-93a8-9f5271b234fb', 12, 10, 10, 13, 16, 22, 15, 10, '2025-07-07 19:05:20.554', '2025-07-17 13:17:27.938', null, null, null, null, null, null, null, null);
INSERT INTO public."Attribute" (id, "characterId", "CON", "FR", "DEX", "AGI", "INT", "WILL", "PER", "CAR", "createdAt", "updatedAt", con_mod, fr_mod, dex_mod, agi_mod, int_mod, will_mod, per_mod, car_mod) VALUES ('ededb141-d081-4805-84ca-6068216f3908', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 12, 12, 10, 12, 22, 18, 12, 10, '2025-07-07 16:07:04.804', '2025-07-18 22:48:55.388', 6, 3, 0, 6, null, 0, 6, null);
INSERT INTO public."Attribute" (id, "characterId", "CON", "FR", "DEX", "AGI", "INT", "WILL", "PER", "CAR", "createdAt", "updatedAt", con_mod, fr_mod, dex_mod, agi_mod, int_mod, will_mod, per_mod, car_mod) VALUES ('fc3effbb-f592-47ea-9cdc-a8816629ae71', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 10, 10, 13, 12, 20, 17, 16, 10, '2025-07-08 23:07:14.458', '2025-07-13 03:19:34.816', 0, 0, null, null, null, null, null, null);
INSERT INTO public."Attribute" (id, "characterId", "CON", "FR", "DEX", "AGI", "INT", "WILL", "PER", "CAR", "createdAt", "updatedAt", con_mod, fr_mod, dex_mod, agi_mod, int_mod, will_mod, per_mod, car_mod) VALUES ('c84824be-a04d-44a1-8765-36eb67bb826e', '25c11889-f323-4a99-9ec7-471a290ec789', 12, 11, 22, 13, 12, 15, 13, 10, '2025-07-08 00:01:53.991', '2025-07-09 03:05:29.538', null, null, null, null, null, null, null, null);
INSERT INTO public."Attribute" (id, "characterId", "CON", "FR", "DEX", "AGI", "INT", "WILL", "PER", "CAR", "createdAt", "updatedAt", con_mod, fr_mod, dex_mod, agi_mod, int_mod, will_mod, per_mod, car_mod) VALUES ('6d27a647-2ac1-4fa9-86e3-5acfde3ad1b2', '606e7043-86bb-4de4-87bf-3284d5d054fe', 3, 3, 3, 3, 3, 3, 3, 3, '2025-07-09 13:11:04.122', '2025-07-09 13:11:38.016', 2, 2, 2, 2, 2, 2, 2, 2);
INSERT INTO public."Attribute" (id, "characterId", "CON", "FR", "DEX", "AGI", "INT", "WILL", "PER", "CAR", "createdAt", "updatedAt", con_mod, fr_mod, dex_mod, agi_mod, int_mod, will_mod, per_mod, car_mod) VALUES ('711c38c5-1502-44b6-b314-f61e324a245f', 'e69fc5e0-0aec-46ac-a5b4-a2ac2bd1fac7', 12, 10, 18, 10, 10, 16, 14, 18, '2025-07-07 01:21:39.274', '2025-07-15 23:41:34.766', 0, null, null, null, null, null, null, null);
INSERT INTO public."Attribute" (id, "characterId", "CON", "FR", "DEX", "AGI", "INT", "WILL", "PER", "CAR", "createdAt", "updatedAt", con_mod, fr_mod, dex_mod, agi_mod, int_mod, will_mod, per_mod, car_mod) VALUES ('d112df41-fc55-4dba-97e6-ca48d313debc', '0426ca76-0276-4dc8-8cdd-3822f45b3ee1', 12, 11, 10, 10, 12, 10, 10, 10, '2025-08-08 11:54:50.499', '2025-08-08 16:45:12.932', 0, 0, 0, 0, 0, 0, 0, 0);
