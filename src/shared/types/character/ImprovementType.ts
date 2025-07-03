import { improvementSchema } from "@/shared/schemas/character/improvementSchema";
import { InferType } from "yup";

export type ImprovementType = InferType<typeof improvementSchema>;
