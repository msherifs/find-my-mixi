import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>mew, mew. click on the desired tab to navigate</h1>
    </div>
  );
}
