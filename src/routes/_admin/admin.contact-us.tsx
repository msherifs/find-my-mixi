import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import z from "zod";
import { ContactUsTable } from "@/components/admin/contact-us/table";
import MixiSelect from "@/components/shared/mixi-select";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { formatEnumString } from "@/lib/utils";
import { ContactUsTopic } from "@/server/db/enums";
import { getContactUsSubmissionsFn } from "@/server/functions/admin/contact-us";

export const Route = createFileRoute("/_admin/admin/contact-us")({
	component: RouteComponent,
	validateSearch: z.object({
		pageNumber: z.coerce.number().min(1).max(100).default(1),
		pageSize: z.coerce.number().min(1).max(100).default(10),
		topic: z.enum(ContactUsTopic).optional(),
		searchTerm: z.string().optional(),
	}),
	loaderDeps: ({ search }) => [search],
	loader: async ({ deps }) => {
		const { pageNumber, pageSize, topic, searchTerm } = deps[0];
		return await getContactUsSubmissionsFn({
			data: { pageNumber, pageSize, topic, searchTerm },
		});
	},
});

function RouteComponent() {
	const { contactUsSubmissions, count } = Route.useLoaderData();
	const { pageNumber, pageSize, topic, searchTerm } = Route.useSearch();
	const navigate = Route.useNavigate();
	const [inputValue, setInputValue] = useState(searchTerm || "");
	const [selectedTopic, setSelectedTopic] = useState(topic || undefined);
	const debouncedSearchTerm = useDebounce(inputValue, 500);

	useEffect(() => {
		navigate({
			search: {
				pageNumber: 1,
				pageSize,
				topic: selectedTopic,
				searchTerm: debouncedSearchTerm,
			},
		});
	}, [debouncedSearchTerm, pageSize, selectedTopic, navigate]);

	return (
		<div className="space-y-4 p-4">
			<h1 className="text-2xl font-extrabold">Contact Us Submissions</h1>
			<div className="flex items-center gap-4">
				<Input
					placeholder="Search by email"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					className="w-[400px] border-gray-200 focus-visible:outline-none focus-visible:ring-0 focus:outline-none focus:ring-0"
				/>
				<MixiSelect
					placeholder={"Filter by Topic"}
					options={Object.values(ContactUsTopic).map((topic) => ({
						label: formatEnumString(topic),
						value: topic,
					}))}
					onChange={(value) => {
						setSelectedTopic(value as ContactUsTopic | undefined);
					}}
					value={selectedTopic}
					className="w-[200px]! flex-0"
					selectClassName="h-auto!"
				/>
			</div>
			<ContactUsTable
				data={contactUsSubmissions}
				pageNumber={pageNumber}
				pageSize={pageSize}
				totalRecords={count}
			/>
		</div>
	);
}
