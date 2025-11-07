import {
	ClientOnly,
	createFileRoute,
	useNavigate,
} from "@tanstack/react-router";
import L from "leaflet";
import { Filter, MoreVertical, Navigation } from "lucide-react";
import { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import { useTranslation } from "react-i18next";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	ZoomControl,
} from "react-leaflet";
import CatImage from "@/assets/images/demo-image.svg";
import GreenPin from "@/assets/images/green-pin.svg";
import HeaderIcon from "@/assets/images/header-icon.svg";
import RedPin from "@/assets/images/red-pin.svg";
import YellowPin from "@/assets/images/yellow-pin.svg";
import LocationMarker from "@/components/map/location-marker";
import { Button } from "@/components/ui/button";
import "./map.css";
import MixiSelect from "@/components/shared/mixi-select";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/map/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation("");
	const navigate = useNavigate();
	const isMobile = useIsMobile();
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
			<MapContainer
				center={[19.4326, -99.1332]}
				zoom={50}
				scrollWheelZoom={false}
				className="h-full"
				zoomControl={false}
			>
				<div className="sticky top-0 z-1000 w-[90vw] mx-auto mt-4 md:mt-8 flex flex-col gap-2 items-start">
					<header className="w-full flex items-center gap-4 border border-[#00000014] rounded-[56px] py-3 px-4 md:px-9 md:h-[78px] bg-white cursor-default">
						<div className="flex items-center gap-5 flex-grow ">
							<img src={HeaderIcon} alt="Header Icon" />
						</div>
						<div className="flex items-center gap-3">
							<Button
								variant={"secondary"}
								className={cn(isMobile && "h-10 w-10")}
							>
								{isMobile ? "MH" : "Mohamed Hesham"}
							</Button>
							{isMobile && <ActionsDrawer />}
							{isMobile && <FiltersDrawer />}
						</div>
					</header>
					{!isMobile && (
						<div className="w-full flex items-center justify-between gap-4 border border-[#00000014] rounded-[56px] py-3 px-9 h-[78px] bg-white cursor-default overflow-x-auto overflow-y-hidden">
							<div className="flex items-center gap-2 font-[500] text-sm leading-5 tracking-normal text-[#141414]">
								<Filter className="h-5 w-5" />
								{t("map.filter")}
							</div>
							<div className="flex items-center gap-5">
								<div className="flex items-center py-2 px-3 gap-3 border border-1 border-[#00000008] rounded-full bg-[#FCFBFB]">
									<p className="font-medium text-sm leading-5 tracking-normal text-[#0F0F0F]">
										{t("map.fur")}
									</p>
									<div className="flex items-center gap-3">
										<MixiSelect
											placeholder={t("map.color")}
											options={[
												{ value: "black", label: "Black" },
												{ value: "white", label: "White" },
												{ value: "orange", label: "Orange" },
											]}
											selectClassName="rounded-full h-[42px]!"
										/>
										<MixiSelect
											placeholder={t("map.pattern")}
											options={[
												{ value: "solid", label: "Solid" },
												{ value: "tabby", label: "Tabby" },
												{ value: "calico", label: "Calico" },
											]}
											selectClassName="rounded-full h-[42px]!"
										/>
										<MixiSelect
											placeholder={t("map.length")}
											options={[
												{ value: "short", label: "Short" },
												{ value: "medium", label: "Medium" },
												{ value: "long", label: "Long" },
											]}
											selectClassName="rounded-full h-[42px]!"
										/>
									</div>
								</div>
								<div className="flex items-center py-2 px-3 gap-3 border border-1 border-[#00000008] rounded-full bg-[#FCFBFB]">
									<p className="font-medium text-sm leading-5 tracking-normal text-[#0F0F0F]">
										{t("map.collar")}
									</p>
									<div className="flex items-center gap-3">
										<MixiSelect
											placeholder={t("map.color")}
											options={[
												{ value: "black", label: "Black" },
												{ value: "white", label: "White" },
												{ value: "orange", label: "Orange" },
											]}
											selectClassName="rounded-full h-[42px]!"
										/>
										<MixiSelect
											placeholder={t("map.pattern")}
											options={[
												{ value: "full", label: "Full" },
												{ value: "half", label: "Half" },
												{ value: "bib", label: "Bib" },
											]}
											selectClassName="rounded-full h-[42px]!"
										/>
										<MixiSelect
											placeholder={t("map.embellishments")}
											options={[
												{ value: "mask", label: "Mask" },
												{ value: "eye-liner", label: "Eye Liner" },
												{ value: "boots", label: "Boots" },
											]}
											selectClassName="rounded-full h-[42px]!"
										/>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<MixiSelect
										placeholder={t("map.eye_color")}
										options={[
											{ value: "brown", label: "Brown" },
											{ value: "green", label: "Green" },
											{ value: "orange", label: "Orange" },
										]}
										selectClassName="rounded-full h-[42px]!"
									/>
									<MixiSelect
										placeholder={t("map.size")}
										options={[
											{ value: "small", label: "Small" },
											{ value: "medium", label: "Medium" },
											{ value: "large", label: "Large" },
										]}
										selectClassName="rounded-full h-[42px]!"
									/>
								</div>
							</div>
						</div>
					)}
				</div>
				{!isMobile && (
					<div className="p-5 rounded-[28px] flex flex-col gap-3 bg-white shadow-[0px_7px_36px_0px_#0000000D] mt-2 w-fit ml-[5vw] sticky top-0 z-1000">
						<p className="text-gray-700 font-[500] text-[14px] leading-[20px] tracking-[0]">
							{t("map.quick_actions")}
						</p>
						<div className="flex flex-col gap-3 items-start">
							<Button
								onClick={() => navigate({ to: "/report-lost-cat" })}
								className="w-full"
							>
								{t("map.report_lost_cat")}
							</Button>
							<Button
								variant={"secondary"}
								onClick={() => navigate({ to: "/found-lost-cat" })}
								className="w-full"
							>
								{t("map.report_found_cat")}
							</Button>
						</div>
					</div>
				)}
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
					>
						<Popup
							closeButton={false}
							className="custom-popup"
							offset={[0, 610]}
						>
							<div className="bg-white rounded-[28px] p-5 flex flex-col items-center min-w-[320px] shadow-[0px_7px_36px_0px_#0000000D] gap-[14px]">
								<div className="w-full flex flex-col gap-3">
									<img
										src={CatImage}
										alt="cat-image"
										className="rounded-2xl w-full h-[280px] object-cover"
									/>
									<div className="flex w-full">
										<div className="flex flex-col flex-1 gap-[6px] items-start w-full">
											<div className="flex flex-col item-start w-full gap-1">
												<p className="text-[#737373] font-medium text-[14px] leading-[20px] tracking-[0]">
													20 Jan, 2025
												</p>
												<p className="text-[#0F0F0F] font-semibold text-[16px] leading-[24px] tracking-[0]">
													Mixi Cat Name
												</p>
											</div>
											<div className="flex items-center gap-2 w-full">
												<img src={YellowPin} alt="yellow-pin" />
												<p className="text-[#525252] font-medium text-[14px] leading-[20px] tracking-[0]">
													Hay El Sefarat, Nasr City
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="flex items-center w-full justify-between">
									<div className="flex flex-col items-start gap-3">
										<p className="font-semibold text-[14px] leading-[20px] tracking-[0] text-[#0F0F0F]">
											{t("map.color")}{" "}
											<span className="font-[500] text-[#737373]">
												| Orange
											</span>
										</p>
										<p className="font-semibold text-[14px] leading-[20px] tracking-[0] text-[#0F0F0F]">
											{t("map.eye_color")}{" "}
											<span className="font-[500] text-[#737373]">| Green</span>
										</p>
									</div>
									<div className="flex flex-col items-start gap-3">
										<p className="font-semibold text-[14px] leading-[20px] tracking-[0] text-[#0F0F0F]">
											{t("map.size")}{" "}
											<span className="font-[500] text-[#737373]">
												| Medium
											</span>
										</p>
										<p className="font-semibold text-[14px] leading-[20px] tracking-[0] text-[#0F0F0F]">
											{t("map.pattern")}{" "}
											<span className="font-[500] text-[#737373]">| Tabby</span>
										</p>
									</div>
								</div>
								<Button
									variant={"secondary"}
									className="w-full border-[#D5D7DA]"
								>
									{t("map.i_am_the_owner")}
								</Button>
							</div>
						</Popup>
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
	const isMobile = useIsMobile();

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

