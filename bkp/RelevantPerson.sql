create table "RelevantPerson"
(
    id                 varchar(255)                           not null
        primary key,
    "characterId"      varchar(255)                           not null
        references "Character"
            on update cascade on delete cascade,
    category           varchar(255)                           not null,
    name               varchar(255)                           not null,
    "apparentAge"      integer,
    city               varchar(255),
    profession         varchar(255),
    "briefDescription" text,
    "createdAt"        timestamp(3) default CURRENT_TIMESTAMP not null,
    "updatedAt"        timestamp(3)                           not null
);

alter table "RelevantPerson"
    owner to yeyokp_rpg;

INSERT INTO public."RelevantPerson" (id, "characterId", category, name, "apparentAge", city, profession, "briefDescription", "createdAt", "updatedAt") VALUES ('5aad61e1-12a0-46e4-95e6-44bfad56fc7c', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Pessoa Relevante', 'Thomas Coedwyn (Falecido)', 40, 'Blackwood, Monmouthshire, País de Gales', 'Ex-Sargento do Exército Britânico', e'Pai de Sebastian.
Possivelmente Daiphir.
Morto em um acidente de caça nos arredores de Blackwood em 1964.', '2025-07-08 15:07:41.657', '2025-07-08 15:08:19.196');
INSERT INTO public."RelevantPerson" (id, "characterId", category, name, "apparentAge", city, profession, "briefDescription", "createdAt", "updatedAt") VALUES ('0a8d9f7d-0f3e-413d-bf46-47ae30a8ded9', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Pessoa Relevante', 'Henry "Paradesi" Coedwyn', 69, 'Blackwood, Monmouthshire, País de Gales', 'Ex-Oficial do Exército Britânco', e'Avô de Sebastian. Nascido em 1898. Desaparecido após a morte do filho em 1964.
Ex-Oficial do Exército Britânico. Serviu no Raj Britânico no final dos anos 1910.
Possível Daiphir. Possíveis ligações com a AGNI.', '2025-07-08 15:19:08.213', '2025-07-08 15:25:27.695');
INSERT INTO public."RelevantPerson" (id, "characterId", category, name, "apparentAge", city, profession, "briefDescription", "createdAt", "updatedAt") VALUES ('e5c866fc-984e-46f9-8f96-c0e7f3ef6ab9', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Contato', 'Isaac "Doc" Halberg', 40, 'Detroit, Michigan', 'Proprietário da Halberg’s Old Books & Curiosities (Mensageiro de baixo escalão e assistente de arquivo para os Místicos do Arkanorum)', e'Isaac “Doc” Halberg é um homem magro e discreto, na casa dos quarenta anos. Usa óculos de armação redonda, jaquetas de tweed salpicadas de farelos de madeira (um disfarce de um hobby de marcenaria há muito abandonado) e mantém canetas atrás de ambas as orelhas. Sua livraria está abarrotada de supostos grimórios raros, etnografias e lendas locais — o suficiente para mascarar o catálogo secreto de manuscritos realmente importantes que ele transporta discretamente pela região de Detroit e arredores.

Quando chega com um pacote ou um pergaminho manuscrito, cumprimenta Bastion com a mesma entonação amigável que reserva a qualquer cliente. Por trás desse comportamento bondoso, porém, ele é extremamente discreto: lembra detalhes sutis, nunca faz perguntas e some na sala dos fundos sempre que um estranho se aproxima. Seu apelido “Doc” vem do hábito de se referir a todos — sejam caçadores ou estudiosos — como “doutor”, um tique amigável que oculta a delicada perícia que traz a cada troca.
', '2025-07-08 17:33:09.020', '2025-07-08 17:33:09.020');
INSERT INTO public."RelevantPerson" (id, "characterId", category, name, "apparentAge", city, profession, "briefDescription", "createdAt", "updatedAt") VALUES ('a72424d5-57a8-482d-ab11-e49b58f950c8', '25c11889-f323-4a99-9ec7-471a290ec789', 'Pessoa Relevante', 'Lívia Colt', 15, 'Lebanon, Kansas, EUA', 'Espírito', e'Lívia Colt desapareceu tragicamente aos quinze anos durante um exorcismo falho que marcou para sempre a vida de seu irmão. Oficialmente, ela está morta — sepultada e velada, embora algo naquele enterro tenha sido profundamente errado. A presença de Lívia se manifesta através de sussurros, visões breves, presságios e sonhos compartilhados. Embora sua aparência jovem e voz suave ainda evoquem inocência, há algo profundamente perturbador em sua sabedoria precoce — como se parte dela tivesse ido longe demais para voltar. Samuel não sabe se está falando com a irmã... ou com algo que a imita.

Tipo físico: Esbelta e pálida, como uma figura saída de um sonho antigo
Cabelos: Castanho-escuros, longos, sempre trançados com uma fita vermelha
Olhos: Castanhos claros, com um brilho inquisitivo e melancólico
Traços marcantes:
Pequena cicatriz em forma de lua abaixo do queixo, herança de uma brincadeira na infância
Usava um medalhão antigo da avó, com símbolos protetores
Vestia-se com roupas simples, mas sempre com toques de cor (lenços, faixas, colares)
Tinha uma risada leve e contagiante, que Samuel ainda ouve nos sonhos
Durante o ritual que causou sua morte, seus olhos escureceram por completo — e esse é o último olhar que Samuel se lembra

Atmosfera:
Lívia era luz em meio às trevas da linhagem Colt. Inteligente, doce, e sempre protegendo o irmão mais do que a si mesma. Mesmo morta, a presença dela nunca se apagou completamente — e talvez nem devesse.', '2025-07-11 12:59:28.282', '2025-07-11 13:26:34.321');
INSERT INTO public."RelevantPerson" (id, "characterId", category, name, "apparentAge", city, profession, "briefDescription", "createdAt", "updatedAt") VALUES ('c8f84be0-e9e7-4ecb-9f85-da1ef906b6c5', '48a82c80-490f-4568-9b53-f9c4dbc991c1', 'Inimigo', 'Richard Mcdwel', 33, 'Nova Iorque', 'Mago / Assassino', e'Homem, loiro, olhos castanhos claros, pele branca, possui uma cicatriz no lado esquedo do rosto, mede 1,70 de altura, pesa 65 kg.

Estudamos juntos na Escola Luft. Ele entrou para a escola quando tinha 16 anos. Ele é orfão, até entrar na Escola Luft ele vivia na rua. Sempre foi uma pessoa muito agressiva, nunca gostou de mim, tudo que eu fazia ele queria rivalizar.
Ele sempre procurava briga comigo, mas eu sempre fui melhor que ele e mais forte, o que causou um forte ódio por mim.
Ele foi expulso da Ordem após tentar matar um outro membro da Escola. Eu o detive e denúnciei ele para os superiores, o que fez ele ser desligado da escola.
Ele jurou que iria se vingar, desde então ele me persegue para tentar concluir seu objetivo. ', '2025-07-15 19:36:29.788', '2025-07-15 19:36:29.788');
INSERT INTO public."RelevantPerson" (id, "characterId", category, name, "apparentAge", city, profession, "briefDescription", "createdAt", "updatedAt") VALUES ('4ee3d3cb-7a07-40f6-9435-9861fa3700f0', 'e69fc5e0-0aec-46ac-a5b4-a2ac2bd1fac7', 'Contato', 'Jack Bauer', 50, '', 'Chefe de policia ', 'Jack: "Soube que a carga chegará ao porto a meia noite e não haverá nem sequer um gaurda de trânsito por perto " ; "Você tem 2 horas, depois disso meus homens vão entrar e agir"', '2025-07-16 00:50:32.467', '2025-07-16 03:08:01.582');
INSERT INTO public."RelevantPerson" (id, "characterId", category, name, "apparentAge", city, profession, "briefDescription", "createdAt", "updatedAt") VALUES ('0893a97a-0475-4434-882a-19cfa3a109a9', 'e69fc5e0-0aec-46ac-a5b4-a2ac2bd1fac7', 'Contato', 'Phillip Blendfor', 40, '', 'Político ', '[RASCUNHO - FALTA REVISAR] Tem grande envolvimento com cultura e eventos, é quem me concede acessos restritos,  entradas VIPs e informações  quando necessário. É a pessoa que me apresenta como confiável para certos figurões. No passado, encontrei sua filha viciada a beira da morte e a salvei. Frase típica - Phillip: "Eu consigo te colocar dentro desse evento fechado para investidores" ; "Ok, eu faço, mas porque você quer entrar na festa do prefeito?"; "Isso é simples, consigo 3 ingressos VIPs para a final do Lakers com o Bulls na mesma fileira que a Madonna vai estar. O que acha?"', '2025-07-16 01:14:37.594', '2025-07-16 03:07:01.180');
INSERT INTO public."RelevantPerson" (id, "characterId", category, name, "apparentAge", city, profession, "briefDescription", "createdAt", "updatedAt") VALUES ('836e1e5d-e71f-4e96-a5f7-e6089b876499', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Pessoa Relevante', 'Eleanor Coedwyn (Falecida)', 42, 'Blackwood, Monmouthshire, País de Gales', 'Bibliotecária autodidata, pesquisadora de folclore e botânica ritualística', e'Mãe de Bastion e esposa de Thomas Coedwyn, Eleanor era uma pesquisadora sensível e intensa, movida por saberes ocultos e pela preservação simbólica da linhagem híbrida. Autodidata em folclore e mitologia local, guiou Bastion pelos corredores das lendas, ensinando-lhe desde cedo a reconhecer padrões sobrenaturais por meio de contos, ervas e poesia.

Dividia com o filho tardes de estudo sobre extratos botânicos, elixires de proteção e fragmentos de rituais esquecidos pelas Madjis. Embora nunca tenha sido oficialmente iniciada, Eleanor mantinha registros preciosos sobre criaturas, símbolos e selos que Henry — o avô de Bastion — deixou fragmentados antes de desaparecer dos círculos da AGNI.

Faleceu em circunstâncias misteriosas pouco antes de Bastion ser consagrado como caçador, deixando para ele objetos enigmáticos: um diário de campo com receitas simbólicas e uma carta codificada com a frase:
“Quando as balas falharem, confie no sal e na canção.”

Sua ausência não é silêncio — é o eco que Bastion carrega nos momentos em que força não basta. Eleanor ensinou mais do que técnica: ensinou o porquê de existir uma luta.', '2025-07-16 15:32:04.068', '2025-07-16 15:32:26.544');
INSERT INTO public."RelevantPerson" (id, "characterId", category, name, "apparentAge", city, profession, "briefDescription", "createdAt", "updatedAt") VALUES ('6a29d4ac-1abf-4a8b-8d47-6c880465faf0', 'e69fc5e0-0aec-46ac-a5b4-a2ac2bd1fac7', 'Contato', 'Svetlana (A velha, Velha Yaga)', 100, '', 'Alquimista', e'[RASCUNHO - FALTA REVISAR] Idosa, parece ter uns 100 anos ou mais, pele mto branca, olhos azuis bem claros. Imigrante vinda da Rússia. Fornece itens raros, alquímicos e mágicos.

Trabalha junto com seu filho, Dimitri... o Alquimista.

Após salvar a vida do filho Pawel, a velha decidiu me ajudar. Apesar de estranha e sombria, ela trata Kevin com carinho, diz que lembro seu primeiro filho já morto, o jovem Pyotr (Pedro). Svetlana: "O jovem Pyotr veio me visitar?"; "Cuidado, mesmo com seu sorriso cativante você não encontrará amigos naquele lugar"; "Use uma dessas e ele sangrará como um mortal".

', '2025-07-16 00:52:46.298', '2025-07-16 03:01:06.233');
INSERT INTO public."RelevantPerson" (id, "characterId", category, name, "apparentAge", city, profession, "briefDescription", "createdAt", "updatedAt") VALUES ('afc0b872-867b-4af6-a258-40c2a683888d', '8fe8d0ab-7b3b-4890-ba12-2782236b2e4b', 'Inimigo', 'Dorian Varg', 45, 'Desconhecido', 'Ex-Grão-Hiota da AGNI (estrategista e especialista em contenção sobrenatural)', e'Veterano dos combates ocultos nos Balcãs, Dorian foi treinado por templários dissidentes e ascendeu à liderança dos Hiotas dentro da AGNI — até ser expulso por propor a extinção de todos os daiphires, incluindo Bastion ainda criança. Calculista, frio e obcecado pela doutrina original da ordem, atua hoje como caçador independente, oferecendo serviços à elite oculta e sabotando linhagens híbridas que considera “impuras”.

Instalado em galpões industriais, manipula terceiros para investigar ou perseguir Bastion sem se expor. Deixa mensagens cifradas, artefatos marcados e selos em locais de missão. Nunca ataca de forma direta: observa, testa e prepara exorcismos doutrinários para apagar legados que desestabilizam a ordem.

Vê Bastion como anomalia viva, erro filosófico e veneno ritual — e não descansará até que a linhagem Coedwyn seja corrigida. Suas ações favorecem tramas urbanas, caçadas simbólicas e embates entre ideologias ocultas e heranças rompidas.', '2025-07-16 14:42:31.865', '2025-07-16 19:57:31.192');
INSERT INTO public."RelevantPerson" (id, "characterId", category, name, "apparentAge", city, profession, "briefDescription", "createdAt", "updatedAt") VALUES ('5148704a-6382-423b-9446-ebf45d894de0', '25c11889-f323-4a99-9ec7-471a290ec789', 'Pessoa Relevante', 'Viktor “Ash” Kuznetsov', 70, '', 'Ex-operativo da KGB e ocultista pragmático', e'Conhecido apenas como “Ash”, Viktor Kuznetsov é uma figura que Samuel nunca conheceu pessoalmente — mas cuja influência está presente em cada gesto frio e preciso que seu pai, Elias Colt, carregava. Ex-operativo da KGB e ocultista pragmático, Ash atuou como mercenário em rituais de execução e contenção espiritual durante a Guerra Fria. Ele treinou Elias nos anos 30 e 40, ensinando métodos de extermínio silencioso, feitiçaria russa e maldições codificadas em latim e sangue.

Tipo físico: Alto, seco como um cadáver de guerra, mas ainda imponente
Cabelos: Brancos, ralos, sempre penteados para trás com precisão militar
Olhos: Um cego e esbranquiçado, o outro é cinza metálico, como aço frio
Traços marcantes:
Pele com textura de papel antigo, repleta de cicatrizes e queimaduras rituais
Um corte em forma de cruz de ferro sob o olho esquerdo
Sempre trajando um sobretudo cinza puído, com o forro cheio de bolsos ocultos
Fuma cigarros russos finos com as mãos tremendo, mas nunca hesita no gatilho
Voz grave, quase sussurrada, com sotaque eslavo e pausas calculadas

Atmosfera:
Quando ele entra em um cômodo, o ar parece pesar. As sombras se esticam. As pessoas param de falar. Parece mais um espírito velho de guerra do que um homem.

Boatos dizem que Ash enlouqueceu após entrar em contato com entidades do “Reino Pálido”, e que hoje vive como um espectro em cidades fantasmas da Ucrânia. Ainda assim, algumas cartas codificadas endereçadas a Samuel chegaram recentemente com o mesmo padrão de cera negra que Ash costumava usar. Em uma delas, só havia uma frase:
“Se seu pai falhou, o fardo é seu agora.”', '2025-07-11 13:23:34.675', '2025-07-17 22:08:55.413');
INSERT INTO public."RelevantPerson" (id, "characterId", category, name, "apparentAge", city, profession, "briefDescription", "createdAt", "updatedAt") VALUES ('a3f04645-34fb-48f7-85a4-891960435343', '25c11889-f323-4a99-9ec7-471a290ec789', 'Inimigo', 'Alistair Thorne, "O Cronista"', 50, '', 'Agente da Ordem Oculta', e'Tipo: Um ser humano que, por sua obsessão e convicção, se tornou uma ameaça tão grande quanto qualquer entidade sobrenatural. Ele é um arquivista e caçador, o que o torna um adversário direto e intelectual.

Motivação: Ele não age por malícia, mas por uma crença deturpada. Alistair é o último de uma linhagem de "Cronistas", que acreditam que a família Colt está errada na sua missão. Ele quer capturar Samuel e o revólver da família, não para destruí-los, mas para "reorganizar" a ordem e, assim, "consertar" o que Samuel estragou. Ele quer a redenção da linhagem dele, e acredita que a de Samuel deve ser sacrificada.

Aparência: Alistair é um homem mais velho, em seus 50 anos, de barba e cabelo grisalhos e bem-aparados. Ele usa ternos e casacos de tweed, limpos e elegantes, o que contrasta com a sujeira do trabalho de Samuel. Seus olhos são azuis e penetrantes, e ele sempre tem um caderno de anotações e uma caneta na mão. Ele não é fisicamente impressionante, mas sua presença é intimidadora, como a de um professor que conhece a resposta para uma pergunta que ninguém se atreveu a fazer.

Detalhes da História:

Alistair e a linhagem dos Cronistas trabalhavam em conjunto com a família Colt. Eles não eram caçadores, mas registravam e catalogavam os eventos, rituais e entidades. Eles eram os "cientistas" e os Colt eram os "soldados". Mas algo aconteceu, talvez um ritual fracassado ou uma traição, e os Colt se voltaram contra a ordem dos Cronistas.

Alistair acredita que a família de Samuel perdeu o controle das artes que utilizam, e que por isso, a morte de Lívia foi um "desastre inevitável". Ele vê Samuel não como um herói, mas como uma falha, um erro que precisa ser corrigido para restaurar a ordem no mundo. Ele sabe da dor de Samuel, e a vê como uma "fraqueza" que ele explora para capturá-lo.

Ele não se importa com quem morre, apenas com a ordem. Ele é o verdadeiro "inimigo humano" que Samuel teme. O perigo não está apenas em sua habilidade de lutar, mas em sua inteligência. Ele pode atrair Samuel para armadilhas intelectuais, em que o Samuel tem que tomar decisões difíceis que questionam sua própria moralidade.', '2025-08-29 14:21:03.036', '2025-08-29 14:21:03.036');
