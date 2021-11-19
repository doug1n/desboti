import "dotenv/config";
import "reflect-metadata";
import { injectable } from "inversify";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import AuthenticateServiceInterface from "./authenticate.service.interface";
import Seller from "../interfaces/seller";

@injectable()
export default class AuthenticateService
  implements AuthenticateServiceInterface
{
  public async getToken(password: string, seller: Seller): Promise<string> {
    const compare = await bcrypt.compare(password, seller.password);

    if (!compare) {
      throw new Error("Password don't match.");
    }

    const token = jwt.sign(
      { user_id: seller.id, cpf: seller.cpf },
      process.env.JWT_KEY ?? "",
      {
        expiresIn: "2h",
      }
    );

    return token;
  }
}
