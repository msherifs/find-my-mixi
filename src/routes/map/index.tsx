import {
	ClientOnly,
	createFileRoute,
	redirect,
	useLoaderData,
} from "@tanstack/react-router";
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

import LocationMarker from "@/components/map/location-marker";
import "./map.css";
import CatDetailsModal from "@/components/map/cat-details-modal";
import CenterLocationButton from "@/components/map/center-location-button";
import IAmTheOwnerModal from "@/components/map/i-am-the-owner-modal";
import MapHeader from "@/components/map/map-header";
import { useIsMobile } from "@/hooks/use-mobile";
import { getCurrentUserFn, getIsAuthenticated } from "@/server/functions/auth";

export const Route = createFileRoute("/map/")({
	component: RouteComponent,
	beforeLoad: async () => {
		const isAuthenticated = await getIsAuthenticated();
		if (!isAuthenticated) {
			throw redirect({ to: "/" });
		}
	},
	loader: async () => {
		const user = await getCurrentUserFn();
		return user.user;
	},
});

function RouteComponent() {
	const isMobile = useIsMobile();
	const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
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
				/>
				<TileLayer
					// url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					// url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
					url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
					subdomains={["mt0", "mt1", "mt2", "mt3"]}
				/>
				<ZoomControl position="bottomleft" />
				<ClientOnly>
					<LocationMarker />
				</ClientOnly>
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
										setIsOwnerModalOpen(true);
									}}
								/>
							</Popup>
						)}
					</Marker>
				))}
				{isMobile && selectedMarker !== null && !isOwnerModalOpen && (
					<CatDetailsModal
						isOpen={selectedMarker !== null}
						onClose={() => setSelectedMarker(null)}
						onClickIAmTheOwner={() => {
							setIsOwnerModalOpen(true);
						}}
					/>
				)}
				<CenterLocationButton />
			</MapContainer>
		</div>
	);
}

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
