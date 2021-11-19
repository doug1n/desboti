import { string, object } from "yup";

export const authSellerSchema = object({
  cpf: string().required(),
  password: string().required(),
});

export const createSellerSchema = object({
  cpf: string().required(),
  email: string().email().required(),
  password: string().required(),
  fullName: string().required(),
});
