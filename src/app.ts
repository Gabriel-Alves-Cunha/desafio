import Koa, { type Context } from "koa";
import bodyParser from "koa-bodyparser";

import { router } from "./router";

export const app = new Koa();

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());

app.on("error", (err: unknown, _ctx: Context) => {
	console.error(err);
});
