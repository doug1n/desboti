import Seller from "../interfaces/seller";

export default interface AuthenticateServiceInterface {
  getToken(password: string, seller: Seller): Promise<string>;
}
