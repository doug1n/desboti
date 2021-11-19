import App from "../../app";
import TYPES from "../../types";
import CashbackServiceInterface from "../../services/cashback.service.interface";
import { purchaseExample } from "../tools";

describe("cashback service", () => {
  const app = new App();
  let cashbackService: CashbackServiceInterface;

  beforeEach(async () => {
    cashbackService = app.container.get<CashbackServiceInterface>(
      TYPES.CashbackServiceInterface
    );
  });

  it("calculate <= 1000", () => {
    const cashback = cashbackService.calculate({
      ...purchaseExample,
      value: 1000,
    });

    expect(cashback).toEqual({
      percentage: 0.1,
      value: 100,
    });
  });

  it("calculate > 1000 <= 1500", () => {
    const cashback = cashbackService.calculate({
      ...purchaseExample,
      value: 1500,
    });

    expect(cashback).toEqual({
      percentage: 0.15,
      value: 225,
    });
  });

  it("calculate > 1500", () => {
    const cashback = cashbackService.calculate({
      ...purchaseExample,
      value: 2000,
    });

    expect(cashback).toEqual({
      percentage: 0.2,
      value: 400,
    });
  });
});
