/** biome-ignore-all lint/suspicious/noExplicitAny: <false> */

import L from "leaflet";
import { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import { Marker, useMap } from "react-leaflet";

function LocationMarker() {
	const [position, setPosition] = useState<any | null>(null);
	const map = useMap();

	useEffect(() => {
		if (!navigator.geolocation) return;

		const watcher = navigator.geolocation.watchPosition(
			(pos) => {
				const { latitude, longitude } = pos.coords;
				const newPos: [number, number] = [latitude, longitude];
				setPosition(newPos);
				map.setView(newPos, 50);
			},
			(err) => console.error(err),
			{ enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 },
		);

		return () => navigator.geolocation.clearWatch(watcher);
	}, [map]);

	return position === null ? null : (
		<Marker position={position} icon={createCustomIcon()} />
	);
}

export default LocationMarker;

const CustomMarkerIcon = () => (
	<div className="relative w-11 h-11 flex items-center justify-center">
		<div className="absolute rounded-full w-11 h-11 bg-[#3478F533] animate-ping" />
		<div className="relative rounded-full w-6 h-6 bg-[#3478F5] border-2 border-white" />
	</div>
);

const createCustomIcon = () => {
	return L.divIcon({
		html: renderToString(<CustomMarkerIcon />),
		className: "custom-div-icon",
		iconSize: [30, 30],
		iconAnchor: [15, 30],
		popupAnchor: [0, -30],
	});
};
