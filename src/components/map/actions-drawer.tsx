import { Button } from "@/components/ui/button";
import "./map.css";
import { useNavigate } from "@tanstack/react-router";
import { MoreVertical } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

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

export default ActionsDrawer;
