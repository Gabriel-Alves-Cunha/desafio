import Router from "koa-router";

import { topGeoShopping } from "./controllers/top-geo-shopping";
import { cartHistory } from "./controllers/cart-history";

export const router = new Router();

router.get("/cart-history/:userId", cartHistory);
router.get("/top-geo-shopping", topGeoShopping);
