import * as yup from "yup";

export const userRegisterSchema = yup.object({
  name: yup
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres")
    .required("O nome é obrigatório"),
  email: yup.string().email("Informe um email válido").required("O email é obrigatório"),
  password: yup
    .string()
    .min(8, "A senha deve conter ao menos 8 caracteres")
    .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .matches(/[0-9]/, "A senha deve conter pelo menos um número")
    .matches(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial")
    .required("A senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas precisam ser iguais")
    .required("A confirmação de senha é obrigatória"),
});
