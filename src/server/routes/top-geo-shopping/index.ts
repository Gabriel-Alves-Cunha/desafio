import type { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";

/**
 * Retorna a região com o maior número de produtos comprados.
 */
export const topGeoShoppingRoute: ServerRoute = Object.freeze({
	path: "/top-geo-shopping",
	method: "GET",
	handler,
});

function handler(request: Request, response: ResponseToolkit): void {}
