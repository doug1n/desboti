import "reflect-metadata";
import { injectable } from "inversify";
import axios from "axios";

import CashbackRepositoryInterface from "./cashback.repository.interface";
import { AccumulatedCashback } from "../interfaces/cashback";

@injectable()
export default class CashbackRepositoryMdaqk8ek5j
  implements CashbackRepositoryInterface
{
  private endpoint: string;

  constructor() {
    this.endpoint =
      "https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/";
  }

  public async accumulated(cpf: string): Promise<AccumulatedCashback> {
    const response = await axios.get(`${this.endpoint}/cashback?cpf=${cpf}`);
    const data = response.data.body;

    return {
      accumulated: data.credit,
    };
  }
}
