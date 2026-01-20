create table "Weapon"
(
    id            varchar(255)                           not null
        primary key,
    "characterId" varchar(255)                           not null
        references "Character"
            on update cascade on delete cascade,
    name          varchar(255)                           not null,
    description   text,
    damage        varchar(255)                           not null,
    initiative    integer                                not null,
    range         varchar(255),
    rof           varchar(255),
    ammunition    varchar(255),
    "bookPage"    varchar(255),
    "createdAt"   timestamp(3) default CURRENT_TIMESTAMP not null,
    "updatedAt"   timestamp(3)                           not null
);

alter table "Weapon"
    owner to yeyokp_rpg;

INSERT INTO public."Weapon" (id, "characterId", name, description, damage, initiative, range, rof, ammunition, "bookPage", "createdAt", "updatedAt") VALUES ('db5cd50e-e6b5-416d-bc07-4c5f46be93a4', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Garra de Basilisco', e'Seu nome é originado das lendas sobre seu uso. A lâmina sinuosa provoca dor extrema no oponente, o que
a torna prática nos casos em que não se deseja a fuga do inimigo.

', ' 1d3+2', -3, null, '', '', 'Guia de Armas Medievais - pag. 17', '2025-07-14 18:19:28.129', '2025-07-14 18:20:08.327');
INSERT INTO public."Weapon" (id, "characterId", name, description, damage, initiative, range, rof, ammunition, "bookPage", "createdAt", "updatedAt") VALUES ('e135783f-235b-43ed-a153-10a388848eac', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Faca Fairbairn-Sykes (Holbein)', e'Holbein: Desenvolvida a partir da Baselard, esta arma é tão avançada que serviu de base para as adagas utilizadas pela SS na Segunda Guerra Mundial. Possui lâmina larga e muito afiada.
Usei as estatísticas para simbolizar uma faca de combate comum do exército britânico (Fairbairn-Sykes) por conta do tamanho equivalente e pelo fato da F-S ser uma faca de dois gumes, não aquela padrão "Rambo"
', '1d6', -3, null, '', '', 'Guia de Armas Medievais, pág. 16', '2025-07-07 21:17:57.438', '2025-07-07 21:18:09.339');
INSERT INTO public."Weapon" (id, "characterId", name, description, damage, initiative, range, rof, ammunition, "bookPage", "createdAt", "updatedAt") VALUES ('bffa7f1d-5b26-4df0-a862-e77c582d06da', 'c32c1497-7f84-42ba-93a8-9f5271b234fb', 'Cruz de Prata ', 'Feita de prata, do tamanho de uma agenda', '0', 0, null, '', '', '', '2025-07-10 01:31:18.831', '2025-07-17 03:56:30.996');
INSERT INTO public."Weapon" (id, "characterId", name, description, damage, initiative, range, rof, ammunition, "bookPage", "createdAt", "updatedAt") VALUES ('10d488ec-f8db-4618-b56c-ed671e030ef1', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Machado de Mão', e'Machado construído para uso com uma só mão. Afiado, um golpe certeiro pode até matar uma pessoa. Seu cabo é feito de madeira resistente.
Peso: 2,0 a 3,0kg
Preço: 5 a 8 gp (não tem em US$)
Comprimento: 40 a 60cm
Dano: Corte', '1d6', -6, null, '', '', 'Guia de Armas Medievais, pág. 35', '2025-07-08 00:02:55.534', '2025-07-08 21:30:27.596');
INSERT INTO public."Weapon" (id, "characterId", name, description, damage, initiative, range, rof, ammunition, "bookPage", "createdAt", "updatedAt") VALUES ('74e35d8b-b94a-4a7c-a63e-4fe6193b3d8a', '25c11889-f323-4a99-9ec7-471a290ec789', 'Colt M1900 (Arma Mágica)', e'A Colt Modelo 1900 era uma pistola semi-automática, operada de recuo curto "auto-carregamento", introduzida pela Colt\'s Manufacturing Company na Virada do século XX. A patente do primeiro protótipo era de 1897, e foi pelo desenvolvimento desta pistola que também foi desenvolvido o calibre .38 ACP. A Colt modelo 1900 também contava comemorar o mais novo sistema de alimentação da época o recém inventado carregador, de que possuía a capacidade de guardar 7 projeteis calibre .38 ACP. Ela também marcou a introdução do .38 ACP, a rodada para a qual está na câmara (não deve ser confundido com o .380 ACP), e foi a primeira arma a utilizar a operação de recuo-curto.

alcance 50m
+30% de ataque', '1d6+5 ', 0, null, '1', '.38 ACP', 'guia de armas, pag 31 - ref Bernardelli M‑80', '2025-07-09 02:24:25.771', '2025-07-09 03:08:21.844');
INSERT INTO public."Weapon" (id, "characterId", name, description, damage, initiative, range, rof, ammunition, "bookPage", "createdAt", "updatedAt") VALUES ('81107dab-0c78-43c4-80f1-db287e389a3d', 'c32c1497-7f84-42ba-93a8-9f5271b234fb', 'Rosário ', 'Presente que recebi da diretora do orfanato de de San Benedetto', '0', 0, null, '', '', '', '2025-07-10 01:28:09.773', '2025-07-10 01:28:09.773');
INSERT INTO public."Weapon" (id, "characterId", name, description, damage, initiative, range, rof, ammunition, "bookPage", "createdAt", "updatedAt") VALUES ('8ce88a75-ef75-41c9-b9a5-95cf04cae3ad', 'c32c1497-7f84-42ba-93a8-9f5271b234fb', 'Bíblia', 'Livro em latim, capa dura', '0', 0, null, '', '', '', '2025-07-10 01:28:37.986', '2025-07-10 01:28:37.986');
INSERT INTO public."Weapon" (id, "characterId", name, description, damage, initiative, range, rof, ammunition, "bookPage", "createdAt", "updatedAt") VALUES ('6d2d279f-7beb-4202-9ca6-e0d4c2bd54a5', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Pistola F.I.E. TZ 75', e'O modelo TZ 75 (Clone do CZ 75) é uma pistola de alto poder de fogo. O pente tem grande capacidade, o gatilho é sensível e confiável e o peso não incomoda o atirador.
Lançamento: 1979
Munição: 9mm Parabellum
Alcance: 50m
Peso: 1,0kg
Preço: US$460,00
Ocultação: J', '2d6+2', 0, null, '3 (semi-automática)', '15', 'Guia de Armas, pág. 40', '2025-07-07 20:36:25.582', '2025-07-10 18:40:17.242');
INSERT INTO public."Weapon" (id, "characterId", name, description, damage, initiative, range, rof, ammunition, "bookPage", "createdAt", "updatedAt") VALUES ('4f19fdea-35eb-47a6-ab5e-bba4da90f044', 'c32c1497-7f84-42ba-93a8-9f5271b234fb', 'Cantil de água benta', '', '2d6', 0, null, '', '', '', '2025-07-10 01:31:38.327', '2025-07-10 01:31:38.327');
INSERT INTO public."Weapon" (id, "characterId", name, description, damage, initiative, range, rof, ammunition, "bookPage", "createdAt", "updatedAt") VALUES ('1099161e-4689-47e2-aed4-2bcc269aa83c', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Escopeta Ithaca 37M&P', e'Essa escopeta foi originalmente projetada para uso policial e militar. Ela ejeta as cápsulas para baixo evitando atrapalhar o campo de visão do atirador e de seu companheiros.
Ano de lançamento: 1937
Munição: calibre 12
Alcance: 50m
Peso: 3,0kg
Preço US$ 550,00 (versão de 8 tiros)
Ocultação: N', '4d6', 0, null, '1', '8', 'Guia de Armas, pág. 84', '2025-07-10 18:24:45.128', '2025-07-10 18:24:45.128');
INSERT INTO public."Weapon" (id, "characterId", name, description, damage, initiative, range, rof, ammunition, "bookPage", "createdAt", "updatedAt") VALUES ('7c2f3745-3970-4ee9-94be-381a93db90d3', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Pistola Sig Sauer P230', e'Esta arma de origem alemã é confeccionada em plástico preto. É ideal para operações especiais pois não é acusada no detector de metais, embora a munição seja.
Lançamento: 1977
Munição: 9mm Parabellum
Alcance: 45m
Peso: 0,8kg
Preço: US$525,00
Ocultação: B', '2d6', 0, null, '2', '8', 'Guia de Armas, pág. 52', '2025-07-07 21:35:13.371', '2025-07-10 18:40:56.042');
INSERT INTO public."Weapon" (id, "characterId", name, description, damage, initiative, range, rof, ammunition, "bookPage", "createdAt", "updatedAt") VALUES ('ef335da5-6d1f-4d9f-8fb0-d620b4a83981', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Punhal Longo', e'+30% em ataque
Punhal Longo (Arma de referencia)
O maior dos punhais; aos olhos de um leigo pode até ser confundido com uma espada curta. Porém,
mantém a lâmina esbelta e o peso relativamente baixo dos punhais.
', '1d3+1 (para humanos) 1d6+5 (criatura não humanas/ incuir humanos com poderes sobre humano)', -4, null, '', '', 'Guia de Armas Medievais - pag. 14', '2025-07-13 00:57:40.024', '2025-07-14 18:19:54.943');
INSERT INTO public."Weapon" (id, "characterId", name, description, damage, initiative, range, rof, ammunition, "bookPage", "createdAt", "updatedAt") VALUES ('ff71dcb3-f934-4c29-9b5e-19cb3c244a17', 'c32c1497-7f84-42ba-93a8-9f5271b234fb', 'Óleo de unção ', '', '0', 0, null, '', '', '', '2025-07-17 03:59:15.170', '2025-07-17 03:59:15.170');
INSERT INTO public."Weapon" (id, "characterId", name, description, damage, initiative, range, rof, ammunition, "bookPage", "createdAt", "updatedAt") VALUES ('2a990602-dc54-4855-8a77-ddba9ffd0387', 'c32c1497-7f84-42ba-93a8-9f5271b234fb', 'Medalha de São Bento', '', '0', 0, null, '', '', '', '2025-07-17 03:59:36.179', '2025-07-17 03:59:36.179');
INSERT INTO public."Weapon" (id, "characterId", name, description, damage, initiative, range, rof, ammunition, "bookPage", "createdAt", "updatedAt") VALUES ('86fb5122-23cc-4f86-92ae-8cace2634e75', 'e69fc5e0-0aec-46ac-a5b4-a2ac2bd1fac7', 'Revolver ', 'Colt Python', '1d6 + 1', 0, null, '', '', '', '2025-07-07 01:43:34.536', '2025-07-18 22:36:37.163');
