import type { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";

/**
 * 404 errors will happen whenever your server
 * can't find what was the resource that was
 * requested. It is best practice to handle
 * these errors the proper way.
 */
export const _404Route: ServerRoute = Object.freeze({
	path: "/{any*}",
	method: "*",
	handler,
});

function handler(_request: Request, _response: ResponseToolkit): string {
	return "404 Error! Page Not Found!";
}
