import * as yup from "yup";

export const userLoginSchema = yup.object({
  email: yup.string().email("Informe um email válido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});
