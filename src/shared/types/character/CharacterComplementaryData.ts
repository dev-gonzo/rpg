// shared/types/CharacterComplementaryData.ts
import { RelevantPerson } from "./RelevantPerson";

export type CharacterComplementaryData = {
  knownEnemies: string[];
  relevantPeople: RelevantPerson[];
  allies: RelevantPerson[];
  contacts: RelevantPerson[];
};
