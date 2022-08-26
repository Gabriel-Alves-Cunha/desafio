import type { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";

import { Cart, getCarts } from "./getCarts";

/**
 * Retorna as compras de um usuário, passando seu
 * 'id' na 'query' da requisição.
 */
export const cartHistoryRoute: ServerRoute = Object.freeze({
	path: "/cart-history/{userId}",
	method: "GET",
	handler,
});

async function handler(
	request: Request,
	_response: ResponseToolkit
): Promise<void> {
	// @ts-ignore => hapi shows with dot notation:
	const userId: UserID = request.query.userId;

	const items: Cart[] = await getCarts(userId);

	console.log("items:", items, "\n\nuserId:", userId);
}

export type UserID = number;
