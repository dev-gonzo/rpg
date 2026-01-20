create table "Character_societyAllies"
(
    character_id varchar(255) not null
        constraint fkoqec3vh9cevmk0vr0xsbgwuwq
            references "Character",
    value        varchar(255)
);

alter table "Character_societyAllies"
    owner to yeyokp_rpg;

