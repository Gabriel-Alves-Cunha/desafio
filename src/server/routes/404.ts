import type { ServerRoute } from "@hapi/hapi";

import { Boom, notFound } from "@hapi/boom";

/**
 * 404 errors will happen whenever your server
 * can't find what was the resource that was
 * requested. It is best practice to handle
 * these errors the proper way.
 */
export const _404Route: ServerRoute = Object.freeze({
	handler: () => {
		throw new Boom(notFound("Page Not Found!"));
	},
	path: "/{any*}",
	method: "*",
});
