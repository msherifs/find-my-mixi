import { useTranslation } from "react-i18next";
import GreenHeart from "@/assets/images/green-heart.svg";
import Lightning from "@/assets/images/lightning.svg";
import Network from "@/assets/images/network.svg";
import CatImage from "@/assets/images/why-us-image.svg";

const WhyUsSection = () => {
	const { t } = useTranslation("");
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <false>
		<section
			className="w-full flex flex-col items-start gap-[64px] lg:py-[96px] py-[64px] max-w-[1280px] mx-auto md:px-9 px-4 scroll-mt-10"
			id="why-us"
		>
			<div className="flex flex-col gap-5 max-w-[768px] w-full lg:w-auto items-start">
				<h2 className="font-epilogue font-bold text-[36px] leading-[100%] tracking-[0%]">
					{t("landing.whyUsSection.title")}
				</h2>
				<p className="font-normal text-[18px] leading-[140%] tracking-[-1%] max-w-[420px] text-start">
					{t("landing.whyUsSection.description")}
				</p>
			</div>
			<div className="flex lg:items-center gap-[64px] w-full lg:flex-row flex-col items-start lg:justify-between">
				<div className="flex flex-col items-start gap-[64px] max-w-[560px]">
					<div className="flex flex-col items-start w-full gap-2">
						<img src={Lightning} alt="Fast Notifications" />
						<div className="flex flex-col items-start gap-[2px] pt-[10px]">
							<h3 className="font-semibold text-[18px] leading-[28px] tracking-[0%] text-gray-900">
								{t("landing.whyUsSection.fast_notifications.title")}
							</h3>
							<p className="font-normal text-[16px] leading-[24px] tracking-[0%] text-gray-600">
								{t("landing.whyUsSection.fast_notifications.description")}
							</p>
						</div>
					</div>
					<div className="flex flex-col items-start w-full gap-2">
						<img src={Network} alt="Network" />
						<div className="flex flex-col items-start gap-[2px] pt-[10px]">
							<h3 className="font-semibold text-[18px] leading-[28px] tracking-[0%] text-gray-900">
								{t("landing.whyUsSection.network.title")}
							</h3>
							<p className="font-normal text-[16px] leading-[24px] tracking-[0%] text-gray-600">
								{t("landing.whyUsSection.network.description")}
							</p>
						</div>
					</div>
					<div className="flex flex-col items-start w-full gap-2">
						<img src={GreenHeart} alt="User Friendly" />
						<div className="flex flex-col items-start gap-[2px] pt-[10px]">
							<h3 className="font-semibold text-[18px] leading-[28px] tracking-[0%] text-gray-900">
								{t("landing.whyUsSection.user_friendly.title")}
							</h3>
							<p className="font-normal text-[16px] leading-[24px] tracking-[0%] text-gray-600">
								{t("landing.whyUsSection.user_friendly.description")}
							</p>
						</div>
					</div>
				</div>
				<img
					src={CatImage}
					alt="Why Us Illustration"
					className="w-full lg:w-auto"
				/>
			</div>
		</section>
	);
};

export default WhyUsSection;
