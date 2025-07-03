import * as yup from "yup";

export const skillSchema = yup.object({
  id: yup.string().nullable().notRequired(),
  group: yup.string().nullable(),
  skill: yup.string().required("Nome da perícia é obrigatório"),
  attribute: yup
    .string()
    .oneOf(["CON", "FR", "DEX", "AGI", "INT", "WILL", "PER", "CAR", ""])
    .nullable(),
  cost: yup
    .number()
    .typeError("Custo deve ser um número")
    .required("Custo é obrigatório")
    .min(0, "Valor do kit não pode ser negativo"),
  kitValue: yup
    .number()
    .typeError("Valor do kit deve ser um número")
    .nullable()
    .notRequired()
    .min(0, "Valor do kit não pode ser negativo"),
});
