import * as yup from "yup";

export const combatSkillSchema = yup.object({
  id: yup.string().notRequired(),
  group: yup.string().nullable().notRequired(),
  skill: yup.string().required("Nome da perícia é obrigatório"),
  attribute: yup
    .string()
    .oneOf(["CON", "FR", "DEX", "AGI", "INT", "WILL", "PER", "CAR", ""])
    .notRequired(),
  attackCost: yup
    .number()
    .typeError("Custo de ataque deve ser um número")
    .required("Custo de ataque é obrigatório")
    .min(0, "Custo de ataque não pode ser negativo"),
  defenseCost: yup
    .number()
    .typeError("Custo de defesa deve ser um número")
    .required("Custo de defesa é obrigatório")
    .min(0, "Custo de defesa não pode ser negativo"),
  attackKitValue: yup
    .number()
    .typeError("Valor do kit de ataque deve ser um número")
    .notRequired()
    .min(0, "Valor do kit de ataque não pode ser negativo"),
  defenseKitValue: yup
    .number()
    .typeError("Valor do kit de defesa deve ser um número")
    .notRequired()
    .min(0, "Valor do kit de defesa não pode ser negativo"),
});
