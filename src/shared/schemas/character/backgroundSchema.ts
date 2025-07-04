import * as yup from "yup";

export const backgroundSchema = yup.object({
  title: yup.string().required("Título é obrigatório"),
  text: yup.string().required("Texto é obrigatório"),
  isPublic: yup.boolean().notRequired(),
});
