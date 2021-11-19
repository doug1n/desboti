import Purchase from "../interfaces/purchase";

export default interface PurchaseRepositoryInterface {
  save(purchase: Purchase): Promise<number>;
  getAll(offset?: number, limit?: number): Promise<Array<Purchase>>;
  get(id: number): Promise<Purchase>;
  update(id: number, purchase: Purchase): Promise<void>;
  delete(id: number): Promise<void>;
}
