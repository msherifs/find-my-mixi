import { Navigation } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMap } from "react-leaflet";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const CenterLocationButton = () => {
	const map = useMap();
	const { t } = useTranslation("");
	const [position, setPosition] = useState<[number, number] | null>(null);
	const isMobile = useIsMobile();

	useEffect(() => {
		if (!navigator.geolocation) return;

		const watcher = navigator.geolocation.watchPosition(
			(pos) => {
				const { latitude, longitude } = pos.coords;
				setPosition([latitude, longitude]);
			},
			(err) => console.error(err),
			{ enableHighAccuracy: true, maximumAge: 10000, timeout: 2000 },
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
			className={cn(
				"fixed bottom-[4vh] right-[4vw] z-1000 shadow-none border-[#ECECEC]",
				isMobile && "w-10 h-10 rounded-full",
			)}
			variant={"secondary"}
		>
			<Navigation fill="#1961E5" color="#1961E5" className="w-24" />
			{!isMobile && (
				<p className="text-[#1961E5] font-semibold text-sm leading-5 tracking-normal">
					{t("map.center_my_location")}
				</p>
			)}
		</Button>
	);
};
export default CenterLocationButton;
