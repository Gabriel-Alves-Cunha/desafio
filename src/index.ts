import { initServer } from "@server";
import { routes } from "@server/routes";

export const apiServer = await initServer(routes);
