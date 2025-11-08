import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/cat-requests")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/cat-requests"!</div>;
}
