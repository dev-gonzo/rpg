import { Character } from "@prisma/client";
import { CharacterCardBasicInfo } from "./CharacterCardBaseInfo";

type Props = {
  character: Character;
};

export const CharacterBasicInfo = ({ character }: Props) => {
  return (
    <div className="d-100 d-flex gap-1 flex-wrap justify-content-around">
      <CharacterCardBasicInfo
        label="Pontos de Vida"
        value={character?.hitPoints || 0}
        valueCurrent={character?.currentHitPoints || 0}
      />
      <CharacterCardBasicInfo
        label="Iniciativa"
        value={character?.initiative || 0}
        valueCurrent={character?.currentInitiative || 0}
        isNotCompared
      />
      <CharacterCardBasicInfo
        label="Pontos Heróicos"
        value={character?.heroPoints || 0}
        valueCurrent={character?.currentHeroPoints || 0}
      />
      <CharacterCardBasicInfo
        label="Pontos de Magia"
        value={character?.magicPoints || 0}
        valueCurrent={character?.currentMagicPoints || 0}
      />
      <CharacterCardBasicInfo
        label="Pontos de Fé"
        value={character?.faithPoints || 0}
        valueCurrent={character?.currentFaithPoints || 0}
      />
      <CharacterCardBasicInfo
        label="Índice de Proteção"
        value={character?.protectionIndex || 0}
        valueCurrent={character?.currentProtectionIndex || 0}
        isNotCompared
      />
    </div>
  );
};
