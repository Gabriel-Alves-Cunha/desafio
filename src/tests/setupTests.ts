import { afterAll, afterEach, beforeAll, vi } from "vitest";

import { interceptorServer } from "./mocks/interceptorServer";
import { apiServer } from "@src";

///////////////////////////////////////

// Establish API mocking before all tests.
beforeAll(() => {
	interceptorServer.listen({ onUnhandledRequest: "error" });
});

///////////////////////////////////////

// Clean up after the tests are finished.
afterAll(() => {
	console.log("Closing interceptor and api server!");

	interceptorServer.close();
	apiServer.stop();
});

///////////////////////////////////////

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
	console.log("Reseting interceptor!");

	interceptorServer.resetHandlers();
});
