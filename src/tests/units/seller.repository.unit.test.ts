import App from "../../app";
import TYPES from "../../types";
import MysqlDatabase from "../../databases/mysql.database";
import SellerRepositoryInterface from "../../repositories/seller.repository.interface";
import { sellerExample } from "../tools";

jest.mock("../../databases/mysql.database");

describe("seller repository", () => {
  const app = new App();
  let sellerRepository: SellerRepositoryInterface;

  beforeEach(async () => {
    sellerRepository = app.container.get<SellerRepositoryInterface>(
      TYPES.SellerRepositoryInterface
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

    const insertId = await sellerRepository.save(sellerExample);
    expect(MysqlDatabase).toHaveBeenCalledTimes(1);
    expect(insertId).toEqual(1);

    spy.mockRestore();
  });

  it("getBy", async () => {
    const spy = jest.spyOn(MysqlDatabase.prototype, "query").mockImplementation(
      () =>
        new Promise((resolve) => {
          resolve([sellerExample]);
        })
    );

    const sellerFound = await sellerRepository.getBy("cpf", "12345678901");
    expect(MysqlDatabase).toHaveBeenCalledTimes(1);
    expect(sellerFound).toEqual(sellerExample);

    spy.mockRestore();
  });
});
