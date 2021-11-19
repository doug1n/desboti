export enum PurchaseStatus {
  onValidation = 1,
  Approved = 2,
}

export interface PurchaseWithCashback {
  id?: number;
  code: number;
  value: number;
  date: Date;
  cashbackPercentage: number;
  cashbackValue: number;
  status?: PurchaseStatus;
}

export default interface Purchase {
  id?: number;
  code: number;
  value: number;
  date: Date;
  cpf: string;
  status?: PurchaseStatus;
}
