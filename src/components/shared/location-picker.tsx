import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect } from "react";
import {
	MapContainer,
	Marker,
	TileLayer,
	useMap,
	useMapEvents,
} from "react-leaflet";

const DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({
	position,
	setPosition,
}: {
	position: LatLngExpression | null;
	setPosition: (position: LatLngExpression) => void;
}) {
	useMapEvents({
		click(e) {
			setPosition([e.latlng.lat, e.latlng.lng]);
		},
	});

	return position ? <Marker position={position} /> : null;
}

function MapLocationPicker({
	position,
	setPosition,
	errorMessage,
}: {
	position: LatLngExpression | null;
	setPosition: (position: LatLngExpression) => void;
	errorMessage?: string;
}) {
	const center: LatLngExpression = [19.4326, -99.1332];

	return (
		<div className="w-full space-y-2">
			<MapContainer
				center={center}
				zoom={50}
				className="h-[230px] w-full rounded-[12px] border-1 border-[#E9EAEB]"
			>
				<TileLayer
					url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
					subdomains={["mt0", "mt1", "mt2", "mt3"]}
				/>
				<LocationMarker position={position} setPosition={setPosition} />
				<CenterLocation />
			</MapContainer>
			{errorMessage && <p className="text-sm text-red-700">{errorMessage}</p>}
		</div>
	);
}

const CenterLocation = () => {
	const map = useMap();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <false>
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					const userLocation: LatLngExpression = [
						pos.coords.latitude,
						pos.coords.longitude,
					];
					map.setView(userLocation, 50);
				},
				(error) => {
					console.error("Error getting location:", error);
				},
			);
		}
	}, []);
	return null;
};

export default MapLocationPicker;
