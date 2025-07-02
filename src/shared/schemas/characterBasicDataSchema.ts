import * as yup from "yup";

export const characterBasicDataSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  socialClass: yup.string().required("Classe social é obrigatória"),
  profession: yup.string().required("Profissão é obrigatória"),
  birthDate: yup.string().required("Data de nascimento é obrigatória"),
  birthPlace: yup.string().notRequired(),
  gender: yup.string().notRequired(),
  heightCm: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    )
    .nullable()
    .positive("Altura deve ser positiva")
    .integer("Altura deve ser um número inteiro")
    .notRequired(),
  weightKg: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    )
    .nullable()
    .positive("Peso deve ser positivo")
    .integer("Peso deve ser um número inteiro")
    .notRequired(),
  apparentAge: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    )
    .nullable()
    .positive("Idade aparente deve ser positiva")
    .integer("Idade aparente deve ser um número inteiro")
    .notRequired(),
  religion: yup.string().nullable().notRequired(),
});
