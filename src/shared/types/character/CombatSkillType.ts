import { combatSkillSchema } from "@/shared/schemas/character/combatSkillSchema";
import { InferType } from "yup";

export type CombatSkillType = InferType<typeof combatSkillSchema>;
