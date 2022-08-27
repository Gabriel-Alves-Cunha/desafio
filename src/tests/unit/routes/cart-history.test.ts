import type { CartHistoryResponse } from "@server/routes/cart-history";

import { describe, test, expect } from "vitest";

///////////////////////////////////////
///////////////////////////////////////

describe("Testing route '/cart-history/{userId}'", () => {
	///////////////////////////////////////
	///////////////////////////////////////

	test("Testing if validation succeeds and response is correct", async () => {
		const res = await fetch("http://0.0.0.0:3000/cart-history/5");
		const cart: CartHistoryResponse = await res.json();

		const expected: CartHistoryResponse = {
			email: "derek@gmail.com",
			fullName: "derek powell",
			products: [
				{
					productId: 7,
					quantity: 1,
				},
				{
					productId: 8,
					quantity: 1,
				},
			],
		};

		expect(cart).toEqual(expected);
	});

	///////////////////////////////////////
	///////////////////////////////////////

	test("Testing if validation fails", async () => {
		const res = await fetch("http://0.0.0.0:3000/cart-history/-5");

		const error = {
			message:
				'Param field "userId" must be a defined positive integer number. Received: `-5`, with type: `number`.',
			error: "Bad Request",
			statusCode: 400,
		};

		expect(await res.json()).toEqual(error);
	});
});