const ActionsDrawer = () => {
	const { t } = useTranslation("");
	const navigate = useNavigate();
	return (
		<Drawer>
			<DrawerTrigger>
				<Button className="w-10 h-10">
					<MoreVertical />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="z-1000 border-none p-5 pt-0! flex flex-col gap-3 bg-white shadow-[0px_7px_36px_0px_#0000000D]">
				<p className="text-gray-700 font-[500] text-[14px] leading-[20px] tracking-[0]">
					{t("map.quick_actions")}
				</p>
				<div className="flex w-full flex-col gap-3 items-center">
					<Button
						onClick={() => navigate({ to: "/report-lost-cat" })}
						className="w-full"
					>
						{t("map.report_lost_cat")}
					</Button>
					<Button
						variant={"secondary"}
						onClick={() => navigate({ to: "/found-lost-cat" })}
						className="w-full"
					>
						{t("map.report_found_cat")}
					</Button>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

const FiltersDrawer = () => {
	const { t } = useTranslation("");
	return (
		<Drawer>
			<DrawerTrigger>
				<Button className="w-10 h-10 text-black" variant={"secondary"}>
					<Filter />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="z-1000 border-none p-5 pt-0! flex flex-col gap-3 bg-white shadow-[0px_7px_36px_0px_#0000000D]">
				<p className="text-gray-700 font-[500] text-[14px] leading-[20px] tracking-[0]">
					{t("map.filter")}
				</p>
				<div className="bg-[#FCFBFB] border border-1 border-[#00000008] flex items-start flex-col gap-2 p-4 rounded-2xl w-full">
					<p className="font-medium text-sm leading-5 tracking-normal text-[#0F0F0F]">
						{t("map.fur")}
					</p>
					<MixiSelect
						placeholder={t("map.color")}
						options={[
							{ value: "black", label: "Black" },
							{ value: "white", label: "White" },
							{ value: "orange", label: "Orange" },
						]}
						selectClassName="rounded-full"
					/>
					<MixiSelect
						placeholder={t("map.pattern")}
						options={[
							{ value: "solid", label: "Solid" },
							{ value: "tabby", label: "Tabby" },
							{ value: "calico", label: "Calico" },
						]}
						selectClassName="rounded-full"
					/>
					<MixiSelect
						placeholder={t("map.length")}
						options={[
							{ value: "short", label: "Short" },
							{ value: "medium", label: "Medium" },
							{ value: "long", label: "Long" },
						]}
						selectClassName="rounded-full"
					/>
				</div>
				<div className="bg-[#FCFBFB] border border-1 border-[#00000008] flex items-start flex-col gap-2 p-4 rounded-2xl w-full">
					<p className="font-medium text-sm leading-5 tracking-normal text-[#0F0F0F]">
						{t("map.collar")}
					</p>
					<MixiSelect
						placeholder={t("map.color")}
						options={[
							{ value: "black", label: "Black" },
							{ value: "white", label: "White" },
							{ value: "orange", label: "Orange" },
						]}
						selectClassName="rounded-full"
					/>
					<MixiSelect
						placeholder={t("map.pattern")}
						options={[
							{ value: "full", label: "Full" },
							{ value: "half", label: "Half" },
							{ value: "bib", label: "Bib" },
						]}
						selectClassName="rounded-full"
					/>
					<MixiSelect
						placeholder={t("map.embellishments")}
						options={[
							{ value: "mask", label: "Mask" },
							{ value: "eye-liner", label: "Eye Liner" },
							{ value: "boots", label: "Boots" },
						]}
						selectClassName="rounded-full"
					/>
				</div>
				<div className="w-full flex items-center gap-2">
					<MixiSelect
						placeholder={t("map.eye_color")}
						options={[
							{ value: "brown", label: "Brown" },
							{ value: "green", label: "Green" },
							{ value: "orange", label: "Orange" },
						]}
						selectClassName="rounded-full"
					/>
					<MixiSelect
						placeholder={t("map.size")}
						options={[
							{ value: "small", label: "Small" },
							{ value: "medium", label: "Medium" },
							{ value: "large", label: "Large" },
						]}
						selectClassName="rounded-full"
					/>
				</div>
			</DrawerContent>
		</Drawer>
	);
};
