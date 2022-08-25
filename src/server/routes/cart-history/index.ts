import type { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";

/**
 * Retorna as compras de um usuário, passando seu
 * 'id' na 'query' da requisição.
 */
export const cartHistoryRoute: ServerRoute = Object.freeze({
	path: "/cart-history",
	method: "GET",
	handler,
	options: {
		validate: {
			payload: {}
		},
	},
});

function handler(request: Request, response: ResponseToolkit): void {}
