import { useNavigate, useSearch } from "@tanstack/react-router";
import { Filter, LogOut, ShieldUser } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import ChevronDown from "@/assets/images/chevron-down.svg";
import HeaderIcon from "@/assets/images/header-icon.svg";
import UserCircleIcon from "@/assets/images/user-circle.svg";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn, getInitials } from "@/lib/utils";
import {
	CatCoatType,
	CatEyeColor,
	CatFurColor,
	CatFurPattern,
	CatSize,
	CollarEmbellishment,
	CollarPattern,
	CollarSolidColor,
	type UserRole,
} from "@/server/db/enums";
import { logoutFn } from "@/server/functions/auth";
import LanguageSwitcher from "../shared/language-switcher";
import MixiMultiselect from "../shared/mixi-multiselect";
import MixiSelect from "../shared/mixi-select";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ActionsDrawer from "./actions-drawer";
import FiltersDrawer from "./filters-drawer";

interface User {
	firstName: string;
	lastName: string;
	role: UserRole;
}

const MapHeader = ({ firstName, lastName, role }: User) => {
	const { t } = useTranslation("");
	const isMobile = useIsMobile();
	const navigate = useNavigate();
	const [filters, setFilters] = useState<{
		color?: CatFurColor[];
		eyeColor?: CatEyeColor;
		coatType?: CatCoatType;
		collarColor?: CollarSolidColor;
		collarEmbellishments?: CollarEmbellishment;
		collarPattern?: CollarPattern;
		pattern?: CatFurPattern;
		size?: CatSize;
	}>({});
	const search = useSearch({ from: "/map/" });

	// biome-ignore lint/correctness/useExhaustiveDependencies: <false>
	useEffect(() => {
		navigate({
			to: ".",
			search: {
				...filters,
				color: filters.color?.length ? filters.color : undefined,
			},
			replace: true,
		});
	}, [filters]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <false>
	useEffect(() => {
		if (
			search &&
			(search.color !== filters.color ||
				search.eyeColor !== filters.eyeColor ||
				search.coatType !== filters.coatType ||
				search.collarColor !== filters.collarColor ||
				search.collarEmbellishments !== filters.collarEmbellishments ||
				search.collarPattern !== filters.collarPattern ||
				search.pattern !== filters.pattern ||
				search.size !== filters.size)
		) {
			setFilters(search);
		}
	}, [search]);

	return (
		<>
			<div className="sticky top-0 z-1000 w-[90vw] mx-auto mt-4 md:mt-8 flex flex-col gap-2 items-start">
				<header className="w-full flex items-center gap-4 border border-[#00000014] rounded-[56px] py-3 px-4 md:px-9 md:h-[78px] bg-white cursor-default">
					<div className="flex items-center gap-5 flex-grow ">
						<img src={HeaderIcon} alt="Header Icon" />
					</div>
					<div className="flex items-center gap-3">
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button
									variant={"secondary"}
									className={cn(
										"text-[#414651] font-[500] text-[14px] leading-[20px] tracking-[0%]",
										isMobile && "h-10 w-10",
									)}
								>
									{!isMobile && <img src={UserCircleIcon} alt="profile" />}
									{isMobile
										? getInitials(`${firstName} ${lastName}`)
										: `${firstName} ${lastName}`}
									{!isMobile && <img src={ChevronDown} alt="dropdown" />}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="border-1 border-[#00000014] rounded-[12px] w-[260px] p-0">
								{/* <DropdownMenuItem className="border-b border-[#E9EAEB] py-[6px]">
									<div className="px-[6px]">
										<div className="p-2 flex items-center gap-2 w-full">
											<img src={UserIcon} alt="profile" />
											<p className="text-gray-700 font-semibold text-[14px] leading-[20px] tracking-[0%]">
												{t("map.view_profile")}
											</p>
										</div>
									</div>
								</DropdownMenuItem> */}
								{role === "ADMIN" && (
									<DropdownMenuItem
										className="border-b border-[#E9EAEB] py-[6px]"
										onClick={() => navigate({ to: "/admin" })}
									>
										<div className="px-[6px]">
											<div className="p-2 flex items-center gap-2 w-full">
												<ShieldUser size={20} color="#A4A7AE" />
												<p className="text-gray-700 font-semibold text-[14px] leading-[20px] tracking-[0%]">
													{t("map.admin")}
												</p>
											</div>
										</div>
									</DropdownMenuItem>
								)}
								<DropdownMenuItem
									className="border-b border-[#E9EAEB] py-[6px]"
									onClick={async () => {
										try {
											await logoutFn();
											navigate({ to: "/" });
										} catch (_) {
											toast.error(t("map.logout_error"));
										}
									}}
								>
									<div className="px-[6px]">
										<div className="p-2 flex items-center gap-2 w-full">
											<LogOut size={20} color="#A4A7AE" />
											<p className="text-gray-700 font-semibold text-[14px] leading-[20px] tracking-[0%]">
												{t("map.sign_out")}
											</p>
										</div>
									</div>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<LanguageSwitcher />
						{isMobile && <ActionsDrawer />}
						{isMobile && <FiltersDrawer setFilters={setFilters} />}
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
									<div className="max-w-[200px]">
										<MixiMultiselect
											placeholder={t("map.color")}
											options={Object.values(CatFurColor).map((color) => ({
												label: t(`catFurColor.${color.toLowerCase()}`),
												value: color,
											}))}
											multiSelectClassName="rounded-full h-[42px]! w-fit"
											onValueChange={(value) => {
												setFilters((prev) => ({
													...prev,
													color: value as CatFurColor[],
												}));
											}}
											hideSelectAll
											searchable={false}
											value={search.color}
											allOptionsLabel={t("map.all")}
											defaultValue={search.color}
										/>
									</div>
									<MixiSelect
										placeholder={t("map.pattern")}
										options={Object.values(CatFurPattern).map((pattern) => ({
											label: t(`catFurPattern.${pattern.toLowerCase()}`),
											value: pattern,
										}))}
										selectClassName="rounded-full h-[42px]! w-fit"
										onChange={(value) => {
											setFilters((prev) => ({
												...prev,
												pattern: value as CatFurPattern,
											}));
										}}
										value={search.pattern}
									/>
									<MixiSelect
										placeholder={t("map.length")}
										options={Object.values(CatCoatType).map((type) => ({
											label: t(`catCoatType.${type.toLowerCase()}`),
											value: type,
										}))}
										selectClassName="rounded-full h-[42px]! w-fit"
										onChange={(value) => {
											setFilters((prev) => ({
												...prev,
												coatType: value as CatCoatType,
											}));
										}}
										value={search.coatType}
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
										options={Object.values(CollarSolidColor).map((color) => ({
											label: t(`collarColor.${color.toLowerCase()}`),
											value: color,
										}))}
										selectClassName="rounded-full h-[42px]! w-fit"
										onChange={(value) => {
											setFilters((prev) => ({
												...prev,
												collarColor: value as CollarSolidColor,
											}));
										}}
										value={search.collarColor}
									/>
									<MixiSelect
										placeholder={t("map.pattern")}
										options={Object.values(CollarPattern).map((pattern) => ({
											label: t(`collarPattern.${pattern.toLowerCase()}`),
											value: pattern,
										}))}
										selectClassName="rounded-full h-[42px]! w-fit"
										onChange={(value) => {
											setFilters((prev) => ({
												...prev,
												collarPattern: value as CollarPattern,
											}));
										}}
										value={search.collarPattern}
									/>
									<MixiSelect
										placeholder={t("map.embellishments")}
										options={Object.values(CollarEmbellishment).map(
											(embellishment) => ({
												label: t(
													`collarEmbellishment.${embellishment.toLowerCase()}`,
												),
												value: embellishment,
											}),
										)}
										selectClassName="rounded-full h-[42px]! w-fit"
										onChange={(value) => {
											setFilters((prev) => ({
												...prev,
												collarEmbellishments: value as CollarEmbellishment,
											}));
										}}
										value={search.collarEmbellishments}
									/>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<MixiSelect
									placeholder={t("map.eye_color")}
									options={Object.values(CatEyeColor).map((color) => ({
										label: t(`catEyeColor.${color.toLowerCase()}`),
										value: color,
									}))}
									selectClassName="rounded-full h-[42px]! w-fit"
									onChange={(value) => {
										setFilters((prev) => ({
											...prev,
											eyeColor: value as CatEyeColor,
										}));
									}}
									value={search.eyeColor}
								/>
								<MixiSelect
									placeholder={t("map.size")}
									options={Object.values(CatSize).map((size) => ({
										label: t(`catSize.${size.toLowerCase()}`),
										value: size,
									}))}
									selectClassName="rounded-full h-[42px]! w-fit"
									onChange={(value) => {
										setFilters((prev) => ({ ...prev, size: value as CatSize }));
									}}
									value={search.size}
								/>
							</div>
							<Button onClick={() => setFilters({})}>{t("map.reset")}</Button>
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
							onClick={() => navigate({ to: "/report-found-cat" })}
							className="w-full"
						>
							{t("map.report_found_cat")}
						</Button>
					</div>
				</div>
			)}
		</>
	);
};

export default MapHeader;
