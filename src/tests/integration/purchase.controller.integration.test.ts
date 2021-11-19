import App from "../../app";
import request from "supertest";
import SellerRepositoryInterface from "../../repositories/seller.repository.interface";
import TYPES from "../../types";
import { purchaseExample, sellerExample } from "../tools";
import MysqlDatabase from "../../databases/mysql.database";
import PurchaseRepositoryInterface from "../../repositories/purchase.repository.interface";
import { PurchaseStatus } from "../../interfaces/purchase";

describe("purchase controller", () => {
  const app = new App();
  const server = app.createServer();
  const database = new MysqlDatabase();
  let token: string;
  let sellerRepository: SellerRepositoryInterface;
  let purchaseRepository: PurchaseRepositoryInterface;

  beforeEach(async () => {
    await database.query("TRUNCATE TABLE purchases");

    sellerRepository = app.container.get<SellerRepositoryInterface>(
      TYPES.SellerRepositoryInterface
    );

    purchaseRepository = app.container.get<PurchaseRepositoryInterface>(
      TYPES.PurchaseRepositoryInterface
    );

    await sellerRepository.save(sellerExample);

    const response = await request(server).post("/sellers/auth").send({
      cpf: sellerExample.cpf,
      password: sellerExample.password,
    });

    token = response.body.token;
  });

  describe("index", () => {
    it("unauthorize if not authenticated", async () => {
      await request(server).get("/purchases").expect(401);
    });

    it("index", async () => {
      await request(server)
        .get("/purchases")
        .set("Authorization", token)
        .expect(200);
    });
  });

  describe("store", () => {
    it("unauthorize if not authenticated", async () => {
      await request(server).post("/purchases").expect(401);
    });

    it("validate payload", async () => {
      await request(server).get("/purchases").expect(401);
    });

    it("store", async () => {
      await request(server)
        .post("/purchases")
        .send(purchaseExample)
        .set("Authorization", token)
        .expect(201);
    });
  });

  describe("update", () => {
    it("unauthorize if not authenticated", async () => {
      await request(server).put("/purchases/1").expect(401);
    });

    it("update", async () => {
      const id = await purchaseRepository.save({
        ...purchaseExample,
        status: PurchaseStatus.onValidation,
      });
      await request(server)
        .put(`/purchases/${id}`)
        .send({ ...purchaseExample, value: 5000 })
        .set("Authorization", token)
        .expect(204);
    });
  });

  describe("destroy", () => {
    it("unauthorize if not authenticated", async () => {
      await request(server).delete("/purchases/1").expect(401);
    });

    it("destroy", async () => {
      const id = await purchaseRepository.save({
        ...purchaseExample,
        status: PurchaseStatus.onValidation,
      });
      await request(server)
        .delete(`/purchases/${id}`)
        .set("Authorization", token)
        .expect(204);
    });
  });
});
