import "reflect-metadata";
import { injectable } from "inversify";
import bcrypt from "bcryptjs";

import MysqlDatabase from "../databases/mysql.database";
import SellerRepositoryInterface from "./seller.repository.interface";
import Seller from "../interfaces/seller";

@injectable()
export default class SellerRepositoryMySql
  implements SellerRepositoryInterface
{
  private database;

  constructor() {
    this.database = new MysqlDatabase();
  }

  public async save(seller: Seller): Promise<number> {
    const sql = `INSERT INTO sellers(fullName, cpf, email, password) VALUES (?, ?, ?, ?)`;
    const password = await bcrypt.hash(seller.password, 10);
    const values = [seller.fullName, seller.cpf, seller.email, password];

    const packet = await this.database.query(sql, values);

    return packet.insertId;
  }

  public async getBy(column: string, value: string): Promise<Seller> {
    const sql = `SELECT id, fullName, cpf, email, password FROM sellers WHERE ?? = ?`;

    const packet = await this.database.query(sql, [column, value]);
    const row = packet[0];

    if (!row) {
      throw new Error("Seller not found.");
    }

    return {
      fullName: row.fullName,
      cpf: row.cpf,
      email: row.email,
      password: row.password,
    };
  }
}
