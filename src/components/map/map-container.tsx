"use client";
import L from "leaflet";
import { useState } from "react";
import { renderToString } from "react-dom/server";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	ZoomControl,
} from "react-leaflet";
import CatImage from "@/assets/images/demo-image.svg";
import GreenPin from "@/assets/images/green-pin.svg";
import RedPin from "@/assets/images/red-pin.svg";
import { useIsMobile } from "@/hooks/use-mobile";
import type { UserRole } from "@/server/db/enums";
import CatDetailsModal from "./cat-details-modal";
import CenterLocationButton from "./center-location-button";
import LocationMarker from "./location-marker";
import MapHeader from "./map-header";

import "@/styles/map.css";

const createCustomIconGreen = () => {
	return L.divIcon({
		html: renderToString(
			<div className="flex flex-col items-center">
				<img src={GreenPin} alt="green-pin" className="h-15" />
				<img
					src={CatImage}
					alt="cat-image"
					className="rounded-full w-9 h-9 bottom-[53px] relative"
				/>
			</div>,
		),
		className: "custom-div-icon",
		iconSize: [30, 30],
		iconAnchor: [15, 30],
		popupAnchor: [0, -30],
	});
};

const createCustomIconRed = () => {
	return L.divIcon({
		html: renderToString(
			<div className="flex flex-col items-center">
				<img src={RedPin} alt="red-pin" className="h-15" />
				<img
					src={CatImage}
					alt="cat-image"
					className="rounded-full w-9 h-9 bottom-[53px] relative"
				/>
			</div>,
		),
		className: "custom-div-icon",
		iconSize: [30, 30],
		iconAnchor: [15, 30],
		popupAnchor: [0, -30],
	});
};

export function MixiMapContainer({
	user,
	markers,
	openOwnerModal,
}: {
	user: { firstName: string; lastName: string; role: UserRole };
	markers: { lat: number; lng: number; label: string }[];
	openOwnerModal: () => void;
}) {
	const isMobile = useIsMobile();
	const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

	return (
		<MapContainer
			center={[19.4326, -99.1332]}
			zoom={50}
			scrollWheelZoom={false}
			className="h-full"
			zoomControl={false}
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
			<LocationMarker />
			{markers.map((m, i) => (
				<Marker
					key={`${m.lat}_${m.lng}_${m.label}`}
					position={[m.lat, m.lng]}
					icon={i % 2 === 0 ? createCustomIconGreen() : createCustomIconRed()}
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
							offset={[0, 610]}
						>
							<CatDetailsModal
								onClickIAmTheOwner={() => {
									openOwnerModal();
								}}
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
				/>
			)}
			<CenterLocationButton />
		</MapContainer>
	);
}
