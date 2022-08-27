import type { Server, ServerRoute } from "@hapi/hapi";

import Hapi from "@hapi/hapi";

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
// Main function:

export async function initServer(
	routes: ServerRoute | ServerRoute[],
	host = "0.0.0.0",
	port = 3_000
): Promise<Server> {
	const server = Hapi.server({
		// The host property set to 'localhost' is likely
		// the safest choice. In a docker container,
		// however, the localhost may not be accessible
		// outside of the container and using host: '0.0.0.0' may be needed.
		host,
		port,
	});

	server.route(routes);

	await server.start();

	console.log(`Server running on ${server.info.uri}`);

	return server;
}

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
// Helper functions:

process.on("unhandledRejection", err => {
	console.error(err);
	process.exit(1);
});
