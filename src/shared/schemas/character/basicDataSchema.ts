import * as yup from "yup";

export const basicDataSchema = yup.object({
  id: yup.string(),
  name: yup.string().required("Nome é obrigatório"),
  profession: yup.string().required("Profissão é obrigatória"),
  birthDate: yup.string().required("Data de nascimento é obrigatória"),
  birthPlace: yup.string().nullable(), // adiciona
  gender: yup.string().nullable(),
  heightCm: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .positive("Altura deve ser positiva")
    .integer("Altura deve ser um número inteiro")
    .notRequired(),
  weightKg: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .positive("Peso deve ser positivo")
    .integer("Peso deve ser um número inteiro")
    .notRequired(),
  age: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .positive("Idade deve ser positiva")
    .integer("Idade deve ser um número inteiro")
    .notRequired(),
  apparentAge: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .positive("Idade aparente deve ser positiva")
    .integer("Idade aparente deve ser um número inteiro")
    .notRequired(),
  religion: yup.string().nullable(),
  secretSociety: yup.string().nullable(),
  cabala: yup.string().nullable(),
  rank: yup.string().nullable(),
  mentor: yup.string().nullable(),
});
