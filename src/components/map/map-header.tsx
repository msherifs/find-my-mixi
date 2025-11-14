import { useNavigate } from "@tanstack/react-router";
import { Filter, LogOut, ShieldUser } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import ChevronDown from "@/assets/images/chevron-down.svg";
import HeaderIcon from "@/assets/images/header-icon.svg";
import UserIcon from "@/assets/images/user.svg";
import UserCircleIcon from "@/assets/images/user-circle.svg";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn, getInitials } from "@/lib/utils";
import { logoutFn } from "@/server/functions/auth";
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
import { UserRole } from "@/server/db/enums";

interface User {
	firstName: string;
	lastName: string;
	role: UserRole;
}

const MapHeader = ({ firstName, lastName, role }: User) => {
	const { t } = useTranslation("");
	const isMobile = useIsMobile();
	const navigate = useNavigate();
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
								<DropdownMenuItem className="border-b border-[#E9EAEB] py-[6px]">
									<div className="px-[6px]">
										<div className="p-2 flex items-center gap-2 w-full">
											<img src={UserIcon} alt="profile" />
											<p className="text-gray-700 font-semibold text-[14px] leading-[20px] tracking-[0%]">
												{t("map.view_profile")}
											</p>
										</div>
									</div>
								</DropdownMenuItem>
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
		</>
	);
};

export default MapHeader;
