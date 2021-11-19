import mysql from "mysql";

import SqlDatabaseInterface from "./database.interface";

export default class MysqlDatabase implements SqlDatabaseInterface {
  public connection;

  constructor() {
    this.connection = mysql.createPool({
      connectionLimit: 1,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
  }

  public query(query: string, values: any = []): Promise<any> {
    return new Promise((resolve, reject) =>
      this.connection.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      })
    );
  }
}
