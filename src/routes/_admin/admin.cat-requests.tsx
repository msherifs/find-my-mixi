import { CatRequestsTable } from "@/components/admin/cat-requests/table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/cat-requests")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <CatRequestsTable
        data={[
          {
            id: "1",
            userFullName: "John Doe",
            requestType: "FIND_MY_CAT",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            catName: "Fluffy",
          },
        ]}
      ></CatRequestsTable>
    </div>
  );
}
