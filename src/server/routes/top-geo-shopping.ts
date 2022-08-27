import type { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";

import { Boom, badImplementation } from "@hapi/boom";

import { type GeoLocation, getAllUsers } from "@api/user";
import { type Product, getAllCarts } from "@api/cart";

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// Main function:

/**
 * Retorna a região com o maior número de produtos comprados.
 */
export const topGeoShoppingRoute: ServerRoute = Object.freeze({
	path: "/top-geo-shopping",
	method: "GET",
	handler,
});

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// Helper function:

async function handler(
	_request: Request,
	_response: ResponseToolkit
): Promise<TopGeoLocationResponse> {
	const [allCarts, allUsers] = await Promise.all([
		await getAllCarts(),
		await getAllUsers(),
	]).catch(err => {
		console.error("Error getting all carts and all users!", err);

		throw new Boom(badImplementation("Error getting all carts and all users!"));
	});

	let mostProductsBoughByRegion: TopGeoLocationResponse = {
		topRegion: { long: "", lat: "" },
		products: [],
	};

	allCarts.forEach(cart => {
		const user = allUsers.find(({ id }) => id === cart.userId);

		if (user === undefined)
			throw new Boom(
				badImplementation(`User with id = \`${cart.userId}\` was not found!`)
			);

		const thisRegion: TopGeoLocationResponse = {
			topRegion: user.address.geolocation,
			products: cart.products,
		};

		const oldNumberOfProductsBough = mostProductsBoughByRegion.products.reduce(
			(prev, curr) => prev + curr.quantity,
			0
		);
		const newNumberOfProductsBough = thisRegion.products.reduce(
			(prev, curr) => prev + curr.quantity,
			0
		);

		if (newNumberOfProductsBough > oldNumberOfProductsBough)
			mostProductsBoughByRegion = thisRegion;
	});

	console.log("mostProductsBoughByRegion =", mostProductsBoughByRegion);

	return mostProductsBoughByRegion;
}

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// Types:

export type TopGeoLocationResponse = Readonly<{
	products: readonly Product[];
	topRegion: GeoLocation;
}>;
