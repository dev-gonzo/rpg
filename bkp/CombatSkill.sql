create table "CombatSkill"
(
    id                varchar(255)                           not null
        primary key,
    "characterId"     varchar(255)                           not null
        references "Character"
            on update cascade on delete cascade,
    "group"           varchar(255),
    skill             varchar(255)                           not null,
    attribute         varchar(255),
    "attackCost"      integer                                not null,
    "defenseCost"     integer                                not null,
    "attackKitValue"  integer                                not null,
    "defenseKitValue" integer                                not null,
    "createdAt"       timestamp(3) default CURRENT_TIMESTAMP not null,
    "updatedAt"       timestamp(3)                           not null
);

alter table "CombatSkill"
    owner to yeyokp_rpg;

INSERT INTO public."CombatSkill" (id, "characterId", "group", skill, attribute, "attackCost", "defenseCost", "attackKitValue", "defenseKitValue", "createdAt", "updatedAt") VALUES ('51e8ff8c-29ff-4faf-9e54-4dc46a23f9a7', 'e69fc5e0-0aec-46ac-a5b4-a2ac2bd1fac7', 'Armas de fogo', 'Pistola', 'DEX', 45, 0, 30, 0, '2025-07-16 00:01:35.513', '2025-07-16 01:22:22.180');
INSERT INTO public."CombatSkill" (id, "characterId", "group", skill, attribute, "attackCost", "defenseCost", "attackKitValue", "defenseKitValue", "createdAt", "updatedAt") VALUES ('ddcd70e7-2276-461f-8972-817fbc3b8ab4', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Armas de Fogo', 'Escopetas', 'DEX', 40, 0, 50, 0, '2025-07-07 17:21:19.693', '2025-07-10 21:25:52.889');
INSERT INTO public."CombatSkill" (id, "characterId", "group", skill, attribute, "attackCost", "defenseCost", "attackKitValue", "defenseKitValue", "createdAt", "updatedAt") VALUES ('fbd41f18-e6c4-4063-9488-b04d7f6fb84e', '25c11889-f323-4a99-9ec7-471a290ec789', 'Armas Branca', 'Faca', 'DEX', 25, 0, 0, 0, '2025-07-09 02:49:20.081', '2025-07-09 03:00:37.957');
INSERT INTO public."CombatSkill" (id, "characterId", "group", skill, attribute, "attackCost", "defenseCost", "attackKitValue", "defenseKitValue", "createdAt", "updatedAt") VALUES ('0896b384-7225-4d95-b841-b7a1e2728582', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Armas de Fogo', 'Pistolas', 'DEX', 40, 0, 50, 0, '2025-07-07 17:21:01.949', '2025-07-10 21:25:56.824');
INSERT INTO public."CombatSkill" (id, "characterId", "group", skill, attribute, "attackCost", "defenseCost", "attackKitValue", "defenseKitValue", "createdAt", "updatedAt") VALUES ('0bd936a1-b9a5-4a17-a67a-a9602b326f84', '25c11889-f323-4a99-9ec7-471a290ec789', 'Amas de Fogo', 'Armas pesadas', 'DEX', 0, 0, 50, 0, '2025-07-09 03:11:13.219', '2025-07-09 03:11:13.219');
INSERT INTO public."CombatSkill" (id, "characterId", "group", skill, attribute, "attackCost", "defenseCost", "attackKitValue", "defenseKitValue", "createdAt", "updatedAt") VALUES ('23623d90-9d91-43da-a13d-e7b3f29dcd20', '25c11889-f323-4a99-9ec7-471a290ec789', 'Amas de Fogo', 'Pistolas', 'DEX', 20, 0, 40, 0, '2025-07-09 02:02:05.399', '2025-07-09 03:11:51.808');
INSERT INTO public."CombatSkill" (id, "characterId", "group", skill, attribute, "attackCost", "defenseCost", "attackKitValue", "defenseKitValue", "createdAt", "updatedAt") VALUES ('6d37ba0e-c0c5-44d1-b4c6-873795dc6f58', '25c11889-f323-4a99-9ec7-471a290ec789', 'Amas de Fogo', 'Submetralhadora', 'DEX', 10, 0, 40, 0, '2025-07-09 03:10:00.747', '2025-07-09 03:12:04.634');
INSERT INTO public."CombatSkill" (id, "characterId", "group", skill, attribute, "attackCost", "defenseCost", "attackKitValue", "defenseKitValue", "createdAt", "updatedAt") VALUES ('226190f4-4d2a-42e1-b11e-d8cf86e38f6d', '25c11889-f323-4a99-9ec7-471a290ec789', null, 'Esquiva', 'AGI', 0, 0, 0, 50, '2025-07-09 03:12:57.362', '2025-07-09 03:12:57.362');
INSERT INTO public."CombatSkill" (id, "characterId", "group", skill, attribute, "attackCost", "defenseCost", "attackKitValue", "defenseKitValue", "createdAt", "updatedAt") VALUES ('975ace50-8a2b-418f-a19a-0a82ab330f9a', '25c11889-f323-4a99-9ec7-471a290ec789', null, 'Explosivos (entrou no lugar de táticas militares)', null, 0, 0, 50, 0, '2025-07-09 03:30:51.051', '2025-07-09 03:30:51.051');
INSERT INTO public."CombatSkill" (id, "characterId", "group", skill, attribute, "attackCost", "defenseCost", "attackKitValue", "defenseKitValue", "createdAt", "updatedAt") VALUES ('e4829376-f1c4-4be1-9099-8f498bc94545', 'e69fc5e0-0aec-46ac-a5b4-a2ac2bd1fac7', 'Armas de fogo', 'Revolver ', 'DEX', 45, 0, 30, 0, '2025-07-15 23:59:39.970', '2025-07-16 01:22:55.242');
INSERT INTO public."CombatSkill" (id, "characterId", "group", skill, attribute, "attackCost", "defenseCost", "attackKitValue", "defenseKitValue", "createdAt", "updatedAt") VALUES ('b6ec4ef1-7fab-4a7e-af5d-8392d021fa01', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Armas Brancas (Kit Caçador - Clube de Caça, pág. 24)', 'Machados de uma mão', 'DEX', 0, 0, 30, 30, '2025-07-07 16:13:28.496', '2025-07-10 17:59:16.985');
INSERT INTO public."CombatSkill" (id, "characterId", "group", skill, attribute, "attackCost", "defenseCost", "attackKitValue", "defenseKitValue", "createdAt", "updatedAt") VALUES ('d0be42f8-601d-4fe3-8036-a5ce19fc2306', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Esquiva', 'Esquiva', 'AGI', 0, 90, 0, 0, '2025-07-07 23:50:16.002', '2025-07-10 21:26:08.080');
INSERT INTO public."CombatSkill" (id, "characterId", "group", skill, attribute, "attackCost", "defenseCost", "attackKitValue", "defenseKitValue", "createdAt", "updatedAt") VALUES ('fe4ae262-234e-44fd-ac15-c8d0f11050ce', '25c11889-f323-4a99-9ec7-471a290ec789', 'Esportes', 'Arremesso', 'DEX', 30, 0, 0, 0, '2025-07-09 03:04:04.124', '2025-07-17 22:08:18.849');
INSERT INTO public."CombatSkill" (id, "characterId", "group", skill, attribute, "attackCost", "defenseCost", "attackKitValue", "defenseKitValue", "createdAt", "updatedAt") VALUES ('e417666b-802b-4bf9-bbfc-ab5f6c9f3072', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Armas Brancas', 'Cajado', 'DEX', 0, 0, 30, 30, '2025-07-13 03:29:48.874', '2025-07-13 03:30:31.774');
INSERT INTO public."CombatSkill" (id, "characterId", "group", skill, attribute, "attackCost", "defenseCost", "attackKitValue", "defenseKitValue", "createdAt", "updatedAt") VALUES ('ab7909b8-7e36-4219-9d42-24dc84da339a', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Armas Brancas  (Kit Caçador - Clube de Caça, pág. 24)', 'Facas', 'DEX', 30, 0, 30, 30, '2025-07-07 16:12:16.110', '2025-07-14 19:36:16.690');
INSERT INTO public."CombatSkill" (id, "characterId", "group", skill, attribute, "attackCost", "defenseCost", "attackKitValue", "defenseKitValue", "createdAt", "updatedAt") VALUES ('bfc769df-bf2b-45ab-8c5f-241fd794f6f8', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Armas Brancas', 'Adaga', 'DEX', 70, 40, 0, 0, '2025-07-12 23:55:27.619', '2025-07-15 19:21:50.156');
