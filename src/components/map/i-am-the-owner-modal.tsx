import { useTranslation } from "react-i18next";
import MixiInput from "../shared/mixi-input";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";

const IAmTheOwnerModal = ({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) => {
	const { t } = useTranslation();
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="bg-white rounded-[28px] p-5 flex flex-col items-center w-[344px] shadow-[0px_7px_36px_0px_#0000000D] gap-[14px]">
				<div className="flex flex-col items-start gap-[6px] w-full">
					<h2 className="font-semibold text-[16px] leading-[24px] tracking-[0] text-[#0F0F0F]">
						{t("map.i_am_the_owner")}
					</h2>
					<p className="font-regular text-[14px] leading-[20px] tracking-[0] text-[#525252]">
						{t("map.leave_your_info")}
					</p>
				</div>
				<div className="flex flex-col w-full items-start gap-3">
					<MixiInput
						label={t("map.phone_number")}
						placeholder={t("map.phone_number")}
						type="tel"
					/>
					<MixiInput
						label={t("map.email")}
						placeholder={t("map.email")}
						type="email"
					/>
				</div>
				<Button className="w-full" onClick={onClose}>
					{t("map.submit")}
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default IAmTheOwnerModal;
