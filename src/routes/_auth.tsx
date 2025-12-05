import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="relative min-h-screen min-h-[100dvh] flex flex-col">
			<div className="flex-grow flex justify-center items-center">
				<Outlet />
			</div>
			<footer className="h-[96px] w-full border-t border-[#F1F1F1] p-8 flex items-center justify-end font-normal text-sm leading-5 tracking-normal text-gray-600">
				© FindMyMixi 2024
			</footer>
		</div>
	);
}
