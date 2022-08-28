import { app } from "./app";

// @ts-ignore => This has to be bot notation:
const port = process.env.PORT || 3_000;

export const server = app.listen(port, () =>
	console.log(`🚀 Server listening http://${server.address}:${port}/ 🚀`)
);
