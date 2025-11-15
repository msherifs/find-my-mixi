import "@/server/utils/env";
import handler, { createServerEntry } from "@tanstack/react-start/server-entry";
import { initDb } from "@/server/db";

initDb()
	.then(() => console.log("Database initialized"))
	.catch((error) => console.error("Error initializing database:", error));

export default createServerEntry({
	fetch(request) {
		return handler.fetch(request);
	},
});
