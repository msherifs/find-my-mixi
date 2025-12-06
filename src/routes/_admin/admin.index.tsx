import { createFileRoute } from "@tanstack/react-router";
import { Cat } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col items-center justify-center h-full bg-gray-50 text-center">
			<Cat className="w-20 h-20 text-primary drop-shadow-md" />
			<h1 className="text-2xl font-semibold text-gray-800">
				Mew, mew — Welcome to the Admin Zone 🐾
			</h1>
			<p className="text-gray-500 max-w-md">
				This is your cozy command center. Choose a tab from the sidebar to start
				managing things!
			</p>
		</div>
	);
}
