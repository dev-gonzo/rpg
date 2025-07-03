import * as yup from "yup";

export const improvementSchema = yup.object({
  id: yup.string().nullable().notRequired(),
  name: yup.string().nullable().required("Nome é obrigatório"),
  kitValue: yup
    .number()
    .typeError("Valor Kit deve ser um número")
    .nullable()
    .notRequired()
    .min(0, "Valor Kit não pode ser negativo"),
  cost: yup
    .number()
    .typeError("Custo deve ser um número")
    .required("Custo é obrigatório")
    .min(0, "Custo não pode ser negativo"),
});
