import App from "./app";
import SellerController from "./controllers/seller";
import PurchaseController from "./controllers/purchase";

const app = new App([new SellerController(), new PurchaseController()], 3334);

app.listen();
