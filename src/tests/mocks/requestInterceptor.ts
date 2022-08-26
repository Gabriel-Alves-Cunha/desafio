import { rest } from "msw";

import { mockedFetchURL } from "../utils";

/** Mock of the 'fetch' response. */
const cart = Object.freeze({
	date: "2020-03-01T00:00:02.000Z",
	userId: 3,
	id: 5,
	products: [
		{
			productId: 74,
			quantity: 1,
		},
		{
			productId: 854,
			quantity: 1,
		},
	],
});

console.log("[On request interceptor file] cart =", cart);

/**
 * Setting up an interceptor of all requests so we can mock
 * test responses without relying on internet.
 *
 * This is taken directly from 'vitest' docs.
 */
export const restHandlers = [
	rest.all(mockedFetchURL, (_req, res, ctx) => {
		console.log("[in rest handler]");

		return res(ctx.status(200), ctx.json(cart));
	}),

	// For some reason, nothing is being intercepted :(
	rest.all("/*", (req, res, ctx) => {
		console.log("Matched all *", req, res, ctx);
	}),
];
