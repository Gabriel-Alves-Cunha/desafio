import type { TopGeoLocationResponse } from "@controllers/top-geo-shopping";

import { describe, test, expect } from "vitest";
import request from "supertest";

import { app } from "@src/app";

///////////////////////////////////////
///////////////////////////////////////

describe("Testing route '/top-geo-shopping'", () => {
	///////////////////////////////////////
	///////////////////////////////////////

	test("Testing if route succeeds and response is correct", async () => {
		const {
			body: { data: topRegion },
		} = await request(app.callback()).get("/top-geo-shopping");

		const topRegionExpected: TopGeoLocationResponse = {
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

		expect(topRegion).toEqual(topRegionExpected);
	});
});
