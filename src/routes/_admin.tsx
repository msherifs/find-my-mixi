import {
	createFileRoute,
	Outlet,
	redirect,
	useLoaderData,
} from "@tanstack/react-router";
import { AdminAppSidebar } from "@/components/admin/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentUserFn } from "@/server/functions/auth";

export const Route = createFileRoute("/_admin")({
	component: AdminIndexPage,
	loader: async () => {
		const { user } = await getCurrentUserFn();
		if (!user || user.role !== "ADMIN") {
			throw redirect({ to: "/map" });
		}
		return { user };
	},
});

function AdminIndexPage() {
	const { user } = useLoaderData({ from: "/_admin" });
	return (
		<SidebarProvider>
			<AdminAppSidebar
				user={{
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
				}}
			/>
			<SidebarInset className="!my-4 !mr-4 bg-white">
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					<Outlet />
					<div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
