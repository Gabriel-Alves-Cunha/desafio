import { afterAll, afterEach, beforeAll } from "vitest";

import { interceptorServer } from "./mocks/interceptorServer";

beforeAll(() => {
	interceptorServer.listen({ onUnhandledRequest: "error" });
});

//  Close server after all tests
afterAll(() => {
	console.log("Closing interceptor and api server!");

	interceptorServer.close();
});

// Reset handlers after each test `important for test isolation`
afterEach(() => {
	console.log("Reseting interceptor!");

	interceptorServer.resetHandlers();
});
