create table "Note"
(
    id            varchar(255)                           not null
        primary key,
    "characterId" varchar(255)                           not null
        references "Character"
            on update cascade on delete cascade,
    note          text                                   not null,
    "createdAt"   timestamp(3) default CURRENT_TIMESTAMP not null,
    "updatedAt"   timestamp(3)                           not null
);

alter table "Note"
    owner to yeyokp_rpg;

INSERT INTO public."Note" (id, "characterId", note, "createdAt", "updatedAt") VALUES ('ae3e5d75-c623-4ec2-97f6-50ffae1dcbbf', 'e69fc5e0-0aec-46ac-a5b4-a2ac2bd1fac7', 'Placa do carro', '2025-07-19 01:05:02.257', '2025-07-19 01:05:02.257');
INSERT INTO public."Note" (id, "characterId", note, "createdAt", "updatedAt") VALUES ('cb90b1f0-5918-4d5d-9efc-41bbf0701ec9', 'e69fc5e0-0aec-46ac-a5b4-a2ac2bd1fac7', 'Ed: "Vc viu a mulher que em coma?"', '2025-07-19 01:40:26.996', '2025-07-19 01:40:26.996');
INSERT INTO public."Note" (id, "characterId", note, "createdAt", "updatedAt") VALUES ('caf6c3f5-fd57-4de3-bf5a-35d4042e6aee', 'e69fc5e0-0aec-46ac-a5b4-a2ac2bd1fac7', 'Ed: Procure o J.J. Meier, loja de penhores GreekTown.', '2025-07-19 01:02:21.923', '2025-07-19 01:40:39.277');
INSERT INTO public."Note" (id, "characterId", note, "createdAt", "updatedAt") VALUES ('85692db9-cfeb-4cf3-acbf-27a873fffd4c', 'e69fc5e0-0aec-46ac-a5b4-a2ac2bd1fac7', 'Hostpital Saint Judge - Caroline', '2025-07-19 01:44:53.561', '2025-07-19 01:44:53.561');
INSERT INTO public."Note" (id, "characterId", note, "createdAt", "updatedAt") VALUES ('c34220cb-007b-4594-a5b8-bdcad1bd12c4', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', e'Para falar com o mestre antes do jogo começar:
- O personagem é um caçador nível 8 focado em preparo prévio. Tem bons valores de Alquimia, Ocultismo e Artífice;
Alquimia (o que eu posso fazer?);
- Elixires (usa componentes das criaturas para criar conjuntos de efeitos relacionados a elas. Ex.: "Elixir do Lobisomem" daria um conjunto de características desta criatura, como agilidade, regeneração ou sentidos aguçados). Por ser algo melhor que poções normais, podemos colocar uma desvantagem, como reduzir um atributo se aumenta outro; teste de CON pra não vomitar; tomar dano quando usa; algum efeito adverso depois que o efeito termina, etc;
- Poções (podemos definir como característica simples: 1 efeito; ou como de efeito imediato: como poção de cura; ou ambos: cura é imediato, visão na penumbra é por 3d6 turnos, etc.);
- Óleos e Unguentos (funcionariam como buff de munição e de armas brancas. Não é encantamento, portanto não teria efeito tipo +iniciativa ou +acerto. Dar dano extra é o mais comum - inclusive para venenos ou balas de prata, mas outros efeitos poderiam ser válidos. Ex.: atrapalha regeneração em -1d3. Causa como -2 AGI com teste de CON pra resistir; etc.);
- Alquimia (ingredientes): Já havia definido que possuía ingredientes alquímicos e dei exemplos. Se eu quiser fazer determinada poção, podemos estabelecer testes (Fácil, Normal ou Difícil) pra saber se tenho os componentes necessários pra fazer determinada solução? Ou acha melhor definirmos o que tenho e o que não tenho e conseguir outros ingredientes em jogo?
- Alquimia (itens prontos): O que já posso ter pronto ou em andamento? (Não anotei antes de o jogo começar, porque não deixamos definido o que daria pra fazer)
Munição especial
- Já tenho alguma coisa pronta? Ou tenho componentes para fazer, se necessário? Na mesma regra para Alquimia.', '2025-07-21 14:18:40.848', '2025-07-21 15:27:53.730');
INSERT INTO public."Note" (id, "characterId", note, "createdAt", "updatedAt") VALUES ('2e7cb8b2-0e34-48d7-9e94-55805ebf06db', 'e69fc5e0-0aec-46ac-a5b4-a2ac2bd1fac7', 'Policial que chegou na cena do crime', '2025-07-19 02:15:00.579', '2025-07-19 02:15:00.579');
INSERT INTO public."Note" (id, "characterId", note, "createdAt", "updatedAt") VALUES ('79f6b63b-a318-4d89-ad2f-6683194f7b8e', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Karoline (mulher no hospital)', '2025-07-19 02:40:30.849', '2025-07-19 02:40:30.849');
INSERT INTO public."Note" (id, "characterId", note, "createdAt", "updatedAt") VALUES ('a3479d0c-4b6e-4a03-ba46-3e948a160c3e', 'e69fc5e0-0aec-46ac-a5b4-a2ac2bd1fac7', e'Moleque é o Daniel, tirou as fotos 

"Eu só tirei as fotos, eu não queria matar vcs"', '2025-07-19 05:03:57.887', '2025-07-19 05:04:48.291');
INSERT INTO public."Note" (id, "characterId", note, "createdAt", "updatedAt") VALUES ('10b04b81-78bb-4a17-954f-2bd03cfa2b89', 'e69fc5e0-0aec-46ac-a5b4-a2ac2bd1fac7', 'Endereco do Crowley na agenda', '2025-07-19 05:07:16.433', '2025-07-19 05:07:16.433');
INSERT INTO public."Note" (id, "characterId", note, "createdAt", "updatedAt") VALUES ('442c28a0-5666-41c2-a675-d05d96a485c0', 'e69fc5e0-0aec-46ac-a5b4-a2ac2bd1fac7', e'Corpo carbonizado, necrotério. Só 1

Policial que pediu demissão', '2025-07-19 05:29:50.960', '2025-07-19 05:29:50.960');
INSERT INTO public."Note" (id, "characterId", note, "createdAt", "updatedAt") VALUES ('121057b1-2587-4281-b8c2-1fa4c81671e3', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', e'Coisas pra não esquecer de fazer em jogo:
- Comprar gelo pra colocar o demônio no cooler;
- Pedir um teste de Alquimia para saber que tipos de ingredientes você sabe que pode usar deste cadáver;
- Separar um tempo para dissecar e conservar o que puder deste demônio (fígado, olhos, orelhas, coração, etc.);', '2025-07-21 15:28:06.331', '2025-07-21 15:28:06.331');
INSERT INTO public."Note" (id, "characterId", note, "createdAt", "updatedAt") VALUES ('0a37f274-e090-4487-91be-9b468ea17d2b', '48a82c80-490f-4568-9b53-f9c4dbc991c1', e'Caído dos céus, três sobreviveram.
', '2025-07-19 05:16:07.502', '2025-07-19 07:36:58.497');
INSERT INTO public."Note" (id, "characterId", note, "createdAt", "updatedAt") VALUES ('123e628c-2dee-431d-b4ff-1724c2f0d2f1', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', e'Para falar com "Doc":
- Deixá-lo ciente de que você tem coisas para "trocar" por informações (como o corpo de um demônio de ingrediente para rituais);
- Verificar se consegue algum livro de anatomia pra fazer comparativos na hora da dissecação;', '2025-07-21 15:28:13.846', '2025-07-21 15:28:13.846');
INSERT INTO public."Note" (id, "characterId", note, "createdAt", "updatedAt") VALUES ('09311c6e-2ac7-41ea-9bc1-025f04f8b3bd', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', e'Perseguidos:
Eddie Lawson;
Alex Rossi;
Kevin MacLane;
Mathew O\'Connor;
Samuel Colt;', '2025-07-21 12:29:27.588', '2025-07-21 12:29:27.588');
INSERT INTO public."Note" (id, "characterId", note, "createdAt", "updatedAt") VALUES ('d201f8f0-5ec4-42f7-b579-3b0951d8172c', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', e'Eddie Lawson - Repórter - Está obcecado pelo caso, é tudo o que posso dizer. Não sei que ele pode ou não ter pensamentos suicidas (não me lembro de o Wilson ter compartilhado essa informação comigo);
Wally Drexler - Repórter - Escreve o que as autoridades querem que seja publicado. É dele a versão da explosão de um tambor de resíduos como causa do incidente do beco;
JJ Meyer Loja de penhores - Greek town - Tio de Daniel Meyer (garoto que tirou as fotos e morreu na linha do trem). Deu uma polaroid "diferente" para o garoto. Talvez seja interessante investigar quem vendeu aquela polaroid;
Caroline - Loira - St. Judge - Padre consegue entender as loucuras que ela fala em coma? (Confirmar se vi ele conseguindo conversar) | Precisamos ter mais informações sobre ela;
Rebeca Lang - influencer - Possivelmente envolvida no ritual de "prosperidade" de Jonathan Cross;
Jonathan Cross - pastor - Possível principal responsável pelo ritual de "prosperidade" que tinha anjos como fetiches;
Daniel Crowley - professor - Pesquisador do ritual de "prosperidade" de Jonathan Cross. Professor que se interessa por hermetismo e ocultismo. Divulgava isso para alguns alunos (Vide Diana Moreau) | "O conhecimento não julga, ele observa"; 
Diana Moreau - aluna de Crowley - Parece mais do que interessada nas aulas do professor. Acredita que sou policial (deve ter medo de mim). Pode ser a responsável por fazer Cross ou Lang saberem que estamos no encalço deles;
Evelyn (Eva) Black - biruta - Atualmente internada em um asilo. Existem referências de que ela seria um receptáculo para o ritual de Cross. Talvez Caroline seja outro receptáculo também;', '2025-07-19 01:02:49.163', '2025-07-21 12:46:48.953');
INSERT INTO public."Note" (id, "characterId", note, "createdAt", "updatedAt") VALUES ('4cc47848-ebf3-45eb-aced-96474d4a0c7f', '25c11889-f323-4a99-9ec7-471a290ec789', 'Gonzo gay', '2025-08-09 00:32:30.618', '2025-08-09 00:32:30.618');
INSERT INTO public."Note" (id, "characterId", note, "createdAt", "updatedAt") VALUES ('cba4b820-b616-4703-8ec3-f288cc2b4296', '25c11889-f323-4a99-9ec7-471a290ec789', 'Agenda do imp: sobre a faculdade e seus discípulos. ', '2025-08-09 01:59:56.584', '2025-08-09 01:59:56.584');
INSERT INTO public."Note" (id, "characterId", note, "createdAt", "updatedAt") VALUES ('d4210687-8e9d-48c0-81bd-65fcba60d8f2', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', e'Agenda Crowley
Justificando os próprios atos sem especificar o que está fazendo de fato.
As anotações sempre param no meio do caminho. 
Esboço: 22/12 - marcações mostrando 7 ancoras angelicais. Talvez estejamos abrindo algo que jamais se fechará 
Dia 11 - como discutido, prepare a oferenda. 
Várias passagens de avião, tem e etc . Recibos em nome de Rebecca Lang.
', '2025-08-09 02:14:54.602', '2025-08-09 02:14:54.602');
INSERT INTO public."Note" (id, "characterId", note, "createdAt", "updatedAt") VALUES ('39beec28-e47a-40ac-b1e0-95e06adc10de', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', e'Anotações de Caroline
Graves foi buscar a oferenda.
O despacho deu certo, ele está liberando a oferenda. 
Infelizmente ele confirmou: estará lá.

Em única anotação, vemos outro nome: Vincent Hale.', '2025-08-09 03:03:58.045', '2025-08-09 03:03:58.045');
INSERT INTO public."Note" (id, "characterId", note, "createdAt", "updatedAt") VALUES ('8fca8679-1c4d-4237-8c3c-fac14063c919', '48a82c80-490f-4568-9b53-f9c4dbc991c1', e'Agenda Crowley : justifica seus atos sem se explicar
Há informações sobre o oculto, mas não tem nada finalizado 
Esboço: 21/12 marcação mostrando 7 âncoras angelicais 
Carta: Talvez estejamos abrindo algo que jamais se fechará 
Convite: dia 11: como discutido, prepare a oferenda
Livro: diagramas de rituais
Agenda: passagens de avião e trens para diversos lugares 

Daniel é um mago 
Todas as suas anotações é referente a invocações 

Carolina: havia uma pena de um anjo
Citação de Evelin, Jonathan Cross 
Ela parece ser uma secretária 

Rebeca: recibo de pagamento para Carolina 
O nome Michel Graves aparece três vezes

Nota: ele foi buscar a oferenda 
O despacho deu certo, ele está liberando a oferenda 
Infelizmente  ele confirmou, ele estará lá 

Outra nota: Vicent Hale
', '2025-08-09 02:06:34.884', '2025-08-09 03:43:47.931');
INSERT INTO public."Note" (id, "characterId", note, "createdAt", "updatedAt") VALUES ('06e800c1-acfb-4774-8e6f-c3cf8274975d', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', e'8 alquímica
7 prata', '2025-09-20 02:32:26.987', '2025-09-20 02:32:26.987');
