import App from "../../app";
import TYPES from "../../types";
import CashbackRepositoryInterface from "../../repositories/cashback.repository.interface";

describe("cashback repository", () => {
  const app = new App();
  let cashbackRepository: CashbackRepositoryInterface;

  beforeEach(async () => {
    cashbackRepository = app.container.get<CashbackRepositoryInterface>(
      TYPES.CashbackRepositoryInterface
    );
  });

  it("accumulated", async () => {
    const accumulated = await cashbackRepository.accumulated("03911419104");
    expect(typeof accumulated.accumulated).toBe("number");
  });
});
