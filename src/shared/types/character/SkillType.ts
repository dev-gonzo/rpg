import { skillSchema } from "@/shared/schemas/character/skillSchema";
import { InferType } from "yup";

export type SkillType = InferType<typeof skillSchema>;
