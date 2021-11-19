import App from "../../app";
import TYPES from "../../types";
import axios from "axios";
import CashbackRepositoryInterface from "../../repositories/cashback.repository.interface";

jest.mock("axios");

describe("cashback repository", () => {
  const app = new App();
  let cashbackRepository: CashbackRepositoryInterface;

  beforeEach(async () => {
    cashbackRepository = app.container.get<CashbackRepositoryInterface>(
      TYPES.CashbackRepositoryInterface
    );
  });

  it("accumulated", async () => {
    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({ data: { statusCode: 200, body: { credit: 4723 } } })
    );

    const accumulated = await cashbackRepository.accumulated("03911419104");
    expect(accumulated).toEqual({
      accumulated: 4723,
    });
  });
});
