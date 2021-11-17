import express, { Request, Response } from "express";

class SellerController {
  public path = "/sellers";
  public router = express.Router();

  private intializeRoutes() {
    this.router.post(`${this.path}/auth`, this.authenticate);
    this.router.post(this.path, this.store);
    this.router.get(`${this.path}/cashback`, this.cashback);
  }

  constructor() {
    this.intializeRoutes();
  }

  private authenticate(request: Request, response: Response) {
    response.status(200);
  }

  private store(request: Request, response: Response) {
    response.status(201);
  }

  private cashback(request: Request, response: Response) {
    response.status(200);
  }
}

export default SellerController;
