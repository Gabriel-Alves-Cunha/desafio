import type { Context } from "koa";

import { type GeoLocation, getAllUsers } from "@api/user";
import { type Product, getAllCarts } from "@api/cart";

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// Main function:

/**
 * Retorna a região com o maior número de produtos comprados.
 */
export async function topGeoShopping(ctx: Context): Promise<void> {
	ctx.type = "json";

	const [allCarts, allUsers] = await Promise.all([
		await getAllCarts(),
		await getAllUsers(),
	]).catch(err => {
		ctx.body = { data: null, error: "Error getting all carts and all users!" };
		ctx.status = 400;

		throw err;
	});

	let mostProductsBoughByRegion: TopGeoLocationResponse = {
		topRegion: { long: "", lat: "" },
		products: [],
	};

	allCarts.forEach(cart => {
		const user = allUsers.find(({ id }) => id === cart.userId);

		if (user === undefined) {
			const error = new Error(
				`User with id = \`${cart.userId}\` was not found!`
			);

			ctx.app.emit("error", error, ctx);

			return;
		}

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

	ctx.body = { data: mostProductsBoughByRegion, error: null };
}

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// Types:

export type TopGeoLocationResponse = Readonly<{
	products: readonly Product[];
	topRegion: GeoLocation;
}>;
