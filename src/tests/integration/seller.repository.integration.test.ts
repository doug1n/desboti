import App from "../../app";
import TYPES from "../../types";
import MysqlDatabase from "../../databases/mysql.database";
import SellerRepositoryInterface from "../../repositories/seller.repository.interface";
import { sellerExample } from "../tools";

describe("seller repository", () => {
  const app = new App();
  const database = new MysqlDatabase();
  let sellerRepository: SellerRepositoryInterface;

  beforeEach(async () => {
    await database.query("TRUNCATE TABLE sellers");
    
    sellerRepository = app.container.get<SellerRepositoryInterface>(
      TYPES.SellerRepositoryInterface
    );
  });

  it("save", async () => {
    const id = await sellerRepository.save(sellerExample);
    expect(id).toEqual(1);
  });

  it("getBy", async () => {
    await sellerRepository.save(sellerExample);
    const seller = await sellerRepository.getBy("cpf", sellerExample.cpf);

    expect({ ...seller, password: "" }).toEqual({
      ...sellerExample,
      password: "",
    });
  });
});
