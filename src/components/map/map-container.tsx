"use client";
import L from "leaflet";
import { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	ZoomControl,
} from "react-leaflet";
import GreenPin from "@/assets/images/green-pin.svg";
import RedPin from "@/assets/images/red-pin.svg";
import { useIsMobile } from "@/hooks/use-mobile";
import { CatFormType, type UserRole } from "@/server/db/enums";
import CatDetailsModal from "./cat-details-modal";
import CenterLocationButton from "./center-location-button";
import MapHeader from "./map-header";
import MyLocationMarker from "./my-location-marker";

import "@/styles/map.css";
import type { CatRequestDocument } from "@/server/db/schema";
import { getCatRequestsForMap } from "@/server/functions/cat-reporting";

const createCustomIconGreen = ({ image }: { image: string }) => {
	return L.divIcon({
		html: renderToString(
			<div className="flex flex-col items-center">
				<img src={GreenPin} alt="green-pin" className="h-15" />
				<img
					src={image}
					alt="cat-image"
					className="rounded-full !w-9 h-9 bottom-[53px] relative object-cover"
				/>
			</div>,
		),
		className: "custom-div-icon",
		iconSize: [30, 30],
		iconAnchor: [15, 30],
		popupAnchor: [0, -30],
	});
};

const createCustomIconRed = ({ image }: { image: string }) => {
	return L.divIcon({
		html: renderToString(
			<div className="flex flex-col items-center">
				<img src={RedPin} alt="red-pin" className="h-15" />
				<img
					src={image}
					alt="cat-image"
					className="rounded-full !w-9 h-9 bottom-[53px] relative object-cover"
				/>
			</div>,
		),
		className: "custom-div-icon",
		iconSize: [30, 30],
		iconAnchor: [15, 30],
		popupAnchor: [0, -30],
	});
};

export type CatRequest = Omit<CatRequestDocument, "_id"> & { _id: string };

export function MixiMapContainer({
	user,
	openOwnerModal,
}: {
	user: { firstName: string; lastName: string; role: UserRole };
	openOwnerModal: () => void;
}) {
	const isMobile = useIsMobile();
	const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
	const [catRequests, setCatRequests] = useState<CatRequest[]>([]);

	return (
		<MapContainer
			center={[19.4326, -99.1332]}
			zoom={50}
			scrollWheelZoom={false}
			className="h-full"
		>
			<MapHeader
				firstName={user?.firstName || ""}
				lastName={user?.lastName || ""}
				role={user?.role || "USER"}
			/>
			<TileLayer
				url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
				subdomains={["mt0", "mt1", "mt2", "mt3"]}
			/>
			<ZoomControl position="bottomleft" />
			<MyLocationMarker />
			{catRequests.map((m, i) => (
				<Marker
					key={m._id}
					position={[
						m.location.geoPoint.coordinates[0],
						m.location.geoPoint.coordinates[1],
					]}
					icon={
						m.type === CatFormType.REPORT_CAT_FOUND
							? createCustomIconGreen({ image: m.catDetails.photo })
							: createCustomIconRed({ image: m.catDetails.photo })
					}
					eventHandlers={{
						click: () => {
							if (isMobile) {
								setSelectedMarker(i);
							}
						},
					}}
				>
					{!isMobile && (
						<Popup
							closeButton={false}
							className="custom-popup"
							offset={[0, 600]}
						>
							<CatDetailsModal
								onClickIAmTheOwner={() => {
									openOwnerModal();
								}}
								catData={m}
							/>
						</Popup>
					)}
				</Marker>
			))}
			{isMobile && selectedMarker !== null && (
				<CatDetailsModal
					isOpen={selectedMarker !== null}
					onClose={() => setSelectedMarker(null)}
					onClickIAmTheOwner={() => {
						openOwnerModal();
					}}
					catData={catRequests[selectedMarker]}
				/>
			)}
			<CenterLocationButton />
			<MapBoundsTracker setRequests={setCatRequests} />
		</MapContainer>
	);
}

function MapBoundsTracker({
	setRequests,
}: {
	setRequests: (requests: CatRequest[]) => void;
}) {
	const map = useMap();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <false>
	useEffect(() => {
		const updateBounds = async () => {
			// Get the current bounds
			const bounds = map.getBounds();

			// Extract corner coordinates
			const northEast = bounds.getNorthEast();
			const southWest = bounds.getSouthWest();
			const northWest = bounds.getNorthWest();
			const southEast = bounds.getSouthEast();

			// Create polygon coordinates (clockwise or counter-clockwise)
			const polygon = [
				[
					[northWest.lat, northWest.lng],
					[northEast.lat, northEast.lng],
					[southEast.lat, southEast.lng],
					[southWest.lat, southWest.lng],
					[northWest.lat, northWest.lng],
				],
			];

			const { catRequests } = await getCatRequestsForMap({ data: { polygon } });
			setRequests(catRequests);
		};

		// Update on map move/zoom
		map.on("moveend", updateBounds);
		map.on("zoomend", updateBounds);

		// Initial update
		updateBounds();

		return () => {
			map.off("moveend", updateBounds);
			map.off("zoomend", updateBounds);
		};
	}, [map]);

	return null;
}
