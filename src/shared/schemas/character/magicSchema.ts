// shared/schemas/character/magicSchema.ts
import * as yup from "yup";

export const magicSchema = yup.object({
  id: yup.string(),
  secretSociety: yup.string().nullable().notRequired(),
  rank: yup.string().nullable().notRequired(),
  cabala: yup.string().nullable().notRequired(),
  mentor: yup.string().nullable().notRequired(),
});
