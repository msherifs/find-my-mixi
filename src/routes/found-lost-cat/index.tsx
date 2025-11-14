import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/found-lost-cat/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/found-lost-cat/"!</div>;
}
