create table "Ritual"
(
    id            varchar(255)                           not null
        primary key,
    "characterId" varchar(255)                           not null
        references "Character"
            on update cascade on delete cascade,
    name          varchar(255)                           not null,
    "pathsForms"  varchar(255)                           not null,
    description   text                                   not null,
    "bookPage"    varchar(255)                           not null,
    "createdAt"   timestamp(3) default CURRENT_TIMESTAMP not null,
    "updatedAt"   timestamp(3)                           not null
);

alter table "Ritual"
    owner to yeyokp_rpg;

INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('f4e4ed6c-f14e-423c-a46f-bea06f5c451c', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Aumento de Resistência x2', 'Aumento de Atributos - CON (Nível 1)', e'Todos os vampiros desenvolvem com o tempo uma resistência sobrenatural à dor e aos danos causados pelas armas dos mortais. Este poder reflete as lendas sobre os vampiros como caçadores incansáveis. Com o passar dos séculos, um vampiro adquire uma constituição sobrenatural.
Cada ponto de Aumento de Resistência confere ao vampiro um bônus de +3 na Constituição (CON) de um vampiro.', 'Vampiros Mitológicos, pág. 54', '2025-07-10 16:54:57.820', '2025-07-15 22:54:38.357');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('99468b1c-fd5a-49c1-9e87-16603958a974', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Ignição', 'Evocação (eletricidade) - Entender Ar/Luz 1', e'Componentes: G
Tempo de Formulação: 1 ação
Alcance: toque
Alvo: 1 veículo
Duração: instantânea
Teste de Resistência: nenhum / fortitude (CON) anula
Resistência à Magia: não

Este feitiço moderno permite ao mago ligar um carro ou outro tipo de veículo mesmo que não tenha a chave para isso. O ritual faz com que uma corrente elétrica específica passe pela ignição, ligando automaticamente qualquer tipo de motor, independentemente do mago conhecer ou não o funcionamento do veículo. Carros especiais ou preparados têm direito a um teste de fortitude (CON).', 'Grimório - pag. 92', '2025-07-15 18:51:12.847', '2025-07-15 18:51:12.847');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('bef69b46-0bd3-4537-ae55-9841423a9e5b', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Sentir o Semelhante', 'Sentir Criaturas (Nível 1)', e'Com este poder, um vampiro pode saber se a pessoa com quem conversa é um de sua raça. Caso o alvo esteja tentando se disfarçar, um Teste de WILL vs. WILL do vampiro é aplicável.
Sentir o Semelhante funciona até um raio de dez metros, que se amplia em um metro a cada cinco anos de pós-vida.
(Obs.: Sebastian não tem pós-vida, então não sei se a distância se ampliaria no caso dele. Estou comprando este poder mais porque é o único de nível 1 do grupo, e vou precisar do resto, rs.)', 'Vampiros Mitológicos, pág. 62', '2025-07-08 00:11:23.884', '2025-07-11 14:19:13.227');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('36696560-e88c-4377-862d-d7489303d4e7', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Sentir Criatura Sobrenatural', 'Sentir Criaturas (Nível 2)', 'Este poder permite ao vampiro sentir e reconhecer uma criatura sobrenatural em um raio de até 10m. O vampiro precisa estar ciente de sua presença para o poder funcionar (quer dizer, NÃO funciona como alarme). Caso a vítima esteja tentando se esconder de alguma forma mística, um Teste de WILL vs. WILL é necessário.', 'Vampiros Mitológicos, pág. 62', '2025-07-10 13:35:49.752', '2025-07-11 14:19:28.700');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('b0b29ee6-9050-4be4-b613-76085d8089f9', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Perseguição', 'Sentir Criaturas (Nível 3)', 'Um rakshasa ou vrikolaka faz um Teste de PER e guarda o padrão da alma de um vítima. Mais tarde, pode usar este padrão para sentir a presença da criatura que detectou (que possua esse mesmo padrão) em um raio de até 200m. O vampiro pode memorizar INT padrões diferentes.', 'Vampiros Mitológicos, pág. 62', '2025-07-10 13:37:46.381', '2025-07-11 14:19:41.552');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('8a5ae604-2a92-4c90-8066-a1c4a6774f62', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Percepção Sobrenatural x2', 'Aumento de Atributos - PER (Nível 1)', 'Este é o mais básico de todos os poderes vampíricos. Assim que o personagem é transformado, seus sentidos se desenvolvem de uma forma espantosa. A audição, olfato, tato, paladar e visão tornam-se muito mais desenvolvidos do que os mortais. Com o tempo, o vampiro passa a enxergar novas cores, novos padrões de luz, novos sons e cheiros até então desconhecidos. Cada ponto de Percepção Sobrenatural aumenta a Percepção (PER) do vampiro em +3.', 'Vampiros Mitológicos, pág. 54', '2025-07-10 16:59:56.514', '2025-07-15 22:56:32.156');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('298addf3-6d0e-4464-b97a-a4d7fa363fd5', 'c32c1497-7f84-42ba-93a8-9f5271b234fb', 'Cura', 'Fé ', e'Pode utilizar 1 Ponto de Fé para curar 1d6
pontos de dano em si mesmo (até um máximo de um Ponto de Fé por dia), ou 2 Pontos de Fé para curar 1d6 PVs em outra pessoa, através do toque de suas mãos. Esse toque também pode ser feito
.em plantas ou animais.', 'Anjos 63', '2025-07-12 02:01:49.161', '2025-07-12 02:02:49.796');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('8569184e-a3a2-42d7-8b05-563bb285e544', 'c32c1497-7f84-42ba-93a8-9f5271b234fb', 'Criar água benta', 'Fé ', 'Pontos de Fé podem ser usados para criar água benta a partir da água pura do orvalho, à razão de um pequeno frasco para cada ponto gasto', 'Anjos 63', '2025-07-12 02:00:16.420', '2025-07-12 02:03:09.531');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('f74b41f0-2c6d-4512-a09f-0635905cbaf6', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Velocidade x2', 'Aumento de Atributos - AGI (Nível 1)', 'É a famosa velocidade sobre-humana dos vampiros. Este poder aumenta os reflexos naturais de um vampiro a níveis sobre-humanos. Cada ponto gasto em Velocidade equivale a um bônus de +3 para Agilidade (AGI) e +1d6 para Iniciativa, para cada 10 pontos acima do segundo colocado no teste, o vampiro recebe uma ação na rodada.', 'Vampiros Mitológicos, pág. 54', '2025-07-10 13:43:55.175', '2025-07-11 20:46:36.720');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('c8ec1692-9afb-4241-81ee-d9823a74cf02', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Raio da Morte', 'Evocação [luz] - Criar Luz 9', e'Componentes: V, G, M (um diamante)
Tempo de Formulação: 1 ação
Alcance: Om
Area: uma linha de 2m / nivel
Duração: instantânea
Teste de Resistência: fortitude (CON) anula
Resistência à Magia: sim
Este é um dos mais poderosos rituais do Caminho da Luz. Com ele o mago é capaz de disparar dos dedos de sua mão um raio da mais perfeita luz branca, que segue em linha reta até 2m por nível do feiticeiro, atingindo todas as criaturas que estiverem em seu caminho. Cada uma delas pode fazer um teste de fortitude (CON) para se desviar do raio. Caso o raio acerte um dos oponen-tes, ele causa 9d6 pontos de dano.
O raio é capaz de perfurar qualquer tipo de estrutura, deixando um buraco em pedra ou metal de até 10cm de profundidade por nível. O diamante é consumido no ritual', 'Grimório - pag. 135/136', '2025-07-16 02:15:20.146', '2025-07-16 02:15:20.146');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('ba6bc196-d874-45e9-bcfb-9f88240b33d6', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Rádio da Polícia', 'Adivinhação Entender - Ar/Luz 3', e'Componentes: G, F (um rádio de pilha ou walkman)
Tempo de Formulação:
1 ação
Alcance: 10km de raio
Efeitos: ouve o rádio da polícia local
Duração: 1 cena
Teste de Resistência: nenhum
Resistência à Magia: não
Este ritual moderno permite ao feiticeiro sintonizar as faixas de qualquer tipo de rádio amador (incluindo faixas da polícia, bom-beiros, aviões e outras) mesmo que esteja utilizando um simples walkman ou rádio de pilha.', 'Grimório - pag. 135', '2025-07-16 02:11:57.268', '2025-07-16 02:11:57.268');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('9a621112-8e7a-40bb-8abd-ae5b43e20c73', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Raio', 'Evocação [eletricidade] - Criar Ar/Luz 4', e'Componentes: V, G, M (um ramo de arruda)
Tempo de Formulação: 1 ação
Alcance: 20m
Alvo: 1 criatura
Duração: instantânea
Teste de Resistência: fortitude (CON) reduz à metade
Resistência à Magia:
sim
Este ritual cria um raio elétrico das mãos do feiticeiro até um alvo escolhido, a até 20m de distância. O raio causa dano pelo nível do mago (níveis até 8° = 4d6; níveis 9°-10° = 5d6; níveis 11°-12° = 6d6; níveis 13"+=7d6), mas um teste de fortitude (CON) da vítima para reduzir o dano pela metade é permitido. Não fun-ciona contra Alvos que não estejam tocando o solo', 'Grimório - pag. 135', '2025-07-16 02:12:57.472', '2025-07-16 02:12:57.472');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('ae67abe0-878e-4f77-bc13-2e1696397635', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Aura de Silêncio', 'Ilusão (Sensação) - Entender Ar 3', e'Componentes: G, F/FD (um pequeno sino de prata)
Tempo de Formulação: 1 ação
Alcance: 30m
Área: ver descrição
Duração: 3d6 rodadas
Teste de Resistência: vontade (WILL) anula
Resistência à Magia: sim

Utilizando-se de um pequeno sino de prata, o mago pode roubar o som de uma área ao redor de um alvo, impossibilitando qualquer ritual que envolva versos ou frases de ativação ou encobrindo as ações barulhentas do mago. Caso este ritual seja realizado em uma pessoa, ela pode fazer um teste de vontade (WILL) para evitar o ritual, mas a aura de silêncio permanecerá no local onde estava. A área de efeito ao redor do ponto escolhido varia com o nível (níveis até 5º = 1m; níveis 6º–7º = 2m; níveis 8º–9º = 4m; níveis 10º+ = 8m).

', 'Grimório - pag. 33', '2025-07-14 18:34:55.574', '2025-07-14 18:49:29.621');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('9aef5737-03f9-4f9a-b8bd-7fdb422ee2cd', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Asfixia', 'Transmutação - Controlar Ar 3', e'Componentes: V, G, M (um pequeno frasco de vidro, que é quebrado durante o ritual)
Tempo de Formulação: 1 ação
Alcance: 20m
Alvo: uma criatura
Duração: uma rodada / nível
Teste de Resistência: fortitude (CON) anula
Resistência à Magia: sim

Lançada contra uma criatura, esta magia exige um teste de fortitude (CON) por rodada; se falhar, a vítima não consegue respirar e recebe 1d3 pontos de dano por asfixia. Esta magia não tem efeito contra mortos-vivos, golens, criaturas mágicas e — obviamente — quaisquer outras criaturas que não precisem respirar.', 'Grimório - pag 32', '2025-07-14 18:29:13.243', '2025-07-14 18:32:56.517');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('2201de9b-98b8-4e5b-90c1-46853c455162', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Barreira da Proteção Distante', 'Abjuração - Criar/Controlar Ar 4', e'Componentes: V, G, M (uma ponta de flecha, que deve ser molhada no sangue do mago)
Tempo de Formulação: 1 ação
Alcance: o próprio mago
Efeitos: protege o mago contra mísseis não mágicos
Duração: 1 cena (D)
Teste de Resistência: nenhum
Resistência à Magia: não

Este feitiço foi o responsável pelas lendas a respeito dos exércitos turcos possuírem guerreiros impossíveis de serem acertados pelas flechas dos defensores de um castelo.

Enquanto estiver sob os efeitos deste ritual, o mago fica com uma “sorte” incrível, capaz de automaticamente desviar qualquer objeto não mágico atirado em sua direção (flechas, pedras, dardos, árvores) não importando a quantidade desses.', 'Grimório - pag. 35', '2025-07-14 18:36:27.207', '2025-07-14 18:36:27.207');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('3ffccd6a-2c7a-416d-871e-088e4e1b488d', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Barreira Invisível de Espíritos', 'Transmutação - Controlar Ar 3', e'Componentes: V, G
Tempo de Formulação: 1 rodada
Alcance: 5m
Área: um raio de 3m
Duração: 4d6 rodadas (D)
Teste de Resistência: nenhum
Resistência à Magia: sim

Apesar do nome, este ritual faz com que o ar próximo ao mago “endureça”, formando uma espécie de teia de ar sólido e invisível, capaz de segurar portas, deter atacantes, segurar objetos arremessados e outros efeitos. Ao contrário do Campo de Força, a teia formada por este ritual não é completamente fechada, permitindo a passagem de gases, líquidos ou chamas. Também não precisa ser totalmente rígida, podendo servir para amortecer quedas sem ferir as pessoas.

A teia invisível possui Força (FR) variável com o nível do mago (nível 3 = 3d6; níveis 4º–6º = 4d6; níveis 7º–9º = 5d6; níveis 10+ = 6d6).', 'Grimório - 36', '2025-07-14 18:37:41.627', '2025-07-14 18:37:41.627');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('551980c8-e4a2-4c7d-86e3-bea9a7636540', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Brisa do Deserto', 'Evocação [fogo] - Criar/Controlar Ar 6', e'Componentes: G, M (uma brisa do deserto em uma garrafa)
Tempo de Formulação: 1 rodada
Alcance: 20m
Área: 20m x 20m
Duração: instantânea
Teste de Resistência: fortitude (CON) reduz à metade
Resistência à Magia: sim

Quando realizar este ritual, o mago solta a brisa do deserto sobre uma área de até 20x20m. Os vapores quentes do ritual desidratarão as vítimas que estejam na área de efeito, causando 4d10 pontos de dano em qualquer alvo (dano por calor). As vítimas podem fazer um teste de fortitude (CON vs. WILL do mago), para receber metade do dano.

Este é um ritual muito poderoso, mas igualmente complicado, pois o mago necessita conhecer as maneiras de se capturar uma brisa do deserto. Alguns sábios dizem que certos desertos são mais potentes que outros, aumentando a eficácia deste ritual.', 'Grimório - pag. 41', '2025-07-14 18:40:16.064', '2025-07-14 18:40:16.064');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('2cc1cb6e-957b-4da9-835a-699e500079c5', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Pulso', 'Transmutação - Controlar Ar4', e'Componentes: V, G, M (uma pena de coruja)
Tempo de Formulação: 1 ação
Alcance: Om
Área: 16m de raio
Duração: instantânea
Teste de Resistência: fortitude (CON) anula
Resistência à Magia: sim
Este ritual permite ao mago projetar uma onda de choque centrado nele, a partir de seu braço, e capaz de empurrar todos os objetos que estiverem ao seu redor. A For (FR) deste ritual a até 2m de distância é de 8d6, diminuindo em 1d6 para cada 2m de distância.
Quem estiver dentro da área de efeito deve fazer um teste de fortitude (CON vs. FR do ritual) para não ser arremessado para trás 2d6 metros e sofrer 1dó pontos de dano.', 'Grimório - pag. 134', '2025-07-16 02:09:51.687', '2025-07-16 02:09:51.687');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('f03a5ff1-cb18-4899-950c-a52e04fa23b9', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Raios Elétricos', 'Evocação leletricidade] - Criar Ar/Luz 4', e'Componentes: V, G, M (um ramo de arruda), F (um anteparo
de metal)
Tempo de Formulação: 1 ação
Alcance: 30m
Alvo: Im de raio
Duração: instantânea
Teste de Resistência: fortitude (CON) anula
Resistência à Magia: sim
Este ritual cria raios das mãos do feiticeiro que se propagam por uma sala, acertando a todas as pessoas que estiverem entre o mago e algum anteparo de metal.
O raio causa dano de acordo com o nível do mago (níveis até 8" =4d6; níveis 9-10"=5d6; níveis 11-12 6d6; niveis 13"+ = 7d6), mas um teste de fortitude (CON) em cada vítima para redu-zir o dano pela metade é permitido.
Não funciona contra alvos que não estejam tocando o solo.', 'Grimório - pag. 136', '2025-07-16 02:16:17.949', '2025-07-16 02:16:17.949');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('81a73db9-d4ec-4b84-ac53-2ded3be55dbf', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Campo de Força', 'Abjuração - Controlar Ar 4', e'Componentes: V, G, M (pó de giz)
Tempo de Formulação: 1 ação
Alcance: centrado no mago
Área: ver descrição
Duração: 1 cena
Teste de Resistência: nenhum
Resistência à Magia: não

Este ritual faz com que o ar ao redor do mago “endureça”, formando uma espécie de campo de força sólido e invisível, capaz de deter atacantes, segurar objetos arremessados, gases, flechas, magias e outros efeitos. O campo de força é completamente fechado, não permitindo a passagem de gases (o ritual cria oxigênio dentro do campo), líquidos ou chamas. Uma vez criado, o campo permanece imóvel.

O campo de força possui 5d6 PVs e BA +6 (IP 5). Conforme vai recebendo dano, a barreira vai rachando e trincando, até explodir sem causar dano quando receber o último ponto de dano (mas não antes disso).

O raio de efeito do campo de força depende do nível: 4m de raio + 1m / nível acima do 6º, até um máximo de 10m de raio (um mago do 8º nível cria um campo com até 6m de raio).

', 'Grimório - pag. 44', '2025-07-14 18:42:04.735', '2025-07-14 18:42:04.735');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('be2d9b1b-332d-41b4-926d-e7db9e18fc3c', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Armadura Elétrica', 'Evocação (eletricidade) - Controlar Ar/Luz 3', e'Componentes: V, G, M (uma moeda de prata)
Tempo de Formulação: 1 rodada
Alcance: o próprio mago
Efeitos: uma armadura que revida o dano
Duração: 1 cena (D)
Teste de Resistência: não e fortitude reduz (CON) à metade
Resistência à Magia: sim

Esta magia reproduz exatamente o efeito de eletricidade. Graças a ela o mago pode criar a poucos centímetros de sua pele uma carga elétrica capaz de causar dano igual à 2d6 pontos de vida. A vítima pode fazer um teste de fortitude (CON) para reduzir o dano à metade. A carga elétrica atinge quaisquer criaturas que estejam à distância de combate corporal (mesmo que não estejam tocando diretamente o mago). Estas qualidades tornam a Armadura Elétrica ótima para se proteger contra um grande número de atacantes.
Daemon: o mago pode armazenar 3 pontos de magia para manter esse efeito por quanto tempo desejar.', 'Grimório - pag. 29', '2025-07-14 18:27:39.257', '2025-07-14 18:44:32.135');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('34da55bb-07d1-456f-8f0e-dc25e62e203e', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Chuva de Prata ', 'Evocação (energia) - Criar/Controlar Luz 3', e'Componentes: G
Tempo de Formulação: 1 ação
Alcance: 20m
Área: diversos alvos em uma área de 5m x 5m
Duração: instantânea
Teste de Resistência: nenhum
Resistência à Magia: sim 
A partir dos dedos do mago, uma chuva de faíscas prateadas é disparada contra uma área escolhida.
No 3º nível, as faíscas de luz causam 3d6 pontos de dano, em dezenas de ataques de 1 ponto cada; no 7º nível elas causam 5d6 pontos de danos em faíscas de 2 pontos cada (arrendonde pra cima) e no 11º nível causam 7d6 pontos de dano em faíscas de 3 pontos cada (arrendonde pra cima). Este ritual não funciona direito contra alvos com redução de dano (IP) alto, mas as faíscas podem atacar várias pessoas ou objetos dentro de uma área de 5x5m, dividindo o dano como o mago desejar.
', 'Grimório – pag. 50', '2025-07-15 02:12:11.344', '2025-07-15 02:12:11.344');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('a544ad54-920b-4469-9eff-41c023bd05f8', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Clarão Supernova', 'Evocação (luz) (energia) - Criar Luz 8', e'Componentes: V,G,M (um diamante)
Tempo de Formulação: 1 rodada
Alcance: 0m
Área: 50m de raio
Duração: instantânea
Teste de Resistência: vontade (WILL) anula / fortitude (CON) reduz à metade
Resistência à Magia: sim
Considerada uma das mais sensacionais magias do Caminho da Luz, o Clarão Supernova é ativado pelo feiticeiro quando este segura um diamante e recita as palavras mágicas. Em uma rodada o diamante é sobrecarregado de energia e explode, liberando um brilho tão intenso e poderoso que todos em um raio de 50m precisam fazer um teste de fortitude (CON) ou ficarão cegos por 3d6 rodadas.
Além disso, qualquer morto-vivo, criatura vulnerável à luz ou rituais / criaturas basadas nas trevas recebem 8d6+8 pontos de dano, mas podem fazer um teste de fortitude (CON) para reduzir o dano à metade. O brilho da supernova é tão forte que as sombras das pessoas e objetos ficam marcada nas paredes por uma hora. 
', 'Grimório – pag. 52', '2025-07-15 02:12:39.799', '2025-07-15 02:12:39.799');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('bb2bd246-fc4a-48ff-92c5-3cf1c1488b4e', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Dardos Místicos de Astorath', 'Evocação (energia) - Criar Luz 3', e'Componentes: V,G,M (uma pena de pavão)
Tempo de Formulação: 1 ação
Alcance: 20m
Duração: instantânea
Teste de Resistência: nenhum
Resistência à Magia: não
Este ritual cria, das mãos do mago, setas de luz que disparam de qualquer alvo que o mago indique. Os dardos causam ao alvo 1d6 pontos de dano por dardo e o ritual consegue conjurar 1 dardo para cada 3 níveis que o feiticeiro possua (1 no 1º nível, 2 no 4º nível, 3 no 7º nível e assim por diante...)
O dano causado pelos dardos místicos não é afetado pelo IP do alvo, a menos que ele seja capaz de proteger a vítima de efeitos de Luz. O mago pode indicar alvos diferentes para cada dardo, desde que todos estejam a menos de 1m de distância entre si.
', 'Grimório – pag. 68', '2025-07-15 02:13:04.504', '2025-07-15 02:13:04.504');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('8869ed4a-89f1-45fa-ac90-19fcd3bb8765', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Desmembrar a Carroça sem Cavalos', 'Transmutação - Controlar Ar 2', e'Componentes: V, G, F (a unha do dedo mínimo precisa ter 1cm de comprimento)
Tempo de Formulação: 1 ação
Alcance: 20m
Alvo: os pneus de um carro
Duração: instantânea
Teste de Resistência:  nenhum
Resistência a Magia: não
Neste ritual moderno, o bruxo passa a unha do dedo mínimo da mão direita sobre o pulso da mão esquerda, em um movimento de corte. Para cada 2 níveis, um pneu escolhido pelo gado estoura imediatamente.
 É muito usado por magos com rituais mais modernos para evitar perseguidores.
', 'Grimório – pag. 70', '2025-07-15 02:13:37.851', '2025-07-15 02:13:37.851');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('0f1761d5-89d9-42ba-a248-f6ca156651ea', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Esmola', 'Evocação (eletricidade) - Criar Ar/Luz 2', e'Componentes: V, G, M (uma moeda)
Tempo de Formulação: 1 ação
Alcance: 5m
Alvo: 1 pessoa
Duração: instantânea
Teste de Resistência: fortitude (CON) reduza à metade / nenhum
Resistência à Magia: não
Este ritual irônico foi criado por magos para ser usado contra mendigos, mas provou-se extremamente útil em situações de combate. O Mago segura uma moeda qualquer e arremessa sobre sua vítima. Quando a moeda tocar no corpo da vítima, ela descarrega uma carga elétrica no alvo. O dano varia com a moeda arremessada (2d6 para cobre, 2d6+1 para prata e 2d6+2 para ouro). A vítima pode fazer um teste de fortitude (CON) para reduzir o dano à metade. Caso a vítima agarre a moeda (como um mendigo ou um ladrão), considere um acerto automático e ele não tem direito a Teste de Resistência.
', 'Grimório – pag. 77  ', '2025-07-15 02:14:07.303', '2025-07-15 02:14:07.303');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('0c48fbe0-e9e9-4b9d-a077-67ea93e1c092', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Flick', 'Evocação (luz) - Criar/Controlar Luz 1', e'Componente: G
Tempo de Formulação: 1 ação
Alcance: 30m
Área: 5m de raio
Duração: 1 cena
Teste de Resistência: nenhum
Resistência à Magia: não
É um dos rituais mais simples do Caminho da Luz. O mago estala os dedos alguma vezes e aparecem dezenas de pequenos pontos de luz, que ele pode comandar mentalmente. Pode ser usado para iluminas trajetos à noite, envolver objetos ou como sinalização. Os magos mais experiente consideram este ritual apenas como um exercício dos poderes místicos da luz.
', 'Grimório - pag. 85', '2025-07-15 02:28:21.852', '2025-07-15 02:28:21.852');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('9208b706-c912-4698-9ae5-94f2515486e7', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Ilusão I', 'Ilusão (Padrão) [ação mental] - Criar/Controlar Luz 3', e'Componentes: V, G, M (pó de giz multicolorido)
Tempo de Formulação: 1 ação
Alcance: 20m
Efeitos: cria uma ilusão
Duração: 1 cena (D)
Teste de Resistência: vontade (PER) desacredita
Resistência à Magia: sim

Estes são alguns dos rituais mais antigos e conhecidos, desenvolvidos pelos magos romanos chamados de Ilusores (ou Ilusionistas). Com este ritual, o mago consegue “esculpir” um objeto com luzes e cores a partir do nada, utilizando apenas sua memória, a tinta e o tal giz obtido ilusório. Qualquer objeto pode ser criado, respeitando os limites de tamanho de um homem.

Caso o mago não tem algum (a menos que o mago possua conhecimentos no Caminho do Ar) e crie a ilusão perfeitamente: quanto o conhecimento mago sobre o objeto que ele está criando (alguém que nunca viu um elefante será incapaz de criar uma ilusão crível de um elefante). Se um mago viu um objeto apenas e não sabe exatamente como ele é, a imagem poderá ser distorcida, errada, defectuosa, borrada ou mesmo muito diferente do original, sendo assim facilmente percebida.

Em combate, uma ilusão utiliza os valores de combate (ou poder de combate) do mago e pode ser um inimigo (desde que a imagem criada seja realmente uma ilusão). Se alguém desconfiar de que está enfrentando uma ilusão, deve realizar um teste de vontade para tentar desacreditar (PER vs. VON) e então desfazer o efeito da ilusão. Uma vez que o indivíduo tenha passado no teste, não será enganado por a ilusão como uma forma translúcida, semelhante a um fantasma.

Uma vez que o comando (e mesmo danos ilusórios estão limitados pelo Focus da magia) é considerado ilusório e caso a vítima perceba, apenas desmaiará por 1d6 horas. Todos os danos de ilusões são mentais com 3d6 rodadas, independentemente da magia.

Ilusões mais poderosas estão restritas ao mago, permitindo que o conhecedor faça qualquer ação que exija mais do que andar lentamente.', 'Grimório - pag. 92', '2025-07-15 18:52:10.634', '2025-07-15 18:52:10.634');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('adeed444-cfbc-48f4-b616-9fd0d2e544fe', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Ilusão II', 'Ilusão (Padrão) [ação mental] - Criar/Controlar Luz 4', e'Componentes: V, G, M (pó de giz multicolorido)
Tempo de Formulação: 1 ação
Alcance: 20m
Efeitos: cria uma ilusão
Duração: 1 cena (D)
Teste de Resistência: vontade (PER) desacredita
Resistência à Magia: sim
Funciona exatamente como Ilusão I, mas o tamanho da ilusão pode ser o de uma vaca ou de um carro.

', 'Grimório - pag. 93', '2025-07-15 18:53:24.121', '2025-07-15 18:53:24.121');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('8adc2c5f-d8d8-4aa0-95aa-82cc546705e5', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Ilusão III', 'Ilusão (Padrão) [ação mental] - Criar/Controlar Luz 5', e'Componentes: V, G, M (pó de giz multicolorido)
Tempo de Formulação: 1 ação
Alcance: 60m
Efeitos: cria uma ilusão
Duração: 1 cena (D)
Teste de Resistência: vontade (PER) desacredita
Resistência à Magia: sim
Funciona exatamente como Ilusão I, mas o tamanho pode ser o de uma pequena casa.', 'Grimório - pag. 93', '2025-07-15 18:54:04.781', '2025-07-15 18:54:04.781');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('e943383d-55e9-4396-848e-616de35dc3aa', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Ilusão IV', 'Ilusão (Padrão) [ação mental] - Criar/Controlar Luz 3', e'Componentes: V, G, M (pó de giz multicolorido)
Tempo de Formulação: 1 ação
Alcance: 60m
Efeitos: cria uma ilusão
Duração: 1 cena (D)
Teste de Resistência: vontade (PER) desacredita
Resistência à Magia: sim
Funciona exatamente como Ilusão I, mas o tamanho pode ser o de uma casa grande com dois andares.', 'Grimório - pag. 93', '2025-07-15 18:55:06.359', '2025-07-15 18:55:06.359');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('033f7b1a-edc1-465d-bd23-7c2d05940b3c', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Ilusão V', 'Ilusão (Padrão) [ação mental] - Criar/Controlar Luz 7', e'Componentes: V, G, M (pó de giz multicolorido)
Tempo de Formulação: 1 ação
Alcance: 20m
Efeitos: cria uma ilusão
Duração: 1 cena (D)
Teste de Resistência: vontade (PER) desacredita
Resistência à Magia: sim
Funciona exatamente como Ilusão I, mas o tamanho pode ser o de uma fortaleza ou castelo.

', 'Grimório - pag. 93', '2025-07-15 18:55:42.711', '2025-07-15 18:55:42.711');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('9abd368f-2e4d-477e-9e18-53bdefff7a0f', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Ilusão Avançada I', 'Ilusão (Padrão) [ação mental] - Criar/Controlar Luz/Ar 4', e'Componentes: V, G, M (pó de giz multicolorido)
Tempo de Formulação: 1 ação
Alcance: 20m
Efeitos: cria uma ilusão
Duração: 1 cena (D)
Teste de Resistência: vontade (PER) desacredita
Resistência à Magia: sim
Esta é a variação mais elaborada das ilusões, que inclui som. Funciona exatamente como Ilusão I, mas a ilusão criada emite sons que podem confundir ainda mais seus oponentes.
Os sons também são gerados pelo mago e funcionam da mesma forma que ruídos de objetos inanimados ou barulhos simples (como um sino, estalo de luz ou um rugido). É difícil reproduzir improvisação, utilizando sons que julgar serem parecidos, mas por sorte ou acaso, podem enganar seus inimigos.
Esta magia pode também ser usada em um teste de atuação ou enganação com um bônus igual a um índice de dificuldade de 3. O mestre pode decidir que um som está fora do lugar, se estiver muito mal feito.
Em combate, a ilusão avançada permite a criação de imagens com som e movimento, semelhante a um filme ilusório.
Assim como nas ilusões simples, todas as vítimas devem realizar testes de vontade para desacreditar a ilusão.
“Mortos”, alvos da ilusão avançada sofrem 1d6 horas de desmaio mental. Esse dano mental também pode ser aplicado em cenas normais, como em 3d6 rodadas, lidando com fantasmas ou aparições visuais assustadoras e mentais.
Ilusões avançadas não necessitam de toque absoluto no chão, permitindo que o conhecedor faça qualquer ação que exija mais do que se andar lentamente.', 'Grimório - pag. 93', '2025-07-15 18:56:27.776', '2025-07-15 18:56:27.776');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('30c69789-0fa9-4aee-9d6e-4922a129bab0', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Ilusão Avançada II', 'Ilusão (Padrão) [ação mental] - Criar/Controlar Luz/Ar 5', e'Componentes: V, G, M (pó de giz multicolorido)
Tempo de Formulação: 1 ação
Alcance: 60m
Efeitos: cria uma ilusão
Duração: 1 cena (D)
Teste de Resistência: vontade (PER) desacredita
Resistência à Magia: sim
Funciona exatamente como Ilusão Avançada I, mas o tamanho da ilusão pode ser o de uma vaca ou de um carro.

', 'Grimório - pag. 93', '2025-07-15 18:57:14.049', '2025-07-15 18:57:14.049');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('be683216-af2d-416d-ac0c-8da6a7a368aa', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Ilusão Avançada III', 'Ilusão (Padrão) [ação mental] - Criar/Controlar Luz/Ar 6', e'Componentes: V, G, M (pó de giz multicolorido)
Tempo de Formulação: 1 ação
Alcance: 60m
Efeitos: cria uma ilusão
Duração: 1 cena (D)
Teste de Resistência: vontade (PER) desacredita
Resistência à Magia: sim
Funciona exatamente como Ilusão Avançada I, mas o tamanho da ilusão pode ser o de uma pequena casa.

', 'Grimório - pag. 94', '2025-07-15 18:58:34.341', '2025-07-15 18:58:34.341');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('391717c5-064d-4895-9505-cd6aa53b4de6', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Ilusão Avançada IV', 'Ilusão (Padrão) [ação mental] - Criar/Controlar Luz/Ar 7', e'Componentes: V, G, M (pó de giz multicolorido)
Tempo de Formulação: 1 ação
Alcance: 80m
Efeitos: cria uma ilusão
Duração: 1 cena (D)
Teste de Resistência: vontade (PER) desacredita
Resistência à Magia: sim
Funciona exatamente como Ilusão Avançada I, mas o tamanho da ilusão pode ser o de uma casa grande, com dois andares.', 'Grimório - pag. 94', '2025-07-15 18:59:07.397', '2025-07-15 18:59:07.397');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('6079af92-4c7b-48eb-be34-b1dd14574618', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Ilusão Avançada V', 'Ilusão (Padrão) [ação mental] - Criar/Controlar Luz/Ar 8', e'Componentes: V, G, M (pó de giz multicolorido)
Tempo de Formulação: 1 ação
Alcance: 80m
Efeitos: cria uma ilusão
Duração: 1 cena (D)
Teste de Resistência: vontade (PER) desacredita
Resistência à Magia: sim
Funciona exatamente como Ilusão Avançada I, mas o tamanho da ilusão pode ser o de uma fortaleza ou um castelo.

', 'Grimório - pag. 94', '2025-07-15 18:59:44.073', '2025-07-15 18:59:44.073');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('79d80772-d9d0-434d-a12b-99cd63b6dc7d', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Invisibilidade', 'Transmutação - Controlar Luz 4', e'Componentes: V, G, M (talco)
Tempo de Formulação: 1 rodada
Alcance: 1 criatura
Efeitos: torna a pessoa invisível
Duração: 10 minutos / nível (D)
Teste de Resistência: nenhum
Resistência à Magia: não

É um dos rituais mais desejados pelos magos, pois não se trata de uma ilusão. O feiticeiro salpica talco sobre sua pele e roupas e desaparece em pleno ar. O mago é capaz de manter-se invisível no máximo por algumas horas, podendo prolongar esse período com gasto de energia extra, mas se for atacado (sofrer um ponto de dano) ou se realizar alguma ação mais complexa ou esforço físico (incluindo atacar), a ilusão é quebrada e o mago aparece.
Esta magia é baseada na distorção da luz ao redor do mago, tornando-o invisível. Por essa razão, água, chuva, poeira, tintas ou outras formas de detecção primitivas funcionam como maneiras eficazes de encontrar uma criatura sob este efeito.', 'Grimório - pag. 97', '2025-07-15 19:01:48.138', '2025-07-15 19:01:48.138');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('4acd4531-9b05-4b88-aa9c-4f37160d2937', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Invisibilidade Avançada', 'Transmutação - Controlar Luz 5', e'Componentes: V, G, M (pó de prata)
Tempo de Formulação: 1 rodada
Alcance: toque
Alvo: 1 pessoa
Duração: 1 rodada / nível (D)
Teste de Resistência: nenhum
Resistência à Magia: não

Funciona basicamente da mesma forma que o ritual de Invisibilidade, com a diferença que o mago pode sofrer danos, conjurar magias, atacar ou realizar ações complexas e continuar invisível pela duração do ritual!
O que torna o feiticeiro invisível é a distorção da luz ao seu redor, portanto elementos como água, chuva, poeira, tintas e outras formas de detecção simples funcionam muito bem para achar um mago que esteja usando esse ritual.', 'Grimório - pag. 97', '2025-07-15 19:02:36.586', '2025-07-15 19:02:36.586');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('34930278-dc85-4505-8b5c-2ac55bceea7a', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Leitura de Lábios', 'Adivinhação [dependente do idioma] - Entender Ar/Luz 1', e'Componentes: G
Tempo de Formulação: 1 ação
Alcance: 30m
Alvo: 1 pessoa que esteja falando
Duração: Concentração
Teste de Resistência: nenhum
Resistência à Magia: não

Esta é uma magia muito simples, mas que pode ser preciosa. Ela permite ouvir perfeitamente as palavras de qualquer criatura que esteja em seu campo de visão. Além de sua utilidade óbvia em espionagem, Leitura de Lábios será bem útil para o mago que deseja conhecer as magias de seus inimigos — pois permite ouvir com perfeição as palavras mágicas que eles murmuram.

Leitura de Lábios pode ser combinada com Sentidos Especiais (seja a magia ou o Aprimoramento do mesmo nome) para enxergar ainda mais longe, desde que o alvo esteja dentro do alcance padrão.

', 'Grimório - pag. 102', '2025-07-15 19:04:18.362', '2025-07-15 19:04:18.362');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('24fbb007-c445-4268-be26-32d323337222', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Levitação', 'Transmutação - Controlar Ar 2', e'Componentes: V, G, M (uma pena de pombo)
Tempo de Formulação: 1 Ação
Alcance: Toque
Alvo: uma criatura ou objeto
Duração: uma cena
Teste de Resistência: fortitude (CON) anula
Resistência à Magia: sim

Com a força dos mantras, o feiticeiro é capaz de levitar objetos ou pessoas através da concentração. O peso do objeto levitado depende do nível do mago (máximo de 25kg por nível).
Uma vez levitado, o mago pode deslocar o objeto com velocidade semelhante ao caminhar, em qualquer direção que deseje (inclusive para cima e para baixo).', 'Grimório - pag. 103/104', '2025-07-15 19:06:27.302', '2025-07-15 19:06:27.302');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('6082fda1-9a27-4dcc-b044-e1cd3ee42be3', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Mágica Silenciosa de Talude', 'Transmutação [sônico] - Controlar Ar 4', e'Componentes: V, G, F/FD (um pequeno sino)
Tempo de Formulação: 1 rodada
Alcance: 30m
Área: 1m de raio por nível
Duração: 1 cena
Teste de Resistência: reflexos (AGI) anula
Resistência à Magia: sim

Este ritual cria um campo circular de raio 1m por nível do mago ao redor do alvo escolhido, onde nenhum tipo de som pode ser proferido ou escutado.

Nenhum ritual que necessite de versos de ativação pode ser executado dentro dessa região. Por outro lado, ataques sonoros ou parecidos não podem ser executados nessa área de efeito.

O alvo da magia pode ser uma criatura. Nesse caso, ela faz um teste de reflexos (AGI) para ver se conseguiu escapar do efeito. Se conseguiu, o centro do ritual permanece o ponto de onde ela estava originalmente. Se não conseguiu, o centro da magia será a própria criatura e se moverá junto com ela pela duração do ritual.

', 'Grimório - pag. 108', '2025-07-15 19:10:17.524', '2025-07-15 19:10:17.524');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('5c7e97df-9493-400f-8c6b-c023a1471423', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Microondas', 'Evocação [energia] [eletricidade] - Criar/Controlar Luz 2', e'Componentes: V, G, F (um rubi)
Tempo de Formulação: 1 ação
Alcance: 30m
Alvo: 1 criatura ou 1 objeto metálico
Duração: instantânea
Teste de Resistência: fortitude (CON) anula
Resistência à Magia: sim

Este ritual moderno causa dano por queimadura interna, cozinhando o alvo “de dentro para fora”. A vítima parece inteira, mas está totalmente queimada internamente. Cada versão desse ritual causa um dano proporcional ao nível do mago (níveis até 4º = 2d6; níveis 5º-6º = 3d6; níveis 7º-8º = 4d6; níveis 9º-10º = 5d6 e níveis 11º+ = 6d6). A vítima pode fazer um teste de fortitude (CON) para reduzir o dano à metade.

Se o alvo estiver utilizando armadura metálica ou carregando muitos objetos de metal, eles desprenderão faíscas e pequenos raios elétricos que atingirã todos os objetos que estiverem a até 1m de raio da vítima, causando adicionais 2d6 pontos de dano por eletricidade a cada um deles.', 'Grimório - pag. 115', '2025-07-15 19:15:57.519', '2025-07-15 19:15:57.519');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('be83d379-a90a-465f-9f12-49650b07ef1f', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Mover Objetos', 'Transmutação - Controlar Ar 2', e'Componentes: V, G
Tempo de Formulação: 1 ação
Alcance: 30m
Alvo: 1 objeto
Duração: instantânea / 1 cena
Teste de Resistência: nenhum
Resistência à Magia: não

Como o próprio nome deste ritual já especifica, é o efeito místico de levantar, mover ou empurrar objetos através da força mística. Com este ritual, que envolve apenas gestos, o mago pode abrir ou fechar portas, levitar livros, mover objetos pequenos, apagar velas e muitos outros efeitos.

Mover Objetos pode ser realizado de forma brusca (níveis até 3º = Força 2d6; níveis 4º-5º = Força 3d6; níveis 6º-7º = Força 4d6; níveis 8º-9º = Força 5d6 e níveis 10º+ = Força 6d6) ou com extrema precisão de movimentos (níveis até 5º = Força 1d6; níveis 6º-9º = Força 2d6 e níveis 10º+ = Força 3d6); por essa razão, para um leigo, este ritual se assemelha à levitação ou mesmo à telecinesia.', 'Grimório - pag. 117', '2025-07-15 19:17:22.681', '2025-07-15 19:17:22.681');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('48064a75-17b1-4c1a-8483-77c32cc60d3e', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Salto', 'Voar (Nível 1)', e'Com este poder, o vampiro pode saltar até 3m de altura ou até 10m para frente, com pouco ou nenhum impulso. É o suficiente para saltar sobre uma pessoa ou combinação com efeitos acrobáticos diversos.
', 'Vampiros Mitológicos, pág. 65', '2025-07-15 23:08:24.788', '2025-07-15 23:08:24.788');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('a21bea03-870e-457b-a7dc-b1117df85378', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Roubar a Voz', 'Transmutação - Controlar Ar 4', e'Componentes: G, M (um pequeno frasco de vidro, uma fita de veludo vermelho)
Tempo de Formulação: 1 ação
Alcance: Im
Alvo: 1 pessoa
Duração: 1 ano e 1 dia
Teste de Resistência: nenhum
Resistência à Magia: não
Uma versão mais bondosa do antigo ritual celta de roubar o fôlego. Este feitiço necessita de uma pequena garrafa de vidro, que deve ser amarrada com uma fita de veludo vermelho ao mesmo tempo em que o mago captura as últimas palavras da vítima, que ficam armazenadas na garrafa por até um ano e um dia.
Quando fita é desamarrada, a frase proferida pelo alvo é liberta-da, podendo ser ouvida por todos dentro do raio de 5m da garrafa, em alto e bom som.
Para todos os efeitos, a frase funciona como se a própria pessoa que teve a voz roubada a tivesse dito (inclusive para acionar ritu-ais, objetos mágicos ou encantamentos) podendo ser facilmente reconhecida como sendo da pessoa. Em alguns casos pode até mesmo ser usada como prova de um crime.', 'Grimório - pag. 143', '2025-07-16 02:19:39.970', '2025-07-16 02:19:39.970');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('b9d0ca3c-4fb7-4d41-a5c5-55a3e128d929', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Roubar o Fôlego', 'Necromancia - Controlar Ar 3', e'Componentes: V, G, M (um pedaço de veludo roxo)
Tempo de Formulação: 1 ação
Alcance: 30m
Alvo: 1 criatura que respire
Duração: instantânea
Teste de Resistência: fortitude (CON) reduz à metade
Resistência à Magia: sim
A bruxa utiliza um pedaço de veludo roxo e, respirando sobre ele, pode roubar o ar dos pulmões da vítima, causando-lhe 3d6 pontos de dano +1d6 a cada 5 níveis (máximo de 6d6). A vítima pode fazer um teste de fortitude (CON) para reduzir o dano à metade.
A bruxa não deve realizar este ritual em uma mesma pessoa duas vezes na mesma fase da lua, sob perigo de irritar as três deusas e atrair problemas para si.
Este ritual não funciona em criaturas que não precisem respirar ou que não respirem ar.', 'Grimório - pag. 144', '2025-07-16 02:20:56.724', '2025-07-16 02:20:56.724');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('f4db578f-38cc-47d0-8081-49b89560e951', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Teia de Luz', 'Abjuração - Criar/Entender Luz 1', e'Componentes: V, G
Tempo de Formulação: 1 ação
Alcance: toque
Área: 20m x 20m
Duração: 1 hora / nível
Teste de Resistência: nenhum
Resistência à Magia: não
Este ritual simples faz com que o mago crie uma teia invisível de luz (a teia pode ser vista usando-se fumaça e possui uma das sete cores do arco-íris, à escolha do mago) que pode ser usada para cobrir determinada área (até um máximo de 20m x 20m). A teia é formada de um fio continuo por nível do mago e esses fios podem ser dispostos na direção que o mago desejar, até um má ximo de 30m de comprimento.
Qualquer pessoa que atravesse algum desses fios faz com que um alarme seja disparado, alertando o mago de que sua teia foi rompida.', 'Grimório - pag. 152', '2025-07-16 02:24:11.207', '2025-07-16 02:24:11.207');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('f607b755-27ce-4d83-b390-b1ac70f7d18d', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Trombetas de Gedeão', 'Evocação (sônico) - Controlar/Criar Ar 6', e'Componentes: V, G, M (uma trombeta)
Tempo de Formulação: 1 ação
Alcance: Om
Área: 100m de raio
Duração: 6 rodadas
Teste de Resistência: fortitude (CON) reduz à metade
Resistência à Magia: sim
O feiticeiro toca a trombeta tão alto e destrutivamente que to-das as pessoas dentro do raio de 100m ao redor do feiticeiro sofrem 3d6 pontos de dano por rodada. Cada vitima pode fazer um teste de fortitude (CON) para reduzir o dano à metade. A trombeta é destruída no processo.', 'Grimório - pag. 160', '2025-07-16 02:28:14.364', '2025-07-16 02:28:14.364');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('fe737a95-e7d9-4ab4-8de5-de21dd483ec7', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Trovão', 'Evocação [eletricidade] - Criar Ar/Luz 3', e'Componentes: V, G, M (um pedaço de ferro frio)
Tempo de Formulação: 1 ação
Alcance: Om
Área: uma linha de 20m x 1m
Duração: instantânea
Teste de Resistência: reflexos (AGI) reduz à metade
Resistência à Magia: sim
Esta é uma das magias mais conhecidas de Arton e das mais temidas em campos de combate. Através de gestos, o mago é capaz de disparar um trovão de suas mãos, até uma distância de 20m. Todos que estiverem na linha de ação do trovão sofrerão Xd6 +6 pontos de dano (onde X é o nível do mago), até um máximo de 9d6+6, com direito a um teste de reflexos (AGI vs. DEX do mago) para reduzir o dano à metade. O trovão ricoche teia em pedra e é absorvido por superficies grandes de metal.', 'Grimório - pag. 160', '2025-07-16 02:29:33.092', '2025-07-16 02:29:33.092');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('d24e3342-41b9-4dc9-9e0f-3553bd643846', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Trovão em Cadeia', 'Evocação [eletricidade] - Criar Ar/Luz 6', e'Componentes: V, G, M (um pedaço de ferro frio)
Tempo de Formulação: 1 ação
Alcance: Om
Área: ver descrição
Duração: instantânea
Teste de Resistência: reflexos (AGI) reduz à metade
Resistência à Magia: sim
Esta magia cria um trovão das mãos do mago e é arremessado
até um oponente. Ele recebe 6d6 pontos de dano (pode fazer um
Teste de AGI para reduzir o dano à metade).
Em seguida, o trovão vai para a pessoa mais próxima (pode ser o próprio mago inclusive!) e causa 5d6 e assim por diante, até a sexta pessoa, que receberá 1d6 pontos de dano. O trovão caminha no máximo 20m entre cada pessoa e se não existir nenhum alvo possível, ele é disperso na terra.', 'Grimório - pag. 160', '2025-07-16 02:29:59.561', '2025-07-16 02:30:26.630');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('f11eb0a1-69a1-4d5b-afda-eb06d54a5524', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Ultravioleta', 'Evocação (Luz ) - Criar/Controlar Luz 4', e'Componentes: V, G
Tempo de Formulação: 1 ação
Alcance: 20m
Alvo: 1m de raio
Duração: imediata
Teste de Resistência: fortitude (CON) reduz à metade
Resistência à Magia: sim
Para executar este ritual, o mago coloca as duas mãos abertas voltadas para a vítima e, através de mantras, irradia sobre ela gran-de quantidade de raios ultravioleta concentrados.
Além de causar 4d6 pontos de dano (6d6 pontos de dano em criaturas vulneráveis à luz solar), faz com que a pele da vítima sofra queimaduras de segundo e terceiro graus (semelhantes às causadas por excesso de sol), além de tumores na pele em alguns casos de grande exposição. A vítima pode fazer um teste de fortitude (CON) para reduzir o dano à metade.', 'Grimório - pag. 161', '2025-07-16 02:32:46.372', '2025-07-16 02:32:46.372');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('73673c5e-a808-42f3-b471-d77231ea7c6e', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Ventriloquismo', 'Ilusão (Sensação) - Entender Ar 2', e'Componentes: V
Tempo de Formulação: 1 ação
Alcance: 10m
Efeitos: projeta a voz do mago
Duração: 1 cena
Teste de Resistência: nenhum
Resistência à Magia: não
Como o próprio nome indica, este efeito simples é capaz de projetar a voz do mago à distância, fazendo com que o feiticeiro pareça estar falando em outro local. A voz pode ser projetada a até 10m de distância.
Pode ser usado em conjunto com outros rituais de mudança de voz, o que potencializa o efeito obtido.', 'Grimório - pag. 162', '2025-07-16 02:34:41.317', '2025-07-16 02:34:41.317');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('e977f86b-4f4f-4813-974b-761103382e7a', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Viajar com os Ventos Aliseos', 'Transmutação - Controlar Ar 6', e'Componentes: V, G, F (uma pena de um pássaro ou uma vassoura de palha)
Tempo de Formulação: 20 minutos
Alcance: o próprio mago
Efeitos: permite ao mago voar
Duração: 1 hora / nivel
Teste de Resistência: nenhum
Resistência à Magia: não
Este ritual permite ao feiticeiro voar com até 40m/s (150km/
h). Ele deve levantar võo como se estivesse levitando, aumentan-do sua velocidade gradativamente até a velocidade máxima.
O feiticeiro sente quando as correntes de vento estão acabando e o ritual está chegando ao fim. As brujas espanholas utilizavam como fetiche para este ritual una vassoura de palha.', 'Grimório - pag. 164', '2025-07-16 02:36:38.316', '2025-07-16 02:36:38.316');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('473b7ef8-8c9d-42fe-a575-680cde114236', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Voar sem Asas', 'Transmutação - Criar/Controlar Ar 4', e'Componentes: V, G, M (uma pena da asa de um anjo)
Tempo de Formulação: 1 ação
Alcance: o próprio mago
Efeitos: permite ao mago voar
Duração: 1 cena
Teste de Resistência: nenhum
Resistência à Magia: não
Permite ao mago voar a até 20m/s, com o controle total de seus movimentos, como se estivesse "nadando" no ar, enquanto se desloca misticamente. O movimento de võo não exige concen-tração, permitindo ao realizar outras magias.', 'Grimório - pag. 167/168', '2025-07-16 02:38:20.911', '2025-07-16 02:38:20.911');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('29af1064-7848-453d-baaa-98e774c33a74', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Vozes', 'Evocação [sônico] - Controlar/Entender Ar 4', e'Componentes: V
Tempo de Formulação: 1 ação
Alcance: 30m
Efeitos: ver descrição
Duração: 2 rodadas
Teste de Resistência: nenhum
Resistência à Magia: não
A magia Vozes permite imitar a voz de qualquer pessoa com 95% de perfeição, ou criar um coral com até 8 pessoas falando ao mesmo tempo.
Esta magia usada em combinação com outras magias como Ventriloquismo, ou Roubar a Voz, pode causar enormes confu-sões, pois o efeito potencial é muito mais forte.', 'Grimório - pag. 168', '2025-07-16 02:39:41.331', '2025-07-16 02:39:41.331');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('4f456370-ad8b-48a4-8c78-eb7b74987cef', 'c32c1497-7f84-42ba-93a8-9f5271b234fb', 'Aumento atributos ', 'Fé', e'Custo:  1 ponto de fé
Benefícios: 1d6 no atributo por 3d6 rodadas', 'Clube de caça 47', '2025-07-17 02:04:28.640', '2025-07-17 02:04:28.640');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('1dbd6d0b-1378-43c8-b4d7-65ba27ac7d86', 'c32c1497-7f84-42ba-93a8-9f5271b234fb', 'Aumento de atributo milagroso', 'Fé', e'Custo: 1 a 5 pontos de fé
Benefícios: 1 a 5d6 por 1 rodada', 'Clube de caça 47', '2025-07-17 02:06:32.655', '2025-07-17 02:06:32.655');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('e222083f-cbc3-4bd4-b157-4cd483cd5a56', 'c32c1497-7f84-42ba-93a8-9f5271b234fb', 'Afastar mortos-vivos', 'Fé', e'Custo: X pontos de fé a escolha 
Benefício: Afasta mortos-vivos, vampiros, demônios, espectros e outras criaturas malignas, teste Will igual ao número de pontos de fé gastos em d6.
Se vencer a criatura se afastará o mais rápido que puder', 'Clube de caça 47', '2025-07-17 02:12:55.945', '2025-07-17 02:12:55.945');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('107c3b8f-77b0-4920-9b83-5e12c35612dd', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Ataque Vorpal', 'Transmutação - Controlar Ar/Luz 4', e'Componentes: V, G, F/FD (uma arma cortante)
Tempo de Formulação: 1 ação
Alcance: uma arma
Alvo: uma arma empunhada pelo mago
Duração: um ataque bem sucedido
Teste de Resistência: vontade (WILL) anula (objeto) (benéfico)
Resistência à Magia: não

Este efeito transforma uma arma cortante ou ataque comum em um ataque vorpal — ou seja, capaz de decapitar o adversário e matá-lo com um só golpe! Sempre que um personagem sob efeito desta magia (o próprio mago ou outra pessoa) consegue um acerto decisivo (resultado menor que 05 em sua jogada de ataque), o alvo deve imediatamente fazer um teste de fortitude (CON): se falhar, terá a cabeça ou um membro escolhido pelo jogador decepado.

Este ritual só funciona se o personagem possuir uma arma cortante. Martelos, clavas ou tacapes NÃO podem ser alvos desta magia. A arma encantada só funciona nas mãos do feiticeiro que realizou o ritual.

Nota: criaturas com mais de uma cabeça serão mortas apenas quando TODAS forem decapitadas!

Daemon: A arma pode ser encantada com dois pontos de magia durante um ano e um dia. Após este período, a arma se torna permanentemente encantada.



', 'Grimório - pag. 32', '2025-07-14 18:31:43.856', '2025-07-18 13:50:47.751');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('d7317cf4-0699-49da-aa06-400410e6a306', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Saltos Espetaculares', 'Voar (Nível 2)', 'Como o próprio nome indica, permite ao vampiro dar saltos com até 8m de altura ou 25m de distância com pouco ou nenhum impulso. É o suficiente para cruzar o vão entre o telhado de dois prédios em lados opostos de uma rua com um impulso.', 'Vampiros Mitológicos, pág. 65', '2025-07-18 22:39:11.781', '2025-07-18 22:39:11.781');
INSERT INTO public."Ritual" (id, "characterId", name, "pathsForms", description, "bookPage", "createdAt", "updatedAt") VALUES ('ef1ca29b-0d0d-467c-842e-01567f691297', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Aumento de Força', 'Aumento de Atributos - FR', e'Com o passar do tempo, os vampiros desenvolvem uma capacidade física muito superior às dos humanos. De acordo com as lendas, vampiros muito velhos são capazes de grandes proezas musculares, como rasgar barras de ferro com as mãos e até mesmo abrir um buraco no peito de uma pessoa com um soco.
Cada ponto de Aumento de Força equivale a um bônus de +3 na Força (FR) do vampiro. Note que este aumento de força é considerando sobrenatural, e não implica no ganho de músculos ou massa corpórea. Todos os Testes e efeitos comparativos são feitos utilizando-se a forç sobrenatural de um vampiro com este poder, e os Pontos de Vida (PVs) aumentam proporcionalmente.', 'Vampiros Mitológicos, pág. 54', '2025-07-18 22:48:37.993', '2025-07-18 22:48:37.993');
