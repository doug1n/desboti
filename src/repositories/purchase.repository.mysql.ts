import "reflect-metadata";
import { injectable } from "inversify";

import MysqlDatabase from "../databases/mysql.database";
import Purchase from "../interfaces/purchase";
import PurchaseRepositoryInterface from "./purchase.repository.interface";

@injectable()
export default class PurchaseRepositoryMySql
  implements PurchaseRepositoryInterface
{
  private database;

  constructor() {
    this.database = new MysqlDatabase();
  }

  public async save(purchase: Purchase): Promise<number> {
    const sql = `INSERT INTO purchases(code, value, date, cpf, status) VALUES (?, ?, ?, ?, ?)`;
    const values = [
      purchase.code,
      purchase.value,
      new Date(purchase.date).toISOString().split("T")[0],
      purchase.cpf,
      purchase.status,
    ];

    const packet = await this.database.query(sql, values);

    return packet.insertId;
  }

  public async getAll(
    offset: number = 0,
    limit: number = 10
  ): Promise<Array<Purchase>> {
    const sql = `SELECT id, code, value, date, cpf, status FROM purchases LIMIT ? OFFSET ?`;

    const packet = await this.database.query(sql, [limit, offset]);

    return packet.map((row: any) => ({
      id: row.id,
      code: row.code,
      value: row.value,
      date: row.date,
      cpf: row.cpf,
      status: row.status,
    }));
  }

  public async get(id: number): Promise<Purchase> {
    const sql = `SELECT id, code, value, date, cpf, status FROM purchases WHERE id = ?`;

    const packet = await this.database.query(sql, [id]);
    const row = packet[0];

    if (!row) {
      throw new Error("Purchase not found.");
    }

    return {
      id: row.id,
      code: row.code,
      value: row.value,
      date: row.date,
      cpf: row.cpf,
      status: row.status,
    };
  }

  public async update(id: number, purchase: Purchase): Promise<void> {
    const sql = `UPDATE purchases SET code = ?, value = ?, date = ?, cpf = ?, status = ? WHERE id = ?`;
    const values = [
      purchase.code,
      purchase.value,
      new Date(purchase.date).toISOString().split("T")[0],
      purchase.cpf,
      purchase.status,
    ];

    await this.database.query(sql, [...values, id]);
  }

  public async delete(id: number): Promise<void> {
    const sql = `DELETE FROM purchases WHERE id = ?`;

    await this.database.query(sql, [id]);
  }
}
