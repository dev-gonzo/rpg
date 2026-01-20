create table "User"
(
    id          varchar(255)                           not null
        primary key,
    name        varchar(255)                           not null,
    email       varchar(255)                           not null,
    password    varchar(255)                           not null,
    "createdAt" timestamp(3) default CURRENT_TIMESTAMP not null,
    "updatedAt" timestamp(3)                           not null,
    "isMaster"  boolean      default false             not null
);

alter table "User"
    owner to yeyokp_rpg;

create unique index "User_email_key"
    on "User" (email);

INSERT INTO public."User" (id, name, email, password, "createdAt", "updatedAt", "isMaster") VALUES ('cd396c7f-cad9-453d-b0e8-3686cfdc4711', 'Eduardo Di Lauro', 'eduardo.dilauro@gmail.com', '$2b$10$qT9kiz8QO/EKolFCLr9TKepHmW1TLKbOocnjOcyaSwdMIPM6Gn/bC', '2025-07-06 22:30:50.970', '2025-07-06 22:30:50.970', true);
INSERT INTO public."User" (id, name, email, password, "createdAt", "updatedAt", "isMaster") VALUES ('224caf4f-59a2-4db1-a335-6d9e1c483b49', 'Jogador 1', 'jogador1@gmail.com', '$2b$10$uNvLgvEK1nUwXn6o/rcYyOI.r1nG8j4Yrtsuf1t2S1y6xuSfLQ3UK', '2025-07-06 22:45:26.792', '2025-07-06 22:45:26.792', false);
INSERT INTO public."User" (id, name, email, password, "createdAt", "updatedAt", "isMaster") VALUES ('86143e47-6976-4151-8dd5-a895283596fc', 'William', 'lord.sebring@gmail.com', '$2b$10$vKN7R6JwaYqrllLSrFDROuzUBzNDk3W.8wUrAp2MnO7DWJ81U0oUK', '2025-07-07 00:51:00.560', '2025-07-07 00:51:00.560', false);
INSERT INTO public."User" (id, name, email, password, "createdAt", "updatedAt", "isMaster") VALUES ('7e508af6-c802-454f-acdc-2932f73e9c39', 'Bruno', 'brunodilauro87@gmail.com', '$2b$10$AYh5MiX8HKh7UQAFXlw1ROdQ1zTPThUdZCIxxZDMagYi/aYLBFttK', '2025-07-07 15:02:31.292', '2025-07-07 15:02:31.292', false);
INSERT INTO public."User" (id, name, email, password, "createdAt", "updatedAt", "isMaster") VALUES ('012eba7d-5f0f-47b5-88d7-1ac0f16b4de8', 'Stefano', 's_lokken@hotmail.com', '$2b$10$ekWTpjtmf8u/UkRUIKGs4epKVZlkZXEX3AJ83dmVeRvY20Ov/Jkw6', '2025-07-07 15:03:11.011', '2025-07-07 15:03:11.011', false);
INSERT INTO public."User" (id, name, email, password, "createdAt", "updatedAt", "isMaster") VALUES ('2bbbf709-f3e7-40d5-8814-92d5b9e69030', 'Luciano', 'luciano.jr1996@hotmail.com', '$2b$10$qlQ4DqBOyumnGBhpQhftR.LK/JLmCH96MjAzYGaF4D65z7s9HABSe', '2025-07-06 23:11:37.357', '2025-07-18 13:49:31.653', false);
INSERT INTO public."User" (id, name, email, password, "createdAt", "updatedAt", "isMaster") VALUES ('11dca9df-18b2-4d72-b490-e2b46c1a01e7', 'Wilson', 'wilson.bizon@gmail.com', '$2b$10$qlQ4DqBOyumnGBhpQhftR.LK/JLmCH96MjAzYGaF4D65z7s9HABSe', '2025-07-07 15:03:23.038', '2025-07-07 15:03:23.038', false);
INSERT INTO public."User" (id, name, email, password, "createdAt", "updatedAt", "isMaster") VALUES ('517fc64c-a57f-46f2-b667-b1375862334e', 'Fabber', 'lfabber93@gmail.com', '$2b$10$RZcpr5nlTq7Fr.f9qTHhauF7QTrJntVl2sinzezZxx5.JvoOAOz8O', '2025-08-27 19:35:27.195', '2025-08-27 19:35:27.195', false);
INSERT INTO public."User" (id, name, email, password, "createdAt", "updatedAt", "isMaster") VALUES ('546efdd5-cc54-41cf-9f3e-c16d18443157', 'Migluez', 'miguel.silva.b10@gmail.com', '$2b$10$qdNrst6X6C1uEJqXXQE1ROKTyJUKTuBgFN1J5KTp0LzH.q1zY84ly', '2025-09-02 16:59:34.823', '2025-09-02 16:59:34.823', false);
