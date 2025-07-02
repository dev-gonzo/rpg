// shared/types/Character.ts
import { CharacterBasicData } from "./CharacterBasicData";
import { CharacterMysticData } from "./CharacterMysticData";
import { CharacterComplementaryData } from "./CharacterComplementaryData";

export type Character = {
  id: string;
  basicData: CharacterBasicData;
  mysticData: CharacterMysticData;
  complementaryData: CharacterComplementaryData;
  photoUrl?: string | null;
};
