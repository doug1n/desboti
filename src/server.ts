import App from "./app";

import SellerController from "./controllers/seller";

const app = new App([new SellerController()], 3334);

app.listen();
