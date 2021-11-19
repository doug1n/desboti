import App from "../../app";
import TYPES from "../../types";
import PurchaseServiceInterface from "../../services/purchase.service.interface";
import PurchaseRepositoryMysql from "../../repositories/purchase.repository.mysql";
import { purchaseExample } from "../tools";
import { PurchaseStatus } from "../../interfaces/purchase";

jest.mock("../../repositories/purchase.repository.interface");

describe("purchase service", () => {
  const app = new App();
  let purchaseService: PurchaseServiceInterface;

  beforeEach(async () => {
    purchaseService = app.container.get<PurchaseServiceInterface>(
      TYPES.PurchaseServiceInterface
    );
  });

  it("create", async () => {
    const spy = jest
      .spyOn(PurchaseRepositoryMysql.prototype, "save")
      .mockImplementation(() => Promise.resolve(1));

    const insertId = await purchaseService.create(purchaseExample);

    expect(insertId).toEqual(1);

    spy.mockRestore();
  });

  it("update", async () => {
    const spyGet = jest
      .spyOn(PurchaseRepositoryMysql.prototype, "get")
      .mockImplementation(() =>
        Promise.resolve({
          ...purchaseExample,
          status: PurchaseStatus.onValidation,
        })
      );

    const spyUpdate = jest
      .spyOn(PurchaseRepositoryMysql.prototype, "update")
      .mockImplementation(() => Promise.resolve());

    await expect(
      purchaseService.update(1, purchaseExample)
    ).resolves.not.toThrow();

    spyGet.mockRestore();
    spyUpdate.mockRestore();
  });

  it("dont update if the status is different from on validation", async () => {
    const spyGet = jest
      .spyOn(PurchaseRepositoryMysql.prototype, "get")
      .mockImplementation(() => Promise.resolve(purchaseExample));

    const spyUpdate = jest
      .spyOn(PurchaseRepositoryMysql.prototype, "update")
      .mockImplementation(() => Promise.resolve());

    await expect(
      purchaseService.update(1, purchaseExample)
    ).rejects.toThrowError(
      `Editing is allowed only if the sale status is "On validation".`
    );

    spyGet.mockRestore();
    spyUpdate.mockRestore();
  });

  it("delete", async () => {
    const spyGet = jest
      .spyOn(PurchaseRepositoryMysql.prototype, "get")
      .mockImplementation(() =>
        Promise.resolve({
          ...purchaseExample,
          status: PurchaseStatus.onValidation,
        })
      );

    const spyDelete = jest
      .spyOn(PurchaseRepositoryMysql.prototype, "delete")
      .mockImplementation(() => Promise.resolve());

    await expect(purchaseService.delete(1)).resolves.not.toThrow();

    spyGet.mockRestore();
    spyDelete.mockRestore();
  });

  it("dont delete if the status is different from on validation", async () => {
    const spyGet = jest
      .spyOn(PurchaseRepositoryMysql.prototype, "get")
      .mockImplementation(() => Promise.resolve(purchaseExample));

    const spyDelete = jest
      .spyOn(PurchaseRepositoryMysql.prototype, "delete")
      .mockImplementation(() => Promise.resolve());

    await expect(purchaseService.delete(1)).rejects.toThrowError(
      `Delete is allowed only if the sale status is "On validation".`
    );

    spyGet.mockRestore();
    spyDelete.mockRestore();
  });

  it("list", async () => {
    const spy = jest
      .spyOn(PurchaseRepositoryMysql.prototype, "getAll")
      .mockImplementation(() =>
        Promise.resolve([{ id: 1, ...purchaseExample }])
      );

    const purchases = await purchaseService.list(0, 10);

    expect(purchases).toEqual([
      {
        id: 1,
        code: purchaseExample.code,
        value: purchaseExample.value,
        date: purchaseExample.date,
        cashbackPercentage: 0.1,
        cashbackValue: 15.888,
        status: purchaseExample.status,
      },
    ]);

    spy.mockRestore();
  });
});
