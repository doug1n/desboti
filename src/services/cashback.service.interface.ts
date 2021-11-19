import Cashback from "../interfaces/cashback";
import Purchase from "../interfaces/purchase";

export default interface CashbackServiceInterface {
  calculate(purchase: Purchase): Cashback;
}
