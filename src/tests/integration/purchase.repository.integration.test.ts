import App from "../../app";
import TYPES from "../../types";
import MysqlDatabase from "../../databases/mysql.database";
import PurchaseRepositoryInterface from "../../repositories/purchase.repository.interface";
import { purchaseExample } from "../tools";

describe("purchase repository", () => {
  const app = new App();
  const database = new MysqlDatabase();
  let purchaseRepository: PurchaseRepositoryInterface;

  beforeEach(async () => {
    purchaseRepository = app.container.get<PurchaseRepositoryInterface>(
      TYPES.PurchaseRepositoryInterface
    );

    await database.query("TRUNCATE TABLE purchases");
  });

  it("save", async () => {
    const id = await purchaseRepository.save(purchaseExample);
    expect(id).toEqual(1);
  });

  it("getAll", async () => {
    await purchaseRepository.save(purchaseExample);

    const purchasesFound = await purchaseRepository.getAll();
    expect(
      purchasesFound.map((p) => ({
        ...p,
        date: p.date.toISOString().split("T")[0],
      }))
    ).toEqual([
      {
        id: 1,
        code: purchaseExample.code,
        value: purchaseExample.value,
        date: purchaseExample.date.toISOString().split("T")[0],
        cpf: purchaseExample.cpf,
        status: purchaseExample.status,
      },
    ]);
  });

  it("get", async () => {
    const id = await purchaseRepository.save(purchaseExample);

    const purchaseFound = await purchaseRepository.get(id);
    expect({
      ...purchaseFound,
      date: purchaseFound.date.toISOString().split("T")[0],
    }).toEqual({
      id: 1,
      code: purchaseExample.code,
      value: purchaseExample.value,
      date: purchaseExample.date.toISOString().split("T")[0],
      cpf: purchaseExample.cpf,
      status: purchaseExample.status,
    });
  });

  it("throws when get and the purchase doesn't exist", async () => {
    await expect(purchaseRepository.get(1)).rejects.toThrowError(
      "Purchase not found."
    );
  });

  it("update", async () => {
    const id = await purchaseRepository.save(purchaseExample);

    await purchaseRepository.update(id, {
      ...purchaseExample,
      value: 5000,
    });

    const purchaseFound = await purchaseRepository.get(id);

    expect({
      ...purchaseFound,
      date: purchaseFound.date.toISOString().split("T")[0],
    }).toEqual({
      id: 1,
      code: purchaseExample.code,
      value: 5000,
      date: purchaseExample.date.toISOString().split("T")[0],
      cpf: purchaseExample.cpf,
      status: purchaseExample.status,
    });
  });

  it("delete", async () => {
    const id = await purchaseRepository.save(purchaseExample);

    await purchaseRepository.delete(id);

    await expect(purchaseRepository.get(id)).rejects.toThrowError(
      "Purchase not found."
    );
  });
});
