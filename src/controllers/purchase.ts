import express from "express";
import {
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
  BaseHttpController,
  interfaces,
  controller,
  request,
  requestParam,
} from "inversify-express-utils";
import { inject } from "inversify";

import validateMiddleware from "../middlewares/validate";
import authMiddleware from "../middlewares/auth";

import TYPES from "../types";

import {
  createPurchaseSchema,
  editPurchaseSchema,
} from "../schemas/purchase.schema";

import PurchaseServiceInterface from "../services/purchase.service.interface";

@controller("/purchases", authMiddleware)
export default class PurchaseController
  extends BaseHttpController
  implements interfaces.Controller
{
  private purchaseService: PurchaseServiceInterface;

  constructor(
    @inject(TYPES.PurchaseServiceInterface)
    purchaseService: PurchaseServiceInterface
  ) {
    super();

    this.purchaseService = purchaseService;
  }

  @httpGet("/", authMiddleware)
  public async index(
    @request() req: express.Request
  ): Promise<interfaces.IHttpActionResult> {
    const { limit, offset } = req.query;

    const list = await this.purchaseService.list(
      Number(limit) || 0,
      Number(offset) || 10
    );

    return this.json(list);
  }

  @httpPost("/", authMiddleware, validateMiddleware(createPurchaseSchema))
  public async store(
    @request() req: express.Request
  ): Promise<interfaces.IHttpActionResult> {
    const puschase = req.body;

    const id = await this.purchaseService.create(puschase);

    return this.json({ id, ...puschase }, 201);
  }

  @httpPut("/:id", authMiddleware, validateMiddleware(editPurchaseSchema))
  public async update(
    @requestParam("id") id: number,
    @request() req: express.Request
  ): Promise<interfaces.IHttpActionResult> {
    const purchase = req.body;

    await this.purchaseService.update(id, purchase);

    return this.statusCode(204);
  }

  @httpDelete("/:id", authMiddleware)
  public async destroy(
    @requestParam("id") id: number
  ): Promise<interfaces.IHttpActionResult> {
    await this.purchaseService.delete(id);

    return this.statusCode(204);
  }
}
