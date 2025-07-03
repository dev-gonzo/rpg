import { CharacterCardBasicInfo } from "./CharacterCardBaseInfo";

export const CharacterBasicInfo = () => {
  return (
    <div className="d-100 d-flex gap-1 flex-wrap justify-content-around">
      <CharacterCardBasicInfo
        label="Pontos de Vida"
        value={10}
        valueCurrent={8}
      />
      <CharacterCardBasicInfo
        label="Iniciativa"
        value={10}
        valueCurrent={8}
        isNotCompared
      />
      <CharacterCardBasicInfo
        label="Pontos Heróicos"
        value={10}
        valueCurrent={8}
      />
      <CharacterCardBasicInfo
        label="Pontos de Magia"
        value={10}
        valueCurrent={8}
      />

      <CharacterCardBasicInfo
        label="Pontos de Fé"
        value={10}
        valueCurrent={8}
      />
      <CharacterCardBasicInfo
        label="Índice de Proteção"
        value={10}
        valueCurrent={8}
        isNotCompared
      />
    </div>
  );
};
