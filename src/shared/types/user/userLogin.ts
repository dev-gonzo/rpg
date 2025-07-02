import { InferType } from "yup";
import { userLoginSchema } from "@/shared/schemas/user/userLoginSchema";

export type UserLogin = InferType<typeof userLoginSchema>;
