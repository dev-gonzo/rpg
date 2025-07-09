import { CharacterHome } from "../home/useHome";
import { CharacterCardBasicInfo } from "./CharacterCardBaseInfo";

type Props = {
  character: CharacterHome;
  isPermission: boolean;
  isMaster: boolean
};

export const CharacterBasicInfo = ({ character, isMaster }: Props) => {
  return (
    <div className="d-100 d-flex flex-wrap justify-content-between ">
      <CharacterCardBasicInfo
        label="Pontos de Vida"
        value={character?.hitPoints || 0}
        valueCurrent={character?.currentHitPoints || 0}
        currentField="currentHitPoints"
        characterId={character?.id}
        min={-5}
        isPermission={isMaster}
      />
      <CharacterCardBasicInfo
        label="Iniciativa"
        value={character?.initiative || 0}
        valueCurrent={character?.currentInitiative || 0}
        currentField="currentInitiative"
        characterId={character?.id}
        notColor
        isPermission={isMaster}
      />
      <CharacterCardBasicInfo
        label="Pontos Heróicos"
        value={character?.heroPoints || 0}
        valueCurrent={character?.currentHeroPoints || 0}
        currentField="currentHeroPoints"
        characterId={character?.id}
        isPermission={isMaster}
      />
      <CharacterCardBasicInfo
        label="Pontos de Magia"
        value={character?.magicPoints || 0}
        valueCurrent={character?.currentMagicPoints || 0}
        currentField="currentMagicPoints"
        characterId={character?.id}
        isPermission={isMaster}
      />
      <CharacterCardBasicInfo
        label="Pontos de Fé"
        value={character?.faithPoints || 0}
        valueCurrent={character?.currentFaithPoints || 0}
        currentField="currentFaithPoints"
        characterId={character?.id}
        isPermission={isMaster}
      />
      <CharacterCardBasicInfo
        label="Índice de Proteção"
        value={character?.protectionIndex || 0}
        valueCurrent={character?.currentProtectionIndex || 0}
        isNotCompared
        currentField="currentProtectionIndex"
        characterId={character?.id}
        notColor
        isPermission={isMaster}
      />
    </div>
  );
};
