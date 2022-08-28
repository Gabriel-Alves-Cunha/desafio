import type { Context } from "koa";

import { type Product, getCart } from "@api/cart";
import { queryValidator } from "@src/validation/validator";
import { getUser } from "@api/user";

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// Main function:

/**
 * Passando o 'id' na 'query' da requisição, retorna
 * um JSON com o nome do cliente, email e um vetor
 * com suas últimas compras na rota 'cart-history'.
 */
export async function cartHistory(ctx: Context): Promise<void> {
	ctx.type = "json";

	// Get query params:
	// @ts-ignore => `ctx.params` does exists:
	const userId = Number(ctx.params.userId);

	// Validate params:
	const isValidOrError = queryValidator(userId);
	if (isValidOrError !== true) {
		const error = new Error(
			`Param field "userId" must be a defined positive integer number. Received: \`${userId}\`, with type: \`${typeof userId}\`.`
		);

		ctx.body = { data: null, error: error.message };
		ctx.app.emit("error", error, ctx);
		ctx.status = 400;

		return;
	}

	const [cart, user] = await Promise.all([
		await getCart(userId),
		await getUser(userId),
	]).catch(err => {
		ctx.body = { data: null, error: "Error getting cart and user!" };
		ctx.status = 400;

		throw err;
	});

	const data: CartHistoryResponse = {
		fullName: `${user.name.firstname} ${user.name.lastname}`,
		products: cart.products,
		email: user.email,
	};

	ctx.body = { data, error: null };
}

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// Types:

export type CartHistoryResponse = Readonly<{
	products: readonly Product[];
	fullName: string;
	email: string;
}>;
