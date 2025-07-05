// shared/types/character/MagicType.ts
import { magicSchema } from "@/shared/schemas/character/magicSchema";
import { InferType } from "yup";

export type MagicType = InferType<typeof magicSchema>;
