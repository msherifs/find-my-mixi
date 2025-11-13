import { useTranslation } from "react-i18next";
import CatImage from "@/assets/images/demo-image.svg";
import YellowPin from "@/assets/images/yellow-pin.svg";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";

interface CatDetailsModalProps {
	isOpen?: boolean;
	onClose?: () => void;
	catData?: {
		date: string;
		name: string;
		location: string;
		color: string;
		eyeColor: string;
		size: string;
		pattern: string;
	};
}

const CatDetailsModal = ({
	isOpen = true,
	onClose,
	catData,
}: CatDetailsModalProps) => {
	const { t } = useTranslation();
	const isMobile = useIsMobile();

	const defaultData = {
		date: "20 Jan, 2025",
		name: "Mixi Cat Name",
		location: "Hay El Sefarat, Nasr City",
		color: "Orange",
		eyeColor: "Green",
		size: "Medium",
		pattern: "Tabby",
	};

	const data = catData || defaultData;

	const content = (
		<>
			<div className="w-full flex flex-col gap-3">
				<img
					src={CatImage}
					alt="cat-image"
					className="rounded-2xl w-full h-auto md:h-[280px] object-cover"
				/>
				<div className="flex w-full">
					<div className="flex flex-col flex-1 gap-[6px] items-start w-full">
						<div className="flex flex-col item-start w-full gap-1">
							<p className="text-[#737373] font-medium text-[14px] leading-[20px] tracking-[0]">
								{data.date}
							</p>
							<p className="text-[#0F0F0F] font-semibold text-[16px] leading-[24px] tracking-[0]">
								{data.name}
							</p>
						</div>
						<div className="flex items-center gap-2 w-full">
							<img src={YellowPin} alt="yellow-pin" />
							<p className="text-[#525252] font-medium text-[14px] leading-[20px] tracking-[0]">
								{data.location}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="flex items-center w-full justify-between">
				<div className="flex flex-col items-start gap-3">
					<p className="font-semibold text-[14px] leading-[20px] tracking-[0] text-[#0F0F0F]">
						{t("map.color")}{" "}
						<span className="font-[500] text-[#737373]">| {data.color}</span>
					</p>
					<p className="font-semibold text-[14px] leading-[20px] tracking-[0] text-[#0F0F0F]">
						{t("map.eye_color")}{" "}
						<span className="font-[500] text-[#737373]">| {data.eyeColor}</span>
					</p>
				</div>
				<div className="flex flex-col items-start gap-3">
					<p className="font-semibold text-[14px] leading-[20px] tracking-[0] text-[#0F0F0F]">
						{t("map.size")}{" "}
						<span className="font-[500] text-[#737373]">| {data.size}</span>
					</p>
					<p className="font-semibold text-[14px] leading-[20px] tracking-[0] text-[#0F0F0F]">
						{t("map.pattern")}{" "}
						<span className="font-[500] text-[#737373]">| {data.pattern}</span>
					</p>
				</div>
			</div>
			<Button variant={"secondary"} className="w-full border-[#D5D7DA]">
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
		<div className="bg-white rounded-[28px] p-5 flex flex-col items-center min-w-[320px] shadow-[0px_7px_36px_0px_#0000000D] gap-[14px]">
			{content}
		</div>
	);
};

export default CatDetailsModal;
