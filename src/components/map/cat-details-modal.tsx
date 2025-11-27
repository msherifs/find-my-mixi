import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import YellowPin from "@/assets/images/yellow-pin.svg";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { CatFormType } from "@/server/db/enums";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import type { CatRequest } from "./map-container";

interface CatDetailsModalProps {
	isOpen?: boolean;
	onClose?: () => void;
	onClickIAmTheOwner: () => void;
	catData: CatRequest;
}

const CatDetailsModal = ({
	isOpen = true,
	onClose,
	catData,
	onClickIAmTheOwner,
}: CatDetailsModalProps) => {
	const { t } = useTranslation();
	const isMobile = useIsMobile();

	const content = (
		<>
			<div className="w-full flex flex-col gap-3">
				<img
					src={catData.catDetails.photo}
					alt="cat-image"
					className="rounded-2xl w-full max-h-[320px] object-cover"
				/>
				<div className="flex w-full">
					<div className="flex flex-col flex-1 gap-[6px] items-start w-full">
						<div className="flex flex-col item-start w-full gap-1">
							<div className="w-full flex items-center justify-between">
								<p className="text-[#737373] font-medium text-[14px] leading-[20px] tracking-[0]">
									{DateTime.fromJSDate(catData.catDetails.date).toFormat(
										"dd LLL, yyyy",
									)}
								</p>
								<Badge
									className={cn(
										catData.type === CatFormType.FIND_MY_CAT
											? "bg-red-200 text-red-700 border-1 border-red-400"
											: "bg-[#ECFDF3] text-[#00B37E] border-1 border-[#ABEFC6]",
									)}
								>
									{catData.type === CatFormType.FIND_MY_CAT
										? t("map.lost")
										: t("map.found")}
								</Badge>
							</div>

							<p className="text-[#0F0F0F] font-semibold text-[16px] leading-[24px] tracking-[0]">
								{catData.catDetails.name ?? t("map.unknown_name")}
							</p>
						</div>
						<div className="flex items-center gap-2 w-full">
							<img src={YellowPin} alt="yellow-pin" />
							<p className="text-[#525252] font-medium text-[14px] leading-[20px] tracking-[0]">
								{catData.location.address}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="flex items-start w-full justify-between">
				<div className="flex flex-col items-start gap-3 flex-3 flex-shrink-0">
					<p className="font-semibold text-[14px] leading-[20px] tracking-[0] text-[#0F0F0F]">
						{t("map.color")}{" "}
						<span className="font-[500] text-[#737373]">
							|{" "}
							{catData.catDetails.furColor
								.map((color) => t(`catFurColor.${color.toLowerCase()}`))
								.join(" - ")}
						</span>
					</p>
					<p className="font-semibold text-[14px] leading-[20px] tracking-[0] text-[#0F0F0F]">
						{t("map.eye_color")}{" "}
						<span className="font-[500] text-[#737373]">
							| {t(`catEyeColor.${catData.catDetails.eyeColor.toLowerCase()}`)}
						</span>
					</p>
				</div>
				<div className="flex flex-col items-start gap-3 flex-2 flex-shrink-0">
					<p className="font-semibold text-[14px] leading-[20px] tracking-[0] text-[#0F0F0F]">
						{t("map.size")}{" "}
						<span className="font-[500] text-[#737373]">
							| {t(`catSize.${catData.catDetails.size.toLowerCase()}`)}
						</span>
					</p>
					<p className="font-semibold text-[14px] leading-[20px] tracking-[0] text-[#0F0F0F]">
						{t("map.pattern")}{" "}
						<span className="font-[500] text-[#737373]">
							|{" "}
							{t(
								`catFurPattern.${catData.catDetails.furPattern.toLowerCase()}`,
							)}
						</span>
					</p>
				</div>
			</div>
			<Button
				variant={"secondary"}
				className="w-full border-[#D5D7DA]"
				onClick={onClickIAmTheOwner}
			>
				{t("map.i_am_the_owner")}
			</Button>
		</>
	);

	if (isMobile) {
		return (
			<Dialog open={isOpen} onOpenChange={onClose}>
				<DialogContent className="bg-white rounded-[28px] p-5 flex flex-col items-center min-w-[320px] shadow-[0px_7px_36px_0px_#0000000D] gap-[14px]">
					{content}
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<div className="bg-white rounded-[28px] p-5 flex flex-col items-center min-w-[320px] shadow-[0px_7px_36px_0px_#0000000D] gap-[14px] w-fit">
			{content}
		</div>
	);
};

export default CatDetailsModal;
