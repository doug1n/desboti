import Purchase, { PurchaseWithCashback } from "../interfaces/purchase";

export default interface PurchaseServiceInterface {
  create(purchase: Purchase): Promise<number>;
  update(id: number, purchase: Purchase): Promise<void>;
  delete(id: number): Promise<void>;
  list(offset: number, limit: number): Promise<Array<PurchaseWithCashback>>;
}
