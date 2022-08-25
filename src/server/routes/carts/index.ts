import type { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";

/**
 * Receber os dados da rota '/carts' recebendo os 'ids'
 * dos produtos comprados e os 'ids' dos clientes.
 */
export const cartsRoute: ServerRoute = Object.freeze({
	path: "/carts",
	method: "GET",
	handler,
});

function handler(request: Request, response: ResponseToolkit): void {}
