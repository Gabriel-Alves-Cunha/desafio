import type { TopGeoLocationResponse } from "@server/routes/top-geo-shopping";

import { describe, test, expect } from "vitest";

///////////////////////////////////////
///////////////////////////////////////

describe("Testing route '/top-geo-shopping'", () => {
	///////////////////////////////////////
	///////////////////////////////////////

	test("Testing if route succeeds and response is correct", async () => {
		const res = await fetch("http://0.0.0.0:3000/top-geo-shopping");
		const topRegion: TopGeoLocationResponse = await res.json();

		const expected: TopGeoLocationResponse = {
			topRegion: {
				lat: "-37.3159",
				long: "81.1496",
			},
			products: [
				// For some reason, vitest is comparing by position,
				// so we have to mantain the same position here:
				{ productId: 2, quantity: 4 },
				{ productId: 1, quantity: 10 },
				{ productId: 5, quantity: 2 },
			],
		};

		// console.log("topRegion =", topRegion, "expected =", expected);

		expect(topRegion).toEqual(expected);
	});
});
