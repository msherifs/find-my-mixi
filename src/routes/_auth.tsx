import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<header>Auth Header</header>
			<Outlet />
			<footer>Auth Footer</footer>
		</div>
	);
}
