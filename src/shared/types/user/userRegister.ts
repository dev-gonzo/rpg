import { InferType } from "yup";
import { userRegisterSchema } from "@/shared/schemas/user/userRegisterSchema";

export type UserRegister = InferType<typeof userRegisterSchema>;
