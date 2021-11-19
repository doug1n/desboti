import App from "../../app";
import request from "supertest";
import SellerRepositoryInterface from "../../repositories/seller.repository.interface";
import TYPES from "../../types";
import { sellerExample } from "../tools";
import MysqlDatabase from "../../databases/mysql.database";

describe("seller controller", () => {
  const app = new App();
  const server = app.createServer();
  const database = new MysqlDatabase();
  let sellerRepository: SellerRepositoryInterface;

  beforeEach(async () => {
    await database.query("TRUNCATE TABLE sellers");

    sellerRepository = app.container.get<SellerRepositoryInterface>(
      TYPES.SellerRepositoryInterface
    );

    await sellerRepository.save(sellerExample);
  });

  describe("authenticate", () => {
    it("not authenticate if payload is invalid", async () => {
      await request(server).post("/sellers/auth").expect(422);
    });

    it("not authenticate if credentials are invalid", async () => {
      await request(server)
        .post("/sellers/auth")
        .send({
          cpf: "12345678901",
          password: "123444",
        })
        .expect(401);
    });

    it("authenticate", async () => {
      await request(server)
        .post("/sellers/auth")
        .send({
          cpf: sellerExample.cpf,
          password: sellerExample.password,
        })
        .expect(200);
    });
  });

  describe("store", () => {
    it("create seller", async () => {
      await request(server)
        .post("/sellers")
        .send({ ...sellerExample, cpf: "0391141904" })
        .expect(201);
    });

    it("not create seller if payload is invalid", async () => {
      await request(server)
        .post("/sellers")
        .send({
          fullName: "Douglas Gomes",
        })
        .expect(422);
    });
  });

  describe("cashback", () => {
    it("unauthorize if not authenticated", async () => {
      await request(server).get("/sellers/cashback").expect(401);
    });

    it("verify accumulated cashback", async () => {
      const response = await request(server).post("/sellers/auth").send({
        cpf: sellerExample.cpf,
        password: sellerExample.password,
      });

      const token = response.body.token;

      await request(server)
        .get("/sellers/cashback")
        .set("Authorization", token)
        .expect(200);
    });
  });
});
