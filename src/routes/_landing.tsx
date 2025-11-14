import { createFileRoute, Outlet } from "@tanstack/react-router";
import LandingFooter from "@/components/landing/landing-footer";
import LandingHeader from "@/components/landing/landing-header";
import { getCurrentUserFn } from "@/server/functions/auth";

export const Route = createFileRoute("/_landing")({
	component: RouteComponent,
	loader: async () => {
		const { user } = await getCurrentUserFn();
		return user;
	},
});

function RouteComponent() {
	return (
		<div className="min-h-screen min-h-[100dvh] flex flex-col" id="home">
			<LandingHeader />
			<div className="flex-grow">
				<Outlet />
			</div>
			<LandingFooter />
		</div>
	);
}
