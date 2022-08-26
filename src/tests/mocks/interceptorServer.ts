import { setupServer } from "msw/node";

import { restHandlers } from "./requestInterceptor";

export const interceptorServer = setupServer(...restHandlers);
