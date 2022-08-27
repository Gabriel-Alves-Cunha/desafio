import { setupServer } from "msw/node";

import { restHandlers } from "./requestInterceptor";

// This configures a Service Worker with the given request handlers:
export const interceptorServer = setupServer(...restHandlers);
