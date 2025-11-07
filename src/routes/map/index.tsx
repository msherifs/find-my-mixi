import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import L from "leaflet";
import { Navigation } from "lucide-react";
import { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import { useTranslation } from "react-i18next";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import CatImage from "@/assets/images/demo-image.svg";
import GreenPin from "@/assets/images/green-pin.svg";
import RedPin from "@/assets/images/red-pin.svg";
import LocationMarker from "@/components/map/location-marker";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/map/")({
	component: RouteComponent,
});

function RouteComponent() {
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
		<div className="h-screen w-screen">
			<MapContainer
				center={[19.4326, -99.1332]}
				zoom={50}
				scrollWheelZoom={false}
				className="h-full"
			>
				<TileLayer
					// url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					// url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
					url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
					subdomains={["mt0", "mt1", "mt2", "mt3"]}
				/>
				<ClientOnly>
					<LocationMarker />
				</ClientOnly>
				{markers.map((m, i) => (
					<Marker
						key={`${m.lat}_${m.lng}_${m.label}`}
						position={[m.lat, m.lng]}
						icon={i % 2 === 0 ? createCustomIconGreen() : createCustomIconRed()}
					>
						<Popup>{m.label}</Popup>
					</Marker>
				))}
				<CenterLocationButton />
			</MapContainer>
		</div>
	);
}

const CenterLocationButton = () => {
	const map = useMap();
	const { t } = useTranslation("");
	const [position, setPosition] = useState<[number, number] | null>(null);

	useEffect(() => {
		if (!navigator.geolocation) return;

		const watcher = navigator.geolocation.watchPosition(
			(pos) => {
				const { latitude, longitude } = pos.coords;
				setPosition([latitude, longitude]);
			},
			(err) => console.error(err),
			{ enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 },
		);

		return () => navigator.geolocation.clearWatch(watcher);
	}, []);

	const handleCenterLocation = () => {
		if (position) {
			map.setView(position, 50);
		}
	};

	return (
		<Button
			onClick={handleCenterLocation}
			disabled={!position}
			className="fixed bottom-[5vh] right-[4vw] z-1000 shadow-none border-[#ECECEC] text-[#1961E5] font-semibold text-sm leading-5 tracking-normal"
			variant={"secondary"}
		>
			<Navigation fill="#1961E5" color="#1961E5" className="w-24" />
			{t("map.center_my_location")}
		</Button>
	);
};

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
