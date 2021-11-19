import App from "../app";
import request from "supertest";
import { PurchaseStatus } from "../interfaces/purchase";

export const sellerExample = {
  fullName: "Faustao",
  cpf: "12345678901",
  email: "fausto@gomes.com",
  password: "123456",
};

export const purchaseExample = {
  code: 12345,
  value: 158.88,
  date: new Date(),
  cpf: "03911419104",
  status: PurchaseStatus.Approved,
};

export async function generateToken(app: App) {
  let token = "";
  const payload = {
    cpf: "12345678901",
    password: "123456",
  };

  await request(app)
    .post("/sellers/auth")
    .send(payload)
    .end((err, response) => {
      token = response.body.token;
    });

  return token;
}
