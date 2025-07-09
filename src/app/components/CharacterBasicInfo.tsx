import { CharacterHome } from "../home/useHome";
import { CharacterCardBasicInfo } from "./CharacterCardBaseInfo";

type Props = {
  character: CharacterHome;
  isPermission: boolean;
};

export const CharacterBasicInfo = ({ character, isPermission }: Props) => {
  return (
    <div className="d-100 d-flex flex-wrap justify-content-between ">
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
