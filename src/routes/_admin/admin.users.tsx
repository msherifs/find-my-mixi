import { createFileRoute } from "@tanstack/react-router";
// import { type UserDocument } from "@/server/db/schema";
// import { ObjectId } from "mongodb";
import { UserTable } from "@/components/admin/users/table";

export const Route = createFileRoute("/_admin/admin/users")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<UserTable data={[]} />
		</div>
	);
}
