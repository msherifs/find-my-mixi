import { CatRequestsTable } from "@/components/admin/cat-requests/table";
import { createFileRoute } from "@tanstack/react-router";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

const coercePositiveInt = (value: unknown, fallback: number) => {
	const numericValue =
		typeof value === "number"
			? value
			: Number.parseInt(String(value ?? ""), 10);

	if (!Number.isFinite(numericValue) || numericValue < 1) {
		return fallback;
	}

	return Math.floor(numericValue);
};

export const Route = createFileRoute("/_admin/admin/cat-requests")({
	component: RouteComponent,
	validateSearch: (search) => ({
		pageNumber: coercePositiveInt(search.pageNumber, DEFAULT_PAGE_NUMBER),
		pageSize: coercePositiveInt(search.pageSize, DEFAULT_PAGE_SIZE),
	}),
});

function RouteComponent() {
	const navigate = Route.useNavigate();
	const { pageNumber, pageSize } = Route.useSearch();

	const updatePage = (nextPage: number) => {
		const safePage = Math.max(1, nextPage);
		if (safePage === pageNumber) {
			return;
		}
		void navigate({
			search: (prev) => ({
				...prev,
				pageNumber: safePage,
			}),
		});
	};

	const handleNextPage = () => {
		updatePage(pageNumber + 1);
	};

	const handlePreviousPage = () => {
		updatePage(pageNumber - 1);
	};

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
				pageNumber={pageNumber}
				pageSize={pageSize}
				onNextPage={handleNextPage}
				onPreviousPage={handlePreviousPage}
			></CatRequestsTable>
		</div>
	);
}
