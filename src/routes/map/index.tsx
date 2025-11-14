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

export const Route = createFileRoute("/map/")({
	component: RouteComponent,
	loader: async () => {
		const { user } = await getCurrentUserFn();
		if (!user) {
			throw redirect({ to: "/" });
		}
		return user;
	},
});

function RouteComponent() {
	const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
	const user = useLoaderData({ from: "/map/" });
	const markers = [
		{ lat: 30.0379, lng: 31.3448, label: "Marker 1" },
		{ lat: 30.0386, lng: 31.3419, label: "Marker 2" },
		{ lat: 30.0368, lng: 31.3395, label: "Marker 3" },
		{ lat: 30.0359, lng: 31.3433, label: "Marker 4" },
		{ lat: 30.0395, lng: 31.3462, label: "Marker 5" },
		{ lat: 30.0402, lng: 31.3438, label: "Marker 6" },
		{ lat: 30.0361, lng: 31.3455, label: "Marker 7" },
		{ lat: 30.038, lng: 31.3478, label: "Marker 8" },
		{ lat: 30.0349, lng: 31.3411, label: "Marker 9" },
		{ lat: 30.0392, lng: 31.3406, label: "Marker 10" },
	];

	return (
		<div className="h-screen h-[100dvh] w-screen">
			<IAmTheOwnerModal
				isOpen={isOwnerModalOpen}
				onClose={() => setIsOwnerModalOpen(false)}
			/>
			<ClientOnly>
				<MixiMapContainer
					user={user}
					markers={markers}
					openOwnerModal={() => setIsOwnerModalOpen(true)}
				/>
			</ClientOnly>
		</div>
	);
}
