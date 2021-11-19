import "reflect-metadata";
import { injectable } from "inversify";

import Purchase from "../interfaces/purchase";
import CashbackServiceInterface from "./cashback.service.interface";
import Cashback from "../interfaces/cashback";

@injectable()
export default class CashbackService implements CashbackServiceInterface {
  public calculate(purchase: Purchase): Cashback {
    if (purchase.value <= 1000) {
      return {
        percentage: 0.1,
        value: purchase.value * 0.1,
      };
    }

    if (purchase.value > 1000 && purchase.value <= 1500) {
      return {
        percentage: 0.15,
        value: purchase.value * 0.15,
      };
    }

    return {
      percentage: 0.2,
      value: purchase.value * 0.2,
    };
  }
}
