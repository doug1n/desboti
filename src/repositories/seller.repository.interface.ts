import Seller from "../interfaces/seller";

export default interface SellerRepositoryInterface {
  save(seller: Seller): Promise<number>;
  getBy(column: string, value: string): Promise<Seller>;
}
