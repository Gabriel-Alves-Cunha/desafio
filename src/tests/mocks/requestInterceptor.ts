import { graphql, rest } from "msw";

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
// For some reason, nothing is being intercepted :(
export const restHandlers = [
	rest.all(mockedFetchURL, (req, res, ctx) => {
		console.log("[in rest handler]", req, res, ctx);

		return res(ctx.status(200), ctx.json(cart));
	}),

	graphql.operation((req, res, ctx) => {
		console.log("[in graphql handler]", req, res, ctx);

		return res(
			ctx.errors([
				{
					message: "Access denied",
					positions: [1, 92],
				},
			])
		);
	}),
];
