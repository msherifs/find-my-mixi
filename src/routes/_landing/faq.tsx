import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_landing/faq")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_landing/faq"!</div>;
}
