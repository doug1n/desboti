import App from "../../app";
import TYPES from "../../types";
import MysqlDatabase from "../../databases/mysql.database";
import PurchaseRepositoryInterface from "../../repositories/purchase.repository.interface";
import { purchaseExample } from "../tools";

jest.mock("../../databases/mysql.database");

describe("purchase repository", () => {
  const app = new App();
  let purchaseRepository: PurchaseRepositoryInterface;

  beforeEach(async () => {
    purchaseRepository = app.container.get<PurchaseRepositoryInterface>(
      TYPES.PurchaseRepositoryInterface
    );
  });

  it("save", async () => {
    const spy = jest.spyOn(MysqlDatabase.prototype, "query").mockImplementation(
      () =>
        new Promise((resolve) => {
          resolve({
            insertId: 1,
          });
        })
    );

    const insertId = await purchaseRepository.save(purchaseExample);
    expect(MysqlDatabase).toHaveBeenCalledTimes(1);
    expect(insertId).toEqual(1);

    spy.mockRestore();
  });

  it("getAll", async () => {
    const spy = jest.spyOn(MysqlDatabase.prototype, "query").mockImplementation(
      () =>
        new Promise((resolve) => {
          resolve([purchaseExample]);
        })
    );

    const purchasesFound = await purchaseRepository.getAll();
    expect(MysqlDatabase).toHaveBeenCalledTimes(1);
    expect(purchasesFound).toEqual([purchaseExample]);

    spy.mockRestore();
  });

  it("get", async () => {
    const spy = jest.spyOn(MysqlDatabase.prototype, "query").mockImplementation(
      () =>
        new Promise((resolve) => {
          resolve([purchaseExample]);
        })
    );

    const purchaseFound = await purchaseRepository.get(1);
    expect(MysqlDatabase).toHaveBeenCalledTimes(1);
    expect(purchaseFound).toEqual(purchaseExample);

    spy.mockRestore();
  });

  it("update", async () => {
    const spy = jest.spyOn(MysqlDatabase.prototype, "query").mockImplementation(
      () =>
        new Promise((resolve) => {
          resolve(true);
        })
    );

    await purchaseRepository.update(1, purchaseExample);
    expect(MysqlDatabase).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  it("delete", async () => {
    const spy = jest.spyOn(MysqlDatabase.prototype, "query").mockImplementation(
      () =>
        new Promise((resolve) => {
          resolve(true);
        })
    );

    await purchaseRepository.delete(1);
    expect(MysqlDatabase).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });
});
