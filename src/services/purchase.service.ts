import "reflect-metadata";
import { injectable, inject } from "inversify";

import TYPES from "../types";

import Purchase, {
  PurchaseStatus,
  PurchaseWithCashback,
} from "../interfaces/purchase";
import PurchaseServiceInterface from "./purchase.service.interface";
import PurchaseRepositoryInterface from "../repositories/purchase.repository.interface";
import CashbackServiceInterface from "./cashback.service.interface";

@injectable()
export default class PurchaseService implements PurchaseServiceInterface {
  private purchaseRepository: PurchaseRepositoryInterface;
  private cashbackService: CashbackServiceInterface;

  constructor(
    @inject(TYPES.PurchaseRepositoryInterface)
    purchaseRepository: PurchaseRepositoryInterface,
    @inject(TYPES.CashbackServiceInterface)
    cashbackServiceInterface: CashbackServiceInterface
  ) {
    this.purchaseRepository = purchaseRepository;
    this.cashbackService = cashbackServiceInterface;
  }

  public async create(purchase: Purchase): Promise<number> {
    let purchaseStatus = PurchaseStatus.onValidation;

    if (this.isDistinguishedSeller(purchase.cpf)) {
      purchaseStatus = PurchaseStatus.Approved;
    }

    return this.purchaseRepository.save({
      ...purchase,
      status: purchaseStatus,
    });
  }

  public async update(id: number, newPurchase: Purchase): Promise<void> {
    const purchase = await this.purchaseRepository.get(id);

    if (purchase.status !== PurchaseStatus.onValidation) {
      throw new Error(
        `Editing is allowed only if the sale status is "On validation".`
      );
    }

    this.purchaseRepository.update(id, newPurchase);
  }

  public async delete(id: number): Promise<void> {
    const purchase = await this.purchaseRepository.get(id);

    if (purchase.status !== PurchaseStatus.onValidation) {
      throw new Error(
        `Delete is allowed only if the sale status is "On validation".`
      );
    }

    this.purchaseRepository.delete(id);
  }

  public async list(
    offset: number = 0,
    limit: number = 10
  ): Promise<Array<PurchaseWithCashback>> {
    const purchases = await this.purchaseRepository.getAll(offset, limit);

    return purchases.map((purchase) => {
      const cashback = this.cashbackService.calculate(purchase);

      return {
        id: purchase.id,
        code: purchase.code,
        value: purchase.value,
        date: purchase.date,
        cashbackPercentage: cashback.percentage,
        cashbackValue: cashback.value,
        status: purchase.status,
      };
    });
  }

  private isDistinguishedSeller(cpf: string): Boolean {
    return ["15350946056"].includes(cpf);
  }
}
