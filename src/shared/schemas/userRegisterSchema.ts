import * as yup from "yup";

export const userRegisterSchema = yup.object({
  name: yup.string().min(3, "Name is too short").max(50, "Name is too long").required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must have at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});
