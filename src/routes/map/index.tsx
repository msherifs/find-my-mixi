import {
	ClientOnly,
	createFileRoute,
	redirect,
	useLoaderData,
} from "@tanstack/react-router";
import { useState } from "react";
import z from "zod";
import IAmTheOwnerModal from "@/components/map/i-am-the-owner-modal";
import { MixiMapContainer } from "@/components/map/map-container";
import {
	CatCoatType,
	CatEyeColor,
	CatFurColor,
	CatFurPattern,
	CatSize,
	CollarEmbellishment,
	CollarPattern,
	CollarSolidColor,
} from "@/server/db/enums";
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
	validateSearch: z.object({
		color: z.enum(CatFurColor).array().optional(),
		pattern: z.enum(CatFurPattern).optional(),
		coatType: z.enum(CatCoatType).optional(),
		collarColor: z.enum(CollarSolidColor).optional(),
		collarPattern: z.enum(CollarPattern).optional(),
		size: z.enum(CatSize).optional(),
		collarEmbellishments: z.enum(CollarEmbellishment).optional(),
		eyeColor: z.enum(CatEyeColor).optional(),
	}),
});

function RouteComponent() {
	const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
	const user = useLoaderData({ from: "/map/" });

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
