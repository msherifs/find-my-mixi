import "@/server/utils/env";
import { RequestOptions } from "@tanstack/react-start/server";
import handler from "@tanstack/react-start/server-entry";
import { initDb } from "@/server/db";

initDb()
	.then(() => console.log("Database initialized"))
	.catch((error) => console.error("Error initializing database:", error));

export default {
	fetch(request: Request, opts?: RequestOptions) {
		return handler.fetch(request, opts);
	},
};
