import type { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";

import { Boom, badRequest, notFound } from "@hapi/boom";

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
export const cartHistoryRoute: ServerRoute = Object.freeze({
	path: "/cart-history/{userId}",
	method: "GET",
	handler,
});

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// Helper function:

async function handler(
	request: Request,
	_response: ResponseToolkit
): Promise<CartHistoryResponse> {
	// Get query params:
	// @ts-ignore => 'hapi' shows with dot notation:
	const userId: UserID = Number(request.params.userId);

	// Validate params:
	const isValidOrError = queryValidator(userId);

	if (isValidOrError !== true)
		throw new Boom(
			badRequest(
				`Param field "userId" must be a defined positive integer number. Received: \`${userId}\`, with type: \`${typeof userId}\`.`,
				isValidOrError
			)
		);

	const [cart, user] = await Promise.all([
		await getCart(userId),
		await getUser(userId),
	]).catch(err => {
		console.error("Error getting cart and user!", err);

		throw new Boom(notFound("Error getting cart and user!"));
	});

	const response: CartHistoryResponse = {
		fullName: `${user.name.firstname} ${user.name.lastname}`,
		products: cart.products,
		email: user.email,
	};

	return response;
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
