import { AccumulatedCashback } from "../interfaces/cashback";

export default interface CashbackRepositoryInterface {
  accumulated(cpf: String): Promise<AccumulatedCashback>;
}
