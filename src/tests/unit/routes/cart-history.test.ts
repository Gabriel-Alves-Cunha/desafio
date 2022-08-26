import { afterAll, describe, test, expect } from "vitest";

import { mockedFetchURL } from "@src/tests/utils";
// Turning on our 'hapi' server first:
import { apiServer } from "@src";
import "../../setupTests";

describe("Testing route '/cart-history/{userId}'", () => {
	test("Testing if validation succeeds", async () => {
		const res = await fetch("http://0.0.0.0:3000/cart-history/5");
		const cart = await res.json();

		console.log("[in test] cart =", cart);
	});
});

afterAll(() => apiServer.stop());
