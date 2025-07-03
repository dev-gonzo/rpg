import * as yup from "yup";

export const basicDataSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  profession: yup.string().required("Profissão é obrigatória"),
  birthDate: yup.string().required("Data de nascimento é obrigatória"),
  birthPlace: yup.string().nullable().defined(), // adiciona .defined()
  gender: yup.string().nullable().defined(),
  heightCm: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .defined()
    .positive("Altura deve ser positiva")
    .integer("Altura deve ser um número inteiro")
    .notRequired(),
  weightKg: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .defined()
    .positive("Peso deve ser positivo")
    .integer("Peso deve ser um número inteiro")
    .notRequired(),
  age: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .defined()
    .positive("Idade deve ser positiva")
    .integer("Idade deve ser um número inteiro")
    .notRequired(),
  apparentAge: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .defined()
    .positive("Idade aparente deve ser positiva")
    .integer("Idade aparente deve ser um número inteiro")
    .notRequired(),
  religion: yup.string().nullable().defined(),
});
