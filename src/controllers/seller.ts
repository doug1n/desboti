import express from "express";
import {
  httpGet,
  httpPost,
  BaseHttpController,
  interfaces,
  controller,
  request,
} from "inversify-express-utils";
import { inject } from "inversify";

import validateMiddleware from "../middlewares/validate";
import authMiddleware from "../middlewares/auth";

import TYPES from "../types";

import { authSellerSchema, createSellerSchema } from "../schemas/seller.schema";

import SellerRepositoryInterface from "../repositories/seller.repository.interface";
import CashbackRepositoryInterface from "../repositories/cashback.repository.interface";
import AuthenticateServiceInterface from "../services/authenticate.service.interface";
import { RequestWithUser } from "../interfaces/customExpress";

@controller("/sellers")
export default class SellerController
  extends BaseHttpController
  implements interfaces.Controller
{
  private authenticateService: AuthenticateServiceInterface;
  private sellerRepository: SellerRepositoryInterface;
  private cashbackRepository: CashbackRepositoryInterface;

  constructor(
    @inject(TYPES.AuthenticateServiceInterface)
    authenticateService: AuthenticateServiceInterface,
    @inject(TYPES.SellerRepositoryInterface)
    sellerRepository: SellerRepositoryInterface,
    @inject(TYPES.CashbackRepositoryInterface)
    cashbackRepository: CashbackRepositoryInterface
  ) {
    super();

    this.authenticateService = authenticateService;
    this.sellerRepository = sellerRepository;
    this.cashbackRepository = cashbackRepository;
  }

  @httpPost("/auth", validateMiddleware(authSellerSchema))
  public async authenticate(
    @request() req: express.Request
  ): Promise<interfaces.IHttpActionResult> {
    const { cpf, password } = req.body;

    try {
      const seller = await this.sellerRepository.getBy("cpf", cpf);
      const jwt = await this.authenticateService.getToken(password, seller);

      return this.json({
        token: jwt,
      });
    } catch (err: any) {
      return this.statusCode(401);
    }
  }

  @httpPost("/", validateMiddleware(createSellerSchema))
  public async store(
    @request() req: express.Request
  ): Promise<interfaces.IHttpActionResult> {
    const seller = req.body;

    await this.sellerRepository.save(seller);

    return this.json(seller, 201);
  }

  @httpGet("/cashback", authMiddleware)
  public async cashback(
    @request() req: RequestWithUser
  ): Promise<interfaces.IHttpActionResult> {
    const accumulated = await this.cashbackRepository.accumulated(req.user.cpf);

    return this.json(accumulated);
  }
}
