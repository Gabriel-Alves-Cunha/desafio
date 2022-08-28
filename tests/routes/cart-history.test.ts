import type { CartHistoryResponse } from "@controllers/cart-history";

import { describe, test, expect } from "vitest";
import request from "supertest";

import { app } from "@src/app";

///////////////////////////////////////
///////////////////////////////////////

describe("Testing route '/cart-history/:userId'", () => {
	///////////////////////////////////////
	///////////////////////////////////////

	test("Testing if validation succeeds and response is correct", async () => {
		const {
			body: { data: cartHistory },
		} = await request(app.callback()).get("/cart-history/5");

		const dataExpected: CartHistoryResponse = {
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

		expect(cartHistory).toEqual(dataExpected);
	});

	///////////////////////////////////////
	///////////////////////////////////////

	test("Testing if validation fails", async () => {
		const {
			body: { error },
		} = await request(app.callback()).get("/cart-history/-5");

		const errorExpected =
			'Param field "userId" must be a defined positive integer number. Received: `-5`, with type: `number`.';

		expect(error).toEqual(errorExpected);
	});
});
