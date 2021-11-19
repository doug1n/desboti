import "reflect-metadata";
import express from "express";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";

import TYPES from "./types";

import "./controllers/purchase";
import "./controllers/seller";

import PurchaseRepositoryInterface from "./repositories/purchase.repository.interface";
import PurchaseRepositoryMySql from "./repositories/purchase.repository.mysql";
import SellerRepositoryInterface from "./repositories/seller.repository.interface";
import SellerRepositoryMySql from "./repositories/seller.repository.mysql";
import CashbackRepositoryInterface from "./repositories/cashback.repository.interface";
import CashbackRepositoryMdaqk8ek5j from "./repositories/cashback.repository.mdaqk8ek5j";

import AuthenticateServiceInterface from "./services/authenticate.service.interface";
import AuthenticateService from "./services/authenticate.service";
import CashbackServiceInterface from "./services/cashback.service.interface";
import CashbackService from "./services/cashback.service";
import PurchaseServiceInterface from "./services/purchase.service.interface";
import PurchaseService from "./services/purchase.service";

class App {
  public container: Container;

  constructor() {
    this.container = new Container();

    this.bindInterfaces();
  }

  private bindInterfaces() {
    this.container
      .bind<PurchaseRepositoryInterface>(TYPES.PurchaseRepositoryInterface)
      .to(PurchaseRepositoryMySql);

    this.container
      .bind<SellerRepositoryInterface>(TYPES.SellerRepositoryInterface)
      .to(SellerRepositoryMySql);

    this.container
      .bind<CashbackRepositoryInterface>(TYPES.CashbackRepositoryInterface)
      .to(CashbackRepositoryMdaqk8ek5j);

    this.container
      .bind<AuthenticateServiceInterface>(TYPES.AuthenticateServiceInterface)
      .to(AuthenticateService);

    this.container
      .bind<CashbackServiceInterface>(TYPES.CashbackServiceInterface)
      .to(CashbackService);

    this.container
      .bind<PurchaseServiceInterface>(TYPES.PurchaseServiceInterface)
      .to(PurchaseService);
  }

  public createServer() {
    const server: InversifyExpressServer = new InversifyExpressServer(
      this.container
    );

    server.setConfig((app) => {
      app.use(express.json());
    });

    const app = server.build();

    if (process.env.NODE_ENV !== "test") {
      app.listen(3334);
    }

    return app;
  }
}

export default App;
