import { basicDataSchema } from "@/shared/schemas/character/basicDataSchema";
import { InferType } from "yup";

export type BasicDataType = InferType<typeof basicDataSchema>;
