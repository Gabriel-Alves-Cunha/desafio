import { initServer } from "@server";
import { routes } from "@server/routes";

const server = await initServer(routes);
