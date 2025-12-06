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
import { useSearch } from "@tanstack/react-router";
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

function clampCoord(lng: number, lat: number) {
	const safeLng = Math.max(-180, Math.min(180, lng));
	const safeLat = Math.max(-90, Math.min(90, lat));
	return [safeLng, safeLat];
}

export function MixiMapContainer({
	user,
	openOwnerModal,
}: {
	user: { firstName: string; lastName: string; role: UserRole };
	openOwnerModal: (catData: CatRequest) => void;
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
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<ZoomControl position="bottomleft" />
			<MyLocationMarker />
			{catRequests.map((m, i) => (
				<Marker
					key={m._id}
					position={[
						m.location.geoPoint.coordinates[1], // lat (stored as second coordinate)
						m.location.geoPoint.coordinates[0], // lng (stored as first coordinate)
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
									openOwnerModal(m);
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
						if (selectedMarker !== null) {
							openOwnerModal(catRequests[selectedMarker]);
						}
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
	const searchParams = useSearch({ from: "/map/" });
	const map = useMap();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <false>
	useEffect(() => {
		let isInitialLoad = true;
		let timeoutId: NodeJS.Timeout | null = null;

		const updateBounds = async () => {
			// Clear any pending timeout
			if (timeoutId) {
				clearTimeout(timeoutId);
			}

			// Debounce the update
			timeoutId = setTimeout(async () => {
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
						clampCoord(northWest.lng, northWest.lat),
						clampCoord(northEast.lng, northEast.lat),
						clampCoord(southEast.lng, southEast.lat),
						clampCoord(southWest.lng, southWest.lat),
						clampCoord(northWest.lng, northWest.lat), // close the ring
					],
				];

				const { catRequests } = await getCatRequestsForMap({
					data: { polygon, ...searchParams },
				});
				setRequests(catRequests);
			}, 300); // 300ms debounce
		};

		// Update on map move/zoom
		map.on("moveend", updateBounds);
		map.on("zoomend", updateBounds);

		// Initial update - only once
		if (isInitialLoad) {
			updateBounds();
			isInitialLoad = false;
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			map.off("moveend", updateBounds);
			map.off("zoomend", updateBounds);
		};
	}, [map, searchParams]);

	return null;
}
