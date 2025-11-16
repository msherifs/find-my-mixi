import {
	ClientOnly,
	createFileRoute,
	redirect,
	useLoaderData,
} from "@tanstack/react-router";
import { useState } from "react";

import IAmTheOwnerModal from "@/components/map/i-am-the-owner-modal";
import { MixiMapContainer } from "@/components/map/map-container";
import { getCurrentUserFn } from "@/server/functions/auth";

export const Route = createFileRoute("/$lang/map/")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const { user } = await getCurrentUserFn();
		if (!user) {
			throw redirect({ to: "/$lang", params: { lang: params.lang } });
		}
		return user;
	},
});

function RouteComponent() {
	const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
	const user = useLoaderData({ from: "/$lang/map/" });

	return (
		<div className="h-screen h-[100dvh] w-screen">
			<IAmTheOwnerModal
				isOpen={isOwnerModalOpen}
				onClose={() => setIsOwnerModalOpen(false)}
			/>
			<ClientOnly>
				<MixiMapContainer
					user={user}
					openOwnerModal={() => setIsOwnerModalOpen(true)}
				/>
			</ClientOnly>
		</div>
	);
}
