import express, { Request, Response } from "express";

class PurchaseController {
  public path = "/purchases";
  public router = express.Router();

  private intializeRoutes() {
    this.router.get(this.path, this.index);
    this.router.post(this.path, this.store);
    this.router.put(this.path, this.update);
    this.router.delete(this.path, this.destroy);
  }

  constructor() {
    this.intializeRoutes();
  }

  private index(request: Request, response: Response) {
    response.status(200);
  }

  private store(request: Request, response: Response) {
    response.status(201);
  }

  private update(request: Request, response: Response) {
    response.status(204);
  }

  private destroy(request: Request, response: Response) {
    response.status(204);
  }
}

export default PurchaseController;
