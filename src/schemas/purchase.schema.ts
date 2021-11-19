import { string, number, date, object } from "yup";

export const createPurchaseSchema = object({
  cpf: string().required(),
  code: number().required(),
  value: number().required(),
  date: date().required(),
});

export const editPurchaseSchema = object({
  cpf: string().required(),
  code: number().required(),
  value: number().required(),
  date: date().required(),
  status: number().oneOf([1, 2]).required(),
});
