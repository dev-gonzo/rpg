// shared/types/Character.ts
export interface ControlUser {
  id: string;
  name: string;
  email: string;
}

export interface Attributes {
  id: string;
  characterId: string;
  CON: number;
  FR: number;
  DEX: number;
  AGI: number;
  INT: number;
  WILL: number;
  PER: number;
  CAR: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface RelevantPerson {
  // se quiser preencher, mas no exemplo está vazio
}

export interface Improvement {
  // se quiser preencher, mas no exemplo está vazio
}

export interface Skill {
  // se quiser preencher, mas no exemplo está vazio
}

export interface CombatSkill {
  // se quiser preencher, mas no exemplo está vazio
}

export interface CharacterGet {
  id: string;
  name: string;
  profession: string | null;
  birthDate: string; // ISO date string
  birthPlace: string | null;
  gender: string | null;
  heightCm: number | null;
  weightKg: number | null;
  age: number | null;
  apparentAge: number | null;
  religion: string | null;
  secretSociety: string | null;
  cabala: string | null;
  rank: string | null;
  mentor: string | null;
  societyAllies: string[];
  controlUserId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  controlUser: ControlUser;
  attributes: Attributes;
  relevantPeople: RelevantPerson[];
  improvements: Improvement[];
  skills: Skill[];
  combatSkill: CombatSkill[];
}

export interface CharactersResponse {
  characters: CharacterGet[];
}
